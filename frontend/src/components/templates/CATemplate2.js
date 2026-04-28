import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function CATemplate2({ data }) {
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

  const displayEmail = contactEmail || "hello@consultant.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "123-456-7890";
  const displayAddress = address || "Remote / Bay Area";
  const displayName = firmName || "Alex Consultant, CA";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Wealth Management', desc: 'Personalized portfolio strategy and asset allocation.' },
    { name: 'Startup Advisory', desc: 'Financial modeling and seed funding consultation.' },
    { name: 'Personal Tax', desc: 'Optimized tax planning for high-net-worth individuals.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Chartered Accountant" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-white text-zinc-900 flex flex-col min-h-screen font-sans selection:bg-zinc-900 selection:text-white">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-100">
          <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-8 w-24">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1 
                    className="font-bold tracking-tight text-zinc-900"
                    style={{ fontSize: firmNameFontSize ? `${firmNameFontSize}px` : '20px' }}
                  >
                    {displayName}
                  </h1>
                </div>
              )}
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
              <a href="#expertise" className="hover:text-zinc-900 transition-colors">Expertise</a>
              <a href="#about" className="hover:text-zinc-900 transition-colors">About</a>
              <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-24 pb-32 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2 flex flex-col items-start">
                  {tagline && (
                    <span 
                      className="text-zinc-500 uppercase tracking-widest font-semibold mb-6 block"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : '12px' }}
                    >
                      {tagline}
                    </span>
                  )}
                  <h2 
                    className="font-bold leading-[1.1] tracking-tight mb-8 text-zinc-900"
                    style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '56px' }}
                  >
                    {heroTitle || "Clarity for Your Finances."}
                  </h2>
                  <a href="#contact" className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl">
                    Let's Talk
                  </a>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/5] md:aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-zinc-100">
                    {heroImage && (
                      <Image 
                        src={heroImage} 
                        alt="Consultant Hero" 
                        fill 
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Expertise Section */}
          <section id="expertise" className="py-24 bg-zinc-50 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-zinc-900">Areas of Expertise</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="group">
                    <div className="w-12 h-12 bg-white border border-zinc-200 rounded-full flex items-center justify-center mb-6 text-zinc-900 group-hover:border-zinc-900 transition-colors relative overflow-hidden">
                      {service.image ? (
                        <Image src={service.image} alt={service.name} fill className="object-cover" />
                      ) : (
                        <span className="text-xl font-serif italic">{idx + 1}</span>
                      )}
                    </div>
                    <h4 
                      className="text-lg font-bold text-zinc-900 mb-3"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p 
                      className="text-zinc-600 leading-relaxed text-sm"
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
          <section id="about" className="py-32 px-6 bg-white">
            <div className="max-w-3xl mx-auto text-center">
              {aboutImage && (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-10 relative">
                  <Image src={aboutImage} alt="Profile" fill className="object-cover" />
                </div>
              )}
              <h2 
                className="text-3xl font-bold text-zinc-900 mb-8"
                style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
              >
                {aboutUsTitle || "Meet Your Consultant"}
              </h2>
              <div 
                className="text-lg text-zinc-600 leading-loose"
                style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
              >
                <p>{bio || "I specialize in personalized tax strategies and wealth management for forward-thinking individuals and growing startups. My approach is modern, transparent, and entirely tailored to your unique financial goals."}</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-zinc-900 text-zinc-400 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              <div>
                <h3 className="text-white text-3xl font-bold mb-6">Ready to optimize<br/>your financial future?</h3>
                <a href={`mailto:${displayEmail}`} className="text-zinc-300 hover:text-white text-lg transition-colors border-b border-zinc-700 hover:border-white pb-1 inline-block">
                  {displayEmail}
                </a>
              </div>
              <div className="flex flex-col md:items-end justify-center gap-4">
                <p>{displayPhone}</p>
                <p>{displayAddress}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800 text-sm">
              <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}.`}</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
