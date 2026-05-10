// Purpose: Figma-style account registration page backed by API auth.
// Callers: App route `/register`.
// Deps: router, shared layout, shadcn input, app button, API client, account store.
// API: default React page component.
// Side effects: writes API user token to localStorage.
import { Check } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { apiRequest } from "../data/api";
import { saveCurrentUser } from "../data/mockAccount";

const fieldClass = "h-[56px] rounded-[8px] border-0 bg-white px-5 text-[15px] shadow-[0_1px_9px_rgba(0,0,0,0.05)] focus-visible:ring-[var(--rp-deep)]/20";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [name, setName] = useState("User RentPhone");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("0857 6628 2094");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const next = params.get("next") ?? "/katalog";
  const register = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest<{ token: string; user: { name: string; email: string; phone?: string; role: "user" | "admin" } }>("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, password, password_confirmation: password }),
      });
      saveCurrentUser({ name: data.user.name, email: data.user.email, phone: data.user.phone ?? "", role: data.user.role, token: data.token, provider: "email" });
      navigate(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f9] py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[560px]">
          <h1 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#222] sm:text-[68px]">Daftar Akun Sewa iPhone</h1>
          <div className="mt-10 grid gap-5">
            <Field label="Name" placeholder="Nama lengkap" value={name} onChange={setName} valid />
            <Field label="Email" placeholder="user@mail.com" value={email} onChange={setEmail} />
            <Field label="Nomor Telepon" placeholder="08xx xxxx xxxx" value={phone} onChange={setPhone} />
            <Field label="Password" placeholder="Password" type="password" value={password} onChange={setPassword} />
          </div>
          {error && <p className="mt-5 rounded-[12px] bg-[#DB3022]/10 px-4 py-3 text-[13px] text-[#DB3022]">{error}</p>}
          <Link to={`/login?next=${encodeURIComponent(next)}`} className="mt-5 flex justify-end text-[16px] text-[#222]">Sudah memiliki akun?</Link>
          <Button size="lg" className="mt-8 h-[63px] w-full" onClick={register} disabled={loading}>{loading ? "Memproses..." : "Daftar"}</Button>
        </div>
      </Container>
    </div>
  );
}

function Field({ label, placeholder, valid = false, value, onChange, type = "text" }: { label: string; placeholder: string; valid?: boolean; value?: string; onChange?: (value: string) => void; type?: string }) {
  return (
    <div className="relative">
      <Input aria-label={label} type={type} value={value} onChange={(event) => onChange?.(event.target.value)} className={`${fieldClass} ${valid ? "pr-12" : ""}`} placeholder={placeholder} />
      {valid && <span className="absolute right-5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-[#2aa952]/10 text-[#2aa952]"><Check size={14} /></span>}
    </div>
  );
}
