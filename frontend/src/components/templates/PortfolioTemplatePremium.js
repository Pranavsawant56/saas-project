"use client";

import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-16 md:mb-24">
    {subtitle && (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-4 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight"
    >
      {children}
    </motion.h2>
  </div>
);

export default function PortfolioTemplatePremium({ data }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    name = "Julian Vance",
    logoUrl = "",
    navbarType = "Text",
    navFontSize = 20,
    heroTitle = "CRAFTING THE DIGITAL AVANT-GARDE.",
    heroSubtitle = "Experience Designer & Engineer",
    heroDescription = "Specializing in the intersection of visual narrative and technical precision. Building digital products that feel human.",
    avatarUrl = "/images/templates/template-img-1.jpg",
    heroTitleSize = 72,
    heroSubtitleSize = 24,
    heroDescSize = 18,
    aboutUsTitle = "The Architecture of Intent",
    aboutBio = "I believe that every pixel should serve a purpose. My approach combines minimalist aesthetics with high-performance engineering to create digital experiences that resonate.",
    aboutImage = "/images/templates/template-img-1.jpg",
    experience_years = "08",
    aboutEmail = "hello@julianvance.com",
    aboutPhone = "+1 234 567 890",
    aboutLocation = "San Francisco, CA",
    projects = [],
    skills = [],
    services = [],
    experience = [],
    testimonials = [],
    email = "hello@julianvance.com",
    primaryColor = "#4f46e5",
    bgColor = "#F8FAFC",
    textColor = "#0F172A",
    footerCopyright = "",
    skillsTitle = "Technical Arsenal",
    skillsSubtitle = "Capabilities"
  } = data || {};

  if (!mounted) return null;

  const containerStyles = {
    "--primary-color": primaryColor,
    "--bg-color": bgColor,
    "--text-color": textColor,
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <div style={containerStyles} className="min-h-screen font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-full flex items-center gap-8 md:gap-12 shadow-2xl shadow-indigo-500/5 pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <Image src={logoUrl} alt={name} width={40} height={40} className="rounded-xl" />
            ) : (
              <span 
                className="font-black tracking-widest uppercase"
                style={{ fontSize: `${navFontSize}px` }}
              >
                {name}
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-8 border-l border-slate-200 dark:border-slate-800 pl-8">
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
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* 2. HERO */}
        <section id="home" className="min-h-screen flex flex-col justify-center pt-40 pb-20 relative overflow-hidden">
          {/* Hero Background Image */}
          {avatarUrl ? (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image 
                src={avatarUrl} 
                alt="Background" 
                fill 
                className="object-cover opacity-40 grayscale brightness-75"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-950 via-transparent to-white dark:to-white/0" />
            </div>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <span 
              className="font-black uppercase tracking-[0.5em] text-indigo-600 mb-8 block"
              style={{ fontSize: `${heroSubtitleSize}px` }}
            >
              {heroSubtitle}
            </span>
            <h1 
              className="font-black tracking-tighter leading-[0.9] mb-12 text-slate-900 dark:text-white"
              style={{ fontSize: `${heroTitleSize}px` }}
            >
              {heroTitle}
            </h1>
            <p 
              className="text-slate-500 font-medium leading-relaxed max-w-2xl"
              style={{ fontSize: `${heroDescSize}px` }}
            >
              {heroDescription}
            </p>
          </motion.div>
        </section>

        {/* 3. ABOUT */}
        <section id="about" className="py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square relative rounded-[40px] overflow-hidden shadow-2xl"
              >
                <Image src={aboutImage || avatarUrl || '/images/templates/template-img-1.jpg'} alt={name || "About Image"} fill className="object-cover" />
                <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay" />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-900 p-10 rounded-[30px] border border-slate-100 dark:border-slate-800 shadow-2xl">
                <span className="text-5xl font-black text-indigo-600 leading-none">{experience_years || "08"}+</span>
                <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-slate-400">Years of Experience</p>
              </div>
            </div>
            <div>
              <SectionHeading subtitle="The Philosophy">{aboutUsTitle}</SectionHeading>
              <p className="text-xl text-slate-500 leading-relaxed mb-12">
                {aboutBio}
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Availability", val: "Q3 2024" },
                  { label: "Focus", val: "Product Design" }
                ].map((item, i) => (
                  <div key={i}>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1 block">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROJECTS */}
        <section id="projects" className="py-40">
          <SectionHeading subtitle="Selected Works">Defining the <br />New Standard</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {(projects.length > 0 ? projects : Array(4).fill({})).map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] relative rounded-[40px] overflow-hidden mb-8 bg-slate-100 dark:bg-slate-800">
                  {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-black italic text-4xl">
                      WORK_0{idx + 1}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-8 py-3 bg-white text-slate-900 rounded-full text-xs font-black uppercase tracking-widest">View Project</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter uppercase">{project.title || `Project ${idx + 1}`}</h3>
                    <p className="text-sm text-slate-500 font-medium">{project.desc || "Visual identity and platform engineering."}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 border border-indigo-500/20 px-3 py-1 rounded-full">{project.tags || "Product"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. SKILLS - BENTO GRID */}
        <section id="skills" className="py-40">
          <SectionHeading subtitle={skillsSubtitle}>{skillsTitle}</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(skills && skills.length > 0 ? skills : [
              {
                category: "Modern Frontend Architecture",
                items: "Next.js, TypeScript, Tailwind CSS, Framer Motion, React Query, Zustand"
              },
              {
                category: "Interaction Design",
                items: "Creating motion systems that feel natural and intuitive to the human touch."
              },
              {
                category: "API Design",
                items: "Building robust, scalable backends that power real-time experiences."
              }
            ]).map((skill, i) => {
              const isLarge = i === 0;
              const tagsArray = (typeof skill.items === 'string' ? skill.items.split(',') : (skill.items || [])).map(s => s.trim()).filter(s => s);
              const isDescriptionFallback = i > 0 && !(skills && skills.length > 0);
              
              return (
                <div key={i} className={`${isLarge ? "md:col-span-2 bg-slate-900 text-white" : i % 2 === 1 ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"} p-12 rounded-[40px] flex flex-col justify-between`}>
                  <h4 className={`${isLarge ? "text-3xl" : "text-2xl"} font-black ${isLarge ? "tracking-tight mb-8" : "mb-6"}`}>{skill.category}</h4>
                  {isDescriptionFallback ? (
                    <p className={`text-sm leading-relaxed font-medium ${isLarge ? "opacity-80" : i % 2 === 1 ? "opacity-80" : "text-slate-500"}`}>{skill.items}</p>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      {tagsArray.map(tag => (
                        <span key={tag} className="px-6 py-2 bg-white/10 rounded-full text-xs font-bold text-white/90">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="md:col-span-2 p-12 border border-slate-200 dark:border-slate-800 rounded-[40px] flex items-center justify-between">
              <div className="flex gap-12">
                <div>
                  <span className="text-4xl font-black block mb-2 text-slate-900 dark:text-white">99%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Perf Score</span>
                </div>
                <div>
                  <span className="text-4xl font-black block mb-2 text-slate-900 dark:text-white">A+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Code Quality</span>
                </div>
              </div>
              <div className="w-20 h-20 bg-indigo-600/10 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* 6. EXPERIENCE */}
        <section id="experience" className="py-40 border-t border-slate-100 dark:border-slate-800">
          <SectionHeading subtitle="The Journey">Career <br />Milestones</SectionHeading>
          <div className="space-y-12">
            {(experience.length > 0 ? experience : Array(3).fill({})).map((exp, idx) => (
              <div key={idx} className="group grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all px-8 rounded-3xl -mx-8">
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 pt-2">{exp.period || "2021 — 2024"}</div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{exp.role || "Lead Interface Engineer"}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xl">{exp.desc || "Spearheading the evolution of digital platforms through design-led engineering."}</p>
                </div>
                <div className="text-right flex items-center justify-end">
                  <span className="text-lg font-black text-slate-400 uppercase italic tracking-tighter">{exp.company || "Aura Systems"}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. CONTACT */}
        <section id="contact" className="py-60 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-[120px] font-black tracking-tighter leading-none mb-12 text-slate-900 dark:text-white">
              LET'S CREATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 italic">MAGNIFICENCE.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 mb-16 max-w-2xl mx-auto font-medium">
              Open for world-class collaborations. <br />Drop me a message and let's build the future together.
            </p>
            <div className="flex flex-col items-center gap-8">
              <a href={`mailto:${email}`} className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white border-b-4 border-indigo-600 pb-2 hover:text-indigo-600 transition-all tracking-tighter">
                {email}
              </a>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mt-12">
                <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* 10. FOOTER */}
      <footer className="py-20 px-6 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-2xl" />
            <span className="text-xs font-black uppercase tracking-widest">{name} // {new Date().getFullYear()}</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            {footerCopyright || "DESIGNED IN CALIFORNIA // BUILT ON TEKUNIK"}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
          >
            ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
