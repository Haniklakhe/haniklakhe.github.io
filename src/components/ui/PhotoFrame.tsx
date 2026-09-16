import Image from "next/image";
import { ImageIcon } from "./Icons";

/**
 * Landscape image slot for projects/cards. Shows a clearly-marked dashed
 * placeholder until a real image path is set in content.json — see
 * `_meta.imageNamingConvention` in content/content.json for the expected
 * filenames.
 */
export function PhotoFrame({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 400px, 100vw",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg border border-border dark:border-border-dark ${className}`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — photo placeholder`}
      title="Photo placeholder — see _meta.imageNamingConvention in content.json for the expected filename"
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-teal/40 bg-teal/5 text-teal dark:border-teal-light/30 dark:bg-teal-light/5 dark:text-teal-light ${className}`}
    >
      <ImageIcon width={26} height={26} className="opacity-70" />
      <span className="text-xs font-medium opacity-80">Photo placeholder</span>
    </div>
  );
}
