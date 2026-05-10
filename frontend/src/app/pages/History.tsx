// Purpose: Figma-style transaction history page backed by API orders.
// Callers: App routes `/history` and `/profil/riwayat-transaksi`.
// Deps: router, shared layout, API client, account session, product formatting.
// API: default React page component.
// Side effects: reads authenticated order history.
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { formatRupiah } from "../data/products";
import { apiRequest } from "../data/api";
import { getCurrentUser } from "../data/mockAccount";

type ApiList<T> = { data: T[] };
type ReturnReport = { status: string; admin_notes?: string };
type Order = { id: number; order_number: string; status: string; payment_status: string; total_price: number; rental_duration_value: number; payment_method?: { name: string }; items?: { product_name: string }[]; return_report?: ReturnReport; created_at: string };
const statusLabels: Record<string, string> = { pending: "Menunggu Konfirmasi", processing: "Diproses", active: "Sedang Disewa", returned: "Dikembalikan", completed: "Sewa Selesai", cancelled: "Dibatalkan" };
const paymentLabels: Record<string, string> = { unpaid: "Belum Dibayar", pending: "Pembayaran Pending", paid: "Pembayaran Berhasil", failed: "Pembayaran Gagal", refunded: "Pembayaran Direfund" };
const returnLabels: Record<string, string> = { submitted: "Pengembalian Dikirim", reviewed: "Pengembalian Direview", accepted: "Pengembalian Diterima", rejected: "Pengembalian Ditolak" };

export default function HistoryPage() {
  const user = getCurrentUser();
  const [transactions, setTransactions] = useState<Order[]>([]);
  useEffect(() => { if (user?.token) apiRequest<ApiList<Order>>("/orders", {}, user.token).then((res) => setTransactions(res.data)).catch(() => setTransactions([])); }, [user?.token]);
  return (
    <div className="min-h-[100dvh] bg-[#fdfdfd] pb-28 pt-24 lg:pt-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-[36px] font-medium tracking-[-0.055em] text-[#222] sm:text-[56px]">Riwayat Transaksi</h1>
          <div className="mt-10 grid gap-5">
            {transactions.map((tx) => <TransactionCard key={tx.id} tx={tx} />)}
          </div>
        </div>
      </Container>
    </div>
  );
}

function TransactionCard({ tx }: { tx: Order }) {
  const active = !["completed", "cancelled", "returned"].includes(tx.status);
  return (
    <article className="rounded-[12px] bg-white p-5 shadow-[2px_2px_28.6px_rgba(0,0,0,0.14)] ring-1 ring-black/5 sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap gap-2">
            <p className={`inline-flex rounded-full px-3 py-1 text-[13px] font-medium ${active ? "bg-[#ff6b00]/10 text-[#964206]" : "bg-[#119426]/10 text-[#119426]"}`}>{statusLabels[tx.status] ?? tx.status}</p>
            <p className="inline-flex rounded-full bg-[#354d70]/10 px-3 py-1 text-[13px] font-medium text-[#354d70]">{paymentLabels[tx.payment_status] ?? tx.payment_status}</p>
            {tx.return_report && <p className="inline-flex rounded-full bg-[#db3022]/10 px-3 py-1 text-[13px] font-medium text-[#db3022]">{returnLabels[tx.return_report.status] ?? tx.return_report.status}</p>}
          </div>
          <h2 className="mt-4 text-[24px] font-semibold tracking-[-0.04em] text-[#222]">{tx.items?.map((item) => item.product_name).join(", ") || "Pesanan RentPhone"}</h2>
          <p className="mt-2 text-[14px] text-[#7b7979]">{tx.order_number}</p>
        </div>
        <p className="text-right text-[15px] font-medium text-black">{new Date(tx.created_at).toLocaleDateString("id-ID")}</p>
      </div>
      <div className="mt-6 grid gap-4 text-[15px] leading-[1.5] text-[#4c4545] sm:grid-cols-2">
        <Info label="Receipt Number" value={tx.order_number} />
        <Info label="Metode Bayar" value={tx.payment_method?.name ?? "-"} />
        <Info label="Status Pembayaran" value={paymentLabels[tx.payment_status] ?? tx.payment_status} />
        <Info label="Durasi" value={`${tx.rental_duration_value} hari`} />
        <Info label="Total" value={formatRupiah(Number(tx.total_price))} />
        {tx.return_report && <Info label="Status Pengembalian" value={returnLabels[tx.return_report.status] ?? tx.return_report.status} />}
      </div>
      {active && <Button asChild size="lg" className="mt-6 h-[52px] w-full sm:w-auto"><Link to={`/pengembalian?tx=${tx.id}`}>Ajukan Pengembalian</Link></Button>}
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <p>{label}<br /><span className="font-medium text-[#222]">{value}</span></p>;
}
