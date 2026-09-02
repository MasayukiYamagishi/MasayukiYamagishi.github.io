import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { parse, stringify } from "yaml";

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
        "例: portfolio-site",
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

export function parseProjectSlug(args = process.argv.slice(2)) {
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
        "プロジェクトのslugを指定してください。",
        "",
        "例:",
        "pnpm project:new -- --slug portfolio-site",
      ].join("\n"),
    );
  }

  assertValidSlug(slug);

  return slug;
}

async function readProjectOrder(projectDirectory) {
  const filePath = path.join(projectDirectory, "project.yaml");

  let source;

  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`既存のproject.yamlを読み込めません: ${filePath}`, {
      cause: error,
    });
  }

  let rawProject;

  try {
    rawProject = parse(source);
  } catch (error) {
    throw new Error(`既存のproject.yamlを解析できません: ${filePath}`, {
      cause: error,
    });
  }

  if (
    typeof rawProject !== "object" ||
    rawProject === null ||
    Array.isArray(rawProject) ||
    !Number.isInteger(rawProject.order) ||
    rawProject.order < 1
  ) {
    throw new Error(`既存のproject.yamlのorderが不正です: ${filePath}`);
  }

  return rawProject.order;
}

async function getNextProjectOrder(projectsRoot) {
  let entries;

  try {
    entries = await readdir(projectsRoot, {
      withFileTypes: true,
    });
  } catch (error) {
    if (hasErrorCode(error, "ENOENT")) {
      return 1;
    }

    throw error;
  }

  const directories = entries.filter(
    (entry) => entry.isDirectory() && !entry.name.startsWith("."),
  );

  const invalidDirectory = directories.find(
    (entry) => !SLUG_PATTERN.test(entry.name),
  );

  if (invalidDirectory) {
    throw new Error(
      `既存のプロジェクトディレクトリ名が不正です: ${invalidDirectory.name}`,
    );
  }

  const orders = await Promise.all(
    directories.map((entry) =>
      readProjectOrder(path.join(projectsRoot, entry.name)),
    ),
  );

  if (orders.length === 0) {
    return 1;
  }

  return Math.max(...orders) + 1;
}

function createProjectMetadata(order) {
  return {
    order,
    url: "",
    title: {
      ja: "",
      en: "",
    },
    tags: [],
    description: {
      ja: "",
      en: "",
    },
  };
}

export async function createProject(
  slug,
  { projectRoot = DEFAULT_PROJECT_ROOT } = {},
) {
  assertValidSlug(slug);

  const projectsRoot = path.join(projectRoot, "src", "content", "projects");

  const projectDirectory = path.join(projectsRoot, slug);

  assertPathInsideProject(projectRoot, projectDirectory);

  if (await pathExists(projectDirectory)) {
    throw new Error(`プロジェクトはすでに存在します: ${projectDirectory}`);
  }

  // 既存YAMLに問題があれば、ディレクトリ作成前に失敗する
  const order = await getNextProjectOrder(projectsRoot);

  await mkdir(projectsRoot, {
    recursive: true,
  });

  // recursiveを付けず、同時実行時の上書きも防ぐ
  await mkdir(projectDirectory);

  await writeFile(
    path.join(projectDirectory, "project.yaml"),
    stringify(createProjectMetadata(order)),
    {
      encoding: "utf8",
      flag: "wx",
    },
  );

  console.log(`✓ プロジェクトを作成しました: ${slug}`);
  console.log(`  order: ${order}`);
  console.log("");
  console.log("次のファイルを編集してください:");
  console.log(`  src/content/projects/${slug}/project.yaml`);
  console.log("");
  console.log(
    "注意: 初期値は未完成です。URL、日英テキスト、タグを入力してください。",
  );
}

async function main() {
  const slug = parseProjectSlug();

  await createProject(slug);
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
