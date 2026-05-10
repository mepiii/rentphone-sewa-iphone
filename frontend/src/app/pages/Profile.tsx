// Purpose: Figma-style renter account screen with routed menu actions.
// Callers: App routes `/profile` and `/account`.
// Deps: router, shared layout, account/session helpers, API client.
// API: default React page component.
// Side effects: ends API session and clears localStorage session on logout.
import { ChevronRight, Heart, History, MapPin, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { apiRequest } from "../data/api";
import { getCurrentUser, getDisplayUser, getShippingAddresses, logout } from "../data/mockAccount";
import { profileMenu, type ProfileMenuItem } from "../data/profileMenu";

const iconMap = { address: MapPin, history: History, wishlist: Heart };

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = getDisplayUser();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const menu = profileMenu.map((item) => item.id === "address" ? { ...item, text: `${getShippingAddresses().length} Alamat` } : item);
  const doLogout = async () => {
    const token = getCurrentUser()?.token;
    try { if (token) await apiRequest("/logout", { method: "POST" }, token); }
    finally { logout(); navigate("/login"); }
  };

  return (
    <div className="min-h-[100dvh] bg-[#fdfdfd] pb-28 pt-24 lg:pt-32">
      <Container>
        <div className="mx-auto max-w-[860px]">
          <h1 className="text-[36px] font-medium tracking-[-0.055em] text-[#222] sm:text-[52px]">Akun Saya</h1>
          <div className="mt-8 flex items-center gap-5">
            <div className="grid size-[83px] place-items-center overflow-hidden rounded-full bg-[#f8f8fa] text-[#354d70] shadow-[0_10px_28px_rgba(49,56,92,0.10)]">{user.photo ? <img src={user.photo} alt={user.name} className="h-full w-full object-cover" /> : <UserRound size={38} />}</div>
            <div>
              <p className="text-[21px] font-medium text-[#222]">{user.name}</p>
              <p className="mt-1 text-[16px] text-[#9b9b9b]">{user.email}</p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[18px] bg-white shadow-[0_4px_28px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
            {menu.map((item) => <ProfileRow key={item.id} item={item} />)}
            <button type="button" onClick={() => setLogoutOpen(true)} className="flex w-full items-center justify-between border-t border-[#9b9b9b]/10 px-6 py-5 text-left text-[18px] font-medium text-[#222]">
              Keluar
              <ChevronRight size={22} className="text-[#9b9b9b]" />
            </button>
          </div>

          {logoutOpen && (
            <div className="mt-6 rounded-[18px] bg-white p-6 shadow-[0_4px_28px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
              <p className="text-[20px] font-semibold text-[#222]">Yakin ingin keluar?</p>
              <div className="mt-5 flex gap-3">
                <Button variant="secondary" className="h-12 flex-1 bg-[#f8f8fa]" onClick={() => setLogoutOpen(false)}>Batal</Button>
                <Button className="h-12 flex-1 bg-[#db3022] hover:bg-[#db3022]/90" onClick={doLogout}>Keluar</Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

function ProfileRow({ item }: { item: ProfileMenuItem }) {
  const Icon = iconMap[item.icon];
  return (
    <Link to={item.to} className="flex items-center justify-between gap-4 border-t border-[#9b9b9b]/10 px-6 py-5 first:border-t-0">
      <div className="flex items-center gap-4">
        <span className="hidden size-10 place-items-center rounded-full bg-[#354d70]/8 text-[#354d70] sm:grid"><Icon size={18} /></span>
        <div><p className="text-[18px] font-medium text-[#222]">{item.title}</p><p className="mt-1 text-[13px] text-[#9b9b9b]">{item.text}</p></div>
      </div>
      <ChevronRight size={22} className="text-[#9b9b9b]" />
    </Link>
  );
}

