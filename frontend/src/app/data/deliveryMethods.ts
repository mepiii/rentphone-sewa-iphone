// Purpose: Frontend delivery method catalog.
// Callers: checkout page.
// Deps: none.
// API: deliveryMethods list and DeliveryMethod type.
// Side effects: none.
import gojekLogo from "../../imports/Kirim/gojek.png";

export type DeliveryMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  requiresAddress: boolean;
  image?: string;
};

export const deliveryMethods: DeliveryMethod[] = [
  { id: "pickup", name: "Ambil di Studio", description: "Ambil langsung di studio RentPhone.", price: 0, requiresAddress: false },
  { id: "gojek", name: "Gojek", description: "Pengiriman via Gojek.", price: 25000, requiresAddress: true, image: gojekLogo },
];

export const getDeliveryMethod = (id?: string) => deliveryMethods.find((method) => method.id === id) ?? deliveryMethods[0];
