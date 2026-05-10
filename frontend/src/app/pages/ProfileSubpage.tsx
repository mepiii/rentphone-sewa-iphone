// Purpose: Lightweight frontend-only profile subpages.
// Callers: App `/profil/*` routes.
// Deps: shared layout, profile menu, transaction helpers, mock account store.
// API: ProfileSubpage component.
// Side effects: reads/writes localStorage for mock profile details.
import { useState } from "react";
import { Link } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { deleteShippingAddress, getDisplayUser, getShippingAddress, getShippingAddresses, saveCurrentUser, saveShippingAddress, type MockUser, type ShippingAddress } from "../data/mockAccount";
import { getSavedPaymentMethodId, getTransactions } from "../data/mockTransactions";
import { getPaymentMethod } from "../data/paymentMethods";
import { formatRupiah } from "../data/products";

export type ProfileSubpageKind = "orders" | "address" | "payment" | "history" | "reviews" | "settings";

const copy: Record<ProfileSubpageKind, { title: string; body?: string }> = {
  orders: { title: "Pesananku" },
  address: { title: "Alamat pengiriman." },
  payment: { title: "Metode favorit.", body: "Pilih metode pembayaran dari halaman pembayaran." },
  history: { title: "Riwayat transaksi.", body: "Semua transaksi sewa lokal tersimpan di browser." },
  reviews: { title: "Ulasan saya." },
  settings: { title: "Pengaturan" },
};

export default function ProfileSubpage({ kind }: { kind: ProfileSubpageKind }) {
  const info = copy[kind];
  const transactions = getTransactions();
  const payment = getPaymentMethod(getSavedPaymentMethodId());
  const [user, setUser] = useState(getDisplayUser);
  const [address, setAddress] = useState(getShippingAddress);
  const [addresses, setAddresses] = useState(getShippingAddresses);
  const saveUser = (next: MockUser) => {
    saveCurrentUser(next);
    setUser(next);
  };
  const saveAddress = (next: ShippingAddress) => {
    saveShippingAddress(next);
    setAddress(next);
    setAddresses(getShippingAddresses());
  };
  const deleteAddress = (id: string) => {
    const next = deleteShippingAddress(id);
    setAddresses(next);
    setAddress(getShippingAddress());
  };
  return (
    <div className="bg-[#fdfdfd] py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#222] sm:text-[68px]">{info.title}</h1>
          {info.body && <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-[#76777d]">{info.body}</p>}
          <Card className="mt-10 rounded-[12px] border-0 bg-white shadow-[0_4px_28px_rgba(0,0,0,0.10)]"><CardContent className="p-6 sm:p-8">{renderContent(kind, transactions, payment.name, user, saveUser, address, addresses, saveAddress, deleteAddress)}</CardContent></Card>
        </div>
      </Container>
    </div>
  );
}

function renderContent(kind: ProfileSubpageKind, transactions: ReturnType<typeof getTransactions>, paymentName: string, user: MockUser, saveUser: (user: MockUser) => void, address: ShippingAddress, addresses: ShippingAddress[], saveAddress: (address: ShippingAddress) => void, deleteAddress: (id: string) => void) {
  if (kind === "orders") return <div className="grid gap-4">{transactions.filter((tx) => tx.status !== "Sewa Selesai").map((tx) => <div key={tx.id} className="rounded-[12px] bg-[#f8f8fa] p-5"><p className="text-[18px] font-medium text-[#222]">{tx.productName}</p><p className="mt-2 text-[14px] text-[#76777d]">{tx.status} · {formatRupiah(tx.total)}</p><Button asChild className="mt-4 h-11"><Link to={`/pengembalian?tx=${tx.id}`}>Pengembalian</Link></Button></div>)}</div>;
  if (kind === "address") return <AddressManager activeId={address.id} addresses={addresses} onDelete={deleteAddress} onSave={saveAddress} />;
  if (kind === "payment") return <div><p className="text-[18px] font-medium text-[#222]">{paymentName}</p><Button asChild className="mt-4 h-11"><Link to="/pembayaran">Ubah Pembayaran</Link></Button></div>;
  if (kind === "history") return <Button asChild className="h-12"><Link to="/history">Buka Riwayat Lengkap</Link></Button>;
  if (kind === "reviews") return <p className="text-[16px] text-[#76777d]">Fitur ulasan sementara dinonaktifkan.</p>;
  return <ProfileForm user={user} onSave={saveUser} />;
}

function AddressManager({ activeId, addresses, onDelete, onSave }: { activeId: string; addresses: ShippingAddress[]; onDelete: (id: string) => void; onSave: (address: ShippingAddress) => void }) {
  const blank = { id: "", name: "", phone: "", address: "", city: "Kota Palembang", note: "" };
  const [form, setForm] = useState<ShippingAddress>(addresses.find((item) => item.id === activeId) ?? addresses[0] ?? blank);
  const update = (key: keyof ShippingAddress, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const createNew = () => setForm({ ...blank, id: `address-${Date.now()}` });
  return <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div className="grid content-start gap-3">{addresses.map((item) => <button key={item.id} type="button" onClick={() => setForm(item)} className={`rounded-[16px] border p-4 text-left transition hover:-translate-y-0.5 ${form.id === item.id ? "border-[#354D70] bg-[#354D70]/5" : "border-[#DADADA] bg-[#f8f8fa]"}`}><span className="flex items-center justify-between gap-3"><span className="text-[15px] font-semibold text-[#222]">{item.name}</span>{item.id === activeId && <span className="rounded-full bg-[#354D70] px-3 py-1 text-[11px] text-white">Dipakai</span>}</span><span className="mt-2 block text-[13px] leading-[1.5] text-[#76777d]">{item.address}, {item.city}</span></button>)}<Button variant="secondary" className="h-12 bg-[#f8f8fa]" onClick={createNew}>Tambah Alamat</Button></div><div className="grid gap-4 rounded-[18px] bg-[#f8f8fa] p-5"><ProfileField label="Nama Penerima" value={form.name} onChange={(value) => update("name", value)} /><ProfileField label="Nomor Telepon" value={form.phone} onChange={(value) => update("phone", value)} /><ProfileField label="Alamat Lengkap" value={form.address} onChange={(value) => update("address", value)} /><ProfileField label="Kota" value={form.city} onChange={(value) => update("city", value)} /><ProfileField label="Catatan Kurir" value={form.note} onChange={(value) => update("note", value)} /><div className="flex flex-wrap gap-3"><Button className="h-12 flex-1" onClick={() => onSave(form)}>Simpan Alamat</Button><Button variant="secondary" className="h-12 flex-1 bg-white text-[#DB3022]" onClick={() => onDelete(form.id)} disabled={addresses.length <= 1}>Hapus</Button></div></div></div>;
}

function ProfileForm({ user, onSave }: { user: MockUser; onSave: (user: MockUser) => void }) {
  const [form, setForm] = useState(user);
  const update = (key: keyof MockUser, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const uploadPhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", String(reader.result));
    reader.readAsDataURL(file);
  };
  return <div className="grid gap-4"><div className="flex flex-wrap items-center gap-4 rounded-[18px] bg-[#f8f8fa] p-5"><div className="grid size-20 place-items-center overflow-hidden rounded-full bg-white text-[#354D70]">{form.photo ? <img src={form.photo} alt={form.name} className="h-full w-full object-cover" /> : form.name.slice(0, 1)}</div><label className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#354D70] px-6 text-[14px] font-medium text-white"><input type="file" accept="image/*" className="sr-only" onChange={(event) => uploadPhoto(event.target.files?.[0])} />Tambah Foto Profil</label></div><ProfileField label="Nama" value={form.name} onChange={(value) => update("name", value)} /><ProfileField label="Email" value={form.email} onChange={(value) => update("email", value)} /><ProfileField label="Nomor Telepon" value={form.phone} onChange={(value) => update("phone", value)} /><Button className="mt-2 h-12" onClick={() => onSave(form)}>Simpan Profil</Button></div>;
}

function ProfileField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <div className="grid gap-2"><Label className="text-[12px] text-[#9b9b9b]">{label}</Label><Input value={value} onChange={(event) => onChange(event.target.value)} className="h-[54px] rounded-[12px] border-[#DADADA] bg-[#f8f8fa] text-[14px]" /></div>;
}
