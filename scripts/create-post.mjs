import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { stringify } from "yaml";

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_ROOT = path.resolve(SCRIPT_DIRECTORY, "..");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasErrorCode(error, code) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

function assertValidSlug(slug) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      [
        `slugが不正です: ${slug}`,
        "小文字英数字をハイフンで区切ってください。",
        "例: my-first-post",
      ].join("\n"),
    );
  }
}

function assertPathInsideProject(projectRoot, targetPath) {
  const relativePath = path.relative(projectRoot, targetPath);

  if (
    relativePath === "" ||
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`生成先がプロジェクト外です: ${targetPath}`);
  }
}

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch (error) {
    if (hasErrorCode(error, "ENOENT")) {
      return false;
    }

    throw error;
  }
}

export function parsePostSlug(args = process.argv.slice(2)) {
  const { values, positionals } = parseArgs({
    args,
    options: {
      slug: {
        type: "string",
        short: "s",
      },
    },
    allowPositionals: true,
    strict: true,
  });

  if (values.slug && positionals.length > 0) {
    throw new Error("slugはオプションか位置引数のどちらかで指定してください。");
  }

  if (positionals.length > 1) {
    throw new Error("位置引数はslugの1つだけ指定できます。");
  }

  const slug = values.slug ?? positionals[0];

  if (!slug) {
    throw new Error(
      [
        "記事のslugを指定してください。",
        "",
        "例:",
        "pnpm post:new -- --slug my-first-post",
      ].join("\n"),
    );
  }

  assertValidSlug(slug);

  return slug;
}

export function getTodayInJapan(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function createPostMetadata(publishedAt) {
  return {
    title: {
      ja: "",
      en: "",
    },
    description: {
      ja: "",
      en: "",
    },
    publishedAt,
    thumbnail: {
      alt: {
        ja: "",
        en: "",
      },
    },
    ogImage: {
      alt: {
        ja: "",
        en: "",
      },
    },
  };
}

export async function createPost(
  slug,
  { projectRoot = DEFAULT_PROJECT_ROOT, now = new Date() } = {},
) {
  assertValidSlug(slug);

  const postsRoot = path.join(projectRoot, "src", "content", "posts");
  const postAssetsRoot = path.join(projectRoot, "assets", "posts");

  const postDirectory = path.join(postsRoot, slug);
  const assetDirectory = path.join(postAssetsRoot, slug);

  assertPathInsideProject(projectRoot, postDirectory);
  assertPathInsideProject(projectRoot, assetDirectory);

  if (await pathExists(postDirectory)) {
    throw new Error(`記事はすでに存在します: ${postDirectory}`);
  }

  if (await pathExists(assetDirectory)) {
    throw new Error(`画像ディレクトリはすでに存在します: ${assetDirectory}`);
  }

  await mkdir(postsRoot, {
    recursive: true,
  });

  await mkdir(postAssetsRoot, {
    recursive: true,
  });

  // recursiveを付けず、同時実行時にも既存ディレクトリを拒否する
  await mkdir(postDirectory);
  await mkdir(assetDirectory);
  await mkdir(path.join(assetDirectory, "content"));

  const metadata = createPostMetadata(getTodayInJapan(now));

  await Promise.all([
    writeFile(path.join(postDirectory, "post.yaml"), stringify(metadata), {
      encoding: "utf8",
      flag: "wx",
    }),
    writeFile(
      path.join(postDirectory, "ja.mdx"),
      "{/* 日本語の記事本文を記述してください。 */}\n",
      {
        encoding: "utf8",
        flag: "wx",
      },
    ),
    writeFile(
      path.join(postDirectory, "en.mdx"),
      "{/* Write the English article content here. */}\n",
      {
        encoding: "utf8",
        flag: "wx",
      },
    ),
    writeFile(path.join(assetDirectory, "content", ".gitkeep"), "", {
      encoding: "utf8",
      flag: "wx",
    }),
  ]);

  console.log(`✓ 記事を作成しました: ${slug}`);
  console.log("");
  console.log("次のファイルを編集してください:");
  console.log(`  src/content/posts/${slug}/post.yaml`);
  console.log(`  src/content/posts/${slug}/ja.mdx`);
  console.log(`  src/content/posts/${slug}/en.mdx`);
  console.log("");
  console.log("次の画像を配置してください:");
  console.log(`  assets/posts/${slug}/thumbnail.png`);
  console.log(`  assets/posts/${slug}/og.png`);
}

async function main() {
  const slug = parsePostSlug();

  await createPost(slug);
}

const entryPath = process.argv[1];

if (
  entryPath &&
  pathToFileURL(path.resolve(entryPath)).href === import.meta.url
) {
  main().catch((error) => {
    console.error("");
    console.error(error instanceof Error ? error.message : String(error));

    process.exitCode = 1;
  });
}
