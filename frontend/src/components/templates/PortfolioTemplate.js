import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function PortfolioTemplate({ data }) {
  const {
    heroTitle,
    name,
    role,
    bio,
    avatarUrl,
    service1_name, service1_image, service1_desc,
    service2_name, service2_image, service2_desc,
    service3_name, service3_image, service3_desc,
    service4_name, service4_image, service4_desc,
    nameFontSize,
    heroTitleFontSize,
    roleFontSize,
    skills, // legacy
    aboutUsTitle,
    aboutImage,
    email,
    linkedinUrl,
    githubUrl,
    service1_nameFontSize, service1_descFontSize,
    service2_nameFontSize, service2_descFontSize,
    service3_nameFontSize, service3_descFontSize,
    service4_nameFontSize, service4_descFontSize,
    project1_nameFontSize, project1_descFontSize,
    project2_nameFontSize, project2_descFontSize,
    project3_nameFontSize, project3_descFontSize,
    bioFontSize,
    services,
    projects,
  } = data || {};

  const displayServices = services || [
    { name: service1_name || 'UI/UX Design', desc: service1_desc, image: service1_image, nameFontSize: service1_nameFontSize, descFontSize: service1_descFontSize },
    { name: service2_name || 'Web Development', desc: service2_desc, image: service2_image, nameFontSize: service2_nameFontSize, descFontSize: service2_descFontSize },
    { name: service3_name || 'Brand Strategy', desc: service3_desc, image: service3_image, nameFontSize: service3_nameFontSize, descFontSize: service3_descFontSize },
    { name: service4_name || 'Cloud Arch', desc: service4_desc, image: service4_image, nameFontSize: service4_nameFontSize, descFontSize: service4_descFontSize },
  ].filter(s => s.name);

  const displayProjects = projects || [
    { name: data?.project1_name || 'Project Alpha', desc: data?.project1_desc || 'Modern Web Application', image: data?.project1_image, link: data?.project1_link, nameFontSize: project1_nameFontSize, descFontSize: project1_descFontSize },
    { name: data?.project2_name || 'Project Beta', desc: data?.project2_desc || 'UI/UX Revamp', image: data?.project2_image, link: data?.project2_link, nameFontSize: project2_nameFontSize, descFontSize: project2_descFontSize },
    { name: data?.project3_name, desc: data?.project3_desc, image: data?.project3_image, link: data?.project3_link, nameFontSize: project3_nameFontSize, descFontSize: project3_descFontSize },
  ].filter(p => p.name);

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-slate-950 text-white min-h-screen flex flex-col">

        {/* Unique Header for Portfolio 1 */}
        <header className="sticky top-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-slate-950/70 border-b border-indigo-500/10">
          <div
            className="text-2xl font-black tracking-tighter hover:text-indigo-400 transition-colors cursor-default"
            style={{ fontSize: nameFontSize ? `${nameFontSize}px` : undefined }}
          >
            {name?.split(' ')[0] || "PRO"}
            <span className="text-indigo-500">.</span>
          </div>
          <nav className="hidden md:flex gap-10 items-center">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                {item}
              </a>
            ))}
            <button className="bg-indigo-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
              Hire Me
            </button>
          </nav>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section id="home" className="py-32 px-8 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

            <div className="relative w-44 h-44 rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 to-purple-500 mb-10 shadow-2xl shadow-indigo-500/30">
              <Image
                src={avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"}
                alt={`${name || "User"}'s profile picture`}
                fill
                className="object-cover rounded-full border-4 border-slate-950"
              />
            </div>

            <h1
              className="text-7xl font-black mb-6 tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent"
              style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
            >
              {heroTitle || name || "Your Name"}
            </h1>
            <p
              className="text-2xl text-indigo-400 font-bold mb-10 uppercase tracking-[0.25em]"
              style={{ fontSize: roleFontSize ? `${roleFontSize}px` : undefined }}
            >
              {role || "Visual Designer & Developer"}
            </p>
            <div className="max-w-2xl text-slate-400 text-xl font-light leading-relaxed mb-12 italic">
              &quot;{bio || "I craft high-performance, beautiful digital experiences that help businesses stand out in the crowded digital landscape."}&quot;
            </div>

            <div className="flex gap-6">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-500/30">
                Start Project
              </button>
              <button className="bg-slate-800/80 hover:bg-slate-700 text-white px-10 py-4 border border-slate-700/50 rounded-full font-black uppercase tracking-widest text-xs transition-all">
                Portfolio
              </button>
            </div>
          </section>

          {/* Skills/Services Section */}
          <section id="skills" className="py-12 px-8 bg-slate-900/30 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-8">
                <div>
                  <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] mb-4 text-xs">Expertise</h2>
                  <h3 className="text-5xl font-black text-white tracking-tight">Capabilities</h3>
                </div>
                <p className="text-slate-400 max-w-md text-lg font-light italic">
                  &ldquo;Excellence is not an act, but a habit. I bring technical mastery to every pixel.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayServices.map((service, index) => (
                  <div key={index} className="bg-slate-900/50 p-10 rounded-3xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 blur-2xl rounded-full" />
                    <div className="relative w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 transition-all duration-500 rotate-3 group-hover:rotate-12 group-hover:scale-110 overflow-hidden">
                      {service.image ? <Image src={service.image} alt={service.name} fill className="object-cover rounded-xl" /> : <span className="text-2xl">⚡</span>}
                    </div>
                    <h4
                      className="text-2xl font-bold mb-4 text-white tracking-tight"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p
                      className="text-slate-500 text-sm leading-relaxed font-medium"
                      style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                    >
                      {service.desc || `Delivering high-end solutions through advanced ${service.name.toLowerCase()} architectures.`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-12 px-8 scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-6">
                <span className="text-indigo-500 font-black uppercase tracking-[0.5em] text-[10px] bg-indigo-500/5 px-4 py-1 rounded-full border border-indigo-500/20 mb-6 inline-block">Work</span>
                <h3 className="text-3xl font-black text-white tracking-tighter italic">Signature Projects</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayProjects.map((project, index) => (
                  <a
                    key={index}
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block rounded-[2.5rem] overflow-hidden border border-slate-800/50 transition-all hover:scale-[1.01]"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                      {project.image ? (
                        <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-800 font-black text-4xl italic">0{index + 1}</div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                      <div>
                        <h4
                          className="text-3xl font-black text-white mb-2 tracking-tighter italic group-hover:translate-x-2 transition-transform"
                          style={{ fontSize: project.nameFontSize ? `${project.nameFontSize}px` : undefined }}
                        >
                          {project.name}
                        </h4>
                        <p
                          className="text-indigo-400 font-bold text-xs uppercase tracking-widest"
                          style={{ fontSize: project.descFontSize ? `${project.descFontSize}px` : undefined }}
                        >
                          {project.desc}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-all">
                        ↗
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-12 px-8 bg-slate-900/30 scroll-mt-24">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-indigo-600 blur-[80px] rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
                <Image
                  src={aboutImage || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"}
                  alt="About Us section representation"
                  fill
                  className="object-cover rounded-3xl shadow-2xl z-10 border border-white/5"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] mb-6 text-xs">Origin</h2>
                <h3 className="text-2xl font-light italic mb-6 leading-tight">
                  {aboutUsTitle || "Mastering the intersection of art and digital engineering."}
                </h3>
                <p
                  className="text-slate-400 text-lg font-light leading-relaxed mb-4 italic border-l-2 border-indigo-600/30 pl-8"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  {bio || "I am a dedicated designer and engineer with a focus on creating digital landmarks that push the boundaries of what's possible."}
                </p>
                <div className="flex gap-8">
                  <div>
                    <div className="text-3xl font-black text-white mb-2 italic">05<span className="text-indigo-600 text-xl italic">+</span></div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500">Years Experience</span>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white mb-2 italic text-nowrap">120<span className="text-indigo-600 text-xl italic">+</span></div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500">Creative Solves</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-20 px-8 border-t border-slate-900 bg-slate-950 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="max-w-4xl mx-auto">
            <h4 className="text-3xl font-black italic mb-8 tracking-tighter">Let&apos;s build something <span className="text-indigo-500">legendary.</span></h4>
            <div className="flex justify-center gap-12 mb-12">
              {email && <a href={`mailto:${email}`} className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Email</a>}
              {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">LinkedIn</a>}
              {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">GitHub</a>}
            </div>
            <p className="text-slate-600 text-[10px] uppercase tracking-[0.5em]">
              © {new Date().getFullYear()} {name || "PRO"} • Crafted for Excellence
            </p>
          </div>
        </footer>

        <div id="contact" />
      </div>
    </TemplateLayout>
  );
}

