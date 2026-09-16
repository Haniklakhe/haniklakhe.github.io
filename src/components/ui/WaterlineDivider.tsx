export function WaterlineDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="h-3 w-full text-teal/50 dark:text-teal-light/40"
      >
        <path
          d="M0 12 Q 50 2 100 12 T 200 12 T 300 12 T 400 12 T 500 12 T 600 12 T 700 12 T 800 12 T 900 12 T 1000 12 T 1100 12 T 1200 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
