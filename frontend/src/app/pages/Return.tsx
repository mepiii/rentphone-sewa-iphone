// Purpose: Figma-style rental return page backed by API orders and return reports.
// Callers: App routes `/return` and `/pengembalian`.
// Deps: shared layout, shadcn input, app button, API client, session helper.
// API: default React page component.
// Side effects: fetches orders, previews uploaded file, submits return report.
import { Camera, CalendarDays, CheckCircle2, ChevronDown, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { apiRequest } from "../data/api";
import { getCurrentUser } from "../data/mockAccount";

const fieldClass = "h-[50px] rounded-[8px] border-[#d2d2d2] bg-[#f8f8fa] px-4 text-[14px] text-[#191c1e] shadow-none focus-visible:ring-[#354d70]/20";
const conditions = ["Excellent", "Baik", "Ada lecet ringan", "Perlu dicek"];
type ApiList<T> = { data: T[] };
type Order = { id: number; order_number: string; status: string; items?: { product_name: string }[] };

export default function ReturnPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const user = getCurrentUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [condition, setCondition] = useState(conditions[0]);
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!user?.token) return;
    apiRequest<ApiList<Order>>("/orders", {}, user.token).then((res) => setOrders(res.data)).catch(() => setError("Pesanan gagal dimuat."));
  }, [user?.token]);
  const tx = orders.find((item) => String(item.id) === params.get("tx")) ?? orders.find((item) => !["completed", "cancelled", "returned"].includes(item.status)) ?? orders[0];
  const upload = (file?: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return setError("Ukuran foto maksimal 5MB.");
    setError("");
    setPreview(URL.createObjectURL(file));
  };
  const submit = async () => {
    if (!user?.token) return navigate("/login?next=/pengembalian");
    if (!tx || !date || !condition || !preview) return setError("Tanggal, kondisi, foto perangkat, dan pesanan wajib diisi.");
    setError("");
    try {
      await apiRequest("/returns", { method: "POST", body: JSON.stringify({ rental_order_id: tx.id, reason: "Sewa selesai", condition_notes: `${condition}. ${note}`.trim(), image: preview }) }, user.token);
      setDone(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Pengembalian gagal dikirim"); }
  };

  if (done) return <div className="grid min-h-[100dvh] place-items-center bg-black/20 px-5"><div className="w-full max-w-[390px] rounded-[28px] bg-white p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.18)]"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#2aa952]/10 text-[#2aa952]"><CheckCircle2 size={48} /></div><h1 className="mt-6 text-[30px] font-semibold text-[#222]">Laporan Terkirim</h1><p className="mt-3 text-[15px] text-[#777]">Data pengembalian berhasil disimpan.</p><Button size="lg" className="mt-8 h-[56px] w-full" onClick={() => navigate("/history")}>Lihat Riwayat</Button></div></div>;

  return (
    <div className="min-h-[100dvh] bg-white pb-28 pt-24 lg:pt-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[36px] font-medium tracking-[-0.055em] text-[#222] sm:text-[56px]">Pengembalian</h1>
          <div className="mt-8 rounded-[12px] bg-white p-5 shadow-[0_4px_18px_rgba(0,0,0,0.14)] ring-1 ring-black/5 sm:p-8">
            <div className="rounded-[12px] bg-[#f8f8fa] p-4">
              <p className="text-[13px] font-medium text-[#964206]">{tx?.status ?? "Belum ada pesanan"}</p>
              <h2 className="mt-2 text-[24px] font-semibold text-[#222]">{tx?.items?.map((item) => item.product_name).join(", ") || "Pesanan RentPhone"}</h2>
              <p className="mt-1 text-[14px] text-[#7b7979]">{tx?.order_number ?? "-"}</p>
            </div>
            <div className="mt-7 grid gap-6">
              <div className="grid gap-2"><Label className="pl-1 text-[10px] font-bold uppercase text-[#45464d]">Tanggal Pengembalian</Label><div className="relative"><Input className={`${fieldClass} pr-10`} type="date" value={date} onChange={(event) => setDate(event.target.value)} /><CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-[#76777d]" size={16} /></div></div>
              <div className="grid gap-2"><Label className="pl-1 text-[10px] font-bold uppercase text-[#45464d]">Kondisi Barang</Label><div className="relative"><select className={`${fieldClass} w-full appearance-none pr-10`} value={condition} onChange={(event) => setCondition(event.target.value)}>{conditions.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#76777d]" size={18} /></div></div>
              <div>
                <div className="mb-4 flex items-end justify-between"><Label className="pl-1 text-[10px] font-bold uppercase text-[#45464d]">Unggah foto perangkat</Label><span className="text-[10px] text-[#45464d]/60">Maks. 5MB</span></div>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex h-[82px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-[#c6c6cd]/40 bg-white text-[#76777d]"><Upload size={24} /><span className="mt-2 text-[9px] font-bold uppercase tracking-[-0.05em]">Tambah Foto</span><input type="file" accept="image/*" className="hidden" onChange={(event) => upload(event.target.files?.[0])} /></label>
                  {preview ? <img src={preview} alt="Preview perangkat" className="h-[82px] rounded-[12px] object-cover" /> : <div className="grid h-[82px] place-items-center rounded-[12px] bg-[#f8f8fa] text-[#76777d]"><Camera size={22} /></div>}
                  <div className="grid h-[82px] place-items-center rounded-[12px] bg-[#f8f8fa] text-[#76777d]"><Camera size={22} /></div>
                </div>
              </div>
              <div className="grid gap-2"><Label className="pl-1 text-[10px] font-bold uppercase text-[#45464d]">Catatan Tambahan (Opsional)</Label><Input className={`${fieldClass} h-[112px] rounded-[12px] pb-16`} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Contoh: Lecet halus di bagian sudut kanan bawah..." /></div>
            </div>
            {error && <p className="mt-4 text-[13px] text-[#db3022]">{error}</p>}
            <Button size="lg" className="mt-8 h-[63px] w-full" onClick={submit}>Selesai Sewa</Button>
            <p className="mt-4 text-center text-[12px] italic text-[#777]">Pastikan data dan foto perangkat sudah sesuai sebelum dikirim.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
