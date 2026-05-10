// Purpose: Series and search result product listing pages adapted from Figma listing screens.
// Callers: App routes `/katalog/series/:series` and `/katalog/search`.
// Deps: router, product data, shared layout, wishlist hook.
// API: default React page component.
// Side effects: toggles wishlist in localStorage.
import { ChevronLeft, Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import favIcon from "../../imports/Home/fav.svg";
import { Container } from "../components/Container";
import { WishlistButton } from "../components/WishlistButton";
import { fetchProducts, products, formatRupiah, getProductDisplayImage, type Product } from "../data/products";

const slugToSeries = (slug?: string) => slug ? `${slug.split("-")[0]} Series` : "";
const matchesQuery = (product: Product, query: string) => [product.name, product.series, ...(product.specs ?? []), ...product.highlights].join(" ").toLowerCase().includes(query.toLowerCase());

export default function ProductListingPage() {
  const navigate = useNavigate();
  const { series } = useParams();
  const [params] = useSearchParams();
  const query = params.get("q")?.trim() ?? "";
  const [catalog, setCatalog] = useState<Product[]>(products);
  const activeSeries = slugToSeries(series);
  const title = activeSeries || query || "Hasil Pencarian";
  useEffect(() => { fetchProducts().then(setCatalog).catch(() => setCatalog(products)); }, []);
  const items = catalog.filter((product) => activeSeries ? product.series.includes(activeSeries.split(" ")[0]) || product.name.includes(activeSeries.split(" ")[0]) : matchesQuery(product, query));

  return (
    <div className="min-h-[100dvh] bg-[#f9f9f9] pb-28 pt-24 lg:pt-32">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <button type="button" onClick={() => navigate(-1)} aria-label="Kembali" className="grid size-11 place-items-center rounded-full bg-white text-[#222] shadow-[0_8px_22px_rgba(49,56,92,0.10)]"><ChevronLeft size={20} /></button>
            <div className="min-w-0 flex-1 text-center">
              {activeSeries ? <h1 className="text-[34px] font-semibold tracking-[-0.055em] text-[#222] sm:text-[52px]">{title}</h1> : <div className="mx-auto flex h-12 max-w-[520px] items-center gap-3 rounded-full bg-white px-5 text-left shadow-[3px_6px_11px_rgba(5,4,4,0.10)]"><Search size={19} className="shrink-0 text-[#989696]" /><h1 className="truncate text-[18px] font-medium text-[#222]">{title}</h1></div>}
              <p className="mt-2 text-[13px] text-[#8c8c8c]">{items.length} unit tersedia</p>
            </div>
            <Link to="/wishlist" aria-label="Favorit" className="grid size-11 place-items-center rounded-full bg-white shadow-[0_8px_22px_rgba(49,56,92,0.10)]"><img src={favIcon} alt="" className="size-5" /></Link>
          </div>

          {items.length ? <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {items.map((product) => <ListingCard key={product.id} product={product} />)}
          </div> : <div className="rounded-[24px] bg-white p-10 text-center text-[#777] shadow-[0_4px_28px_rgba(0,0,0,0.08)]">Produk tidak ditemukan.</div>}
        </div>
      </Container>
    </div>
  );
}

function ListingCard({ product }: { product: Product }) {
  return (
    <Link to={`/katalog/${product.id}`} className="group relative block min-h-[298px]">
      <div className="relative h-[211px] overflow-hidden rounded-[12px] bg-white transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(49,56,92,0.12)]">
        <div className="absolute inset-x-8 bottom-8 h-16 rounded-full bg-[#354d70]/10 blur-2xl" />
        <img src={getProductDisplayImage(product)} alt={product.name} loading="lazy" className="rp-product-shadow h-full w-full object-contain p-4 transition duration-700 group-hover:scale-[1.03]" />
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-[#db3022] px-3 py-1 text-[10px] font-medium text-white">Terbaru</span>}
        <WishlistButton productId={product.id} />
      </div>
      <div className="mt-3 flex items-center gap-1 text-[#9b9b9b]">
        {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" />)}
        <span className="ml-1 text-[11px]">(0)</span>
      </div>
      <h3 className="mt-2 text-[18px] font-medium leading-[1.15] text-[#222]">{product.name}</h3>
      <p className="mt-2 text-[16px] text-[#222]">{formatRupiah(product.pricePerDay)}</p>
    </Link>
  );
}
