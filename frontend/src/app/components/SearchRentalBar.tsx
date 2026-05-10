import { Search, ChevronDown } from "lucide-react";
import { Button } from "./Button";

const Field = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <button
    type="button"
    className={`group flex flex-col items-start gap-0.5 rounded-2xl px-5 py-3 text-left hover:bg-black/[0.025] transition ${className}`}
  >
    <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--rp-muted)]">{label}</span>
    <span className="flex items-center gap-1.5 text-[14px] text-[var(--rp-text)]" style={{ color: "var(--rp-search-muted)" }}>
      {value}
      <ChevronDown size={14} className="transition-transform group-hover:translate-y-0.5" />
    </span>
  </button>
);

export function SearchRentalBar() {
  return (
    <div className="rounded-[28px] bg-white border border-[var(--rp-border)]/80 rp-soft-shadow p-2 grid grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_1.2fr_auto] gap-1 items-stretch">
      <Field label="Model" value="Pilih iPhone" className="col-span-2 md:col-span-1 md:border-r border-[var(--rp-border)]/60 rounded-r-none" />
      <Field label="Series" value="Semua seri" className="md:border-r border-[var(--rp-border)]/60 md:rounded-none" />
      <Field label="Durasi" value="3 hari" className="md:border-r border-[var(--rp-border)]/60 md:rounded-none" />
      <Field label="Pickup / Delivery" value="Antar ke alamat" className="col-span-2 md:col-span-1 md:rounded-l-none" />
      <div className="col-span-2 md:col-span-1 flex items-center md:pl-1">
        <Button size="lg" className="w-full md:w-auto md:h-[60px] md:px-6 md:rounded-[20px] gap-2">
          <Search size={16} /> Cari
        </Button>
      </div>
    </div>
  );
}
