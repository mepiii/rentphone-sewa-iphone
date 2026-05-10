// Purpose: Database-backed admin dashboard and management screens.
// Callers: App admin routes.
// Deps: router, shared primitives, API client, account session.
// API: exported admin page components.
// Side effects: calls backend admin APIs and clears session on logout.
import { CheckCircle2, ChevronLeft, ChevronRight, LogOut, Pencil, Search, Trash2, UserRound } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { apiRequest, apiUrl } from "../data/api";
import { formatRupiah } from "../data/products";
import { getCurrentAdmin, logoutAdmin } from "../data/mockAccount";

type ApiList<T> = { data: T[] };
type ApiOne<T> = { data: T };
type Category = { id: number; name: string; slug?: string; description?: string; image?: string; is_active?: boolean };
type Product = { id: number; category_id?: number; category?: Category; name: string; model?: string; series?: string; storage?: string; color?: string; colors?: string[]; description?: string; specifications?: string[]; highlights?: string[]; image?: string; device_image?: string; price_per_day: number; stock: number; status: "available" | "unavailable" | "maintenance" };
type Customer = { id: number; name: string; email: string; phone?: string; rental_orders_count?: number };
type Order = { id: number; order_number: string; user?: Customer; items?: { product_name: string; quantity: number; subtotal: number }[]; total_price: number; status: string; payment_status: string; created_at: string; address?: { address_line?: string; city?: string }; delivery_method?: { name: string }; payment_method?: { name: string }; return_report?: ReturnReport };
type ReturnReport = { id: number; user?: Customer; rental_order?: Order; reason?: string; condition_notes?: string; status: string; admin_notes?: string; created_at: string };
type Dashboard = { products: number; customers: number; orders: number; returns: number; revenue: number; recent_orders?: Order[]; low_stock_products?: Product[] };
type ReportRow = { order_date: string; order_number: string; customer: string; category: string; product_name: string; quantity: number; subtotal: number; status: string };

const panel = "rounded-[12px] bg-white p-5 shadow-[0_4px_28px_rgba(0,0,0,0.10)] ring-1 ring-black/5";
const grad = "bg-gradient-to-br from-[#396687] to-[#31385c]";
const statusLabels: Record<string, string> = { available: "Tersedia", unavailable: "Habis", maintenance: "Maintenance", pending: "Menunggu", processing: "Diproses", active: "Aktif", returned: "Dikembalikan", completed: "Selesai", cancelled: "Dibatalkan", submitted: "Dikirim", reviewed: "Direview", accepted: "Diterima", rejected: "Ditolak", unpaid: "Belum Dibayar", paid: "Berhasil", failed: "Gagal", refunded: "Direfund" };
const seriesOptions = ["11 Series", "12 Series", "13 Series", "14 Series", "15 Series", "16 Series", "17 Series"];

const token = () => getCurrentAdmin()?.token;
const adminRequest = <T,>(path: string, options: RequestInit = {}) => apiRequest<T>(path, options, token());
const useAdminList = <T,>(path: string) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = () => adminRequest<ApiList<T>>(path).then((res) => setItems(res.data)).catch((err) => setError(err instanceof Error ? err.message : "Data gagal dimuat")).finally(() => setLoading(false));
  useEffect(() => { refresh(); }, [path]);
  return { items, loading, error, refresh };
};

function AdminShell({ title, children, back = false }: { title: string; children: ReactNode; back?: boolean }) {
  return <div className="min-h-[100dvh] bg-[#f9f9f9] pb-28 pt-8 lg:py-12"><Container><main><div className="mb-8 flex items-center justify-between gap-4"><div>{back && <Link to="/admin" className="mb-3 inline-flex items-center gap-2 text-sm text-[#354d70]"><ChevronLeft size={16} />Kembali</Link>}<h1 className="text-[34px] font-semibold tracking-[-0.055em] text-[#222] sm:text-[52px]">{title}</h1></div><Link to="/admin/account" className="grid size-12 place-items-center rounded-full bg-white text-[#354d70] shadow-[0_8px_24px_rgba(49,56,92,0.12)]"><UserRound /></Link></div><DeleteContext.Provider value={() => undefined}>{children}</DeleteContext.Provider></main></Container></div>;
}

const DeleteContext = createContext<() => void>(() => undefined);
const ReactUseDelete = () => useContext(DeleteContext);

export function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [dashboard, setDashboard] = useState<Dashboard>({ products: 0, customers: 0, orders: 0, returns: 0, revenue: 0 });
  useEffect(() => { adminRequest<ApiOne<Dashboard>>("/admin/dashboard").then((res) => setDashboard(res.data)); }, []);
  const stats = [{ label: "Produk", value: dashboard.products }, { label: "Customer", value: dashboard.customers }, { label: "Pesanan", value: dashboard.orders }, { label: "Pengembalian", value: dashboard.returns }];
  return <AdminShell title="Selamat Datang,"><div className={`${grad} mb-8 rounded-[28px] p-6 text-white shadow-[0_24px_70px_rgba(49,56,92,0.20)]`}><p className="text-[15px] text-white/80">Dashboard Admin Pengelolaan RentPhone</p><div className="mt-5 flex flex-wrap gap-3"><Button asChild variant="secondary" className="bg-white"><Link to="/admin/orders">Pesanan</Link></Button><Button asChild variant="secondary" className="bg-white"><Link to="/admin/customers">Customer</Link></Button><Button asChild variant="secondary" className="bg-white"><Link to="/admin/reports">Laporan</Link></Button></div><div className="relative mt-5"><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#989696]" size={20} /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="h-[57px] rounded-full border-0 bg-white pl-14 text-[#222] shadow-[3px_6px_11px_rgba(5,4,4,0.15)]" /></div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{stats.map((item) => <div key={item.label} className={`${grad} p-[13px] text-white shadow-[0_12px_35px_rgba(49,56,92,0.18)]`}><p className="text-[15px] opacity-90">{item.label}</p><p className="mt-2 text-[26px] font-medium">{item.value}</p></div>)}<div className={`${grad} p-[13px] text-white shadow-[0_12px_35px_rgba(49,56,92,0.18)]`}><p className="text-[15px] opacity-90">Revenue</p><p className="mt-2 text-[20px] font-medium">{formatRupiah(Number(dashboard.revenue))}</p></div></div><section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="text-[24px] font-semibold text-[#222]">Produk Terbaru Anda</h2><Link to="/admin/products" className="text-[15px] text-[#7e8392]">Lihat Semua</Link></div><ProductList limit={3} query={search.trim().toLowerCase()} /></section></AdminShell>;
}

export function AdminProducts({ embedded = false }: { embedded?: boolean }) {
  const content = <><div className="mb-5 flex flex-wrap gap-3"><Button asChild><Link to="/admin/products/new">Tambah Produk</Link></Button><Button asChild variant="secondary" className="bg-white"><Link to="/admin/categories">Kategori</Link></Button><Button asChild variant="secondary" className="bg-white"><Link to="/admin/reports">Laporan</Link></Button></div><ProductList /></>;
  return embedded ? content : <AdminShell title="Daftar Produk" back>{content}</AdminShell>;
}

function ProductList({ limit, query = "" }: { limit?: number; query?: string }) {
  const { items, loading, error, refresh } = useAdminList<Product>("/admin/products");
  const filtered = items.filter((product) => !query || [product.name, product.series, product.description].join(" ").toLowerCase().includes(query)).slice(0, limit ?? items.length);
  const [deleteError, setDeleteError] = useState("");
  const remove = async (id: number) => { setDeleteError(""); try { await adminRequest(`/admin/products/${id}`, { method: "DELETE" }); refresh(); } catch (err) { setDeleteError(err instanceof Error ? err.message : "Produk gagal dihapus"); } };
  if (loading) return <p className="text-sm text-[#777]">Memuat produk...</p>;
  if (error) return <p className="text-sm text-[#db3022]">{error}</p>;
  return <div className="grid gap-4">{deleteError && <p className="rounded-[10px] bg-[#db3022]/10 px-4 py-3 text-sm text-[#db3022]">{deleteError}</p>}{filtered.map((product) => <div key={product.id} className={`${panel} flex items-center justify-between gap-4`}><Link to={`/admin/products/${product.id}/edit`} className="flex min-w-0 flex-1 items-center gap-4"><img src={product.device_image || product.image || "/placeholder.png"} alt="" className="h-[85px] w-[89px] rounded-[4px] object-contain" /><div className="min-w-0"><p className="truncate text-[18px] font-medium text-[#222]">{product.name}</p><p className="text-[13px] text-[#515050]">Stok {product.stock}</p><span className={`mt-2 inline-flex rounded-[6px] px-3 py-1 text-[11px] ${product.status === "available" ? "bg-[#e6e6e6] text-[#1a1a1a]" : "bg-[#db3022] text-white"}`}>{statusLabels[product.status]}</span><p className="mt-2 text-[16px] text-[#222]">{formatRupiah(Number(product.price_per_day))}</p></div></Link><div className="flex gap-2"><button type="button" onClick={() => remove(product.id)} className="grid size-10 place-items-center rounded-[6px] bg-[#db3022] text-white"><Trash2 size={18} /></button><Link to={`/admin/products/${product.id}/edit`} className="grid size-10 place-items-center rounded-[6px] bg-[#278a3c] text-white"><Pencil size={18} /></Link></div></div>)}</div>;
}

export function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id && id !== "new");
  const { items: categories } = useAdminList<Category>("/admin/categories");
  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", price_per_day: "", stock: "0", status: "available", category_id: "", image: "", description: "", series: "11 Series", storage: "128GB", color: "Black", colors: ["Black", "White", "Gold"] });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (editing) adminRequest<ApiOne<Product>>(`/admin/products/${id}`).then((res) => { setProduct(res.data); setForm({ name: res.data.name, price_per_day: String(res.data.price_per_day), stock: String(res.data.stock), status: res.data.status, category_id: String(res.data.category_id ?? ""), image: res.data.image ?? res.data.device_image ?? "", description: res.data.description ?? "", series: res.data.series ?? "11 Series", storage: res.data.storage ?? "128GB", color: res.data.color ?? "Black", colors: res.data.colors?.length ? res.data.colors : ["Black", "White", "Gold"] }); }); }, [editing, id]);
  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const readFile = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => update("image", String(reader.result)); reader.readAsDataURL(file); };
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price_per_day || !form.category_id) return setError("Nama, harga, dan kategori wajib diisi.");
    setError("");
    const payload = { ...form, device_image: form.image, category_id: Number(form.category_id), price_per_day: Number(form.price_per_day), stock: Number(form.stock), model: form.name, description: form.description || `${form.name} siap rental.`, colors: form.colors?.length ? form.colors : ["Black", "White", "Gold"], highlights: ["Unit bersih", "Siap pakai", "QC sebelum sewa"], specifications: ["Battery health baik", "Kamera normal", "Face ID normal"] };
    try {
      await adminRequest(editing ? `/admin/products/${id}` : "/admin/products", { method: editing ? "PUT" : "POST", body: JSON.stringify(payload) });
      setSaved(true);
      window.setTimeout(() => navigate("/admin/products"), 700);
    } catch (err) { setError(err instanceof Error ? err.message : "Produk gagal disimpan"); }
  };
  return <AdminShell title={editing ? "Edit Produk" : "Tambah Produk"} back><FormCard><div className="grid gap-3"><p className="text-[14px] font-semibold text-[#222]">Foto Produk</p><PhotoSlot label="Foto produk" image={form.image || product?.image || product?.device_image} onChange={readFile} /></div><form onSubmit={saveProduct} className="grid gap-5 md:grid-cols-2"><Field label="Nama Produk" value={form.name} onChange={(v) => update("name", v)} /><Field label="Harga (Rp)" value={form.price_per_day} type="number" onChange={(v) => update("price_per_day", v)} /><Field label="Stok" value={form.stock} type="number" onChange={(v) => update("stock", v)} /><Select label="Kategori" value={form.category_id} onChange={(v) => update("category_id", v)} options={[{ value: "", label: "Pilih kategori" }, ...categories.map((c) => ({ value: String(c.id), label: c.name }))]} /><Select label="Status" value={form.status} onChange={(v) => update("status", v)} options={[{ value: "available", label: "Tersedia" }, { value: "unavailable", label: "Habis" }, { value: "maintenance", label: "Maintenance" }]} /><Select label="Series" value={form.series} onChange={(v) => update("series", v)} options={seriesOptions.map((series) => ({ value: series, label: series }))} /><div className="md:col-span-2"><Field label="Deskripsi" value={form.description} onChange={(v) => update("description", v)} /></div>{error && <p className="md:col-span-2 text-sm text-[#db3022]">{error}</p>}<div className="md:col-span-2"><Button type="submit">Simpan</Button></div></form>{saved && <Toast text="Produk berhasil disimpan" />}</FormCard></AdminShell>;
}

export function AdminCategories() {
  const { items, loading, error, refresh } = useAdminList<Category>("/admin/categories");
  const remove = async (id: number) => { await adminRequest(`/admin/categories/${id}`, { method: "DELETE" }); refresh(); };
  return <AdminShell title="Daftar Kategori" back><div className="mb-5"><Button asChild><Link to="/admin/categories/new">Tambah Kategori</Link></Button></div>{loading && <p>Memuat kategori...</p>}{error && <p className="text-[#db3022]">{error}</p>}<div className="grid gap-4 md:grid-cols-2">{items.map((c) => <div key={c.id} className={`${panel} flex items-center justify-between`}><span className="font-semibold text-[#222]">{c.name}</span><span className="flex gap-2"><button type="button" onClick={() => remove(c.id)} className="grid size-10 place-items-center rounded-[6px] bg-[#db3022] text-white"><Trash2 size={18} /></button><Link to={`/admin/categories/${c.id}/edit`} className="grid size-10 place-items-center rounded-[6px] bg-[#278a3c] text-white"><Pencil size={18} /></Link></span></div>)}</div></AdminShell>;
}

export function AdminCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id && id !== "new");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { if (editing) adminRequest<ApiOne<Category>>(`/admin/categories/${id}`).then((res) => { setName(res.data.name); setDescription(res.data.description ?? ""); setImage(res.data.image ?? ""); }); }, [editing, id]);
  const readFile = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setImage(String(reader.result)); reader.readAsDataURL(file); };
  const save = async (event: React.FormEvent) => { event.preventDefault(); if (!name.trim()) return setError("Kategori wajib diisi."); await adminRequest(editing ? `/admin/categories/${id}` : "/admin/categories", { method: editing ? "PUT" : "POST", body: JSON.stringify({ name, description, image, is_active: true }) }); navigate("/admin/categories"); };
  return <AdminShell title={editing ? "Edit Kategori" : "Tambah Kategori"} back><FormCard><form onSubmit={save} className="grid gap-5"><Field label="Kategori" value={name} onChange={setName} /><Field label="Deskripsi" value={description} onChange={setDescription} /><PhotoSlot label="Foto kategori" image={image} onChange={readFile} />{error && <p className="text-sm text-[#db3022]">{error}</p>}<Button type="submit">Simpan</Button></form></FormCard></AdminShell>;
}

export function AdminCustomers() {
  const { items, loading, error, refresh } = useAdminList<Customer>("/admin/customers");
  const remove = async (id: number) => { await adminRequest(`/admin/customers/${id}`, { method: "DELETE" }); refresh(); };
  return <AdminShell title="Daftar Customer" back>{loading && <p>Memuat customer...</p>}{error && <p className="text-[#db3022]">{error}</p>}<div className="space-y-4">{items.map((c) => <div key={c.id} className={`${panel} flex items-center justify-between gap-4`}><div><p className="font-semibold text-[#222]">{c.name}</p><p className="text-sm text-[#888]">{c.phone}</p><p className="text-sm text-[#888]">{c.email}</p><p className="text-sm text-[#888]">{c.rental_orders_count ?? 0} pesanan</p></div><button type="button" onClick={() => remove(c.id)} className="grid size-10 place-items-center rounded-[6px] bg-[#db3022] text-white"><Trash2 size={18} /></button></div>)}</div></AdminShell>;
}

export function AdminOrders({ embedded = false }: { embedded?: boolean }) {
  const [filter, setFilter] = useState("processing");
  const returnsMode = filter === "returns";
  const { items } = useAdminList<Order>(returnsMode ? "/admin/orders?status=returned" : `/admin/orders?status=${filter}`);
  const content = <><div className="mb-5 flex rounded-[10px] bg-white p-1 shadow-[0_4px_18px_rgba(0,0,0,0.08)] ring-1 ring-black/5">{["pending", "processing", "active", "completed", "cancelled", "returns"].map((status) => <button key={status} type="button" onClick={() => setFilter(status)} className={`h-11 flex-1 rounded-[8px] text-[13px] ${filter === status ? "bg-[#354d70] text-white" : "text-[#222]"}`}>{status === "returns" ? "Pengembalian" : statusLabels[status]}</button>)}</div><div className="space-y-4">{items.map((o) => <Link key={o.id} to={`/admin/orders/${o.id}`} className={`${panel} flex items-center justify-between gap-4`}><div><p className="font-semibold text-[#222]">{o.items?.[0]?.product_name ?? o.order_number}</p><p className="text-sm text-[#888]">{new Date(o.created_at).toLocaleDateString("id-ID")} · {o.order_number}</p><p className="mt-2 text-[#222]">{formatRupiah(Number(o.total_price))}</p>{returnsMode && <p className="mt-2 text-sm text-[#db3022]">{statusLabels[o.return_report?.status ?? "submitted"] ?? o.return_report?.status}</p>}</div><div className="flex flex-col items-end gap-2"><span className="rounded-full bg-[#ff6b00]/10 px-4 py-2 text-sm text-[#ff6b00]">{statusLabels[o.status] ?? o.status}</span><span className="rounded-full bg-[#354d70]/10 px-4 py-2 text-sm text-[#354d70]">{statusLabels[o.payment_status] ?? o.payment_status}</span></div><ChevronRight /></Link>)}</div></>;
  return embedded ? content : <AdminShell title="Pesanan" back>{content}</AdminShell>;
}

export function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("processing");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  useEffect(() => { adminRequest<ApiOne<Order>>(`/admin/orders/${id}`).then((res) => { setOrder(res.data); setStatus(res.data.status); setPaymentStatus(res.data.payment_status); }); }, [id]);
  const save = async () => { const res = await adminRequest<ApiOne<Order>>(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status, payment_status: paymentStatus }) }); setOrder(res.data); };
  if (!order) return <AdminShell title="Detail Pesanan" back><p>Memuat pesanan...</p></AdminShell>;
  return <AdminShell title="Detail Pesanan" back><div className={`${panel} mx-auto max-w-3xl space-y-6`}><div className="-mx-5 -mt-5 rounded-t-[12px] bg-[#ff6b00] px-5 py-3 text-white">Pesanan {statusLabels[order.status] ?? order.status}</div><Section title="Status Admin"><Select label="Status Pesanan" value={status} onChange={setStatus} options={["pending", "processing", "active", "returned", "completed", "cancelled"].map((v) => ({ value: v, label: statusLabels[v] }))} /><Select label="Status Pembayaran" value={paymentStatus} onChange={setPaymentStatus} options={["unpaid", "pending", "paid", "failed", "refunded"].map((v) => ({ value: v, label: statusLabels[v] }))} /><Button onClick={save}>Update Status</Button></Section><Section title="Informasi Penyewa"><Info label="Nama" value={order.user?.name ?? "-"} /><Info label="No Hp" value={order.user?.phone ?? "-"} /><Info label="Email" value={order.user?.email ?? "-"} /><Info label="Alamat Pengiriman" value={[order.address?.address_line, order.address?.city].filter(Boolean).join(", ") || "-"} block /></Section><Section title="Pesanan">{order.items?.map((item) => <Info key={item.product_name} label={`${item.product_name} x${item.quantity}`} value={formatRupiah(Number(item.subtotal))} />)}<Info label="Metode Pembayaran" value={order.payment_method?.name ?? "-"} /><Info label="Status Pembayaran" value={statusLabels[order.payment_status] ?? order.payment_status} /><Info label="Pengiriman" value={order.delivery_method?.name ?? "-"} /><div className="mt-3 flex justify-between border-t border-dashed border-black pt-3 font-medium"><span>Total Pembayaran</span><span>{formatRupiah(Number(order.total_price))}</span></div></Section></div></AdminShell>;
}

export function AdminReturns() {
  const { items, refresh } = useAdminList<ReturnReport>("/admin/returns");
  const updateStatus = async (id: number, status: string) => { await adminRequest(`/admin/returns/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }); refresh(); };
  return <AdminShell title="Pengembalian" back><p className="mb-5 text-sm text-[#777]">Pengembalian sekarang tampil di menu Pesanan. Halaman ini tetap tersedia untuk update cepat.</p><div className="space-y-4">{items.map((item) => <div key={item.id} className={`${panel} grid gap-3 md:grid-cols-[1fr_auto] md:items-center`}><div><p className="font-semibold text-[#222]">{item.rental_order?.order_number ?? `Return #${item.id}`}</p><p className="text-sm text-[#888]">{item.user?.name} · {item.condition_notes ?? item.reason}</p><p className="text-sm text-[#888]">{new Date(item.created_at).toLocaleDateString("id-ID")}</p></div><select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)} className="h-11 rounded-[10px] border border-[#e6e6e6] bg-white px-3 text-sm"><option value="submitted">Dikirim</option><option value="reviewed">Direview</option><option value="accepted">Diterima</option><option value="rejected">Ditolak</option></select></div>)}</div></AdminShell>;
}

export function AdminReports() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { items: categories } = useAdminList<Category>("/admin/categories");
  const [rows, setRows] = useState<ReportRow[]>([]);
  const query = useMemo(() => new URLSearchParams({ ...(from ? { from } : {}), ...(to ? { to } : {}), ...(categoryId ? { category_id: categoryId } : {}) }).toString(), [from, to, categoryId]);
  const load = () => adminRequest<ApiList<ReportRow>>(`/admin/reports?${query}`).then((res) => setRows(res.data));
  useEffect(() => { load(); }, [query]);
  const download = async (format: "csv" | "pdf") => {
    const response = await fetch(apiUrl(`/admin/reports/export?format=${format}&${query}`), { headers: { Authorization: `Bearer ${token()}` } });
    if (!response.ok) return;
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-rentphone.${format === "pdf" ? "html" : "csv"}`;
    link.click();
    URL.revokeObjectURL(url);
  };
  return <AdminShell title="Laporan" back><div className={`${panel} mb-5 grid gap-4 md:grid-cols-4`}><Field label="Dari" type="date" value={from} onChange={setFrom} /><Field label="Sampai" type="date" value={to} onChange={setTo} /><Select label="Kategori" value={categoryId} onChange={setCategoryId} options={[{ value: "", label: "Semua" }, ...categories.map((c) => ({ value: String(c.id), label: c.name }))]} /><div className="flex items-end gap-2"><Button type="button" onClick={() => download("csv")}>Export Excel</Button><Button type="button" variant="secondary" className="bg-white" onClick={() => download("pdf")}>Export PDF</Button></div></div><div className="overflow-hidden rounded-[12px] bg-white shadow"><table className="w-full text-left text-sm"><thead className="bg-[#354d70] text-white"><tr><th className="p-3">Tanggal</th><th>Order</th><th>Customer</th><th>Kategori</th><th>Produk</th><th>Total</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.order_number}-${row.product_name}`} className="border-t"><td className="p-3">{row.order_date}</td><td>{row.order_number}</td><td>{row.customer}</td><td>{row.category}</td><td>{row.product_name} x{row.quantity}</td><td>{formatRupiah(Number(row.subtotal))}</td><td>{statusLabels[row.status] ?? row.status}</td></tr>)}</tbody></table></div></AdminShell>;
}

export function AdminAccount() {
  const navigate = useNavigate();
  const editing = useLocation().pathname.endsWith("/edit");
  const user = getCurrentAdmin();
  const doLogout = async () => { try { await adminRequest("/admin/logout", { method: "POST" }); } finally { logoutAdmin(); navigate("/admin/login"); } };
  if (editing) return <AdminShell title="Edit Profil" back><FormCard><Field label="Nama" value={user?.name ?? ""} /><Field label="Email" value={user?.email ?? ""} /><Button>Simpan</Button></FormCard></AdminShell>;
  return <AdminShell title="Akun" back><div className={`${panel} mx-auto max-w-2xl`}><div className="mb-8 flex items-center gap-4"><div className="grid size-16 place-items-center rounded-full bg-[#354d70] text-white"><UserRound /></div><div><p className="text-xl font-semibold">{user?.name ?? "Admin"}</p><p className="text-[#888]">{user?.email}</p></div></div><Link to="/admin/account/edit" className="flex items-center justify-between border-t border-[#e6e6e6] py-5"><span><span className="block">Profil Seller</span><span className="text-sm text-[#888]">Informasi akun utama seller</span></span><ChevronRight /></Link><button type="button" onClick={doLogout} className="mt-4 flex items-center gap-2 border-t border-[#e6e6e6] pt-5 text-[#db3022]"><LogOut size={18} /> Keluar</button></div></AdminShell>;
}

function FormCard({ children }: { children: ReactNode }) { return <div className={`${panel} mx-auto max-w-3xl space-y-5`}>{children}</div>; }
function PhotoSlot({ label, image, onChange }: { label: string; image?: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void }) { return <label className="grid min-h-[154px] cursor-pointer place-items-center rounded-[14px] border border-dashed border-black/20 bg-[#f8f8ff] p-4 text-center"><input type="file" accept="image/*" className="sr-only" onChange={onChange} />{image ? <img src={image} alt="" className="h-28 object-contain" /> : <span><span className="block text-[14px] font-medium text-[#222]">{label}</span><span className="mt-2 block text-[12px] text-[#777]">JPEG, PNG, WebP</span></span>}</label>; }
function Field({ label, value, type = "text", onChange }: { label: string; value?: string; type?: string; onChange?: (value: string) => void }) { return <div className="grid gap-2"><Label className="text-[12px] text-[#9b9b9b]">{label}</Label><Input type={type} value={value} onChange={(e) => onChange?.(e.target.value)} className="h-[54px] rounded-[14px] border-[#e6e6e6] bg-white" /></div>; }
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) { return <label className="grid gap-2"><Label className="text-[12px] text-[#9b9b9b]">{label}</Label><select value={value} onChange={(e) => onChange(e.target.value)} className="h-[54px] rounded-[14px] border border-[#e6e6e6] bg-white px-3 text-sm outline-none">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>; }
function Section({ title, children }: { title: string; children: ReactNode }) { return <section><div className="border-y border-[#d2d2d2] py-2 text-center text-[17px] font-medium text-[#666]">{title}</div><div className="mt-4 grid gap-4 text-[16px]">{children}</div></section>; }
function Info({ label, value, block = false }: { label: string; value: string; block?: boolean }) { return <div className={block ? "grid gap-1" : "flex justify-between gap-4"}><span className="text-[#4c4545]">{label}</span><span className={block ? "text-black" : "text-right text-black"}>{value}</span></div>; }
function Toast({ text }: { text: string }) { return <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#354d70] px-5 py-3 text-sm font-medium text-white shadow-[0_16px_44px_rgba(53,77,112,0.28)]">{text}</div>; }
function DeletePopup({ onClose }: { onClose: () => void }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-black/25 px-5"><div className="w-full max-w-[360px] rounded-[28px] bg-white p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.18)]"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#2aa952]/10 text-[#2aa952]"><CheckCircle2 size={48} /></div><p className="mt-6 text-[24px] font-semibold text-[#222]">Data Berhasil dihapus</p><Button size="lg" className="mt-8 h-[56px] w-full" onClick={onClose}>Kembali</Button></div></div>; }
