import type { ReactNode } from "react";

export function SectionTitle({
  id,
  children,
  note,
  as: Tag = "h2",
}: {
  id?: string;
  children: ReactNode;
  note?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-b border-ink pb-3">
      <Tag id={id} className="text-d1 text-ink">
        {children}
      </Tag>
      {note && <p className="max-w-sm text-[0.9375rem] leading-snug text-ink-soft">{note}</p>}
    </div>
  );
}
