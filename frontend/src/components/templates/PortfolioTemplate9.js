import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const AICard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`bg-[#0d1117]/60 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl p-6 sm:p-8 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all group relative overflow-hidden flex flex-col justify-between ${className}`}
  >
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />

    {/* Corner Glows */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10 flex flex-col justify-between h-full w-full">{children}</div>
  </motion.div>
);

export default function PortfolioTemplate9({ data }) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    name = "Nexus AI",
    navbarType = "Text",
    navFontSize = 18,
    logoUrl = "",
    heroTitle = "ARCHITECTING THE NEXT INTELLIGENCE.",
    heroSubtitle = "Neural Interface Engineer",
    heroDescription = "Merging human intuition with synthetic intelligence to build the digital ecosystems of the future. Specialized in high-frequency AI visualization and scalable neural cores.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "The Neural Core",
    aboutBio = "Merging human intuition with synthetic intelligence to build the digital ecosystems of the future. Specialized in high-frequency AI visualization and scalable neural cores. I believe in creating interfaces that think and adapt in real-time.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "nexus@ai.com",
    aboutPhone = "+1 777 000 7777",
    aboutLocation = "Silicon Valley",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "nexus@ai.com",
    phone = "+1 777 000 7777",
    githubUrl = "#",
    linkedinUrl = "#",
    footerCopyright = ""
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const defaultProjects = [
    { name: "Cognito OS", desc: "A decentralized AI operating system focusing on privacy and edge computing.", image: "/images/templates/template-img-11.jpg", link: "#", tags: "AI, DECENTRALIZED" },
    { name: "Aether Vision", desc: "Real-time object detection and spatial mapping for AR interfaces.", image: "/images/templates/template-img-12.jpg", link: "#", tags: "COMPUTER VISION" },
    { name: "Neural Flow", desc: "Visualizing high-dimensional data streams through immersive 3D shaders.", image: "/images/templates/template-img-21.jpg", link: "#", tags: "DATA VIZ" }
  ];

  const defaultSkills = [
    { category: "Neural Architecture", items: "TensorFlow, PyTorch, Scikit-Learn, JAX" },
    { category: "Interface Stack", items: "React, Next.js, Three.js, WebGL" },
    { category: "Compute Core", items: "Rust, Go, Python, CUDA, Docker" }
  ];

  const defaultExperience = [
    { role: "Lead AI Engineer", company: "OpenAI", period: "2021 - Present", desc: "Leading the development of multi-modal interface protocols for large language models." },
    { role: "Neural Researcher", company: "DeepMind", period: "2018 - 2021", desc: "Optimizing high-frequency neural visualizations for AlphaGo ecosystems." }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-400 overflow-x-hidden">

        {/* Particle Grid Background */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[length:200px_200px]" />
        </div>

        {/* Dynamic Scanline */}
        <div className="fixed inset-0 pointer-events-none z-10 h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-scan-top" />

        {/* Cursor Glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.05), transparent 40%)`
          }}
        />

        {/* AI Navbar */}
        <nav className="sticky top-0 left-0 right-0 z-[110] px-4 sm:px-8 md:px-20 py-8 flex justify-center">
          <div className="max-w-7xl w-full flex justify-between items-center bg-[#0d1117]/80 backdrop-blur-xl border border-cyan-500/10 rounded-full px-6 sm:px-10 py-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={40} height={40} className="rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span
                    className="font-black uppercase tracking-[0.5em] text-white text-xs sm:text-sm"
                    style={{ fontSize: `${navFontSize}px` }}
                  >
                    {name}
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Nav Links */}
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
                  className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 hover:text-cyan-400 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center z-[130]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 border border-cyan-500/20 hover:border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 bg-[#0d1117]/90 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Cyber Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[120] bg-[#020617]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 font-mono text-cyan-400 border border-cyan-500/20"
            >
              <div className="space-y-12 pt-20">
                <div className="space-y-2 border-b border-cyan-500/20 pb-4">
                  <div className="text-[10px] text-cyan-500 tracking-[0.4em]">// SYNTHETIC_CONNECTION: ACTIVE</div>
                  <div className="text-sm font-bold text-white uppercase">&gt; CORE_CYBER_MATRIX</div>
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
                      className="hover:text-cyan-400 transition-colors flex items-center gap-3"
                    >
                      <span className="text-cyan-500 font-bold">&gt;</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-cyan-500/10 pt-6">
                <div className="text-[10px] text-cyan-500/40">SYNTHETIC_INTERFACE_V9</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10 pt-28 sm:pt-40 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section id="home" className="min-h-[80vh] flex flex-col justify-center text-center relative overflow-hidden py-10 rounded-3xl">
            {/* Hero Background Image */}
            {avatarUrl && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={avatarUrl}
                  alt="Background"
                  fill
                  className="object-cover opacity-25 grayscale brightness-[0.4]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 space-y-8"
            >
              <div
                className="inline-flex items-center gap-4 px-6 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-full font-bold text-cyan-400 uppercase tracking-[0.3em] md:tracking-[0.5em]"
                style={{ fontSize: `clamp(0.95rem, 3.5vw, ${heroSubtitleSize}px)` }}
              >
                {heroSubtitle}
              </div>
              <h1
                className="font-black text-white tracking-tighter leading-[1.05] mb-6"
                style={{
                  fontSize: `clamp(2rem, 8.5vw, ${heroTitleSize}px)`,
                  wordBreak: "break-word",
                  overflowWrap: "break-word"
                }}
              >
                {heroTitle}
              </h1>
              <p
                className="text-slate-400 max-w-3xl mx-auto leading-relaxed font-light px-4"
                style={{ fontSize: `clamp(0.95rem, 2.5vw, ${heroDescSize}px)` }}
              >
                {heroDescription}
              </p>
            </motion.div>
          </section>

          {/* Projects - Neural Nodes */}
          <section id="projects" className="py-24 md:py-40">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">Active_Nodes</h2>
                <div className="h-1 w-20 bg-cyan-500 mt-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">Scanning_Repository...</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {displayProjects.map((project, idx) => (
                <AICard key={idx} delay={idx * 0.1}>
                  <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-6 sm:mb-8 border border-cyan-500/10 w-full shrink-0">
                    <Image src={project.image} alt={project.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none" />
                  </div>
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">{project.tags}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white uppercase leading-tight">{project.name}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed italic">&gt; {project.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-cyan-500/10 mt-4">
                      <a href={project.link || "#"} className="inline-flex items-center gap-3 text-[10px] font-bold text-white uppercase tracking-widest border-b border-cyan-500 pb-1 hover:text-cyan-400 transition-all">
                        Access Node
                      </a>
                    </div>
                  </div>
                </AICard>
              ))}
            </div>
          </section>

          {/* Skills - Neural Modules */}
          <section id="skills" className="py-24 md:py-40 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {displaySkills.map((skill, idx) => (
              <AICard key={idx} delay={0.2 + idx * 0.1} className="flex flex-col items-center text-center justify-between h-full">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_20px_rgba(34,211,238,0.2)] shrink-0">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase mb-6 tracking-widest">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {(Array.isArray(skill.items) ? skill.items : skill.items?.split(',').filter(Boolean) || []).map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded text-[10px] text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </AICard>
            ))}
          </section>

          {/* About - Neural Manifesto */}
          <section id="about" className="py-24 md:py-40 bg-zinc-900/10 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="w-full">
                <AICard className="p-0 h-[380px] sm:h-[500px]">
                  <Image src={aboutImage || avatarUrl || '/images/templates/template-img-50.jpg'} alt={name || "About Image"} fill className="object-cover grayscale" />
                  <div className="absolute inset-0 bg-cyan-900/20" />
                  {/* Scanning Animation Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-20 w-full -translate-y-full animate-scan pointer-events-none" />
                </AICard>
              </div>
              <div className="space-y-8 sm:space-y-12">
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                  {aboutUsTitle}
                </h2>
                <p className="text-xl sm:text-2xl text-slate-400 leading-relaxed italic">
                  &quot;{aboutBio}&quot;
                </p>
                <div className="grid grid-cols-2 gap-10 border-t border-cyan-500/20 pt-8 sm:pt-10">
                  <div>
                    <span className="text-3xl font-black text-white">{experience_years}+</span>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest mt-2">Years of Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience - Data Stream */}
          <section id="experience" className="py-24 md:py-40">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase mb-16 sm:mb-24 text-center leading-none">Data_Stream.history</h2>
            <div className="space-y-12 max-w-4xl mx-auto relative pl-6 sm:pl-0">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-cyan-500/15 -translate-x-1/2 pointer-events-none" />
              {displayExperience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-8 sm:gap-10 relative z-10 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                  <div className="w-full md:w-1/2">
                    <AICard className={idx % 2 === 0 ? "md:text-right" : "md:text-left"}>
                      <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{exp.period}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white uppercase leading-tight">{exp.role}</h3>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 italic">{exp.company}</p>
                      <p className="text-sm text-slate-400 leading-relaxed italic">&gt; {exp.desc}</p>
                    </AICard>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact - Establish Uplink */}
          <section id="contact" className="py-24 sm:py-48 text-center relative overflow-hidden bg-black/20 rounded-3xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-12 sm:mb-20 italic leading-none">Initiate<br /><span className="text-cyan-400">Connection.</span></h2>
              <div className="flex flex-col items-center gap-12 sm:gap-16 mb-20 sm:mb-32">
                <a href={`mailto:${email}`} className="text-2xl sm:text-4xl md:text-5xl font-black text-white border-b-2 border-cyan-500 pb-4 hover:text-cyan-400 transition-all duration-700 break-all">
                  {email}
                </a>
              </div>

              <AICard className="p-8 sm:p-12 text-left">
                <form className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500">Node_ID</label>
                      <input type="text" placeholder="Your_Name" className="w-full bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 outline-none focus:border-cyan-400 transition-all text-white font-mono text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500">Signal_Origin</label>
                      <input type="email" placeholder="Your_Email" className="w-full bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 outline-none focus:border-cyan-400 transition-all text-white font-mono text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500">Transmission_Payload</label>
                    <textarea rows={4} placeholder="Establishing connection..." className="w-full bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 outline-none focus:border-cyan-400 transition-all text-white resize-none font-mono text-sm" />
                  </div>
                  <button className="w-full py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.5em] text-xs shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-95 transition-all">
                    Broadcast Transmission
                  </button>
                </form>
              </AICard>
            </div>
          </section>
        </main>

        <footer className="py-16 px-4 sm:px-8 md:px-20 border-t border-cyan-500/10 bg-[#0d1117] mt-24">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 text-[10px] font-bold uppercase tracking-[0.5em] text-slate-600 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <span className="text-xl font-black text-white uppercase italic tracking-tighter">PROJECT_NEXUS</span>
              <span className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
              <span>{footerCopyright || `© ${new Date().getFullYear()} / SYNTHETIC_INTERFACE_V9`}</span>
            </div>
            <div className="flex justify-center gap-10 sm:gap-12">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy_Protocol</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">System_Status</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, color: "#22d3ee" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="uppercase"
            >
              Uplink_Home ↑
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #020617; }
          ::-webkit-scrollbar-thumb { background: #22d3ee; }
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(500%); }
          }
          .animate-scan {
            animation: scan 10s linear infinite;
          }
          @keyframes scan-top {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .animate-scan-top {
            animation: scan-top 15s linear infinite;
          }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
