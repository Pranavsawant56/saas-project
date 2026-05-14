import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const HoloCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`relative group bg-purple-950/10 backdrop-blur-md border border-cyan-500/20 rounded-lg p-8 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500 ${className}`}
  >
    {/* Corner Brackets */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    {/* Content */}
    <div className="relative z-10">{children}</div>
    
    {/* Scanline Effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-full w-full -translate-y-full group-hover:animate-scanline pointer-events-none" />
  </motion.div>
);

const GlitchText = ({ text }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 -z-10 text-pink-500 translate-x-[2px] opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1 transition-opacity">{text}</span>
    <span className="absolute top-0 left-0 -z-10 text-cyan-400 -translate-x-[2px] opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2 transition-opacity">{text}</span>
  </span>
);

export default function PortfolioTemplate5({ data }) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    name = "V",
    heroTitle = "CONNECTING TO THE FUTURE...",
    role = "Neuro-Interface Architect",
    bio = "I build the bridge between the physical and digital void. Specialized in neural network visualization and high-frequency UI.",
    avatarUrl = "/images/templates/template-img-50.jpg",
    aboutUsTitle = "THE NEURAL MANIFESTO",
    projects = [],
    services = [],
    skills = [],
    experience = [],
    testimonials = [],
    email = "v@nightcity.io",
    phone = "+1 777 000 7777",
    githubUrl = "#",
    linkedinUrl = "#",
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const defaultProjects = [
    { name: "Night City OS", desc: "Real-time municipal data visualization and control grid.", image: "/images/templates/template-img-11.jpg", link: "#" },
    { name: "Neural-Link Hub", desc: "Decentralized interface for high-bandwidth bio-data streams.", image: "/images/templates/template-img-12.jpg", link: "#" },
    { name: "Ice-Breaker X", desc: "Advanced security bypass and intrusion detection suite.", image: "/images/templates/template-img-21.jpg", link: "#" }
  ];

  const defaultSkills = [
    { category: "Direct_Interface", items: "Three.js, WebGL, GLSL, Shaders" },
    { category: "Neural_Systems", items: "React, Next.js, Node.js, Rust" },
    { category: "Deep_Web", items: "GraphQL, PostgreSQL, Redis, Docker" }
  ];

  const defaultExperience = [
    { role: "Cyber-Architect", company: "Arasaka", period: "2077 - 2080", desc: "Designed global neural grid systems for high-priority assets." },
    { role: "Protocol Lead", company: "Militech", period: "2074 - 2077", desc: "Optimized offensive security protocols for distributed networks." }
  ];

  const defaultServices = [
    { title: "Neuro-Design", desc: "Crafting interfaces that resonate with neural pattern activity.", icon: "🧠" },
    { title: "Ice Breaking", desc: "Deep-layer security penetration and architecture auditing.", icon: "🧊" },
    { title: "Grid Ops", desc: "Scaling high-frequency digital ecosystems across the net.", icon: "🌐" }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="min-h-screen bg-[#0a0510] text-cyan-400 font-mono selection:bg-pink-500 selection:text-white overflow-x-hidden">
        
        {/* Dynamic Mouse Glow */}
        <div 
          className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
          }}
        />

        {/* Scanline & Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-flicker" />

        {/* Futuristic Navbar */}
        <nav className={`fixed top-0 left-0 right-0 z-[110] px-6 md:px-12 py-6 transition-all duration-500 ${isScrolled ? "bg-[#0a0510]/80 backdrop-blur-xl border-b border-cyan-500/20 py-4" : "bg-transparent"}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-pink-500 rounded-tr-xl rounded-bl-xl flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                {name.charAt(0)}
              </div>
              <span className="text-sm font-bold tracking-[0.3em] hidden sm:block uppercase">Agent_{name}</span>
            </div>

            <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em]">
              {['Home', 'Intel', 'Repos', 'Protocols', 'Uplink'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-pink-500 transition-all hover:translate-y-[-2px]">{item}</a>
              ))}
            </div>

            <button className="relative px-6 py-2 border border-cyan-400 group overflow-hidden">
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-black transition-colors">Neural Uplink</span>
              <div className="absolute inset-0 bg-cyan-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>
        </nav>

        <main className="relative z-10">
          {/* Hero - Neural Link */}
          <section id="home" className="min-h-screen flex items-center pt-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-[2px] w-12 bg-pink-500" />
                    <span className="text-pink-500 text-xs font-bold tracking-[0.4em] uppercase">{role}</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white mb-10">
                    <GlitchText text={heroTitle} />
                  </h1>
                  <p className="text-xl text-cyan-400/60 leading-relaxed max-w-xl mb-12">
                    &gt; {bio}
                  </p>
                  <div className="flex flex-wrap gap-8">
                    <button className="px-10 py-5 bg-pink-500 text-white font-bold uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-105 transition-all active:scale-95">
                      Sync Repos
                    </button>
                    <button className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-widest text-xs hover:bg-cyan-400/10 transition-all">
                      Scan Intel
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative aspect-square max-w-md mx-auto"
                >
                  {/* Decorative Rings */}
                  <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-spin-slow" />
                  <div className="absolute inset-4 border border-pink-500/20 rounded-full animate-spin-reverse-slow" />
                  <div className="absolute inset-[-20px] border border-cyan-400/10 rounded-full animate-pulse" />
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden p-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50 relative group">
                      <Image src={avatarUrl} alt={name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                    </div>
                  </div>

                  {/* Data Tags */}
                  <div className="absolute top-0 right-0 p-4 bg-[#0a0510]/80 backdrop-blur-md border border-pink-500/40 rounded-lg text-[10px] space-y-1 translate-x-10 -translate-y-10 hidden md:block">
                    <p className="text-pink-500">ID: Agent_{name}</p>
                    <p className="text-cyan-400">LOC: Night_City</p>
                    <p className="text-white">STATUS: ACTIVE</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* About Section - HUD Style */}
          <section id="intel" className="py-40 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-center">
              <div className="w-full md:w-1/2">
                <HoloCard>
                  <h2 className="text-4xl font-black text-white tracking-tighter mb-10">{aboutUsTitle}</h2>
                  <p className="text-xl text-cyan-400/80 leading-relaxed italic mb-12">
                    &quot;The net is vast and infinite. To navigate it, one must become the protocol. I don't just write code; I architect the neural pathways of the tomorrow.&quot;
                  </p>
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-pink-500 block mb-2">Neural Load</span>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-cyan-400 block mb-2">Signal Strength</span>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '99%' }} className="h-full bg-pink-500" />
                      </div>
                    </div>
                  </div>
                </HoloCard>
              </div>
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-video relative rounded-lg border border-cyan-500/20 overflow-hidden group">
                    <Image src={`/images/templates/template-img-${20 + i}.jpg`} alt="Neural Data" fill className="object-cover opacity-40 group-hover:opacity-80 transition-all duration-700" />
                    <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-pink-900/20 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects - Neural Repos */}
          <section id="repos" className="py-40 px-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-24 border-b border-cyan-500/20 pb-10">
              <div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">NEURAL_REPOS</h2>
                <p className="text-xs text-pink-500 uppercase tracking-[0.5em] mt-4">Active Deployments // Night City Core</p>
              </div>
              <div className="text-[10px] font-bold text-cyan-400/40 hidden md:block">SCANNING_REPOS... [OK]</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayProjects.map((project, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="relative group bg-zinc-900/40 border border-cyan-500/10 p-6 rounded-2xl hover:border-pink-500/50 transition-all"
                >
                  <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image src={project.image} alt={project.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-pink-500/10 pointer-events-none" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight uppercase group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                  <p className="text-sm text-cyan-400/60 leading-relaxed italic mb-8">&gt; {project.desc}</p>
                  <div className="flex gap-6">
                    <a href={project.link || "#"} className="text-[10px] font-bold text-pink-500 uppercase tracking-widest border-b border-pink-500 pb-1 hover:text-white hover:border-white transition-all">Connect</a>
                    <a href="#" className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-400 pb-1 hover:text-white hover:border-white transition-all">Details</a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills - Active Augmentations */}
          <section id="protocols" className="py-40 px-6 bg-zinc-950/40 border-y border-pink-500/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
              {displaySkills.map((skill, idx) => (
                <HoloCard key={idx} delay={idx * 0.1}>
                  <h4 className="text-xl font-bold text-white mb-8 border-b border-cyan-500/10 pb-4 uppercase tracking-widest">{skill.category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {(Array.isArray(skill.items) ? skill.items : skill.items?.split(',').filter(Boolean) || []).map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-pink-500/5 border border-pink-500/20 rounded text-[10px] text-pink-400 hover:bg-pink-500 hover:text-black transition-all">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </HoloCard>
              ))}
            </div>
          </section>

          {/* Experience - Mission Timeline */}
          <section className="py-40 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-24 text-center uppercase">Signal_History.log</h2>
            <div className="space-y-16 relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-cyan-500/20 -translate-x-1/2" />
              {displayExperience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex gap-12 ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-col items-center relative z-10`}
                >
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
                  <div className="w-full md:w-1/2">
                    <div className="p-10 border border-cyan-500/20 bg-purple-900/5 backdrop-blur-md rounded-2xl hover:border-pink-500/40 transition-all group">
                      <span className="text-[10px] text-pink-500 uppercase tracking-[0.4em] mb-4 block font-bold">{exp.period}</span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">{exp.role}</h3>
                      <p className="text-lg text-white/40 font-bold mb-6 italic">{exp.company}</p>
                      <p className="text-sm text-cyan-400/60 leading-relaxed italic">&gt; {exp.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact - Neural Uplink */}
          <section id="uplink" className="py-60 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 blur-[150px] rounded-full -z-10" />
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-20 uppercase italic">Initiate<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">Connection.</span></h2>
                <div className="flex flex-col md:flex-row justify-center gap-20 items-center mb-24">
                  <a href={`mailto:${email}`} className="text-2xl md:text-4xl font-bold border-b-4 border-pink-500 pb-2 hover:text-pink-500 transition-all tracking-tight uppercase">
                    {email}
                  </a>
                  <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400/60">
                    <a href={linkedinUrl} className="hover:text-white transition-colors">LINKEDIN</a>
                    <a href={githubUrl} className="hover:text-white transition-colors">GITHUB</a>
                  </div>
                </div>
                
                <div className="max-w-xl mx-auto p-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl">
                  <div className="bg-[#0a0510] rounded-2xl p-10 space-y-8 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40">Transmission_ID</label>
                      <input type="text" placeholder="Your_Name" className="w-full bg-white/5 border border-cyan-500/20 rounded p-4 outline-none focus:border-cyan-400 transition-all text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40">Neural_Path</label>
                      <input type="email" placeholder="Your_Email" className="w-full bg-white/5 border border-cyan-500/20 rounded p-4 outline-none focus:border-cyan-400 transition-all text-white" />
                    </div>
                    <button className="w-full py-6 bg-cyan-400 text-black font-bold uppercase tracking-[0.4em] text-xs shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 transition-all">
                      Broadcast Signal
                    </button>
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>
        </main>

        <footer className="py-20 px-6 border-t border-cyan-500/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400/40">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-2xl text-white font-black tracking-tighter">AGENT_{name.toUpperCase()}.</span>
              <span>© {new Date().getFullYear()} / NEURAL_CORE_V5</span>
            </div>
            <div className="flex gap-12">
              <span className="text-pink-500/40">UPLINK_SECURE</span>
              <span className="text-purple-500/40">ICE_ACTIVE</span>
              <span className="text-cyan-500/40">GRID_STABLE</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
            >
              UPLINK_TOP
            </motion.button>
          </div>
        </footer>

        <style jsx global>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #0a0510; }
          ::-webkit-scrollbar-thumb { background: #ec4899; border-radius: 0px; }
          body { background-color: #0a0510; }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scanline {
            animation: scanline 8s linear infinite;
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          @keyframes spin-reverse-slow {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-reverse-slow {
            animation: spin-reverse-slow 25s linear infinite;
          }
          @keyframes flicker {
            0% { opacity: 0.05; }
            50% { opacity: 0.08; }
            100% { opacity: 0.05; }
          }
          .animate-flicker {
            animation: flicker 0.15s infinite;
          }
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
