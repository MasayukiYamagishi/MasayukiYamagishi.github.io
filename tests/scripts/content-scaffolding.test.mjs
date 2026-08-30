import assert from "node:assert/strict";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parse } from "yaml";

import {
  createPost,
  getTodayInJapan,
  parsePostSlug,
} from "../../scripts/create-post.mjs";
import {
  createProject,
  parseProjectSlug,
} from "../../scripts/create-project.mjs";

async function createTemporaryProject(t) {
  const projectRoot = await mkdtemp(
    path.join(os.tmpdir(), "content-scaffolding-"),
  );

  t.after(async () => {
    await rm(projectRoot, {
      recursive: true,
      force: true,
    });
  });

  return projectRoot;
}

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function sortedKeys(value) {
  return Object.keys(value).sort();
}

test("post:newはオプションと位置引数のslugを受け付ける", () => {
  assert.equal(parsePostSlug(["--slug", "my-first-post"]), "my-first-post");

  assert.equal(parsePostSlug(["my-first-post"]), "my-first-post");

  assert.throws(
    () => parsePostSlug(["--slug", "my-first-post", "another-post"]),
    /どちらかで指定/,
  );

  assert.throws(
    () => parsePostSlug(["first-post", "second-post"]),
    /1つだけ指定/,
  );
});

test("project:newはオプションと位置引数のslugを受け付ける", () => {
  assert.equal(
    parseProjectSlug(["--slug", "portfolio-site"]),
    "portfolio-site",
  );

  assert.equal(parseProjectSlug(["portfolio-site"]), "portfolio-site");
});

test("日本時間の日付をYYYY-MM-DD形式で生成する", () => {
  const date = getTodayInJapan(new Date("2026-08-29T15:00:00.000Z"));

  assert.equal(date, "2026-08-30");
});

test("有効なslugで記事一式を生成する", async (t) => {
  const projectRoot = await createTemporaryProject(t);
  const slug = "my-first-post";

  await createPost(slug, {
    projectRoot,
    now: new Date("2026-08-29T15:00:00.000Z"),
  });

  const postDirectory = path.join(projectRoot, "src", "content", "posts", slug);

  const assetDirectory = path.join(projectRoot, "assets", "posts", slug);

  assert.equal(await pathExists(path.join(postDirectory, "post.yaml")), true);
  assert.equal(await pathExists(path.join(postDirectory, "ja.mdx")), true);
  assert.equal(await pathExists(path.join(postDirectory, "en.mdx")), true);
  assert.equal(
    await pathExists(path.join(assetDirectory, "content", ".gitkeep")),
    true,
  );

  const metadata = parse(
    await readFile(path.join(postDirectory, "post.yaml"), "utf8"),
  );

  assert.equal(metadata.publishedAt, "2026-08-30");

  assert.deepEqual(sortedKeys(metadata), [
    "description",
    "ogImage",
    "publishedAt",
    "thumbnail",
    "title",
  ]);
});

test("無効な記事slugでは何も生成しない", async (t) => {
  const projectRoot = await createTemporaryProject(t);

  await assert.rejects(
    () =>
      createPost("../outside", {
        projectRoot,
      }),
    /slugが不正/,
  );

  assert.equal(await pathExists(path.join(projectRoot, "src")), false);
});

test("既存の記事ディレクトリを上書きしない", async (t) => {
  const projectRoot = await createTemporaryProject(t);
  const slug = "existing-post";

  const postDirectory = path.join(projectRoot, "src", "content", "posts", slug);

  await mkdir(postDirectory, {
    recursive: true,
  });

  const metadataPath = path.join(postDirectory, "post.yaml");

  await writeFile(metadataPath, "sentinel", "utf8");

  await assert.rejects(
    () =>
      createPost(slug, {
        projectRoot,
      }),
    /すでに存在/,
  );

  assert.equal(await readFile(metadataPath, "utf8"), "sentinel");
});

test("既存の画像ディレクトリがあれば記事を生成しない", async (t) => {
  const projectRoot = await createTemporaryProject(t);
  const slug = "existing-assets";

  await mkdir(path.join(projectRoot, "assets", "posts", slug), {
    recursive: true,
  });

  await assert.rejects(
    () =>
      createPost(slug, {
        projectRoot,
      }),
    /画像ディレクトリはすでに存在/,
  );

  assert.equal(
    await pathExists(path.join(projectRoot, "src", "content", "posts", slug)),
    false,
  );
});

test("Projectのorderは既存最大値の次になる", async (t) => {
  const projectRoot = await createTemporaryProject(t);

  const projectsRoot = path.join(projectRoot, "src", "content", "projects");

  const firstDirectory = path.join(projectsRoot, "first-project");
  const secondDirectory = path.join(projectsRoot, "second-project");

  await mkdir(firstDirectory, {
    recursive: true,
  });
  await mkdir(secondDirectory, {
    recursive: true,
  });

  await writeFile(
    path.join(firstDirectory, "project.yaml"),
    "order: 2\n",
    "utf8",
  );

  await writeFile(
    path.join(secondDirectory, "project.yaml"),
    "order: 7\n",
    "utf8",
  );

  await createProject("new-project", {
    projectRoot,
  });

  const generatedPath = path.join(projectsRoot, "new-project", "project.yaml");

  const metadata = parse(await readFile(generatedPath, "utf8"));

  assert.equal(metadata.order, 8);

  assert.deepEqual(sortedKeys(metadata), [
    "description",
    "order",
    "tags",
    "title",
    "url",
  ]);
});

test("壊れた既存Project YAMLがあれば生成を中止する", async (t) => {
  const projectRoot = await createTemporaryProject(t);

  const brokenDirectory = path.join(
    projectRoot,
    "src",
    "content",
    "projects",
    "broken-project",
  );

  await mkdir(brokenDirectory, {
    recursive: true,
  });

  await writeFile(
    path.join(brokenDirectory, "project.yaml"),
    "order: [\n",
    "utf8",
  );

  await assert.rejects(
    () =>
      createProject("new-project", {
        projectRoot,
      }),
    /解析できません/,
  );

  assert.equal(
    await pathExists(
      path.join(projectRoot, "src", "content", "projects", "new-project"),
    ),
    false,
  );
});

test("既存のProjectディレクトリを上書きしない", async (t) => {
  const projectRoot = await createTemporaryProject(t);

  const projectDirectory = path.join(
    projectRoot,
    "src",
    "content",
    "projects",
    "existing-project",
  );

  await mkdir(projectDirectory, {
    recursive: true,
  });

  const metadataPath = path.join(projectDirectory, "project.yaml");

  await writeFile(metadataPath, "sentinel", "utf8");

  await assert.rejects(
    () =>
      createProject("existing-project", {
        projectRoot,
      }),
    /すでに存在/,
  );

  assert.equal(await readFile(metadataPath, "utf8"), "sentinel");
});
