const RADII = [70, 120, 170, 220, 270, 320, 370];

export function ContourBackground({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full text-ink/[0.07] dark:text-paper/[0.06] ${className}`}
    >
      {RADII.map((r) => (
        <ellipse
          key={r}
          cx="620"
          cy="90"
          rx={r * 1.35}
          ry={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
