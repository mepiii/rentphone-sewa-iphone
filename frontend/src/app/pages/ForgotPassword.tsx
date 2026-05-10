// Purpose: Figma-style password recovery and reset screens.
// Callers: App auth routes.
// Deps: router, shared layout, app button, shadcn input.
// API: default React page component.
// Side effects: none.
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";

const fieldClass = "h-[56px] rounded-[8px] border-0 bg-white px-5 text-[15px] shadow-[0_1px_9px_rgba(0,0,0,0.05)] focus-visible:ring-[var(--rp-deep)]/20";

export default function ForgotPasswordPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reset = pathname.includes("reset");

  return (
    <div className="bg-[#f9f9f9] py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[520px]">
          <button type="button" onClick={() => navigate(-1)} className="mb-8 inline-flex items-center gap-2 text-[15px] text-[#222]"><ArrowLeft size={18} />Kembali</button>
          <h1 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#222] sm:text-[68px]">{reset ? "Reset Kata Sandi" : "Lupa Kata Sandi"}</h1>
          <p className="mt-5 text-[16px] leading-[1.7] text-[#777]">{reset ? "Buat kata sandi baru untuk akun rental Anda." : "Masukkan email akun, lalu ikuti instruksi pemulihan."}</p>
          <div className="mt-10 grid gap-5">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9b9b9b]" size={17} />
              <Input aria-label="Email" type="email" className={`${fieldClass} pl-12`} placeholder="user@mail.com" />
            </div>
            {reset && <Input aria-label="Password baru" type="password" className={fieldClass} placeholder="Password baru" />}
            {reset && <Input aria-label="Konfirmasi password" type="password" className={fieldClass} placeholder="Konfirmasi password" />}
          </div>
          <Button size="lg" className="mt-8 h-[63px] w-full" onClick={() => navigate(reset ? "/login" : "/reset-password")}>{reset ? "Simpan Password" : "Kirim Instruksi"}</Button>
          <p className="mt-8 text-center text-[16px] text-[#222]">Ingat password? <Link to="/login" className="font-semibold text-[var(--rp-deep)]">Login</Link></p>
        </div>
      </Container>
    </div>
  );
}
