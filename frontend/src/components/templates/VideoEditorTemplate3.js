import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function VideoEditorTemplate3({ data }) {
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
    vimeoUrl,
    linkedinUrl,
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

  const displayEmail = contactEmail || "hello@frameworks.tv";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "+1 800 123 4567";
  const displayAddress = address || "New York, NY";
  const displayName = name || "FRAMEWORKS";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Commercial Production', desc: 'End-to-end video solutions for global brands.' },
    { name: 'Motion Graphics', desc: '2D & 3D animation to elevate your visual identity.' },
    { name: 'Post-Production', desc: 'Editing, color grading, and final delivery.' },
    { name: 'Creative Direction', desc: 'Concept development and pre-production planning.' }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : [
    { name: 'Nike - Urban Run', desc: 'National TV Campaign', link: '#' },
    { name: 'Audi - The Drive', desc: 'Digital & Social Content', link: '#' },
    { name: 'TechCon 2024', desc: 'Event Highlight Reel', link: '#' },
    { name: 'Vogue - Summer', desc: 'Fashion Editorial Video', link: '#' }
  ];

  return (
    <TemplateLayout data={data} theme="dark" category="Video Editor" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#0f1115] text-[#f1f5f9] min-h-screen font-sans selection:bg-[#38bdf8] selection:text-white">

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0f1115]/95 backdrop-blur-md border-b border-[#1e222a]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-8 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1 
                    className="font-black tracking-[0.2em] uppercase text-white"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '20px' }}
                  >
                    {displayName}
                  </h1>
                </div>
              )}
            </div>
            
            <nav className="flex gap-8 lg:gap-12 text-[10px] font-bold tracking-[0.25em] uppercase text-[#64748b]">
              <a href="#work" className="hover:text-white transition-colors">Work</a>
              <a href="#studio" className="hover:text-white transition-colors">Studio</a>
              <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
              <a href="#contact" className="hover:text-[#38bdf8] transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative px-6 lg:px-12 pt-24 pb-32 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-end">
              <div className="lg:w-7/12">
                {tagline && (
                  <p 
                    className="text-[#38bdf8] font-bold text-[10px] tracking-[0.3em] uppercase mb-8"
                    style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                  >
                    {tagline}
                  </p>
                )}
                <h2 
                  className="font-light leading-[1.05] tracking-tight text-white"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '5vw' }}
                >
                  {heroTitle || "We build visual experiences."}
                </h2>
              </div>
              <div className="lg:w-5/12 pb-4">
                <p className="text-[#64748b] text-lg font-light leading-relaxed mb-8">
                  {bio || "A full-service production house delivering end-to-end video solutions for global brands."}
                </p>
                <a href="#work" className="group inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-[#38bdf8] transition-colors">
                  View Showreel
                  <span className="w-12 h-[1px] bg-[#38bdf8] group-hover:w-20 transition-all duration-300"></span>
                </a>
              </div>
            </div>

            <div className="mt-20 relative aspect-[21/9] w-full overflow-hidden bg-[#1e222a]">
              <Image 
                src={heroImage || "/images/templates/template-img-24.jpg"} 
                alt="Hero Production" 
                fill 
                className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                priority
              />
            </div>
          </section>

          {/* Featured Work Grid */}
          <section id="work" className="px-6 lg:px-12 py-32 border-t border-[#1e222a] bg-[#0b0c0e]">
            <div className="max-w-[1600px] mx-auto">
              <div className="mb-20 flex justify-between items-end">
                <h3 className="text-3xl font-light tracking-tight text-white">Featured Projects</h3>
                <span className="text-[#64748b] text-[10px] tracking-[0.2em] uppercase">2023 — 2024</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
                {displayProjects.map((project, idx) => (
                  <a key={idx} href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-[#1e222a]">
                      <Image 
                        src={project.image || `/images/templates/template-img-${16 + (idx % 6)}.jpg`}
                        alt={project.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#0f1115]/40 backdrop-blur-sm">
                        <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase border border-white/20 px-6 py-3 rounded-full bg-white/5">
                          Play Video
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-[#1e222a] pt-4">
                      <h4 
                        className="text-lg font-medium text-white tracking-tight"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        {project.name}
                      </h4>
                      <p 
                        className="text-[#64748b] text-sm font-light"
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

          {/* Studio & Capabilities */}
          <section id="studio" className="px-6 lg:px-12 py-32 border-t border-[#1e222a]">
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-20">
              <div className="lg:w-5/12">
                <h3 
                  className="text-4xl font-light tracking-tight text-white mb-8"
                  style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                >
                  {aboutUsTitle || "The Studio"}
                </h3>
                {aboutImage && (
                  <div className="relative aspect-[3/4] w-full bg-[#1e222a] mb-8">
                    <Image src={aboutImage} alt="Studio" fill className="object-cover grayscale" />
                  </div>
                )}
              </div>
              
              <div className="lg:w-7/12 flex flex-col justify-between">
                <div 
                  className="text-2xl lg:text-3xl font-light leading-relaxed text-[#94a3b8] mb-20"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  <p>{bio || "A full-service production house delivering end-to-end video solutions for global brands. We merge strategic thinking with high-end execution."}</p>
                </div>

                <div id="capabilities" className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                  {displayServices.map((service, idx) => (
                    <div key={idx} className="border-t border-[#1e222a] pt-6 group">
                      <span className="text-[#38bdf8] text-[10px] font-bold tracking-[0.2em] mb-4 block">0{idx + 1}</span>
                      <h4 
                        className="text-xl font-medium text-white mb-4 group-hover:text-[#38bdf8] transition-colors"
                        style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                      >
                        {service.name}
                      </h4>
                      <p 
                        className="text-[#64748b] font-light leading-relaxed"
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
        <footer id="contact" className="border-t border-[#1e222a] bg-[#0b0c0e]">
          <div className="px-6 lg:px-12 py-32 max-w-[1600px] mx-auto">
            <h2 className="text-5xl lg:text-8xl font-light tracking-tighter text-white mb-20">
              Got a project? <br />
              <a href={`mailto:${displayEmail}`} className="text-[#38bdf8] hover:text-white transition-colors">
                Let's talk.
              </a>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#1e222a] pt-16">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748b] mb-6">New Business</p>
                <div className="text-white font-medium space-y-2">
                  <p>{displayEmail}</p>
                  <p>{displayPhone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748b] mb-6">Headquarters</p>
                <div className="text-white font-medium">
                  <p>{displayAddress}</p>
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748b] mb-6">Socials</p>
                <div className="flex gap-6 text-white font-medium">
                  {vimeoUrl && <a href={vimeoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#38bdf8] transition-colors">Vimeo</a>}
                  {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#38bdf8] transition-colors">LinkedIn</a>}
                  <a href="#" className="hover:text-[#38bdf8] transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-12 py-8 border-t border-[#1e222a] flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748b]">
            <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}`}</p>
            <p className="mt-4 md:mt-0">Website by <span className="text-white">TechUnik</span></p>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
