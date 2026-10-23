# 2026-10-23 セキュリティ更新

CI の Action は Node 24 / composite の現行公開版を確認して SHA 固定へ更新しました。setup-python では pip 26.2.2 を明示しています。クラウド上の CI 実行は push 後に確認してください。

Node.js は package.json の系列制約に従い、22.23.4 / 24.22.1 / 26.12.1 以降の修正を含む版を使います。依存は既存の npm / pnpm と lockfile から再現します。

根拠: [Node.js](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)、[Next.js](https://nextjs.org/blog/nextjs-security-update-october-14-2026)、[certifi](https://github.com/certifi/python-certifi/security/advisories/GHSA-6q48-6c7w-9gw2)、[Python](https://blog.python.org/2026/10/python-3151-3149-31317/)。各リポジトリの実際の適用範囲と検証結果は作業レポートに記録しています。
