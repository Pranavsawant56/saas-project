import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const BrutalistCard = ({ children, className = "", bgColor = "bg-white", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    className={`border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 sm:hover:translate-x-2 hover:translate-y-1 sm:hover:translate-y-2 transition-all p-6 sm:p-8 ${bgColor} ${className}`}
  >
    {children}
  </motion.div>
);

const BrutalistButton = ({ children, className = "", bgColor = "bg-[#A3E635]", onClick }) => (
  <button
    onClick={onClick}
    className={`border-[4px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all px-6 sm:px-8 py-3 sm:py-4 font-black uppercase tracking-widest text-xs sm:text-sm ${bgColor} ${className}`}
  >
    {children}
  </button>
);

export default function PortfolioTemplate10({ data }) {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    name = "GUMMY BEAR",
    navbarType = "Text",
    navFontSize = 30,
    logoUrl = "",
    heroTitle = "DESIGNING THE LOUD STUFF.",
    heroSubtitle = "Chaos Engineer & Designer",
    heroDescription = "Making the web less boring, one pixel at a time. I specialize in high-impact visual systems and experimental UI that actually works.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    heroTitleSize = 96,
    heroSubtitleSize = 24,
    heroDescSize = 20,
    aboutUsTitle = "Who Is This Person?",
    aboutBio = "Making the web less boring, one pixel at a time. I specialize in high-impact visual systems and experimental UI that actually works. If it isn't loud, it isn't finished.",
    aboutImage = "/images/templates/template-img-50.jpg",
    experience_years = "08",
    aboutEmail = "hello@gummy.com",
    aboutPhone = "+1 234 567 890",
    aboutLocation = "Brooklyn, NY",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "hello@gummy.com",
    phone = "+1 234 567 890",
    githubUrl = "#",
    linkedinUrl = "#",
    footerCopyright = ""
  } = data || {};

  useEffect(() => setMounted(true), []);

  const defaultProjects = [
    { name: "Super App", desc: "A very cool thing that does things. Mostly just looking pretty.", image: "/images/templates/template-img-11.jpg", link: "#", tags: "REACT, CSS, CHAOS" },
    { name: "Mega Portal", desc: "The entrance to the digital multiverse. Enter at your own risk.", image: "/images/templates/template-img-12.jpg", link: "#", tags: "NEXT.JS, WEBGL" },
    { name: "Hyper Dash", desc: "Fast data for fast people. Speed is the only metric.", image: "/images/templates/template-img-21.jpg", link: "#", tags: "DASHBOARD, RUST" }
  ];

  const defaultSkills = [
    { category: "Visuals", items: "Figma, Canva, MS Paint, Crayola" },
    { category: "Logic", items: "React, Next.js, TypeScript, Magic" },
    { category: "Chaos", items: "Git Force, Delete Prod, No Backups" }
  ];

  const defaultExperience = [
    { role: "Visual Wizard", company: "Giggle Corp", period: "2020 - 2024", desc: "Made things look pretty and colorful for the internet." },
    { role: "Pixel Pusher", company: "Starfleet", period: "2018 - 2020", desc: "Pushed pixels until they screamed for mercy." }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="light" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#FFF4E0] text-black font-mono selection:bg-[#FFD100] selection:text-black p-3 sm:p-6 md:p-8 overflow-x-hidden">

        {/* Playful Brutalist Navbar */}
        <nav className="sticky top-4 z-[100] mb-12 sm:mb-20 flex justify-center">
          <div className="max-w-7xl w-full flex justify-between items-center border-[4px] border-black bg-white p-4 sm:p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <Image src={logoUrl} alt={name} width={50} height={50} className="border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" />
              ) : (
                <div
                  className="font-black italic tracking-tighter bg-[#FFD100] px-4 sm:px-6 py-2 border-[3px] border-black -rotate-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm sm:text-base"
                  style={{ fontSize: `${Math.min(navFontSize, 24)}px` }}
                >
                  {name}
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
                  className="font-black uppercase tracking-widest text-xs lg:text-sm hover:bg-[#A3E635] px-3 py-1.5 border-[2px] border-transparent hover:border-black transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex md:hidden items-center z-[130]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 border-[3px] border-black bg-[#FFD100] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 rounded flex items-center justify-center text-black font-black"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Brutalist Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-full sm:w-[320px] bg-[#FFF4E0] border-r-[6px] border-black z-[120] p-8 flex flex-col justify-between"
            >
              <div className="space-y-12 pt-20">
                <div className="bg-[#FF90E8] border-[3px] border-black p-4 rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-sm font-black uppercase tracking-widest">// MENU_CHAOS.sh</span>
                </div>
                <div className="flex flex-col gap-6 text-lg font-black uppercase tracking-wider">
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
                      className="hover:bg-[#A3E635] px-4 py-2 border-[3px] border-transparent hover:border-black transition-all inline-block rotate-[-1deg]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-xs font-black uppercase bg-[#00D1FF] border-[3px] border-black p-3 text-center">
                NEOBRUTAL_BEAR v10.0
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="max-w-7xl mx-auto space-y-24 sm:space-y-40 pb-40 px-2 sm:px-4">
          {/* Hero Section */}
          <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden min-h-[70vh] py-8 rounded-3xl">
            {/* Hero Background Image */}
            {avatarUrl ? (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={avatarUrl}
                  alt="Background"
                  fill
                  className="object-cover opacity-20 grayscale brightness-75"
                  priority
                />
              </div>
            ) : null}
            <div className="lg:col-span-7 space-y-8 sm:space-y-12 relative z-10">
               <motion.div
                 initial={{ x: -100, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 className="space-y-6"
               >
                 <span
                   className="bg-[#FF90E8] px-4 py-2 border-[3px] border-black font-black uppercase inline-block rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                   style={{ fontSize: `clamp(0.95rem, 3.5vw, ${heroSubtitleSize}px)` }}
                 >
                   {heroSubtitle}
                 </span>
                 <h1
                    className="font-black tracking-tighter leading-[0.9] uppercase text-black"
                    style={{
                      fontSize: `clamp(2.3rem, 9.5vw, ${heroTitleSize}px)`,
                      wordBreak: "break-word",
                      overflowWrap: "break-word"
                    }}
                  >
                    {heroTitle}
                 </h1>
               </motion.div>
               <p
                  id="about"
                  className="font-bold leading-relaxed border-l-[8px] border-black pl-4 sm:pl-8 text-black/80"
                  style={{ fontSize: `clamp(0.95rem, 2.5vw, ${heroDescSize}px)` }}
                >
                  {aboutBio || heroDescription}
               </p>
               <div className="flex flex-wrap gap-4 pt-4 border-t-[4px] border-black border-dashed mt-8">
                  <span className="bg-[#A3E635] border-[3px] border-black px-4 py-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{experience_years}+ YRS EXP</span>
               </div>
            </div>
            <div className="lg:col-span-5 relative z-10 w-full">
               <div className="relative group max-w-md mx-auto">
                  <div className="absolute inset-0 bg-black translate-x-4 sm:translate-x-6 translate-y-4 sm:translate-y-6 -z-10" />
                  <div className="border-[4px] border-black bg-[#FFD100] overflow-hidden group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform aspect-square relative">
                     <Image src={aboutImage || avatarUrl || '/images/templates/template-img-50.jpg'} alt={name || "About Image"} fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-2 bg-white border-[4px] border-black p-3 rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     <span className="text-lg sm:text-2xl font-black">{aboutUsTitle.split(" ")[0]}</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="space-y-12">
             <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter bg-black text-white inline-block px-6 sm:px-8 py-3 sm:py-4 -rotate-1">The_History</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayExperience.map((exp, idx) => (
                  <BrutalistCard key={idx} bgColor={idx % 2 === 0 ? "bg-[#00D1FF]" : "bg-[#FFD100]"} delay={idx * 0.1}>
                    <span className="bg-black text-white px-3 py-1 text-xs font-bold mb-4 inline-block">{exp.period}</span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase mb-2 leading-none">{exp.role}</h3>
                    <p className="text-lg sm:text-xl font-bold italic mb-6">@ {exp.company}</p>
                    <p className="font-bold border-t-[3px] border-black pt-6 text-sm sm:text-base leading-normal">&gt; {exp.desc}</p>
                  </BrutalistCard>
                ))}
             </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-16 sm:space-y-20">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b-[4px] border-black pb-8">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">Cool_Projects</h2>
                <span className="bg-[#A3E635] px-4 sm:px-6 py-2 sm:py-3 border-[4px] border-black font-black uppercase text-sm sm:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3 shrink-0">
                   Total: {displayProjects.length}
                </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
                {displayProjects.map((project, idx) => (
                  <motion.div key={idx} whileHover={{ rotate: idx % 2 === 0 ? 0.5 : -0.5 }} className="group flex flex-col h-full">
                    <BrutalistCard bgColor="bg-white" className="p-0 overflow-hidden flex flex-col justify-between h-full flex-1">
                       <div>
                         <div className="aspect-video relative border-b-[4px] border-black overflow-hidden w-full shrink-0">
                            <Image src={project.image || '/images/templates/template-img-11.jpg'} alt={project.name || 'Project'} fill className="object-cover group-hover:scale-105 transition-transform" />
                         </div>
                         <div className="p-6 sm:p-8 space-y-6">
                            <div className="flex flex-wrap gap-2">
                               {project.tags.split(',').map(tag => (
                                 <span key={tag} className="bg-[#FF90E8] border-[2px] border-black px-2 py-1 text-[10px] font-black uppercase">{tag.trim()}</span>
                               ))}
                            </div>
                            <h3 className="text-2xl sm:text-4xl font-black uppercase leading-none">{project.name}</h3>
                            <p className="font-bold text-sm sm:text-lg leading-snug">{project.desc}</p>
                         </div>
                       </div>
                       <div className="p-6 sm:p-8 pt-0 w-full">
                         <BrutalistButton bgColor="bg-[#FFD100]" className="w-full">Open_Payload</BrutalistButton>
                       </div>
                    </BrutalistCard>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* Services / Skills */}
          <section id="skills" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {displaySkills.map((skill, idx) => (
               <BrutalistCard key={idx} bgColor={['bg-[#A3E635]', 'bg-[#FF90E8]', 'bg-[#00D1FF]'][idx % 3]} className="space-y-6 sm:space-y-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-2xl sm:text-4xl font-black uppercase border-b-[4px] border-black pb-4 leading-none">
                       {skill.category}
                    </div>
                    <ul className="space-y-4 pt-6">
                       {skill.items.split(',').map((item, i) => (
                         <li key={i} className="flex items-center gap-4 text-base sm:text-xl font-black">
                            <span className="w-3.5 h-3.5 bg-black rotate-45 shrink-0" />
                            {item.trim()}
                         </li>
                       ))}
                    </ul>
                  </div>
               </BrutalistCard>
             ))}
          </section>

          {/* Testimonials */}
          <section className="bg-[#FF90E8] border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-16 md:p-24 text-center space-y-10 sm:space-y-12">
             <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter">What The Internet Says</h2>
             <div className="max-w-4xl mx-auto space-y-8">
                <p className="text-xl sm:text-3xl md:text-5xl font-black italic leading-snug">
                   &quot;THIS PERSON IS ABSOLUTELY CRAZY AT DESIGN. MY BRAIN IS LITERALLY EXPLODING RIGHT NOW!&quot;
                </p>
                <div className="flex flex-col items-center gap-4 border-t-[3px] border-black pt-6 mt-6">
                   <div className="w-20 h-20 border-[4px] border-black overflow-hidden bg-white shrink-0">
                      <Image src="/images/templates/template-img-5.jpg" alt="Client" width={80} height={80} className="object-cover" />
                   </div>
                   <span className="text-lg sm:text-xl font-black uppercase bg-white border-[3px] border-black px-4 py-1">Garry Kasparov_</span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Grandmaster of Pixel Pushing</span>
                </div>
             </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
             <div className="space-y-8 sm:space-y-12">
                <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none">Let&apos;s_Chat!</h2>
                <p className="text-lg sm:text-2xl font-bold leading-relaxed">
                   Want to build something loud? Or just want to say hi? Send me a message and let&apos;s make some chaos!
                </p>
                <div className="space-y-6">
                   <BrutalistCard bgColor="bg-white" className="p-6">
                      <span className="text-[10px] font-black uppercase block mb-2 text-zinc-500">Signal_Uplink</span>
                      <span className="text-lg sm:text-2xl font-black break-all">{email}</span>
                   </BrutalistCard>
                   <div className="flex gap-6 pt-4">
                      <a href={githubUrl} className="p-4 border-[4px] border-black bg-[#A3E635] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">GH</a>
                      <a href={linkedinUrl} className="p-4 border-[4px] border-black bg-[#00D1FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">LI</a>
                   </div>
                </div>
             </div>
             <BrutalistCard bgColor="bg-white" className="p-8 sm:p-12 space-y-6 sm:space-y-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase">Who_R_U?</label>
                   <input type="text" placeholder="John Doe" className="w-full border-[3px] border-black p-4 font-bold outline-none focus:bg-[#FFF4E0] text-sm" />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase">Signal_Address</label>
                   <input type="email" placeholder="john@doe.com" className="w-full border-[3px] border-black p-4 font-bold outline-none focus:bg-[#FFF4E0] text-sm" />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase">The_Transmission</label>
                   <textarea rows={4} placeholder="I want to hire you for a billion dollars..." className="w-full border-[3px] border-black p-4 font-bold outline-none focus:bg-[#FFF4E0] resize-none text-sm" />
                </div>
                <BrutalistButton className="w-full" bgColor="bg-[#A3E635]">Send_Signal_Now</BrutalistButton>
             </BrutalistCard>
          </section>
        </main>

        <footer className="max-w-7xl mx-auto border-t-[8px] border-black pt-12 pb-24 flex flex-col lg:flex-row justify-between items-center gap-12 font-black uppercase text-xs sm:text-sm text-center lg:text-left">
           <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className="text-2xl sm:text-3xl bg-black text-white px-4 py-2 leading-none shrink-0 italic">{name}</span>
              <span>{footerCopyright || `© ${new Date().getFullYear()} / NEOBRUTAL_V10`}</span>
           </div>
           <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              <a href="#" className="hover:line-through">Privacy</a>
              <a href="#" className="hover:line-through">Terms</a>
              <a href="#" className="hover:line-through">Cookies</a>
           </div>
           <button
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="bg-[#FFD100] border-[4px] border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
           >
             Go_Up_↑
           </button>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 12px; }
          ::-webkit-scrollbar-track { background: white; border-left: 4px solid black; }
          ::-webkit-scrollbar-thumb { background: #FFD100; border: 4px solid black; }
          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
          body { font-family: 'Space Mono', monospace; }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
