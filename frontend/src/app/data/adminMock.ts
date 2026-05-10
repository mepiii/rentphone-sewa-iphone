// Purpose: Frontend-only admin mock metrics, orders, customers, and seller profile.
// Callers: admin pages.
// Deps: product catalog mock data.
// API: exported static admin data.
// Side effects: none.
import { products } from "./products";

export const adminStats = [
  { label: "Jumlah Kategori", value: "4" },
  { label: "Jumlah Produk", value: "4" },
  { label: "Jumlah Customer", value: "4" },
  { label: "Jumlah Pesanan", value: "1" },
];

export const adminProducts = [
  { product: products.find((p) => p.id === "iphone-17-pro-max") ?? products[0], stock: 1, price: 300000 },
  { product: products.find((p) => p.id === "iphone-13") ?? products[0], stock: 25, price: 200000 },
  { product: products.find((p) => p.id === "iphone-14-plus") ?? products[1], stock: 12, price: 240000 },
  { product: products.find((p) => p.id === "iphone-15-pro-max") ?? products[2], stock: 1, price: 270000 },
];

export const adminCategories = ["13 Series", "14 Series", "15 Series", "17 Series"];

export const adminOrders = [
  { id: "32", code: "#32Lola", date: "06 Maret 2025", time: "14:00 Wib", renter: "Lola", customerName: "Agus", customerPhone: "081227737744", customerEmail: "agus@gmail.com", address: "Jl. Letkol Iskandar Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30125", status: "Diproses", product: products.find((p) => p.id === "iphone-13") ?? products[0], price: 200000 },
  { id: "30", code: "#30Lola", date: "01 Maret 2025", time: "14:00 Wib", renter: "Lola", customerName: "Agus", customerPhone: "081227737744", customerEmail: "agus@gmail.com", address: "Jl. Letkol Iskandar Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30125", status: "Selesai", product: products.find((p) => p.id === "iphone-13") ?? products[0], price: 200000 },
];

export const customers = [
  { name: "Agus", phone: "081227737744", email: "agus@gmail.com" },
  { name: "Amel", phone: "081227737745", email: "amel@gmail.com" },
  { name: "Sinta", phone: "081227737746", email: "sinta@gmail.com" },
  { name: "Joko", phone: "081227737747", email: "joko@gmail.com" },
];

export const sellerProfile = { name: "Makmur Abadi", email: "makmurabadi@gmail.com", phone: "0812 0000 1111", address: "Blok 30, Jl. Jalur 20 No.19, Meruya Utara, Kec. Kembangan, Kota Jakarta" };
