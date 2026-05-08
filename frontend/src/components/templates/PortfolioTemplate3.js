import TemplateLayout from "./TemplateLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function PortfolioTemplate3({ data }) {
  const {
    heroTitle,
    name,
    role,
    bio,
    avatarUrl,
    service1_name, service1_desc,
    service2_name, service2_desc,
    service3_name, service3_desc,
    service4_name, service4_desc,
    aboutUsTitle,
    aboutImage,
    nameFontSize,
    heroTitleFontSize,
    roleFontSize,
    bioFontSize,
    services: dynamicServices,
    projects: dynamicProjects,
    phone,
    countryCode,
    email,
    linkedinUrl,
    githubUrl,
  } = data || {};

  const displayServices = dynamicServices || [
    { name: service1_name || 'UI/UX Design', desc: service1_desc || 'Crafting immersive digital experiences with a focus on human-centric design.', icon: '✨' },
    { name: service2_name || 'Creative Dev', desc: service2_desc || 'Building high-performance applications with cutting-edge technologies.', icon: '🚀' },
    { name: service3_name || 'Brand Strategy', desc: service3_desc || 'Defining unique identities that stand out in the digital landscape.', icon: '🎨' },
    { name: service4_name || '3D Motion', desc: service4_desc || 'Bringing interfaces to life with fluid animations and 3D elements.', icon: '🌪️' },
  ].filter(s => s.name);

  const displayProjects = dynamicProjects || [
    { name: data?.project1_name || 'Cyber-Nexus', desc: data?.project1_desc || 'A decentralized finance dashboard with real-time analytics.', image: '/images/templates/template-img-11.jpg', color: 'from-cyan-500 to-blue-600' },
    { name: data?.project2_name || 'Aura Mobile', desc: data?.project2_desc || 'Wellness tracking app with bio-feedback integration.', image: '/images/templates/template-img-12.jpg', color: 'from-purple-500 to-pink-600' },
    { name: data?.project3_name || 'Vortex Web3', desc: data?.project3_desc || 'Exploratory NFT marketplace for digital architects.', image: '/images/templates/template-img-21.jpg', color: 'from-amber-400 to-orange-600' },
  ].filter(p => p.name);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-fuchsia-500 selection:text-white overflow-x-hidden">

        {/* Glow Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[150px] rounded-full animate-bounce duration-[10s]" />
          <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>

        {/* Floating Glass Header */}
        <header className="w-full z-[100] px-6 py-8 flex justify-center">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex justify-between items-center shadow-2xl w-full max-w-5xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-fuchsia-500 rounded-lg rotate-12" />
              <span
                className="text-lg font-black tracking-tighter uppercase"
                style={{ fontSize: nameFontSize ? `${nameFontSize}px` : undefined }}
              >
                {name || "Aura"}
              </span>
            </div>
            <nav className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/50">
              {['Home', 'About', 'Work', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
              ))}
            </nav>
            <a href="#contact" className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              Hire Me
            </a>
          </div>
        </header>

        <main className="relative z-10">
          {/* Hero - Cinematic & Multi-colored */}
          <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
            <div className="text-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">
                  Available for worldwide projects
                </span>
              </motion.div>

              <h1
                className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tight mb-12 bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
              >
                {heroTitle || "Visualizing Future Concepts."}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-20">
                <div className="text-left md:border-l border-white/10 md:pl-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">My Identity</p>
                  <p className="text-xl font-bold">{name || "Alex Rivers"}</p>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 p-1 bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-amber-400 rounded-full">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <Image src={avatarUrl || "/images/templates/template-img-50.jpg"} alt="Avatar" fill className="object-cover" />
                    </div>
                  </div>
                </div>
                <div className="text-right md:border-r border-white/10 md:pr-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">My Domain</p>
                  <p className="text-xl font-bold" style={{ fontSize: roleFontSize ? `${roleFontSize}px` : undefined }}>{role || "Fullstack Creator"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* About - Bento Grid Layout */}
          <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Bio Box */}
              <div className="lg:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-12 flex flex-col justify-between">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-white/40 mb-12">{aboutUsTitle || "The Philosophy"}</h2>
                <p
                  className="text-3xl md:text-5xl font-bold leading-tight tracking-tight"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  {bio || "I bridge the gap between imagination and execution, creating digital artifacts that resonate with human intuition."}
                </p>
                <div className="mt-20 flex gap-4">
                  {['React', 'Next.js', 'Framer', 'Three.js'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-cyan-400 border border-cyan-400/20">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Image Box */}
              <div className="lg:col-span-4 aspect-square lg:aspect-auto relative rounded-[2.5rem] overflow-hidden group">
                <Image src={aboutImage || "/images/templates/template-img-49.jpg"} alt="Studio" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Office</p>
                  <p className="text-sm font-bold">Studio Noir</p>
                </div>
              </div>
            </div>
          </section>

          {/* Services - Grid with Color Highlights */}
          <section id="skills" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white/20">Capabilities.</h3>
              <div className="h-px flex-1 bg-white/10 hidden md:block mb-8"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8">Expertise 2024</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayServices.map((service, idx) => (
                <div key={idx} className="group p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all duration-500">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-fuchsia-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-fuchsia-500/20">
                      {service.icon}
                    </div>
                    <span className="text-4xl font-black text-white/5 italic">0{idx + 1}</span>
                  </div>
                  <h4 className="text-3xl font-black mb-6 group-hover:text-cyan-400 transition-colors uppercase italic tracking-tighter">{service.name}</h4>
                  <p className="text-white/50 leading-relaxed font-medium">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Work - Featured Gallery */}
          <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="mb-20">
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white/20">Gallery.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayProjects.map((project, idx) => (
                <div key={idx} className={`relative group overflow-hidden rounded-[3rem] ${idx === 0 ? 'md:col-span-2' : ''}`}>
                  <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[600px] w-full overflow-hidden">
                    <Image src={project.image || "/images/templates/template-img-11.jpg"} alt={project.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <div className={`w-12 h-1 bg-gradient-to-r ${project.color} mb-6`} />
                    <h4 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase">{project.name}</h4>
                    <p className="text-white/60 text-lg md:text-xl font-medium max-w-md italic mb-8">{project.desc}</p>
                    <button className="self-start px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Explore Case</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA - Bold Contact */}
          <section id="contact" className="py-60 px-6 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/20 blur-[150px] rounded-full" />
            <div className="relative z-10">
              <h3 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic mb-12">Start a<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400">Revolution.</span></h3>
              <p className="text-xl md:text-2xl text-white/50 font-medium mb-20 max-w-2xl mx-auto italic">
                Currently open for high-impact collaborations and disruptive digital solutions.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Send an inquiry</p>
                  <a href={`mailto:${email}`} className="text-3xl font-bold hover:text-cyan-400 transition-colors">{email || "hello@aura.com"}</a>
                </div>
                <div className="w-px h-16 bg-white/10 hidden md:block" />
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Connect online</p>
                  <div className="flex gap-8 text-xl font-bold">
                    <a href={linkedinUrl} className="hover:text-fuchsia-400 transition-colors italic">LinkedIn</a>
                    <a href={githubUrl} className="hover:text-amber-400 transition-colors italic">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-20 px-6 border-t border-white/5 text-center">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
            <span>© {new Date().getFullYear()} / {name || "Aura"} Creative Group</span>
            <div className="flex gap-8">
              <span className="text-cyan-400/40">Privacy</span>
              <span className="text-fuchsia-400/40">Security</span>
              <span className="text-amber-400/40">Terms</span>
            </div>
            <span>Built with Soul & Code</span>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
