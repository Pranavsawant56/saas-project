import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function GraphicDesignerTemplate3({ data }) {
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

  const displayEmail = contactEmail || "sam@creative.co";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "+44 123 456 789";
  const displayAddress = address || "London, UK";
  const displayName = name || "Sam Creative";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'UI/UX Design', desc: 'Crafting intuitive digital experiences.' },
    { name: 'Illustration', desc: 'Playful and vibrant vector art.' },
    { name: 'Motion Graphics', desc: 'Bringing static designs to life.' }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : [
    { name: 'Pastel Dreams App', desc: 'Mindfulness & Meditation UI.', link: '#' },
    { name: 'Fruity Juice Co.', desc: 'Packaging and brand identity.', link: '#' },
    { name: 'Geometric Posters', desc: 'Exhibition poster series.', link: '#' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Graphic Designer" hideHeader={true} hideFooter={true}>
      <div className="relative scroll-smooth bg-[#fff5f5] text-[#2d3748] min-h-screen font-sans selection:bg-[#ffb6b9] selection:text-white overflow-hidden">

        {/* Dynamic Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#ffe2e2] to-[#ffb6b9] mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#e2f1ff] to-[#b6dfff] mix-blend-multiply filter blur-[100px] opacity-60 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-[#fff0e2] to-[#ffdfb6] mix-blend-multiply filter blur-[100px] opacity-60 animate-blob" style={{ animationDelay: '4s' }}></div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50 p-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center gap-4 px-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white shadow-sm border border-[#ffe2e2]">
                  <Image src={logoUrl} alt={displayName} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex flex-col text-center md:text-left">
                  <h1
                    className="font-extrabold tracking-tight text-[#2d3748]"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '22px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span
                      className="text-[#718096] font-medium text-xs tracking-wider uppercase mt-1"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="flex gap-6 px-4 font-bold text-sm text-[#4a5568]">
              <a href="#about" className="hover:text-[#ffb6b9] transition-colors py-2">About</a>
              <a href="#work" className="hover:text-[#b6dfff] transition-colors py-2">Playground</a>
              <a href="#contact" className="hover:text-[#ffdfb6] transition-colors py-2">Holla</a>
            </nav>
          </div>
        </header>

        <main className="relative z-10 pt-40">
          {/* Hero Section */}
          <section className="px-8 pb-32">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 relative z-20">
                <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white shadow-sm mb-6">
                  <span className="text-[#ffb6b9] font-black mr-2">✦</span>
                  <span className="text-sm font-bold tracking-wider text-[#4a5568] uppercase">Creative Portfolio</span>
                </div>
                <h2
                  className="font-black leading-[1.05] text-[#2d3748] mb-8"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '5rem' }}
                >
                  {heroTitle || "Designing Outside the Lines."}
                </h2>
                <a href="#work" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#2d3748] rounded-full hover:bg-[#ffb6b9] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(45,55,72,0.2)] hover:shadow-[0_15px_30px_rgba(255,182,185,0.4)]">
                  Explore My World
                </a>
              </div>
              <div className="lg:w-1/2 relative z-10 w-full h-[600px]">
                {/* Asymmetric Image Wrapper */}
                <div className="absolute inset-0 bg-[#b6dfff] rounded-[40px] transform rotate-3 scale-95 opacity-50"></div>
                <div className="absolute inset-0 bg-[#ffdfb6] rounded-[40px] transform -rotate-2 scale-100 opacity-50"></div>
                <div className="absolute inset-0 rounded-[40px] overflow-hidden border-4 border-white shadow-xl transform rotate-1 transition-transform hover:rotate-0 duration-500">
                  <Image
                    src={heroImage || "/images/templates/template-img-21.jpg"}
                    alt="Creative Showcase"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32 px-8 relative">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-12 md:p-20 shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-white flex flex-col md:flex-row gap-16 items-center relative overflow-hidden">

                {/* Decorative blob inside card */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ffe2e2] rounded-full filter blur-[40px] opacity-60"></div>

                {aboutImage && (
                  <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative z-10">
                    <div className="absolute inset-0 bg-[#ffb6b9] rounded-full transform -translate-x-4 translate-y-4"></div>
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image src={aboutImage} alt="Profile" fill className="object-cover" />
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  <h2
                    className="text-3xl md:text-4xl font-black text-[#2d3748] mb-6 inline-block relative"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "Who am I?"}
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-[#ffdfb6] -z-10 rounded-full opacity-70 transform -rotate-1"></span>
                  </h2>
                  <div
                    className="text-lg md:text-xl text-[#4a5568] leading-relaxed font-medium"
                    style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                  >
                    <p>{bio || "I blend illustration with functional design to create memorable digital products. My goal is to inject joy and personality into every pixel, proving that usable doesn't have to mean boring."}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="work" className="py-32 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20 relative">
                <h2 className="text-5xl font-black text-[#2d3748] inline-block relative z-10">
                  Recent Artworks
                </h2>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-16 bg-[#b6dfff] opacity-50 blur-xl rounded-full -z-0"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {displayProjects.map((project, idx) => (
                  <a key={idx} href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="group block relative mt-0 md:mt-12 lg:mt-24" style={{ marginTop: idx % 2 !== 0 ? '4rem' : '0' }}>
                    <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-lg border-[6px] border-white transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_rgba(255,182,185,0.3)]">
                      <Image
                        src={project.image || `/images/templates/template-img-${21 - (idx % 3)}.jpg`}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-[#2d3748]/0 group-hover:bg-[#2d3748]/40 transition-colors duration-300"></div>

                      {/* Floating tag */}
                      <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-sm font-bold text-xs text-[#2d3748] transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        View Project
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <h4
                        className="text-xl font-black text-[#2d3748]"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        {project.name}
                      </h4>
                      <p
                        className="text-[#718096] font-medium mt-2"
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

          {/* Skills Section */}
          <section className="py-20 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#2d3748] rounded-[40px] p-12 md:p-20 shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb6b9] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>

                <h3 className="text-3xl font-black mb-16 text-center text-[#ffdfb6]">Magic Tricks</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                  {displayServices.map((service, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
                      <h4
                        className="text-2xl font-bold mb-4 text-white"
                        style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                      >
                        {service.name}
                      </h4>
                      <p
                        className="text-[#e2e8f0] leading-relaxed"
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
        <footer id="contact" className="relative pt-32 pb-16 px-8 z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-6xl md:text-8xl font-black text-[#2d3748] mb-8 tracking-tighter">Let's Play!</h2>
            <p className="text-xl text-[#718096] mb-12 font-medium max-w-2xl mx-auto">Always open to fun projects, weird ideas, and colorful collaborations.</p>

            <a href={`mailto:${displayEmail}`} className="inline-block text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffb6b9] to-[#b6dfff] hover:from-[#b6dfff] hover:to-[#ffdfb6] transition-all duration-500 border-b-4 border-[#ffb6b9] pb-2 mb-20 hover:-translate-y-2">
              {displayEmail}
            </a>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 font-bold text-[#4a5568]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#ffe2e2] flex items-center justify-center text-sm">📍</span>
                {displayAddress}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#e2f1ff] flex items-center justify-center text-sm">📞</span>
                {displayPhone}
              </div>
            </div>

            <div className="mt-16 flex justify-center gap-8">
              {behanceUrl && (
                <a href={behanceUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-white border-2 border-[#2d3748] text-[#2d3748] font-bold hover:bg-[#2d3748] hover:text-white transition-colors shadow-[4px_4px_0px_rgba(45,55,72,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  Behance
                </a>
              )}
              {dribbbleUrl && (
                <a href={dribbbleUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-white border-2 border-[#2d3748] text-[#2d3748] font-bold hover:bg-[#2d3748] hover:text-white transition-colors shadow-[4px_4px_0px_rgba(45,55,72,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  Dribbble
                </a>
              )}
            </div>

            <div className="mt-24 pt-8 border-t border-[#cbd5e0] text-[#718096] font-medium text-sm">
              {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. Made with ♥`}
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
