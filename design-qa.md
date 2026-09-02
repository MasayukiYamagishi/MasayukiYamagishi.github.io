# ZennArticleCard Design QA

## Comparison target

- Source visual truth: `C:\Users\inhmt\AppData\Local\Temp\codex-clipboard-483d526f-a079-4c72-99b1-703b87a8e191.png`
- Final desktop implementation: `C:\Users\inhmt\AppData\Local\Temp\zenn-card-implementation-desktop-full.png`
- Final mobile implementation: `C:\Users\inhmt\AppData\Local\Temp\zenn-card-implementation-mobile.png`
- Normalized before/after comparison: `C:\Users\inhmt\AppData\Local\Temp\zenn-card-design-qa-comparison.png`
- Component: `src/components/posts/embeds/ExternalLinkCard.tsx`
- State: dark theme, Humane by Design article, long two-line title

## Viewport and normalization

- Source image: 743 × 252 pixels. The card region was cropped to approximately 704 × 179 pixels and normalized to 720 pixels wide for comparison.
- Desktop implementation: 800 × 360 CSS-pixel viewport and screenshot, with a 720 × 160 card.
- Mobile implementation: 390 × 620 CSS-pixel viewport and screenshot, with a 358-pixel-wide card.
- Density normalization: browser screenshots matched CSS pixel dimensions. The source crop was resized only to align the card widths.

## Evidence

### Full-view comparison

The normalized comparison shows that the final desktop card preserves the existing colors, border, radius, typography family, and content while changing the requested layout hierarchy. The OG image now occupies the full 158-pixel inner height of the 160-pixel bordered card. Its track is approximately 40% of the card width, which keeps the source image legible without returning to the short image strip seen in the source.

### Focused-region comparison

The card is the complete requested component and is already isolated at 720 pixels wide in the comparison image, so a smaller focused crop was not needed. The mobile screenshot was inspected separately to verify the responsive stacked layout. It has no horizontal overflow: the document and viewport are both 390 pixels wide, and the image fits the 358-pixel card.

## Required fidelity surfaces

- Fonts and typography: the existing font family and weight are preserved. The title now has an explicit 22-pixel line height and no longer inherits the article body's loose line height.
- Spacing and layout rhythm: the title-to-description gap is 6 pixels. The destination metadata sits at the bottom of the text column with a 17-pixel bottom inset. Desktop media and text columns share the same card height.
- Colors and visual tokens: existing `border`, `surface`, `surface-hover`, `foreground`, and `muted` tokens remain unchanged.
- Image quality and asset fidelity: the existing Zenn OG image is used with `next/image`, `fill`, and `object-cover`. The wider media track limits cropping while keeping the image full-height.
- Copy and content: the footer reads `Zenn.dev` followed by `2026-08-18`, using the repository's official Zenn brand asset. The title and description are unchanged.

## Findings

- No actionable P0, P1, or P2 findings remain.
- No P3 change is required for this pass.

## Comparison history

### Pass 1

- Finding: the first full-height implementation retained the original 192-pixel media width. The narrow track cropped too much of the Zenn OG image and made its text difficult to recognize.
- Evidence: `C:\Users\inhmt\AppData\Local\Temp\zenn-card-implementation-pass-1.png`
- Fix: changed the desktop grid to a responsive 3:2 split with a 12rem minimum media width, producing an approximately 288-pixel media track at the tested viewport.

### Pass 2

- Post-fix evidence: `C:\Users\inhmt\AppData\Local\Temp\zenn-card-design-qa-comparison.png`
- Result: the image fills the card's inner height, the title and description spacing is compact, and the Zenn destination label is anchored at the bottom. Desktop and mobile layouts have no visible clipping or overflow.

## Interaction and runtime checks

- Link destination verified as `https://zenn.dev/midpt/articles/designing-better-ai-built-web-apps-with-hbd`.
- Storybook interaction tests: 33 passed.
- Browser console errors: none.
- Production build and Storybook production build: passed.

final result: passed
