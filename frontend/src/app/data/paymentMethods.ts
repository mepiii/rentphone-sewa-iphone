// Purpose: Frontend payment method catalog.
// Callers: checkout and payment method pages.
// Deps: none.
// API: paymentMethods list and PaymentMethod type.
// Side effects: none.
import bcaLogo from "../../imports/Pembayaran/BCA.png";
import briLogo from "../../imports/Pembayaran/BRI.png";
import danaLogo from "../../imports/Pembayaran/DANA.png";
import gopayLogo from "../../imports/Pembayaran/GOPAY.png";
import mandiriLogo from "../../imports/Pembayaran/MANDIRI.png";

export type PaymentMethod = {
  id: string;
  name: string;
  type: "ewallet" | "va";
  accent: string;
  image?: string;
  instructions: string[];
};

export const paymentMethods: PaymentMethod[] = [
  { id: "dana", name: "DANA", type: "ewallet", accent: "#108EE9", image: danaLogo, instructions: ["Buka aplikasi DANA.", "Pilih Kirim ke nomor 0857 6628 2094.", "Masukkan nominal sesuai total checkout.", "Simpan bukti pembayaran."] },
  { id: "gopay", name: "GoPay", type: "ewallet", accent: "#00AA13", image: gopayLogo, instructions: ["Buka GoPay atau Gojek.", "Pilih Bayar atau Transfer.", "Kirim ke 0857 6628 2094.", "Simpan bukti pembayaran."] },
  { id: "bca-va", name: "BCA Virtual Account", type: "va", accent: "#1A4C9A", image: bcaLogo, instructions: ["Pilih m-Transfer BCA Virtual Account.", "Masukkan 8808 085766282094.", "Bayar sesuai total checkout.", "Simpan bukti pembayaran."] },
  { id: "bri-va", name: "BRI Virtual Account", type: "va", accent: "#00529C", image: briLogo, instructions: ["Pilih BRIVA.", "Masukkan 8808 085766282094.", "Bayar sesuai total checkout.", "Simpan bukti pembayaran."] },
  { id: "mandiri-va", name: "Mandiri Virtual Account", type: "va", accent: "#F6C500", image: mandiriLogo, instructions: ["Pilih Bayar Virtual Account Mandiri.", "Masukkan 8877 085766282094.", "Bayar sesuai total checkout.", "Simpan bukti pembayaran."] },
];

export const getPaymentMethod = (id?: string) => paymentMethods.find((method) => method.id === id) ?? paymentMethods[0];
