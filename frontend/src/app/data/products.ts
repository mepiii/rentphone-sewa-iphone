// Purpose: Frontend-only product catalog data and uploaded product photo helpers.
// Callers: catalog, product detail, checkout, admin mock screens.
// Deps: browser localStorage for admin-uploaded photos.
// API: product list, rupiah formatter, product photo read/write helpers.
// Side effects: reads/writes localStorage for product photo overrides.
import { apiRequest } from "./api";

export type Product = {
  id: string;
  name: string;
  series: string;
  pricePerDay: number;
  image: string;
  deviceImage: string;
  badge?: string;
  available: boolean;
  colors: string[];
  highlights: string[];
  description?: string;
  specs?: string[];
  images?: string[];
};

export type ProductPhotoSet = {
  main?: string;
  colors?: Record<string, string>;
};

const photoKey = "rentphone:product-photos";

const readProductPhotos = (): Record<string, ProductPhotoSet> => {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(photoKey) ?? "{}"); } catch { return {}; }
};

const overrideKey = "rentphone:product-overrides";

const readProductOverrides = (): Record<string, Partial<Product>> => {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(overrideKey) ?? "{}"); } catch { return {}; }
};

export const updateProductOverride = (productId: string, updates: Partial<Product>) => {
  if (typeof window === "undefined") return;
  const current = readProductOverrides();
  localStorage.setItem(overrideKey, JSON.stringify({
    ...current,
    [productId]: { ...(current[productId] ?? {}), ...updates }
  }));
};

export const getProductPhotoSet = (productId: string) => readProductPhotos()[productId] ?? {};

export const saveProductPhotoSet = (productId: string, photos: ProductPhotoSet) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(photoKey, JSON.stringify({ ...readProductPhotos(), [productId]: photos }));
};

export const getProductDisplayImage = (product: Product, color?: string) => {
  const photos = getProductPhotoSet(product.id);
  return color ? photos.colors?.[color] ?? photos.main ?? product.deviceImage : photos.main ?? product.deviceImage;
};

type ApiProduct = {
  id: number;
  name: string;
  series?: string;
  price_per_day: number;
  image?: string;
  device_image?: string;
  status: string;
  stock: number;
  colors?: string[];
  highlights?: string[];
  description?: string;
  specifications?: string[];
  category?: { name?: string };
};

type ApiList<T> = { data: T[] };
type ApiOne<T> = { data: T };

export const mapApiProduct = (item: ApiProduct): Product => ({
  id: String(item.id),
  name: item.name,
  series: item.series || item.category?.name || "iPhone",
  pricePerDay: Number(item.price_per_day),
  image: item.image || item.device_image || "/devices/iphone-15-pro-max-real.png",
  deviceImage: item.device_image || item.image || "/devices/iphone-15-pro-max-real.png",
  available: item.status === "available" && item.stock > 0,
  colors: item.colors?.length ? item.colors : ["#222", "#e5e5e5", "#d6c7b8"],
  highlights: item.highlights?.length ? item.highlights : ["Unit bersih", "Siap pakai", "QC sebelum sewa"],
  description: item.description,
  specs: item.specifications ?? [],
});

export const fetchProducts = () => apiRequest<ApiList<ApiProduct>>("/products").then((res) => res.data.map(mapApiProduct));
export const fetchProduct = (id: string) => apiRequest<ApiOne<ApiProduct>>(`/products/${id}`).then((res) => mapApiProduct(res.data));

const vector14 = "/devices/iphone-14-pro-vector.svg";
const vector15 = "/devices/iphone-15-pro-max-vector.svg";
const real15 = "/devices/iphone-15-pro-max-real.png";

const baseProducts: Product[] = [
  { id: "iphone-se", name: "iPhone SE", series: "SE", pricePerDay: 65000, image: vector14, deviceImage: vector14, available: true, colors: ["#EF4444", "#FFFFFF", "#222"], highlights: ["Compact", "Touch ID", "A15"] },
  { id: "iphone-x", name: "iPhone X", series: "X", pricePerDay: 70000, image: vector14, deviceImage: vector14, available: true, colors: ["#222", "#E5E5E5"], highlights: ["A11", "OLED", "Face ID"] },
  { id: "iphone-xs", name: "iPhone XS", series: "XS", pricePerDay: 75000, image: vector14, deviceImage: vector14, available: true, colors: ["#D6C7B8", "#222", "#E5E5E5"], highlights: ["A12", "OLED", "Dual Camera"] },
  { id: "iphone-xs-max", name: "iPhone XS Max", series: "XS", pricePerDay: 85000, image: vector14, deviceImage: vector14, available: true, colors: ["#D6C7B8", "#222", "#E5E5E5"], highlights: ["A12", "OLED", "Layar besar"] },
  { id: "iphone-xr", name: "iPhone XR", series: "XR", pricePerDay: 80000, image: vector14, deviceImage: vector14, available: true, colors: ["#EF4444", "#FACC15", "#222"], highlights: ["A12", "Liquid Retina", "Baterai awet"] },
  { id: "iphone-11", name: "iPhone 11", series: "11 Series", pricePerDay: 90000, image: vector14, deviceImage: vector14, badge: "Hemat", available: true, colors: ["#7BA7C7", "#222", "#E5E5E5"], highlights: ["Liquid Retina", "Dual 12MP", "A13"] },
  { id: "iphone-11-pro", name: "iPhone 11 Pro", series: "11 Series", pricePerDay: 110000, image: vector14, deviceImage: vector14, available: true, colors: ["#3F4A5B", "#E0CFC0", "#222"], highlights: ["A13", "Triple Camera", "OLED"] },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", series: "11 Series", pricePerDay: 125000, image: vector14, deviceImage: vector14, available: true, colors: ["#3F4A5B", "#E0CFC0", "#222"], highlights: ["A13", "Triple Camera", "Max Display"] },
  { id: "iphone-12", name: "iPhone 12", series: "12 Series", pricePerDay: 120000, image: vector15, deviceImage: vector15, available: true, colors: ["#3B6EA8", "#FFFFFF", "#222"], highlights: ["A14", "5G", "OLED"] },
  { id: "iphone-12-mini", name: "iPhone 12 mini", series: "12 Series", pricePerDay: 105000, image: vector15, deviceImage: vector15, available: true, colors: ["#3B6EA8", "#FFFFFF", "#222"], highlights: ["A14", "5G", "Compact"] },
  { id: "iphone-12-pro", name: "iPhone 12 Pro", series: "12 Series", pricePerDay: 140000, image: vector15, deviceImage: vector15, available: true, colors: ["#6E6E73", "#D6C7B8", "#222"], highlights: ["A14", "LiDAR", "Triple Camera"] },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", series: "12 Series", pricePerDay: 155000, image: vector15, deviceImage: vector15, available: true, colors: ["#6E6E73", "#D6C7B8", "#222"], highlights: ["A14", "LiDAR", "Max Display"] },
  { id: "iphone-13", name: "iPhone 13", series: "13 Series", pricePerDay: 150000, image: vector15, deviceImage: vector15, available: true, colors: ["#3F4A5B", "#E0CFC0", "#1f2937"], highlights: ["A15", "Ceramic Shield", "12MP"] },
  { id: "iphone-13-mini", name: "iPhone 13 mini", series: "13 Series", pricePerDay: 135000, image: vector15, deviceImage: vector15, available: true, colors: ["#FFB6C1", "#A2C2E2", "#222"], highlights: ["A15", "Compact", "12MP"] },
  { id: "iphone-13-pro", name: "iPhone 13 Pro", series: "13 Series", pricePerDay: 170000, image: vector15, deviceImage: vector15, available: true, colors: ["#3F4A5B", "#E0CFC0", "#1f2937"], highlights: ["A15", "ProMotion", "Triple Camera"] },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", series: "13 Series", pricePerDay: 185000, image: vector15, deviceImage: vector15, available: true, colors: ["#3F4A5B", "#E0CFC0", "#1f2937"], highlights: ["A15", "ProMotion", "Max Display"] },
  { id: "iphone-14", name: "iPhone 14", series: "14 Series", pricePerDay: 180000, image: vector14, deviceImage: vector14, available: true, colors: ["#6E6E73", "#FAEAB1", "#1f2937"], highlights: ["A15 Bionic", "Cinematic", "Super Retina"] },
  { id: "iphone-14-plus", name: "iPhone 14 Plus", series: "14 Series", pricePerDay: 195000, image: vector14, deviceImage: vector14, available: true, colors: ["#6E6E73", "#FAEAB1", "#1f2937"], highlights: ["A15", "Layar besar", "Cinematic"] },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", series: "14 Series", pricePerDay: 220000, image: vector14, deviceImage: vector14, available: true, colors: ["#6E6E73", "#FAEAB1", "#1f2937"], highlights: ["Dynamic Island", "48MP", "A16"] },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", series: "14 Series", pricePerDay: 240000, image: vector14, deviceImage: vector14, available: true, colors: ["#6E6E73", "#FAEAB1", "#1f2937"], highlights: ["Dynamic Island", "48MP", "Max Display"] },
  { id: "iphone-15", name: "iPhone 15", series: "15 Series", pricePerDay: 220000, image: vector15, deviceImage: vector15, available: true, colors: ["#FFB6C1", "#A2C2E2", "#222"], highlights: ["Dynamic Island", "USB-C", "48MP"] },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", series: "15 Series", pricePerDay: 240000, image: vector15, deviceImage: vector15, available: true, colors: ["#FFB6C1", "#A2C2E2", "#222"], highlights: ["Dynamic Island", "USB-C", "Layar besar"] },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", series: "15 Series", pricePerDay: 270000, image: real15, deviceImage: real15, badge: "Pro", available: true, colors: ["#41465A", "#F98A4B", "#ECECEA"], highlights: ["A17 Pro", "Titanium", "Kamera 48MP"] },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", series: "15 Series", pricePerDay: 300000, image: real15, deviceImage: real15, badge: "Flagship", available: true, colors: ["#41465A", "#F98A4B", "#ECECEA"], highlights: ["A17 Pro", "Titanium", "Kamera 48MP"] },
  { id: "iphone-16", name: "iPhone 16", series: "16 Series", pricePerDay: 280000, image: real15, deviceImage: real15, badge: "Terbaru", available: true, colors: ["#A2C2E2", "#ECECEA", "#222"], highlights: ["A18", "USB-C", "Camera Control"] },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", series: "16 Series", pricePerDay: 300000, image: real15, deviceImage: real15, available: true, colors: ["#A2C2E2", "#ECECEA", "#222"], highlights: ["A18", "USB-C", "Layar besar"] },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", series: "16 Series", pricePerDay: 330000, image: real15, deviceImage: real15, badge: "Pro", available: true, colors: ["#A2C2E2", "#ECECEA", "#222"], highlights: ["A18 Pro", "Titanium", "Camera Control"] },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", series: "16 Series", pricePerDay: 360000, image: real15, deviceImage: real15, badge: "Flagship", available: true, colors: ["#A2C2E2", "#ECECEA", "#222"], highlights: ["A18 Pro", "Titanium", "Max Display"] },
  { id: "iphone-16e", name: "iPhone 16e", series: "16 Series", pricePerDay: 240000, image: real15, deviceImage: real15, available: true, colors: ["#ECECEA", "#222"], highlights: ["A18", "USB-C", "Baterai awet"] },
  { id: "iphone-air", name: "iPhone Air", series: "17 Series", pricePerDay: 260000, image: real15, deviceImage: real15, badge: "Baru", available: true, colors: ["#ECECEA", "#A2C2E2", "#222"], highlights: ["Tipis", "Ringan", "USB-C"] },
  { id: "iphone-17", name: "iPhone 17", series: "17 Series", pricePerDay: 320000, image: real15, deviceImage: real15, badge: "Coming Soon", available: true, colors: ["#A2C2E2", "#ECECEA", "#222"], highlights: ["A19", "ProMotion", "USB-C"] },
  { id: "iphone-17-pro", name: "iPhone 17 Pro", series: "17 Series", pricePerDay: 380000, image: real15, deviceImage: real15, badge: "Pro", available: true, colors: ["#A2C2E2", "#ECECEA", "#222"], highlights: ["A19 Pro", "ProMotion", "48MP"] },
  { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", series: "17 Series", pricePerDay: 420000, image: real15, deviceImage: real15, badge: "Terbaru", available: true, colors: ["#A2C2E2", "#ECECEA", "#222"], highlights: ["A19 Pro", "ProMotion", "Max Display"] },
];

export const products = new Proxy(baseProducts, {
  get(target, prop) {
    if (prop === 'filter' || prop === 'map' || prop === 'find' || prop === 'reduce') {
      const overrides = readProductOverrides();
      const merged = target.map(p => ({ ...p, ...(overrides[p.id] ?? {}) }));
      return merged[prop as keyof typeof merged].bind(merged);
    }
    if (prop === 'length') return target.length;
    if (typeof prop === 'string' && !isNaN(Number(prop))) {
      const p = target[Number(prop)];
      if (!p) return undefined;
      const overrides = readProductOverrides();
      return { ...p, ...(overrides[p.id] ?? {}) };
    }
    return Reflect.get(target, prop);
  }
}) as Product[];

export const formatRupiah = (n: number) =>
  "Rp" + n.toLocaleString("id-ID");
