// Purpose: Product detail page adapted from Figma product screen.
// Callers: App route `/katalog/:id`.
// Deps: product data, router params, shared layout, rental draft storage.
// API: default React page component.
// Side effects: saves selected rental draft and wishlist to localStorage.
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { fetchProduct, products, formatRupiah, getProductDisplayImage, type Product } from "../data/products";
import { addRentalCartItem, getWishlist, saveRentalDraft, toggleWishlist } from "../data/mockTransactions";
import cartIcon from "../../imports/Home/cart.svg";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fallbackProduct = products.find((item) => item.id === id) ?? products[0];
  const [product, setProduct] = useState<Product>(fallbackProduct);
  const [color, setColor] = useState(fallbackProduct.colors[0]);
  const [colorSelected, setColorSelected] = useState(false);
  const [loved, setLoved] = useState(() => getWishlist().includes(product.id));
  useEffect(() => { if (id) fetchProduct(id).then((item) => { setProduct(item); setColor(item.colors[0]); setLoved(getWishlist().includes(item.id)); }).catch(() => undefined); }, [id]);
  const productImage = getProductDisplayImage(product, colorSelected ? color : undefined);
  const isAvailable = product.available;
  const startRental = () => {
    if (!isAvailable) return;
    const item = { productId: product.id, color };
    saveRentalDraft(item);
    addRentalCartItem(item);
    navigate("/checkout");
  };
  const addToCart = () => {
    if (!isAvailable) return;
    addRentalCartItem({ productId: product.id, color });
    navigate("/checkout");
  };
  return (
    <div className="bg-[#fdfdfd] pb-24">
      <section className="bg-[#f8f8fa] py-10 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-b-[23px] rounded-t-[36px] bg-white shadow-[0_18px_80px_rgba(0,0,0,0.08)]">
              <button type="button" onClick={() => { const next = toggleWishlist(product.id); setLoved(next.includes(product.id)); }} className={`absolute right-6 top-6 z-10 grid size-[42px] place-items-center rounded-full bg-white shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:scale-110 ${loved ? "text-[#DB3022]" : "text-[#222]"}`} aria-label={loved ? "Hapus dari favorit" : "Tambah ke favorit"}>
                {loved ? (
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="#db3022" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3535 0.5C19.0498 0.500082 20.6211 1.27554 21.7803 2.7168C22.9299 4.14638 23.5801 6.12347 23.5801 8.2959C23.5801 10.5065 22.8668 12.5434 21.2871 14.7285C19.86 16.7027 17.7999 18.7173 15.3643 21.0967C14.5358 21.9062 13.5937 22.8257 12.6162 23.8057V23.8066C12.4462 23.9772 12.2405 24.0596 12.04 24.0596C11.8395 24.0596 11.6343 23.9768 11.4639 23.8057H11.4629C10.4854 22.8259 9.54394 21.9058 8.71582 21.0967C6.28004 18.7171 4.22098 16.7024 2.79395 14.7285C1.21412 12.5431 0.5 10.5064 0.5 8.2959C0.50006 6.1233 1.15037 4.14635 2.2998 2.7168C3.45895 1.27558 5.03025 0.500059 6.72656 0.5C7.98442 0.5 9.14201 0.951928 10.1787 1.87109C10.705 2.33766 11.1878 2.91408 11.6172 3.59473L12.04 4.26562L12.4629 3.59473C12.8925 2.91387 13.3752 2.33767 13.9014 1.87109C14.9382 0.952003 16.0957 0.5 17.3535 0.5Z" />
                  </svg>
                ) : (
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3535 0.5C19.0498 0.500082 20.6211 1.27554 21.7803 2.7168C22.9299 4.14638 23.5801 6.12347 23.5801 8.2959C23.5801 10.5065 22.8668 12.5434 21.2871 14.7285C19.86 16.7027 17.7999 18.7173 15.3643 21.0967C14.5358 21.9062 13.5937 22.8257 12.6162 23.8057V23.8066C12.4462 23.9772 12.2405 24.0596 12.04 24.0596C11.8395 24.0596 11.6343 23.9768 11.4639 23.8057H11.4629C10.4854 22.8259 9.54394 21.9058 8.71582 21.0967C6.28004 18.7171 4.22098 16.7024 2.79395 14.7285C1.21412 12.5431 0.5 10.5064 0.5 8.2959C0.50006 6.1233 1.15037 4.14635 2.2998 2.7168C3.45895 1.27558 5.03025 0.500059 6.72656 0.5C7.98442 0.5 9.14201 0.951928 10.1787 1.87109C10.705 2.33766 11.1878 2.91408 11.6172 3.59473L12.04 4.26562L12.4629 3.59473C12.8925 2.91387 13.3752 2.33767 13.9014 1.87109C14.9382 0.952003 16.0957 0.5 17.3535 0.5Z" stroke="black" strokeWidth="1.5"/>
                  </svg>
                )}
              </button>
              <div className="absolute inset-x-16 bottom-16 h-28 rounded-full bg-[var(--rp-deep)]/10 blur-3xl" />
              <img src={productImage} alt={product.name} className="rp-product-shadow absolute inset-0 m-auto h-[82%] w-[78%] object-contain" />
            </div>
            <div>
              <h1 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#353535] sm:text-[68px]">{product.name}</h1>
              <div className="mt-5 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[13px] text-[#353535]/50">{product.series}</p>
                  {!isAvailable && <span className="mt-3 inline-flex rounded-full bg-[#DB3022] px-4 py-1.5 text-[11px] font-medium text-white">Habis</span>}
                </div>
                <p className="text-[30px] font-semibold tracking-[-0.05em] text-[#353535]">{formatRupiah(product.pricePerDay)}<span className="ml-1 text-[14px] font-normal text-[#9b9b9b]">/hari</span></p>
              </div>
              <div className="mt-8 flex items-center justify-between border-y border-[#e8ecf1] py-5">
                <p className="text-[14px] font-medium text-black">Warna</p>
                <div className="flex gap-2">{product.colors.map((item) => <button key={item} type="button" onClick={() => { setColor(item); setColorSelected(true); }} className={`grid size-9 place-items-center rounded-full ring-2 ${color === item ? "ring-[var(--rp-deep)]" : "ring-black/10"}`} style={{ background: item }}>{color === item && <Check size={16} className="text-white drop-shadow" />}</button>)}</div>
              </div>
              <div className="mt-8 text-[#353535]">
                <p className="text-[14px] font-medium">Deskripsi</p>
                <p className="mt-4 max-w-xl text-[14px] leading-[1.7] opacity-70">{product.description ?? `${product.name} kondisi terawat, siap pakai untuk konten, event, perjalanan, atau testing device. Harga tercantum per hari. Unit dicek sebelum dan sesudah penyewaan. Deposit mengikuti model dan durasi sewa.`}</p>
                <ul className="mt-4 space-y-2 text-[14px] opacity-70">{product.highlights.map((item) => <li key={item}>• {item}</li>)}</ul>
              </div>
              <div className="mt-10 flex gap-4">
                <Button variant="secondary" size="lg" className="grid size-[63px] place-items-center rounded-full border-[#c6c6cd]/40 bg-white p-0 disabled:opacity-45" onClick={addToCart} disabled={!isAvailable} aria-label="Tambah ke checkout"><img src={cartIcon} alt="" className="size-5" /></Button>
                <Button size="lg" className="h-[63px] flex-1 disabled:opacity-45" onClick={startRental} disabled={!isAvailable}>{isAvailable ? "Sewa Sekarang" : "Habis"}</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
