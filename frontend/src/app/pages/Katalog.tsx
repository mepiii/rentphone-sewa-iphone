// Purpose: Website catalog page adapted from Figma app catalog screen.
// Callers: App route `/katalog`.
// Deps: router, product data, shared layout.
// API: default React page component.
// Side effects: filters products and toggles wishlist in localStorage.
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ArrowUpRight, BatteryFull, Search, SignalHigh, Star, UserRound, Wifi } from "lucide-react";
import { Container } from "../components/Container";
import series13Decor from "../../imports/Home/b8f95bb9454fba6b8fc57f1888de6ea2ff8da36d.png";
import series14Decor from "../../imports/Home/d7c216d5d3cde7100796b47e286a035b73188ff4.png";
import series15Decor from "../../imports/Home/8e9eaf6a35faac0469c01d523ad7f5c76ed26454.png";
import series17Decor from "../../imports/Home/c9ffb3ad0e3d01c2f09ffd4b03f9e4f258cc880e.png";
import bannerOne from "../../imports/Home/31856757ea07dd634ac07628bdb280787269b5fc.png";
import bannerTwo from "../../imports/Home/f98d85a4f23452594a22eab6480eec808b7be2a0.png";
import bannerThree from "../../imports/Home/3e2c2f1215f08800d6cc2519d6be8329dc77dfb2.png";
import frontShapeOne from "../../imports/Home/a3b6c7af0e339f9e733d84efbc0103001a5cd758.png";
import frontShapeTwo from "../../imports/Home/c8d2fc35bf8779f9870d35918c75715a90916895.png";
import { apiRequest } from "../data/api";
import { fetchProducts, products, formatRupiah, getProductDisplayImage, type Product } from "../data/products";
import { WishlistButton } from "../components/WishlistButton";

const SERIES = ["Semua", "11 Series", "12 Series", "13 Series", "14 Series", "15 Series", "16 Series", "17 Series"];
const fallbackSeriesDecor: Record<string, string> = {
  "13 Series": series13Decor,
  "14 Series": series14Decor,
  "15 Series": series15Decor,
  "17 Series": series17Decor,
};
type ApiCategory = { name: string; image?: string };
type ApiList<T> = { data: T[] };
const banners = [bannerOne, bannerTwo, bannerThree];

export default function KatalogPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState("Semua");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [catalog, setCatalog] = useState<Product[]>(products);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const normalizedQuery = query.trim().toLowerCase();
  useEffect(() => { fetchProducts().then(setCatalog).catch(() => setCatalog(products)); }, []);
  useEffect(() => { apiRequest<ApiList<ApiCategory>>("/categories").then((res) => setCategoryImages(Object.fromEntries(res.data.filter((item) => item.image).map((item) => [item.name, item.image ?? ""])))).catch(() => setCategoryImages({})); }, []);
  const filtered = useMemo(
    () => catalog.filter((product) => {
      const haystack = [product.name, product.series, ...(product.specs ?? []), ...product.highlights].join(" ").toLowerCase();
      return (active === "Semua" || product.series === active) && (!normalizedQuery || haystack.includes(normalizedQuery));
    }),
    [active, catalog, normalizedQuery],
  );
  const submitSearch = () => {
    setParams(normalizedQuery ? { q: query.trim() } : {});
    if (normalizedQuery) navigate(`/katalog/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="bg-white pb-20">
      <section className="relative overflow-hidden rounded-t-[44px] bg-gradient-to-br from-[#396687] to-[#31385C] pb-14 pt-6 text-white sm:rounded-none sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-20">
        <div className="absolute -left-10 top-3 size-44 rotate-[-28deg] rounded-[42%] bg-white/10 blur-2xl" />
        <div className="absolute -right-8 top-0 size-36 rotate-[-18deg] rounded-[42%] bg-white/10 blur-xl" />
        <div className="absolute left-24 top-26 size-24 rounded-full bg-[#D85DFF]/55 blur-2xl sm:hidden" />
        <div className="absolute right-10 top-38 size-12 rounded-full bg-[#FD57FF]/80 blur-md sm:hidden" />
        <img src={frontShapeOne} alt="" loading="lazy" decoding="async" className="absolute -left-20 top-8 hidden w-56 -rotate-[33deg] scale-y-[-1] opacity-30 blur-[10px] lg:block" />
        <img src={frontShapeTwo} alt="" loading="lazy" decoding="async" className="absolute -right-10 top-0 hidden w-48 -rotate-[19deg] scale-y-[-1] opacity-35 blur-[2px] lg:block" />
        <Container className="relative z-10">
          <div className="mb-10 flex items-center justify-between text-white/95 sm:hidden">
            <p className="text-[17px] font-semibold tracking-[-0.03em]">9:41</p>
            <div className="flex items-center gap-2">
              <SignalHigh size={18} />
              <Wifi size={18} />
              <BatteryFull size={22} />
            </div>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[34px] font-semibold leading-[1.2] tracking-[-0.055em] !text-white sm:text-[56px]">Selamat Datang,</h1>
              <p className="mt-3 text-[15px] text-white/80">Temukan iPhone favorit anda disini!</p>
            </div>
            <span className="mt-2 grid size-22 place-items-center rounded-full bg-white/90 text-[#AEB3B8] shadow-[0_10px_26px_rgba(0,0,0,0.16)] sm:hidden">
              <UserRound size={52} strokeWidth={1.25} />
            </span>
          </div>
        </Container>
        <Container className="relative z-10 mt-8 sm:mt-6">
          <form className="relative w-full translate-y-9 sm:translate-y-0" onSubmit={(event) => { event.preventDefault(); submitSearch(); }}>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#989696]" size={22} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari iPhone 11, iPhone 13, Pro Max..." className="h-[58px] w-full rounded-full border border-black/5 bg-[#F4F4F4] pl-16 pr-6 text-[15px] text-[#222] shadow-[0_12px_34px_rgba(0,0,0,0.14)] outline-none placeholder:text-[#989696] sm:border-0 sm:bg-white sm:shadow-[3px_6px_11px_rgba(5,4,4,0.15)]" />
          </form>
        </Container>
      </section>

      <Container className="pt-18 sm:pt-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 sm:grid-cols-4 lg:grid-cols-8">
          {SERIES.map((series) => {
            const filterProduct = catalog.find((product) => product.series === series || product.series.includes(series.split(" ")[0]) || product.name.includes(series.split(" ")[0])) ?? catalog[0] ?? products[0];
            const image = series === "Semua" ? "" : categoryImages[series] ?? fallbackSeriesDecor[series] ?? getProductDisplayImage(filterProduct);

            return (
              <button key={series} onClick={() => series === "Semua" ? setActive(series) : navigate(`/katalog/series/${series.split(" ")[0].toLowerCase()}-series`)} className="group grid place-items-center text-center rp-animate-pop" style={{ animationDelay: `${Math.min(SERIES.indexOf(series), 7) * 45}ms` }}>
                <span className={`grid size-[104px] place-items-center rounded-full bg-white shadow-[0_18px_32px_rgba(53,77,112,0.16),inset_0_-10px_22px_rgba(53,77,112,0.08),inset_0_10px_18px_rgba(255,255,255,0.95)] ring-offset-4 ring-offset-white transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 lg:size-[116px] ${active === series ? "ring-2 ring-[#354D70]/35" : "ring-0"}`}>
                  {image ? <img src={image} alt="" loading="lazy" decoding="async" className="h-[78px] w-[78px] rounded-full object-contain p-2 lg:h-[90px] lg:w-[90px]" /> : <span className="size-[70px] rounded-full bg-[#354D70]/8" />}
                </span>
                <span className="mt-3 block text-[12px] font-medium leading-tight text-[#354D70]">{series.replace("Semua", "All")}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 pb-3 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {banners.map((banner, index) => (
            <img key={banner} src={banner} alt={`Promo ${index + 1}`} loading="lazy" decoding="async" className="h-[173px] w-full rounded-[12px] object-cover shadow-[0_18px_40px_rgba(49,56,92,0.12)] rp-hover-lift rp-hover-soft" />
          ))}
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-[#222]">{normalizedQuery ? `Hasil pencarian "${query.trim()}"` : "Terbaru"}</h2>
          <p className="text-[13px] text-[#9B9B9B]">{filtered.length} unit</p>
        </div>

        {filtered.length ? <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {filtered.map((product) => <CatalogCard key={product.id} product={product} />)}
        </div> : <div className="mt-6 rounded-[18px] bg-[#f8f8fa] p-8 text-center text-[#777]">Produk tidak ditemukan.</div>}
      </Container>
    </div>
  );
}

function CatalogCard({ product }: { product: Product }) {
  return (
    <Link to={`/katalog/${product.id}`} className="group relative block min-h-[298px] rp-hover-lift">
      <div className="relative h-[211px] overflow-hidden rounded-[12px] bg-[#f8f8fa] transition duration-500 group-hover:shadow-[0_18px_50px_rgba(49,56,92,0.12)]">
        <div className="absolute inset-x-8 bottom-8 h-16 rounded-full bg-[#354D70]/10 blur-2xl" />
        <img src={getProductDisplayImage(product)} alt={product.name} loading="lazy" decoding="async" className="rp-product-shadow rp-hover-media h-full w-full object-contain p-4" />
        {!product.available ? <span className="absolute left-3 top-3 rounded-full bg-[#DB3022] px-3 py-1 text-[10px] font-medium text-white">Habis</span> : product.badge && <span className="absolute left-3 top-3 rounded-full bg-[#DB3022] px-3 py-1 text-[10px] font-medium text-white">Terbaru</span>}
        <WishlistButton productId={product.id} />
      </div>
      <div className="mt-3 flex items-center gap-1 text-[#9B9B9B]">
        {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" />)}
        <span className="ml-1 text-[11px]">(0)</span>
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[18px] font-medium leading-[1.15] text-[#222]">{product.name}</h3>
          <p className="mt-2 text-[16px] text-[#222]">{formatRupiah(product.pricePerDay)}</p>
        </div>
        <span className="mt-1 grid size-8 place-items-center rounded-full bg-[#354D70]/8 text-[#354D70]"><ArrowUpRight size={15} /></span>
      </div>
    </Link>
  );
}
