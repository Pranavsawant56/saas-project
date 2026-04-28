import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function DoctorTemplate2({ data }) {
  const {
    clinicName,
    heroTitle,
    specialty,
    heroImage,
    bio,
    aboutUsTitle,
    aboutImage,
    education,
    experience,
    contactEmail,
    phone,
    countryCode,
    address,
    workingHours,
    headerType,
    logoUrl,
    clinicNameFontSize,
    heroTitleFontSize,
    specialtyFontSize,
    services,
  } = data || {};

  const displayEmail = contactEmail || "hello@evergreen.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : (phone || "+1 888 WELLNESS");
  const displayLocation = address || "789 Green St, CA";
  const displayName = clinicName || "Evergreen Wellness";

  const displayServices = services || [
    { name: 'Traditional Therapy', desc: 'Holistic approaches to physical ailments.' },
    { name: 'Nutrition Plans', desc: 'Personalized dietary guidance for vitality.' },
    { name: 'Mindfulness', desc: 'Stress reduction and mental clarity sessions.' },
    { name: 'Acupuncture', desc: 'Ancient techniques for modern healing.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Doctor" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#fdfaf6] text-stone-800 flex flex-col min-h-screen font-serif">

        {/* Serene Header */}
        <header className="w-full bg-[#fdfaf6]/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/50">
          <div className="container mx-auto px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {headerType === "Image" ? (
                logoUrl ? (
                  <div className="relative h-12 w-48">
                    <Image src={logoUrl} alt={displayName} fill className="object-contain" />
                  </div>
                ) : (
                  <span className="text-3xl text-emerald-700">🌿</span>
                )
              ) : (
                <span
                  className="text-2xl font-black text-stone-900 tracking-tighter"
                  style={{ fontSize: clinicNameFontSize ? `${clinicNameFontSize}px` : undefined }}
                >
                  {displayName}
                </span>
              )}
            </div>

            <nav className="hidden lg:flex gap-12 items-center text-sm font-bold uppercase tracking-widest text-stone-500">
              <a href="#home" className="hover:text-emerald-700 transition-colors">Begin</a>
              <a href="#philosophy" className="hover:text-emerald-700 transition-colors">Philosophy</a>
              <a href="#services" className="hover:text-emerald-700 transition-colors">Services</a>
              <a href="#contact" className="hover:text-emerald-700 transition-colors border-2 border-stone-200 px-6 py-2 rounded-full">Seek Care</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Centered Hero Section */}
          <section id="home" className="pt-20 pb-32 px-8 overflow-hidden">
            <div className="container mx-auto text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-[120px] -z-10" />

              <span
                className="inline-block text-emerald-700 font-black uppercase tracking-[0.5em] text-[10px] mb-8 bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100"
                style={{ fontSize: specialtyFontSize ? `${specialtyFontSize}px` : undefined }}
              >
                {specialty || "Integrated Holistic Healing"}
              </span>

              <h1
                className="text-6xl md:text-8xl font-black text-stone-900 mb-12 leading-[1] max-w-5xl mx-auto"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
              >
                {heroTitle || "Heal The Body. Nurture The Soul."}
              </h1>

              <div className="relative max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-[15px] border-white rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-700 mb-16">
                <div className="aspect-[21/9]">
                  <Image
                    src={heroImage || "/images/templates/template-img-28.jpg"}
                    alt="Holistic Wellness"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-8 items-center text-stone-500 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Natural Origins
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Expert Guidance
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Lasting Vitality
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section id="philosophy" className="py-32 bg-stone-900 text-stone-100 px-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/20 translate-x-1/2 rotate-12 -z-0" />
            <div className="container mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row gap-20 items-center">
              <div className="w-full md:w-1/2 aspect-square relative rounded-[4rem] overflow-hidden group">
                <Image
                  src={aboutImage || "/images/templates/template-img-8.jpg"}
                  alt="Our Philosophy"
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-80"
                />
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-6 block">{aboutUsTitle || "Our Philosophy"}</span>
                <h3 className="text-5xl md:text-6xl font-extrabold mb-10 leading-tight">A Journey Inwards to True Health.</h3>
                <p className="text-xl text-stone-400 mb-12 italic border-l-2 border-emerald-500 pl-8 font-light leading-relaxed">
                  {bio || "We believe that true healing begins when we align our lifestyle with the natural rhythms of life. Our approach integrates ancient wisdom with modern medical understanding to help you achieve a state of vibrant health and deep inner peace."}
                </p>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all">
                  Our Method
                </button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-32 px-8">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
                <div className="max-w-2xl">
                  <h3 className="text-6xl font-black text-stone-900 mb-6">Ways to Reconnect.</h3>
                  <p className="text-stone-500 text-lg">Curated treatments designed to restore balance and harmony to your physical and emotional being.</p>
                </div>
                <div className="w-32 h-32 rounded-full border border-stone-200 flex items-center justify-center animate-spin-slow">
                  <span className="text-STONE-300 font-black text-[10px] uppercase tracking-widest leading-none text-center">Pure<br />Healing<br />Energy</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {displayServices.map((val, idx) => (
                  <div key={idx} className="group flex flex-col items-center text-center">
                    <div className="w-32 h-44 bg-stone-100 rounded-[3rem] mb-8 relative overflow-hidden flex items-center justify-center transition-all group-hover:bg-emerald-50">
                      {val.image ? (
                        <Image src={val.image} alt={val.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">🍃</span>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold text-stone-900 mb-4">{val.name}</h4>
                    <p className="text-stone-500 leading-relaxed text-sm italic">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="bg-[#f0ece6] py-32 px-8 rounded-t-[5rem]">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-24 max-w-3xl mx-auto">
              <h3 className="text-5xl font-black mb-8">Ready to Begin?</h3>
              <p className="text- stone-500 mb-12">Visit our center or get in touch for a private consultation.</p>
              <div className="flex flex-wrap justify-center gap-10">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-emerald-700 tracking-widest mb-2">Location</span>
                  <span className="text-xl font-bold">{displayLocation}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-emerald-700 tracking-widest mb-2">Email</span>
                  <span className="text-xl font-bold">{displayEmail}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-emerald-700 tracking-widest mb-2">Voice</span>
                  <span className="text-xl font-bold">{displayPhone}</span>
                </div>
              </div>
            </div>

            <div className="pt-20 border-t border-stone-300 flex flex-col md:flex-row justify-between items-center gap-10 opacity-50">
              <span className="text-sm font-black italic">Evergreen Wellness © 2024</span>
              <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
                <a href="#" className="hover:text-emerald-700">Instagram</a>
                <a href="#" className="hover:text-emerald-700">Spotify</a>
                <a href="#" className="hover:text-emerald-700">Vimeo</a>
              </div>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
