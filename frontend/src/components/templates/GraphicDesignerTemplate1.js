import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function GraphicDesignerTemplate1({ data }) {
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

  const displayEmail = contactEmail || "hello@alexneon.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "+1 234 567 8900";
  const displayAddress = address || "Los Angeles, CA";
  const displayName = name || "Alex Neon";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Adobe Illustrator', desc: 'Vector graphics & logo design.' },
    { name: 'Photoshop', desc: 'Photo manipulation & retouching.' },
    { name: 'Figma', desc: 'UI/UX design & prototyping.' }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : [
    { name: 'Neon Nights Branding', desc: 'Brand identity for a modern club.', link: '#' },
    { name: 'Synthwave Cover Art', desc: 'Album artwork for an electronic music producer.', link: '#' },
    { name: 'Cyberpunk UI', desc: 'Interface design for a sci-fi indie game.', link: '#' }
  ];

  return (
    <TemplateLayout data={data} theme="dark" category="Graphic Designer" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#ff00ff] selection:text-white">

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#333]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-12 w-36">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <div className="flex flex-col text-center md:text-left">
                  <h1
                    className="font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff]"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '28px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span
                      className="text-[#888] text-xs tracking-[0.2em] uppercase mt-1"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="flex gap-8 text-sm font-bold tracking-widest uppercase text-[#888]">
              <a href="#about" className="hover:text-[#00ffff] hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">About</a>
              <a href="#portfolio" className="hover:text-[#ff00ff] hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all">Work</a>
              <a href="#contact" className="hover:text-[#ffff00] hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)] transition-all">Contact</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center px-6 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ffff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16 relative z-10">
              <div className="w-full md:w-1/2">
                <h2
                  className="font-black leading-[1.1] mb-6 uppercase tracking-tighter"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '72px' }}
                >
                  {heroTitle || "Creating Visual Magic."}
                </h2>
                <div className="flex gap-4 mt-8">
                  <a href="#portfolio" className="bg-[#ff00ff] text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-[#0a0a0a] transition-all hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]">
                    View Portfolio
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.2)] border border-[#333] group">
                  <Image
                    src={heroImage || "/images/templates/template-img-19.jpg"}
                    alt="Hero Portfolio"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ff00ff]/20 to-[#00ffff]/20 mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32 px-6 bg-[#111] relative">
            <div className="max-w-4xl mx-auto text-center">
              {aboutImage && (
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-12 shadow-[0_0_30px_rgba(255,0,255,0.3)] border-2 border-[#ff00ff]">
                  <Image src={aboutImage} alt="Profile" fill className="object-cover" />
                </div>
              )}
              <h2
                className="text-4xl font-black mb-10 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ffff00] to-[#ff00ff]"
                style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
              >
                {aboutUsTitle || "My Journey"}
              </h2>
              <div
                className="text-xl text-[#aaa] leading-relaxed font-light"
                style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
              >
                <p>{bio || "I craft digital experiences with bold colors and striking typography. With a passion for retro-futurism and modern minimalism, I bridge the gap between loud aesthetics and functional design."}</p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-2xl font-bold mb-12 tracking-widest uppercase text-center text-[#888]">Tools of the Trade</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333] hover:border-[#00ffff] transition-colors group">
                    <h4
                      className="text-xl font-black mb-4 group-hover:text-[#00ffff] transition-colors uppercase"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p
                      className="text-[#888] font-light leading-relaxed"
                      style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                    >
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-32 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black mb-16 tracking-tighter uppercase text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                Selected Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProjects.map((project, idx) => (
                  <a key={idx} href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="group block relative aspect-[4/5] rounded-xl overflow-hidden border border-[#222]">
                    <Image
                      src={project.image || `/images/templates/template-img-${19 + (idx % 3)}.jpg`}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform">
                      <h4
                        className="text-2xl font-black mb-2 text-white"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        {project.name}
                      </h4>
                      <p
                        className="text-[#00ffff] font-medium"
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
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-[#111] py-20 px-6 border-t border-[#333]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="md:w-1/3">
              <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter text-white">Let's Talk</h3>
              <p className="text-[#888] mb-8 font-light">Available for freelance opportunities. Let's build something visually stunning together.</p>
              <a href={`mailto:${displayEmail}`} className="inline-block border-2 border-[#ff00ff] text-[#ff00ff] px-6 py-3 font-bold tracking-widest uppercase hover:bg-[#ff00ff] hover:text-white transition-all hover:shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                {displayEmail}
              </a>
            </div>

            <div className="md:w-1/3 flex flex-col gap-4">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#555] mb-2">Contact Details</h4>
              <p className="text-white font-medium">{displayPhone}</p>
              <p className="text-[#888]">{displayAddress}</p>
            </div>

            <div className="md:w-1/3 flex flex-col gap-4">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#555] mb-2">Socials</h4>
              <div className="flex gap-6">
                {behanceUrl && (
                  <a href={behanceUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00ffff] font-bold tracking-widest uppercase text-sm transition-colors">
                    Behance
                  </a>
                )}
                {dribbbleUrl && (
                  <a href={dribbbleUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ff00ff] font-bold tracking-widest uppercase text-sm transition-colors">
                    Dribbble
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#333] text-center text-[#555] text-sm tracking-widest uppercase">
            {footerCopyright || `© ${new Date().getFullYear()} ${displayName}`}
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
