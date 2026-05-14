import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const LuxuryCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
    className={`bg-zinc-950/40 backdrop-blur-xl border border-gold-500/10 rounded-2xl p-10 hover:border-gold-500/30 hover:shadow-[0_0_50px_rgba(212,175,55,0.05)] transition-all duration-700 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ title, subtitle, centered = false }) => (
  <div className={`mb-24 ${centered ? "text-center" : ""}`}>
    <motion.span
      initial={{ opacity: 0, tracking: "0.2em" }}
      whileInView={{ opacity: 1, tracking: "0.5em" }}
      className="text-gold-500 font-bold uppercase text-[10px] block mb-6"
    >
      {subtitle}
    </motion.span>
    <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-none italic">
      {title}
    </h2>
  </div>
);

export default function PortfolioTemplate8({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    name = "Aria Moss",
    heroTitle = "CRAFTING TIMELESS DIGITAL LEGACIES.",
    role = "Principal Experience Architect",
    bio = "Defining the intersection of digital craft and luxury experience. Orchestrating high-end digital journeys for global elite brands.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    aboutUsTitle = "The Art of the Possible",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "aria@luxury.com",
    phone = "+1 777 000 7777",
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
    { name: "The Royal Suite", desc: "A seamless integration of heritage and technology for a legendary hotel group.", image: "/images/templates/template-img-11.jpg", link: "#", tags: "Hospitality, 2024" },
    { name: "Elysium Chrono", desc: "Digital boutique for artisanal watchmakers, focusing on precision and elegance.", image: "/images/templates/template-img-12.jpg", link: "#", tags: "Luxury Retail" },
    { name: "Vogue Global Hub", desc: "Reimagining the digital presence of the world's leading fashion authority.", image: "/images/templates/template-img-21.jpg", link: "#", tags: "Editorial" }
  ];

  const defaultSkills = [
    { category: "Creative Direction", items: "Strategy, UI/UX, Motion, Vision" },
    { category: "Technological Craft", items: "Next.js, Three.js, GSAP, Shaders" },
    { category: "Experience Design", items: "Luxury Branding, Accessibility, Art Direction" }
  ];

  const defaultExperience = [
    { role: "Executive Director", company: "Vogue Global", period: "2020 - Present", desc: "Orchestrating the digital transformation of heritage fashion content." },
    { role: "Senior Architect", company: "Stripe Luxury", period: "2017 - 2020", desc: "Defining elite payment experiences for high-net-worth ecosystems." }
  ];

  const defaultServices = [
    { title: "Digital Strategy", desc: "Tailored strategies for elite brands seeking digital immortality.", icon: "⚜️" },
    { title: "Art Direction", desc: "Crafting visual languages that resonate with sophisticated audiences.", icon: "💎" },
    { title: "Experience Hub", desc: "Building high-performance ecosystems with artisanal code.", icon: "🏛️" }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-gold-500 selection:text-black overflow-x-hidden">

        {/* Animated Background Bokeh */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gold-900/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-zinc-900/40 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>

        {/* Luxury Navigation */}
        <nav className={` top-0 left-0 right-0 z-[110] px-8 md:px-20 py-8 transition-all duration-700 ${isScrolled ? "bg-black/80 backdrop-blur-3xl py-6 border-b border-gold-500/10" : "bg-transparent"}`}>
          <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-gold-500/50 flex items-center justify-center font-serif italic text-gold-500 text-2xl">
                {name.charAt(0)}
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.5em] text-white hidden sm:block">{name}</span>
            </div>

            <div className="hidden md:flex gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
              {['Collection', 'Narrative', 'Heritage', 'Inquiry'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold-500 transition-all hover:translate-y-[-2px]">{item}</a>
              ))}
            </div>

            <a href={`mailto:${email}`} className="px-10 py-3 border border-gold-500 text-gold-500 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gold-500 hover:text-black transition-all duration-500">
              Private Inquiry
            </a>
          </div>
        </nav>

        <main className="relative z-10">
          {/* Hero - Cinematic Entrance */}
          <section id="collection" className="min-h-screen flex flex-col justify-center px-8 md:px-20 max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="h-[1px] w-20 bg-gold-500/40" />
                <span className="text-gold-500 text-[11px] font-bold uppercase tracking-[0.6em]">{role}</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7vw] font-serif italic text-white leading-tight tracking-tight mb-16">
                {heroTitle}
              </h1>
              <div className="flex flex-col md:flex-row justify-between items-end gap-16">
                <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl leading-relaxed italic font-light">
                  &quot;{bio}&quot;
                </p>
                <div className="flex gap-12">
                  <div className="flex flex-col items-end">
                    <span className="text-4xl font-serif italic text-gold-500">12+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Years Excellence</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-4xl font-serif italic text-gold-500">50+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Curated Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Collection - The Masterpieces */}
          <section className="py-60 px-8 md:px-20 max-w-[1600px] mx-auto">
            <SectionHeading title="The Curated Collection" subtitle="MASTERPIECES" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {displayProjects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className={`group ${idx % 2 !== 0 ? "md:pt-40" : ""}`}
                >
                  <div className="aspect-[4/5] relative overflow-hidden rounded-sm mb-12 shadow-2xl">
                    <Image src={project.image} alt={project.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gold-900/5 group-hover:bg-transparent transition-all duration-1000" />
                    <div className="absolute inset-0 border border-gold-500/10 group-hover:border-gold-500/30 transition-all duration-700 pointer-events-none" />
                  </div>
                  <div className="space-y-6">
                    <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.5em]">{project.tags}</span>
                    <h3 className="text-4xl font-serif italic text-white tracking-tight">{project.name}</h3>
                    <p className="text-zinc-500 text-lg leading-relaxed italic max-w-md">&quot;{project.desc}&quot;</p>
                    <a href={project.link || "#"} className="inline-flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] text-white group-hover:text-gold-500 transition-colors">
                      Discover Experience <span className="group-hover:translate-x-4 transition-transform">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Narrative - About the Artist */}
          <section id="narrative" className="py-60 px-8 md:px-20 bg-zinc-950/40">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
              <div className="relative">
                <div className="aspect-[3/4] relative rounded-sm overflow-hidden z-10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_0_80px_rgba(212,175,55,0.05)]">
                  <Image src={avatarUrl} alt={name} fill className="object-cover" />
                </div>
                <div className="absolute -top-10 -left-10 w-full h-full border border-gold-500/20 -z-0" />
                <div className="absolute -bottom-10 -right-10 p-12 bg-zinc-950 border border-gold-500/10 z-20 hidden md:block">
                  <p className="text-gold-500 font-serif italic text-3xl mb-2">ARIA_MOSS</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Signed Presence</p>
                </div>
              </div>

              <div className="space-y-16">
                <SectionHeading title={aboutUsTitle} subtitle="THE PHILOSOPHY" />
                <p className="text-2xl text-zinc-400 font-light italic leading-relaxed">
                  &quot;Luxury is not about excess; it is about the perfection of detail. In the digital realm, this translates to a relentless pursuit of artisanal code and cinematic experiences.&quot;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
                  {displaySkills.map((skill, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500">{skill.category}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed italic">{skill.items}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Signature Services */}
          <section className="py-60 px-8 md:px-20 max-w-[1600px] mx-auto">
            <SectionHeading title="Signature Offerings" subtitle="SERVICES" centered />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {displayServices.map((service, idx) => (
                <LuxuryCard key={idx} delay={idx * 0.1}>
                  <div className="text-5xl mb-12 opacity-50">{service.icon}</div>
                  <h3 className="text-2xl font-serif italic text-white mb-6 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed italic mb-10">&quot;{service.desc}&quot;</p>
                  <div className="h-[1px] w-12 bg-gold-500/40" />
                </LuxuryCard>
              ))}
            </div>
          </section>

          {/* Heritage - The Journey */}
          <section id="heritage" className="py-60 px-8 md:px-20 bg-black/40">
            <div className="max-w-4xl mx-auto space-y-32">
              <SectionHeading title="The Professional Heritage" subtitle="TIMELINE" centered />
              <div className="space-y-24 relative">
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold-500/10" />
                {displayExperience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row gap-12 md:gap-20 relative z-10 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 border border-gold-500 bg-black rotate-45" />
                    <div className="w-full md:w-1/2">
                      <div className={`p-10 border border-gold-500/5 bg-zinc-950/50 backdrop-blur-xl ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{exp.period}</span>
                        <h3 className="text-2xl font-serif italic text-white mb-2 uppercase">{exp.role}</h3>
                        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 italic">{exp.company}</p>
                        <p className="text-sm text-zinc-400 leading-relaxed italic">&gt; {exp.desc}</p>
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials - Commendations */}
          <section className="py-60 px-8 md:px-20 max-w-[1600px] mx-auto">
            <SectionHeading title="The Commendations" subtitle="REMARKS" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {testimonials.length > 0 ? testimonials.map((t, i) => (
                <LuxuryCard key={i} delay={i * 0.1} className="text-center">
                  <p className="text-2xl font-serif italic text-zinc-300 leading-relaxed mb-10">&quot;{t.text}&quot;</p>
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-gold-500 font-bold uppercase text-[10px] tracking-widest">{t.name}</span>
                    <span className="text-zinc-600 text-[9px] uppercase tracking-widest">{t.role}</span>
                  </div>
                </LuxuryCard>
              )) : (
                <LuxuryCard className="md:col-span-2 text-center">
                  <p className="text-3xl font-serif italic text-gold-500 leading-relaxed mb-10">&quot;Aria's vision for digital luxury is unparalleled. She doesn't just build websites; she crafts heirlooms.&quot;</p>
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-white font-bold uppercase text-[11px] tracking-[0.5em]">JULIAN VANE</span>
                    <span className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">FOUNDER @ VANE LUXURY</span>
                  </div>
                </LuxuryCard>
              )}
            </div>
          </section>

          {/* Contact - The Inquiry */}
          <section id="inquiry" className="py-80 px-8 md:px-20 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 blur-[150px] rounded-full pointer-events-none" />
            <FadeUp>
              <h2 className="text-6xl md:text-9xl font-serif italic text-white tracking-tighter mb-24 uppercase">Establish<br /><span className="text-gold-500">Uplink.</span></h2>
              <div className="flex flex-col items-center gap-16">
                <a href={`mailto:${email}`} className="text-3xl md:text-6xl font-serif italic text-white border-b-2 border-gold-500 pb-4 hover:text-gold-500 transition-all duration-700">
                  {email}
                </a>
                <div className="flex gap-16 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600">
                  <a href={linkedinUrl} className="hover:text-white transition-colors">LinkedIn</a>
                  <a href={githubUrl} className="hover:text-white transition-colors">GitHub</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                </div>
              </div>

              <div className="max-w-2xl mx-auto mt-40">
                <LuxuryCard className="p-16 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Patron Name</label>
                      <input type="text" placeholder="Julian Vane" className="w-full bg-transparent border-b border-gold-500/20 py-4 outline-none focus:border-gold-500 transition-all text-white italic" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Private Email</label>
                      <input type="email" placeholder="vane@estates.com" className="w-full bg-transparent border-b border-gold-500/20 py-4 outline-none focus:border-gold-500 transition-all text-white italic" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">The Brief</label>
                    <textarea rows={4} placeholder="Tell us about your legacy project..." className="w-full bg-transparent border-b border-gold-500/20 py-4 outline-none focus:border-gold-500 transition-all text-white italic resize-none" />
                  </div>
                  <button className="w-full py-6 border border-gold-500 text-gold-500 font-bold uppercase tracking-[0.5em] text-[11px] hover:bg-gold-500 hover:text-black transition-all duration-700">
                    Send Transmission
                  </button>
                </LuxuryCard>
              </div>
            </FadeUp>
          </section>
        </main>

        <footer className="py-20 px-8 md:px-20 border-t border-gold-500/10">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600">
            <div className="flex items-center gap-6">
              <span className="text-xl font-serif italic text-white uppercase tracking-tighter">{name}</span>
              <span className="h-4 w-[1px] bg-zinc-800" />
              <span>© {new Date().getFullYear()} / DIGITAL_HEIRLOOM_V8</span>
            </div>
            <div className="flex gap-16">
              <a href="#" className="hover:text-gold-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold-500 transition-colors">Concierge</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, color: "#D4AF37" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="uppercase tracking-[0.4em]"
            >
              Top ↑
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 3px; }
          ::-webkit-scrollbar-track { background: #0a0a0a; }
          ::-webkit-scrollbar-thumb { background: #D4AF37; }
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,300;1,700&display=swap');
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .text-gold-500 { color: #D4AF37; }
          .bg-gold-500 { background-color: #D4AF37; }
          .border-gold-500 { border-color: #D4AF37; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}

const FadeUp = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>
);
