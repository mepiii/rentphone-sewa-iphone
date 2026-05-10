import svgPaths from "./svg-hnsq6cz2nx";

function Battery() {
  return (
    <div className="absolute inset-[39.39%_3.91%_34.85%_89.6%]" data-name="Battery">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.328 11.3333">
        <g id="Battery">
          <path d={svgPaths.p7e6b880} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, black)" />
          <path d={svgPaths.p9ed9280} fill="var(--fill-0, black)" id="Combined Shape" opacity="0.4" />
          <path d={svgPaths.p37074280} fill="var(--fill-0, black)" id="Rectangle_2" />
        </g>
      </svg>
    </div>
  );
}

function TimeStyle() {
  return (
    <div className="absolute bottom-1/4 left-[5.6%] right-[80%] top-[27.27%]" data-name="Time Style">
      <div className="absolute flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] inset-[9.52%_0_4.76%_0] justify-end leading-[0] not-italic text-[17.2px] text-black text-center tracking-[-0.344px]">
        <p className="leading-[normal]">9:41</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[9.17px] size-[27.52px] top-[9.17px]" data-name="icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.52 27.52">
        <g id="icon">
          <path clipRule="evenodd" d={svgPaths.p167ee800} fill="var(--fill-0, #222222)" fillRule="evenodd" id="Chevron" />
        </g>
      </svg>
    </div>
  );
}

function LeftAction() {
  return (
    <div className="absolute h-[50.453px] left-0 right-0 top-[50.45px]" data-name="Left Action">
      <Icon />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[25.227px] left-[66px] text-[#222] text-[20.64px] top-[9.55px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Riwayat Transaksi
      </p>
    </div>
  );
}

function NavigationBarHeadline() {
  return (
    <div className="absolute h-[101px] left-0 overflow-clip top-0 w-[430px]" data-name="Navigation Bar/Headline">
      <div className="absolute bg-[#f9f9f9] h-[100.907px] left-0 shadow-[0px_4.587px_27.52px_0px_rgba(0,0,0,0.08)] top-0 w-[430px]" data-name="bg" />
      <div className="absolute h-[50.453px] left-0 right-0 top-0" data-name="Status Bar On Light">
        <Battery />
        <div className="absolute inset-[39.39%_11.74%_35.69%_84.18%]" data-name="Wifi">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5127 12.5736">
            <path d={svgPaths.p17aa6c00} fill="var(--fill-0, black)" id="Wifi" />
          </svg>
        </div>
        <div className="absolute inset-[40.15%_17.16%_35.61%_78.31%]" data-name="Mobile Signal">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4932 12.2314">
            <path d={svgPaths.p3b460a80} fill="var(--fill-0, black)" id="Mobile Signal" />
          </svg>
        </div>
        <TimeStyle />
      </div>
      <LeftAction />
    </div>
  );
}

function Address() {
  return (
    <div className="absolute contents left-[18px] top-[132px]" data-name="address">
      <div className="absolute bg-white h-[157px] left-[18px] rounded-[9.152px] shadow-[2px_2px_28.6px_0px_rgba(0,0,0,0.25)] top-[132px] w-[393px]" data-name="bg" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[189.5px] tracking-[-0.1716px] w-[198px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5]">Rp605.000</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[241.5px] tracking-[-0.1716px] w-[225px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0">order</p>
        <p className="leading-[1.5] mb-0">nusatrade1834474747</p>
        <p className="leading-[1.5]">Receipt Number 005637478667</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[50.34px] text-[#964206] text-[16.016px] top-[164.09px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">Sedang Disewa</p>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[397px] text-[16.016px] text-black text-right top-[164.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">03-06-2024</p>
      </div>
    </div>
  );
}

function ShippingAddress() {
  return (
    <div className="absolute contents left-[18px] top-[132px]" data-name="Shipping address">
      <Address />
    </div>
  );
}

function Address1() {
  return (
    <div className="absolute contents left-[18px] top-[311px]" data-name="address">
      <div className="absolute bg-white h-[157px] left-[18px] rounded-[9.152px] shadow-[2px_2px_28.6px_0px_rgba(0,0,0,0.25)] top-[311px] w-[393px]" data-name="bg" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[368.5px] tracking-[-0.1716px] w-[198px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5]">Rp 250.000</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[420.5px] tracking-[-0.1716px] w-[225px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0">order</p>
        <p className="leading-[1.5] mb-0">nusatrade1834464334</p>
        <p className="leading-[1.5]">Receipt Number 00676443644</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[50.34px] text-[16.016px] text-[rgba(17,148,38,0.92)] top-[343.09px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">Sewa Selesai</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[313px] text-[16.016px] text-black top-[343.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">16-03-2024</p>
      </div>
    </div>
  );
}

function ShippingAddress1() {
  return (
    <div className="absolute contents left-[18px] top-[311px]" data-name="Shipping address">
      <Address1 />
    </div>
  );
}

function Address2() {
  return (
    <div className="absolute contents left-[18px] top-[490px]" data-name="address">
      <div className="absolute bg-white h-[157px] left-[18px] rounded-[9.152px] shadow-[2px_2px_28.6px_0px_rgba(0,0,0,0.25)] top-[490px] w-[393px]" data-name="bg" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[547.5px] tracking-[-0.1716px] w-[198px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5]">Rp 220.000</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[599.5px] tracking-[-0.1716px] w-[225px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0">order</p>
        <p className="leading-[1.5] mb-0">nusatrade1834475547</p>
        <p className="leading-[1.5]">Receipt Number 00534935746</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[50.34px] text-[16.016px] text-[rgba(17,148,38,0.92)] top-[522.09px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">Sewa Selesai</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[313px] text-[16.016px] text-black top-[522.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">25-02-2024</p>
      </div>
    </div>
  );
}

function ShippingAddress2() {
  return (
    <div className="absolute contents left-[18px] top-[490px]" data-name="Shipping address">
      <Address2 />
    </div>
  );
}

function Address3() {
  return (
    <div className="absolute contents left-[18px] top-[669px]" data-name="address">
      <div className="absolute bg-white h-[157px] left-[18px] rounded-[9.152px] shadow-[2px_2px_28.6px_0px_rgba(0,0,0,0.25)] top-[669px] w-[393px]" data-name="bg" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[726.5px] tracking-[-0.1716px] w-[198px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5]">Rp 200.000</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[50px] text-[#433f3f] text-[14px] top-[778.5px] tracking-[-0.1716px] w-[225px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.5] mb-0">order</p>
        <p className="leading-[1.5] mb-0">nusatrade1834474347</p>
        <p className="leading-[1.5]">Receipt Number 0055676874444</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[50.34px] text-[16.016px] text-[rgba(17,148,38,0.92)] top-[701.09px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">Sewa Selesai</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[313px] text-[16.016px] text-black top-[701.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.88px]">14-01-2024</p>
      </div>
    </div>
  );
}

function ShippingAddress3() {
  return (
    <div className="absolute contents left-[18px] top-[669px]" data-name="Shipping address">
      <Address3 />
    </div>
  );
}

function MdiContact() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="mdi:contact">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:contact">
          <path d={svgPaths.p70fcd00} fill="var(--fill-0, #365678)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[26px] relative shrink-0 w-[81px]">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[26px] leading-[25.227px] left-[27px] text-[8px] text-black top-[-1px] w-[54px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        081234567890
      </p>
      <MdiContact />
    </div>
  );
}

function RiInstagramFill() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="ri:instagram-fill">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ri:instagram-fill">
          <path d={svgPaths.p2068e200} fill="var(--fill-0, #365678)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[26px] relative shrink-0 w-[77px]">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[26px] leading-[25.227px] left-[27px] text-[8px] text-black top-[-1px] w-[50px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        @sewaiphone
      </p>
      <RiInstagramFill />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[63px] top-px">
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute bg-white border border-[#9b9b9b] border-solid bottom-[2.47%] left-[calc(50%+0.5px)] overflow-clip rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[94.53%] w-[253px]">
      <p className="absolute font-['Roboto:Light',sans-serif] font-light leading-[25.227px] left-[11px] text-[5px] text-black top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        All rights reserved
      </p>
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 h-[32px] left-1/2 w-[430px]">
      <div className="absolute inset-[38.54%_0_0_0]" data-name="Home Indicator">
        <div className="-translate-x-1/2 absolute bg-[#101010] bottom-[9.07px] h-[5.667px] left-[calc(50%+0.57px)] rounded-[100px] w-[151.867px]" data-name="Home Indicator" />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute inset-[94.96%_0_0_0]">
      <Frame />
    </div>
  );
}

export default function RiwayatTransaksi() {
  return (
    <div className="bg-[#fdfdfd] relative size-full" data-name="Riwayat Transaksi">
      <NavigationBarHeadline />
      <ShippingAddress />
      <ShippingAddress1 />
      <ShippingAddress2 />
      <ShippingAddress3 />
      <Frame1 />
      <Frame5 />
    </div>
  );
}