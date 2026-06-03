import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
   bg: "#FAFAFA",
   text: "#222222",
   muted: "#777777",
   accent: "#B4C4AE", // Sage green
   border: "#EAEAEA",
   white: "#FFFFFF"
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "Lumina",
   tagline: "Mindful Events & Retreats",
   heroTitle: "Breathe. Connect. Celebrate.",
   bio: "Lumina specializes in designing calm, aesthetic, and profoundly meaningful events. We craft intimate boutique weddings, wellness retreats, and mindful corporate offsites that allow genuine connection.",
   aboutUsTitle: "Our Philosophy",
   contactEmail: "hello@luminaevents.co",
   phone: "+91 88888 77777",
   address: "The Greenhouse, Bandra West, Mumbai",
   footerCopyright: `© ${new Date().getFullYear()} Lumina. Mindfully created.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

const DEFAULT_SERVICES = [
   { name: "Intimate Weddings", desc: "Thoughtfully curated ceremonies focusing on authentic moments.", img: "/images/templates/template-img-36.jpg" },
   { name: "Wellness Retreats", desc: "Immersive nature getaways to align mind, body, and spirit.", img: "/images/templates/template-img-41.jpg" },
   { name: "Mindful Gatherings", desc: "Corporate offsites designed for deep connection and creativity.", img: "/images/templates/template-img-44.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "The Alibaug Retreat", desc: "A 3-day wellness escape for 50 leaders.", tag: "Retreat", img: "/images/templates/template-img-44.jpg" },
   { name: "Earth & Sky", desc: "A sustainable, zero-waste forest wedding.", tag: "Wedding", img: "/images/templates/template-img-45.jpg" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Alignment", desc: "Understanding the soul of your event." },
   { step: "02", title: "Design", desc: "Curating natural palettes and sustainable elements." },
   { step: "03", title: "Experience", desc: "A seamless, grounded execution." },
];

const rv = (i = 0) => ({
   initial: { opacity: 0, y: 20 },
   whileInView: { opacity: 1, y: 0 },
   viewport: { once: true, margin: "-50px" },
   transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

export default function EventTemplate6({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length ? d.projects : DEFAULT_PROJECTS;
   const PROCESS = d.eventPlanningProcess?.length ? d.eventPlanningProcess.map((p, i) => ({ step: `0${i+1}`, title: p.step, desc: p.desc })) : DEFAULT_PROCESS;

   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
         
         {/* HEADER */}
         <header className="fixed top-0 left-0 right-0 z-50 p-6 sm:p-10 mix-blend-difference text-white pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
               <div className="font-light text-xl tracking-widest uppercase pointer-events-auto truncate max-w-[150px] xs:max-w-[200px] sm:max-w-[300px]">
                  {d.agencyName}
               </div>
               <button className="pointer-events-auto hover:opacity-70 transition-opacity" onClick={() => setIsMenuOpen(true)}>
                  <span className="text-sm font-light tracking-widest uppercase">Menu</span>
               </button>
            </div>
         </header>

         {/* FULLSCREEN MENU */}
         <AnimatePresence>
            {isMenuOpen && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-white p-6">
                  <button className="absolute top-6 sm:top-10 right-6 sm:right-10 text-sm font-light tracking-widest uppercase hover:opacity-70" onClick={() => setIsMenuOpen(false)}>Close</button>
                  <div className="flex flex-col gap-8 text-center">
                     {["Services", "Projects", "Process", "Contact"].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-4xl sm:text-6xl font-light tracking-tight hover:text-[#B4C4AE] transition-colors">{item}</a>
                     ))}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* HERO */}
         <section className="min-h-[100svh] flex flex-col justify-center items-center text-center p-6 sm:p-10 relative">
            <div className="w-full max-w-4xl mx-auto relative z-10 pt-20">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-xs font-light tracking-[0.3em] uppercase mb-8" style={{ color: C.muted }}>
                  {d.tagline}
               </motion.div>
               <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tighter leading-tight mb-12">
                  {d.heroTitle.split(" ").map((w, i) => <span key={i} className="inline-block mr-3 max-w-full break-words">{w}</span>)}
               </motion.h1>
            </div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.4 }} className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden mt-8">
               <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Hero" className="w-full h-full object-cover" />
            </motion.div>
         </section>

         {/* ABOUT */}
         <section className="py-24 sm:py-32 p-6 sm:p-10 max-w-4xl mx-auto text-center">
            <motion.div {...rv(0)} className="w-12 h-12 mx-auto rounded-full mb-8" style={{ background: C.accent }} />
            <motion.p {...rv(1)} className="text-2xl sm:text-4xl font-light leading-relaxed tracking-tight break-words" style={{ color: C.text }}>
               {d.bio}
            </motion.p>
         </section>

         {/* SERVICES */}
         <section id="services" className="py-24 sm:py-32 p-6 sm:p-10" style={{ background: C.white }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-xs font-light tracking-[0.3em] uppercase mb-16 text-center" style={{ color: C.muted }}>{d.aboutUsTitle}</div>
               <div className="grid md:grid-cols-3 gap-10">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...rv(i * 0.2)} className="group cursor-default">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-8 bg-gray-100">
                           <img src={svc.img || "/images/templates/template-img-36.jpg"} alt={svc.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                        </div>
                        <h3 className="text-xl font-light tracking-tight mb-3">{svc.name}</h3>
                        <p className="text-sm font-light leading-relaxed" style={{ color: C.muted }}>{svc.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* PROJECTS */}
         <section id="projects" className="py-24 sm:py-32 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6 border-b pb-6" style={{ borderColor: C.border }}>
                  <h2 className="text-4xl sm:text-5xl font-light tracking-tight">Recent Work</h2>
                  <a href="#contact" className="text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity" style={{ color: C.muted }}>All Projects</a>
               </div>
               <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
                  {projects.map((p, i) => (
                     <motion.div key={i} {...rv(i * 0.2)} className="group cursor-pointer">
                        <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-100">
                           <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="flex justify-between items-start gap-4">
                           <div>
                              <h3 className="text-xl font-light tracking-tight mb-1">{p.name}</h3>
                              <p className="text-sm font-light" style={{ color: C.muted }}>{p.desc}</p>
                           </div>
                           <div className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border" style={{ borderColor: C.border, color: C.muted }}>{p.tag}</div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* PROCESS */}
         <section id="process" className="py-24 sm:py-32 p-6 sm:p-10" style={{ background: C.white }}>
            <div className="max-w-4xl mx-auto">
               <h2 className="text-4xl sm:text-5xl font-light tracking-tight mb-16 text-center">Approach</h2>
               <div className="space-y-8">
                  {PROCESS.map((p, i) => (
                     <motion.div key={i} {...rv(i * 0.2)} className="flex flex-col sm:flex-row gap-4 sm:gap-10 p-8 rounded-2xl items-start sm:items-center" style={{ background: C.bg }}>
                        <div className="text-sm font-light tracking-[0.2em]" style={{ color: C.accent }}>{p.step}</div>
                        <div>
                           <h4 className="text-lg font-light tracking-tight mb-2">{p.title}</h4>
                           <p className="text-sm font-light leading-relaxed" style={{ color: C.muted }}>{p.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* CONTACT */}
         <section id="contact" className="py-32 p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
               <h2 className="text-4xl sm:text-6xl font-light tracking-tight mb-6">Start a conversation.</h2>
               <p className="text-sm font-light leading-relaxed mb-12" style={{ color: C.muted }}>Let's craft something beautiful together.</p>
               <a href={`mailto:${d.contactEmail}`} className="inline-block text-lg sm:text-2xl font-light tracking-tight border-b pb-2 hover:opacity-60 transition-opacity break-words max-w-full">
                  {d.contactEmail}
               </a>
            </div>
            {/* Soft decorative blur */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-40" style={{ background: C.accent }} />
         </section>

         {/* FOOTER */}
         <footer className="p-6 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light tracking-widest uppercase border-t" style={{ borderColor: C.border, color: C.muted }}>
            <div>{d.footerCopyright}</div>
            <div className="flex gap-6">
               <a href="#" className="hover:text-black transition-colors">Instagram</a>
               <a href="#" className="hover:text-black transition-colors">Pinterest</a>
            </div>
         </footer>
      </div>
   );
}
