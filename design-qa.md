# Interests page Design QA

## Comparison target

- Source specification: `C:\Users\inhmt\Downloads\portfolio-interests-books-movies-spec-ja.md`
- Visual reference (art-direction reference only): `C:\Users\inhmt\Downloads\JPEh8N9Yv41Bf-qD5yjI0zKY8sYN2llPsLN1BwadSJxcVSVOZy_uGOul2IxEQWpykoRB2sW9QPUndO1n8tP-FOWMJ-gWthU7siyLKOrcZWcmAyCZRBtSY8ac7kZY7LHej2GAg_vvx8YDo8aq4aYf1khLFoF03mkgmQbwPq_VrHMDjG4jzif2zGt6UkqWX9ss.jpg`
- Books desktop implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-books-desktop.png`
- Movies desktop implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-movies-desktop.png`
- Books mobile implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-books-mobile.png`
- Movies mobile implementation: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\interests-movies-mobile.png`
- Focused shelf comparison: `C:\Users\inhmt\src\masayukiyamagishi.github.io\design-qa-assets\shelf-reference-comparison.png`
- Routes: `/interests` and `/en/interests`
- State: Japanese and English, Books and Movies selected states, light and dark themes

## Viewport and normalization

- Source image: 2048 × 1418 pixels.
- Generated original shelf asset: 1695 × 928 pixels.
- Desktop CSS viewport requested: 1440 × 1000 at device scale 1. Browser content screenshots are 1425 pixels wide after scrollbar reservation; full-page heights are 3876 pixels for Books and 4133 pixels for Movies.
- Mobile CSS viewport requested: 390 × 844 at device scale 1. Browser content screenshots are 375 pixels wide after scrollbar reservation; full-page heights are 6320 pixels for Books and 6674 pixels for Movies.
- The focused comparison normalizes the source reference and the rendered shelf region into equal 1000 × 700 slots. The comparison is for the general flat-vector and bent-shelf motif only; reproducing the source book arrangement, palette, or spine patterns would be incorrect.

## Evidence

### Full-view comparison

The desktop and mobile captures show the complete requested information order: page title, accessible Books/Movies tabs, summary metrics, strange metrics, rankings, current items, and histories. The layout uses the portfolio's existing maximum width, Geist/Noto Sans typography, monochrome design tokens, border language, and header/footer rather than introducing a separate visual system.

Books and Movies both preserve a clear reading order on mobile. Metric grids stay readable at 375 content pixels, cards do not overflow, and the longer Japanese titles wrap inside their cards. Desktop uses a consistent two-column record layout and three-column summary grid.

### Focused shelf comparison

The combined comparison shows the common high-level idea—title-free books on a visibly bowed shelf—while confirming that the implementation is an original design. It uses a different book count and grouping, a left-side gap, leaning books, plum/lavender/lime/cream colors, dot/checker/dash patterns, a thick warm-gray plank, asymmetric load, and stress ticks. The supplied non-free image is not included in the repository or served by the page.

## Required fidelity surfaces

- Fonts and typography: the implementation reuses Geist Sans, Geist Mono, and Noto Sans JP. Display type, metric numerals, labels, and history metadata have distinct weights and line heights; long Japanese and English copy wraps without truncating essential content.
- Spacing and layout rhythm: the existing `max-w-5xl`, 24/32-pixel page gutters, rounded cards, and 14/16-section rhythm are preserved. Desktop and mobile captures show no horizontal overflow or clipped persistent controls.
- Colors and visual tokens: all UI surfaces use the existing background, foreground, surface, muted, and border tokens. The shelf illustration is a self-contained ink-colored asset that remains legible in both light and dark themes without introducing a page-wide gradient.
- Image quality and asset fidelity: the original 1695 × 928 PNG is crisp at its rendered desktop and mobile sizes. It is displayed with `next/image`, an intentional crop, and no stretched or placeholder content. The non-free reference is absent from project assets.
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

## Interaction and runtime checks

- Books is selected by default.
- Clicking the tabs swaps the visible panel.
- ArrowRight and Home move focus/selection and expose the matching tab panel.
- The theme control toggles from dark to light, with the full page and shelf remaining readable.
- `/en/interests` renders English UI copy and the translated `Shelf #3` label.
- The About link navigates to `/interests`.
- Browser console warnings/errors: none.
- Unit tests: 39 passed.
- New Interests Storybook tests: 23 passed across 3 story files.
- Production build: passed; both routes were statically generated.
- Residual test gap: the repository-wide Storybook run still fails while importing five existing image-based stories because the current Windows Vite/Next image transform drops backslashes from absolute paths. The new Interests stories pass when run independently.

final result: passed
