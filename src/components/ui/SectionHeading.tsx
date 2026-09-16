export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="mb-2 font-sans text-sm font-semibold uppercase tracking-widest text-teal dark:text-teal-light">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-medium text-ink dark:text-paper sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-ink-soft dark:text-paper/70">{description}</p>
      )}
    </div>
  );
}
