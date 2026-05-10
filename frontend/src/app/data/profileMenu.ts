// Purpose: Frontend profile menu config.
// Callers: profile and profile subpages.
// Deps: none.
// API: profileMenu list.
// Side effects: none.
export type ProfileMenuItem = {
  id: string;
  title: string;
  text: string;
  to: string;
  icon: "address" | "history" | "wishlist";
};

export const profileMenu: ProfileMenuItem[] = [
  { id: "address", title: "Alamat pengiriman", text: "3 Alamat", to: "/profil/alamat", icon: "address" },
  { id: "history", title: "Riwayat Transaksi", text: "Riwayat Transaksi Saya", to: "/profil/riwayat-transaksi", icon: "history" },
  { id: "wishlist", title: "Produk Favorit", text: "Produk Favorit Saya", to: "/wishlist", icon: "wishlist" },
];
