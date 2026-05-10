// Purpose: Figma payment method screen expanded for website width.
// Callers: App routes `/payment` and `/pembayaran`.
// Deps: payment method data, app button, lucide icons.
// API: default React page component.
// Side effects: saves selected payment method to localStorage.
import { CheckCircle2, Circle, Landmark, Smartphone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { getSavedPaymentMethodId, savePaymentMethodId } from "../data/mockTransactions";
import { paymentMethods, type PaymentMethod } from "../data/paymentMethods";

const iconMap: Record<PaymentMethod["type"], ReactNode> = {
  ewallet: <Smartphone size={22} />,
  va: <Landmark size={22} />,
};

const groups = [
  { title: "Metode Pembayaran", methods: paymentMethods.filter((method) => method.type === "ewallet") },
  { title: "Transfer Virtual Account", methods: paymentMethods.filter((method) => method.type === "va") },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(getSavedPaymentMethodId());
  const submit = () => {
    savePaymentMethodId(selected);
    navigate("/checkout");
  };

  return (
    <div className="min-h-[100dvh] bg-[#fdfdfd] pb-20 pt-24 lg:pt-32">
      <main className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#222] sm:text-[70px]">Pembayaran</h1>
        </div>

        <div className="grid gap-[50px] lg:grid-cols-2 lg:gap-8">
          {groups.map((group) => (
            <section key={group.title} className="rounded-[32px] border border-[#C1C6D6]/30 bg-white p-5 shadow-[0_22px_80px_rgba(49,56,92,0.10)] sm:p-8">
              <h2 className="text-[16px] font-normal leading-[18px] tracking-[0.071em] text-[#888]">{group.title}</h2>
              <div className="mt-[29px] grid gap-4">
                {group.methods.map((method) => {
                  const isSelected = selected === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelected(method.id)}
                      className={`flex min-h-[132px] w-full items-center justify-between rounded-[20px] border bg-[#F8F8FA] p-5 text-left transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(49,56,92,0.12)] ${isSelected ? "border-[#354D70] ring-4 ring-[#354D70]/10" : "border-[#B7B9BE]"}`}
                    >
                      <span className="flex items-center gap-5">
                        <span className="grid h-[58px] w-[118px] place-items-center overflow-hidden rounded-[10px] bg-white/70 px-3 lg:h-[68px] lg:w-[148px]">
                          {method.image ? <img src={method.image} alt="" className="max-h-[46px] max-w-[96px] object-contain lg:max-h-[54px] lg:max-w-[122px]" /> : <span className="grid size-11 place-items-center rounded-full text-white" style={{ background: method.accent }}>{iconMap[method.type]}</span>}
                        </span>
                        <span className="text-[16px] font-medium leading-[18px] text-black lg:text-[18px]">{method.name}</span>
                      </span>
                      {isSelected ? <CheckCircle2 size={26} className="shrink-0 text-[#354D70]" /> : <Circle size={26} className="shrink-0 text-[#222]" strokeWidth={1.8} />}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <Button size="lg" className="mt-[55px] h-[63px] w-full rounded-full" onClick={submit}>Lanjutkan</Button>
      </main>
    </div>
  );
}
