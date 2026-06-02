import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const LONGEST_EDGE = 1600;
const QUALITY = 82;

function printUsage() {
  console.log("Usage: node scripts/generate-proxies.js <project-name> [--force]");
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

async function main() {
  const [projectName, ...flags] = process.argv.slice(2);
  const force = flags.includes("--force");

  if (!projectName) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const projectDir = path.join(process.cwd(), "public", "images", "stills", projectName);
  const proxiesDir = path.join(projectDir, "proxies");
  const entries = await fs.readdir(projectDir, { withFileTypes: true });
  const images = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => !isHiddenFile(fileName))
    .filter((fileName) => !isCoverImage(fileName))
    .filter(isImageFile)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  await fs.mkdir(proxiesDir, { recursive: true });

  let processed = 0;
  let skipped = 0;

  for (const fileName of images) {
    const inputPath = path.join(projectDir, fileName);
    const outputName = `${path.parse(fileName).name}.jpg`;
    const outputPath = path.join(proxiesDir, outputName);

    if (!force && (await fileExists(outputPath))) {
      skipped += 1;
      console.log(`skip ${path.relative(process.cwd(), outputPath)}`);
      continue;
    }

    await generateProxy(inputPath, outputPath);
    processed += 1;
    console.log(`wrote ${path.relative(process.cwd(), outputPath)}`);
  }

  console.log(
    JSON.stringify(
      {
        project: projectName,
        found: images.length,
        processed,
        skipped,
        output: path.relative(process.cwd(), proxiesDir),
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
