import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function CATemplate3({ data }) {
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

  const displayEmail = contactEmail || "support@apextax.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "+1-888-555-TAX1";
  const displayAddress = address || "100 Compliance Way, TX";
  const displayName = firmName || "Apex Tax Advisors";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Tax Filing', desc: 'Individual and corporate tax returns filed accurately and on time.' },
    { name: 'Audit Support', desc: 'Representation and documentation support during IRS audits.' },
    { name: 'Bookkeeping', desc: 'Monthly reconciliation and financial reporting for small businesses.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Chartered Accountant" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#f4f7f6] text-slate-800 flex flex-col min-h-screen font-sans">
        
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-12 w-40">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1 
                    className="font-bold text-[#1e4b4a] tracking-tight"
                    style={{ fontSize: firmNameFontSize ? `${firmNameFontSize}px` : '28px' }}
                  >
                    {displayName}
                  </h1>
                </div>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex flex-col text-right text-sm">
                <span className="text-slate-500">Call for a free consultation</span>
                <a href={`tel:${displayPhone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#1e4b4a]">{displayPhone}</a>
              </div>
              <a href="#contact" className="bg-[#1e4b4a] hover:bg-[#153635] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                Client Portal
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-[#1e4b4a] text-white relative">
            <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
              <div className="relative h-full w-full opacity-40">
                <Image 
                  src={heroImage || "/images/templates/template-img-24.jpg"} 
                  alt="Tax Services" 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e4b4a] to-transparent"></div>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
              <div className="max-w-2xl">
                {tagline && (
                  <div className="inline-block bg-[#e8b931] text-[#1e4b4a] font-bold px-3 py-1 rounded-sm text-sm mb-6">
                    <span style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}>{tagline}</span>
                  </div>
                )}
                <h2 
                  className="font-bold leading-tight mb-6"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '48px' }}
                >
                  {heroTitle || "Stress-Free Tax & Compliance Solutions."}
                </h2>
                <p className="text-lg text-emerald-50/80 mb-8 max-w-xl">
                  Dedicated professionals ensuring your finances are compliant, optimized, and secure. Let us handle the complexity.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#services" className="bg-white text-[#1e4b4a] px-6 py-3 rounded-md font-bold hover:bg-slate-100 transition-colors shadow-md">
                    Explore Services
                  </a>
                  <a href="#contact" className="border-2 border-white/30 text-white px-6 py-3 rounded-md font-bold hover:bg-white/10 transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-[#1e4b4a] mb-4">How We Can Help</h2>
                <p className="text-slate-600">Comprehensive tax and accounting services tailored to individuals and businesses.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="bg-[#f4f7f6] rounded-xl p-8 hover:-translate-y-1 transition-transform border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-[#1e4b4a] relative overflow-hidden">
                      {service.image ? (
                        <Image src={service.image} alt={service.name} fill className="object-cover" />
                      ) : (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    <h4 
                      className="text-xl font-bold text-slate-800 mb-3"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p 
                      className="text-slate-600"
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
          <section id="about" className="py-20 bg-[#1e4b4a]/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-5/12 relative min-h-[300px]">
                  <Image 
                    src={aboutImage || "/images/templates/template-img-25.jpg"} 
                    alt="Our Office" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <h2 
                    className="text-3xl font-bold text-[#1e4b4a] mb-6"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "Our Expertise & Commitment"}
                  </h2>
                  <div 
                    className="text-slate-600 space-y-4 mb-8"
                    style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                  >
                    <p>{bio || "Dedicated to providing accurate and timely tax solutions, our team of certified professionals stays up-to-date with the ever-changing tax codes. We believe in proactive communication and building long-lasting relationships with our clients based on trust and results."}</p>
                  </div>
                  <ul className="space-y-3 font-medium text-[#1e4b4a]">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#e8b931]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Certified Professionals
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#e8b931]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Secure Data Handling
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#e8b931]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Year-Round Support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-slate-900 text-slate-300 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="text-2xl font-bold text-white mb-6">
                  {headerType === "Image" && logoUrl ? (
                    <div className="relative h-10 w-32 brightness-0 invert">
                      <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                    </div>
                  ) : displayName}
                </div>
                <p className="max-w-md text-slate-400 mb-6">Providing peace of mind through expert tax preparation, auditing, and financial consulting services.</p>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact Us</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#e8b931]">📍</span>
                    <span>{displayAddress}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#e8b931]">📞</span>
                    <a href={`tel:${displayPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{displayPhone}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#e8b931]">📧</span>
                    <a href={`mailto:${displayEmail}`} className="hover:text-white transition-colors">{displayEmail}</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Office Hours</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 5:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 2:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
                </ul>
                <div className="mt-6 text-xs text-[#e8b931]">* Extended hours during tax season</div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
              <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
