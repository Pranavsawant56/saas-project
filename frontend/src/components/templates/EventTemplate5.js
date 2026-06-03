import { useState, useEffect, useRef } from "react";
import {
   motion,
   useScroll,
   useTransform,
   AnimatePresence,
   useInView,
} from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
   darkBg: "#0B0914",
   cardBg: "#161324",
   neonPink: "#FF2A85",
   neonCyan: "#00F0FF",
   neonLime: "#39FF14",
   white: "#FFFFFF",
   muted: "#8A84A4"
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "VOLT EVENTS",
   tagline: "Amplifying Your Experiences",
   heroTitle: "Electric Moments. Unforgettable Nights.",
   bio: "VOLT Events is a next-generation event production powerhouse. We specialize in high-energy music festivals, immersive tech conferences, and epic nightlife experiences that push the boundaries of reality.",
   aboutUsTitle: "Who We Are",
   contactEmail: "book@voltevents.com",
   phone: "+91 99999 88888",
   address: "Cyber City, Gurugram, 122002",
   footerCopyright: `© ${new Date().getFullYear()} VOLT Events.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

const DEFAULT_SERVICES = [
   { name: "Music Festivals", desc: "Mind-blowing stage designs and audio-visual setups.", icon: "🎵", color: C.neonPink },
   { name: "Tech Conferences", desc: "Immersive expos and networking zones that buzz with energy.", icon: "💻", color: C.neonCyan },
   { name: "Nightlife & Clubs", desc: "Curating the best DJs and atmospheric experiences.", icon: "🎧", color: C.neonLime },
];

const DEFAULT_PROJECTS = [
   { name: "Neon Nights '24", desc: "A techno festival hosting 15,000 ravers.", tag: "Festival", img: "/images/templates/template-img-44.jpg" },
   { name: "Future Summit", desc: "Global AI expo with holographic displays.", tag: "Tech Expo", img: "/images/templates/template-img-45.jpg" },
   { name: "The Drop", desc: "Exclusive underground warehouse party.", tag: "Nightlife", img: "/images/templates/template-img-46.jpg" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Brainstorming", desc: "We map out the vibe and the energy." },
   { step: "02", title: "Production Setup", desc: "Lighting, sound, and stage architecture." },
   { step: "03", title: "Showtime", desc: "Executing the ultimate live experience." },
];

const DEFAULT_FAQS = [
   { q: "Do you handle artist bookings?", a: "Yes, we have direct connections with top-tier international DJs and artists." },
   { q: "Can you build custom stages?", a: "Absolutely. Our set designers build 100% custom stages with immersive LED walls and pyrotechnics." },
];

// Marquee
function Marquee({ items, reverse = false }) {
   return (
      <div className="flex overflow-hidden whitespace-nowrap py-4 border-y border-white/10" style={{ background: C.cardBg }}>
         <motion.div
            className="flex items-center gap-10"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter" style={{ color: i % 2 === 0 ? C.neonCyan : "transparent", WebkitTextStroke: i % 2 !== 0 ? `2px ${C.neonPink}` : "none" }}>
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

const rv = (i = 0) => ({
   initial: { opacity: 0, scale: 0.9, rotate: -2 },
   whileInView: { opacity: 1, scale: 1, rotate: 0 },
   viewport: { once: true, margin: "-50px" },
   transition: { type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 },
});

export default function EventTemplate5({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length ? d.projects : DEFAULT_PROJECTS;
   const PROCESS = d.eventPlanningProcess?.length ? d.eventPlanningProcess.map((p, i) => ({ step: `0${i+1}`, title: p.step, desc: p.desc })) : DEFAULT_PROCESS;
   const FAQS = d.faqs?.length ? d.faqs.map(f => ({ q: f.question, a: f.answer })) : DEFAULT_FAQS;

   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [activeFaq, setActiveFaq] = useState(null);

   const WORDS = ["ENERGY", "MUSIC", "LIGHTS", "VIBES", "FUTURE"];

   return (
      <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", background: C.darkBg, color: C.white, overflowX: "hidden" }}>
         
         {/* HEADER */}
         <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4 rounded-2xl" style={{ background: "rgba(22, 19, 36, 0.8)", backdropFilter: "blur(12px)", border: `1px solid ${C.neonCyan}40` }}>
               <div className="font-black text-xl italic tracking-tighter truncate max-w-[150px] sm:max-w-[300px]" style={{ color: C.neonLime }}>
                  {d.agencyName}
               </div>

               <nav className="hidden lg:flex gap-8 text-sm font-bold uppercase tracking-wider">
                  {["Services", "Projects", "Process"].map(item => (
                     <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00F0FF] transition-colors">{item}</a>
                  ))}
               </nav>

               <div className="hidden lg:block">
                  <a href="#contact" className="px-6 py-2 rounded-full font-bold text-black uppercase tracking-wider text-sm hover:scale-105 transition-transform inline-block" style={{ background: C.neonCyan, boxShadow: `0 0 20px ${C.neonCyan}60` }}>
                     Book Now
                  </a>
               </div>

               <button className="lg:hidden p-2 rounded-lg" style={{ background: `${C.neonPink}20`, color: C.neonPink }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
               </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
               {isMobileMenuOpen && (
                  <motion.div 
                     initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                     className="absolute top-20 left-4 right-4 p-6 rounded-2xl lg:hidden flex flex-col gap-4 z-50 border"
                     style={{ background: C.cardBg, borderColor: `${C.neonCyan}40` }}
                  >
                     {["Services", "Projects", "Process"].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold uppercase" style={{ color: C.white }}>{item}</a>
                     ))}
                     <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-6 py-3 rounded-full text-sm font-black text-black mt-2" style={{ background: C.neonCyan }}>
                        Book Now
                     </a>
                  </motion.div>
               )}
            </AnimatePresence>
         </header>

         {/* HERO */}
         <section className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-50" style={{ background: C.neonPink }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-50" style={{ background: C.neonCyan }} />

            <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
               <div className="text-center lg:text-left">
                  <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-6" style={{ border: `1px solid ${C.neonLime}`, color: C.neonLime, background: `${C.neonLime}10` }}>
                     {d.tagline}
                  </motion.div>
                  <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl sm:text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
                     {d.heroTitle.split(" ").map((w, i) => <span key={i} className="inline-block mr-3 max-w-full break-words" style={{ color: i % 2 === 0 ? C.white : C.neonCyan }}>{w}</span>)}
                  </motion.h1>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg sm:text-xl font-medium max-w-lg mx-auto lg:mx-0 mb-10 break-words" style={{ color: C.muted }}>
                     {d.bio}
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                     <a href="#contact" className="px-8 py-4 rounded-full font-black text-black uppercase tracking-widest text-center transition-transform hover:scale-105" style={{ background: C.neonPink, boxShadow: `0 0 30px ${C.neonPink}60` }}>FEEL THE RUSH</a>
                  </motion.div>
               </div>

               <div className="relative w-full max-w-md mx-auto">
                  <motion.div initial={{ scale: 0.8, opacity: 0, rotate: 5 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden aspect-[4/5] border-4" style={{ borderColor: C.neonPink }}>
                     <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Vibrant Event" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
                  </motion.div>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-dashed border-2 flex items-center justify-center bg-black" style={{ borderColor: C.neonCyan, color: C.neonCyan }}>
                     <div className="font-black text-center text-xs uppercase">100%<br/>Energy</div>
                  </motion.div>
               </div>
            </div>
         </section>

         <Marquee items={WORDS} />

         {/* SERVICES */}
         <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter">The <span style={{ color: C.neonPink }}>Arsenal</span></h2>
               </div>
               <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...rv(i * 0.2)} className="p-8 sm:p-10 rounded-3xl group relative overflow-hidden" style={{ background: C.cardBg, border: `1px solid ${C.muted}30` }}>
                        <div className="absolute top-0 right-0 p-4 text-6xl opacity-20 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125 group-hover:-rotate-12">{svc.icon}</div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4 relative z-10" style={{ color: svc.color || C.neonCyan }}>{svc.name}</h3>
                        <p className="text-base font-medium leading-relaxed relative z-10" style={{ color: C.muted }}>{svc.desc}</p>
                        <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style={{ background: svc.color || C.neonCyan }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* PROJECTS */}
         <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#161324] border-y border-white/5">
            <div className="max-w-7xl mx-auto">
               <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter mb-16 text-center">Past <span style={{ color: C.neonLime }}>Glory</span></h2>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((p, i) => (
                     <motion.div key={i} {...rv(i * 0.2)} className="group cursor-pointer">
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border-2 border-transparent group-hover:border-[#39FF14] transition-colors">
                           <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute top-4 left-4 px-3 py-1 bg-black text-[#39FF14] text-xs font-black uppercase tracking-widest rounded-full">{p.tag}</div>
                        </div>
                        <h3 className="text-2xl font-black uppercase italic">{p.name}</h3>
                        <p className="text-sm font-medium mt-2" style={{ color: C.muted }}>{p.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <Marquee items={["LOUDER", "FASTER", "HARDER", "STRONGER", "WILDER"]} reverse />

         {/* CONTACT */}
         <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FF2A85 0, #FF2A85 1px, transparent 1px, transparent 20px)" }} />
            <div className="max-w-4xl mx-auto relative z-10 text-center bg-[#161324] p-10 sm:p-16 rounded-[3rem] border border-[#FF2A85] shadow-[0_0_50px_rgba(255,42,133,0.3)]">
               <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter mb-6">Light It <span style={{ color: C.neonPink }}>Up</span>.</h2>
               <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: C.muted }}>Ready to throw the party of the century? Drop us a line and let's make noise.</p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center font-bold text-lg mb-10">
                  <div className="bg-black/50 px-6 py-4 rounded-xl border border-white/10 text-[#00F0FF] break-words">{d.contactEmail}</div>
                  <div className="bg-black/50 px-6 py-4 rounded-xl border border-white/10 text-[#39FF14]">{d.phone}</div>
               </div>

               <button className="px-10 py-5 rounded-full font-black text-black uppercase tracking-widest text-lg hover:scale-105 transition-transform" style={{ background: C.neonCyan, boxShadow: `0 0 30px ${C.neonCyan}60` }}>
                  Ignite Project
               </button>
            </div>
         </section>

         {/* FOOTER */}
         <footer className="py-8 px-6 text-center border-t border-white/10" style={{ background: C.cardBg }}>
            <div className="font-black text-2xl italic tracking-tighter mb-2" style={{ color: C.neonLime }}>{d.agencyName}</div>
            <div className="text-sm font-bold uppercase tracking-wider" style={{ color: C.muted }}>{d.footerCopyright}</div>
         </footer>
      </div>
   );
}
