// Purpose: Figma-style saved product wishlist page.
// Callers: App `/wishlist` route and account menu.
// Deps: router, shared layout, product data, wishlist hook.
// API: default React page component.
// Side effects: toggles wishlist in localStorage.
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Container } from "../components/Container";
import { WishlistButton } from "../components/WishlistButton";
import { useWishlist } from "../hooks/useWishlist";
import { fetchProducts, products, formatRupiah, getProductDisplayImage, type Product } from "../data/products";

function WishlistCard({ product }: { product: Product }) {
  return (
    <Link to={`/katalog/${product.id}`} className="group relative block min-h-[298px]">
      <div className="relative h-[211px] rounded-[12px] bg-[#f8f8fa] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(49,56,92,0.12)]">
        <div className="absolute inset-x-8 bottom-8 h-16 rounded-full bg-[#354d70]/10 blur-2xl" />
        <img src={getProductDisplayImage(product)} alt={product.name} loading="lazy" className="rp-product-shadow h-full w-full object-contain p-4 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.03]" />
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

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [catalog, setCatalog] = useState<Product[]>(products);
  useEffect(() => { fetchProducts().then(setCatalog).catch(() => setCatalog(products)); }, []);
  const lovedProducts = catalog.filter((product) => wishlist.includes(product.id));
  return (
    <div className="min-h-[100dvh] bg-white pb-32 pt-24 lg:pt-32">
      <Container>
        <div className="mb-10">
          <h1 className="text-[36px] font-medium tracking-[-0.055em] text-[#222] sm:text-[56px]">Produk Favorit</h1>
          <p className="mt-3 text-[15px] text-[#777]">Produk yang Anda simpan untuk disewa nanti.</p>
        </div>
        {lovedProducts.length ? <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {lovedProducts.map((product) => <WishlistCard key={product.id} product={product} />)}
        </div> : <div className="rounded-[24px] bg-[#f8f8fa] p-10 text-center text-[#777]">Belum ada produk favorit.</div>}
      </Container>
    </div>
  );
}
