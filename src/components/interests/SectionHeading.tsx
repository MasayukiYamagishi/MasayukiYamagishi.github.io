type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
};

/**
 * 趣味ページ内のセクション見出しを表示する
 *
 * @param SectionHeadingProps props
 * @returns セクション見出しのJSX
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-6 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs font-medium tracking-[0.14em] text-muted uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {heading}
      </h2>
      {description && (
        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
