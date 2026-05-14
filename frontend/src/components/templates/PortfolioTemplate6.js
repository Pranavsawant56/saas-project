import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const BentoCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between ${className}`}
  >
    {children}
  </motion.div>
);

export default function PortfolioTemplate6({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    name = "Elena Solaris",
    heroTitle = "DESIGNING THE FUTURE OF INTERACTION.",
    role = "Senior Product Designer",
    bio = "Crafting high-fidelity digital experiences with a focus on human-centric design and aesthetic precision.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    aboutUsTitle = "Behind the Pixels",
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

  const defaultServices = [
    { title: "UI/UX Design", desc: "Creating intuitive interfaces.", icon: "🎨" },
    { title: "Brand Identity", desc: "Defining visual languages.", icon: "🎯" }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="light" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#F8FAFC] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white pb-20 overflow-x-hidden">

        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-6 ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-4" : "bg-transparent"}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-xl font-black tracking-tighter uppercase">{name}</span>
            <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
              {['Home', 'Work', 'About', 'Services', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-zinc-900 transition-colors">{item}</a>
              ))}
            </div>
            <a href={`mailto:${email}`} className="px-6 py-2.5 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all">
              Hire Me
            </a>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-32">
          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-auto gap-6">

            {/* Hero Card */}
            <BentoCard className="md:col-span-4 lg:col-span-4 lg:row-span-2 bg-zinc-900 text-white border-none p-12 justify-center overflow-hidden relative">
              <div className="relative z-10">
                <span className="text-zinc-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Available for new projects</span>
                <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-8 max-w-2xl">
                  {heroTitle}
                </h1>
                <p className="text-zinc-400 text-lg max-w-lg mb-10">
                  {bio}
                </p>
                <div className="flex gap-4">
                  <a href="#work" className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all">My Work</a>
                  <a href="#contact" className="px-8 py-3 border border-zinc-700 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Contact</a>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none grayscale blur-sm">
                <Image src={avatarUrl} alt="Hero" fill className="object-cover" />
              </div>
            </BentoCard>

            {/* Profile Card */}
            <BentoCard className="md:col-span-2 lg:col-span-2 lg:row-span-2 p-0 overflow-hidden group">
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000">
                <Image src={avatarUrl} alt={name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h2 className="text-white text-2xl font-black tracking-tight">{name}</h2>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{role}</p>
                </div>
              </div>
            </BentoCard>

            {/* Skills Cluster */}
            {displaySkills.map((skill, idx) => (
              <BentoCard key={idx} className="md:col-span-2 lg:col-span-2" delay={0.1 * idx}>
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(skill.items) ? skill.items : skill.items?.split(',').filter(Boolean) || []).map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold text-zinc-600 border border-zinc-200/50">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </BentoCard>
            ))}

            {/* Featured Projects - Large Bento Grid */}
            <div className="md:col-span-4 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="md:col-span-2 mb-4">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Selected Works</h2>
              </div>

              {displayProjects.map((project, idx) => (
                <BentoCard key={idx} className={`p-0 overflow-hidden group ${idx === 0 ? "md:col-span-2 aspect-[2/1]" : "aspect-square"}`} delay={0.2}>
                  <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-zinc-900/0 transition-all duration-700" />

                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-2xl font-black tracking-tight">{project.name}</h4>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{project.tags}</span>
                        </div>
                        <p className="text-zinc-500 text-sm mb-6 max-w-md">{project.desc}</p>
                        <a href={project.link || "#"} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest group/link">
                          Explore Case Study <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>

            {/* Experience Timeline */}
            <BentoCard className="md:col-span-4 lg:col-span-4 lg:row-span-2" delay={0.3}>
              <div className="space-y-10">
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">Career Sequence</h3>
                <div className="space-y-12">
                  {displayExperience.map((exp, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center font-black group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        0{idx + 1}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xl font-bold">{exp.role}</h4>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{exp.company}</p>
                        <p className="text-sm text-zinc-400 leading-relaxed italic">&gt; {exp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Stats / Services Grid */}
            <BentoCard className="md:col-span-2 lg:col-span-2 bg-zinc-900 text-white border-none p-10">
              <div className="space-y-8">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Capabilities</h3>
                <div className="space-y-6">
                  {displayServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">{service.title}</h4>
                        <p className="text-[10px] text-zinc-500">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Social Links Card */}
            <BentoCard className="md:col-span-2 lg:col-span-2 bg-[#FF8A71] text-white border-none items-center justify-center p-0">
              <div className="grid grid-cols-2 w-full h-full">
                <a href={githubUrl} className="flex items-center justify-center border-r border-white/20 hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs">GitHub</a>
                <a href={linkedinUrl} className="flex items-center justify-center hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs">LinkedIn</a>
                <a href={twitterUrl} className="flex items-center justify-center border-t border-white/20 border-r hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs">Twitter</a>
                <a href={`mailto:${email}`} className="flex items-center justify-center border-t border-white/20 hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs">Email</a>
              </div>
            </BentoCard>

          </div>

          {/* Contact Section - Clean & Minimal */}
          <section id="contact" className="mt-32 pt-32 border-t border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-12">Let&apos;s build.<br /><span className="text-zinc-300">Remarkable.</span></h2>
                <p className="text-xl text-zinc-500 max-w-md leading-relaxed">
                  Currently accepting new projects and design consultations for Q3/Q4 2024.
                </p>
              </div>
              <div className="bg-white rounded-[3rem] p-12 border border-zinc-100 shadow-xl shadow-zinc-200/50">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Identity</label>
                      <input type="text" placeholder="Your Name" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 outline-none focus:border-zinc-900 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Signal Address</label>
                      <input type="email" placeholder="Your Email" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 outline-none focus:border-zinc-900 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Inquiry</label>
                    <textarea rows={4} placeholder="How can I help you?" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 outline-none focus:border-zinc-900 transition-all resize-none" />
                  </div>
                  <button className="w-full py-6 bg-zinc-900 text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-zinc-900/20">
                    Send Transmission
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-40 py-20 px-6 border-t border-zinc-100 text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400">
            <span>© {new Date().getFullYear()} / {name.toUpperCase()} CREATIVE HUB</span>
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
              UPWARD ↑
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 5px; }
          ::-webkit-scrollbar-track { background: #f8fafc; }
          ::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
