import TemplateLayout from "./TemplateLayout";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const HorizontalScroll = ({ items = [] }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12">
          {items.map((item, idx) => (
            <div key={idx} className="group relative h-[45vh] w-[70vw] md:w-[35vw] shrink-0 overflow-hidden rounded-2xl bg-zinc-900 shadow-xl">
              <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <span className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.4em]">{item.tags}</span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">{item.name}</h3>
                <p className="text-zinc-400 text-sm max-w-md italic leading-relaxed">&quot;{item.desc}&quot;</p>
                <a href={item.link || "#"} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white border-b border-orange-500 pb-1 hover:bg-orange-500 hover:text-black transition-all px-2">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function PortfolioTemplate7({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    name = "Xavier Storm",
    navbarType = "Text",
    navFontSize = 20,
    logoUrl = "",
    heroTitle = "CRAFTING THE FUTURE OF DIGITAL COMMERCE.",
    heroSubtitle = "Creative Engineering Studio",
    heroDescription = "We don't just build websites; we create digital landmarks. Our philosophy is rooted in the architecture of craft and technical excellence.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "THE ARCHITECTURE OF CRAFT",
    aboutBio = "We don't just build websites; we create digital landmarks. Our philosophy is rooted in the architecture of craft and technical excellence. Every project is a journey through precision and passion.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "storm@cyber.io",
    aboutPhone = "+1 777 000 7777",
    aboutLocation = "Neo-Tokyo",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "storm@cyber.io",
    phone = "+1 777 000 7777",
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
    { name: "Neon Nexus", desc: "High-performance digital ecosystem for commerce.", image: "/images/templates/template-img-11.jpg", link: "#", tags: "E-COMMERCE / 2024" },
    { name: "Aether OS", desc: "Spatial interface design for next-gen creative tools.", image: "/images/templates/template-img-12.jpg", link: "#" },
    { name: "Nova Studio", desc: "Immersive visual experience for luxury brands.", image: "/images/templates/template-img-21.jpg", link: "#" }
  ];

  const defaultSkills = [
    { category: "Creative_Engineering", items: "React, Three.js, WebGL, GLSL" },
    { category: "System_Design", items: "Node.js, Rust, Go, GraphQL" },
    { category: "Digital_Strategy", items: "Brand Vision, UX Research, SEO" }
  ];

  const defaultExperience = [
    { role: "Design Lead", company: "Arasaka Digital", period: "2022 - Present", desc: "Leading the creative engineering team in building high-end commerce solutions." },
    { role: "Product Engineer", company: "Stripe", period: "2019 - 2022", desc: "Scaling global payment interfaces with pixel precision." }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-black overflow-x-hidden">

        {/* Navigation */}
        <nav className={`sticky top-0 left-0 right-0 z-[110] px-6 md:px-12 py-6 flex justify-center transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-2xl py-4" : "bg-transparent"}`}>
          <div className="max-w-7xl w-full flex justify-between items-center">
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={40} height={40} className="rounded-sm border border-orange-500/20 shadow-lg" />
              ) : (
                <div 
                  className="font-black tracking-tighter uppercase italic"
                  style={{ fontSize: `${navFontSize}px` }}
                >
                  {name.split(" ")[0]}<span className="text-orange-500">.</span>
                </div>
              )}
            </div>

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
                  className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-white transition-all italic"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <main>
          {/* Hero - Balanced Typography */}
          <section id="home" className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-12 relative overflow-hidden">
            {/* Hero Background Image */}
            {avatarUrl && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image 
                  src={avatarUrl} 
                  alt="Background" 
                  fill 
                  className="object-cover opacity-40 grayscale brightness-[0.6]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-orange-500" />
                <span 
                  className="text-orange-500 font-black uppercase tracking-[0.4em]"
                  style={{ fontSize: `${heroSubtitleSize}px` }}
                >
                  {heroSubtitle}
                </span>
              </div>
              <h1 
                className="font-black leading-tight tracking-tighter uppercase mb-12 italic"
                style={{ fontSize: `${heroTitleSize}px` }}
              >
                {heroTitle}
              </h1>
              <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                <p 
                  className="text-zinc-400 max-w-xl leading-relaxed font-medium"
                  style={{ fontSize: `${heroDescSize}px` }}
                >
                  {heroDescription}
                </p>
              </div>
            </motion.div>
          </section>

          {/* Horizontal Scroll Work Section */}
          <section id="projects">
            <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-zinc-900 mb-[-2rem] relative z-0">FEATURE_WORK</h2>
              <div className="relative z-10 flex justify-between items-end">
                <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.6em]">CASE_STUDIES</span>
                <span className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em]">SCROLL_DOWN</span>
              </div>
            </div>
            <HorizontalScroll items={displayProjects} />
          </section>

          {/* About Section */}
          <section id="about" className="py-32 px-6 md:px-12 bg-zinc-900/50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-video md:aspect-[4/5] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <Image src={aboutImage || avatarUrl || '/images/templates/template-img-50.jpg'} alt={name || "About Image"} fill className="object-cover" />
                <div className="absolute inset-0 bg-orange-500/5 mix-blend-overlay" />
              </div>
              <div className="space-y-10">
                <h2 className="text-xs font-black uppercase tracking-[0.6em] text-orange-500">{aboutUsTitle}</h2>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.1] uppercase italic">
                  {aboutBio}
                </h3>
                <div className="flex flex-col gap-6 pt-6 border-t border-zinc-800">
                  <div className="flex gap-16">
                    <div>
                      <span className="block text-3xl font-black text-white mb-1">{experience_years}+</span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Expertise Section */}
          <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="space-y-24">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">CORE_EXPERTISE</h2>
                <span className="text-orange-500 text-4xl italic">/03</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {displaySkills.map((skill, idx) => (
                  <div key={idx} className="space-y-8 group">
                    <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] group-hover:text-orange-500 transition-colors">PILLAR_{idx + 1}</span>
                    <h4 className="text-2xl font-black tracking-tight uppercase leading-none">{skill.category}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed italic">&gt; {skill.items}</p>
                    <div className="h-px w-full bg-zinc-800 group-hover:bg-orange-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section id="experience" className="py-32 px-6 md:px-12 bg-white text-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-tight">THE<br />JOURNEY</h2>
                <p className="text-lg text-zinc-400 mt-8 max-w-xs italic">A chronicle of creative engineering and digital leadership.</p>
              </div>
              <div className="lg:col-span-8 space-y-20">
                {displayExperience.map((exp, idx) => (
                  <div key={idx} className="group relative flex flex-col md:flex-row justify-between items-start gap-8 border-b border-zinc-200 pb-12 hover:border-black transition-colors">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">{exp.period}</span>
                      <h3 className="text-3xl font-black tracking-tighter uppercase italic">{exp.role}</h3>
                    </div>
                    <div className="space-y-2 md:text-right">
                      <p className="text-2xl font-black text-zinc-300 uppercase">{exp.company}</p>
                      <p className="text-xs text-zinc-500 max-w-md italic">&quot;{exp.desc}&quot;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-40 px-6 md:px-12 text-center relative overflow-hidden bg-black">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter leading-none uppercase italic mb-12">LOREN_IPSUM</h2>
              <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-20 italic">
                Ready to transcend the digital ordinary? Let&apos;s build the next landmark.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
                <a href={`mailto:${email}`} className="text-3xl md:text-5xl font-black border-b-4 border-orange-500 pb-2 hover:text-orange-500 transition-all uppercase italic">
                  {email}
                </a>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                  <a href={linkedinUrl} className="hover:text-white transition-colors">LinkedIn</a>
                  <a href={githubUrl} className="hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="py-12 px-6 md:px-12 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center text-black font-black italic">X</div>
              <span>{footerCopyright || `© {new Date().getFullYear()} / {name.toUpperCase()} STUDIO`}</span>
            </div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white bg-zinc-900 px-6 py-2 rounded-sm hover:bg-orange-500 hover:text-black transition-colors"
            >
              Top ↑
            </motion.button>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}




