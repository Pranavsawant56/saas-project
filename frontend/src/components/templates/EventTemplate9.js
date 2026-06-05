import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const T = {
   emerald: "#064e3b",
   sapphire: "#1e3a8a",
   gold: "#d4af37",
   goldLight: "#f3e5ab",
   offWhite: "#fdfbf7",
   darkText: "#1a1a1a",
};

const DEFAULT_DATA = {
   agencyName: "LUMIÈRE",
   tagline: "Unparalleled Elegance.",
   heroTitle: "Bespoke Affairs",
   bio: "Curating extraordinary moments for the world's most discerning clientele. Lumière orchestrates galas, royal weddings, and exclusive soirées with a commitment to absolute perfection and timeless grace.",
   aboutUsTitle: "The Signature of Luxury",
   contactEmail: "concierge@lumiere.com",
   phone: "+33 1 23 45 67 89",
   address: "Avenue des Champs-Élysées, Paris",
   footerCopyright: `© ${new Date().getFullYear()} Lumière Events.`,
   heroImage: "/images/templates/template-img-22.jpg",
   aboutImage: "/images/templates/template-img-23.jpg",
   services: [
      { name: "Royal Galas", desc: "Exquisite dinners with flawless service.", icon: "G" },
      { name: "High Society Weddings", desc: "A masterpiece of romance and grandeur.", icon: "W" },
      { name: "VIP Soirées", desc: "Discreet, exclusive, and unforgettable.", icon: "V" },
   ],
   projects: [
      { name: "The Crystal Ball", tag: "Gala", img: "/images/templates/template-img-24.jpg" },
      { name: "Villa d'Este", tag: "Wedding", img: "/images/templates/template-img-25.jpg" },
      { name: "Monaco Grand", tag: "VIP", img: "/images/templates/template-img-26.jpg" },
   ],
};

const fadeUp = (delay = 0) => ({
   hidden: { opacity: 0, y: 40 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } }
});

export default function EventTemplate9({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length ? d.services : DEFAULT_DATA.services;
   const projects = d.projects?.length ? d.projects : DEFAULT_DATA.projects;

   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: containerRef });
   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

   return (
      <div ref={containerRef} style={{ fontFamily: "'Playfair Display', serif", background: T.offWhite, color: T.darkText, overflowX: "hidden" }}>
         
         {/* HEADER */}
         <header className="fixed w-full z-50 py-8 px-12 mix-blend-difference text-white flex justify-between items-center">
            <div className="text-2xl tracking-[0.3em] uppercase">{d.agencyName}</div>
            <button className="text-sm tracking-[0.2em] uppercase border-b pb-1 border-white/50 hover:border-white transition-colors">
               Enquire
            </button>
         </header>

         {/* HERO */}
         <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
               <img src={d.heroImage} alt="Hero" className="w-full h-full object-cover opacity-70" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </motion.div>
            
            <div className="relative z-10 text-center text-white px-4">
               <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
                  <motion.p variants={fadeUp(0.2)} className="text-sm md:text-lg tracking-[0.4em] uppercase mb-6" style={{ color: T.gold }}>
                     {d.tagline}
                  </motion.p>
                  <motion.h1 variants={fadeUp(0.4)} className="text-5xl md:text-8xl lg:text-[140px] font-medium tracking-tight leading-none mb-10">
                     {d.heroTitle}
                  </motion.h1>
                  <motion.div variants={fadeUp(0.6)} className="w-px h-24 mx-auto" style={{ background: `linear-gradient(to bottom, ${T.gold}, transparent)` }} />
               </motion.div>
            </div>
         </section>

         {/* ABOUT */}
         <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
               <motion.h2 variants={fadeUp(0)} className="text-3xl md:text-5xl text-[#064e3b] italic mb-12">
                  {d.aboutUsTitle}
               </motion.h2>
               <motion.p variants={fadeUp(0.2)} className="text-xl md:text-3xl leading-relaxed font-light max-w-4xl mx-auto" style={{ color: "#444" }}>
                  {d.bio}
               </motion.p>
               <motion.div variants={fadeUp(0.4)} className="mt-16 flex justify-center">
                  <img src={d.aboutImage} alt="About" className="w-full max-w-4xl h-[60vh] object-cover rounded-t-full shadow-2xl" />
               </motion.div>
            </motion.div>
         </section>

         {/* SERVICES */}
         <section className="py-32 relative text-white" style={{ background: T.emerald }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
               <div className="text-center mb-24">
                  <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: T.goldLight }}>Our Expertise</span>
                  <h2 className="text-5xl md:text-7xl">Art of Celebration</h2>
               </div>
               <div className="grid md:grid-cols-3 gap-12">
                  {services.map((svc, i) => (
                     <motion.div 
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUp(i * 0.2)}
                        className="text-center group"
                     >
                        <div className="w-24 h-24 mx-auto border rounded-full flex items-center justify-center text-3xl italic mb-8 transition-colors group-hover:bg-[#d4af37] group-hover:text-black group-hover:border-[#d4af37]" style={{ borderColor: T.goldLight, color: T.goldLight }}>
                           {svc.icon}
                        </div>
                        <h3 className="text-2xl mb-4 text-[#f3e5ab]">{svc.name}</h3>
                        <p className="font-light text-white/80 leading-relaxed">{svc.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* PORTFOLIO */}
         <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <span className="text-sm tracking-[0.3em] uppercase mb-4 block" style={{ color: T.sapphire }}>Portfolio</span>
               <h2 className="text-5xl md:text-7xl text-[#1e3a8a]">Selected Works</h2>
            </div>
            <div className="grid gap-24">
               {projects.map((proj, i) => (
                  <motion.div 
                     key={i}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-100px" }}
                     variants={fadeUp(0)}
                     className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                     <div className="w-full md:w-3/5 overflow-hidden group">
                        <img src={proj.img} alt={proj.name} className="w-full h-[60vh] object-cover transition-transform duration-1000 group-hover:scale-105" />
                     </div>
                     <div className="w-full md:w-2/5 text-center md:text-left">
                        <span className="text-sm tracking-[0.2em] uppercase block mb-4" style={{ color: T.gold }}>{proj.tag}</span>
                        <h3 className="text-4xl md:text-5xl mb-8" style={{ color: T.sapphire }}>{proj.name}</h3>
                        <button className="text-sm tracking-[0.2em] uppercase border-b pb-1 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors" style={{ borderColor: T.darkText }}>
                           View Gallery
                        </button>
                     </div>
                  </motion.div>
               ))}
            </div>
         </section>

         {/* FOOTER */}
         <footer className="py-32 text-center text-white" style={{ background: T.sapphire }}>
            <h2 className="text-4xl md:text-6xl mb-12 italic" style={{ color: T.goldLight }}>Experience the Extraordinary.</h2>
            <div className="max-w-2xl mx-auto px-6 mb-24">
               <p className="text-xl font-light leading-relaxed mb-12">
                  Contact our concierge to begin designing your next masterpiece.
               </p>
               <a href={`mailto:${d.contactEmail}`} className="text-2xl tracking-widest border-b border-[#f3e5ab] pb-2 hover:text-[#d4af37] transition-colors" style={{ color: T.goldLight }}>
                  {d.contactEmail}
               </a>
            </div>
            <div className="text-sm tracking-[0.2em] uppercase text-white/50">
               {d.footerCopyright}
            </div>
         </footer>

      </div>
   );
}
