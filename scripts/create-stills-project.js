import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const LONGEST_EDGE = 1600;
const QUALITY = 82;

function usage() {
  console.log(
    [
      "Usage: npm run create-stills-project -- <project-name> [options]",
      "",
      "Options:",
      "  --title \"Project Title\"   Display title. Defaults to title-cased project name.",
      "  --year 2026                Project year. Defaults to current year.",
      "  --sort-order 3             Required ordering value for stills index.",
      "  --force-proxies            Regenerate existing proxies.",
      "  --update-content           Update existing content file if it already exists.",
    ].join("\n")
  );
}

function parseArgs(argv) {
  const [projectName, ...rest] = argv;
  const options = {
    forceProxies: false,
    updateContent: false,
  };

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];

    if (arg === "--force-proxies") {
      options.forceProxies = true;
      continue;
    }

    if (arg === "--update-content") {
      options.updateContent = true;
      continue;
    }

    if (arg === "--title") {
      options.title = rest[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--year") {
      options.year = rest[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--sort-order") {
      options.sortOrder = Number(rest[index + 1]);
      index += 1;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return { projectName, options };
}

function titleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isHiddenFile(fileName) {
  return fileName.startsWith(".");
}

function isCoverImage(fileName) {
  return path.parse(fileName).name.toLowerCase() === "cover";
}

function isImageFile(fileName) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readGalleryImages(projectDir) {
  const entries = await fs.readdir(projectDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => !isHiddenFile(fileName))
    .filter((fileName) => !isCoverImage(fileName))
    .filter(isImageFile)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function generateProxy(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate()
    .resize({
      width: LONGEST_EDGE,
      height: LONGEST_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: QUALITY,
      mozjpeg: true,
    })
    .toFile(outputPath);
}

async function generateProxies(projectDir, projectName, galleryImages, force) {
  const proxiesDir = path.join(projectDir, "proxies");
  await fs.mkdir(proxiesDir, { recursive: true });

  let generated = 0;
  let skipped = 0;
  const proxyNames = [];

  for (const imageName of galleryImages) {
    const proxyName = `${path.parse(imageName).name}.jpg`;
    const inputPath = path.join(projectDir, imageName);
    const outputPath = path.join(proxiesDir, proxyName);

    if (!force && (await fileExists(outputPath))) {
      skipped += 1;
      proxyNames.push(proxyName);
      continue;
    }

    await generateProxy(inputPath, outputPath);
    generated += 1;
    proxyNames.push(proxyName);
    console.log(`wrote public/images/stills/${projectName}/proxies/${proxyName}`);
  }

  return { generated, skipped, proxyNames };
}

function createContent({ projectName, title, year, sortOrder, proxyNames }) {
  const imageLines = proxyNames
    .map((proxyName) => `  - "/images/stills/${projectName}/proxies/${proxyName}"`)
    .join("\n");

  return `---
title: "${title}"
slug: "stills-${projectName}"
year: "${year}"
category: "stills"
sortOrder: ${sortOrder}

coverImage: "/images/stills/${projectName}/cover.jpg"

images:
${imageLines}

seo:
  title: "${title} | Albert Biney"
  description: "${title}."
  ogImage: "/images/stills/${projectName}/cover.jpg"
---

${title}.
`;
}

async function main() {
  const { projectName, options } = parseArgs(process.argv.slice(2));

  if (!projectName) {
    usage();
    process.exitCode = 1;
    return;
  }

  if (!Number.isFinite(options.sortOrder)) {
    usage();
    throw new Error("--sort-order is required.");
  }

  const title = options.title ?? titleCase(projectName);
  const year = options.year ?? String(new Date().getFullYear());
  const projectDir = path.join(process.cwd(), "public", "images", "stills", projectName);
  const contentPath = path.join(process.cwd(), "src", "content", "projects", `stills-${projectName}.md`);
  const coverPath = path.join(projectDir, "cover.jpg");

  if (!(await fileExists(projectDir))) {
    throw new Error(`Missing project image folder: public/images/stills/${projectName}`);
  }

  if (!(await fileExists(coverPath))) {
    throw new Error(`Missing cover image: public/images/stills/${projectName}/cover.jpg`);
  }

  const galleryImages = await readGalleryImages(projectDir);

  if (galleryImages.length === 0) {
    throw new Error(`No gallery images found in public/images/stills/${projectName}`);
  }

  const proxies = await generateProxies(projectDir, projectName, galleryImages, options.forceProxies);
  const contentExists = await fileExists(contentPath);

  if (contentExists && !options.updateContent) {
    console.log(`skip existing ${path.relative(process.cwd(), contentPath)}`);
  } else {
    await fs.writeFile(
      contentPath,
      createContent({
        projectName,
        title,
        year,
        sortOrder: options.sortOrder,
        proxyNames: proxies.proxyNames,
      })
    );
    console.log(`${contentExists ? "updated" : "created"} ${path.relative(process.cwd(), contentPath)}`);
  }

  console.log(
    JSON.stringify(
      {
        project: projectName,
        title,
        year,
        sortOrder: options.sortOrder,
        originalsFound: galleryImages.length,
        proxiesGenerated: proxies.generated,
        proxiesSkipped: proxies.skipped,
        contentFile: path.relative(process.cwd(), contentPath),
        contentCreatedOrUpdated: !contentExists || options.updateContent,
        route: `/work/stills-${projectName}`,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
