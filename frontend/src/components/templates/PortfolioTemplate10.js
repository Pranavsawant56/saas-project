import TemplateLayout from "./TemplateLayout";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const BrutalistCard = ({ children, className = "", bgColor = "bg-white", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    className={`border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all p-8 ${bgColor} ${className}`}
  >
    {children}
  </motion.div>
);

const BrutalistButton = ({ children, className = "", bgColor = "bg-[#A3E635]", onClick }) => (
  <button
    onClick={onClick}
    className={`border-[4px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all px-8 py-4 font-black uppercase tracking-widest text-sm ${bgColor} ${className}`}
  >
    {children}
  </button>
);

export default function PortfolioTemplate10({ data }) {
  const [mounted, setMounted] = useState(false);

  const {
    name = "GUMMY BEAR",
    heroTitle = "DESIGNING THE LOUD STUFF.",
    role = "Chaos Engineer & Designer",
    bio = "Making the web less boring, one pixel at a time. I specialize in high-impact visual systems and experimental UI that actually works.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    aboutUsTitle = "Who Is This Person?",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "hello@gummy.com",
    phone = "+1 234 567 890",
    githubUrl = "#",
    linkedinUrl = "#",
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
      <div className="min-h-screen bg-[#FFF4E0] text-black font-mono selection:bg-[#FFD100] selection:text-black p-4 md:p-8">
        
        {/* Playful Navbar */}
        <nav className="sticky top-4 z-[100] mb-20">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6 border-[4px] border-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl font-black italic tracking-tighter bg-[#FFD100] px-4 py-2 border-[3px] border-black -rotate-2">
              {name}
            </div>
            <div className="flex gap-8 font-black uppercase text-xs">
              {['Works', 'About', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:bg-[#FF90E8] px-2 py-1 transition-all">{item}</a>
              ))}
            </div>
            <BrutalistButton bgColor="bg-[#00D1FF]" onClick={() => window.location.href = `mailto:${email}`}>
              Hired Me?
            </BrutalistButton>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto space-y-40 pb-40">
          {/* Hero Section */}
          <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-12">
               <motion.div
                 initial={{ x: -100, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 className="space-y-6"
               >
                 <span className="bg-[#FF90E8] px-4 py-2 border-[3px] border-black font-black uppercase text-sm inline-block rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   {role}
                 </span>
                 <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase">
                    {heroTitle}
                 </h1>
               </motion.div>
               <p className="text-xl md:text-2xl font-bold leading-relaxed max-w-2xl border-l-[8px] border-black pl-8">
                  {bio}
               </p>
               <div className="flex flex-wrap gap-8">
                  <BrutalistButton bgColor="bg-[#A3E635]">See My Junk</BrutalistButton>
                  <BrutalistButton bgColor="bg-[#FFD100]">Don't Click</BrutalistButton>
               </div>
            </div>
            <div className="lg:col-span-5">
               <div className="relative group">
                  <div className="absolute inset-0 bg-black translate-x-6 translate-y-6 -z-10" />
                  <div className="border-[4px] border-black bg-[#FFD100] overflow-hidden group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform aspect-square relative">
                     <Image src={avatarUrl} alt={name} fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white border-[4px] border-black p-4 rotate-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                     <span className="text-2xl font-black">COOL_DEV</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="about" className="space-y-12">
             <h2 className="text-5xl font-black uppercase tracking-tighter bg-black text-white inline-block px-8 py-4 -rotate-1">The_History</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayExperience.map((exp, idx) => (
                  <BrutalistCard key={idx} bgColor={idx % 2 === 0 ? "bg-[#00D1FF]" : "bg-[#FFD100]"} delay={idx * 0.1}>
                    <span className="bg-black text-white px-3 py-1 text-xs font-bold mb-4 inline-block">{exp.period}</span>
                    <h3 className="text-3xl font-black uppercase mb-2">{exp.role}</h3>
                    <p className="text-xl font-bold italic mb-6">@ {exp.company}</p>
                    <p className="font-bold border-t-[3px] border-black pt-6">{exp.desc}</p>
                  </BrutalistCard>
                ))}
             </div>
          </section>

          {/* Projects Section */}
          <section id="works" className="space-y-20">
             <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">Cool_Projects</h2>
                <span className="bg-[#A3E635] px-6 py-3 border-[4px] border-black font-black uppercase text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-3">
                   Total: {displayProjects.length}
                </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {displayProjects.map((project, idx) => (
                  <motion.div key={idx} whileHover={{ rotate: idx % 2 === 0 ? 1 : -1 }} className="group">
                    <BrutalistCard bgColor="bg-white" className="p-0 overflow-hidden">
                       <div className="aspect-video relative border-b-[4px] border-black overflow-hidden">
                          <Image src={project.image} alt={project.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                       </div>
                       <div className="p-8 space-y-6">
                          <div className="flex flex-wrap gap-2">
                             {project.tags.split(',').map(tag => (
                               <span key={tag} className="bg-[#FF90E8] border-[2px] border-black px-2 py-1 text-[10px] font-black uppercase">{tag.trim()}</span>
                             ))}
                          </div>
                          <h3 className="text-4xl font-black uppercase">{project.name}</h3>
                          <p className="font-bold text-lg leading-snug">{project.desc}</p>
                          <BrutalistButton bgColor="bg-[#FFD100]" className="w-full">Open_Payload</BrutalistButton>
                       </div>
                    </BrutalistCard>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* Services / Skills */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {displaySkills.map((skill, idx) => (
               <BrutalistCard key={idx} bgColor={['bg-[#A3E635]', 'bg-[#FF90E8]', 'bg-[#00D1FF]'][idx % 3]} className="space-y-8">
                  <div className="text-4xl font-black uppercase border-b-[4px] border-black pb-4">
                     {skill.category}
                  </div>
                  <ul className="space-y-4">
                     {skill.items.split(',').map((item, i) => (
                       <li key={i} className="flex items-center gap-4 text-xl font-black">
                          <span className="w-4 h-4 bg-black rotate-45 shrink-0" />
                          {item.trim()}
                       </li>
                     ))}
                  </ul>
               </BrutalistCard>
             ))}
          </section>

          {/* Testimonials */}
          <section className="bg-[#FF90E8] border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12 md:p-24 text-center space-y-12">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">What The Internet Says</h2>
             <div className="max-w-4xl mx-auto space-y-8">
                <p className="text-3xl md:text-5xl font-black italic leading-tight">
                  &quot;THIS PERSON IS ABSOLUTELY CRAZY AT DESIGN. MY BRAIN IS LITERALLY EXPLODING RIGHT NOW!&quot;
                </p>
                <div className="flex flex-col items-center gap-4">
                   <div className="w-20 h-20 border-[4px] border-black overflow-hidden bg-white">
                      <Image src="/images/templates/template-img-5.jpg" alt="Client" width={80} height={80} className="object-cover" />
                   </div>
                   <span className="text-xl font-black uppercase bg-white border-[3px] border-black px-4 py-1">Garry Kasparov_</span>
                   <span className="text-xs font-bold uppercase">Grandmaster of Pixel Pushing</span>
                </div>
             </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-12">
                <h2 className="text-7xl font-black uppercase tracking-tighter">Let's_Chat!</h2>
                <p className="text-2xl font-bold leading-relaxed">
                   Want to build something loud? Or just want to say hi? Send me a message and let's make some chaos!
                </p>
                <div className="space-y-6">
                   <BrutalistCard bgColor="bg-white" className="p-6">
                      <span className="text-xs font-black uppercase block mb-2">Signal_Uplink</span>
                      <span className="text-2xl font-black">{email}</span>
                   </BrutalistCard>
                   <div className="flex gap-6">
                      <a href={githubUrl} className="p-4 border-[4px] border-black bg-[#A3E635] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black uppercase">GH</a>
                      <a href={linkedinUrl} className="p-4 border-[4px] border-black bg-[#00D1FF] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black uppercase">LI</a>
                   </div>
                </div>
             </div>
             <BrutalistCard bgColor="bg-white" className="p-12 space-y-8">
                <div className="space-y-4">
                   <label className="text-xs font-black uppercase">Who_R_U?</label>
                   <input type="text" placeholder="John Doe" className="w-full border-[3px] border-black p-4 font-bold outline-none focus:bg-[#FFF4E0]" />
                </div>
                <div className="space-y-4">
                   <label className="text-xs font-black uppercase">Signal_Address</label>
                   <input type="email" placeholder="john@doe.com" className="w-full border-[3px] border-black p-4 font-bold outline-none focus:bg-[#FFF4E0]" />
                </div>
                <div className="space-y-4">
                   <label className="text-xs font-black uppercase">The_Transmission</label>
                   <textarea rows={4} placeholder="I want to hire you for a billion dollars..." className="w-full border-[3px] border-black p-4 font-bold outline-none focus:bg-[#FFF4E0] resize-none" />
                </div>
                <BrutalistButton className="w-full" bgColor="bg-[#A3E635]">Send_Signal_Now</BrutalistButton>
             </BrutalistCard>
          </section>
        </main>

        <footer className="max-w-7xl mx-auto border-t-[8px] border-black pt-12 pb-24 flex flex-col md:flex-row justify-between items-center gap-12 font-black uppercase text-sm">
           <div className="flex items-center gap-6">
              <span className="text-3xl bg-black text-white px-4 py-2">{name}</span>
              <span>© {new Date().getFullYear()} / NEOBRUTAL_V10</span>
           </div>
           <div className="flex gap-12">
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
