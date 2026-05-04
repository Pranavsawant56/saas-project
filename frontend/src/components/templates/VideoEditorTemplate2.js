import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function VideoEditorTemplate2({ data }) {
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
    youtubeUrl,
    instagramUrl,
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

  const displayEmail = contactEmail || "hello@alexvance.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "123-456-7890";
  const displayAddress = address || "Austin, TX";
  const displayName = name || "Alex Vance";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Premiere Pro', desc: 'Fast, dynamic editing for engaging YouTube content.' },
    { name: 'After Effects', desc: 'Motion graphics, lower thirds, and cool transitions.' },
    { name: 'Sound Design', desc: 'Crisp audio mixing and sound effect overlays.' }
  ];

  const displayProjects = projects && projects.length > 0 ? projects : [
    { name: 'My 2024 Desk Setup', desc: 'Tech review and cinematic b-roll.', link: '#' },
    { name: 'A Day in the Life', desc: 'Vlog style with dynamic cuts.', link: '#' },
    { name: 'Camera Review: Sony A7IV', desc: 'Studio lighting and product shots.', link: '#' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Video Editor" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-[#f8fafc] text-slate-900 min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-violet-400/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Header - Glassmorphism */}
        <header className="sticky top-4 z-50 mx-4 md:mx-8">
          <div className="max-w-6xl mx-auto px-6 py-4 bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl flex justify-between items-center">
            <div className="flex items-center gap-4">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                  <Image src={logoUrl} alt={displayName} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <h1 
                    className="font-black tracking-tight text-slate-900"
                    style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '20px' }}
                  >
                    {displayName}
                  </h1>
                  {tagline && (
                    <span 
                      className="text-indigo-500 font-bold text-[10px] tracking-wider uppercase mt-0.5"
                      style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                    >
                      {tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
              <a href="#videos" className="hover:text-indigo-600 transition-colors">Latest Videos</a>
              <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#gear" className="hover:text-indigo-600 transition-colors">Gear & Skills</a>
            </nav>
            <a href="#contact" className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors shadow-lg shadow-slate-900/20">
              Subscribe
            </a>
          </div>
        </header>

        <main className="relative z-10 pt-16">
          {/* Hero Section */}
          <section className="px-4 md:px-8 pb-24">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <div className="inline-block px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
                  <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    New Video Out Now
                  </span>
                </div>
                <h2 
                  className="font-black leading-[1.1] text-slate-900 mb-6 tracking-tight"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '4.5rem' }}
                >
                  {heroTitle || "Telling stories through the lens."}
                </h2>
                <div className="flex gap-4 items-center">
                  <a href={youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl transition-all shadow-[0_8px_20px_rgba(225,29,72,0.3)] hover:-translate-y-1 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    Watch Channel
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2 w-full relative">
                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image 
                    src={heroImage || "/images/templates/template-img-23.jpg"} 
                    alt="Hero Video Thumbnail" 
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-center justify-center group cursor-pointer">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-600 transition-all duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Videos Grid Section */}
          <section id="videos" className="py-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Latest Uploads</h3>
                <a href={youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline">View All →</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayProjects.map((project, idx) => (
                  <a key={idx} href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="group bg-white p-3 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 block">
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-4 bg-slate-100">
                      <Image 
                        src={project.image || `/images/templates/template-img-${23 + (idx % 2)}.jpg`}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-md">
                        10:24
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h4 
                        className="text-lg font-bold text-slate-900 mb-1 line-clamp-2"
                        style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                      >
                        {project.name}
                      </h4>
                      <p 
                        className="text-slate-500 text-sm line-clamp-2"
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

          {/* About Section */}
          <section id="about" className="py-24 px-4 md:px-8 bg-indigo-900 text-white rounded-[3rem] mx-4 md:mx-8 mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 opacity-30">
               <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-rose-500 rounded-full mix-blend-screen filter blur-[100px]"></div>
               <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px]"></div>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/3">
                {aboutImage ? (
                  <div className="relative aspect-square w-full rounded-full border-4 border-white/20 overflow-hidden shadow-2xl">
                    <Image src={aboutImage} alt="Profile" fill className="object-cover" />
                  </div>
                ) : (
                  <h2 
                    className="text-4xl font-black tracking-tight"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "Meet Alex"}
                  </h2>
                )}
              </div>
              <div className="md:w-2/3">
                {aboutImage && (
                  <h2 
                    className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
                    style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                  >
                    {aboutUsTitle || "Meet Alex"}
                  </h2>
                )}
                <div 
                  className="text-xl text-indigo-100 leading-relaxed font-medium"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  <p>{bio || "I create engaging tech and lifestyle videos with a focus on high-quality cinematography. What started as a small hobby has grown into a community of amazing people who love tech as much as I do."}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Gear / Skills */}
          <section id="gear" className="py-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">My Toolkit</h3>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto">The software and skills I use to bring my videos to life.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
                      🎥
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
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-white border-t border-slate-100 py-16 px-4 md:px-8 mt-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-2">{displayName}</h3>
              <p className="text-slate-500 text-sm font-medium">{displayEmail}</p>
            </div>

            <div className="flex gap-4">
              {youtubeUrl && (
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors text-slate-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors text-slate-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-100 text-center text-sm font-medium text-slate-400">
            {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
