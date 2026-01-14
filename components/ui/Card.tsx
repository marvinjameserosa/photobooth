import type { ReactNode } from "react";

type CardProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function Card({ icon, title, description, className }: CardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-32 flex-col items-center justify-center gap-3 rounded-sm border border-neutral-800/80 bg-neutral-950/70 px-6 text-center text-neutral-200 shadow-[0_5px_20px_rgba(0,0,0,0.35)] transition hover:border-red-500 hover:bg-neutral-900/90",
        className
      )}
    >
      <div className="flex items-center justify-center text-yellow-300 transition group-hover:text-red-400">
        {icon}
      </div>
      <div className="text-xs font-semibold uppercase tracking-[0.3em]">
        {title}
      </div>
      {description ? (
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-neutral-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}
