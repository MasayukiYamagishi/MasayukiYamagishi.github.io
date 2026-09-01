import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROJECT_ROOT = process.cwd();

const SOURCE_ROOT = path.join(PROJECT_ROOT, "assets", "posts");

const OUTPUT_ROOT = path.join(PROJECT_ROOT, "public", "images", "posts");

const SHARP_INPUT_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".tif",
  ".tiff",
  ".svg",
]);

const CONTENT_COPY_EXTENSIONS = new Set([".gif", ".svg"]);

const POSTS_CONTENT_ROOT = path.join(PROJECT_ROOT, "src", "content", "posts");

const FALLBACK_THUMBNAIL_SOURCE = path.join(
  SOURCE_ROOT,
  "fallback-thumbnail-1600x900.png",
);

const FALLBACK_OG_SOURCE = path.join(SOURCE_ROOT, "fallback-og-1200x630.png");

const THUMBNAIL_CARD = {
  width: 800,
  height: 450,
};

const THUMBNAIL_DETAIL = {
  width: 1600,
  height: 900,
};

const OG_IMAGE = {
  width: 1200,
  height: 630,
};

const CONTENT_MAX_WIDTH = 1600;

function isEnoent(error) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

function assertSafeOutputDirectory() {
  const relativePath = path.relative(PROJECT_ROOT, OUTPUT_ROOT);

  if (
    relativePath === "" ||
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`unsafe output directory: ${OUTPUT_ROOT}`);
  }
}

async function findOptionalImage(directory, baseName) {
  let entries;

  try {
    entries = await readdir(directory, {
      withFileTypes: true,
    });
  } catch (error) {
    if (isEnoent(error)) {
      return undefined;
    }

    throw error;
  }

  const matches = entries.filter((entry) => {
    if (!entry.isFile()) {
      return false;
    }

    const parsed = path.parse(entry.name);

    return (
      parsed.name.toLowerCase() === baseName &&
      SHARP_INPUT_EXTENSIONS.has(parsed.ext.toLowerCase())
    );
  });

  if (matches.length > 1) {
    throw new Error(`${directory}に${baseName}画像が複数存在します。`);
  }

  const match = matches[0];

  return match ? path.join(directory, match.name) : undefined;
}

async function validateSourceImage(
  inputPath,
  { label, minimumWidth, minimumHeight, expectedAspectRatio },
) {
  const metadata = await sharp(inputPath).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`${label}の寸法を取得できません: ${inputPath}`);
  }

  if (metadata.width < minimumWidth || metadata.height < minimumHeight) {
    throw new Error(
      [
        `${label}の解像度が不足しています。`,
        `入力画像: ${metadata.width}×${metadata.height}`,
        `必要: ${minimumWidth}×${minimumHeight}以上`,
        `ファイル: ${inputPath}`,
      ].join(" "),
    );
  }

  const actualAspectRatio = metadata.width / metadata.height;

  const difference =
    Math.abs(actualAspectRatio - expectedAspectRatio) / expectedAspectRatio;

  // 2%を超える場合は意図しない切り抜きを防ぐために失敗させる
  if (difference > 0.02) {
    throw new Error(
      [
        `${label}のアスペクト比が不正です。`,
        `入力画像: ${metadata.width}:${metadata.height}`,
        `期待値: ${expectedAspectRatio.toFixed(4)}`,
        `ファイル: ${inputPath}`,
      ].join(" "),
    );
  }
}

async function writeFixedWebp(inputPath, outputPath, { width, height }) {
  await mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  const info = await sharp(inputPath)
    .rotate()
    .resize({
      width,
      height,
      fit: "cover",
      position: "centre",
    })
    .webp({
      quality: 82,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(outputPath);

  console.log(
    `✓ ${path.relative(PROJECT_ROOT, outputPath)} ` +
      `(${info.width}x${info.height})`,
  );
}

async function writeOgImage(inputPath, outputPath) {
  await mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  const info = await sharp(inputPath)
    .rotate()
    .resize({
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      fit: "cover",
      position: "centre",
    })
    .jpeg({
      quality: 88,
      mozjpeg: true,
    })
    .toFile(outputPath);

  console.log(
    `✓ ${path.relative(PROJECT_ROOT, outputPath)} ` +
      `(${info.width}x${info.height})`,
  );
}

async function writeContentWebp(inputPath, outputPath) {
  await mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  const info = await sharp(inputPath)
    .rotate()
    .resize({
      width: CONTENT_MAX_WIDTH,
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(outputPath);

  console.log(
    `✓ ${path.relative(PROJECT_ROOT, outputPath)} ` +
      `(${info.width}x${info.height})`,
  );
}

async function processContentDirectory(sourceDirectory, outputDirectory) {
  let entries;

  try {
    entries = await readdir(sourceDirectory, {
      withFileTypes: true,
    });
  } catch (error) {
    if (isEnoent(error)) {
      return;
    }

    throw error;
  }

  for (const entry of entries) {
    const sourcePath = path.join(sourceDirectory, entry.name);

    const outputPath = path.join(outputDirectory, entry.name);

    if (entry.isDirectory()) {
      await processContentDirectory(sourcePath, outputPath);

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const parsed = path.parse(entry.name);
    const extension = parsed.ext.toLowerCase();

    if (CONTENT_COPY_EXTENSIONS.has(extension)) {
      await mkdir(path.dirname(outputPath), {
        recursive: true,
      });

      await copyFile(sourcePath, outputPath);

      console.log(`✓ ${path.relative(PROJECT_ROOT, outputPath)} copied`);

      continue;
    }

    if (!SHARP_INPUT_EXTENSIONS.has(extension)) {
      console.warn(`⚠ Unsupported image skipped: ${sourcePath}`);

      continue;
    }

    const webpOutputPath = path.join(outputDirectory, `${parsed.name}.webp`);

    await writeContentWebp(sourcePath, webpOutputPath);
  }
}

async function buildPostImages(slug) {
  const sourceDirectory = path.join(SOURCE_ROOT, slug);

  const outputDirectory = path.join(OUTPUT_ROOT, slug);

  const customThumbnailSource = await findOptionalImage(
    sourceDirectory,
    "thumbnail",
  );

  const thumbnailSource = customThumbnailSource ?? FALLBACK_THUMBNAIL_SOURCE;

  await validateSourceImage(thumbnailSource, {
    label: `${slug} thumbnail`,
    minimumWidth: THUMBNAIL_DETAIL.width,
    minimumHeight: THUMBNAIL_DETAIL.height,
    expectedAspectRatio: THUMBNAIL_DETAIL.width / THUMBNAIL_DETAIL.height,
  });

  await writeFixedWebp(
    thumbnailSource,
    path.join(outputDirectory, "thumbnail-card.webp"),
    THUMBNAIL_CARD,
  );

  await writeFixedWebp(
    thumbnailSource,
    path.join(outputDirectory, "thumbnail-detail.webp"),
    THUMBNAIL_DETAIL,
  );

  const customOgSource = await findOptionalImage(sourceDirectory, "og");

  const ogSource = customOgSource ?? FALLBACK_OG_SOURCE;

  await validateSourceImage(ogSource, {
    label: `${slug} OG image`,
    minimumWidth: OG_IMAGE.width,
    minimumHeight: OG_IMAGE.height,
    expectedAspectRatio: OG_IMAGE.width / OG_IMAGE.height,
  });

  await writeOgImage(ogSource, path.join(outputDirectory, "og.jpg"));

  await processContentDirectory(
    path.join(sourceDirectory, "content"),
    path.join(outputDirectory, "content"),
  );
}

async function main() {
  assertSafeOutputDirectory();

  const entries = await readdir(POSTS_CONTENT_ROOT, {
    withFileTypes: true,
  });

  const postDirectories = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name));

  // OUTPUT_ROOTは出力専用。手作業のファイルを置かないこと
  await rm(OUTPUT_ROOT, {
    recursive: true,
    force: true,
  });

  await mkdir(OUTPUT_ROOT, {
    recursive: true,
  });

  for (const postDirectory of postDirectories) {
    console.log(`\nBuilding images: ${postDirectory.name}`);

    await buildPostImages(postDirectory.name);
  }

  console.log(`\nBuilt images for ${postDirectories.length} posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
