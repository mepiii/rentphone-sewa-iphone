import { motion } from "motion/react";
import { Sparkles, Camera, Cpu, Battery } from "lucide-react";
import { Button } from "./Button";

const HERO = "/devices/iphone-15-pro-max-real.png";

export function FeaturedProduct() {
  return (
    <div className="relative overflow-hidden rounded-[32px] rp-grad-bg text-white">
      <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_85%_30%,white,transparent_55%)]" />
      <div className="grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16 relative">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur">
            <Sparkles size={12} /> Sedang Trending
          </span>
          <h2 className="mt-5 font-heading text-[34px] sm:text-[44px] leading-[1.05] tracking-tight" style={{ fontWeight: 600 }}>
            iPhone 15 Pro Max
            <br />
            <span className="text-white/70">Performa flagship, kapanpun.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] text-white/75 leading-relaxed">
            Titanium ringan, chip A17 Pro, dan kamera 48MP siap menemani momen profesional, content creation, hingga liburan.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            <Spec icon={Cpu} label="A17 Pro" />
            <Spec icon={Camera} label="48MP Pro" />
            <Spec icon={Battery} label="29 jam" />
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="secondary" size="lg" className="bg-white text-[var(--rp-deep)] border-none">
              Sewa Sekarang
            </Button>
            <Button variant="outline" size="lg">Detail produk</Button>
          </div>

          <div className="mt-8 flex items-baseline gap-2 text-white/85">
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/60">Mulai</span>
            <span className="font-heading text-[24px]" style={{ fontWeight: 600 }}>Rp300.000</span>
            <span className="text-[13px] text-white/60">/hari</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-auto lg:min-h-[420px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={HERO} className="h-full w-full object-contain rp-hover-media" alt="iPhone 15 Pro Max" loading="lazy" decoding="async" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-3 py-3 flex flex-col items-start gap-1.5">
      <Icon size={16} className="text-white/85" />
      <span className="text-[12px] text-white/85">{label}</span>
    </div>
  );
}
