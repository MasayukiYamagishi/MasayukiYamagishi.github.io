# Interests page Design QA

## Comparison target

- Source specification: `C:\Users\inhmt\Downloads\portfolio-interests-books-movies-spec-ja.md`
- Visual reference (art-direction reference only): `C:\Users\inhmt\Downloads\JPEh8N9Yv41Bf-qD5yjI0zKY8sYN2llPsLN1BwadSJxcVSVOZy_uGOul2IxEQWpykoRB2sW9QPUndO1n8tP-FOWMJ-gWthU7siyLKOrcZWcmAyCZRBtSY8ac7kZY7LHej2GAg_vvx8YDo8aq4aYf1khLFoF03mkgmQbwPq_VrHMDjG4jzif2zGt6UkqWX9ss.jpg`
- Final four-stage shelf artwork supplied by the user: `C:\Users\inhmt\Downloads\bookshelf\books_lv1.png` through `books_lv4.png`
- Books desktop implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-books-desktop.png`
- Movies desktop implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-movies-desktop.png`
- Books mobile implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-books-mobile.png`
- Movies mobile implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-movies-mobile.png`
- Focused shelf verification: all four source images plus the Stage 2 production rendering captured in the in-app browser after the WebP build
- Routes: `/interests` and `/en/interests`
- State: Japanese and English, Books and Movies selected states, light and dark themes

## Viewport and normalization

- Source image: 2048 × 1418 pixels.
- Final shelf assets: 1618 × 918 pixels each, with alpha preserved in the WebP outputs.
- Desktop CSS viewport requested: 1440 × 1000 at device scale 1. Browser content screenshots are 1425 pixels wide after scrollbar reservation; full-page heights are 3876 pixels for Books and 4133 pixels for Movies.
- Mobile CSS viewport requested: 390 × 844 at device scale 1. Browser content screenshots are 375 pixels wide after scrollbar reservation; full-page heights are 6320 pixels for Books and 6674 pixels for Movies.
- The focused comparison normalizes the source reference and the rendered shelf region into equal 1000 × 700 slots. The comparison is for the general flat-vector and bent-shelf motif only; reproducing the source book arrangement, palette, or spine patterns would be incorrect.

## Evidence

### Full-view comparison

The desktop and mobile captures show the complete requested information order: page title, accessible Books/Movies tabs, summary metrics, strange metrics, rankings, current items, and histories. The layout uses the portfolio's existing maximum width, Geist/Noto Sans typography, monochrome design tokens, border language, and header/footer rather than introducing a separate visual system.

Books and Movies both preserve a clear reading order on mobile. Metric grids stay readable at 375 content pixels, cards do not overflow, and the longer Japanese titles wrap inside their cards. Desktop uses a consistent two-column record layout and three-column summary grid.

### Focused shelf comparison

The four user-supplied originals were inspected together with the rendered shelf state. Stages progress from a straight shelf through increasing deflection to a visibly cracked board. The live Stage 2 capture is fully contained, centered, and uncropped in the existing dark card. The earlier non-free reference image remains absent from project assets and is not served by the page.

## Required fidelity surfaces

- Fonts and typography: the implementation reuses Geist Sans, Geist Mono, and Noto Sans JP. Display type, metric numerals, labels, and history metadata have distinct weights and line heights; long Japanese and English copy wraps without truncating essential content.
- Spacing and layout rhythm: the existing `max-w-5xl`, 24/32-pixel page gutters, rounded cards, and 14/16-section rhythm are preserved. Desktop and mobile captures show no horizontal overflow or clipped persistent controls.
- Colors and visual tokens: all UI surfaces use the existing background, foreground, surface, muted, and border tokens. The shelf illustration is a self-contained ink-colored asset that remains legible in both light and dark themes without introducing a page-wide gradient.
- Image quality and asset fidelity: the four 1618 × 918 source PNGs were converted to lossless WebP. Dimensions, sRGB color space, four channels, and transparency are preserved. `next/image` uses `object-contain`, so no stage is cropped or stretched. The four WebP files total 89,010 bytes versus 256,198 bytes for the workspace PNG copies.
- Copy and content: Japanese and English headings, summaries, warnings, shelf safety disclaimer, film-conversion disclaimer, popcorn assumption, ranking notes, and empty-state-ready labels are present. Book titles, author names, movie titles, and director names remain data values rather than translated UI strings.

## Findings

- No actionable P0, P1, or P2 design findings remain.
- The long histories make both tabs intentionally substantial pages. This matches the supplied specification and remains scannable through section headings and two-column cards.

## Comparison history

### Pass 1

- Finding [P1]: the first generated shelf illustration retained too much of the reference's centered arrangement, cyan/orange palette, and recognizable spine motifs. That was too close for an image supplied only as a non-free design reference.
- Fix: discarded that asset and generated a new illustration without providing the reference image as input. The replacement changes the composition, book count, grouping, palette, patterns, shelf thickness, and load distribution.

### Pass 2

- Post-fix evidence: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\shelf-reference-comparison.png`.
- Result: the replacement keeps only the abstract bent-shelf concept and flat-vector direction. No P0/P1/P2 visual issue remains.

### Pass 3

- Replaced the provisional single illustration with the four final, user-supplied damage stages.
- Converted each image to lossless WebP because this static-export project has `images.unoptimized: true` and therefore does not perform runtime format negotiation.
- Verified all four outputs at 1618 × 918 with alpha, then checked the rendered Stage 2 state in the in-app browser. No clipping, stretching, or console warnings/errors were found.

## Interaction and runtime checks

- Books is selected by default.
- Clicking the tabs swaps the visible panel.
- ArrowRight and Home move focus/selection and expose the matching tab panel.
- The theme control toggles from dark to light, with the full page and shelf remaining readable.
- `/en/interests` renders English UI copy and the translated `Shelf #3` label.
- The About link navigates to `/interests`.
- Browser console warnings/errors: none.
- Unit tests: 40 passed.
- Targeted Books Storybook tests: 13 passed, including the four-stage illustration story. The story runner emits an LCP suggestion because the isolated story places the image above the fold; the production shelf is below the initial viewport and remains lazy-loaded.
- Production build: passed; both routes were statically generated.
- Residual test gap: the repository-wide Storybook run still fails while importing five existing image-based stories because the current Windows Vite/Next image transform drops backslashes from absolute paths. The new Interests stories pass when run independently.

## 2026-09-05 film metric alignment follow-up

- Source visual truth: `C:\Users\inhmt\AppData\Local\Temp\codex-clipboard-a55224ce-9e4f-41c4-b296-d49a09ab08c5.png` (616 × 278 pixels).
- Implementation screenshot path: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-movies-desktop.png`; the changed region was additionally recaptured live in the browser after the fix.
- Browser viewport: 1298 × 774 CSS pixels at device scale 1.25.
- State: Japanese, Movies selected, light theme.
- Full-view evidence: the paired watch-time and film-equivalent cards remain equal in height with no overflow or clipping.
- Focused comparison evidence: the source showed the Earth value one text line below the other values. After reserving an equal two-line label area at the three-column breakpoints, all three value rows have the same measured top position (`535.16px`) and height (`28px`). A separate focused crop was sufficient because the requested change affects only this definition list.
- Required surfaces: typography, colors, copy, card spacing, and imagery are unchanged. Only the label-row alignment changed.
- Findings: no actionable P0, P1, or P2 issues remain. Browser console warnings/errors: none.
- Comparison history: pass 1 identified the unequal label heights; the fix aligned label bottoms and value baselines. The post-fix capture and DOM geometry confirm the correction.

final result: passed
