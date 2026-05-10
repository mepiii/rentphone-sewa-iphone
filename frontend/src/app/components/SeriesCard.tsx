import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function SeriesCard({
  title,
  count,
  fromPrice,
  accent = "var(--rp-deep)",
}: {
  title: string;
  count: number;
  fromPrice: string;
  accent?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-3xl bg-white border border-[var(--rp-border)]/70 p-6 cursor-pointer group rp-card-shadow"
    >
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.07] transition-opacity group-hover:opacity-[0.12]"
        style={{ background: accent }}
      />
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--rp-muted)]">{count} model</p>
      <h3 className="mt-2 font-heading text-[22px]" style={{ fontWeight: 600 }}>{title}</h3>
      <p className="mt-1 text-[13px] text-[var(--rp-muted)]">Dari {fromPrice}/hari</p>
      <div className="mt-6 flex items-center gap-1.5 text-[13px] font-medium" style={{ color: accent }}>
        Lihat seri
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}
