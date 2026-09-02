# Issue #2: 記事メタデータと記事詳細ページ

対象: [記事メタデータをNode.jsから直接解析できる形式へ移行する #2](https://github.com/MasayukiYamagishi/MasayukiYamagishi.github.io/issues/2)

## 目的

記事ディレクトリを追加するだけで、ホームのPosts一覧と日本語・英語の記事詳細ページが静的出力へ反映される状態にする。記事ごとの手書きimport一覧は作らず、不正なメタデータはビルド時に失敗させる。

## Issueに対する現状評価

| Issueの要件 | 状態 | 根拠・残件 |
| --- | --- | --- |
| Node.jsで解析できるメタデータ形式 | 対応済み | `post.yaml` を `yaml` で解析している |
| 記事ディレクトリの自動走査 | 対応済み | `src/content/posts/index.ts` がディレクトリを走査している |
| メタデータ検証 | おおむね対応済み | `src/content/posts/schema.ts` がZodで日英テキスト、日付、画像altを検証している |
| 一覧と詳細で同じメタデータを利用 | 一部対応 | 一覧は `getPosts()` を利用。詳細ページは未実装 |
| `output: "export"` への対応 | 一部対応 | `next.config.ts` は設定済み。動的な記事ルートが未実装 |
| `generateStaticParams` への対応 | 未対応 | `/posts/[slug]` と `/en/posts/[slug]` が存在しない |
| 記事ごとの静的import列挙を廃止 | メタデータは対応済み | MDX本文をslugとlocaleから読み込む経路が未実装 |
| `pnpm lint` と `pnpm build` | 最終確認が必要 | 詳細ページ追加後に再確認する |

Issue #2の中心となるYAML方式は既に成立している。MDX Frontmatterへ戻す理由はない。メタデータを `post.yaml`、本文を `ja.mdx` と `en.mdx` に分けることで、一覧表示はMDXコンパイルに依存せず、両言語の必須性もZodで一か所から検証できる。

## 実装方針

### 1. MDXをNext.jsで読み込めるようにする

Next.js 16.3.1に同梱されたガイドに従い、`@next/mdx` と必要なMDXパッケージを設定する。App Routerでは `mdx-components.tsx` が必須である。

初期段階では、見出し、段落、リスト、リンク、コード、画像など一般的なMarkdownを中心に対応する。独自コンポーネントは必要性が明確になってから追加する。

想定する変更対象:

- `package.json`
- `pnpm-lock.yaml`
- `next.config.ts`
- `src/mdx-components.tsx`

### 2. slugとlocaleから本文を解決する

`src/content/posts/<slug>/<locale>.mdx` を動的にimportする、サーバー側専用の読み込み関数を用意する。localeは `Locale` 型で `ja` または `en` に限定し、slugは走査済みの記事から取得する。

`@next/mdx` はFrontmatterを標準サポートしないため、本文からメタデータを再抽出しない。詳細ページも `getPostBySlug()` から既存のYAMLメタデータを取得する。

想定する変更対象:

- `src/content/posts/index.ts`
- 必要な場合のみ `src/content/posts/content.ts`

`fs` を利用するモジュールがClient Componentへ誤って取り込まれないよう、Postsのエントリーポイントにも `server-only` を明示する。

### 3. 日本語・英語の記事詳細ルートを追加する

既存のルートグループとURL規則を維持する。

```text
src/app/(ja)/posts/[slug]/page.tsx     -> /posts/<slug>
src/app/(en)/en/posts/[slug]/page.tsx  -> /en/posts/<slug>
```

両ページは薄いルートコンポーネントとし、記事ヘッダーと本文の表示は共有コンポーネントへ寄せる。日本語用・英語用ページで同じレイアウトを二重実装しない。

ページでは次を行う。

- Next.js 16の非同期 `params` を `await` する。
- `getPostBySlug()` でメタデータを取得する。
- 記事が見つからなければ `notFound()` を呼ぶ。
- localeに対応するMDX本文を読み込む。
- タイトル、公開日、更新日、本文をセマンティックな `article` 要素で表示する。
- ホームへ戻る導線を設ける。

### 4. 静的ルートを生成する

各記事詳細ページの `generateStaticParams()` は `getPosts()` のslug一覧から全記事を返す。`output: "export"` ではビルド時に全動的ルートが確定している必要がある。

未登録slugを受け付けないことを明確にするため、`dynamicParams = false` を指定する。記事数が0件のときにもビルドできることを確認する。

記事の追加時に編集するのはコンテンツディレクトリだけとし、ルート側のimportやslug一覧は変更しない。

### 5. ページ固有のメタデータを生成する

`generateMetadata()` でも `getPostBySlug()` を利用し、表示内容と同じYAMLから次を組み立てる。

- `title`
- `description`
- Open Graph画像とalt
- 必要に応じて公開日・更新日

画像URLは既存の `Post` が持つ `/images/posts/<slug>/og.jpg` を使用する。canonical URLや言語間のalternateは、サイト全体のmetadata方針を確認してから同じ作業内で追加可否を判断する。

### 6. 記事表示の最低限の品質を整える

- 本文幅と行長を読みやすい範囲にする。
- 見出し階層を崩さない。
- 外部リンクを識別可能にし、キーボードフォーカスを見える状態にする。
- 本文画像にaltを必須とし、装飾画像では空altを使い分ける。
- コードブロックがモバイル幅でページ全体を横スクロールさせないようにする。
- `prefers-reduced-motion` と既存テーマ変数を尊重する。

## 検証

### 自動検証

- 正常なYAMLから日英の `Post` を生成できる。
- 必須項目不足、余分な項目、不正な日付、不正なslugを検出できる。
- 存在しないslugが404になる。
- `generateStaticParams()` が全記事slugを返す。
- 日本語ページが `ja.mdx`、英語ページが `en.mdx` を表示する。
- `pnpm lint`、`pnpm exec vitest run`、`pnpm build` が成功する。

### 目視確認

- `/posts/<slug>` と `/en/posts/<slug>` を直接開ける。
- 日本語カードは日本語記事、英語カードは英語記事へ遷移する。
- タイトル、日付、本文、OG画像用metadataが正しい。
- ライト・ダークテーマ、モバイル幅、キーボード操作で問題がない。
- `out/posts/<slug>.html` と `out/en/posts/<slug>.html`、または設定に応じた同等の静的ファイルが生成される。

## 完了条件

- 新しい記事ディレクトリを追加すると、コード側のimport編集なしで一覧と日英の詳細ルートへ反映される。
- 一覧と詳細ページが同じ検証済みYAMLメタデータを利用する。
- 不正なYAMLまたは不足している日英ファイルをビルド時に検出できる。
- 記事カードのリンク先が404にならない。
- Issue #2に記載された完了条件と品質コマンドを満たす。

## 対象外

- CMS、下書き、予約公開
- 記事検索、タグ、カテゴリ、ページネーション
- コメント、リアクション、閲覧数
- MDXで利用できる任意Reactコンポーネントの全面開放

