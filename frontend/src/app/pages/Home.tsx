// Purpose: Figma-derived landing page for iPhone rental conversion.
// Callers: App route `/`.
// Deps: shared UI, product data, scroll animation.
// API: default React page component.
// Side effects: none.
import { CheckCircle2, Sparkles } from "lucide-react";
import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { PricingCard } from "../components/PricingCard";
import { MotionSection } from "../components/MotionSection";
import { Card, CardContent } from "../components/ui/card";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { FallingPattern } from "../components/ui/falling-pattern";
import phoneScreen from "../../imports/Phone/home.png";
import { products, formatRupiah } from "../data/products";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--rp-bg)] pt-20 sm:pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,var(--rp-bg)_74%)]" />
        <FallingPattern className="absolute inset-0 opacity-45" color="rgba(57,102,135,0.34)" backgroundColor="transparent" duration={130} blurIntensity="0.85em" density={1.15} />
        <Container className="relative z-10">
          <ContainerScroll
            titleComponent={
              <div>
                <h1 className="whitespace-nowrap pt-4 font-display text-[38px] font-semibold leading-[0.93] tracking-[-0.06em] text-[var(--rp-text)] sm:text-[64px] lg:text-[90px]">
                  Sewa iPhone tanpa ribet.
                </h1>
              </div>
            }
          >
            <img src={phoneScreen} alt="RentPhone app screen" loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover object-top" />
          </ContainerScroll>
        </Container>
      </section>

      <MotionSection className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="grid gap-5 lg:col-span-12 md:grid-cols-3">
              {[
                ["Konten", "Kamera tajam untuk reels, katalog, dan dokumentasi."],
                ["Event", "Unit siap untuk acara singkat tanpa beli baru."],
                ["Travel", "iPhone premium buat kerja atau liburan."],
              ].map(([title, text], index) => (
                <Card key={title} className="group rp-animate-pop rp-hover-lift rp-hover-soft rounded-[18px] border-[#c6c6cd]/30 bg-white shadow-[0_4px_22px_rgba(0,0,0,0.05)]" style={{ animationDelay: `${index * 90}ms` }}>
                  <CardContent className="p-7">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#45464d] transition duration-500 group-hover:text-[#354D70]">{title}</p>
                    </div>
                    <p className={`mt-10 text-[15px] leading-[1.55] text-[#76777d] transition duration-700 group-hover:text-[#354D70] ${index % 2 === 0 ? "group-hover:translate-x-2" : "group-hover:-translate-x-2"}`}>{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="rp-section-pad bg-[var(--rp-bg)]">
        <Container>
          <SectionHeading title="Bandingkan paket sampai maksimal seminggu." description="Durasi rental dibatasi 1–7 hari. Kami finalisasi stok, deposit, pickup, dan delivery lewat WhatsApp." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rp-animate-pop" style={{ animationDelay: "0ms" }}><PricingCard title="Paket Singkat" duration="1–2 Hari" perks={["Sempurna untuk event 1 hari", "QC ketat sebelum diserahkan", "Deposit transparan", "Prioritas cek stok"]} /></div>
            <div className="rp-animate-pop" style={{ animationDelay: "90ms" }}><PricingCard title="Paket Sedang" duration="3–4 Hari" perks={["Ideal buat ngonten weekend", "Lebih fleksibel dari harian", "Prioritas konfirmasi unit", "Bisa request jam pickup"]} /></div>
            <div className="rp-animate-pop" style={{ animationDelay: "180ms" }}><PricingCard title="Paket Liburan" duration="5–7 Hari" perks={["Harga paling ekonomis", "Batas maksimal sewa aman", "Support WhatsApp penuh", "Syarat & aturan jelas"]} /></div>
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="bg-[var(--rp-bg)] pt-56 pb-32 lg:pt-80 lg:pb-40">
        <Container>
          <div className="group rp-animate-in rp-hover-lift relative overflow-hidden rounded-[30px] px-6 py-12 text-center text-white rp-grad-bg shadow-[0_28px_90px_rgba(53,77,112,0.24)] hover:shadow-[0_36px_110px_rgba(53,77,112,0.34)] sm:px-8 lg:py-16">
            <div className="absolute -left-20 top-10 size-44 rounded-full bg-white/10 blur-3xl transition duration-700 group-hover:translate-x-14" />
            <div className="absolute -right-20 bottom-8 size-52 rounded-full bg-white/10 blur-3xl transition duration-700 group-hover:-translate-x-14" />
            <div className="relative mx-auto grid size-14 place-items-center rounded-full bg-white/14 ring-1 ring-white/20 transition duration-500 group-hover:scale-110"><CheckCircle2 className="text-white" size={28} /></div>
            <h2 className="relative mx-auto mt-5 max-w-2xl text-[38px] font-semibold leading-[1] tracking-[-0.055em] text-white sm:text-[56px]">Cek stok iPhone hari ini.</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[16px] leading-[1.6] text-white/75">Pilih model, durasi 1–7 hari, lalu lanjut checkout untuk konfirmasi unit dan jadwal.</p>
            <Link to="/katalog" className="relative mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-[#354D70] shadow-[0_12px_36px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-1 hover:bg-[#f8f8fa]">Cek katalog <Sparkles size={16} /></Link>
          </div>
        </Container>
      </MotionSection>
    </>
  );
}
