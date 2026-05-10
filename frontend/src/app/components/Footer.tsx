// Purpose: Split user/admin RentPhone footer navigation.
// Callers: App shell.
// Deps: router, shared layout, Apple branding asset.
// API: Footer component.
// Side effects: none.
import { Link, useLocation } from "react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./Container";
import appleLogo from "../../imports/Home/apple.png";

export function Footer() {
  const admin = useLocation().pathname.startsWith("/admin");
  const links = admin ? [
    { title: "Admin", links: [{ to: "/admin", label: "Dashboard" }, { to: "/admin/products", label: "Produk" }, { to: "/admin/categories", label: "Kategori" }] },
    { title: "Operasional", links: [{ to: "/admin/orders", label: "Pesanan" }, { to: "/admin/customers", label: "Customer" }, { to: "/admin/account", label: "Akun" }] },
    { title: "Status", links: [{ to: "/admin/orders", label: "Diproses" }, { to: "/admin/orders", label: "Selesai" }, { to: "/admin/products/new", label: "Tambah Produk" }] },
  ] : [
    { title: "Produk", links: [{ to: "/katalog", label: "Katalog" }, { to: "/katalog", label: "iPhone 15 Series" }, { to: "/katalog", label: "iPhone 14 Series" }] },
    { title: "Layanan", links: [{ to: "/checkout", label: "Checkout" }, { to: "/wishlist", label: "Wishlist" }, { to: "/return", label: "Pengembalian" }] },
    { title: "Akun", links: [{ to: "/login", label: "Login" }, { to: "/register", label: "Register" }, { to: "/profile", label: "Profil" }] },
  ];

  return (
    <footer className="mt-16 border-t border-[var(--rp-border)] bg-[var(--rp-offwhite)]">
      <Container className="grid gap-8 py-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-[#222]"><img src={appleLogo} alt="" className="size-5 object-contain invert" /></span>
            <span className="block font-display text-[18px] font-semibold tracking-[-0.03em] text-[var(--rp-text)]">
              {admin ? "RentPhone Admin" : "RentPhone"}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-[14px] leading-[1.6] text-[var(--rp-muted)]">
            {admin ? "Panel admin untuk mengelola produk, kategori, pesanan, customer, dan akun toko." : "Rental iPhone original untuk konten, event, kerja, dan perjalanan. Kondisi dicek, deposit jelas, layanan responsif."}
          </p>
          <div className="mt-5 space-y-2 text-[13px] text-[var(--rp-text)]/74">
            <div className="flex items-center gap-3"><Phone size={15} className="text-[var(--rp-deep)]" /> 0812 3456 7890</div>
            <div className="flex items-center gap-3"><Mail size={15} className="text-[var(--rp-deep)]" /> halo@rentphone.id</div>
            <div className="flex items-center gap-3"><MapPin size={15} className="text-[var(--rp-deep)]" /> Palembang & area layanan sekitar</div>
            <div className="flex items-center gap-3"><Instagram size={15} className="text-[var(--rp-deep)]" /> @rentphone.id</div>
          </div>
        </div>

        {links.map((col) => <FooterCol key={col.title} title={col.title} links={col.links} />)}
      </Container>
      <div className="border-t border-[var(--rp-border)]">
        <Container className="flex flex-wrap justify-between gap-3 py-4 text-[12px] text-[var(--rp-muted)]">
          <span>© {new Date().getFullYear()} RentPhone. All rights reserved.</span>
          <span>{admin ? "Dashboard admin terpisah dari navigasi user." : "Unit original. Deposit transparan. Proses mudah."}</span>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="mb-4 font-display text-[14px] font-semibold tracking-[-0.02em] text-[var(--rp-text)]">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={`${title}-${l.label}`}>
            <Link to={l.to} className="text-[13px] text-[var(--rp-text)]/62 transition-colors hover:text-[var(--rp-deep)]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
