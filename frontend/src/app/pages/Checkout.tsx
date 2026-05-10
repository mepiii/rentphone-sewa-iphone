// Purpose: Figma-style checkout flow backed by API order creation.
// Callers: App route `/checkout`.
// Deps: product, delivery, payment, account, transaction storage, shared layout.
// API: default React page component.
// Side effects: reads/writes localStorage for cart, delivery/payment choices, and calls checkout APIs.
import { CheckCircle2, ChevronLeft, CreditCard, MapPin, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { fetchProducts, products, formatRupiah, getProductDisplayImage, type Product } from "../data/products";
import { deliveryMethods, getDeliveryMethod } from "../data/deliveryMethods";
import { getPaymentMethod, paymentMethods } from "../data/paymentMethods";
import { getRentalCart, getSavedDeliveryMethodId, getSavedPaymentMethodId, removeRentalCartItem, saveDeliveryMethodId, savePaymentMethodId, saveRentalCart, updateRentalCartItem, type RentalCartItem } from "../data/mockTransactions";
import { getCurrentUser, getShippingAddresses } from "../data/mockAccount";
import { apiRequest } from "../data/api";
import cartIcon from "../../imports/Home/cart.svg";
import durationIcon from "../../imports/Home/duration.svg";

type Step = "checkout" | "duration" | "address" | "delivery" | "payment" | "success";
type ApiList<T> = { data: T[] };
type ApiAddress = { id: number; recipient_name: string; phone: string; address_line: string; city: string };
type ApiDelivery = { id: number; name: string; price: number; image?: string };
type ApiPayment = { id: number; name: string; image?: string };
const durations = [1, 2, 3, 7];
const norm = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const findDeliveryId = (methods: ApiDelivery[], id: string) => methods.find((item) => norm(item.name).includes(id === "gojek" ? "gojek" : "ambil") || norm(item.name).includes(id === "gojek" ? "kurir" : "pickup"))?.id;
const findPaymentId = (methods: ApiPayment[], id: string) => methods.find((item) => norm(item.name).includes(norm(id.replace("-va", ""))))?.id;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [cart, setCart] = useState(getRentalCart);
  const [step, setStep] = useState<Step>("checkout");
  const [duration, setDuration] = useState(2);
  const [catalog, setCatalog] = useState<Product[]>(products);
  const [addresses, setAddresses] = useState<ApiAddress[]>([]);
  const [apiDeliveries, setApiDeliveries] = useState<ApiDelivery[]>([]);
  const [apiPayments, setApiPayments] = useState<ApiPayment[]>([]);
  const [deliveryId, setDeliveryId] = useState(getSavedDeliveryMethodId());
  const [paymentId, setPaymentId] = useState(getSavedPaymentMethodId());
  const [addressId, setAddressId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { fetchProducts().then(setCatalog).catch(() => setCatalog(products)); }, []);
  useEffect(() => {
    if (!user?.token) return;
    apiRequest<ApiList<ApiAddress>>("/addresses", {}, user.token).then((res) => { setAddresses(res.data); setAddressId(String(res.data[0]?.id ?? "")); }).catch(() => undefined);
    apiRequest<ApiList<ApiDelivery>>("/delivery-methods").then((res) => setApiDeliveries(res.data)).catch(() => undefined);
    apiRequest<ApiList<ApiPayment>>("/payment-methods").then((res) => setApiPayments(res.data)).catch(() => undefined);
  }, [user?.token]);
  const delivery = getDeliveryMethod(deliveryId);
  const payment = getPaymentMethod(paymentId);
  const address = addresses.find((item) => String(item.id) === addressId) ?? getShippingAddresses()[0];
  const cartProducts = useMemo(() => cart.map((item) => ({ item, product: catalog.find((product) => product.id === item.productId) ?? catalog[0] ?? products[0] })), [cart, catalog]);
  const subtotal = cartProducts.reduce((sum, { item, product }) => sum + product.pricePerDay * duration * item.quantity, 0);
  const total = subtotal + Number(delivery.price);
  const updateQuantity = (item: RentalCartItem, quantity: number) => setCart(updateRentalCartItem(item, quantity));
  const removeItem = (item: RentalCartItem) => setCart(removeRentalCartItem(item));
  const resolveAddressId = async () => {
    if (/^\d+$/.test(addressId)) return Number(addressId);
    const local = getShippingAddresses().find((item) => item.id === addressId) ?? getShippingAddresses()[0];
    const res = await apiRequest<{ data: ApiAddress }>("/addresses", { method: "POST", body: JSON.stringify({ recipient_name: local.name, phone: local.phone, address_line: local.address, city: local.city, notes: local.note, is_default: true }) }, user?.token);
    setAddresses([res.data]);
    setAddressId(String(res.data.id));
    return res.data.id;
  };
  const confirm = async () => {
    if (!user?.token) return navigate("/register?next=/checkout");
    setError("");
    try {
      const [deliveries, payments] = await Promise.all([
        apiDeliveries.length ? Promise.resolve(apiDeliveries) : apiRequest<ApiList<ApiDelivery>>("/delivery-methods").then((res) => res.data),
        apiPayments.length ? Promise.resolve(apiPayments) : apiRequest<ApiList<ApiPayment>>("/payment-methods").then((res) => res.data),
      ]);
      setApiDeliveries(deliveries);
      setApiPayments(payments);
      const deliveryMethodId = findDeliveryId(deliveries, deliveryId);
      const paymentMethodId = findPaymentId(payments, paymentId);
      if (!cartProducts.length || !deliveryMethodId || !paymentMethodId) return setError("Alamat, pengiriman, pembayaran, dan produk wajib diisi.");
      const nextAddressId = await resolveAddressId();
      await apiRequest("/orders", { method: "POST", body: JSON.stringify({ items: cartProducts.map(({ item }) => ({ product_id: Number(item.productId), color: item.color, quantity: item.quantity })), address_id: nextAddressId, delivery_method_id: deliveryMethodId, payment_method_id: paymentMethodId, rental_duration_type: "day", rental_duration_value: duration }) }, user.token);
      saveRentalCart([]);
      setCart([]);
      setStep("success");
    } catch (err) { setError(err instanceof Error ? err.message : "Checkout gagal"); }
  };

  if (step === "success") return <SuccessScreen onOrders={() => navigate("/history")} onShop={() => navigate("/katalog")} />;
  if (step === "duration") return <ChoiceScreen title="Durasi Sewa" onBack={() => setStep("checkout")} action="Lanjutkan" onAction={() => setStep("checkout")}>{durations.map((day) => <Choice key={day} active={duration === day} title={`${day} Hari`} meta={formatRupiah(cartProducts.reduce((sum, { item, product }) => sum + product.pricePerDay * day * item.quantity, 0))} onClick={() => setDuration(day)} />)}</ChoiceScreen>;
  if (step === "address") return <ChoiceScreen title="Alamat Pengiriman" onBack={() => setStep("checkout")} action="Lanjutkan" onAction={() => setStep("checkout")}>{(addresses.length ? addresses : getShippingAddresses()).map((item) => <Choice key={item.id} active={String(item.id) === addressId} title={("recipient_name" in item ? item.recipient_name : item.name)} meta={`${item.phone} · ${"address_line" in item ? item.address_line : item.address}`} onClick={() => setAddressId(String(item.id))} />)}</ChoiceScreen>;
  if (step === "delivery") return <ChoiceScreen title="Metode Pengiriman" onBack={() => setStep("checkout")} action="Lanjutkan" onAction={() => setStep("checkout")}>{deliveryMethods.map((item) => <Choice key={item.id} active={deliveryId === item.id} title={item.name} meta={formatRupiah(Number(item.price))} image={item.image} onClick={() => { setDeliveryId(item.id); saveDeliveryMethodId(item.id); }} />)}</ChoiceScreen>;
  if (step === "payment") return <ChoiceScreen title="Pembayaran" onBack={() => setStep("checkout")} action="Simpan" onAction={() => setStep("checkout")}>{paymentMethods.map((item) => <PaymentChoice key={item.id} active={paymentId === item.id} name={item.name} image={item.image} onClick={() => { setPaymentId(item.id); savePaymentMethodId(item.id); }} />)}</ChoiceScreen>;

  return (
    <div className="min-h-[100dvh] bg-[#fdfdfd] pb-28 pt-24 lg:pt-32">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="min-w-0">
            <h1 className="text-[42px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#222] sm:text-[68px]">Checkout</h1>
            <div className="mt-8 grid gap-5">
              <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_28px_rgba(0,0,0,0.10)] ring-1 ring-black/5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#9b9b9b]">Keranjang sewa</p>
                    <h2 className="mt-1 text-[24px] font-semibold leading-tight text-[#222]">{cartProducts.length} produk dipilih</h2>
                  </div>
                  <Button variant="secondary" className="h-10 rounded-full bg-[#f8f8fa] px-4" onClick={() => navigate("/katalog")}>Tambah</Button>
                </div>
                <div className="mt-5 grid gap-4">
                  {cartProducts.map(({ item, product }) => <div key={`${item.productId}-${item.color}`} className="grid gap-4 overflow-hidden rounded-[18px] border border-[#ececf0] bg-[#f9f9fb] p-4 sm:grid-cols-[88px_minmax(0,1fr)] lg:grid-cols-[88px_minmax(0,1fr)_auto] lg:items-center">
                    <div className="grid h-[112px] place-items-center overflow-hidden rounded-[16px] bg-white sm:h-[104px]"><img src={getProductDisplayImage(product, item.color)} alt={product.name} className="max-h-[92px] max-w-[78px] object-contain sm:max-h-[88px] sm:max-w-[72px]" /></div>
                    <div className="min-w-0">
                      <h3 className="truncate text-[20px] font-semibold leading-tight text-[#222]">{product.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-2 text-[13px] text-[#777]"><span className="rounded-full bg-white px-3 py-1">{item.color.toUpperCase()}</span><span className="rounded-full bg-white px-3 py-1">{duration} hari</span><span className="rounded-full bg-[#dd8560]/10 px-3 py-1 font-medium text-[#dd8560]">{formatRupiah(product.pricePerDay)} / hari</span></div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2 lg:col-span-1 lg:justify-end">
                      <div className="flex items-center rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_rgba(53,77,112,0.10)]">
                        <button type="button" className="grid size-9 place-items-center rounded-full text-[#354d70]" onClick={() => updateQuantity(item, item.quantity - 1)} aria-label="Kurangi jumlah"><Minus size={15} /></button>
                        <span className="min-w-8 text-center text-[15px] font-semibold text-[#222]">{item.quantity}</span>
                        <button type="button" className="grid size-9 place-items-center rounded-full bg-[#354d70] text-white" onClick={() => updateQuantity(item, item.quantity + 1)} aria-label="Tambah jumlah"><Plus size={15} /></button>
                      </div>
                      <p className="min-w-[110px] text-right text-[16px] font-semibold text-[#222]">{formatRupiah(product.pricePerDay * duration * item.quantity)}</p>
                      <button type="button" className="grid size-10 place-items-center rounded-full bg-white text-[#db3022] shadow-[inset_0_0_0_1px_rgba(219,48,34,0.12)]" onClick={() => removeItem(item)} aria-label="Hapus dari cart"><Trash2 size={16} /></button>
                    </div>
                  </div>)}
                </div>
              </section>

              <section className="rounded-[24px] bg-white p-5 shadow-[0_4px_28px_rgba(0,0,0,0.10)] ring-1 ring-black/5 sm:p-6">
                <p className="text-[16px] font-semibold text-[#222]">Detail pesanan</p>
                <div className="mt-4 grid gap-3">
                  <StepButton icon={<MapPin size={18} />} title="Alamat Pengiriman" value={"recipient_name" in address ? address.recipient_name : address.name} onClick={() => setStep("address")} />
                  <StepButton icon={<img src={delivery.image ?? cartIcon} alt="" className="size-5 object-contain" />} title="Metode Pengiriman" value={delivery.name} onClick={() => setStep("delivery")} />
                  <StepButton icon={<CreditCard size={18} />} title="Metode Pembayaran" value={payment.name} onClick={() => setStep("payment")} />
                  <StepButton icon={<img src={durationIcon} alt="" className="size-5 object-contain" />} title="Durasi Sewa" value={`${duration} Hari`} onClick={() => setStep("duration")} />
                </div>
              </section>
            </div>
          </section>
          <aside className="h-fit rounded-[22px] bg-white p-5 shadow-[0_4px_28px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
            <p className="text-[16px] font-semibold text-[#222]">Ringkasan</p>
            <PriceRow label="Harga Sewa" value={formatRupiah(subtotal)} />
            <PriceRow label="Biaya Pengiriman" value={formatRupiah(delivery.price)} />
            <div className="my-5 border-t border-dashed border-[#222]" />
            <PriceRow label="Total Pembayaran" value={formatRupiah(total)} strong />
            {error && <p className="mt-5 text-[13px] text-[#db3022]">{error}</p>}
            <Button size="lg" className="mt-8 h-[63px] w-full" onClick={confirm}>Bayar Sekarang</Button>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function StepButton({ icon, title, value, onClick }: { icon: ReactNode; title: string; value: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="flex min-h-[72px] items-center justify-between gap-4 rounded-[16px] border border-[#e4e4e4] bg-[#f9f9f9] px-4 py-3 text-left transition hover:border-[#354d70]/40 hover:bg-white"><span className="flex min-w-0 items-center gap-3 text-[#222]"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#354d70] shadow-[0_4px_14px_rgba(53,77,112,0.08)]">{icon}</span><span className="min-w-0"><span className="block text-[15px] font-medium">{title}</span><span className="mt-1 block break-words text-[13px] leading-tight text-[#888]">{value}</span></span></span><ChevronLeft className="shrink-0 rotate-180 text-[#9b9b9b]" size={18} /></button>;
}

function ChoiceScreen({ title, children, action, onAction, onBack }: { title: string; children: ReactNode; action: string; onAction: () => void; onBack: () => void }) {
  return <div className="min-h-[100dvh] bg-[#f9f9f9] pb-28 pt-24"><Container><div className="mx-auto max-w-[640px]"><button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-[#222]"><ChevronLeft size={18} />Kembali</button><h1 className="text-[34px] font-semibold tracking-[-0.055em] text-[#222]">{title}</h1><div className="mt-8 grid gap-3">{children}</div><Button size="lg" className="mt-8 h-[63px] w-full" onClick={onAction}>{action}</Button></div></Container></div>;
}

function Choice({ active, title, meta, image, onClick }: { active: boolean; title: string; meta: string; image?: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-[12px] border px-5 py-4 text-left ${active ? "border-[#354d70] bg-[#354d70]/8" : "border-[#d2d2d2] bg-white"}`}><span className="flex items-center justify-between gap-4"><span><span className="block text-[17px] font-medium text-[#222]">{title}</span>{image ? <img src={image} alt={title} className="mt-3 h-9 w-auto object-contain" /> : <span className="mt-1 block text-[13px] leading-[1.5] text-[#7b7979]">{meta}</span>}</span>{active && <CheckCircle2 className="text-[#119426]" size={20} />}</span></button>;
}

function PaymentChoice({ active, name, image, onClick }: { active: boolean; name: string; image?: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-[14px] border bg-white px-5 py-4 text-left ${active ? "border-[#354d70] shadow-[0_10px_30px_rgba(53,77,112,0.14)]" : "border-[#d2d2d2]"}`}><span className="flex items-center justify-between gap-4"><span><span className="block text-[15px] font-medium text-[#222]">{name}</span>{image && <img src={image} alt={name} className="mt-3 h-9 w-auto object-contain" />}</span>{active && <CheckCircle2 className="text-[#119426]" size={20} />}</span></button>;
}

function SuccessScreen({ onOrders, onShop }: { onOrders: () => void; onShop: () => void }) {
  return <div className="grid min-h-[100dvh] place-items-center bg-black/20 px-5"><div className="w-full max-w-[390px] rounded-[28px] bg-white p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.18)]"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#2aa952]/10 text-[#2aa952]"><CheckCircle2 size={48} /></div><h1 className="mt-6 text-[34px] font-semibold text-[#222]">Selamat!</h1><p className="mt-3 text-[16px] text-[#777]">Pesanan Anda telah dilakukan.</p><Button size="lg" className="mt-8 h-[56px] w-full" onClick={onOrders}>Lihat Pesanan</Button><Button variant="secondary" size="lg" className="mt-3 h-[56px] w-full bg-[#f9f9f9]" onClick={onShop}>Belanja Lagi</Button></div></div>;
}

function PriceRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className="mt-5 flex items-center justify-between"><span className="text-[15px] font-medium text-[#4c4545]">{label}</span><span className={strong ? "text-[22px] font-semibold text-[#222]" : "text-[17px] text-[#222]"}>{value}</span></div>;
}
