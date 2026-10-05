export function HighlightedAuthors({ authors, highlight }: { authors: string; highlight: string }) {
  const index = authors.indexOf(highlight);
  if (index === -1) return <>{authors}</>;
  return (
    <>
      {authors.slice(0, index)}
      <strong className="font-semibold text-ink">{highlight}</strong>
      {authors.slice(index + highlight.length)}
    </>
  );
}
