import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function GraphicDesignerTemplate2({ data }) {
  const {
    name,
    tagline,
    heroTitle,
    heroImage,
    services,
    projects,
    aboutUsTitle,
    bio,
    aboutImage,
    contactEmail,
    phone,
    address,
    behanceUrl,
    dribbbleUrl,
    footerCopyright,
    headerType,
    logoUrl,
    nameFontSize,
    taglineFontSize,
    heroTitleFontSize,
    aboutUsTitleFontSize,
    bioFontSize,
    countryCode,
  } = data || {};

  const displayEmail = contactEmail || "mia@minimal.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "123-456-7890";
  const displayAddress = address || "New York, NY";
  const displayName = name || "Mia Minimal";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Typography', desc: 'Custom fonts & editorial layouts.' },
    { name: 'Brand Identity', desc: 'Minimalist logo and corporate identity.' },
    { name: 'Print Design', desc: 'Posters, brochures, and packaging.' }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : [
    { name: 'Kinfolk Redesign', desc: 'Editorial spread concepts.', link: '#' },
    { name: 'Aura Skincare', desc: 'Packaging and brand identity.', link: '#' },
    { name: 'Studio Chair', desc: 'Product photography direction.', link: '#' },
    { name: 'Boutique Hotel', desc: 'Wayfinding and collateral.', link: '#' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Graphic Designer" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#fafafa] text-[#111] min-h-screen font-serif selection:bg-[#111] selection:text-white">
        
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-sm border-b border-[#eee]">
          <div className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-10 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col text-center md:text-left">
                  <h1 
                    className="font-bold tracking-tight text-[#111] uppercase"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '20px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span 
                      className="text-[#666] font-sans text-xs tracking-widest uppercase mt-1"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="flex gap-8 font-sans text-xs tracking-widest uppercase text-[#111]">
              <a href="#work" className="hover:text-[#888] transition-colors relative group">
                Work
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#111] transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" className="hover:text-[#888] transition-colors relative group">
                Profile
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#111] transition-all group-hover:w-full"></span>
              </a>
              <a href="#contact" className="hover:text-[#888] transition-colors relative group">
                Contact
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#111] transition-all group-hover:w-full"></span>
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-32">
          {/* Hero Section */}
          <section className="px-8 pb-20">
            <div className="max-w-[1400px] mx-auto">
              <h2 
                className="font-light leading-[1.1] mb-12 max-w-4xl text-[#111]"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '6vw' }}
              >
                {heroTitle || "Less is More. Focusing on the essential."}
              </h2>
              {heroImage && (
                <div className="relative aspect-[21/9] w-full overflow-hidden mt-12 bg-[#eee]">
                  <Image 
                    src={heroImage} 
                    alt="Featured Work" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    priority
                  />
                </div>
              )}
            </div>
          </section>

          {/* Portfolio Grid */}
          <section id="work" className="px-8 py-20 border-t border-[#eee]">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex justify-between items-end mb-16">
                <h3 className="text-xl font-sans tracking-widest uppercase text-[#111]">Selected Archive</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
                {displayProjects.map((project, idx) => (
                  <a key={idx} href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className={`relative aspect-[4/3] w-full overflow-hidden bg-[#eee] mb-6 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}>
                      <Image 
                        src={project.image || `/images/templates/template-img-${20 + (idx % 2)}.jpg`}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                      />
                    </div>
                    <div className="flex justify-between items-start font-sans">
                      <h4 
                        className="text-lg font-medium text-[#111]"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        {project.name}
                      </h4>
                      <p 
                        className="text-[#666] text-sm text-right"
                        style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}
                      >
                        {project.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* About & Skills */}
          <section id="about" className="px-8 py-32 bg-white border-t border-[#eee]">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/3">
                {aboutImage ? (
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#eee]">
                    <Image src={aboutImage} alt="Profile" fill className="object-cover grayscale" />
                  </div>
                ) : (
                  <h2 
                    className="text-4xl font-light text-[#111]"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "The Designer"}
                  </h2>
                )}
              </div>
              
              <div className="lg:w-2/3 flex flex-col justify-center">
                {aboutImage && (
                  <h2 
                    className="text-4xl font-light text-[#111] mb-8"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "The Designer"}
                  </h2>
                )}
                <div 
                  className="text-2xl text-[#444] leading-relaxed font-light max-w-2xl mb-16"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  <p>{bio || "I specialize in clean, timeless brand identities and editorial design. My approach is rooted in typographic rigor and conceptual clarity, stripping away the unnecessary to reveal the core message."}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 font-sans border-t border-[#eee] pt-12">
                  {displayServices.map((service, idx) => (
                    <div key={idx}>
                      <h4 
                        className="text-sm tracking-widest uppercase font-medium text-[#111] mb-3"
                        style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                      >
                        {service.name}
                      </h4>
                      <p 
                        className="text-[#666] text-sm leading-relaxed"
                        style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                      >
                        {service.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="px-8 py-20 border-t border-[#eee] bg-[#fafafa]">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="font-sans">
              <h3 className="text-sm tracking-widest uppercase text-[#666] mb-8">Inquiries</h3>
              <a href={`mailto:${displayEmail}`} className="text-4xl md:text-6xl font-light text-[#111] hover:text-[#888] transition-colors relative inline-block group">
                {displayEmail}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#111] transition-all duration-500 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 font-sans text-sm">
              <div>
                <p className="text-[#666] tracking-widest uppercase mb-4">Location</p>
                <p className="text-[#111]">{displayAddress}</p>
                <p className="text-[#111] mt-1">{displayPhone}</p>
              </div>
              
              <div>
                <p className="text-[#666] tracking-widest uppercase mb-4">Network</p>
                <div className="flex flex-col gap-2">
                  {behanceUrl && (
                    <a href={behanceUrl} target="_blank" rel="noopener noreferrer" className="text-[#111] hover:text-[#888] transition-colors">Behance</a>
                  )}
                  {dribbbleUrl && (
                    <a href={dribbbleUrl} target="_blank" rel="noopener noreferrer" className="text-[#111] hover:text-[#888] transition-colors">Dribbble</a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto mt-24 flex justify-between items-center font-sans text-xs text-[#888] tracking-widest uppercase">
            <span>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}`}</span>
            <span>All Rights Reserved</span>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
