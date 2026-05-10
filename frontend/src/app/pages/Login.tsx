// Purpose: Figma-style user/admin login page backed by API auth.
// Callers: App routes `/login` and `/admin/login`.
// Deps: router, shared layout, shadcn input, app button, API client, account store.
// API: default React page component.
// Side effects: writes API user token to localStorage.
import { Check, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { apiRequest } from "../data/api";
import { getDisplayUser, saveCurrentAdmin, saveCurrentUser } from "../data/mockAccount";

const fieldClass = "h-[56px] rounded-[8px] border-0 bg-white px-5 text-[15px] shadow-[0_1px_9px_rgba(0,0,0,0.05)] focus-visible:ring-[#354d70]/20";

export default function LoginPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const admin = pathname.startsWith("/admin");
  const [email, setEmail] = useState(admin ? "admin@example.com" : "user@example.com");
  const isAdminEmail = email.trim().toLowerCase() === "admin@example.com";
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const next = params.get("next") ?? (admin ? "/admin" : "/katalog");
  const login = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest<{ token: string; user: { name: string; email: string; phone?: string; role: "user" | "admin" } }>(admin || isAdminEmail ? "/admin/login" : "/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const session = { name: data.user.name, email: data.user.email, phone: data.user.phone ?? "", role: data.user.role, token: data.token, provider: "email" as const };
      data.user.role === "admin" ? saveCurrentAdmin(session) : saveCurrentUser(session);
      navigate(data.user.role === "admin" ? "/admin" : next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#f9f9f9] py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[520px]">
          <h1 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#222] sm:text-[68px]">{admin ? "Login Admin" : "Login Akun Sewa iPhone"}</h1>
          <div className="mt-10 grid gap-5">
            <Field label="Email" placeholder="user@mail.com" value={email} onChange={setEmail} valid />
            <Field label="Password" placeholder="Password" type="password" value={password} onChange={setPassword} />
          </div>
          {error && <p className="mt-5 rounded-[12px] bg-[#DB3022]/10 px-4 py-3 text-[13px] text-[#DB3022]">{error}</p>}
          <Link to={admin ? "/reset-password" : "/forgot-password"} className="mt-5 flex justify-end text-[16px] text-[#222]">Lupa kata sandi Anda?</Link>
          <Button size="lg" className="mt-8 h-[63px] w-full" onClick={login} disabled={loading}>{loading ? "Memproses..." : "Login"}</Button>
          {!admin && <p className="mt-10 text-center text-[16px] text-[#222]">Belum punya akun? <Link to={`/register?next=${encodeURIComponent(next)}`} className="font-semibold text-[#354d70]">Daftar</Link></p>}
        </div>
      </Container>
    </div>
  );
}

function Field({ label, placeholder, valid = false, value, onChange, type = "text" }: { label: string; placeholder: string; valid?: boolean; value?: string; onChange?: (value: string) => void; type?: string }) {
  return <div className="relative"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9b9b9b]" size={17} /><Input aria-label={label} type={type} value={value} onChange={(event) => onChange?.(event.target.value)} className={`${fieldClass} pl-12 ${valid ? "pr-12" : ""}`} placeholder={placeholder} />{valid && <span className="absolute right-5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-[#2aa952]/10 text-[#2aa952]"><Check size={14} /></span>}</div>;
}
