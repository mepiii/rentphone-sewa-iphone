export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--rp-deep)] ${align === "center" ? "text-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[34px] leading-[1.04] tracking-[-0.045em] text-[var(--rp-text)] sm:text-[44px] lg:text-[58px]">
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-[17px] leading-[1.6] text-[var(--rp-muted)] ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
