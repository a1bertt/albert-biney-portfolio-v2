import { readdir } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';
import { spawn } from 'node:child_process';

const bucket = process.env.R2_BUCKET ?? 'albert-biney-media';
const publicDirectory = new URL('../public/', import.meta.url);
const concurrency = Number.parseInt(process.env.R2_SYNC_CONCURRENCY ?? '4', 10);

const contentTypes = new Map([
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.mp4', 'video/mp4'],
  ['.svg', 'image/svg+xml'],
]);

async function listFiles(directory) {
  const entries = (await readdir(directory, { withFileTypes: true })).filter(
    (entry) => entry.name !== '.DS_Store',
  );
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );

  return nestedFiles.flat();
}

function toObjectKey(filePath) {
  const sourcePath = relative(publicDirectory.pathname, filePath).split(sep).join('/');

  if (sourcePath.startsWith('images/stills/')) {
    return sourcePath.slice('images/'.length);
  }

  if (sourcePath.startsWith('moving/')) {
    return `moving-images/${sourcePath.slice('moving/'.length)}`;
  }

  if (sourcePath === 'favicon.ico' || sourcePath === 'favicon.svg') {
    return `site-assets/favicons/${sourcePath}`;
  }

  if (sourcePath.startsWith('images/')) {
    return `site-assets/${sourcePath}`;
  }

  if (sourcePath === 'CNAME') {
    return 'site-assets/config/CNAME';
  }

  return `site-assets/misc/${sourcePath}`;
}

function upload(filePath, objectKey) {
  const extension = extname(filePath).toLowerCase();
  const args = [
    'wrangler',
    'r2',
    'object',
    'put',
    `${bucket}/${objectKey}`,
    '--file',
    filePath,
    '--remote',
  ];
  const contentType = contentTypes.get(extension);

  if (contentType) {
    args.push('--content-type', contentType);
  }

  return new Promise((resolve, reject) => {
    const child = spawn('npx', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (chunk) => {
      output += chunk;
    });
    child.stderr.on('data', (chunk) => {
      output += chunk;
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${objectKey}\n${output.trim()}`));
      }
    });
  });
}

const files = (await listFiles(publicDirectory.pathname)).sort();
let nextIndex = 0;
let completed = 0;
const failures = [];

async function worker() {
  while (nextIndex < files.length) {
    const filePath = files[nextIndex];
    nextIndex += 1;
    const objectKey = toObjectKey(filePath);

    try {
      await upload(filePath, objectKey);
      completed += 1;
      process.stdout.write(`[${completed}/${files.length}] ${objectKey}\n`);
    } catch (error) {
      failures.push(error);
      process.stderr.write(`FAILED: ${error.message}\n`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

if (failures.length > 0) {
  throw new AggregateError(failures, `${failures.length} R2 uploads failed`);
}

console.log(`Uploaded ${completed} objects to ${bucket}.`);
