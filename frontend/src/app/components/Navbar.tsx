// Purpose: Floating RentPhone top navigation bar.
// Callers: App shell.
// Deps: router, lucide icons, Apple branding asset.
// API: Navbar component.
// Side effects: toggles mobile menu and reacts to scroll.
import { Link, NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import appleLogo from "../../imports/Home/apple.png";
import cartIcon from "../../imports/Home/cart.svg";
import favIcon from "../../imports/Home/fav.svg";

const userLinks = [
  { to: "/", label: "Home" },
  { to: "/katalog", label: "Katalog" },
  { to: "/tentang-kami", label: "Tentang" },
  { to: "/profile", label: "Akun" },
];

const adminLinks = [
  { to: "/admin", label: "Home" },
  { to: "/admin/products", label: "Produk" },
  { to: "/admin/categories", label: "Kategori" },
  { to: "/admin/orders", label: "Pesanan" },
  { to: "/admin/customers", label: "Customer" },
  { to: "/admin/account", label: "Akun" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const admin = pathname.startsWith("/admin");
  const links = admin ? adminLinks : userLinks;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 12);
      
      if (currentScrollY > lastScrollY && currentScrollY > 28) {
        setHidden(true);
        setOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-4 z-50 px-3 text-[#1d1d1f] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 ${hidden ? "-translate-y-[150%]" : "translate-y-0"}`}>
      <nav className={`mx-auto grid min-h-11 w-full grid-cols-[1fr_auto_1fr] items-center rounded-full border px-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5 ${admin ? "max-w-6xl" : "max-w-4xl"} ${scrolled ? "border-white/20 bg-white shadow-[0_18px_55px_rgba(49,56,92,0.18)]" : "border-white/20 bg-white shadow-[0_10px_36px_rgba(49,56,92,0.10)]"}`}>
        <Link to="/" aria-label="RentPhone" className="group flex items-center gap-2 rounded-full px-2 py-1.5">
          <span className="grid size-7 place-items-center rounded-full bg-[#222]"><img src={appleLogo} alt="" className="size-4 object-contain invert" /></span>
          <span className="text-[15px] font-semibold tracking-[-0.04em] text-[#222]">{admin ? "RentPhone Admin" : "RentPhone"}</span>
        </Link>

        <div className={`hidden items-center justify-center lg:flex ${admin ? "gap-2" : "gap-1"}`}>
          {links.map((l) => (
            <NavLink
              key={`${l.to}-${l.label}`}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-full text-[12.5px] font-medium leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${admin ? "px-4 py-2" : "px-3 py-1.5"} ${isActive ? (admin ? "bg-[#354d70] text-white shadow-[0_10px_24px_rgba(53,77,112,0.18)]" : "bg-[#222] text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]") : "text-[#1d1d1f]/72 hover:-translate-y-0.5 hover:bg-white/80 hover:text-[#222]"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {!admin && <div className="hidden items-center justify-end gap-2 lg:flex">
          <Link to="/checkout" aria-label="Checkout" className="grid size-9 place-items-center rounded-full bg-white/75 text-[#354D70] shadow-[inset_0_0_0_1px_rgba(53,77,112,0.08)] transition duration-500 hover:-translate-y-0.5 hover:bg-white">
            <img src={cartIcon} alt="" className="size-4" />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="grid size-9 place-items-center rounded-full bg-white/75 text-[#354D70] shadow-[inset_0_0_0_1px_rgba(53,77,112,0.08)] transition duration-500 hover:-translate-y-0.5 hover:bg-white">
            <img src={favIcon} alt="" className="size-4" />
          </Link>
          <Link to="/profile" aria-label="Akun" className="grid size-9 place-items-center rounded-full bg-[#354D70]/10 text-[#354D70] transition duration-500 hover:-translate-y-0.5 hover:bg-[#354D70]/16">
            <UserRound size={16} strokeWidth={2} />
          </Link>
        </div>}

        <div className="flex items-center gap-2 lg:hidden">
          {!admin && <><Link to="/checkout" aria-label="Checkout" className="grid size-9 place-items-center rounded-full bg-white/70 text-[#354D70]">
            <img src={cartIcon} alt="" className="size-4" />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="grid size-9 place-items-center rounded-full bg-white/70 text-[#354D70]">
            <img src={favIcon} alt="" className="size-4" />
          </Link></>}
          <button type="button" className="grid size-9 place-items-center rounded-full bg-[#222] text-white" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      <div className={`mx-auto mt-2 grid overflow-hidden rounded-[28px] border border-white/20 bg-white px-4 shadow-[0_18px_55px_rgba(49,56,92,0.16)] transition-all duration-500 lg:hidden ${admin ? "max-w-6xl" : "max-w-4xl"} ${open ? "max-h-[520px] py-3 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
        {links.map((l) => (
          <NavLink
            key={`${l.to}-${l.label}-mobile`}
            to={l.to}
            end={l.to === "/"}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-[15px] font-medium transition ${isActive ? "bg-[#222] text-white" : "text-[#1d1d1f]/78 hover:bg-[#354D70]/8"}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
