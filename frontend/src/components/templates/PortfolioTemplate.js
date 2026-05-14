import TemplateLayout from "./TemplateLayout";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const NavLink = ({ href, children, active }) => (
  <a
    href={href}
    className={`relative py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 hover:text-indigo-400 ${active ? "text-indigo-400" : "text-zinc-500"
      }`}
  >
    {children}
    {active && (
      <motion.div
        layoutId="navUnderline"
        className="absolute -bottom-1 left-0 w-full h-px bg-indigo-500"
      />
    )}
  </a>
);

export default function PortfolioTemplate({ data }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    name = "Julian Vance",
    role = "Senior Experience Designer",
    bio = "Specializing in the intersection of visual narrative and high-performance engineering. I build digital systems that resonate with human intent and business goals.",
    avatarUrl = "/images/templates/template-img-45.jpg",
    heroTitle = "CRAFTING THE DIGITAL AVANT-GARDE.",
    email = "julian@vance.design",
    phone = "+1 987 654 321",
    linkedinUrl = "#",
    githubUrl = "#",
    twitterUrl = "#",
    aboutUsTitle = "The Architecture of Intent",
    experience = [],
    skills = [],
    projects = [],
    services = [],
    testimonials = [],
    location = "San Francisco, CA"
  } = data || {};

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "about", "skills", "projects", "experience", "services", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax Effect for Hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  const defaultSkills = [
    { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Three.js"], icon: "⚛️" },
    { category: "Backend", items: ["Node.js", "Python", "GraphQL", "Postgres"], icon: "⚙️" },
    { category: "Design", items: ["Figma", "Spline", "Webflow", "After Effects"], icon: "🎨" },
    { category: "Cloud", items: ["AWS", "Vercel", "Docker", "Git"], icon: "☁️" }
  ];

  const defaultProjects = [
    { title: "VELOCITY CORE", desc: "A high-frequency trading interface focused on data density.", image: "/images/templates/template-img-11.jpg", tags: ["Fintech", "UI/UX"], link: "#" },
    { title: "AETHERIS", desc: "Decentralized social platform with custom motion systems.", image: "/images/templates/template-img-12.jpg", tags: ["Web3", "Motion"], link: "#" }
  ];

  const defaultExperience = [
    { role: "Staff Product Designer", company: "Aura Systems", period: "2021 — Present", desc: "Orchestrating design systems for distributed cloud ecosystems." },
    { role: "Lead UI Engineer", company: "Flux Lab", period: "2018 — 2021", desc: "Developed the core component library used by 200+ engineers." }
  ];

  const defaultServices = [
    { title: "Design Systems", desc: "Scaling visual languages across global organizations.", icon: "🧊" },
    { title: "Web Performance", desc: "Optimizing the critical rendering path for sub-second load times.", icon: "⚡" },
    { title: "Creative Dev", desc: "Merging WebGL and React for immersive storytelling.", icon: "🌪️" }
  ];

  const defaultTestimonials = [
    { name: "Sarah Chen", role: "CTO @ Flux", text: "Julian is that rare breed of engineer who understands design as deeply as they understand code.", image: "/images/templates/template-img-49.jpg" },
    { name: "David Miller", role: "VP Product @ Nexus", text: "The technical leadership and execution Julian brought to our team was truly transformative.", image: "/images/templates/template-img-50.jpg" }
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displayExperience = experience.length > 0 ? experience : defaultExperience;
  const displayServices = services.length > 0 ? services : defaultServices;
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  if (!mounted) return null;

  return (
    <TemplateLayout data={data} theme="dark" category="Portfolio" hideHeader={true} hideFooter={true}>
      <div className="bg-[#050505] text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">

        {/* Navigation */}
        <nav className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 lg:px-20 py-8 ${isScrolled ? "bg-black/60 backdrop-blur-2xl py-4 border-b border-white/5" : ""}`}>
          <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-black italic text-xl">
                {name.charAt(0)}
              </div>
              <span className="font-black tracking-tighter text-lg uppercase hidden sm:block">{name}</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 items-center">
              {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
                <NavLink key={item} href={`#${item}`} active={activeSection === item}>
                  {item === "home" ? "Entry" : item}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a href="#contact" className="hidden sm:flex px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 hover:text-white transition-all rounded-full">
                Hire Me
              </a>
              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5">
                <div className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <div className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <div className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter hover:text-indigo-500 transition-colors"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* Hero Section */}
          <section id="home" className="flex flex-col items-center text-center px-6 pt-40 pb-12 relative">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-indigo-600/30 blur-[150px] rounded-full animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-purple-600/30 blur-[150px] rounded-full animate-pulse delay-700" />
            </div>

            <motion.div style={{ y: y1, opacity: opacityHero }} className="relative z-10 max-w-7xl mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-32 h-32 rounded-2xl border border-white/10 p-2 mb-12 mx-auto overflow-hidden rotate-3"
              >
                <Image src={avatarUrl} alt={name} width={128} height={128} className="rounded-xl grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-indigo-500 font-black tracking-[0.6em] uppercase text-[10px] mb-8 block"
              >
                {role}
              </motion.span>

              <h1 className="text-5xl md:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                {heroTitle.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className={`inline-block ${i % 2 !== 0 ? "text-transparent text-stroke-white italic" : ""}`}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-col md:flex-row justify-center gap-8 items-center max-w-3xl mx-auto"
              >
                <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                  {bio}
                </p>
              </motion.div>

              <div className="mt-24 flex justify-center gap-10">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 rotate-90 mb-4">SCROLL</span>
                  <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="py-12 px-6 lg:px-20 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 p-8 lg:p-20 bg-zinc-900/30 border border-white/5 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -mr-32 -mt-32 transition-all group-hover:bg-indigo-600/20" />
                <h2 className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.4em] mb-12 italic">// THE_ARCHIVE</h2>
                <h3 className="text-4xl md:text-6xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
                  {aboutUsTitle}
                </h3>
                <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl font-light">
                  I specialize in bridging the gap between artistic expression and technical excellence. With over {data?.experience_years || "08"} years of experience, I've led projects from conceptual wireframes to global deployment.
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 gap-6">
                <div className="p-8 bg-white text-black rounded-[3rem] flex flex-col justify-between hover:scale-[1.02] transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Reach</span>
                  <div className="flex items-end justify-between">
                    <span className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none">40+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-right max-w-[80px]">Live Products Deployed</span>
                  </div>
                </div>
                <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-[3rem] flex flex-col justify-between group overflow-hidden">
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-800" />)}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase mb-4 text-zinc-300 tracking-tighter">Current Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "Framer", "Go", "AWS"].map(tech => (
                        <span key={tech} className="text-[10px] font-black px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-500">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Grid */}
          <section id="skills" className="py-12 px-6 lg:px-20 bg-white/[0.01]">
            <div className="max-w-[1400px] mx-auto text-center mb-16">
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter opacity-10 leading-none mb-4 select-none">TECHNICAL</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-[-6vw] relative z-10">CORE CAPABILITIES.</h3>
            </div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displaySkills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] group hover:bg-zinc-900/40 transition-all"
                >
                  <div className="text-5xl mb-12 grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100">{skill.icon}</div>
                  <h4 className="text-xl font-black uppercase mb-8 text-white tracking-widest border-b border-indigo-500/20 pb-4">{skill.category}</h4>
                  <div className="space-y-4">
                    {skill.items.map(item => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-widest">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Gallery */}
          <section id="projects" className="py-12 px-6 lg:px-20 border-y border-white/5">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">The<br />Registry.</h2>
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.6em] max-w-xs text-right">Selected High-Performance Applications 2022 — 2024</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
                {displayProjects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[4/5] md:aspect-[16/11] relative overflow-hidden rounded-[3rem] bg-zinc-900 border border-white/5 mb-10 group-hover:shadow-[0_0_80px_-20px_rgba(79,70,229,0.2)] transition-all duration-700">
                      <Image src={project.image} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-all duration-700" />
                      <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">↗</div>
                    </div>
                    <div className="px-6">
                      <div className="flex gap-3 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-4xl font-black uppercase mb-6 tracking-tighter group-hover:text-indigo-400 transition-colors italic">{project.title}</h3>
                      <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl font-light">{project.desc}</p>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="mt-10 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white border-b border-white pb-2"
                      >
                        Full Study [0{i + 1}]
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Sequence */}
          <section id="experience" className="py-12 px-6 lg:px-20 bg-zinc-950/50">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-8">Professional Chronology</span>
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">Career Path.</h2>
              </div>

              <div className="relative space-y-px bg-zinc-800 border border-zinc-800 rounded-[3rem] overflow-hidden">
                {displayExperience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-20 bg-[#050505] hover:bg-zinc-900/30 transition-all group"
                  >
                    <div className="lg:col-span-3">
                      <span className="text-zinc-600 font-black text-sm uppercase tracking-widest block mb-4 group-hover:text-indigo-500 transition-colors">{exp.period}</span>
                      <div className="w-12 h-px bg-zinc-800 group-hover:w-full group-hover:bg-indigo-500 transition-all duration-700" />
                    </div>
                    <div className="lg:col-span-9 flex flex-col md:flex-row gap-8 justify-between">
                      <div className="max-w-xl">
                        <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter italic group-hover:translate-x-2 transition-transform">{exp.role}</h4>
                        <span className="block text-xl font-bold text-zinc-400 mb-8">{exp.company}</span>
                        <p className="text-zinc-500 leading-relaxed text-lg font-light italic">&quot;{exp.desc}&quot;</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-indigo-500 group-hover:border-indigo-500 transition-all">
                          [0{i + 1}]
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Slider */}
          <section id="testimonials" className="py-12 px-6 lg:px-20 border-b border-white/5">
            <div className="max-w-5xl mx-auto">
              <div className="relative p-8 md:p-24 bg-zinc-900/20 border border-white/5 rounded-[4rem] backdrop-blur-2xl">
                <div className="text-9xl absolute top-10 left-10 text-indigo-500/10 font-serif -z-10 select-none">“</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center"
                  >
                    <p className="text-2xl md:text-4xl text-zinc-200 italic mb-16 leading-relaxed font-light">
                      {displayTestimonials[activeTestimonial].text}
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 relative rounded-2xl overflow-hidden mb-8 border border-white/10 p-1 bg-zinc-800">
                        <Image src={displayTestimonials[activeTestimonial].image} alt={displayTestimonials[activeTestimonial].name} fill className="object-cover rounded-xl grayscale" />
                      </div>
                      <h4 className="font-black uppercase tracking-widest text-xl mb-2">{displayTestimonials[activeTestimonial].name}</h4>
                      <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em]">{displayTestimonials[activeTestimonial].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-center gap-6 mt-20">
                  {displayTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-1 transition-all duration-500 rounded-full ${i === activeTestimonial ? "bg-indigo-500 w-16" : "bg-zinc-800 w-8 hover:bg-zinc-600"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-12 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.5em] block mb-12">// INITIALIZE_UPLINK</span>
                <h2 className="text-7xl md:text-[10vw] font-black uppercase leading-[0.8] tracking-tighter mb-16 italic">Ping<br />the<br />Core.</h2>
                <p className="text-xl md:text-2xl text-zinc-500 mb-20 max-w-md font-light leading-relaxed">Currently processing high-impact design and engineering cycles for 2024.</p>

                <div className="space-y-12">
                  <div className="group cursor-pointer">
                    <span className="block text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-4 group-hover:text-indigo-500 transition-colors">Direct Channel</span>
                    <a href={`mailto:${email}`} className="text-3xl md:text-4xl font-black hover:text-indigo-400 transition-colors uppercase tracking-tighter italic">{email}</a>
                  </div>
                  <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                    <a href={githubUrl} className="hover:text-white transition-colors">GITHUB</a>
                    <a href={linkedinUrl} className="hover:text-white transition-colors">LINKEDIN</a>
                    <a href={twitterUrl} className="hover:text-white transition-colors">TWITTER</a>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-20 bg-zinc-900/30 border border-white/5 rounded-[4rem] backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full group-hover:bg-indigo-600/10 transition-all" />
                <form className="space-y-12 relative z-10">
                  <div className="group relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-4 group-focus-within:text-indigo-500 transition-colors">Full Identity</label>
                    <input type="text" placeholder="NAME_HERE" className="w-full bg-transparent border-b border-zinc-800 py-6 outline-none focus:border-white transition-colors font-black uppercase text-sm tracking-widest" />
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-4 group-focus-within:text-indigo-500 transition-colors">Signal Origin</label>
                    <input type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-transparent border-b border-zinc-800 py-6 outline-none focus:border-white transition-colors font-black uppercase text-sm tracking-widest" />
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-4 group-focus-within:text-indigo-500 transition-colors">Transmission</label>
                    <textarea rows={4} placeholder="CONTENT_PAYLOAD" className="w-full bg-transparent border-b border-zinc-800 py-6 outline-none focus:border-white transition-colors font-black uppercase text-sm tracking-widest resize-none" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-10 bg-indigo-600 text-white font-black uppercase tracking-[0.5em] text-xs hover:bg-white hover:text-black transition-all duration-500 shadow-[0_20px_50px_-20px_rgba(79,70,229,0.5)]"
                  >
                    Send Signal
                  </motion.button>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-20 px-6 lg:px-20 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-4xl font-black italic tracking-tighter mb-4 text-white">{name.charAt(0)}V.</span>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700 underline decoration-indigo-500 underline-offset-8 decoration-2">Architecting Future Realities</p>
            </div>

            <div className="flex gap-20">
              <div className="flex flex-col gap-6 text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-800 italic">SYSTEM</span>
                <a href="#home" className="hover:text-indigo-400 transition-colors">HOME</a>
                <a href="#projects" className="hover:text-indigo-400 transition-colors">WORK</a>
                <a href="#about" className="hover:text-indigo-400 transition-colors">BIO</a>
              </div>
              <div className="flex flex-col gap-6 text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-800 italic">SIGNAL</span>
                <a href={githubUrl} className="hover:text-indigo-400 transition-colors">GITHUB</a>
                <a href={linkedinUrl} className="hover:text-indigo-400 transition-colors">LINKEDIN</a>
                <a href={twitterUrl} className="hover:text-indigo-400 transition-colors">TWITTER</a>
              </div>
            </div>
          </div>
          <div className="mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.8em] text-zinc-800">
            <span>© {new Date().getFullYear()} CORE_SYS_V1 / {name}</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-zinc-600 transition-colors">PRIVACY_PROTOCOL</a>
              <a href="#" className="hover:text-zinc-600 transition-colors">TERMS_OF_SERVICE</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>SYSTEM_OPERATIONAL [ {location.toUpperCase()} ]</span>
            </div>
          </div>
        </footer>

        <style jsx global>{`
          .text-stroke-white {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          }
          @media (min-width: 1024px) {
            .text-stroke-white:hover {
              -webkit-text-stroke: 1px #6366f1;
              color: transparent;
            }
          }
          ::-webkit-scrollbar {
            width: 5px;
          }
          ::-webkit-scrollbar-track {
            background: #050505;
          }
          ::-webkit-scrollbar-thumb {
            background: #1a1a1a;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #6366f1;
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </div>
    </TemplateLayout>
  );
}
