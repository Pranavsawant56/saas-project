import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const GlassCard = ({ children, className = "" }) => (
   <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ${className}`}>
      {children}
   </div>
);

export default function PortfolioTemplate2({ data }) {
   const [mounted, setMounted] = useState(false);
   const [activeSection, setActiveSection] = useState("home");
   const [activeTestimonial, setActiveTestimonial] = useState(0);

   const {
      name = "Nova Sterling",
      navbarType = "Text",
      navFontSize = 24,
      logoUrl = "",
      heroTitle = "DESIGNING THROUGH THE GLASS.",
      heroSubtitle = "Glassmorphism UI/UX Expert",
      heroDescription = "Crafting high-end futuristic interfaces using depth, light, and transparency. Pushing the boundaries of modern design through experimental glassmorphic systems.",
      avatarUrl = "/images/templates/template-img-47.jpg",
      heroTitleSize = 72,
      heroSubtitleSize = 24,
      heroDescSize = 18,
      email = "nova@glass.studio",
      phone = "+1 234 567 890",
      linkedinUrl = "#",
      githubUrl = "#",
      aboutUsTitle = "THE GLASS VISION",
      aboutBio = "Crafting high-end futuristic interfaces using depth, light, and transparency. Pushing the boundaries of modern design through experimental glassmorphic systems.",
      aboutImage = "/images/templates/template-img-47.jpg",
      experience_years = "08",
      aboutEmail = "nova@glass.studio",
      aboutPhone = "+1 234 567 890",
      aboutLocation = "Cyber Valley",
      skills = [],
      projects = [],
      experience = [],
      services = [],
      testimonials = [],

   	footerCopyright = ""

   } = data || {};

   useEffect(() => {
      setMounted(true);
      const handleScroll = () => {
         const sections = ["home", "about", "skills", "projects", "experience", "services", "contact"];
         const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
               const rect = element.getBoundingClientRect();
               return rect.top <= 200 && rect.bottom >= 200;
            }
            return false;
         });
         if (current) setActiveSection(current);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const defaultSkills = [
      { category: "Frontend", items: ["React", "Next.js", "Framer Motion"], icon: "💎" },
      { category: "Design", items: ["Figma", "Blender", "Spline"], icon: "🎨" },
      { category: "Backend", items: ["Node.js", "Firebase", "Supabase"], icon: "⚡" },
      { category: "Tools", items: ["Git", "Vercel", "Docker"], icon: "🛠️" }
   ];

   const defaultProjects = [
      { title: "PRISM UI", desc: "A comprehensive glassmorphic design system for SaaS startups.", image: "/images/templates/template-img-13.jpg", tags: ["UI/UX", "System"] },
      { title: "AURORA", desc: "Interactive landing page for a futuristic space exploration firm.", image: "/images/templates/template-img-14.jpg", tags: ["Motion", "WebGL"] }
   ];

   const defaultExperience = [
      { role: "Lead UI Designer", company: "Flux Digital", period: "2022 — Present", desc: "Architecting the future of transparent interface systems." },
      { role: "Visual Developer", company: "Ethereal", period: "2020 — 2022", desc: "Developing immersive web experiences with high-end motion." }
   ];

   const defaultServices = [
      { title: "UI Architecture", desc: "Building scalable glassmorphic design systems.", icon: "🧊" },
      { title: "Motion Design", desc: "High-end Framer Motion and GSAP animations.", icon: "🌪️" },
      { title: "Consultancy", desc: "Modernizing products with futuristic aesthetics.", icon: "🎯" }
   ];

   const defaultTestimonials = [
      { name: "Atlas Thorne", role: "CEO, Nexa", text: "Nova's vision for transparency and depth completely transformed our brand perception.", image: "/images/templates/template-img-45.jpg" }
   ];

   const displaySkills = skills.length > 0 ? skills : defaultSkills;
   const displayProjects = projects.length > 0 ? projects : defaultProjects;
   const displayExperience = experience.length > 0 ? experience : defaultExperience;
   const displayServices = services.length > 0 ? services : defaultServices;
   const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

   if (!mounted) return null;

   return (
      <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
         <div className="bg-[#030712] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden min-h-screen">

            {/* Animated Background Mesh */}
            <div className="fixed inset-0 z-0">
               <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
               <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[150px] rounded-full animate-pulse delay-1000" />
               <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Navbar */}
            <header className="sticky top-8 left-0 right-0 z-50 px-6">
               <GlassCard className="max-w-4xl mx-auto flex justify-between items-center px-12 py-4 rounded-full border-white/20">
                  <div className="flex items-center gap-3">
                     {logoUrl ? (
                        <Image src={logoUrl} alt={name} width={40} height={40} className="rounded-xl" />
                     ) : (
                        <span 
                           className="font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                           style={{ fontSize: `${navFontSize}px` }}
                        >
                           {name}
                        </span>
                     )}
                  </div>

                  <nav className="hidden md:flex items-center gap-10">
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
                           className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-white transition-all hover:scale-110"
                        >
                           {item.label}
                        </a>
                     ))}
                  </nav>
               </GlassCard>
            </header>

            <main className="relative z-10">
               {/* Hero Section */}
               <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 relative overflow-hidden">
                  {/* Hero Background Image */}
                  {avatarUrl && (
                     <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image 
                           src={avatarUrl} 
                           alt="Background" 
                           fill 
                           className="object-cover opacity-40 grayscale blur-[1px]"
                           priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
                     </div>
                  )}
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1 }}
                     className="max-w-5xl mx-auto"
                  >
                     {avatarUrl && (
                        <div className="relative w-32 h-32 mx-auto mb-12 p-1.5 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full">
                           <div className="w-full h-full rounded-full border-4 border-[#030712] overflow-hidden relative shadow-[0_0_40px_rgba(147,51,234,0.5)]">
                              <Image src={avatarUrl} alt={name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                           </div>
                        </div>
                     )}

                     <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-black tracking-[0.8em] uppercase mb-8 block"
                        style={{ fontSize: `${heroSubtitleSize}px` }}
                     >
                        {heroSubtitle}
                     </motion.span>

                     <h1 
                        className="font-black leading-[0.85] tracking-tighter uppercase mb-12 drop-shadow-2xl"
                        style={{ fontSize: `${heroTitleSize}px` }}
                     >
                        {heroTitle}
                     </h1>

                     <GlassCard className="max-w-2xl mx-auto p-8 mb-12 border-white/5 bg-white/[0.03]">
                        <p 
                           className="text-zinc-400 font-light leading-relaxed"
                           style={{ fontSize: `${heroDescSize}px` }}
                        >
                           {heroDescription}
                        </p>
                     </GlassCard>
                  </motion.div>
               </section>

               {/* About Section */}
               <section id="about" className="py-32 px-6 lg:px-20 max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 p-4">
                        <GlassCard className="w-full h-full p-2 relative z-10">
                           <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                              <Image src={aboutImage || avatarUrl} alt="About" fill className="object-cover grayscale" />
                           </div>
                        </GlassCard>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/20 blur-[100px] -z-10 rounded-full" />
                     </div>
                     <div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic underline decoration-blue-500 underline-offset-[12px]">{aboutUsTitle}</h2>
                        <p className="text-xl text-zinc-400 leading-relaxed font-light mb-12">
                           {aboutBio}
                        </p>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                           <GlassCard className="p-8 text-center border-white/5">
                              <span className="block text-4xl font-black mb-2 italic">{experience_years}+</span>
                              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Years Experience</span>
                           </GlassCard>
                           <GlassCard className="p-8 text-center border-white/5">
                              <span className="block text-[10px] font-black mb-2 uppercase break-all">{aboutLocation}</span>
                              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Location</span>
                           </GlassCard>
                        </div>
                        <GlassCard className="p-6 flex items-center justify-between border-white/5">
                           <div className="flex flex-col">
                              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Direct Message</span>
                              <span className="text-sm font-bold text-white break-all">{aboutEmail}</span>
                           </div>
                           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">↗</div>
                        </GlassCard>
                     </div>
                  </div>
               </section>

               {/* Skills Section */}
               <section id="skills" className="py-32 px-6 lg:px-20">
                  <div className="max-w-7xl mx-auto">
                     <h2 className="text-center text-4xl md:text-7xl font-black uppercase tracking-tighter mb-24 opacity-20">The_Tool_Kit</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displaySkills.map((skill, i) => (
                           <motion.div key={i} whileHover={{ y: -10 }} className="group">
                              <GlassCard className="h-full p-12 relative overflow-hidden group-hover:border-purple-500/50 transition-colors">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl -mr-16 -mt-16 group-hover:bg-purple-600/20 transition-all" />
                                 <div className="text-5xl mb-10 p-4 bg-white/5 w-fit rounded-3xl group-hover:scale-110 transition-transform">{skill.icon}</div>
                                 <h4 className="text-xl font-black uppercase tracking-widest mb-8 text-white">{skill.category}</h4>
                                 <div className="flex flex-wrap gap-2">
                                    {(typeof skill.items === 'string' ? skill.items.split(',') : (skill.items || [])).map(item => (
                                       <span key={item} className="text-[9px] font-black px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400 uppercase tracking-widest">{item}</span>
                                    ))}
                                 </div>
                              </GlassCard>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Projects Gallery */}
               <section id="projects" className="py-32 px-6 lg:px-20">
                  <div className="max-w-7xl mx-auto">
                     <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">The<br />Gallery.</h2>
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] text-right italic border-r-4 border-purple-500 pr-8">SELECTED_COLLECTION_2024</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {displayProjects.map((project, i) => (
                           <motion.div key={i} whileHover={{ y: -10 }} className="group">
                              <GlassCard className="p-4 border-white/5 bg-white/[0.02]">
                                 <div className="aspect-[16/11] relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 mb-8">
                                    <Image src={project.image} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-6 left-6 flex gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                       {project.tags.map(tag => <span key={tag} className="text-[9px] font-black bg-blue-600 px-4 py-1.5 rounded-full uppercase tracking-widest">{tag}</span>)}
                                    </div>
                                 </div>
                                 <div className="px-4 pb-4 flex justify-between items-end">
                                    <div>
                                       <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter group-hover:text-purple-400 transition-colors italic">{project.title}</h3>
                                       <p className="text-zinc-500 text-lg leading-relaxed max-w-sm font-light">{project.desc}</p>
                                    </div>
                                    <div className="text-4xl font-black text-white/5 group-hover:text-white transition-all duration-700 italic">0{i + 1}</div>
                                 </div>
                              </GlassCard>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Experience Section */}
               <section id="experience" className="py-32 px-6 lg:px-20">
                  <div className="max-w-5xl mx-auto">
                     <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">Sequence.</h2>
                     </div>
                     <div className="space-y-4">
                        {displayExperience.map((exp, i) => (
                           <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                              <GlassCard className="p-10 lg:p-16 border-white/5 hover:border-blue-500/30 transition-colors flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden group">
                                 <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                                 <div className="text-center md:text-left">
                                    <span className="text-blue-500 font-black text-sm tracking-[0.4em] block mb-4 italic">{exp.period}</span>
                                    <h4 className="text-3xl font-black uppercase tracking-tighter italic">{exp.role}</h4>
                                    <span className="text-xl font-bold text-zinc-400 mt-2 block">{exp.company}</span>
                                 </div>
                                 <div className="md:w-1/2">
                                    <p className="text-zinc-500 italic font-light leading-relaxed">&quot;{exp.desc}&quot;</p>
                                 </div>
                              </GlassCard>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Services Section */}
               <section id="services" className="py-32 px-6 lg:px-20">
                  <div className="max-w-7xl mx-auto">
                     <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-24 text-center">Protocol_Services</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayServices.map((service, i) => (
                           <GlassCard key={i} className="p-12 text-center group hover:bg-white/[0.05] transition-all">
                              <div className="text-6xl mb-10 group-hover:scale-110 transition-transform">{service.icon}</div>
                              <h4 className="text-2xl font-black uppercase tracking-widest mb-6">{service.title}</h4>
                              <p className="text-zinc-500 leading-relaxed italic">{service.desc}</p>
                           </GlassCard>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Testimonials */}
               <section id="testimonials" className="py-32 px-6 lg:px-20">
                  <div className="max-w-4xl mx-auto">
                     <GlassCard className="p-12 md:p-24 text-center border-white/10 bg-white/[0.02]">
                        <div className="text-6xl text-blue-500 opacity-20 mb-12 select-none">“</div>
                        <AnimatePresence mode="wait">
                           <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                              <p className="text-2xl md:text-3xl text-zinc-200 italic mb-12 font-light leading-relaxed">
                                 {displayTestimonials[activeTestimonial].text}
                              </p>
                              <div className="flex flex-col items-center">
                                 <div className="w-20 h-20 relative rounded-2xl overflow-hidden mb-6 border border-white/10 p-1">
                                    <Image src={displayTestimonials[activeTestimonial].image} alt={displayTestimonials[activeTestimonial].name} fill className="object-cover rounded-xl grayscale" />
                                 </div>
                                 <h4 className="font-black uppercase tracking-widest text-lg mb-2">{displayTestimonials[activeTestimonial].name}</h4>
                                 <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest">{displayTestimonials[activeTestimonial].role}</p>
                              </div>
                           </motion.div>
                        </AnimatePresence>
                     </GlassCard>
                  </div>
               </section>

               {/* Contact Section */}
               <section id="contact" className="py-40 px-6 lg:px-20 relative overflow-hidden">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                     <div>
                        <span className="text-purple-400 text-[10px] font-black uppercase tracking-[0.8em] block mb-12 italic">// UPLINK_ESTABLISHED</span>
                        <h2 className="text-7xl md:text-[9vw] font-black uppercase leading-[0.8] tracking-tighter mb-16 italic drop-shadow-xl">Sync<br />the<br />Core.</h2>
                        <p className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-sm font-light leading-relaxed italic">Let's craft the next digital frontier together.</p>

                        <div className="space-y-12">
                           <GlassCard className="p-8 border-white/5 inline-block group cursor-pointer hover:border-blue-500 transition-colors">
                              <span className="block text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-4">Direct Communication</span>
                              <a href={`mailto:${email}`} className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase tracking-tighter italic">{email}</a>
                           </GlassCard>
                        </div>
                     </div>

                     <GlassCard className="p-12 md:p-20 relative group overflow-hidden border-white/5">
                        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x" />
                        <form className="space-y-10 relative z-10">
                           <div className="group">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-4 group-focus-within:text-purple-500 transition-colors italic">Identification</label>
                              <input type="text" placeholder="WHO_ARE_YOU" className="w-full bg-white/5 border-b border-zinc-800 py-6 px-4 outline-none focus:border-white transition-all font-black uppercase text-sm tracking-widest rounded-t-xl" />
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-4 group-focus-within:text-purple-500 transition-colors italic">Digital Address</label>
                              <input type="email" placeholder="EMAIL_SIGNAL" className="w-full bg-white/5 border-b border-zinc-800 py-6 px-4 outline-none focus:border-white transition-all font-black uppercase text-sm tracking-widest rounded-t-xl" />
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-4 group-focus-within:text-purple-500 transition-colors italic">Transmission</label>
                              <textarea rows={3} placeholder="CONTENT_PAYLOAD" className="w-full bg-white/5 border-b border-zinc-800 py-6 px-4 outline-none focus:border-white transition-all font-black uppercase text-sm tracking-widest resize-none rounded-t-xl" />
                           </div>
                           <motion.button
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)", color: "#000" }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-10 bg-purple-600 text-white font-black uppercase tracking-[0.6em] text-xs transition-all duration-500 italic shadow-[0_20px_50px_-10px_rgba(147,51,234,0.5)] rounded-2xl"
                           >
                              Send Signal
                           </motion.button>
                        </form>
                     </GlassCard>
                  </div>
               </section>
            </main>

            <footer className="py-20 px-6 lg:px-20 border-t border-white/5 bg-black/40 backdrop-blur-xl">
               <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                     <span className="text-4xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{name.charAt(0)}S_SYS.</span>
                     <p className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-700 decoration-purple-500/50 underline-offset-8 decoration-2">Transcending Static Reality</p>
                  </div>

                  <div className="flex gap-20">
                     <div className="flex flex-col gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                        <span className="text-white italic">PROTOCOL</span>
                        <a href="#home" className="hover:text-purple-400 transition-colors">INIT</a>
                        <a href="#about" className="hover:text-purple-400 transition-colors">CORE</a>
                        <a href="#projects" className="hover:text-purple-400 transition-colors">GALLERY</a>
                     </div>
                  </div>
               </div>
               <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.8em] text-zinc-800">
                  <span>{footerCopyright || `© {new Date().getFullYear()} GLASS_V1 / {name}`}</span>
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_15px_rgba(147,51,234,1)]" />
                     <span>UI_SYNC_OPERATIONAL</span>
                  </div>
               </div>
            </footer>

            <style jsx global>{`
          ::-webkit-scrollbar {
            width: 3px;
          }
          ::-webkit-scrollbar-track {
            background: #030712;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #9333ea);
          }
          body {
            background: #030712;
            scroll-behavior: smooth;
          }
          .text-stroke-white {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          }
          @keyframes gradient-x {
             0% { background-position: 0% 50%; }
             50% { background-position: 100% 50%; }
             100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
             background-size: 200% 200%;
             animation: gradient-x 5s ease infinite;
          }
        `}</style>
         </div>
      </TemplateLayout>
   );
}





