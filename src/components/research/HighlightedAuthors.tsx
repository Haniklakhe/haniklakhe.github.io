export function HighlightedAuthors({
  authors,
  highlight,
}: {
  authors: string;
  highlight: string;
}) {
  const index = authors.indexOf(highlight);
  if (index === -1) {
    return <>{authors}</>;
  }

  const before = authors.slice(0, index);
  const after = authors.slice(index + highlight.length);

  return (
    <>
      {before}
      <strong className="font-semibold text-ink dark:text-paper">{highlight}</strong>
      {after}
    </>
  );
}
