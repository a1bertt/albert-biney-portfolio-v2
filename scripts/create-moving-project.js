import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".m4v", ".mov", ".mp4", ".webm"]);
const PREFERRED_VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".m4v"];
const LONGEST_IMAGE_EDGE = 1600;
const VIDEO_EDGE = 1280;
const IMAGE_QUALITY = 82;
const execFileAsync = promisify(execFile);

function usage() {
  console.log(
    [
      "Usage: npm run create-moving-project -- <project-name> [options]",
      "",
      "Options:",
      "  --title \"Project Title\"   Display title. Defaults to title-cased project name.",
      "  --year 2026                Project year. Defaults to current year.",
      "  --sort-order 3             Required ordering value for moving-image index.",
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

    if (arg === "--update-content") {
      options.updateContent = true;
      continue;
    }

    if (arg === "--force-proxies") {
      options.forceProxies = true;
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

function isImageFile(fileName) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function isVideoFile(fileName) {
  return VIDEO_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function isReservedImage(fileName) {
  const name = path.parse(fileName).name.toLowerCase();
  return name === "cover" || name === "thumbnail";
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readFiles(projectDir, predicate) {
  const entries = await fs.readdir(projectDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => !isHiddenFile(fileName))
    .filter(predicate)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function findPreferredFile(files, baseName) {
  return files.find((fileName) => path.parse(fileName).name.toLowerCase() === baseName);
}

function proxyImageName(fileName) {
  return `${path.parse(fileName).name}.jpg`;
}

function proxyVideoName(fileName) {
  return `${path.parse(fileName).name}.mp4`;
}

function findPreferredVideo(files, baseName) {
  for (const extension of PREFERRED_VIDEO_EXTENSIONS) {
    const match = files.find((fileName) => {
      const parsed = path.parse(fileName);
      return parsed.name.toLowerCase() === baseName && parsed.ext.toLowerCase() === extension;
    });

    if (match) {
      return match;
    }
  }

  return findPreferredFile(files, baseName);
}

async function generateImageProxy(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate()
    .resize({
      width: LONGEST_IMAGE_EDGE,
      height: LONGEST_IMAGE_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: IMAGE_QUALITY,
      mozjpeg: true,
    })
    .toFile(outputPath);
}

async function generateVideoProxy(inputPath, outputPath) {
  if (!ffmpegPath) {
    throw new Error("Missing ffmpeg binary. Install ffmpeg-static before generating moving-image video proxies.");
  }

  await execFileAsync(ffmpegPath, [
    "-y",
    "-i",
    inputPath,
    "-vf",
    `scale=${VIDEO_EDGE}:${VIDEO_EDGE}:force_original_aspect_ratio=decrease`,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    outputPath,
  ]);
}

async function generateProxies(projectDir, projectName, imageFiles, videoFiles, force) {
  const proxiesDir = path.join(projectDir, "proxies");
  await fs.mkdir(proxiesDir, { recursive: true });

  let imageProxiesGenerated = 0;
  let imageProxiesSkipped = 0;
  let videoProxiesGenerated = 0;
  let videoProxiesSkipped = 0;
  const imageProxyNames = new Map();
  const videoProxyNames = new Map();
  const writtenVideoOutputs = new Set();

  for (const fileName of imageFiles) {
    const outputName = proxyImageName(fileName);
    const inputPath = path.join(projectDir, fileName);
    const outputPath = path.join(proxiesDir, outputName);
    imageProxyNames.set(fileName, outputName);

    if (!force && (await fileExists(outputPath))) {
      imageProxiesSkipped += 1;
      continue;
    }

    await generateImageProxy(inputPath, outputPath);
    imageProxiesGenerated += 1;
    console.log(`wrote public/moving/${projectName}/proxies/${outputName}`);
  }

  for (const fileName of videoFiles) {
    const outputName = proxyVideoName(fileName);
    const inputPath = path.join(projectDir, fileName);
    const outputPath = path.join(proxiesDir, outputName);
    videoProxyNames.set(fileName, outputName);

    if (writtenVideoOutputs.has(outputName)) {
      videoProxiesSkipped += 1;
      continue;
    }

    if (!force && (await fileExists(outputPath))) {
      videoProxiesSkipped += 1;
      writtenVideoOutputs.add(outputName);
      continue;
    }

    await generateVideoProxy(inputPath, outputPath);
    videoProxiesGenerated += 1;
    writtenVideoOutputs.add(outputName);
    console.log(`wrote public/moving/${projectName}/proxies/${outputName}`);
  }

  return {
    imageProxyNames,
    videoProxyNames,
    imageProxiesGenerated,
    imageProxiesSkipped,
    videoProxiesGenerated,
    videoProxiesSkipped,
  };
}

function createContent({
  projectName,
  title,
  year,
  sortOrder,
  supportingImageProxies,
  previewVideoProxy,
  fullVideoProxy,
  posterImageProxy,
}) {
  const imagesBlock =
    supportingImageProxies.length > 0
      ? [
          "images:",
          ...supportingImageProxies.map((fileName) => `  - "/moving/${projectName}/proxies/${fileName}"`),
        ].join("\n")
      : "images: []";
  const hasVideo = previewVideoProxy || fullVideoProxy;
  const videoLines = hasVideo
    ? [
        "",
        "videos:",
        `  - title: "${title}"`,
        previewVideoProxy ? `    previewUrl: "/moving/${projectName}/proxies/${previewVideoProxy}"` : "",
        fullVideoProxy ? `    fullVideoUrl: "/moving/${projectName}/proxies/${fullVideoProxy}"` : "",
        `    posterImage: "/moving/${projectName}/proxies/${posterImageProxy}"`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return `---
title: "${title}"
slug: "moving-${projectName}"
year: "${year}"
category: "moving-image"
sortOrder: ${sortOrder}

coverImage: "/moving/${projectName}/proxies/cover.jpg"

${imagesBlock}
${videoLines}

seo:
  title: "${title} | Albert Biney"
  description: "${title}."
  ogImage: "/moving/${projectName}/proxies/${posterImageProxy}"
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
  const projectDir = path.join(process.cwd(), "public", "moving", projectName);
  const contentPath = path.join(process.cwd(), "src", "content", "projects", `moving-${projectName}.md`);
  const coverPath = path.join(projectDir, "cover.jpg");

  if (!(await fileExists(projectDir))) {
    throw new Error(`Missing project media folder: public/moving/${projectName}`);
  }

  if (!(await fileExists(coverPath))) {
    throw new Error(`Missing cover image: public/moving/${projectName}/cover.jpg`);
  }

  const imageFiles = await readFiles(projectDir, isImageFile);
  const videoFiles = await readFiles(projectDir, isVideoFile);
  const supportingImages = imageFiles.filter((fileName) => !isReservedImage(fileName));
  const thumbnailImage = findPreferredFile(imageFiles, "thumbnail");
  const posterImage = thumbnailImage ?? "cover.jpg";
  const previewVideo = findPreferredVideo(videoFiles, "preview");
  const fullVideo = findPreferredVideo(videoFiles, "full");
  const proxies = await generateProxies(projectDir, projectName, imageFiles, videoFiles, options.forceProxies);
  const supportingImageProxies = supportingImages.map((fileName) => proxies.imageProxyNames.get(fileName));
  const posterImageProxy = proxies.imageProxyNames.get(posterImage);
  const previewVideoProxy = previewVideo ? proxies.videoProxyNames.get(previewVideo) : null;
  const fullVideoProxy = fullVideo ? proxies.videoProxyNames.get(fullVideo) : null;
  const contentExists = await fileExists(contentPath);

  if (!posterImageProxy) {
    throw new Error(`Missing generated poster proxy for ${posterImage}`);
  }

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
        supportingImageProxies,
        previewVideoProxy,
        fullVideoProxy,
        posterImageProxy,
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
        mediaFolder: `public/moving/${projectName}`,
        imagesFound: imageFiles.length,
        supportingImagesFound: supportingImages.length,
        videosFound: videoFiles.length,
        imageProxiesGenerated: proxies.imageProxiesGenerated,
        imageProxiesSkipped: proxies.imageProxiesSkipped,
        videoProxiesGenerated: proxies.videoProxiesGenerated,
        videoProxiesSkipped: proxies.videoProxiesSkipped,
        previewVideo: previewVideo ?? null,
        fullVideo: fullVideo ?? null,
        posterImage: posterImageProxy,
        contentFile: path.relative(process.cwd(), contentPath),
        contentCreatedOrUpdated: !contentExists || options.updateContent,
        route: `/moving-images/moving-${projectName}`,
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
