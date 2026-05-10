// Purpose: Scroll-driven 3D container animation for hero sections.
// Callers: Home page hero.
// Deps: React, framer-motion.
// API: ContainerScroll component.
// Side effects: listens to resize for responsive scale.
import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

export function ContainerScroll({ titleComponent, children }: { titleComponent: React.ReactNode; children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.78, 1] : [1.18, 1.08]);
  const rotate = useTransform(scrollYProgress, [0, 0.72, 1], [34, 8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.72, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.72, 1], [150, -12, -100]);

  return (
    <div ref={containerRef} className="relative flex h-[60rem] items-center justify-center p-2 md:h-[78rem] md:p-20">
      <div className="relative w-full py-10 md:py-36" style={{ perspective: "1000px" }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale} translate={translate}>{children}</Card>
      </div>
    </div>
  );
}

function Header({ translate, children }: { translate: MotionValue<number>; children: React.ReactNode }) {
  return <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">{children}</motion.div>;
}

function Card({ rotate, scale, translate, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; translate: MotionValue<number>; children: React.ReactNode }) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="relative mx-auto mt-2 h-[44rem] w-[21.5rem] rounded-[4rem] border-[4px] border-black bg-black p-1 shadow-2xl ring-1 ring-white/20 md:h-[60rem] md:w-[29rem]"
    >
      <div className="absolute left-1/2 top-4 z-30 h-7 w-28 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.16)] md:w-32" />
      <div className="absolute inset-x-20 bottom-2 z-30 h-1 rounded-full bg-black/45" />
      <div className="relative h-full w-full overflow-hidden rounded-[3.65rem] bg-[#f8f8fa] shadow-inner">
        {children}
      </div>
    </motion.div>
  );
}
