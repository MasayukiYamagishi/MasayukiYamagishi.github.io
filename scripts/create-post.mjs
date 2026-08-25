import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { stringify } from "yaml";

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));

const PROJECT_ROOT = path.resolve(SCRIPT_DIRECTORY, "..");

const POSTS_ROOT = path.join(PROJECT_ROOT, "src", "content", "posts");

const POST_ASSETS_ROOT = path.join(PROJECT_ROOT, "assets", "posts");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getSlug() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
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

  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      [
        `slugが不正です: ${slug}`,
        "小文字英数字をハイフンで区切ってください。",
        "例: my-first-post",
      ].join("\n"),
    );
  }

  return slug;
}

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function getTodayInJapan() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function createPostMetadata() {
  return {
    title: {
      ja: "",
      en: "",
    },
    description: {
      ja: "",
      en: "",
    },
    publishedAt: getTodayInJapan(),
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

async function createPost(slug) {
  const postDirectory = path.join(POSTS_ROOT, slug);

  const assetDirectory = path.join(POST_ASSETS_ROOT, slug);

  if (await pathExists(postDirectory)) {
    throw new Error(`記事はすでに存在します: ${postDirectory}`);
  }

  if (await pathExists(assetDirectory)) {
    throw new Error(`画像ディレクトリはすでに存在します: ${assetDirectory}`);
  }

  await mkdir(postDirectory, {
    recursive: true,
  });

  await mkdir(path.join(assetDirectory, "content"), {
    recursive: true,
  });

  const metadata = createPostMetadata();

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
  const slug = getSlug();

  await mkdir(POSTS_ROOT, {
    recursive: true,
  });

  await mkdir(POST_ASSETS_ROOT, {
    recursive: true,
  });

  await createPost(slug);
}

main().catch((error) => {
  console.error("");
  console.error(error instanceof Error ? error.message : String(error));

  process.exitCode = 1;
});
