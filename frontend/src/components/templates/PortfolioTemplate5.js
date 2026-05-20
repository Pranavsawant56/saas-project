import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const HoloCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`relative group bg-purple-950/10 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 sm:p-8 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500 ${className}`}
  >
    {/* Corner Brackets */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

    {/* Content */}
    <div className="relative z-10">{children}</div>

    {/* Scanline Effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-full w-full -translate-y-full group-hover:animate-scanline pointer-events-none" />
  </motion.div>
);

const GlitchText = ({ text }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -z-10 text-pink-500 translate-x-[2px] opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1 transition-opacity">{text}</span>
    <span className="absolute top-0 left-0 -z-10 text-cyan-400 -translate-x-[2px] opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2 transition-opacity">{text}</span>
  </span>
);

export default function PortfolioTemplate5({ data }) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    name = "V",
    navbarType = "Text",
    navFontSize = 20,
    logoUrl = "",
    heroTitle = "CONNECTING TO THE FUTURE...",
    heroSubtitle = "Neuro-Interface Architect",
    heroDescription = "I build the bridge between the physical and digital void. Specialized in neural network visualization and high-frequency UI.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "THE NEURAL MANIFESTO",
    aboutBio = "I build the bridge between the physical and digital void. Specialized in neural network visualization and high-frequency UI. My manifesto is simple: evolve or be deleted.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "v@nightcity.io",
    aboutPhone = "+1 777 000 7777",
    aboutLocation = "Night City",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "v@nightcity.io",
    phone = "+1 777 000 7777",
    githubUrl = "#",
    linkedinUrl = "#",
    footerCopyright = ""
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const defaultProjects = [
    { name: "Night City OS", desc: "Real-time municipal data visualization and control grid.", image: "/images/templates/template-img-11.jpg", link: "#" },
    { name: "Neural-Link Hub", desc: "Decentralized interface for high-bandwidth bio-data streams.", image: "/images/templates/template-img-12.jpg", link: "#" },
    { name: "Ice-Breaker X", desc: "Advanced security bypass and intrusion detection suite.", image: "/images/templates/template-img-21.jpg", link: "#" }
  ];

  const defaultSkills = [
    { category: "Direct_Interface", items: "Three.js, WebGL, GLSL, Shaders" },
    { category: "Neural_Systems", items: "React, Next.js, Node.js, Rust" },
    { category: "Deep_Web", items: "GraphQL, PostgreSQL, Redis, Docker" }
  ];

  const defaultExperience = [
    { role: "Cyber-Architect", company: "Arasaka", period: "2077 - 2080", desc: "Designed global neural grid systems for high-priority assets." },
    { role: "Protocol Lead", company: "Militech", period: "2074 - 2077", desc: "Optimized offensive security protocols for distributed networks." }
  ];

  const defaultServices = [
    { title: "Neuro-Design", desc: "Crafting interfaces that resonate with neural pattern activity.", icon: "🧠" },
    { title: "Ice Breaking", desc: "Deep-layer security penetration and architecture auditing.", icon: "🧊" },
    { title: "Grid Ops", desc: "Scaling high-frequency digital ecosystems across the net.", icon: "🌐" }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#0a0510] text-cyan-400 font-mono selection:bg-pink-500 selection:text-white overflow-x-hidden">

        {/* Dynamic Mouse Glow */}
        <div
          className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
          }}
        />

        {/* Scanline & Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-flicker" />

        {/* Futuristic Navbar */}
        <nav className={`sticky top-0 left-0 right-0 z-[110] px-4 sm:px-6 md:px-12 py-6 flex justify-center transition-all duration-500 ${isScrolled ? "bg-[#0a0510]/80 backdrop-blur-xl border-b border-cyan-500/20 py-4" : "bg-transparent"}`}>
          <div className="max-w-7xl w-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={40} height={40} className="border border-pink-500 rounded-tr-xl rounded-bl-xl shadow-[0_0_15px_rgba(236,72,153,0.4)]" />
              ) : (
                <div className="flex items-center gap-4">
                  <div className="border border-pink-500 rounded-tr-md rounded-bl-md px-3 py-1 shadow-[0_0_10px_rgba(236,72,153,0.3)] bg-black/40">
                    <span
                      className="font-black tracking-widest uppercase text-white"
                      style={{ fontSize: `${navFontSize}px` }}
                    >
                      {name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 hover:text-pink-500 transition-all hover:glow-pink"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex md:hidden items-center z-[130]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 border border-pink-500/30 hover:border-pink-500 rounded flex items-center justify-center text-pink-500 transition-all bg-black/85 shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation HUD Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[120] bg-[#0a0510]/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 font-mono text-cyan-400 border border-pink-500/20"
            >
              {/* Decorative Brackets on Screen */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-pink-500/30" />
              <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-pink-500/30" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-pink-500/30" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-pink-500/30" />

              <div className="space-y-12 pt-20">
                <div className="space-y-2 border-b border-pink-500/20 pb-4">
                  <div className="text-[10px] text-pink-500 tracking-[0.4em]">// NEURAL_NET_LINK: ESTABLISHED</div>
                  <div className="text-sm font-bold text-white uppercase">&gt; CORE_OVERLAY_ACCESS.sh</div>
                </div>

                <div className="flex flex-col gap-6 text-base font-bold tracking-[0.2em] uppercase">
                  {[
                    { label: 'Home', href: '#home' },
                    { label: 'About Us', href: '#about' },
                    { label: 'Skills', href: '#skills' },
                    { label: 'Experience', href: '#experience' },
                    { label: 'Projects', href: '#projects' },
                    { label: 'Contact', href: '#contact' }
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-pink-500 transition-colors flex items-center gap-3 group"
                    >
                      <span className="text-pink-500 group-hover:translate-x-2 transition-transform">&gt;</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-cyan-500/10 pt-6">
                <div className="text-[9px] text-zinc-500">// SYS_STATUS: OPERATIONAL</div>
                <div className="text-[10px] text-pink-500/40">AGENT_UPLINK_CORE_v5.7.0</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10 px-4 sm:px-6 md:px-8">
          {/* Hero - Neural Link */}
          <section id="home" className="min-h-screen flex items-center pt-20 pb-16 max-w-7xl mx-auto relative overflow-hidden">
            {/* Hero Background Image */}
            {avatarUrl && (
              <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                <Image
                  src={avatarUrl}
                  alt="Background"
                  fill
                  className="object-cover opacity-20 grayscale brightness-[0.4]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510] via-transparent to-[#0a0510]" />
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full relative z-10">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="h-[2px] w-12 bg-pink-500" />
                    <span
                      className="text-pink-500 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase"
                      style={{ fontSize: `clamp(1rem, 3.5vw, ${heroSubtitleSize}px)` }}
                    >
                      {heroSubtitle}
                    </span>
                  </div>
                  <h1
                    className="font-black tracking-tighter leading-[1.05] text-white mb-6 md:mb-10"
                    style={{
                      fontSize: `clamp(2rem, 8vw, ${heroTitleSize}px)`,
                      wordBreak: "break-word",
                      overflowWrap: "break-word"
                    }}
                  >
                    {heroTitle}
                  </h1>
                  <p
                    className="text-cyan-400/60 leading-relaxed max-w-xl mb-8 md:mb-12"
                    style={{ fontSize: `clamp(0.95rem, 2.5vw, ${heroDescSize}px)` }}
                  >
                    &gt; {heroDescription}
                  </p>
                </motion.div>
              </div>

              <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  {/* Decorative Rings */}
                  <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-spin-slow pointer-events-none" />
                  <div className="absolute inset-4 border border-pink-500/20 rounded-full animate-spin-reverse-slow pointer-events-none" />
                  <div className="absolute inset-[-10px] sm:inset-[-20px] border border-cyan-400/10 rounded-full animate-pulse pointer-events-none" />

                  {avatarUrl && (
                    <div className="relative w-full h-full rounded-full overflow-hidden p-4">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50 relative group">
                        <Image src={avatarUrl} alt={name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                      </div>
                    </div>
                  )}

                  {/* Data Tags */}
                  <div className="absolute top-0 right-0 p-4 bg-[#0a0510]/90 backdrop-blur-md border border-pink-500/40 rounded-lg text-[10px] space-y-1 translate-x-4 -translate-y-4 sm:translate-x-10 sm:-translate-y-10 hidden sm:block">
                    <p className="text-pink-500">IDENTITY: Verified</p>
                    <p className="text-cyan-400">SIGNAL: Optimal</p>
                    <p className="text-white">STATUS: ACTIVE</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* About Section - HUD Style */}
          <section id="about" className="py-24 md:py-40 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className="w-full lg:w-1/2">
                <HoloCard>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-8">{aboutUsTitle}</h2>
                  <p className="text-lg sm:text-xl text-cyan-400/80 leading-relaxed italic mb-8 sm:mb-12">
                    &quot;{aboutBio}&quot;
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 sm:mb-12 border-t border-cyan-500/10 pt-8 sm:pt-10">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-pink-500">Node Experience</span>
                      <p className="text-lg sm:text-xl font-bold text-white tracking-tighter">{experience_years} Standard Years</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 sm:gap-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-pink-500 block mb-2">Neural Load</span>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-cyan-400 block mb-2">Signal Strength</span>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '99%' }} className="h-full bg-pink-500" />
                      </div>
                    </div>
                  </div>
                </HoloCard>
              </div>
              <div className="w-full lg:w-1/2">
                <HoloCard className="p-2 border-pink-500/20">
                  <div className="aspect-[4/5] relative rounded-lg overflow-hidden group bg-[#0a0510] flex items-center justify-center">
                    <Image src={aboutImage} alt={name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510] to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute top-4 left-4 p-2 bg-black/85 backdrop-blur-md border border-cyan-500/40 rounded text-[9px] text-cyan-400">
                      SYNC_STATUS: COMPLETE
                    </div>
                  </div>
                </HoloCard>
              </div>
            </div>
          </section>

          {/* Projects - Neural Repos */}
          <section id="projects" className="py-24 md:py-40 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 sm:mb-24 border-b border-cyan-500/20 pb-8 sm:pb-10 gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">NEURAL_REPOS</h2>
                <p className="text-xs text-pink-500 uppercase tracking-[0.5em] mt-4">Active Deployments // Night City Core</p>
              </div>
              <div className="text-[10px] font-bold text-cyan-400/40">SCANNING_REPOS... [OK]</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {displayProjects.map((project, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="relative group bg-zinc-900/40 border border-cyan-500/10 p-6 rounded-2xl hover:border-pink-500/50 transition-all flex flex-col justify-between h-full"
                >
                  <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-6 sm:mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 w-full shrink-0">
                    <Image src={project.image} alt={project.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-pink-500/10 pointer-events-none" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight uppercase group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                      <p className="text-sm text-cyan-400/60 leading-relaxed italic mb-6 sm:mb-8">&gt; {project.desc}</p>
                    </div>
                    <div className="flex gap-6 border-t border-cyan-500/10 pt-4">
                      <a href={project.link || "#"} className="text-[10px] font-bold text-pink-500 uppercase tracking-widest border-b border-pink-500 pb-1 hover:text-white hover:border-white transition-all">Connect</a>
                      <a href="#" className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-400 pb-1 hover:text-white hover:border-white transition-all">Details</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills - Active Augmentations */}
          <section id="skills" className="py-24 md:py-40 bg-zinc-950/40 border-y border-pink-500/10 rounded-3xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {displaySkills.map((skill, idx) => (
                <HoloCard key={idx} delay={idx * 0.1}>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8 border-b border-cyan-500/10 pb-4 uppercase tracking-widest">{skill.category}</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {(Array.isArray(skill.items) ? skill.items : skill.items?.split(',').filter(Boolean) || []).map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-pink-500/5 border border-pink-500/20 rounded text-[10px] text-pink-400 hover:bg-pink-500 hover:text-black transition-all">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </HoloCard>
              ))}
            </div>
          </section>

          {/* Experience - Mission Timeline */}
          <section id="experience" className="py-24 md:py-40 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-16 sm:mb-24 text-center uppercase">Signal_History.log</h2>
            <div className="space-y-12 sm:space-y-16 relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-cyan-500/20 -translate-x-1/2 pointer-events-none" />
              {displayExperience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex gap-6 sm:gap-12 ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-col items-start md:items-center relative z-10 pl-8 md:pl-0`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
                  <div className="w-full md:w-1/2">
                    <div className="p-6 sm:p-10 border border-cyan-500/20 bg-purple-900/5 backdrop-blur-md rounded-2xl hover:border-pink-500/40 transition-all group">
                      <span className="text-[10px] text-pink-500 uppercase tracking-[0.4em] mb-3 sm:mb-4 block font-bold">{exp.period}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">{exp.role}</h3>
                      <p className="text-base text-white/40 font-bold mb-4 sm:mb-6 italic">{exp.company}</p>
                      <p className="text-sm text-cyan-400/60 leading-relaxed italic">&gt; {exp.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact - Neural Uplink */}
          <section id="contact" className="py-24 md:py-48 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-12">
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-12 sm:mb-20 uppercase italic leading-none">
                  Initiate<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
                    Connection.
                  </span>
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 items-center mb-16 sm:mb-24">
                  <a href={`mailto:${email}`} className="text-xl sm:text-3xl md:text-4xl font-bold border-b-4 border-pink-500 pb-2 hover:text-pink-500 transition-all tracking-tight uppercase break-all">
                    {email}
                  </a>
                  <div className="flex gap-8 sm:gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400/60">
                    <a href={linkedinUrl} className="hover:text-white transition-colors">LINKEDIN</a>
                    <a href={githubUrl} className="hover:text-white transition-colors">GITHUB</a>
                  </div>
                </div>

                <div className="max-w-xl mx-auto p-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl">
                  <div className="bg-[#0a0510] rounded-2xl p-6 sm:p-10 space-y-6 sm:space-y-8 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40">Transmission_ID</label>
                      <input type="text" placeholder="Your_Name" className="w-full bg-white/5 border border-cyan-500/20 rounded p-4 outline-none focus:border-cyan-400 transition-all text-white font-mono text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40">Neural_Path</label>
                      <input type="email" placeholder="Your_Email" className="w-full bg-white/5 border border-cyan-500/20 rounded p-4 outline-none focus:border-cyan-400 transition-all text-white font-mono text-sm" />
                    </div>
                    <button className="w-full py-5 bg-cyan-400 text-black font-bold uppercase tracking-[0.4em] text-xs shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 transition-all">
                      Broadcast Signal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-16 border-t border-cyan-500/10 bg-black/35">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400/40 text-center lg:text-left px-4">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <span className="text-xl text-white font-black tracking-tighter">AGENT_{name.toUpperCase()}.</span>
              <span>{footerCopyright || `© ${new Date().getFullYear()} / NEURAL_CORE_V5`}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              <span className="text-pink-500/40">UPLINK_SECURE</span>
              <span className="text-purple-500/40">ICE_ACTIVE</span>
              <span className="text-cyan-500/40">GRID_STABLE</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
            >
              UPLINK_TOP
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #0a0510; }
          ::-webkit-scrollbar-thumb { background: #pink; border-radius: 0px; }
          body { background-color: #0a0510; }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scanline {
            animation: scanline 8s linear infinite;
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          @keyframes spin-reverse-slow {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-reverse-slow {
            animation: spin-reverse-slow 25s linear infinite;
          }
          @keyframes flicker {
            0% { opacity: 0.05; }
            50% { opacity: 0.08; }
            100% { opacity: 0.05; }
          }
          .animate-flicker {
            animation: flicker 0.15s infinite;
          }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
