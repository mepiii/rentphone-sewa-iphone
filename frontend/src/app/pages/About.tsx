// Purpose: Figma About screen replica expanded for website width.
// Callers: App route `/tentang-kami`.
// Deps: local Home assets.
// API: default React page component.
// Side effects: none.
import iconImage from "../../imports/Home/Icon.svg";
import heroImage from "../../imports/Home/31856757ea07dd634ac07628bdb280787269b5fc.png";
import likesIcon from "../../imports/Home/likes.svg";
import pipelIcon from "../../imports/Home/pipel.svg";

const stats = [
  { value: "5K+", label: "Klien" },
  { value: "99%", label: "Kepuasan" },
];

const aboutText = [
  "Didukung oleh tim profesional dan sistem operasional yang terstandarisasi, setiap unit yang kami sewakan telah melalui quality check ketat untuk memastikan performa optimal saat digunakan.",
  "Kami memahami kebutuhan pengguna modern—mulai dari content creator, profesional, hingga kebutuhan event—sehingga kami menghadirkan solusi sewa yang fleksibel, efisien, dan bebas ribet.",
];

const aboutReasons = [
  "Proses sewa cepat & tanpa kompleksitas",
  "Unit terjamin kualitas & siap pakai",
  "Harga kompetitif dan transparan",
  "Dukungan customer service responsif",
];

const testimonials = [
  { quote: "Unit mulus, proses kilat. Sangat membantu kerja.", name: "Sarah, Desainer" },
  { quote: "Solusi terbaik untuk event temporer kami.", name: "Andi, EO" },
  { quote: "Booking mudah dan iPhone siap pakai.", name: "Naya, Creator" },
];

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] bg-[#fdfdfd] pb-20 pt-24 lg:pt-32">
      <main className="mx-auto w-full max-w-[1180px] px-6">
        <section className="relative min-h-[640px] overflow-hidden rounded-[32px] bg-black shadow-[0_24px_90px_rgba(49,56,92,0.20)]">
          <img src={heroImage} alt="RentPhone service" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/68" />
          <div className="absolute left-1/2 top-[121px] z-10 h-[213px] w-[342px] -translate-x-1/2 lg:top-[150px] lg:scale-[1.45]">
            <div className="absolute left-[145.25px] top-0 flex h-[50.25px] w-[51.5px] items-start rounded-full bg-[#0071E3]/10 p-3">
              <img src={iconImage} alt="" className="h-[26.25px] w-[27.5px] object-contain" />
            </div>
            <div className="absolute inset-x-0 top-[57.05px] flex h-[41.2px] flex-col items-center pt-[9.2px]">
              <h1 className="flex h-8 w-[155px] items-center justify-center whitespace-nowrap text-center font-['Poppins'] text-[24px] font-extrabold leading-8 tracking-[-0.6px] !text-white" style={{ color: "#ffffff" }}>Tentang Kami</h1>
            </div>
            <div className="absolute left-[11px] right-[11px] top-[105.05px] flex h-[69px] max-w-[320px] flex-col items-center">
              <p className="flex h-[69px] w-[297px] items-center text-center font-['Roboto'] text-[14px] font-normal leading-[23px] text-white">Tempat sewa iPhone yang terpercaya. Akses instan ke teknologi terbaik tanpa komitmen jangka panjang.</p>
            </div>
          </div>

          <div className="absolute left-1/2 top-[308px] z-10 h-[67px] w-[342px] -translate-x-1/2 lg:top-[430px] lg:scale-[1.45]">
            {stats.map((stat, index) => (
              <article key={stat.label} className={`absolute top-0 flex h-[67px] items-center gap-3 rounded-2xl border border-[#C1C6D6]/30 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${index === 0 ? "left-0 right-[179px]" : "left-[179px] right-0"}`}>
                <div className="flex flex-col items-start text-[#0071E3]">
                  <img src={index === 0 ? pipelIcon : likesIcon} alt="" className={index === 0 ? "size-6" : "size-[21px]"} />
                </div>
                <div className={`flex h-[33px] flex-col items-start ${index === 0 ? "w-[32.48px]" : "w-12"}`}>
                  <div className="flex h-[18px] w-full flex-col items-start">
                    <p className="flex h-[18px] items-center font-['Poppins'] text-[18px] font-bold leading-[18px] text-[#1A1C1D]">{stat.value}</p>
                  </div>
                  <div className="flex h-[15px] w-full flex-col items-start">
                    <p className="flex h-[15px] items-center font-['Roboto'] text-[10px] font-normal uppercase leading-[15px] tracking-[-0.5px] text-[#414753]">{stat.label}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-[50px]">
          <div className="rounded-[32px] border border-[#C1C6D6]/30 bg-white p-6 shadow-[0_22px_80px_rgba(49,56,92,0.10)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#888]">Komitmen Kami</p>
                <div className="mt-5 space-y-5 text-[17px] font-medium leading-[1.85] text-[#222]">
                  {aboutText.map((text) => <p key={text}>{text}</p>)}
                </div>
              </div>
              <div className="rounded-[24px] bg-[#F8F8FA] p-6">
                <p className="text-[18px] font-semibold tracking-[-0.03em] text-[#222]">Kenapa memilih kami?</p>
                <ul className="mt-5 grid gap-3">
                  {aboutReasons.map((reason) => (
                    <li key={reason} className="flex gap-3 text-[15px] font-medium leading-[1.6] text-[#222]">
                      <span className="mt-2 size-2 rounded-full bg-[#0071E3]" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-[50px]">
          <h2 className="text-[16px] font-normal leading-[18px] tracking-[0.071em] text-[#888]">Apa kata mereka</h2>
          <div className="mt-[29px] grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="min-h-[132px] rounded-[20px] border border-[#C1C6D6]/30 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(49,56,92,0.12)]">
                <p className="text-[15px] italic leading-[1.65] text-[#1A1C1D]">“{item.quote}”</p>
                <p className="mt-4 text-[13px] font-semibold text-[#1A1C1D]">— {item.name}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
