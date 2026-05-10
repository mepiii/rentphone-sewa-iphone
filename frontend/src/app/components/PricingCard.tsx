// Purpose: Rental package card.
// Callers: pricing sections.
// Deps: Button, icon.
// API: PricingCard component.
// Side effects: none.
import { Check } from "lucide-react";

export function PricingCard({ title, duration, price, perks }: { title: string; duration: string; price?: string; perks: string[] }) {
  return (
    <div className="group relative flex cursor-pointer flex-col rounded-[12px] bg-white p-7 text-[#222] shadow-[0_4px_28px_rgba(0,0,0,0.08)] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_22px_60px_rgba(53,77,112,0.18)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#45464d]">{duration}</p>
      <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] transition duration-500 group-hover:text-[#354d70]">{title}</h3>
      {price && (
        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="text-[38px] font-semibold tracking-[-0.055em]">{price}</span>
          <span className="text-[13px] text-[#8e9299]">/hari</span>
        </div>
      )}
      <ul className={`flex-1 space-y-3.5 ${price ? 'mt-7' : 'mt-10'}`}>
        {perks.map((p) => <li key={p} className="flex items-start gap-3 text-[15px] leading-[1.55]"><Check size={17} className="mt-0.5 text-[var(--rp-deep)]" /><span className="text-[#76777d]">{p}</span></li>)}
      </ul>
      
    </div>
  );
}
