# Third-Party Notices

Last reviewed: 2026-08-30

This repository and the website generated from it include third-party
software, fonts, icons, logos, trademarks, images, and other materials.

These third-party materials are excluded from the MIT License granted by
Masayuki Yamagishi. They remain subject to the licenses, terms of use,
trademark policies, and brand guidelines of their respective owners.

This notice is provided for attribution and identification purposes. It does
not replace or modify the authoritative terms published by each rights holder.

The inclusion of a third-party name, product, service, icon, or logo does not
imply affiliation with, sponsorship by, or endorsement from its owner.

## Software dependencies

Exact package versions are recorded in `package.json` and `pnpm-lock.yaml`.

| Package               | License                                                                              | Project                                      |
| --------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------- |
| `@base-ui/react`      | MIT                                                                                  | https://github.com/mui/base-ui               |
| `lucide-react`        | ISC; some icons are derived from Feather Icons under MIT                             | https://github.com/lucide-icons/lucide       |
| `next`                | MIT                                                                                  | https://github.com/vercel/next.js            |
| `next-themes`         | MIT                                                                                  | https://github.com/pacocoursey/next-themes   |
| `react` / `react-dom` | MIT                                                                                  | https://github.com/reactjs/react.dev         |
| `simple-icons`        | CC0-1.0 for the Simple Icons project; individual icon and trademark terms may differ | https://github.com/simple-icons/simple-icons |
| `yaml`                | ISC                                                                                  | https://github.com/eemeli/yaml               |
| `zod`                 | MIT                                                                                  | https://github.com/colinhacks/zod            |

Development and build dependencies include Storybook, Tailwind CSS, Vite,
Vitest, Playwright, Sharp, and TypeScript. These components retain their
respective upstream licenses. Exact versions are recorded in
`pnpm-lock.yaml`.

## Fonts

The website uses the following font software through `next/font/google`.

| Font         | Copyright                                                   | License                   |
| ------------ | ----------------------------------------------------------- | ------------------------- |
| Geist        | Copyright 2024 The Geist Project Authors                    | SIL Open Font License 1.1 |
| Geist Mono   | Copyright 2024 The Geist Project Authors                    | SIL Open Font License 1.1 |
| Noto Sans JP | Copyright 2014–2021 Adobe, with Reserved Font Name "Source" | SIL Open Font License 1.1 |

Local copies of the authoritative license texts:

- [Geist OFL 1.1](./licenses/fonts/Geist-OFL-1.1.txt)
- [Geist Mono OFL 1.1](./licenses/fonts/GeistMono-OFL-1.1.txt)
- [Noto Sans JP OFL 1.1](./licenses/fonts/NotoSansJP-OFL-1.1.txt)

Upstream sources:

- https://github.com/google/fonts/blob/main/ofl/geist/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/geistmono/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/notosansjp/OFL.txt

## Lucide icons

Interface icons are provided by Lucide through `lucide-react`.

Lucide is licensed under the ISC License:

- Copyright (c) 2026 Lucide Icons and Contributors
- [Local license copy](./licenses/lucide/LICENSE.txt)
- https://github.com/lucide-icons/lucide/blob/main/LICENSE

Some Lucide icons used by this project are derived from Feather Icons and are
licensed under the MIT License:

- Copyright (c) 2013-present Cole Bemis

The upstream Lucide license identifies the applicable Feather-derived icons
and contains both license texts.

## Simple Icons and brand marks

Technology and service icons are provided in part by Simple Icons.

Simple Icons is released under CC0-1.0. However, the Simple Icons license does
not grant trademark rights and does not guarantee that every individual brand
icon is available under CC0.

Simple Icons license and disclaimer:

- [Local CC0-1.0 copy](./licenses/simple-icons/CC0-1.0.txt)
- [Local disclaimer copy](./licenses/simple-icons/DISCLAIMER.md)
- https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md
- https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md

Brand icons currently referenced by this project include:

- Apache Maven
- Claude Code
- CSS
- Cursor
- FastAPI
- Flyway
- Git
- GitHub
- GitHub Actions
- GitHub Copilot
- Gradle
- HTML5
- JUnit 5
- Linux
- Next.js
- OpenJDK
- PostgreSQL
- Prisma
- Python
- React
- Spring Boot
- Storybook
- Tailwind CSS
- TypeScript
- Zod

At the time of the most recent review, Simple Icons metadata identified
additional icon-specific licenses for some icons, including:

- Apache Maven: Apache-2.0
- Git: CC-BY-3.0
- GitHub Copilot: MIT
- OpenJDK: BSD-3-Clause
- Storybook: MIT
- Zod: MIT

The absence of license metadata for another icon must not be interpreted as
permission to use that brand without restriction. Each brand owner's current
trademark and brand guidelines take precedence.

## Official brand assets

The following official brand assets are stored directly in the repository.

### LinkedIn

Files:

- `src/assets/brand/linkedin/LI-In-Bug.png`
- `src/assets/brand/linkedin/InBug-Black.png`
- `src/assets/brand/linkedin/InBug-White.png`

Source and guidelines:

- https://brand.linkedin.com/in-logo

LinkedIn and the LinkedIn logo are trademarks of LinkedIn Corporation and its
affiliates. These assets are used only to identify and link to the portfolio
owner's LinkedIn profile.

### Zenn

Files:

- `src/assets/brand/zenn/logo-only.svg`
- `src/assets/brand/zenn/logo-only-white.svg`

Source and guidelines:

- https://zenn.dev/mediakit

Zenn and the Zenn logo are trademarks or brand assets of their respective
owner. These assets are used only to identify and link to the portfolio
owner's Zenn profile.

### OpenAI

Files:

- `src/assets/brand/openai/OAI_OpenAI-Blossom_Black.svg`
- `src/assets/brand/openai/OAI_OpenAI-Blossom_White.svg`

Source and guidelines:

- https://openai.com/brand/

OpenAI and the OpenAI logo are trademarks or brand assets of OpenAI. These
assets are used only to identify technology related to OpenAI products and do
not imply affiliation with or endorsement by OpenAI.

## Storybook example materials

The following paths contain Storybook onboarding or example materials:

- `src/stories/Configure.mdx`
- `src/stories/assets/**`

Storybook is distributed under the MIT License:

- [Local license copy](./licenses/storybook/MIT.txt)
- https://github.com/storybookjs/storybook/blob/next/LICENSE

Some example assets depict third-party brands, including Discord, Figma,
GitHub, and YouTube. Those names and logos remain subject to the rights and
guidelines of their respective owners.

## Next.js starter assets

Files under `public/`, including `next.svg` and `vercel.svg`, originated from
Next.js starter materials.

Next.js source code is licensed under the MIT License. The Next.js and Vercel
names and logos remain subject to Vercel's applicable trademark and brand
guidelines.

## Rights not granted

Nothing in this file grants permission to use a third party's:

- trademarks or service marks
- logos or trade dress
- product or company names
- copyrighted brand artwork
- rights of publicity or endorsement

Users of this repository are responsible for reviewing the current
authoritative terms before reusing any third-party material.
