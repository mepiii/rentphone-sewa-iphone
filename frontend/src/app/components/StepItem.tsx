// Purpose: Numbered rental process row.
// Callers: process sections.
// Deps: none.
// API: StepItem component.
// Side effects: none.
export function StepItem({ index, title, description, isLast = false }: { index: number; title: string; description: string; isLast?: boolean }) {
  return (
    <div className="relative grid gap-5 py-6 sm:grid-cols-[72px_1fr]">
      <div className="relative">
        <div className="grid size-10 place-items-center rounded-[12px] bg-[#f8f8fa] text-[14px] font-bold tracking-[-0.03em] text-[var(--rp-deep)]">{String(index).padStart(2, "0")}</div>
        {!isLast && <div className="absolute left-5 top-12 hidden h-[calc(100%+20px)] w-px bg-[#e8ecf1] sm:block" />}
      </div>
      <div className="rounded-[12px] bg-white p-6 shadow-[0_4px_22px_rgba(0,0,0,0.05)]">
        <h3 className="text-[25px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#222]">{title}</h3>
        <p className="mt-3 max-w-xl text-[16px] leading-[1.65] text-[#76777d]">{description}</p>
      </div>
    </div>
  );
}
