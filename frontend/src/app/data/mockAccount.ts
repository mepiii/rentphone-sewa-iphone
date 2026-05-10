// Purpose: Frontend-only account, session, and shipping address persistence.
// Callers: auth pages, profile pages, checkout.
// Deps: none.
// API: account/address getters, savers, logout, auth helpers.
// Side effects: reads/writes localStorage.
export type MockUser = {
  name: string;
  email: string;
  phone: string;
  role?: "user" | "admin";
  token?: string;
  photo?: string;
  provider?: "email" | "google" | "facebook";
};

export type ShippingAddress = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  note: string;
};

const userKey = "rentphone:user";
const adminKey = "rentphone:admin";
const addressKey = "rentphone:shipping-address";
const addressesKey = "rentphone:shipping-addresses";

const defaultUser: MockUser = {
  name: "User RentPhone",
  email: "user@mail.com",
  phone: "0857 6628 2094",
  provider: "email",
};

export const defaultAddress: ShippingAddress = {
  id: "home",
  name: "User RentPhone",
  phone: "0857 6628 2094",
  address: "Jl. Letkol Iskandar Kec. Ilir Tim. I",
  city: "Kota Palembang",
  note: "Hubungi sebelum kurir datang.",
};

const defaultAddresses: ShippingAddress[] = [
  defaultAddress,
  { id: "office", name: "User RentPhone", phone: "0857 6628 2094", address: "Jl. Jend. Sudirman No. 18", city: "Kota Palembang", note: "Antar ke resepsionis." },
  { id: "studio", name: "User RentPhone", phone: "0857 6628 2094", address: "Jl. Demang Lebar Daun No. 8", city: "Kota Palembang", note: "Pintu samping studio." },
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

export const getCurrentUser = () => readJson<MockUser | null>(userKey, null);
export const getCurrentAdmin = () => readJson<MockUser | null>(adminKey, null);
export const isAuthenticated = () => Boolean(getCurrentUser()?.token);
export const isAdminAuthenticated = () => Boolean(getCurrentAdmin()?.token);
export const saveCurrentUser = (user: MockUser) => writeJson(userKey, { ...defaultUser, ...user, role: "user" });
export const saveCurrentAdmin = (user: MockUser) => writeJson(adminKey, { ...user, role: "admin" });
export const logout = () => isBrowser() && window.localStorage.removeItem(userKey);
export const logoutAdmin = () => isBrowser() && window.localStorage.removeItem(adminKey);
export const getDisplayUser = () => getCurrentUser() ?? defaultUser;

export const getShippingAddress = () => readJson(addressKey, defaultAddress);
export const getShippingAddresses = () => readJson(addressesKey, defaultAddresses);
export const saveShippingAddresses = (addresses: ShippingAddress[]) => writeJson(addressesKey, addresses.length ? addresses : defaultAddresses);
export const saveShippingAddress = (address: ShippingAddress) => {
  const next = { ...address, id: address.id || `address-${Date.now()}` };
  writeJson(addressKey, next);
  writeJson(addressesKey, [next, ...getShippingAddresses().filter((item) => item.id !== next.id)]);
};
export const deleteShippingAddress = (id: string) => {
  const next = getShippingAddresses().filter((item) => item.id !== id);
  const fallback = next[0] ?? defaultAddress;
  writeJson(addressesKey, next.length ? next : [fallback]);
  if (getShippingAddress().id === id) writeJson(addressKey, fallback);
  return next.length ? next : [fallback];
};
export const formatShippingAddress = (address: ShippingAddress) => `${address.address}, ${address.city}`;
