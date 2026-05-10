// Purpose: Product tile using real iPhone assets.
// Callers: catalog and product grids.
// Deps: product data, shadcn button.
// API: ProductCard component.
// Side effects: none.
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Product, formatRupiah } from "../data/products";
import { Button } from "./ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rp-hover-lift rp-hover-soft flex min-h-[520px] flex-col rounded-[12px] bg-white p-4 shadow-[0_4px_28px_rgba(0,0,0,0.08)]">
      <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-[12px] bg-[#f8f8fa]">
        <div className="absolute inset-x-8 bottom-8 h-20 rounded-full bg-[var(--rp-deep)]/10 blur-3xl" />
        <img src={product.deviceImage} alt={product.name} loading="lazy" decoding="async" className="rp-product-shadow rp-hover-media h-full w-full object-contain p-5" />
        {product.badge && <span className="absolute left-4 top-4 rounded-[8px] bg-[var(--rp-red)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">{product.badge === "Flagship" ? "Terbaru" : product.badge}</span>}
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#45464d]">{product.series}</p>
        <h3 className="mt-2 text-[25px] font-semibold leading-[1.04] tracking-[-0.045em] text-[#222]">{product.name}</h3>
        <div className="mt-4 flex gap-2">{product.colors.slice(0, 4).map((c) => <span key={c} className="size-3 rounded-full ring-1 ring-black/5" style={{ background: c }} />)}</div>
        <div className="mt-5 space-y-1.5 text-[13px] text-[#76777d]">{product.highlights.slice(0, 2).map((item) => <p key={item}>{item}</p>)}</div>
        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8e9299]">Mulai dari</p>
            <p className="text-[24px] font-semibold tracking-[-0.04em] text-[#222]">{formatRupiah(product.pricePerDay)}<span className="ml-1 text-[13px] font-normal text-[#8e9299]">/hari</span></p>
          </div>
          <Button asChild variant="ghost" size="icon" className="rounded-full border border-[#c6c6cd]/40 text-[var(--rp-deep)] hover:bg-[#f8f8fa]" aria-label={`Lihat ${product.name}`}><Link to={`/katalog/${product.id}`}><ArrowUpRight size={16} /></Link></Button>
        </div>
      </div>
    </article>
  );
}
