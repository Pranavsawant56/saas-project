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

  const {
    name = "Alex Smith",
    heroTitle = "Think different.",
    role = "Digital Product Designer",
    bio = "Designing simple solutions for complex problems with extreme precision and focus.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    aboutUsTitle = "The Philosophy of Less",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "hello@alexsmith.com",
    phone = "+1 234 567 890",
    githubUrl = "#",
    linkedinUrl = "#",
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
    <TemplateLayout data={data} theme="light" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
        
        {/* Minimal Floating Navbar */}
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-8 py-10 md:px-20 ${isScrolled ? "py-6 bg-white/80 backdrop-blur-2xl border-b border-zinc-100" : ""}`}>
          <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black tracking-tighter">
              {name.split(" ")[0]}.
            </motion.div>
            
            <div className="hidden md:flex items-center gap-16 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              {['About', 'Work', 'Services', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-black transition-colors">{item}</a>
              ))}
            </div>

            <a href={`mailto:${email}`} className="text-[11px] font-black uppercase tracking-[0.3em] bg-black text-white px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all">
              Connect
            </a>
          </div>
        </nav>

        <main>
          {/* Hero - Massive & Cinematic */}
          <section id="home" className="min-h-screen flex flex-col justify-center pt-40 pb-20 px-8 md:px-20 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.6em] text-zinc-400 mb-8 block">{role}</span>
              <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tight mb-20">
                {heroTitle}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="flex flex-col md:flex-row justify-between items-end gap-12"
            >
              <p className="text-2xl md:text-3xl text-zinc-500 max-w-2xl font-medium leading-[1.2]">
                {bio}
              </p>
              <div className="relative w-48 h-48 rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <Image src={avatarUrl} alt={name} fill className="object-cover" />
              </div>
            </motion.div>
          </section>

          {/* About Section - Whitespace Focus */}
          <section id="about" className="py-60 px-8 md:px-20 bg-zinc-50/50">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
                <FadeUp>
                  <h2 className="text-xs font-bold uppercase tracking-[0.6em] text-zinc-400 mb-12">{aboutUsTitle}</h2>
                  <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 leading-[1.1]">
                    Design is not just what it looks like and feels like. Design is how it works.
                  </h3>
                  <p className="text-xl text-zinc-500 leading-relaxed max-w-xl">
                    I believe in the power of subtraction. By removing the unnecessary, we reveal the essential. Every project I undertake is a search for that core truth.
                  </p>
                </FadeUp>
                <div className="grid grid-cols-2 gap-6">
                  {[11, 12, 21, 22].map((imgId, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`relative aspect-square rounded-[2rem] overflow-hidden ${idx % 2 !== 0 ? "mt-12" : ""}`}
                    >
                      <Image src={`/images/templates/template-img-${imgId}.jpg`} alt="Studio" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects - Large Images */}
          <section id="work" className="py-60 px-8 md:px-20 max-w-[1400px] mx-auto">
            <FadeUp>
              <h2 className="text-xs font-bold uppercase tracking-[0.6em] text-zinc-400 mb-32">Selected Works</h2>
            </FadeUp>
            
            <div className="space-y-60">
              {displayProjects.map((project, idx) => (
                <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-24 items-center group`}>
                  <div className="w-full md:w-3/5">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] group-hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] transition-all duration-1000"
                    >
                      <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-1000" />
                    </motion.div>
                  </div>
                  <div className="w-full md:w-2/5 space-y-10">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.5em]">0{idx + 1}</span>
                      <h4 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">{project.name}</h4>
                    </div>
                    <p className="text-xl text-zinc-400 font-medium italic leading-relaxed">&quot;{project.desc}&quot;</p>
                    <a 
                      href={project.link || "#"}
                      className="inline-flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] pt-10 border-b-2 border-black"
                    >
                      Explore Case Study <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services - Minimalist Grid */}
          <section id="services" className="py-60 px-8 md:px-20 bg-black text-white rounded-[5rem] mx-6">
            <div className="max-w-[1400px] mx-auto text-center">
              <FadeUp>
                <h2 className="text-xs font-bold uppercase tracking-[0.8em] text-zinc-600 mb-32">Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                  {displayServices.map((service, idx) => (
                    <div key={idx} className="space-y-10 p-12 hover:bg-white/5 rounded-[3rem] transition-colors duration-700">
                      <div className="text-5xl opacity-40">{service.icon}</div>
                      <h4 className="text-3xl font-bold tracking-tighter">{service.title}</h4>
                      <p className="text-zinc-500 text-lg leading-relaxed">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>

          {/* Experience - Vertical Minimalist */}
          <section id="experience" className="py-60 px-8 md:px-20 max-w-4xl mx-auto">
            <FadeUp>
              <h2 className="text-xs font-bold uppercase tracking-[0.6em] text-zinc-400 mb-32 text-center">Timeline</h2>
              <div className="space-y-32">
                {displayExperience.map((exp, idx) => (
                  <div key={idx} className="relative pl-12 border-l-2 border-zinc-100 pb-20 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black ring-8 ring-white" />
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em] block">{exp.period}</span>
                      <h4 className="text-4xl font-bold tracking-tighter leading-none">{exp.role}</h4>
                      <p className="text-xl font-bold text-zinc-400">{exp.company}</p>
                      <p className="text-lg text-zinc-500 leading-relaxed italic">&gt; {exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </section>

          {/* Contact - Pure Typography */}
          <section id="contact" className="py-80 px-8 text-center max-w-[1400px] mx-auto">
            <FadeUp>
              <h2 className="text-8xl md:text-[12vw] font-black tracking-tighter mb-24 leading-none">Let&apos;s build.</h2>
              <div className="flex flex-col md:flex-row justify-center gap-20 items-center">
                <a href={`mailto:${email}`} className="text-3xl md:text-5xl font-bold border-b-[6px] border-black pb-4 hover:opacity-40 transition-opacity tracking-tight">
                  {email}
                </a>
                <div className="flex gap-16 text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-400">
                  <a href={linkedinUrl} className="hover:text-black transition-colors">LinkedIn</a>
                  <a href={githubUrl} className="hover:text-black transition-colors">GitHub</a>
                </div>
              </div>
            </FadeUp>
          </section>
        </main>

        <footer className="py-20 px-8 md:px-20 border-t border-zinc-100">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">
            <span>© {new Date().getFullYear()} / {name.toUpperCase()} CREATIVE</span>
            <div className="flex gap-12">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-black"
            >
              Back to Top ↑
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: #fff; }
          ::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
          body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
          .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
