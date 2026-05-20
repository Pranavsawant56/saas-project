import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const BentoCard = ({ children, className = "", delay = 0, id, bgColor = "bg-white" }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className={`border border-zinc-200/40 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_8px_30px_rgba(42,39,36,0.02)] hover:shadow-[0_20px_40px_rgba(42,39,36,0.04)] transition-all duration-300 flex flex-col justify-between ${bgColor} ${className}`}
  >
    {children}
  </motion.div>
);

export default function PortfolioTemplate6({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    name = "Elena Solaris",
    navbarType = "Text",
    navFontSize = 20,
    logoUrl = "",
    heroTitle = "DESIGNING THE FUTURE OF INTERACTION.",
    heroSubtitle = "Senior Product Designer",
    heroDescription = "Crafting high-fidelity digital experiences with a focus on human-centric design and aesthetic precision.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "Behind the Pixels",
    aboutBio = "Crafting high-fidelity digital experiences with a focus on human-centric design and aesthetic precision. I believe that every interaction should be meaningful and every pixel should have a purpose.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "hello@elenasolaris.com",
    aboutPhone = "+46 8 123 45 67",
    aboutLocation = "Stockholm, SE",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "hello@elenasolaris.com",
    phone = "+46 8 123 45 67",
    githubUrl = "#",
    linkedinUrl = "#",
    twitterUrl = "#",
    footerCopyright = ""
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultProjects = [
    { name: "Lumina App", desc: "A mental health platform designed for mindfulness.", image: "/images/templates/template-img-11.jpg", link: "#", tags: "Mobile, HealthTech" },
    { name: "Stockholm Studio", desc: "E-commerce for luxury interior design.", image: "/images/templates/template-img-12.jpg", link: "#", tags: "Web, Luxury" },
    { name: "Aether OS", desc: "Minimalist desktop ecosystem.", image: "/images/templates/template-img-21.jpg", link: "#", tags: "Design System" }
  ];

  const defaultSkills = [
    { category: "Frontend", items: "React, Next.js, Framer" },
    { category: "Design", items: "Figma, Principle, Spline" },
    { category: "Process", items: "User Research, Prototyping" }
  ];

  const defaultExperience = [
    { role: "Lead Designer", company: "Stockholm Studio", period: "2021 - Present", desc: "Leading design systems for high-end luxury clients." },
    { role: "Product Designer", company: "Meta", period: "2018 - 2021", desc: "Crafting social interfaces for millions." }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;

  // Fully saturated, gorgeous Apple minimal color profiles for the Bento blocks
  const skillCardColors = [
    { bg: "bg-[#E0F2FE]", border: "border-[#BAE6FD]", text: "text-[#0369A1]", pill: "bg-[#BAE6FD] text-[#0369A1]" }, // Saturated Mineral Blue
    { bg: "bg-[#F3E8FF]", border: "border-[#E9D8FD]", text: "text-[#6B21A8]", pill: "bg-[#E9D8FD] text-[#6B21A8]" }, // Saturated Wisteria Purple
    { bg: "bg-[#DCFCE7]", border: "border-[#C6F6D5]", text: "text-[#15803D]", pill: "bg-[#C6F6D5] text-[#15803D]" }  // Saturated Forest Sage Mint
  ];

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="light" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-transparent text-[#2A2724] font-sans selection:bg-[#2A2724] selection:text-white pb-20 overflow-x-hidden antialiased">

        {/* Floating Colored Navbar */}
        <nav className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-6 flex justify-center ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-[#EAE5DC] py-4" : "bg-transparent"}`}>
          <div className="max-w-7xl w-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={36} height={36} className="rounded-full border border-zinc-200/40" />
              ) : (
                <span
                  className="font-black tracking-tight text-[#2A2724]"
                  style={{ fontSize: `${navFontSize}px` }}
                >
                  {name}
                </span>
              )}
            </div>

            {/* Desktop Link list */}
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
                  className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#5E5A54] hover:text-[#2A2724] transition-colors relative py-1 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2A2724] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center z-[130]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 border border-[#EAE5DC] rounded-full flex items-center justify-center text-[#2A2724] hover:bg-white transition-all bg-white/60 backdrop-blur-md"
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

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[320px] bg-[#FAF7F2] border-l border-[#EAE5DC] z-[120] p-8 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-12 pt-20">
                <div className="border-b border-[#EAE5DC] pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5E5A54]">Directory</span>
                </div>
                <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest text-[#5E5A54]">
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
                      className="hover:text-[#2A2724] transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-[9px] uppercase tracking-widest text-[#5E5A54] border-t border-[#EAE5DC] pt-6">
                Apple editorial colored theme
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 lg:pt-24">
          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {/* Bento Hero Card - Radiant sunset gold colored block */}
            <BentoCard id="home" bgColor="bg-gradient-to-br from-[#FFF1F2] to-[#FEF3C7]" className="md:col-span-4 lg:col-span-4 lg:row-span-2 border border-[#FECDD3] p-8 sm:p-12 justify-center overflow-hidden relative min-h-[380px] sm:min-h-[460px]">
              <div className="relative z-10 space-y-6">
                <span
                  className="text-[#BE123C] font-bold tracking-[0.25em] uppercase text-xs block"
                  style={{ fontSize: `clamp(0.85rem, 2.5vw, ${heroSubtitleSize}px)` }}
                >
                  {heroSubtitle}
                </span>
                <h1
                  className="font-black leading-[1.05] tracking-tight text-[#7C2D12]"
                  style={{
                    fontSize: `clamp(1.8rem, 8vw, ${heroTitleSize}px)`,
                    wordBreak: "break-word",
                    overflowWrap: "break-word"
                  }}
                >
                  {heroTitle}
                </h1>
                <p
                  className="text-[#9A3412] max-w-lg leading-relaxed text-sm sm:text-base font-semibold"
                  style={{ fontSize: `clamp(0.95rem, 2vw, ${heroDescSize}px)` }}
                >
                  {heroDescription}
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <a href="#contact" className="px-6 py-3 bg-[#7C2D12] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#9A3412] transition-colors shadow-sm">
                    Initiate Project
                  </a>
                  <a href="#projects" className="px-6 py-3 border border-[#FDBA74] text-[#7C2D12] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FFF7ED] transition-colors bg-transparent">
                    View Works
                  </a>
                </div>
              </div>
              {avatarUrl && (
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none grayscale">
                  <Image src={avatarUrl} alt="Hero Background" fill className="object-cover" />
                </div>
              )}
            </BentoCard>

            {/* Profile bento card */}
            <BentoCard id="about" className="md:col-span-2 lg:col-span-2 lg:row-span-2 p-0 overflow-hidden group h-[300px] md:h-auto border border-[#EAE5DC]">
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000">
                {avatarUrl && <Image src={avatarUrl} alt={name} fill className="object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/95 via-[#FAF7F2]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10">
                  <h2 className="text-[#2A2724] text-xl sm:text-2xl font-black tracking-tight">{name}</h2>
                  <p className="text-[#5E5A54] text-[10px] font-bold uppercase tracking-widest mt-1">{heroSubtitle}</p>
                </div>
              </div>
            </BentoCard>

            {/* Skills Cluster - High Saturated Premium Color blocks */}
            <div id="skills" className="md:col-span-2 lg:col-span-2 grid grid-cols-1 gap-6">
              {displaySkills.map((skill, idx) => {
                const colorConfig = skillCardColors[idx % skillCardColors.length];
                return (
                  <BentoCard key={idx} className={`w-full border ${colorConfig.border}`} bgColor={colorConfig.bg} delay={0.1 * idx}>
                    <div className="space-y-4">
                      <h3 className={`text-xs font-bold uppercase tracking-widest ${colorConfig.text}`}>{skill.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(skill.items) ? skill.items : skill.items?.split(',').filter(Boolean) || []).map((item, i) => (
                          <span key={i} className={`px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm ${colorConfig.pill} border border-black/5 bg-white/40`}>
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </BentoCard>
                );
              })}
            </div>

            {/* Featured Projects - Showcase Grid */}
            <div id="projects" className="md:col-span-4 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="md:col-span-2 mb-2">
                <span className="text-[10px] font-bold text-[#9C8F7A] uppercase tracking-[0.3em] block mb-2">Selected works</span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-[#2A2724]">Featured Deployments</h2>
              </div>

              {displayProjects.map((project, idx) => (
                <BentoCard key={idx} className={`p-0 overflow-hidden group relative flex flex-col justify-end bg-[#FAF7F2] border border-[#EAE5DC] ${idx === 0 ? "md:col-span-2 aspect-[16/10] sm:aspect-[2/1]" : "aspect-square"}`} delay={0.2}>
                  {/* Image wrapper */}
                  <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 z-0">
                    <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-102" />
                    <div className="absolute inset-0 bg-[#FAF7F2]/10 group-hover:bg-transparent transition-all duration-700" />
                  </div>

                  {/* Info Block - Touch/Mobile safe rendering */}
                  <div className="relative z-10 p-6 sm:p-8 md:p-12 w-full h-full flex flex-col justify-end">
                    {/* Desktop Overlay: Slides up on hover */}
                    <div className="hidden md:block bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_10px_40px_rgba(42,39,36,0.05)] border border-[#EAE5DC]">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl sm:text-2xl font-black tracking-tight text-[#2A2724]">{project.name}</h4>
                        <span className="text-[9px] font-bold text-[#5E5A54] uppercase tracking-widest shrink-0 bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EAE5DC]">{project.tags}</span>
                      </div>
                      <p className="text-[#5E5A54] text-sm mb-6 max-w-md">{project.desc}</p>
                      <a href={project.link || "#"} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2A2724] group/link">
                        Explore Case Study <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                      </a>
                    </div>

                    {/* Mobile Card Layout: Persistent readable overlay on touch devices */}
                    <div className="block md:hidden w-full bg-white p-5 rounded-[1.5rem] shadow-[0_8px_30px_rgba(42,39,36,0.04)] border border-[#EAE5DC]">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h4 className="text-lg font-black tracking-tight leading-tight text-[#2A2724]">{project.name}</h4>
                        <span className="text-[8px] font-bold text-[#5E5A54] uppercase tracking-wider shrink-0 bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#EAE5DC]">{project.tags}</span>
                      </div>
                      <p className="text-[#5E5A54] text-xs mb-4 leading-normal">{project.desc}</p>
                      <a href={project.link || "#"} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2A2724]">
                        Explore Case Study <span>→</span>
                      </a>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>

            {/* Experience Timeline - Elegant Colorful Slate Card */}
            <BentoCard id="experience" bgColor="bg-[#F0FDFA]" className="md:col-span-4 lg:col-span-4 lg:row-span-2 border border-[#CCFBF1]" delay={0.3}>
              <div className="space-y-8 sm:space-y-10">
                <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-[0.3em] block">Chronology</span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-[#115E59]">Career History</h3>
                <div className="space-y-10">
                  {displayExperience.map((exp, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-8 group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] rounded-2xl flex items-center justify-center font-black group-hover:bg-[#115E59] group-hover:text-white transition-colors shrink-0 text-sm sm:text-base">
                        0{idx + 1}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                          <h4 className="text-lg sm:text-xl font-bold leading-tight text-[#115E59]">{exp.role}</h4>
                          <span className="text-[10px] font-bold text-[#0F766E] uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <p className="text-sm font-bold text-[#0D9488] uppercase tracking-widest">{exp.company}</p>
                        <p className="text-sm text-[#134E4A] leading-relaxed italic">&gt; {exp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* About Narrative - Warm Champagne colored block */}
            <BentoCard bgColor="bg-[#FEF9C3]" className="md:col-span-2 lg:col-span-2 border border-[#FEF08A] p-8 sm:p-10 overflow-hidden relative group">
              <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-[#854D0E] uppercase tracking-widest mb-6">{aboutUsTitle}</h3>
                  <p className="text-base sm:text-lg font-bold leading-relaxed tracking-tight text-[#713F12]">
                    {aboutBio}
                  </p>
                </div>
                <div className="space-y-4 pt-6 border-t border-[#FEF08A] w-full">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#854D0E] uppercase tracking-widest font-bold">Processing Power</span>
                    <span className="font-bold text-[#713F12]">{experience_years}+ Yrs</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Social Links Card - Apple Inspired Fully Saturated Colored Grid */}
            <BentoCard className="md:col-span-2 lg:col-span-2 bg-white border border-[#EAE5DC] items-center justify-center p-0 min-h-[160px] sm:min-h-0">
              <div className="grid grid-cols-2 w-full h-full text-center">
                <a href={githubUrl} className="flex items-center justify-center border-r border-[#EAE5DC] bg-[#FCE7F3] hover:opacity-90 transition-all font-black uppercase tracking-widest text-[11px] sm:text-xs py-6 text-[#9D174D]">GitHub</a>
                <a href={linkedinUrl} className="flex items-center justify-center bg-[#E0F7FA] hover:opacity-90 transition-all font-black uppercase tracking-widest text-[11px] sm:text-xs py-6 text-[#006064]">LinkedIn</a>
                <a href={twitterUrl} className="flex items-center justify-center border-t border-[#EAE5DC] border-r bg-[#EDE7F6] hover:opacity-90 transition-all font-black uppercase tracking-widest text-[11px] sm:text-xs py-6 text-[#4A148C]">Twitter</a>
                <a href={`mailto:${email}`} className="flex items-center justify-center border-t border-[#EAE5DC] bg-[#E8F5E9] hover:opacity-90 transition-all font-black uppercase tracking-widest text-[11px] sm:text-xs py-6 text-[#1B5E20]">Email</a>
              </div>
            </BentoCard>

          </div>

          {/* Contact Section - Apple Editorial Fully Saturated Peach Accent */}
          <section id="contact" className="mt-24 sm:mt-32 pt-24 sm:pt-32 border-t border-[#EAE5DC]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              <div>
                <span className="text-[10px] font-bold text-[#9C8F7A] uppercase tracking-[0.3em] block mb-2">Signal Connection</span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-none mb-8 sm:mb-12 text-[#2A2724]">
                  Let&apos;s build.<br /><span className="text-[#9C8F7A]">Timeless UI.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#5E5A54] max-w-md leading-relaxed font-medium">
                  Currently accepting new design partnerships, consulting mandates, and creative inquiries.
                </p>
              </div>
              <div className="bg-[#FFF7ED] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 border border-[#FED7AA] shadow-[0_10px_40px_rgba(42,39,36,0.02)] w-full">
                <form className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C2410C] font-bold">Identity</label>
                      <input type="text" placeholder="Your Name" className="w-full bg-white border border-[#FED7AA] rounded-2xl p-4 outline-none focus:border-[#EA580C] transition-all text-sm font-semibold text-[#7C2D12]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C2410C] font-bold">Signal Address</label>
                      <input type="email" placeholder="Your Email" className="w-full bg-white border border-[#FED7AA] rounded-2xl p-4 outline-none focus:border-[#EA580C] transition-all text-sm font-semibold text-[#7C2D12]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C2410C] font-bold">Message</label>
                    <textarea rows={4} placeholder="How can I help you?" className="w-full bg-white border border-[#FED7AA] rounded-2xl p-4 outline-none focus:border-[#EA580C] transition-all resize-none text-sm font-semibold text-[#7C2D12]" />
                  </div>
                  <button className="w-full py-5 bg-[#EA580C] text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#C2410C] transition-colors shadow-lg shadow-[#EA580C]/10">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-32 sm:mt-40 py-16 sm:py-20 px-6 border-t border-[#EAE5DC] text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-bold uppercase tracking-[0.5em] text-[#5E5A54]">
            <span>{footerCopyright || `© ${new Date().getFullYear()} / ${name.toUpperCase()} CREATIVE DESIGN`}</span>
            <div className="flex gap-12">
              <a href="#" className="hover:text-[#2A2724] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#2A2724] transition-colors">Terms</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#2A2724] font-black tracking-widest"
            >
              UPWARD ↑
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #9C8F7A; border-radius: 10px; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
