import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const TypingText = ({ text, delay = 0, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return <span>{displayedText}</span>;
};

const TerminalWindow = ({ title, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-black/90 backdrop-blur-md border border-green-500/20 rounded-lg overflow-hidden shadow-2xl shadow-green-500/5 ${className}`}
  >
    <div className="bg-zinc-900/80 px-4 py-3 border-b border-green-500/10 flex items-center justify-between">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{title}</div>
      <div className="w-12" />
    </div>
    <div className="p-4 sm:p-6 font-mono text-sm leading-relaxed text-green-500/80">
      {children}
    </div>
  </motion.div>
);

const Prompt = ({ user = "neo", path = "~" }) => (
  <span className="text-cyan-400 font-bold mr-2">
    {user}@zion:{path}$ <span className="animate-pulse">_</span>
  </span>
);

export default function PortfolioTemplate4({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    name = "Neo",
    navbarType = "Text",
    navFontSize = 20,
    logoUrl = "",
    heroTitle = "SYSTEM BOOT COMPLETED...",
    heroSubtitle = "Full-Stack Security Architect",
    heroDescription = "I hack together scalable solutions in the dark. Specialized in neural networks and distributed systems.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "WHOAMI",
    aboutBio = "I operate in the intersection of efficiency and aesthetics. My mission is to build digital infrastructure that remains unbreakable under load while providing an intuitive, seamless experience for the end-user.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "neo@zion.net",
    aboutPhone = "+1 010 101 0101",
    aboutLocation = "Zion Core",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "neo@zion.net",
    phone = "+1 010 101 0101",
    githubUrl = "#",
    linkedinUrl = "#",
    footerCopyright = "",
    skillsSubtitle = "Capabilities",
    skillsTitle = "Technical Arsenal"
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultProjects = [
    { name: "Project-Morpheus", desc: "Decentralized communication protocol for the resistance.", image: "/images/templates/template-img-11.jpg", link: "#" },
    { name: "Oracle-Engine", desc: "Predictive analysis engine using neural pattern recognition.", image: "/images/templates/template-img-12.jpg", link: "#" },
    { name: "Sentinel-Defense", desc: "Automated threat detection and mitigation system.", image: "/images/templates/template-img-21.jpg", link: "#" }
  ];

  const defaultSkills = [
    { category: "Core_Protocols", items: "React, Next.js, Node.js, GraphQL" },
    { category: "Security_Layers", items: "Rust, Go, C++, WebAssembly" },
    { category: "Infrastructure", items: "Kubernetes, Docker, AWS, Terraform" }
  ];

  const defaultExperience = [
    { role: "Senior Engineer", company: "Zion Net", period: "2022 - 2024", desc: "Leading core infrastructure defense." },
    { role: "Module Developer", company: "Meta Cortex", period: "2019 - 2022", desc: "Optimizing neural interface latency." }
  ];

  const defaultServices = [
    { title: "System Architecture", desc: "Designing resilient digital ecosystems from the ground up.", icon: "🏗️" },
    { title: "Security Auditing", desc: "Identifying and patching vulnerabilities before they emerge.", icon: "🛡️" },
    { title: "Neural Ops", desc: "Scaling high-performance computing across distributed nodes.", icon: "🧠" }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#050505] text-green-500 font-mono selection:bg-green-500/30 selection:text-white overflow-x-hidden">

        {/* CRT Scanline Effect */}
        <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

        {/* Navbar - Terminal Style */}
        <nav className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 sm:px-6 md:px-12 py-6 flex justify-center ${isScrolled ? "bg-black/95 border-b border-green-500/20 backdrop-blur-md py-4" : "bg-transparent"}`}>
          <div className="max-w-7xl w-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={40} height={40} className="rounded border border-green-500/20" />
              ) : (
                <div className="font-black tracking-tighter" style={{ fontSize: `${navFontSize}px` }}>
                  <span className="text-white">&lt;</span>
                  {name}
                  <span className="text-white">/&gt;</span>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[10px] font-bold">
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
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-zinc-600">./</span>{item.label.toUpperCase().replace(' ', '_')}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex md:hidden items-center z-[160]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 border border-green-500/20 hover:border-green-500/60 rounded flex items-center justify-center text-green-500 hover:text-white transition-all bg-black/40 backdrop-blur-md"
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

        {/* Mobile Navigation Command overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[320px] bg-black/95 border-l border-green-500/25 backdrop-blur-xl z-[150] p-8 flex flex-col justify-between font-mono text-green-500 shadow-2xl shadow-green-500/10"
            >
              <div className="space-y-12 pt-20">
                <div className="space-y-2 border-b border-green-500/20 pb-4">
                  <div className="text-[10px] text-zinc-500">// CONTROL PANEL ACTIVE</div>
                  <div className="text-sm font-bold text-white uppercase">&gt; MENU_INITIALIZE.sh</div>
                </div>

                <div className="flex flex-col gap-6 text-sm font-bold">
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
                      className="hover:text-white transition-colors flex items-center gap-3 group"
                    >
                      <span className="text-zinc-600 group-hover:text-green-400 transition-colors">./</span>
                      {item.label.toUpperCase().replace(' ', '_')}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-green-500/10 pt-6">
                <div className="text-[9px] text-zinc-600">// SIGNAL STRENGTH: OPTIMAL</div>
                <div className="text-[10px] text-green-500/40">ZION CODESYS v1.0.4</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="px-4 sm:px-6 md:px-8">
          {/* Hero - Terminal Boot */}
          <section id="home" className="pt-28 md:pt-40 pb-20 max-w-7xl mx-auto relative overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="space-y-6 mb-8 lg:mb-12">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs opacity-50">
                    [LAST_LOGIN: {new Date().toLocaleDateString()}]
                  </motion.div>
                  <motion.span
                    className="text-green-500 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase mb-4 block"
                    style={{ fontSize: `clamp(1.1rem, 3.5vw, ${heroSubtitleSize}px)` }}
                  >
                    &gt; {heroSubtitle}
                  </motion.span>
                  <h1
                    className="font-bold tracking-tighter leading-[1.05] text-white"
                    style={{
                      fontSize: `clamp(2rem, 8vw, ${heroTitleSize}px)`,
                      wordBreak: "break-word",
                      overflowWrap: "break-word"
                    }}
                  >
                    {heroTitle}
                  </h1>
                  <p
                    className="text-green-500/60 max-w-xl leading-relaxed"
                    style={{ fontSize: `clamp(0.95rem, 2.5vw, ${heroDescSize}px)` }}
                  >
                    &gt; {heroDescription}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <TerminalWindow title="sys_profile.exe">
                  <div className="space-y-4">
                    {avatarUrl && (
                      <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 border-2 border-green-500/40 p-2 rounded-full">
                          <div className="w-full h-full rounded-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 ring-2 ring-green-500/20 ring-offset-4 ring-offset-black">
                            <Image src={avatarUrl} alt={name} fill className="object-cover" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2 text-[12px]">
                      <p><span className="text-white opacity-50"># User:</span> {name}</p>
                      <p><span className="text-white opacity-50"># Identity:</span> Confirmed</p>
                      <p><span className="text-white opacity-50"># Status:</span> Online</p>
                      <p className="pt-4 text-cyan-400">root@zion:~$ system --info</p>
                      <div className="flex flex-wrap gap-2">
                        {['Neural_Link', 'Quant_Logic', 'Zion_Core'].map(tag => (
                          <span key={tag} className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px]">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            </div>
          </section>

          {/* About Section - Code Style */}
          <section id="about" className="py-24 md:py-32 bg-zinc-900/20 rounded-3xl">
            <div className="max-w-7xl mx-auto">
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-4">{aboutUsTitle}</h2>
                <div className="w-20 h-1 bg-green-500 mx-auto" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 w-full">
                  <TerminalWindow title="identity_scan.jpg">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
                      <Image src={aboutImage || avatarUrl} alt="About" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                  </TerminalWindow>
                </div>

                <div className="lg:col-span-7 w-full">
                  <TerminalWindow title="whoami.sh">
                    <div className="space-y-6">
                      <div className="text-cyan-400 flex items-center gap-2">
                        <Prompt /> cat mission.txt
                      </div>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed italic">
                        &quot;{aboutBio}&quot;
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase text-zinc-500 tracking-widest">Experience</p>
                          <p className="text-green-500 font-mono">{experience_years}+ Years</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase text-zinc-500 tracking-widest">Location</p>
                          <p className="text-white font-mono">{aboutLocation}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase text-zinc-500 tracking-widest">Email</p>
                          <p className="text-white font-mono break-all">{aboutEmail}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase text-zinc-500 tracking-widest">Status</p>
                          <p className="text-cyan-400 font-mono">Available_for_Work</p>
                        </div>
                      </div>

                      <div className="pt-6 sm:pt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-green-500/10 mt-8">
                        <div className="space-y-4">
                          <p className="text-xs uppercase tracking-widest text-white/40">Active Nodes</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs"><span>Frontend Eng.</span><span className="text-white">95%</span></div>
                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} className="h-full bg-green-500" /></div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs"><span>System Arch.</span><span className="text-white">90%</span></div>
                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} className="h-full bg-cyan-500" /></div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Core Philosophy</p>
                          <p className="text-xs text-green-500/60 leading-loose">
                            - Security by design<br />
                            - Minimal latency target<br />
                            - Human-centric logic<br />
                            - Immutable state management
                          </p>
                        </div>
                      </div>
                    </div>
                  </TerminalWindow>
                </div>
              </div>
            </div>
          </section>

          {/* Projects - Deployment Log */}
          <section id="projects" className="py-24 md:py-32 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter uppercase leading-none">DEPLOYMENT_LOG</h2>
                <p className="text-xs text-green-500/40 uppercase tracking-[0.5em]">Active Repositories</p>
              </div>
              <div className="text-xs opacity-50 font-bold">SORT: DATE_DESC</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {displayProjects.map((project, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-black/60 border border-green-500/20 rounded-2xl overflow-hidden group hover:border-green-500/50 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100">
                    <Image src={project.image} alt={project.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-green-500/10 pointer-events-none" />
                  </div>
                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight underline decoration-green-500/30 underline-offset-8 uppercase">{project.name}</h3>
                        <span className="text-[10px] px-2 py-1 bg-green-500/10 rounded border border-green-500/20 shrink-0">MODULE_{idx + 1}</span>
                      </div>
                      <p className="text-sm text-green-500/60 leading-relaxed italic">&quot;{project.desc}&quot;</p>
                    </div>
                    <div className="flex gap-6 pt-4 border-t border-green-500/10">
                      <a href={project.link || "#"} className="text-xs font-bold text-white hover:text-green-500 transition-colors flex items-center gap-2 uppercase tracking-widest">
                        [EXECUTE] <span className="text-[8px]">→</span>
                      </a>
                      <a href="#" className="text-xs font-bold text-white/40 hover:text-green-500 transition-colors flex items-center gap-2 uppercase tracking-widest">
                        [SOURCE]
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills - Premium Tech Stack Modules */}
          <section
            id="skills"
            className="py-24 bg-[#050505] relative border-y border-green-500/10 overflow-hidden rounded-3xl"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] bg-green-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

              {/* Section Header */}
              <div className="mb-14">
                <p className="text-green-500 uppercase tracking-[0.4em] text-xs mb-4 font-mono">
                  {skillsSubtitle || "Capabilities"}
                </p>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                  {skillsTitle || "Technical Arsenal"}
                </h2>
              </div>

              {/* Skills Grid */}
              {displaySkills?.filter(
                (s) =>
                  s?.category?.trim() ||
                  (Array.isArray(s?.items)
                    ? s.items.length > 0
                    : s?.items?.trim())
              ).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {displaySkills
                    .filter(
                      (s) =>
                        s?.category?.trim() ||
                        (Array.isArray(s?.items)
                          ? s.items.length > 0
                          : s?.items?.trim())
                    )
                    .map((skill, idx) => {
                      const items = Array.isArray(skill.items)
                        ? skill.items
                        : skill.items?.split(",").filter(Boolean) || [];

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: idx * 0.08,
                          }}
                          whileHover={{
                            y: -6,
                            scale: 1.02,
                          }}
                          className={`group relative flex flex-col h-full ${idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                            }`}
                        >
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 rounded-[32px]" />

                          {/* Card */}
                          <div className="relative flex-1 min-h-[280px] bg-zinc-900/90 border border-green-500/20 hover:border-green-500/40 rounded-[32px] p-6 sm:p-8 transition-all duration-500 backdrop-blur-xl overflow-hidden flex flex-col justify-between">

                            {/* Top Row */}
                            <div className="flex items-start justify-between mb-8">
                              {/* Icon */}
                              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center overflow-hidden">
                                {skill.icon ? (
                                  <img
                                    src={skill.icon}
                                    alt={skill.category}
                                    className="w-full h-full object-contain p-3"
                                  />
                                ) : (
                                  <svg
                                    className="w-6 h-6 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                  </svg>
                                )}
                              </div>

                              <span className="text-[10px] uppercase tracking-[0.3em] text-green-500/40 font-mono">
                                module_{idx + 1}
                              </span>
                            </div>

                            {/* Content */}
                            <div>
                              <h3 className="text-xl sm:text-2xl font-black text-white mb-4 leading-tight">
                                {skill.category || "Unknown"}
                              </h3>

                              {/* Skill Tags */}
                              <div className="flex flex-wrap gap-2">
                                {items.map((item, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-medium hover:bg-green-500 hover:text-black transition-all duration-300"
                                  >
                                    {item.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Bottom Accent */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              ) : (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-h-[320px] flex flex-col items-center justify-center text-center border border-dashed border-green-500/20 rounded-[32px] bg-zinc-900/40 backdrop-blur-md p-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-ping" />
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase tracking-[0.3em]">
                    No Skills Added Yet
                  </h3>

                  <p className="text-green-500/50 mt-4 text-sm font-mono uppercase tracking-widest">
                    Awaiting module initialization...
                  </p>
                </motion.div>
              )}
            </div>
          </section>

          {/* Experience - Chronicle */}
          <section id="experience" className="py-24 md:py-32 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-16 text-center uppercase">System_History.log</h2>
            <div className="space-y-12 pl-4 sm:pl-0">
              {displayExperience.map((exp, idx) => (
                <div key={idx} className="flex gap-4 sm:gap-8 group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-4 h-4 rounded-full border-2 border-green-500 group-hover:bg-green-500 transition-all shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <div className="w-px flex-1 bg-green-500/20 mt-2" />
                  </div>
                  <div className="pb-10 space-y-2 flex-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">{exp.period}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{exp.role}</h3>
                    <p className="text-base sm:text-lg text-green-500 font-bold opacity-80">{exp.company}</p>
                    <p className="text-sm text-green-500/50 max-w-2xl leading-relaxed italic">
                      &gt; {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact - Secure Transmission */}
          <section id="contact" className="py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <TerminalWindow title="secure_comm.pkg" className="relative">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p className="text-cyan-400">root@zion:~$ init contact_form.sh</p>
                    <p className="text-white/60 text-sm">Opening secure channel for transmission...</p>
                  </div>

                  <form className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40">Origin_ID</label>
                        <input type="text" placeholder="Your Name" className="w-full bg-black/40 border border-green-500/20 rounded p-4 outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all text-white font-mono text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40">Signal_Path</label>
                        <input type="email" placeholder="Your Email" className="w-full bg-black/40 border border-green-500/20 rounded p-4 outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all text-white font-mono text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40">Transmission_Data</label>
                      <textarea rows={4} placeholder="Your Message" className="w-full bg-black/40 border border-green-500/20 rounded p-4 outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all text-white resize-none font-mono text-sm" />
                    </div>
                    <button className="w-full py-5 bg-green-500 text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-[0.98]">
                      Send Signal
                    </button>
                  </form>

                  <div className="pt-10 border-t border-green-500/10 flex flex-col sm:flex-row justify-between gap-6 items-center">
                    <div className="flex gap-8">
                      <a href={githubUrl} className="text-xs hover:text-white transition-colors">./GITHUB</a>
                      <a href={linkedinUrl} className="text-xs hover:text-white transition-colors">./LINKEDIN</a>
                    </div>
                    <div className="text-[10px] text-white/40 italic">
                      ENCRYPTION: AES-256 ACTIVE
                    </div>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </section>
        </main>

        <footer className="py-16 border-t border-green-500/10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 text-center lg:text-left px-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-sm animate-ping shrink-0" />
              <span>{footerCopyright || `SYSTEM_STABLE // © ${new Date().getFullYear()} ${name}`}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              <span className="text-green-500/20">X86_64</span>
              <span className="text-green-500/20">HTTPS_ENABLED</span>
              <span className="text-green-500/20">NODE_JS_20</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 border border-green-500/20 hover:border-green-500 hover:text-green-500 transition-all font-mono text-[10px]"
            >
              MOVE_TOP
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #22c55e; border-radius: 0px; }
          body { background-color: #050505; }
          .font-mono { font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
