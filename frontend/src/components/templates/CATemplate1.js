import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function CATemplate1({ data }) {
  const {
    firmName,
    tagline,
    heroTitle,
    heroImage,
    services,
    aboutUsTitle,
    bio,
    aboutImage,
    contactEmail,
    phone,
    address,
    footerCopyright,
    headerType,
    logoUrl,
    firmNameFontSize,
    taglineFontSize,
    heroTitleFontSize,
    aboutUsTitleFontSize,
    bioFontSize,
    countryCode,
  } = data || {};

  const displayEmail = contactEmail || "info@firm.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "+1 800 555 0199";
  const displayAddress = address || "Financial District, NY";
  const displayName = firmName || "Corporate CA Firm";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Corporate Audit', desc: 'Comprehensive auditing and assurance.' },
    { name: 'Tax Advisory', desc: 'Strategic tax planning and compliance.' },
    { name: 'Financial Consulting', desc: 'Expert guidance for sustainable growth.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Chartered Accountant" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-slate-50 text-slate-900 flex flex-col min-h-screen font-sans">

        {/* Header */}
        <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl">
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-10 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1
                    className="font-black tracking-tight"
                    style={{ fontSize: firmNameFontSize ? `${firmNameFontSize}px` : '24px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span
                      className="text-slate-400 font-medium"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : '12px' }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-bold tracking-wide">
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">Firm Profile</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </nav>
            <a href="#contact" className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded text-sm font-bold transition-colors">
              Consult Us
            </a>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-slate-900 text-white pt-20 pb-32 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image
                src={heroImage || "/images/templates/template-img-23.jpg"}
                alt="Corporate Firm"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-8 z-10">
              <div className="max-w-2xl">
                <div className="w-12 h-1 bg-blue-500 mb-8"></div>
                <h2
                  className="font-black leading-tight mb-6"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '64px' }}
                >
                  {heroTitle || "Trusted Financial Advisors."}
                </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-xl">
                  {tagline || "Delivering uncompromising financial advice and strategic planning for enterprise success."}
                </p>
                <div className="flex gap-4">
                  <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded text-sm font-black uppercase tracking-wider transition-all">
                    Schedule Consultation
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-8">
              <div className="text-center mb-16">
                <h3 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">Practice Areas</h3>
                <h2 className="text-4xl font-black text-slate-900">Core Services</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-8 rounded-xl hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors relative overflow-hidden">
                      {service.image ? (
                        <Image src={service.image} alt={service.name} fill className="object-cover" />
                      ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <h4
                      className="text-xl font-bold text-slate-900 mb-3"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p
                      className="text-slate-600 leading-relaxed"
                      style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                    >
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-8">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={aboutImage || "/images/templates/template-img-5.jpg"}
                      alt="Firm Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">Firm Profile</h3>
                  <h2
                    className="text-4xl font-black text-slate-900 mb-6"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "Our Legacy of Excellence."}
                  </h2>
                  <div
                    className="prose prose-lg text-slate-600"
                    style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                  >
                    <p>{bio || "With over two decades of experience, we provide uncompromising financial advice to corporations and high-net-worth individuals. Our commitment to integrity, accuracy, and strategic insight has made us a trusted partner in navigating complex financial landscapes."}</p>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-6">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <div className="text-3xl font-black text-slate-900">20+</div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Years Experience</div>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4">
                      <div className="text-3xl font-black text-slate-900">500+</div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Corporate Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h4 className="text-white font-bold text-xl mb-6">Contact Information</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="text-blue-500 mt-1">📍</span>
                    <span>{displayAddress}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-blue-500">📞</span>
                    <span>{displayPhone}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-blue-500">📧</span>
                    <span>{displayEmail}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#services" className="hover:text-blue-400 transition-colors">Practice Areas</a></li>
                  <li><a href="#about" className="hover:text-blue-400 transition-colors">Firm Profile</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-6">{displayName}</h4>
                <p className="mb-6 leading-relaxed">Dedicated to providing premier accounting, auditing, and financial consulting services.</p>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-slate-800 text-sm">
              <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}</p>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
