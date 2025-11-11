import { PropsWithChildren } from "react";

interface SectionProps {
  id?: string;
  background?: "default" | "muted" | "gradient";
  withPadding?: boolean;
}

export function Section({
  id,
  background = "default",
  withPadding = true,
  children,
}: PropsWithChildren<SectionProps>) {
  const backgroundClass =
    background === "muted"
      ? "bg-slate-50"
      : background === "gradient"
        ? "bg-gradient-to-br from-blue-900 via-blue-700 to-emerald-500 text-white"
        : "bg-white";

  const classNames = [
    "relative",
    backgroundClass,
    withPadding ? "px-4 py-16 sm:px-6 lg:px-8" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={classNames}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}

export function SectionHeading({
  overline,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const headingClassNames = [
    "mx-auto mb-10 max-w-3xl space-y-4",
    align === "center" ? "text-center" : "text-start",
  ].join(" ");

  return (
    <div className={headingClassNames}>
      {overline ? (
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">
          {overline}
        </span>
      ) : null}
      <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
      {description ? (
        <p className="text-base leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}

