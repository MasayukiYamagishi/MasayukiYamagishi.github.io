type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  watchLabel: string;
  caption?: string;
  start?: number;
};

const YOUTUBE_VIDE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * YouTubeビデオ埋め込みコンポーネント
 *
 * @param YouTubeEmbedProps props
 * @returns YouTubeビデオ埋め込みのJSX
 */
export function YoutubeEmbed({
  videoId,
  title,
  watchLabel,
  caption,
  start = 0,
}: YouTubeEmbedProps) {
  if (!YOUTUBE_VIDE_ID_PATTERN.test(videoId)) {
    throw new Error(`YouTubeのvideoIdが不正です: ${videoId}`);
  }

  if (!Number.isInteger(start) || start < 0) {
    throw new Error("YouTubeの再生開始位置は0以上の整数で指定してください。");
  }

  const embedParams = new URLSearchParams({
    playsinline: "1",
  });

  const watchParams = new URLSearchParams({
    v: videoId,
  });

  if (start > 0) {
    embedParams.set("start", String(start));
    watchParams.set("t", `${start}s`);
  }

  return (
    <figure>
      <div className="aspect-video overflow-hidden rounded-xl border border-border bg-surface">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${embedParams}`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>

      <figcaption className="mt-2 text-sm text-muted">
        {caption && <span>{caption} </span>}

        <a href={`https://www.youtube.com/watch?${watchParams}`}>
          {watchLabel}
        </a>
      </figcaption>
    </figure>
  );
}
