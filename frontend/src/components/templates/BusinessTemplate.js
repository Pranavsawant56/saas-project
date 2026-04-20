import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function BusinessTemplate({ data }) {
  const {
    companyName,
    heroTitle,
    heroSubtitle,
    tagline,
    heroImage,
    service1_name, service1_image, service1_desc,
    service2_name, service2_image, service2_desc,
    service3_name, service3_image, service3_desc,
    service4_name, service4_image, service4_desc,
    services, // legacy
    aboutUsTitle,
    aboutUsContent,
    aboutUsImage,
    email, contactEmail,
    phone,
    address, location,
    headerType,
    logoUrl,
    facebookUrl,
    twitterUrl,
    linkedinUrl,
    companyNameFontSize,
    heroTitleFontSize,
    taglineFontSize,
    service1_nameFontSize, service1_descFontSize,
    service2_nameFontSize, service2_descFontSize,
    service3_nameFontSize, service3_descFontSize,
    service4_nameFontSize, service4_descFontSize,
    aboutUsTitleFontSize, aboutUsContentFontSize,
    countryCode,
  } = data || {};

  const displayEmail = contactEmail || email || "info@business.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : (phone || "+1 800 123 4567");
  const displayLocation = address || location || "New York, NY";
  const displayName = companyName || "Business Pro";

  const displayServices = data.services || [
    { name: 'Strategy', desc: 'Setting the long-term vision.' },
    { name: 'Design', desc: 'Crafting the visual language.' },
    { name: 'Development', desc: 'Building the technical foundation.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Business" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-white text-slate-900 flex flex-col min-h-screen">

        {/* Corporate Header - Unique for Business 1 */}
        <header className="w-full flex flex-col">
          {/* Top Bar */}
          <div className="bg-indigo-950 text-white py-2 px-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
            <div className="flex gap-6">
              <span className="flex items-center gap-2">📞 {displayPhone}</span>
              <span className="flex items-center gap-2">📧 {displayEmail}</span>
            </div>
            <div className="hidden md:block">
              📍 {displayLocation}
            </div>
          </div>
          {/* Main Nav */}
          <div className="bg-white py-6 px-8 flex justify-between items-center border-b border-slate-100 shadow-sm sticky top-0 z-50">
            <div className="text-2xl font-black text-indigo-950 flex items-center gap-2">
              {headerType === "Image" ? (
                (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                  <div className="relative h-8 w-32">
                    <Image src={logoUrl} alt={displayName} fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">
                    {displayName[0]}
                  </div>
                )
              ) : (
                <span style={{ fontSize: companyNameFontSize ? `${companyNameFontSize}px` : undefined }}>{displayName}</span>
              )}
            </div>
            <nav className="hidden md:flex gap-10 items-center font-bold text-sm text-slate-600">
              {['Home', 'About', 'Services', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">{item}</a>
              ))}
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md">Get Quote</button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Banner */}
          <section id="home" className="relative h-[550px] overflow-hidden">
            <Image
              src={(heroImage && typeof heroImage === 'string' && heroImage.trim() !== "") ? heroImage : "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"}
              alt="Business Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-950/70 to-transparent flex items-center px-8 md:px-20">
              <div className="max-w-2xl text-white">
                <h1 
                  className="text-6xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
                >
                  {heroTitle || `Empowering Your ${displayName} Success.`}
                </h1>
                <p 
                  className="text-xl md:text-2xl opacity-90 mb-10 border-l-8 border-indigo-600 pl-8 font-light"
                  style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                >
                  {heroSubtitle || tagline || "Providing innovative solutions for your business success and operational excellence."}
                </p>
                <div className="flex gap-4">
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-600/30">
                    Our Solutions
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-4 border border-white/20 rounded-xl font-black uppercase tracking-widest text-xs transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 px-8 bg-slate-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4">Core Expertise</h2>
                <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tight">Enterprise Services</h3>
                <div className="w-24 h-2 bg-indigo-600 mx-auto mt-6 rounded-full" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-500 group">
                    <div className="relative flex-shrink-0 w-16 h-16 bg-indigo-50 rounded-[1rem] flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-500 shadow-inner overflow-hidden">
                      {(service.image && typeof service.image === 'string' && service.image.trim() !== "") ? (
                        <Image src={service.image} alt={service.name} fill className="object-cover rounded-lg" />
                      ) : (
                        <span className="text-2xl group-hover:scale-110 transition-transform">💎</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-xl font-black text-indigo-950 mb-1 truncate"
                        style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                      >
                        {service.name}
                      </h3>
                      <p 
                        className="text-slate-500 leading-relaxed font-medium text-xs line-clamp-1 italic"
                        style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                      >
                        {service.desc || `World-class ${service.name.toLowerCase()} solutions.`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section id="about" className="py-32 px-8 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
              <div className="w-full md:w-1/2 relative aspect-square">
                <div className="absolute -inset-4 bg-indigo-600/10 blur-[80px] rounded-full -z-10" />
                <Image
                  src={(aboutUsImage && typeof aboutUsImage === 'string' && aboutUsImage.trim() !== "") ? aboutUsImage : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"}
                  alt="About Us representation"
                  fill
                  className="object-cover rounded-[3rem] shadow-2xl border-8 border-slate-50 shadow-indigo-900/10"
                />
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Our Heritage</span>
                <h3 
                  className="text-5xl md:text-6xl font-black text-indigo-950 mb-8 leading-none tracking-tighter"
                  style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                >
                  {aboutUsTitle || "Decades of Unparalleled Excellence."}
                </h3>
                <p 
                  className="text-slate-600 text-xl font-medium leading-relaxed mb-12 italic border-l-4 border-indigo-100 pl-8"
                  style={{ fontSize: aboutUsContentFontSize ? `${aboutUsContentFontSize}px` : undefined }}
                >
                  {aboutUsContent || "With years of profound experience in the global market, we have established ourselves as a premier leader in delivering sophisticated business solutions that drive measurable growth."}
                </p>
                <div className="grid grid-cols-2 gap-10">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="text-3xl font-black text-indigo-600 mb-1">98%</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Client Retention</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="text-3xl font-black text-indigo-600 mb-1">20+</div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Global Offices</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="bg-indigo-950 text-white pt-32 pb-16 px-8 rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-20 border-b border-white/10">
              <div className="col-span-1 md:col-span-1">
                <div className="relative text-3xl font-black mb-8 tracking-tighter">
                  {headerType === "Image" ? (
                    (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                      <div className="relative h-10 w-40">
                        <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">
                        {displayName[0]}
                      </div>
                    )
                  ) : (
                    displayName
                  )}
                </div>
                <p className="text-indigo-200/60 leading-relaxed text-sm">
                  Leading the way in digital transformation and strategic business advisory for Fortune 500 companies.
                </p>
                <div className="flex gap-4 mt-8">
                  {facebookUrl && (
                    <a href={facebookUrl} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-all group">
                      <svg className="w-5 h-5 text-indigo-200/40 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-all group">
                      <svg className="w-5 h-5 text-indigo-200/40 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  )}
                  {linkedinUrl && (
                    <a href={linkedinUrl} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-all group">
                      <svg className="w-5 h-5 text-indigo-200/40 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-[0.4em] mb-10 text-white">Solutions</h4>
                <ul className="space-y-4 text-indigo-200/60 text-sm font-bold">
                  <li>Cloud Architecture</li>
                  <li>Strategic Planning</li>
                  <li>Digital Marketing</li>
                  <li>Product Engineering</li>
                </ul>
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-[0.4em] mb-10 text-white">Contact</h4>
                <div className="space-y-6 text-indigo-200/60 text-sm">
                  <p className="flex items-center gap-3">📍 {displayLocation}</p>
                  <p className="flex items-center gap-3">📧 {displayEmail}</p>
                  <p className="flex items-center gap-3">📞 {displayPhone}</p>
                </div>
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-[0.4em] mb-10 text-white">Newsletter</h4>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="your@email.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
                  <button className="bg-indigo-600 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="pt-12 text-center text-[10px] font-black uppercase tracking-[0.5em] text-indigo-200/30">
              © {new Date().getFullYear()} {displayName} Corporation • All Rights Reserved
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}


