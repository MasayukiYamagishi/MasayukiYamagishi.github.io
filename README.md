# MasayukiYamagishi.github.io

Masayuki Yamagishiのエンジニアポートフォリオサイトです。

日本語・英語のプロフィール、スキル、プロジェクト、職務経験、技術記事を掲載します。Next.jsの静的エクスポートを使用し、GitHub Pagesへデプロイします。

## 技術スタック

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm
- Storybook
- Vitest
- Playwright
- Sharp
- YAML / Zod

## 必要な環境

- Node.js 24
- pnpm 11.22.0

使用するpnpmのバージョンは、`package.json`の`packageManager`フィールドで固定しています。

## セットアップ

リポジトリをクローンし、依存関係をインストールします。

実行場所: リポジトリルート

```powershell
git clone git@github.com:MasayukiYamagishi/MasayukiYamagishi.github.io.git
cd MasayukiYamagishi.github.io
pnpm install --frozen-lockfile
```

PlaywrightのChromiumがインストールされていない場合は、ブラウザテスト用に追加します。

実行場所: リポジトリルート

```powershell
pnpm exec playwright install chromium
```

## 開発サーバーの起動

実行場所: リポジトリルート

```powershell
pnpm dev
```

起動後、ブラウザで[http://localhost:3000](http://localhost:3000)を開きます。

## Storybookの起動

コンポーネントを単体で確認するときはStorybookを起動します。

実行場所: リポジトリルート

```powershell
pnpm storybook
```

起動後、ブラウザで[http://localhost:6006](http://localhost:6006)を開きます。

## テストと品質チェック

### ESLint

実行場所: リポジトリルート

```powershell
pnpm lint
```

### Vitest

現在のVitest設定は、StorybookのstoryをPlaywrightのChromium上でテストします。

テストを1回実行して終了する場合は、次のコマンドを使用します。

実行場所: リポジトリルート

```powershell
pnpm exec vitest run
```

ファイル変更を監視しながらテストする場合は、次のコマンドを使用します。

実行場所: リポジトリルート

```powershell
pnpm exec vitest
```

### Storybookの静的ビルド

実行場所: リポジトリルート

```powershell
pnpm build-storybook
```

生成結果は`storybook-static/`に出力されます。

### 本番ビルド

実行場所: リポジトリルート

```powershell
pnpm build
```

`pnpm build`の前に`prebuild`として画像変換が自動実行されます。Next.jsの静的エクスポート結果は`out/`に出力されます。

## 新しい記事を追加する

### 1. 記事一式を生成する

slugには、小文字英数字をハイフンで区切った値を指定します。

実行場所: リポジトリルート

```powershell
pnpm post:new -- --slug published-my-zenn-article
```

このコマンドは、次のファイルとディレクトリを生成します。

```text
src/content/posts/published-my-zenn-article/
├─ post.yaml
├─ ja.mdx
└─ en.mdx

assets/posts/published-my-zenn-article/
└─ content/
   └─ .gitkeep
```

slugは記事URLと画像ディレクトリの識別子として使用します。一度作成した記事のslugは、公開後に変更しないでください。

### 2. 記事メタデータを編集する

ファイル名: `src/content/posts/published-my-zenn-article/post.yaml`

```yaml
title:
  ja: "Zennに記事を投稿しました"
  en: "I published an article on Zenn"

description:
  ja: "Zennに投稿した記事の概要と補足を紹介します。"
  en: "An overview and additional notes about my Zenn article."

publishedAt: "2026-08-25"

thumbnail:
  alt:
    ja: "Zennの記事を紹介するサムネイル"
    en: "Thumbnail introducing the Zenn article"

ogImage:
  alt:
    ja: "Zennの記事紹介ページのOG画像"
    en: "Open Graph image for the Zenn article introduction"
```

最終更新日がある場合は、`updatedAt`を追加します。

ファイル名: `src/content/posts/published-my-zenn-article/post.yaml`

```yaml
updatedAt: "2026-09-01"
```

日付は`YYYY-MM-DD`形式で記述します。メタデータはビルド時にZodで検証され、不足や形式不正がある場合はビルドが失敗します。

slugは記事ディレクトリ名から取得するため、`post.yaml`には記述しません。生成画像のパスと寸法もslugから自動的に組み立てられます。

### 3. 記事本文を編集する

- 日本語本文: `src/content/posts/published-my-zenn-article/ja.mdx`
- 英語本文: `src/content/posts/published-my-zenn-article/en.mdx`

タイトル、説明、投稿日、画像情報は`post.yaml`で管理するため、本文ファイルへ重複して記述しません。

### 4. オリジナル画像を配置する

変換前の画像は`assets/posts/<slug>/`に配置します。

```text
assets/posts/published-my-zenn-article/
├─ thumbnail.png
├─ og.png
└─ content/
   └─ article-image.png
```

サムネイル画像の条件は次のとおりです。

- ファイル名: `thumbnail`。拡張子は対応形式から選択
- 最小解像度: 1600×900
- アスペクト比: 16:9。誤差2%以内
- 出力: `thumbnail-detail.webp`、1600×900

OG画像の条件は次のとおりです。

- ファイル名: `og`。拡張子は対応形式から選択
- 最小解像度: 1200×630
- アスペクト比: 1200:630。誤差2%以内
- 出力: `og.jpg`、1200×630

サムネイルとOG画像で使用できる入力形式は、PNG、JPEG、WebP、AVIF、TIFF、SVGです。

記事本文用の画像は`assets/posts/<slug>/content/`へ配置します。通常の画像は最大幅1600pxのWebPへ変換され、GIFとSVGはそのままコピーされます。

### 5. 画像を変換する

実行場所: リポジトリルート

```powershell
pnpm images:build
```

生成画像は`public/images/posts/<slug>/`へ出力されます。

```text
public/images/posts/published-my-zenn-article/
├─ thumbnail-detail.webp
├─ og.jpg
└─ content/
   └─ article-image.webp
```

`public/images/posts/`は画像変換のたびに再生成され、Git管理の対象外です。このディレクトリへ手作業でファイルを追加しないでください。

### 6. 記事を確認する

画像変換後に開発サーバーを起動し、日本語・英語の両方で表示を確認します。

実行場所: リポジトリルート

```powershell
pnpm images:build
pnpm dev
```

記事の公開前に、少なくとも次のコマンドが成功することを確認してください。

実行場所: リポジトリルート

```powershell
pnpm lint
pnpm exec vitest run
pnpm build
```

## 主なディレクトリ

| パス                       | 役割                                         |
| -------------------------- | -------------------------------------------- |
| `src/app/`                 | Next.js App Routerのページとレイアウト       |
| `src/components/layout/`   | Header、Footerなどのレイアウトコンポーネント |
| `src/components/sections/` | ホームページのセクション                     |
| `src/components/ui/`       | 再利用可能なUIコンポーネント                 |
| `src/content/posts/`       | 記事のメタデータと本文                       |
| `src/i18n/`                | locale設定と日本語・英語の辞書               |
| `assets/posts/`            | 記事画像の変換前オリジナル                   |
| `public/images/posts/`     | 自動生成された配信用画像                     |
| `scripts/`                 | 記事生成と画像変換のスクリプト               |

## デプロイ

`main`ブランチへpushすると、GitHub Actionsが次の処理を実行します。

1. pnpmとNode.jsのセットアップ
2. `pnpm install --frozen-lockfile`
3. `pnpm build`
4. `out/`をGitHub Pagesへデプロイ

ワークフローは`.github/workflows/pages.yml`で管理しています。

featureブランチへのpushは自動デプロイされません。公開する内容は、ローカルで品質チェックを完了してから`main`ブランチへマージしてください。
