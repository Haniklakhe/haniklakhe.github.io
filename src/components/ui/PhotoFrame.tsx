import Image from "next/image";

/**
 * Image slot for projects. Photographs fill the frame; figures (PNG diagrams and maps
 * with white backgrounds) are contained with padding so nothing is cropped.
 */
export function PhotoFrame({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${alt}: no image yet`}
        className={`flex items-center justify-center border border-dashed border-rule bg-ground text-ink-soft ${className}`}
      >
        <span className="label">No image yet</span>
      </div>
    );
  }
  const isFigure = src.toLowerCase().endsWith(".png");
  return (
    <div className={`relative overflow-hidden border border-rule ${isFigure ? "bg-white" : "bg-ground"} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={isFigure ? "object-contain p-3" : "object-cover"}
      />
    </div>
  );
}
