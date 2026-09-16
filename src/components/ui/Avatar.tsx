import Image from "next/image";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 160,
  width,
  height,
  fill = false,
  className = "",
}: {
  src?: string | null;
  name: string;
  /** Used for both dimensions when width/height aren't given (square avatar). */
  size?: number;
  /** Override for a non-square (e.g. taller portrait) frame. */
  width?: number;
  height?: number;
  /** Ignore size/width/height and stretch to 100% of the parent container (parent controls sizing, e.g. via a CSS grid row). */
  fill?: boolean;
  className?: string;
}) {
  const w = width ?? size;
  const h = height ?? size;
  const dimensionStyle = fill ? undefined : { width: w, height: h };
  const fontSize = fill ? undefined : Math.min(w, h) * 0.32;

  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-border dark:border-border-dark ${fill ? "h-full w-full" : ""} ${className}`}
        style={dimensionStyle}
      >
        <Image
          src={src}
          alt={`Photo of ${name}`}
          fill
          sizes={fill ? "50vw" : `${Math.max(w, h)}px`}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${name} — photo placeholder`}
      title="Photo placeholder — drop a real image into /public/images and set person.photo in content.json"
      className={`flex select-none items-center justify-center rounded-2xl border-2 border-dashed border-teal/40 bg-teal/10 font-display font-medium text-ink dark:border-teal-light/40 dark:bg-teal-light/10 dark:text-paper ${fill ? "h-full w-full" : ""} ${className}`}
      style={{ ...dimensionStyle, fontSize: fontSize ?? "3rem" }}
    >
      {getInitials(name)}
    </div>
  );
}
