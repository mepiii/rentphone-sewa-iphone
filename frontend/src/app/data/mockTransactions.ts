// Purpose: Frontend mock transaction, wishlist, review data and helpers.
// Callers: checkout, history, return, profile subpages, product detail.
// Deps: payment and delivery data.
// API: transaction, wishlist, review types, seed data, storage helpers.
// Side effects: localStorage reads and writes in browser.
import { getDeliveryMethod } from "./deliveryMethods";
import { getPaymentMethod } from "./paymentMethods";
import { products } from "./products";

export type RentalDraft = {
  productId: string;
  color: string;
};

export type RentalCartItem = RentalDraft & {
  quantity: number;
};

export type MockTransaction = {
  id: string;
  status: "Menunggu Konfirmasi" | "Diproses" | "Sedang Disewa" | "Sewa Selesai";
  date: string;
  productId: string;
  productName: string;
  color: string;
  duration: number;
  deliveryId: string;
  deliveryName: string;
  paymentMethodId: string;
  paymentMethodName: string;
  total: number;
  orderId: string;
  receiptNumber: string;
  address?: string;
  returnNote?: string;
};

export type ProductReview = {
  id: string;
  productId: string;
  productName: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

const draftKey = "rentphone:rental-draft";
const cartKey = "rentphone:rental-cart";
const paymentKey = "rentphone:payment-method";
const deliveryKey = "rentphone:delivery-method";
const txKey = "rentphone:transactions";
const wishlistKey = "rentphone:wishlist";
const legacyWishlistKey = "rp_wishlist";
const reviewsKey = "rentphone:reviews";

export const defaultTransactions: MockTransaction[] = [
  {
    id: "tx-demo-active",
    status: "Sedang Disewa",
    date: "03-06-2024",
    productId: products[0].id,
    productName: products[0].name,
    color: products[0].colors[0],
    duration: 2,
    deliveryId: "pickup",
    deliveryName: "Ambil di Studio",
    paymentMethodId: "dana",
    paymentMethodName: "DANA",
    total: 600000,
    orderId: "nusatrade1834474747",
    receiptNumber: "005637478667",
  },
  {
    id: "tx-demo-waiting",
    status: "Menunggu Konfirmasi",
    date: "06-06-2024",
    productId: products[1].id,
    productName: products[1].name,
    color: products[1].colors[0],
    duration: 3,
    deliveryId: "courier",
    deliveryName: "Kurir Palembang",
    paymentMethodId: "bca",
    paymentMethodName: "BCA",
    total: 810000,
    orderId: "nusatrade1834474748",
    receiptNumber: "005637478668",
  },
];

const isBrowser = () => typeof window !== "undefined";
const readJson = <T,>(key: string, fallback: T): T => {
  if (!isBrowser()) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};
const writeJson = (key: string, value: unknown) => isBrowser() && window.localStorage.setItem(key, JSON.stringify(value));

export const getRentalDraft = (): RentalDraft => readJson(draftKey, { productId: products[0].id, color: products[0].colors[0] });
export const saveRentalDraft = (draft: RentalDraft) => writeJson(draftKey, draft);
export const getRentalCart = (): RentalCartItem[] => readJson(cartKey, [{ ...getRentalDraft(), quantity: 1 }]);
export const saveRentalCart = (items: RentalCartItem[]) => writeJson(cartKey, items);
export const addRentalCartItem = (draft: RentalDraft) => {
  const cart = getRentalCart();
  const existing = cart.find((item) => item.productId === draft.productId && item.color === draft.color);
  const next = existing ? cart.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, { ...draft, quantity: 1 }];
  saveRentalDraft(draft);
  saveRentalCart(next);
  return next;
};
export const updateRentalCartItem = (draft: RentalDraft, quantity: number) => {
  const next = getRentalCart().map((item) => item.productId === draft.productId && item.color === draft.color ? { ...item, quantity: Math.max(1, quantity) } : item);
  saveRentalCart(next);
  return next;
};
export const removeRentalCartItem = (draft: RentalDraft) => {
  const next = getRentalCart().filter((item) => item.productId !== draft.productId || item.color !== draft.color);
  saveRentalCart(next);
  return next;
};
export const getSavedPaymentMethodId = () => readJson(paymentKey, "dana");
export const savePaymentMethodId = (id: string) => writeJson(paymentKey, id);
export const getSavedDeliveryMethodId = () => readJson(deliveryKey, "pickup");
export const saveDeliveryMethodId = (id: string) => writeJson(deliveryKey, id);
export const getTransactions = () => readJson(txKey, defaultTransactions);
export const saveTransactions = (items: MockTransaction[]) => writeJson(txKey, items);
export const getWishlist = () => {
  const items = readJson<string[]>(wishlistKey, []);
  if (items.length || !isBrowser()) return items;
  const legacyItems = readJson<string[]>(legacyWishlistKey, []);
  if (legacyItems.length) writeJson(wishlistKey, legacyItems);
  return legacyItems;
};
export const toggleWishlist = (productId: string) => {
  const items = getWishlist();
  const next = items.includes(productId) ? items.filter((id) => id !== productId) : [...items, productId];
  writeJson(wishlistKey, next);
  window.dispatchEvent(new Event("rentphone:wishlist"));
  return next;
};
export const getProductReviews = (productId?: string) => {
  const items = readJson<ProductReview[]>(reviewsKey, []);
  return productId ? items.filter((review) => review.productId === productId) : items;
};
export const addProductReview = (input: Omit<ProductReview, "id" | "date">) => {
  const now = new Date();
  const review: ProductReview = {
    ...input,
    id: `review-${now.getTime()}`,
    date: now.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
  };
  writeJson(reviewsKey, [review, ...getProductReviews()]);
  return review;
};

export function createTransaction(input: { draft: RentalDraft; duration: number; deliveryId: string; paymentMethodId: string; total: number; address?: string }) {
  const product = products.find((item) => item.id === input.draft.productId) ?? products[0];
  const payment = getPaymentMethod(input.paymentMethodId);
  const delivery = getDeliveryMethod(input.deliveryId);
  const now = new Date();
  const tx: MockTransaction = {
    id: `tx-${now.getTime()}`,
    status: "Menunggu Konfirmasi",
    date: now.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", "-"),
    productId: product.id,
    productName: product.name,
    color: input.draft.color,
    duration: input.duration,
    deliveryId: delivery.id,
    deliveryName: delivery.name,
    paymentMethodId: payment.id,
    paymentMethodName: payment.name,
    total: input.total,
    orderId: `rentphone${now.getTime()}`,
    receiptNumber: String(now.getTime()).slice(-10),
    address: input.address,
  };
  saveTransactions([tx, ...getTransactions()]);
  return tx;
}

export function completeReturn(id: string, note: string) {
  const updated = getTransactions().map((tx) => tx.id === id ? { ...tx, status: "Sewa Selesai" as const, returnNote: note } : tx);
  saveTransactions(updated);
  return updated;
}
