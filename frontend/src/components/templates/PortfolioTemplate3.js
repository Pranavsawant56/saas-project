import TemplateLayout from "./TemplateLayout";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

export default function PortfolioTemplate3({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    name = "Alex Smith",
    navbarType = "Text",
    navFontSize = 20,
    logoUrl = "",
    heroTitle = "Think different.",
    heroSubtitle = "Digital Product Designer",
    heroDescription = "Designing simple solutions for complex problems with extreme precision and focus.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 120,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "The Philosophy of Less",
    aboutBio = "Designing simple solutions for complex problems with extreme precision and focus. My approach is rooted in the belief that less is always more.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "hello@alexsmith.com",
    aboutPhone = "+1 234 567 890",
    aboutLocation = "Stockholm, SE",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "hello@alexsmith.com",
    phone = "+1 234 567 890",
    githubUrl = "#",
    linkedinUrl = "#",
    footerCopyright = ""
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultProjects = [
    { name: "EcoStream", desc: "Sustainable infrastructure management.", image: "/images/templates/template-img-11.jpg", link: "#" },
    { name: "Nova OS", desc: "Minimalist desktop ecosystem.", image: "/images/templates/template-img-12.jpg", link: "#" },
    { name: "Aether", desc: "Spatial audio design system.", image: "/images/templates/template-img-21.jpg", link: "#" }
  ];

  const defaultServices = [
    { title: "Interaction Design", desc: "Crafting intuitive touchpoints for human-centered products.", icon: "✨" },
    { title: "Product Strategy", desc: "Defining clear roadmaps for complex digital ecosystems.", icon: "🎯" },
    { title: "Visual Engineering", desc: "Building high-performance interfaces with pixel precision.", icon: "🛠️" }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displayServices = services.length > 0 ? services : defaultServices;
  const displayExperience = experience.length > 0 ? experience : [
    { role: "Senior Designer", company: "Apple", period: "2021 - Present", desc: "Leading design for the next generation of creative tools." },
    { role: "Product Designer", company: "Stripe", period: "2018 - 2021", desc: "Unified global payment experiences through minimalist design." }
  ];

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#06040a] text-white font-sans selection:bg-pink-500 selection:text-white overflow-hidden relative">

        {/* Cinematic Glowing Background Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-[5%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 blur-[100px] sm:blur-[150px] rounded-full animate-pulse" />
          <div className="absolute top-[35%] right-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-bl from-cyan-500 via-purple-600 to-blue-600 blur-[120px] sm:blur-[180px] rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-[10%] left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-[100px] sm:blur-[160px] rounded-full animate-pulse delay-2000" />
        </div>

        {/* Elegant Glassmorphic Navbar */}
        <nav className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-700 px-4 sm:px-8 py-6 md:px-20 flex justify-center ${isScrolled ? "bg-[#0c0919]/70 backdrop-blur-2xl border-b border-white/5 py-4" : ""}`}>
          <div className="max-w-[1400px] w-full flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3.5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={40} height={40} className="rounded-lg" />
              ) : (
                <span 
                  className="font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400"
                  style={{ fontSize: `clamp(1rem, 4vw, ${navFontSize}px)` }}
                >
                  {name}
                </span>
              )}
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-12">
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
                  className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Nav Toggle */}
            <button
               className="flex md:hidden p-2 z-[110] text-white cursor-pointer items-center justify-center bg-white/5 rounded-full border border-white/10"
               onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
               }}
            >
               {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
               ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
               )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed inset-0 z-[90] h-screen w-screen bg-[#06040a]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 md:hidden"
            >
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' }
              ].map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-[0.3em] text-zinc-300 hover:text-white transition-all hover:scale-110"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10">
          
          {/* Hero - Massive, Fluid & Cinematic */}
          <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 sm:px-8 md:px-20 max-w-[1400px] mx-auto relative overflow-hidden">
            {/* Hero Background Image */}
            {avatarUrl && (
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem] border border-white/5">
                <Image 
                  src={avatarUrl} 
                  alt="Background" 
                  fill 
                  className="object-cover opacity-15 grayscale hover:grayscale-0 transition-all duration-[2s] scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#06040a] via-transparent to-[#06040a] z-10" />
              </div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full"
            >
              <span 
                className="font-black uppercase tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6 block"
                style={{ fontSize: `clamp(0.8rem, 2.5vw, ${heroSubtitleSize}px)` }}
              >
                {heroSubtitle}
              </span>
              <h1 
                className="font-black leading-[0.85] tracking-tight mb-16 break-words w-full text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-zinc-400"
                style={{ fontSize: `clamp(2.5rem, 8vw, ${heroTitleSize}px)` }}
              >
                {heroTitle}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10"
            >
              <p 
                className="text-zinc-400 max-w-2xl font-light leading-relaxed"
                style={{ fontSize: `clamp(1rem, 3vw, ${heroDescSize}px)` }}
              >
                {heroDescription}
              </p>
              {avatarUrl && (
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex-shrink-0">
                  <Image src={avatarUrl} alt={name} fill className="object-cover" />
                </div>
              )}
            </motion.div>
          </section>

          {/* About Section - Whitespace & Elegant Glassmorphism Focus */}
          <section id="about" className="py-24 sm:py-32 md:py-48 px-6 sm:px-8 md:px-20">
            <div className="max-w-[1400px] mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-6 sm:p-12 md:p-24 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-600/10 to-pink-500/10 blur-[100px] -mr-40 -mt-40 transition-all group-hover:bg-purple-600/20" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                <FadeUp>
                  <h2 className="text-xs font-bold uppercase tracking-[0.6em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-8 sm:mb-12">{aboutUsTitle}</h2>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-8 sm:mb-12 leading-[1.1] text-white">
                    {aboutBio}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 sm:mt-20 border-t border-white/10 pt-10">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Experience</p>
                        <p className="text-xl sm:text-2xl font-black tracking-tighter text-white">{experience_years}+ Years</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Location</p>
                        <p className="text-xl sm:text-2xl font-black tracking-tighter italic uppercase text-white">{aboutLocation}</p>
                     </div>
                     <div className="space-y-1 sm:col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Email</p>
                        <p className="text-xl sm:text-2xl font-black tracking-tighter break-all text-white">{aboutEmail}</p>
                     </div>
                  </div>
                </FadeUp>
                <div className="relative aspect-[4/5] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.1)]">
                   <Image src={aboutImage || avatarUrl} alt="About Image" fill className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Projects - Large Images */}
          <section id="projects" className="py-24 sm:py-32 md:py-48 px-6 sm:px-8 md:px-20 max-w-[1400px] mx-auto">
            <FadeUp>
              <h2 className="text-xs font-bold uppercase tracking-[0.6em] text-zinc-500 mb-16 sm:mb-24">Selected Works</h2>
            </FadeUp>

            <div className="space-y-24 sm:space-y-36 md:space-y-48">
              {displayProjects.map((project, idx) => (
                <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 sm:gap-16 md:gap-24 items-center group`}>
                  <div className="w-full md:w-3/5">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="relative aspect-[16/10] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_40px_80px_-15px_rgba(168,85,247,0.2)] transition-all duration-1000"
                    >
                      <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-1000" />
                    </motion.div>
                  </div>
                  <div className="w-full md:w-2/5 space-y-6 sm:space-y-10 text-left">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 uppercase tracking-[0.5em]">0{idx + 1}</span>
                      <h4 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">{project.name}</h4>
                    </div>
                    <p className="text-lg sm:text-xl text-zinc-400 font-light italic leading-relaxed">&quot;{project.desc}&quot;</p>
                    <a
                      href={project.link || "#"}
                      className="inline-flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] pt-6 border-b-2 border-pink-500 text-pink-400 hover:text-white transition-colors"
                    >
                      Explore Case Study <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities - Multi-Color Cards Grid */}
          <section id="skills" className="py-24 sm:py-32 px-6 sm:px-8 md:px-20 bg-gradient-to-b from-[#0e0a1b] to-[#06040a] border-y border-white/5 rounded-[3rem] sm:rounded-[5rem] mx-4 sm:mx-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/20 blur-[100px] rounded-full animate-pulse" />
            </div>
            <div className="max-w-[1400px] mx-auto text-center relative z-10">
              <FadeUp>
                <h2 className="text-xs font-bold uppercase tracking-[0.8em] text-zinc-500 mb-16 sm:mb-24">Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
                  {displayServices.map((service, idx) => (
                    <div key={idx} className="space-y-6 sm:space-y-8 p-8 sm:p-12 bg-white/5 backdrop-blur-md border border-white/10 hover:border-pink-500/30 rounded-[2.5rem] hover:bg-white/10 transition-all duration-700 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-pink-500/10 transition-all" />
                      <div className="text-4xl sm:text-5xl opacity-80">{service.icon}</div>
                      <h4 className="text-2xl sm:text-3xl font-black tracking-tighter text-white">{service.title}</h4>
                      <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>

          {/* Experience - Vertical Minimalist */}
          <section id="experience" className="py-24 sm:py-32 md:py-48 px-6 sm:px-8 md:px-20 max-w-4xl mx-auto">
            <FadeUp>
              <h2 className="text-xs font-bold uppercase tracking-[0.6em] text-zinc-500 mb-16 sm:mb-24 text-center">Timeline</h2>
              <div className="space-y-16 sm:space-y-24">
                {displayExperience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 sm:pl-12 border-l-2 border-white/10 pb-12 sm:pb-16 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500 ring-8 ring-pink-950/50" />
                    <div className="space-y-4 text-left">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] block">{exp.period}</span>
                      <h4 className="text-2xl sm:text-4xl font-black tracking-tighter leading-none text-white">{exp.role}</h4>
                      <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">{exp.company}</p>
                      <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed italic">&gt; {exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </section>

          {/* Contact - Pure Multi-Color Typography */}
          <section id="contact" className="py-32 sm:py-48 md:py-60 px-6 sm:px-8 text-center max-w-[1400px] mx-auto">
            <FadeUp>
              <h2 className="text-6xl sm:text-8xl md:text-[12vw] font-black tracking-tighter mb-16 sm:mb-24 leading-none text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Let&apos;s build.
              </h2>
              <div className="flex flex-col md:flex-row justify-center gap-10 sm:gap-20 items-center">
                <a href={`mailto:${email}`} className="text-2xl sm:text-4xl md:text-5xl font-black border-b-4 border-pink-500 pb-2 sm:pb-4 hover:opacity-75 transition-opacity tracking-tight break-all">
                  {email}
                </a>
                <div className="flex gap-10 sm:gap-16 text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-500">
                  <a href={linkedinUrl} className="hover:text-white transition-colors">LinkedIn</a>
                  <a href={githubUrl} className="hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </FadeUp>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 sm:py-20 px-6 sm:px-8 md:px-20 border-t border-white/5 relative z-10 bg-[#06040a]/80 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 text-center">
            <span>{footerCopyright || `© ${new Date().getFullYear()} / ${name.toUpperCase()} CREATIVE`}</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white bg-white/5 border border-white/10 hover:border-pink-500/30 px-5 py-2.5 rounded-full transition-all"
            >
              Back to Top ↑
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: #06040a; }
          ::-webkit-scrollbar-thumb { background: #ec4899; border-radius: 10px; }
          body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
          .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
