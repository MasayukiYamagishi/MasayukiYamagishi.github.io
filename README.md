# MasayukiYamagishi.github.io

[![CI](https://github.com/MasayukiYamagishi/MasayukiYamagishi.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/MasayukiYamagishi/MasayukiYamagishi.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/MasayukiYamagishi/MasayukiYamagishi.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/MasayukiYamagishi/MasayukiYamagishi.github.io/actions/workflows/pages.yml)

Masayuki Yamagishiのエンジニアポートフォリオです。

プロフィール、スキル、職務経験、個人開発プロジェクト、技術記事を
日本語・英語で掲載しています。

[ポートフォリオを見る](https://masayukiyamagishi.github.io/)

## 特徴

- 日本語・英語に対応したコンテンツ構成
- ライトテーマ・ダークテーマへの対応
- Next.jsによる静的サイト生成
- YAMLとZodを使用したコンテンツ検証
- StorybookによるUIコンポーネントの確認
- Vitest、Playwright、ESLintによる品質チェック
- GitHub ActionsとGitHub Pagesによる継続的デプロイ
- レスポンシブデザイン、アクセシビリティ、Webパフォーマンスへの配慮

## 技術スタック

| 分類           | 技術                         |
| -------------- | ---------------------------- |
| フレームワーク | Next.js 16、React 19         |
| 言語           | TypeScript                   |
| スタイリング   | Tailwind CSS 4               |
| コンテンツ     | YAML、MDX、Zod               |
| UI開発         | Storybook                    |
| テスト         | Vitest、Playwright           |
| 画像処理       | Sharp                        |
| CI/CD          | GitHub Actions、GitHub Pages |
| パッケージ管理 | pnpm                         |

## 必要な環境

- Node.js 24
- pnpm 11.24.0

pnpmのバージョンは、`package.json`の`packageManager`フィールドで
固定しています。

## ローカル開発

```powershell
git clone git@github.com:MasayukiYamagishi/MasayukiYamagishi.github.io.git
cd MasayukiYamagishi.github.io
pnpm install --frozen-lockfile
pnpm dev
```
