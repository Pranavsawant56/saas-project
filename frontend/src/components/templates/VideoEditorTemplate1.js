import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function VideoEditorTemplate1({ data }) {
  const {
    name,
    tagline,
    heroTitle,
    heroImage,
    heroVideoUrl,
    services,
    projects,
    aboutUsTitle,
    bio,
    aboutImage,
    contactEmail,
    phone,
    address,
    vimeoUrl,
    youtubeUrl,
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

  const displayEmail = contactEmail || "hello@noirfilms.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "+1 555 0192";
  const displayAddress = address || "Los Angeles, CA";
  const displayName = name || "Noir Films";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Color Grading', desc: 'Industry standard color correction using DaVinci Resolve.' },
    { name: 'Visual Effects', desc: 'Compositing and high-end VFX for narrative films.' },
    { name: 'Offline Editing', desc: 'Story-driven creative editing.' }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : [
    { name: 'Midnight Run', desc: 'Lead Editor & Colorist.', link: '#' },
    { name: 'Neon City Commercial', desc: 'VFX & Post-Production.', link: '#' },
    { name: 'Echoes - Short Film', desc: 'Color Grading.', link: '#' }
  ];

  return (
    <TemplateLayout data={data} theme="dark" category="Video Editor" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#050505] text-white min-h-screen font-sans selection:bg-[#ff2a5f] selection:text-white">

        {/* Header */}
        <header className=" top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#222]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-10 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col text-center md:text-left">
                  <h1
                    className="font-black tracking-[0.1em] uppercase text-white"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '24px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span
                      className="text-[#ff2a5f] font-bold text-[10px] tracking-[0.3em] uppercase mt-1"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="flex gap-8 text-[11px] font-black tracking-[0.2em] uppercase text-[#888]">
              <a href="#work" className="hover:text-white transition-colors relative group">
                Reels
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#ff2a5f] transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" className="hover:text-white transition-colors relative group">
                Studio
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#ff2a5f] transition-all group-hover:w-full"></span>
              </a>
              <a href="#contact" className="hover:text-white transition-colors relative group">
                Booking
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#ff2a5f] transition-all group-hover:w-full"></span>
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-[#222]">
            {/* Background */}
            <div className="absolute inset-0 z-0">
              {heroVideoUrl ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-40"
                  src={heroVideoUrl}
                />
              ) : (
                <Image
                  src={heroImage || "/images/templates/template-img-22.jpg"}
                  alt="Hero Background"
                  fill
                  className="object-cover opacity-30 grayscale"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50"></div>
              {/* Cinematic Letterbox effect */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-black z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-10"></div>
            </div>

            <div className="relative z-20 text-center px-6 max-w-5xl">
              <div className="mb-6 flex justify-center items-center gap-3">
                <div className="w-12 h-[1px] bg-[#ff2a5f]"></div>
                <span className="text-[#ff2a5f] uppercase tracking-[0.4em] text-[10px] font-bold">Post Production</span>
                <div className="w-12 h-[1px] bg-[#ff2a5f]"></div>
              </div>
              <h2
                className="font-black leading-[1.1] mb-8 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#888]"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '7vw' }}
              >
                {heroTitle || "Crafting Visual Stories."}
              </h2>
              <a href="#work" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-[#ff2a5f] hover:text-white transition-all duration-300">
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center">▶</span>
                Play Showreel
              </a>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="work" className="py-32 px-6 bg-[#0a0a0a]">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">Featured Work</h3>
                  <p className="text-[#666] mt-2 font-medium tracking-wide">Selected grades, edits, and VFX sequences.</p>
                </div>
                <div className="text-[#ff2a5f] font-bold tracking-[0.2em] text-xs uppercase">
                  Swipe / Scroll →
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((project, idx) => (
                  <a key={idx} href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="group block relative aspect-video bg-[#111] overflow-hidden border border-[#222]">
                    <Image
                      src={project.image || `/images/templates/template-img-${22 + (idx % 3)}.jpg`}
                      alt={project.name}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#ff2a5f]/90 backdrop-blur flex items-center justify-center text-white pl-1">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <p
                        className="text-[#ff2a5f] text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                        style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}
                      >
                        {project.desc}
                      </p>
                      <h4
                        className="text-xl font-black text-white uppercase tracking-tight"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        {project.name}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* About & Services */}
          <section id="about" className="py-32 px-6 border-t border-[#222] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff2a5f] rounded-full mix-blend-screen filter blur-[150px] opacity-10 transform -translate-y-1/2"></div>

            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                {aboutImage ? (
                  <div className="relative aspect-[4/5] w-full border border-[#333] p-2 bg-[#0a0a0a]">
                    <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                      <Image src={aboutImage} alt="Studio" fill className="object-cover" />
                    </div>
                    {/* Decorative UI elements */}
                    <div className="absolute top-6 right-6 text-[#ff2a5f] font-mono text-xs">REC •</div>
                    <div className="absolute bottom-6 left-6 text-[#666] font-mono text-xs">TC 01:23:45:12</div>
                  </div>
                ) : (
                  <h2
                    className="text-5xl font-black uppercase tracking-tighter"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "The Director's Cut"}
                  </h2>
                )}
              </div>

              <div className="lg:w-1/2 relative z-10">
                {aboutImage && (
                  <h2
                    className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "The Studio"}
                  </h2>
                )}
                <div
                  className="text-lg text-[#aaa] leading-relaxed font-light mb-16"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  <p>{bio || "Specializing in high-end post-production, color grading, and visual effects for commercial and narrative films. We transform raw footage into cinematic masterpieces."}</p>
                </div>

                <div className="space-y-8">
                  {displayServices.map((service, idx) => (
                    <div key={idx} className="group border-l-2 border-[#333] hover:border-[#ff2a5f] pl-6 transition-colors">
                      <h4
                        className="text-xl font-bold uppercase tracking-widest text-white mb-2 group-hover:text-[#ff2a5f] transition-colors"
                        style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                      >
                        {service.name}
                      </h4>
                      <p
                        className="text-[#666] font-medium"
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
        <footer id="contact" className="bg-[#050505] border-t border-[#222] py-24 px-6 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
            <div className="md:w-1/2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff2a5f] mb-4">Start a Project</h3>
              <a href={`mailto:${displayEmail}`} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white hover:text-[#ff2a5f] transition-colors">
                Let's Edit.
              </a>
            </div>

            <div className="md:w-1/2 flex flex-col sm:flex-row gap-12 sm:gap-24">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#666] mb-6">Contact</p>
                <div className="space-y-4 font-medium text-[#ccc]">
                  <p>{displayEmail}</p>
                  <p>{displayPhone}</p>
                  <p>{displayAddress}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#666] mb-6">Social</p>
                <div className="flex flex-col gap-4 font-bold uppercase tracking-widest text-xs">
                  {vimeoUrl && (
                    <a href={vimeoUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ff2a5f] transition-colors">Vimeo</a>
                  )}
                  {youtubeUrl && (
                    <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ff2a5f] transition-colors">YouTube</a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto mt-24 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#444] border-t border-[#222] pt-8">
            <span>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}`}</span>
            <span>All Systems Go</span>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
