import { Fragment } from "react";

/**
 * Renders inline `**bold**` markers as bold-white emphasis against muted body
 * text. This is the site's only in-paragraph highlight — no color, just the
 * step from gray to foreground. Anything outside the markers is left as-is.
 */
export function Emphasis({ text }: { text: string }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {segments.map((segment, i) => {
        const match = /^\*\*([^*]+)\*\*$/.exec(segment);
        return match ? (
          <strong key={i} className="text-foreground font-medium">
            {match[1]}
          </strong>
        ) : (
          <Fragment key={i}>{segment}</Fragment>
        );
      })}
    </>
  );
}
