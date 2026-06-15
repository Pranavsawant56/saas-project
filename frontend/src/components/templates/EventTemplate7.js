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
   bg: "#080810",
   surface: "#0F0F1A",
   card: "#13131F",
   glass: "rgba(255,255,255,0.04)",
   border: "rgba(255,255,255,0.08)",
   red: "#E50914",
   redGlow: "rgba(229,9,20,0.35)",
   amber: "#F5A623",
   cyan: "#00C8FF",
   white: "#FFFFFF",
   muted: "#8888A8",
   dim: "#444460",
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fromLeft = (delay = 0) => ({
   initial: { opacity: 0, x: -80 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-60px" },
   transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const fromRight = (delay = 0) => ({
   initial: { opacity: 0, x: 80 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-60px" },
   transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const fromBottom = (delay = 0) => ({
   initial: { opacity: 0, y: 60 },
   whileInView: { opacity: 1, y: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "LUMIS EVENTS",
   tagline: "Curating Extraordinary Experiences",
   heroTitle: "Where Every Night Becomes A Legend",
   bio: "LUMIS is a premium event production studio crafting cinematic experiences — from intimate showcases to stadium-scale spectacles. We don't just run events; we direct them.",
   aboutUsTitle: "The Directors Behind Every Epic",
   contactEmail: "hello@lumisevents.com",
   phone: "+91 98765 43210",
   address: "Studio District, Bandra West, Mumbai 400050",
   footerCopyright: `© ${new Date().getFullYear()} LUMIS Events. All rights reserved.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
};

const SERVICES = [
   { name: "Festival Productions", tag: "LIVE", rating: 4.9, year: "2024", dur: "Multi-Day", desc: "Massive outdoor festivals with cinematic stage setups, laser grids, and 360° crowd experiences.", img: "/images/templates/template-img-36.jpg", genre: "Festival · Outdoor · XL" },
   { name: "Tech Summits", tag: "NEW", rating: 4.8, year: "2024", dur: "1–3 Days", desc: "Immersive conference halls with holographic displays and live broadcast production.", img: "/images/templates/template-img-37.jpg", genre: "Conference · Tech · Pro" },
   { name: "Nightlife Curation", tag: "HOT", rating: 4.9, year: "2024", dur: "One Night", desc: "We build the night's architecture — from DJ booths to visual mapping and crowd flow.", img: "/images/templates/template-img-41.jpg", genre: "Nightlife · Club · Intimate" },
   { name: "Brand Experiences", tag: "PRO", rating: 4.7, year: "2024", dur: "Custom", desc: "Product launches and activations that turn brands into moments people remember.", img: "/images/templates/template-img-44.jpg", genre: "Brand · Launch · Premium" },
   { name: "Luxury Galas", tag: "VIP", rating: 5.0, year: "2024", dur: "Evening", desc: "Black-tie events with bespoke décor, fine F&B curation, and flawless production.", img: "/images/templates/template-img-45.jpg", genre: "Gala · Corporate · Elite" },
   { name: "Immersive XR", tag: "BETA", rating: 4.8, year: "2024", dur: "Custom", desc: "Worlds built with spatial audio, XR domes, and projection mapping at scale.", img: "/images/templates/template-img-46.jpg", genre: "XR · Immersive · Future" },
];

const FEATURED = [
   { title: "Eclipse Festival '24", subtitle: "Our Most Ambitious Production", tag: "Trending", rating: 4.9, year: "2024", dur: "3 Days · 5 Stages", genre: "Festival | Outdoor | XL Scale", desc: "18,000 attendees across three nights in the Aravalli hills. Pyrotechnics, laser curtains, and six international headliners.", stat: "18K", img: "/images/templates/template-img-44.jpg" },
   { title: "NovaSummit Tech Expo", subtitle: "Redefining Conference Experiences", tag: "Editor's Pick", rating: 4.8, year: "2024", dur: "2 Days · Mumbai", genre: "Conference | Tech | Innovation", desc: "Holographic keynote stages, interactive demo pods, and a 200-speaker lineup across eight breakout halls.", stat: "6K", img: "/images/templates/template-img-45.jpg" },
   { title: "Noir Warehouse Party", subtitle: "Underground Legends", tag: "Sold Out", rating: 5.0, year: "2024", dur: "1 Night · Invite Only", genre: "Nightlife | Private | Underground", desc: "500 guests. One iconic Dharavi warehouse. The most talked-about party of the year.", stat: "500", img: "/images/templates/template-img-46.jpg" },
   { title: "Vega Brand Activation", subtitle: "When a Launch Becomes an Event", tag: "Award Winner", rating: 4.7, year: "2024", dur: "Weekend · Delhi", genre: "Brand | Launch | Experiential", desc: "A 3-day product universe with interactive zones, content studios, and a live countdown spectacle.", stat: "12K", img: "/images/templates/template-img-47.jpg" },
];

const GENRES = [
   { label: "Festivals", emoji: "🎵", from: "#E50914", to: "#FF6B35" },
   { label: "Tech Expos", emoji: "💻", from: "#00C8FF", to: "#9B5DE5" },
   { label: "Nightlife", emoji: "🎧", from: "#F5A623", to: "#E50914" },
   { label: "Corporate", emoji: "💼", from: "#9B5DE5", to: "#00C8FF" },
   { label: "XR / Immersive", emoji: "🌐", from: "#00C8FF", to: "#39FF14" },
   { label: "Galas", emoji: "✨", from: "#FFD93D", to: "#E50914" },
   { label: "Product Launches", emoji: "🚀", from: "#39FF14", to: "#00C8FF" },
   { label: "Brand Events", emoji: "⚡", from: "#E50914", to: "#9B5DE5" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Discovery", desc: "We decode your brand, audience, and vision in a deep-dive session.", icon: "🎬", color: C.red },
   { step: "02", title: "Concept", desc: "Our creative directors build the world — visual language, spatial design, storytelling arc.", icon: "🖼", color: C.cyan },
   { step: "03", title: "Production", desc: "Every element assembled with obsessive precision — stage, AV, crew, logistics.", icon: "🏗", color: C.amber },
   { step: "04", title: "Showtime", desc: "Flawless live execution. You're in the front row, not backstage.", icon: "🎭", color: C.red },
   { step: "05", title: "Afterglow", desc: "Content drops, highlight reels, and media packs delivered in 48 hours.", icon: "📸", color: C.cyan },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Rahul Mehta", role: "Founder, Eclipse Fest", text: "LUMIS turned our festival vision into a cinematic universe. 18,000 people lost their minds. The production was flawless, the team was elite.", avatar: "R", color: C.red },
   { name: "Priya Nair", role: "CTO, NovaSummit", text: "Our conference looked like a film set. The holographic stage and spatial audio had the entire tech community talking for months.", avatar: "P", color: C.cyan },
   { name: "Kabir Singh", role: "Creative Dir, Noir Events", text: "The Noir party went viral within hours. LUMIS understands atmosphere at a molecular level. Absolutely legendary.", avatar: "K", color: C.amber },
];

const DEFAULT_PRICING = [
   { name: "Showcase", price: "₹80K", desc: "Intimate events up to 200 guests.", color: C.cyan, features: ["Up to 200 guests", "Stage & basic lighting", "PA system", "Day-of coordination", "Photo documentation"] },
   { name: "Feature", price: "₹3.5L", desc: "Full production for mid-scale events.", color: C.red, popular: true, features: ["Up to 1,500 guests", "LED wall + stage design", "Crew of 12", "Artist booking support", "Video highlight reel", "Social content pack"] },
   { name: "Blockbuster", price: "Custom", desc: "Legendary events at any scale.", color: C.amber, features: ["Unlimited scale", "Bespoke stage universe", "Full crew deployment", "Global logistics", "PR & media support", "Year-round partnership"] },
];

const DEFAULT_FAQS = [
   { q: "How far in advance should we book?", a: "For festivals and large-scale events, 6–12 months gives us the best creative runway. For club nights and intimate events, 4–8 weeks is ideal." },
   { q: "Do you handle artist bookings?", a: "Yes — we have direct relationships with top DJs, live acts, and performers globally. We manage riders, logistics, and hospitality end-to-end." },
   { q: "Can you work outside India?", a: "Absolutely. We've produced events in Dubai, Bali, Singapore, and London. Our travel division manages full international logistics." },
   { q: "What's your post-event content offering?", a: "Within 48 hours you'll receive a curated photo pack, a 90-second highlight reel, and a social content drop ready to publish." },
   { q: "Do you do custom stage builds?", a: "Yes — every structure we build is purpose-designed. We don't rent generic stages; we architect them from scratch for your event." },
];

const DEFAULT_TEAM = [
   { name: "Meera Iyer", role: "Executive Producer", badge: "Director", color: C.red },
   { name: "Arjun Kapoor", role: "Stage Architect", badge: "Production", color: C.cyan },
   { name: "Tara Bose", role: "Creative Director", badge: "Vision", color: C.amber },
   { name: "Dev Malhotra", role: "Sound Engineer", badge: "Audio", color: C.red },
];

const DEFAULT_GALLERY = [
   "/images/templates/template-img-36.jpg",
   "/images/templates/template-img-37.jpg",
   "/images/templates/template-img-38.jpg",
   "/images/templates/template-img-39.jpg",
   "/images/templates/template-img-40.jpg",
   "/images/templates/template-img-41.jpg",
   "/images/templates/template-img-44.jpg",
   "/images/templates/template-img-45.jpg",
   "/images/templates/template-img-46.jpg",
];

const DEFAULT_CLIENTS = ["Eclipse Fest", "NovaSummit", "Noir Events", "Vega Brand", "SoundWave", "CineMuse", "PulseXR", "AuraGala", "GridFest", "NightArch"];

// ─── COUNTER ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true });
   const [val, setVal] = useState(0);
   useEffect(() => {
      if (!inView) return;
      let start = null;
      const animate = (ts) => {
         if (!start) start = ts;
         const p = Math.min((ts - start) / 1800, 1);
         setVal(Math.floor(p * to));
         if (p < 1) requestAnimationFrame(animate);
         else setVal(to);
      };
      requestAnimationFrame(animate);
   }, [inView, to]);
   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee({ items, reverse = false, speed = 30 }) {
   return (
      <div className="overflow-hidden py-3 border-y" style={{ background: C.surface, borderColor: C.border }}>
         <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="text-xs font-bold uppercase tracking-[0.3em] shrink-0"
                  style={{ color: i % 3 === 0 ? C.red : i % 3 === 1 ? C.white : C.dim }}>
                  {item}
                  <span className="mx-4" style={{ color: C.dim }}>◆</span>
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── HORIZONTAL CAROUSEL ──────────────────────────────────────────────────────
function HorizCarousel({ children, gap = 20 }) {
   const ref = useRef(null);
   const [canScrollLeft, setCanScrollLeft] = useState(false);
   const [canScrollRight, setCanScrollRight] = useState(true);

   const check = () => {
      const el = ref.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
   };

   const scroll = (dir) => {
      ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
   };

   return (
      <div className="relative group/carousel">
         <div
            ref={ref}
            onScroll={check}
            className="flex overflow-x-auto scrollbar-hide pb-4"
            style={{ gap, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
         >
            {children}
         </div>
         {/* Arrows */}
         <AnimatePresence>
            {canScrollLeft && (
               <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => scroll(-1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white hidden sm:flex"
                  style={{ background: "rgba(20,20,30,0.9)", border: `1px solid ${C.border}`, backdropFilter: "blur(12px)" }}>
                  ‹
               </motion.button>
            )}
         </AnimatePresence>
         <AnimatePresence>
            {canScrollRight && (
               <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => scroll(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white hidden sm:flex"
                  style={{ background: "rgba(20,20,30,0.9)", border: `1px solid ${C.border}`, backdropFilter: "blur(12px)" }}>
                  ›
               </motion.button>
            )}
         </AnimatePresence>
         {/* Fade edges */}
         <div className="absolute left-0 top-0 bottom-4 w-8 pointer-events-none hidden sm:block" style={{ background: `linear-gradient(to right, ${C.bg}, transparent)` }} />
         <div className="absolute right-0 top-0 bottom-4 w-8 pointer-events-none hidden sm:block" style={{ background: `linear-gradient(to left, ${C.bg}, transparent)` }} />
      </div>
   );
}

// ─── SERVICE CARD (Netflix-style) ─────────────────────────────────────────────
function ServiceCard({ svc, i }) {
   const [hovered, setHovered] = useState(false);
   return (
      <motion.div
         {...fromBottom(i * 0.07)}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         className="relative rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
         style={{
            width: "clamp(200px, 22vw, 280px)",
            scrollSnapAlign: "start",
            border: `1px solid ${hovered ? C.red : "transparent"}`,
            transition: "border-color 0.3s",
            boxShadow: hovered ? `0 0 40px ${C.redGlow}` : "none",
         }}
         whileHover={{ scale: 1.04, zIndex: 10 }}
         transition={{ duration: 0.25 }}
      >
         <div className="relative" style={{ aspectRatio: "2/3" }}>
            <img src={svc.img} alt={svc.name} className="w-full h-full object-cover"
               style={{ filter: hovered ? "none" : "saturate(0.7) brightness(0.85)", transition: "filter 0.4s" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.4) 55%, transparent 100%)" }} />
            {/* Tag badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest"
               style={{ background: C.red, color: C.white }}>{svc.tag}</div>
            {/* Rating */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
               <span style={{ color: C.amber }} className="text-xs">★</span>
               <span className="text-xs font-bold" style={{ color: C.white }}>{svc.rating}</span>
            </div>
            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
               <h3 className="text-sm font-black uppercase tracking-tight mb-1" style={{ color: C.white }}>{svc.name}</h3>
               <div className="text-[10px] mb-2" style={{ color: C.muted }}>{svc.year} · {svc.dur}</div>
               <AnimatePresence>
                  {hovered && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}>
                        <p className="text-[11px] leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>{svc.desc}</p>
                        <div className="text-[10px]" style={{ color: C.muted }}>{svc.genre}</div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                           className="mt-2 px-3 py-1.5 rounded text-[11px] font-black flex items-center gap-1.5"
                           style={{ background: C.white, color: C.bg }}>
                           ▶ Learn More
                        </motion.button>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </motion.div>
   );
}

// ─── FEATURED PROJECT CARD ────────────────────────────────────────────────────
function FeaturedCard({ project, isActive, onClick }) {
   return (
      <motion.div
         onClick={onClick}
         className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
         style={{
            width: isActive ? "clamp(260px, 36vw, 420px)" : "clamp(120px, 16vw, 200px)",
            transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
            scrollSnapAlign: "start",
            border: `1px solid ${isActive ? C.red : C.border}`,
            boxShadow: isActive ? `0 0 60px ${C.redGlow}` : "none",
         }}
      >
         <div style={{ height: "clamp(200px, 30vw, 360px)" }}>
            <img src={project.img} alt={project.title}
               className="w-full h-full object-cover"
               style={{ filter: isActive ? "none" : "saturate(0.3) brightness(0.5)", transition: "filter 0.5s" }} />
            <div className="absolute inset-0" style={{ background: isActive ? "linear-gradient(to top, rgba(8,8,16,0.96) 0%, rgba(8,8,16,0.3) 60%, transparent 100%)" : "rgba(8,8,16,0.7)" }} />
            <AnimatePresence>
               {isActive && (
                  <motion.div initial={{ opacity: 0, y: 20, x: -20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0 }}
                     transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                     className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                     <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest mb-2"
                        style={{ background: C.red, color: C.white }}>{project.tag}</span>
                     <h3 className="text-lg sm:text-2xl font-black tracking-tight mb-1" style={{ color: C.white }}>{project.title}</h3>
                     <div className="flex items-center gap-3 text-[11px] mb-2" style={{ color: C.muted }}>
                        <span style={{ color: C.amber }}>★ {project.rating}</span>
                        <span>{project.year}</span>
                        <span>{project.dur}</span>
                     </div>
                     <div className="text-[10px] mb-2" style={{ color: C.muted }}>{project.genre}</div>
                     <p className="text-xs leading-relaxed hidden sm:block" style={{ color: "rgba(255,255,255,0.6)" }}>{project.desc}</p>
                     <div className="flex gap-2 mt-3">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                           className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black"
                           style={{ background: C.white, color: C.bg }}>
                           ▶ View Case
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                           className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border"
                           style={{ background: "rgba(255,255,255,0.08)", borderColor: C.border, color: C.white }}>
                           +
                        </motion.button>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
            {!isActive && (
               <div className="absolute bottom-3 left-2 right-2 text-[10px] font-bold truncate text-center" style={{ color: C.muted }}>{project.title}</div>
            )}
         </div>
      </motion.div>
   );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ color = C.red, children }) {
   return (
      <motion.span {...fromLeft(0)}
         className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3"
         style={{ background: `${color}15`, color, border: `1px solid ${color}35` }}>
         {children}
      </motion.span>
   );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function EventTemplate7({ data }) {
   const d = { ...DEFAULT_DATA, ...data };

   const services = d.services?.length && d.services.some(s => s.name) ? d.services : SERVICES;
   const projects = d.projects?.length && d.projects.some(p => p.name) ? d.projects.map((p, i) => ({ ...FEATURED[i % FEATURED.length], title: p.name, desc: p.desc })) : FEATURED;
   const CLIENTS = d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name) ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;
   const PROCESS = d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step) ? d.eventPlanningProcess.map((p, i) => ({ ...DEFAULT_PROCESS[i % DEFAULT_PROCESS.length], title: p.step, desc: p.desc })) : DEFAULT_PROCESS;
   const TESTIMONIALS = d.testimonials?.length > 0 && d.testimonials.some(t => t.review) ? d.testimonials.map((t, i) => ({ name: t.clientName, role: t.event, text: t.review, avatar: t.clientName?.[0] || "T", color: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].color })) : DEFAULT_TESTIMONIALS;
   const TEAM = d.team?.length > 0 && d.team.some(t => t.name) ? d.team.map((t, i) => ({ ...DEFAULT_TEAM[i % DEFAULT_TEAM.length], name: t.name, role: t.role })) : DEFAULT_TEAM;
   const PRICING = d.pricing?.length > 0 && d.pricing.some(p => p.planName) ? d.pricing.map((p, i) => ({ ...DEFAULT_PRICING[i % DEFAULT_PRICING.length], name: p.planName, price: p.price, features: p.features ? p.features.split(",").map(f => f.trim()) : [] })) : DEFAULT_PRICING;
   const FAQS = d.faqs?.length > 0 && d.faqs.some(f => f.question) ? d.faqs.map(f => ({ q: f.question, a: f.answer })) : DEFAULT_FAQS;
   const GALLERY = d.gallery?.length > 0 && d.gallery.some(g => g.image) ? d.gallery.map(g => g.image) : DEFAULT_GALLERY;

   const [activeProject, setActiveProject] = useState(0);
   const [activeTestimonial, setActiveTestimonial] = useState(0);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);
   const [menuOpen, setMenuOpen] = useState(false);

   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

   useEffect(() => {
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500);
      return () => clearInterval(t);
   }, []);

   useEffect(() => {
      const handleKey = (e) => { if (e.key === "Escape") setLightbox(null); };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
   }, []);

   return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: C.bg, color: C.white, overflowX: "hidden" }}>
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,600;0,700;1,700&family=Bebas+Neue&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        * { box-sizing: border-box; }
        .bebas { font-family: 'Bebas Neue', sans-serif; }
      `}</style>

         {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50"
            style={{ background: "linear-gradient(to bottom, rgba(8,8,16,0.98), rgba(8,8,16,0))" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
               {/* Logo */}
               <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded flex items-center justify-center font-black text-sm"
                     style={{ background: C.red }}>{d.agencyName[0]}</div>
                  <span className="bebas tracking-widest" style={{ color: C.white, fontSize: d.agencyNameFontSize ? `${d.agencyNameFontSize}px` : '1.5rem' }}>{d.agencyName}</span>
               </motion.div>

               {/* Desktop Nav */}
               <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold" style={{ color: C.muted }}>
                  {["For You", "Services", "Work", "Pricing", "Contact"].map((item, i) => (
                     <motion.a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.3 }}
                        className="hover:text-white transition-colors"
                        style={{ borderBottom: item === "Services" ? `2px solid ${C.red}` : "none", paddingBottom: 2 }}>
                        {item}
                     </motion.a>
                  ))}
               </nav>

               <div className="hidden lg:flex items-center gap-3">
                  <motion.a href="#contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.5 }}
                     whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                     className="px-5 py-2.5 rounded font-bold text-sm"
                     style={{ background: C.red, color: C.white }}>
                     Book Now
                  </motion.a>
               </div>

               {/* Mobile hamburger */}
               <button className="lg:hidden p-2 rounded" style={{ background: "rgba(255,255,255,0.06)" }}
                  onClick={() => setMenuOpen(!menuOpen)}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
               </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
               {menuOpen && (
                  <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                     className="lg:hidden mx-4 mb-3 p-5 rounded-xl flex flex-col gap-3"
                     style={{ background: C.card, border: `1px solid ${C.border}` }}>
                     {["For You", "Services", "Work", "Pricing", "Contact"].map((item, i) => (
                        <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
                           onClick={() => setMenuOpen(false)}
                           className="text-sm font-semibold py-1" style={{ color: C.white }}>{item}</a>
                     ))}
                     <a href="#contact" onClick={() => setMenuOpen(false)}
                        className="w-full text-center py-3 rounded text-sm font-bold mt-1"
                        style={{ background: C.red, color: C.white }}>Book Now</a>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.header>

         {/* ── HERO ────────────────────────────────────────────────────────────── */}
         <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
            {/* Background image */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
               <img src={d.heroImage} alt="Hero" className="w-full h-full object-cover" />
               <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,16,1) 0%, rgba(8,8,16,0.6) 50%, rgba(8,8,16,0.3) 100%)" }} />
               <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,8,16,0.8) 0%, transparent 60%)" }} />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
               {/* Trending badge */}
               <motion.div {...fromLeft(0.3)} className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: C.white }}>Now Booking · 2025–26 Season</span>
               </motion.div>

               {/* Title */}
               <motion.h1
                  className="bebas leading-[0.92] mb-5 sm:mb-8 max-w-4xl"
                  style={{ fontSize: d.heroTitleFontSize ? `${d.heroTitleFontSize}px` : 'clamp(3rem,10vw,8rem)' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {d.heroTitle.split(" ").map((w, i) => (
                     <motion.span key={i} className="inline-block mr-3 sm:mr-4"
                        initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        style={{ color: i % 4 === 2 ? C.red : C.white }}>
                        {w}
                     </motion.span>
                  ))}
               </motion.h1>

               <motion.p {...fromLeft(0.7)} className="max-w-xl mb-6 sm:mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: d.taglineFontSize ? `${d.taglineFontSize}px` : '1rem' }}>
                  {d.tagline}
               </motion.p>

               <motion.div {...fromLeft(0.85)} className="flex flex-wrap gap-3 mb-10 sm:mb-14">
                  <motion.a href="#contact" whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}
                     className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold"
                     style={{ background: C.red, color: C.white, boxShadow: `0 0 30px ${C.redGlow}` }}>
                     ▶ Book an Event
                  </motion.a>
                  <motion.a href="#work" whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}
                     className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold border"
                     style={{ background: "rgba(255,255,255,0.08)", color: C.white, borderColor: C.border, backdropFilter: "blur(8px)" }}>
                     + View Our Work
                  </motion.a>
               </motion.div>

               {/* Stats */}
               <motion.div {...fromLeft(1.0)} className="flex flex-wrap gap-8 sm:gap-14">
                  {[{ v: 500, s: "+", l: "Events" }, { v: 99, s: "%", l: "Satisfaction" }, { v: 8, s: "Y", l: "Experience" }].map((stat, i) => (
                     <div key={i}>
                        <div className="bebas text-3xl sm:text-4xl" style={{ color: [C.red, C.amber, C.cyan][i] }}>
                           <Counter to={stat.v} suffix={stat.s} />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] mt-0.5" style={{ color: C.muted }}>{stat.l}</div>
                     </div>
                  ))}
               </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-5 right-6 flex flex-col items-center gap-1" style={{ color: C.muted }}>
               <div className="w-0.5 h-8" style={{ background: `linear-gradient(to bottom, ${C.red}, transparent)` }} />
               <span className="text-[9px] uppercase tracking-widest">Scroll</span>
            </motion.div>
         </section>

         {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
         <Marquee items={CLIENTS} speed={28} />

         {/* ── FOR YOU — Services Carousel ─────────────────────────────────────── */}
         <section id="for-you" className="py-12 sm:py-20 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-7xl mx-auto">
               <motion.div {...fromLeft(0)} className="flex items-end justify-between mb-6">
                  <div>
                     <SectionLabel color={C.red}>For You 🎬</SectionLabel>
                     <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none" style={{ color: C.white }}>
                        What We <span style={{ color: C.red }}>Produce</span>
                     </motion.h2>
                  </div>
                  <motion.a {...fromRight(0)} href="#services" className="text-xs font-bold uppercase tracking-widest hidden sm:block hover:text-white transition-colors" style={{ color: C.muted }}>
                     See All →
                  </motion.a>
               </motion.div>

               <HorizCarousel gap={16}>
                  {services.map((svc, i) => <ServiceCard key={i} svc={svc} i={i} />)}
               </HorizCarousel>
            </div>
         </section>

         {/* ── FEATURED WORK ───────────────────────────────────────────────────── */}
         <section id="work" className="py-12 sm:py-20 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <motion.div {...fromLeft(0)} className="mb-6">
                  <SectionLabel color={C.cyan}>Past Glory 🏆</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     Events That <span style={{ color: C.cyan }}>Broke the Internet</span>
                  </motion.h2>
               </motion.div>

               {/* Carousel of expanding cards */}
               <HorizCarousel gap={12}>
                  {projects.map((p, i) => (
                     <FeaturedCard key={i} project={p} isActive={i === activeProject} onClick={() => setActiveProject(i)} />
                  ))}
               </HorizCarousel>

               {/* Dots */}
               <div className="flex gap-2 mt-5">
                  {projects.map((_, i) => (
                     <button key={i} onClick={() => setActiveProject(i)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: i === activeProject ? 28 : 8, background: i === activeProject ? C.red : C.dim }} />
                  ))}
               </div>
            </div>
         </section>

         <Marquee items={["Legendary", "Cinematic", "Immersive", "Electric", "Premium", "Epic"]} reverse speed={20} />

         {/* ── ABOUT ───────────────────────────────────────────────────────────── */}
         <section id="about" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.bg }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] opacity-10" style={{ background: C.red }} />
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
               {/* Image */}
               <motion.div {...fromLeft(0)} className="relative mx-auto w-full max-w-sm lg:max-w-none">
                  <div className="relative rounded-2xl overflow-hidden border"
                     style={{ aspectRatio: "3/4", borderColor: `${C.red}35`, boxShadow: `0 0 80px ${C.redGlow}` }}>
                     <img src={d.aboutImage} alt="About" className="w-full h-full object-cover" />
                     <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 60%)" }} />
                  </div>
                  {/* Floating badge */}
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                     className="absolute -right-4 top-1/4 p-4 sm:p-5 rounded-2xl border"
                     style={{ background: C.card, borderColor: `${C.red}50`, boxShadow: `0 0 30px ${C.redGlow}` }}>
                     <div className="bebas text-3xl sm:text-4xl" style={{ color: C.red }}><Counter to={8} suffix="+" /></div>
                     <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>Years</div>
                  </motion.div>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                     className="absolute -left-4 bottom-20 p-3 sm:p-4 rounded-xl border"
                     style={{ background: C.card, borderColor: `${C.cyan}40` }}>
                     <div className="bebas text-2xl sm:text-3xl" style={{ color: C.cyan }}><Counter to={500} suffix="+" /></div>
                     <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>Events</div>
                  </motion.div>
               </motion.div>

               {/* Copy */}
               <div>
                  <SectionLabel color={C.red}>Our Story 🎥</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas leading-tight mb-5" style={{ fontSize: d.aboutUsTitleFontSize ? `${d.aboutUsTitleFontSize}px` : 'clamp(2.5rem,5vw,5rem)' }}>
                     {d.aboutUsTitle}
                  </motion.h2>
                  <motion.p {...fromLeft(0.2)} className="leading-relaxed mb-8" style={{ color: C.muted, fontSize: d.bioFontSize ? `${d.bioFontSize}px` : '1rem' }}>
                     {d.bio}
                  </motion.p>
                  <motion.div {...fromLeft(0.3)} className="flex flex-wrap gap-2 mb-8">
                     {["Cinematic", "Precise", "Immersive", "Premium"].map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                           style={{ background: `${[C.red, C.cyan, C.amber, C.red][i]}12`, color: [C.red, C.cyan, C.amber, C.red][i], border: `1px solid ${[C.red, C.cyan, C.amber, C.red][i]}35` }}>
                           {tag}
                        </span>
                     ))}
                  </motion.div>
                  <motion.a {...fromLeft(0.4)} href="#contact"
                     whileHover={{ scale: 1.04, x: 6 }} whileTap={{ scale: 0.97 }}
                     className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-sm"
                     style={{ background: C.red, color: C.white, boxShadow: `0 0 30px ${C.redGlow}` }}>
                     ▶ Let's Create Together
                  </motion.a>
               </div>
            </div>
         </section>

         {/* ── GENRES / CATEGORIES ─────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <motion.div {...fromLeft(0)} className="mb-8">
                  <SectionLabel color={C.amber}>Genres 🎭</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     Every Occasion, <span style={{ color: C.amber }}>Every Scale</span>
                  </motion.h2>
               </motion.div>

               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {GENRES.map((g, i) => (
                     <motion.div key={i} {...fromLeft(i * 0.06)}
                        whileHover={{ scale: 1.04, x: 4 }}
                        className="relative p-4 sm:p-6 rounded-xl cursor-pointer overflow-hidden border group"
                        style={{ background: `linear-gradient(135deg, ${g.from}18, ${g.to}12)`, borderColor: `${g.from}30` }}>
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{g.emoji}</div>
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: C.white }}>{g.label}</div>
                        <div className="absolute -bottom-6 -right-6 w-16 sm:w-20 h-16 sm:h-20 rounded-full opacity-15 group-hover:scale-150 transition-transform duration-500"
                           style={{ background: g.from }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PROCESS ─────────────────────────────────────────────────────────── */}
         <section id="process" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.bg }}>
            <div className="absolute -top-20 right-0 w-80 h-80 rounded-full blur-[130px] opacity-10" style={{ background: C.cyan }} />
            <div className="max-w-5xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionLabel color={C.cyan}>How We Work 🗺</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     The LUMIS <span style={{ color: C.cyan }}>Process</span>
                  </motion.h2>
               </div>

               <div className="relative">
                  <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px hidden xs:block"
                     style={{ background: `linear-gradient(to bottom, ${C.red}, ${C.cyan}, ${C.amber}, ${C.red})` }} />
                  <div className="space-y-5 xs:pl-14 sm:pl-16">
                     {PROCESS.map((step, i) => (
                        <motion.div key={i} {...fromLeft(i * 0.1)}
                           whileHover={{ x: 8, borderColor: `${step.color}60` }}
                           className="relative flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl border"
                           style={{ background: C.card, borderColor: `${step.color}25`, transition: "border-color 0.3s, transform 0.3s" }}>
                           <div className="hidden xs:flex absolute -left-[48px] sm:-left-[52px] top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full items-center justify-center text-xs font-black z-10"
                              style={{ background: step.color, color: C.bg }}>{step.step}</div>
                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border"
                              style={{ background: `${step.color}12`, borderColor: `${step.color}30` }}>{step.icon}</div>
                           <div>
                              <span className="text-[9px] font-black uppercase tracking-widest xs:hidden" style={{ color: step.color }}>Step {step.step}</span>
                              <h3 className="text-sm sm:text-base font-black uppercase mb-1" style={{ color: step.color }}>{step.title}</h3>
                              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── STATS ───────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 px-4 sm:px-6 relative" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12">
                  <SectionLabel color={C.red}>Numbers 📊</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     Why <span style={{ color: C.red }}>LUMIS</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                     { v: 500, s: "+", l: "Events Produced", icon: "🎬" },
                     { v: 99, s: "%", l: "Client Satisfaction", icon: "⭐" },
                     { v: 800, s: "+", l: "Five-Star Reviews", icon: "💎" },
                     { v: 25, s: "+", l: "Cities Worldwide", icon: "🌍" },
                  ].map((stat, i) => (
                     <motion.div key={i} {...fromLeft(i * 0.1)}
                        whileHover={{ y: -6, x: 4, scale: 1.03 }}
                        className="p-5 sm:p-7 rounded-xl text-center border"
                        style={{ background: C.card, borderColor: `${[C.red, C.amber, C.cyan, C.red][i]}25` }}>
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <div className="bebas text-4xl sm:text-5xl mb-1" style={{ color: [C.red, C.amber, C.cyan, C.red][i] }}>
                           <Counter to={stat.v} suffix={stat.s} />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>{stat.l}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ─────────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-16 sm:py-28 px-4 sm:px-6 relative" style={{ background: C.bg }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[140px] opacity-10" style={{ background: C.red }} />
            <div className="max-w-5xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionLabel color={C.amber}>Packages 🎁</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     Pick Your <span style={{ color: C.amber }}>Production</span>
                  </motion.h2>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i} {...fromLeft(i * 0.12)}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="rounded-2xl overflow-hidden border relative"
                        style={{
                           background: pkg.popular ? `linear-gradient(135deg, ${C.red}22, ${C.card})` : C.card,
                           borderColor: pkg.popular ? C.red : `${pkg.color}30`,
                           boxShadow: pkg.popular ? `0 0 60px ${C.redGlow}` : "none",
                        }}>
                        {pkg.popular && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${C.red}, ${C.amber})` }} />}
                        <div className="p-5 sm:p-7">
                           {pkg.popular && (
                              <div className="inline-block px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-3 border"
                                 style={{ background: `${C.red}15`, color: C.red, borderColor: `${C.red}50` }}>
                                 ★ Most Popular
                              </div>
                           )}
                           <div className="text-3xl mb-2">{["🎞", "🎬", "🎥"][i]}</div>
                           <h3 className="bebas text-3xl mb-1" style={{ color: pkg.popular ? C.red : pkg.color }}>{pkg.name}</h3>
                           <p className="text-xs mb-4" style={{ color: C.muted }}>{pkg.desc}</p>
                           <div className="bebas text-4xl sm:text-5xl mb-6" style={{ color: pkg.popular ? C.white : pkg.color }}>
                              {pkg.price}
                              {pkg.price !== "Custom" && <span className="text-sm font-normal opacity-40 ml-1">onwards</span>}
                           </div>
                           <ul className="space-y-3 mb-6">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex items-center gap-2.5 text-xs">
                                    <span className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[9px] border"
                                       style={{ background: `${pkg.color}15`, borderColor: `${pkg.color}50`, color: pkg.color }}>✓</span>
                                    <span style={{ color: C.muted }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
                              className="w-full py-3 rounded font-bold text-sm"
                              style={pkg.popular
                                 ? { background: C.red, color: C.white }
                                 : { background: `${pkg.color}12`, color: pkg.color, border: `1px solid ${pkg.color}50` }}>
                              Get Started →
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.surface }}>
            <div className="max-w-3xl mx-auto relative z-10">
               <div className="text-center mb-12">
                  <SectionLabel color={C.cyan}>Reviews 💬</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     The Crowd <span style={{ color: C.cyan }}>Has Spoken</span>
                  </motion.h2>
               </div>

               {(() => {
                  const currentTestimonial = TESTIMONIALS[activeTestimonial] || TESTIMONIALS[0];
                  return (
                     <AnimatePresence mode="wait">
                        <motion.div key={activeTestimonial}
                     initial={{ opacity: 0, x: -60, scale: 0.96 }}
                     animate={{ opacity: 1, x: 0, scale: 1 }}
                     exit={{ opacity: 0, x: 60, scale: 0.96 }}
                     transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                     className="p-6 sm:p-10 rounded-2xl text-center border relative overflow-hidden"
                     style={{ background: C.card, borderColor: `${currentTestimonial.color}40` }}>
                     <div className="text-6xl sm:text-8xl font-black absolute top-2 left-5 leading-none opacity-8 italic"
                        style={{ color: currentTestimonial.color }}>"</div>
                     <div className="text-3xl mb-4">💬</div>
                     <p className="text-base sm:text-xl font-semibold leading-relaxed mb-7 relative z-10" style={{ color: C.white }}>
                        "{currentTestimonial.text}"
                     </p>
                     <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-sm"
                           style={{ background: currentTestimonial.color, color: C.bg }}>
                           {currentTestimonial.avatar}
                        </div>
                        <div className="text-left">
                           <div className="font-bold text-sm sm:text-base" style={{ color: C.white }}>{currentTestimonial.name}</div>
                           <div className="text-[10px] uppercase tracking-wider" style={{ color: C.muted }}>{currentTestimonial.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>
               );
               })()}

               <div className="flex justify-center gap-2 mt-6">
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: i === activeTestimonial ? 28 : 8, background: i === activeTestimonial ? C.red : C.dim }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ────────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-12">
                  <SectionLabel color={C.amber}>Our Crew 🤝</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     The <span style={{ color: C.amber }}>Directors</span>
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {TEAM.map((m, i) => (
                     <motion.div key={i} {...fromLeft(i * 0.1)}
                        whileHover={{ y: -8, x: 4 }}
                        className="rounded-2xl overflow-hidden border group cursor-pointer"
                        style={{ background: C.card, borderColor: `${m.color}25` }}>
                        <div className="flex items-center justify-center"
                           style={{ height: "clamp(100px, 18vw, 200px)", background: `linear-gradient(135deg, ${m.color}15, ${m.color}28)` }}>
                           <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black text-xl sm:text-3xl border-2"
                              style={{ background: m.color, borderColor: m.color, color: C.bg }}>{m.name[0]}</div>
                        </div>
                        <div className="p-3 sm:p-5">
                           <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest mb-1.5 border"
                              style={{ background: `${m.color}12`, color: m.color, borderColor: `${m.color}40` }}>{m.badge}</span>
                           <h4 className="font-black text-sm sm:text-base" style={{ color: C.white }}>{m.name}</h4>
                           <p className="text-[10px] sm:text-xs mt-0.5 uppercase tracking-wider" style={{ color: C.muted }}>{m.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ─────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: C.surface }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10">
                  <SectionLabel color={C.cyan}>Gallery 📸</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     Frames from <span style={{ color: C.cyan }}>Our Best Nights</span>
                  </motion.h2>
               </div>

               <HorizCarousel gap={12}>
                  {GALLERY.map((img, i) => (
                     <motion.div key={i} {...fromBottom(i * 0.06)}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setLightbox(img)}
                        className="relative rounded-xl overflow-hidden cursor-pointer flex-shrink-0 border border-transparent group"
                        style={{ width: "clamp(140px, 22vw, 260px)", scrollSnapAlign: "start" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = C.red}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                        <img src={img} alt={`Gallery ${i}`}
                           className="w-full object-cover transition-all duration-500 group-hover:scale-110"
                           style={{ height: "clamp(180px, 28vw, 340px)", filter: "saturate(0.75)", transition: "filter 0.4s, transform 0.5s" }}
                           onMouseEnter={e => e.style.filter = "saturate(1)"}
                           onMouseLeave={e => e.style.filter = "saturate(0.75)"} />
                        <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity text-2xl">🔍</div>
                        </div>
                     </motion.div>
                  ))}
               </HorizCarousel>
            </div>

            <AnimatePresence>
               {lightbox && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                     onClick={() => setLightbox(null)}>
                     <motion.img initial={{ scale: 0.8, x: -60 }} animate={{ scale: 1, x: 0 }} exit={{ scale: 0.8, x: 60 }}
                        src={lightbox} alt="Gallery" className="max-w-4xl w-full max-h-[85vh] object-contain rounded-2xl border"
                        style={{ borderColor: `${C.red}60`, boxShadow: `0 0 80px ${C.redGlow}` }} />
                     <button className="absolute top-5 right-5 text-white/60 hover:text-white text-3xl font-black w-10 h-10 flex items-center justify-center"
                        onClick={() => setLightbox(null)}>✕</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
         <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: C.bg }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-12">
                  <SectionLabel color={C.cyan}>FAQ 🎬</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2rem,5vw,4rem)] leading-none">
                     Got <span style={{ color: C.cyan }}>Questions?</span>
                  </motion.h2>
               </div>
               <div className="space-y-3">
                  {FAQS.map((faq, i) => (
                     <motion.div key={i} {...fromLeft(i * 0.08)}
                        className="rounded-xl overflow-hidden cursor-pointer border transition-colors duration-200"
                        style={{ background: C.card, borderColor: activeFaq === i ? C.red : C.border }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                        <div className="flex items-center justify-between p-4 sm:p-5 gap-3">
                           <h4 className="font-bold text-xs sm:text-sm" style={{ color: C.white }}>{faq.q}</h4>
                           <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-7 h-7 rounded flex-shrink-0 flex items-center justify-center font-black border"
                              style={{ background: activeFaq === i ? C.red : "transparent", borderColor: activeFaq === i ? C.red : C.dim, color: activeFaq === i ? C.white : C.dim }}>
                              +
                           </motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.3 }} className="overflow-hidden">
                                 <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm leading-relaxed border-t"
                                    style={{ color: C.muted, borderColor: `${C.red}20` }}>{faq.a}</div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
         <section id="contact" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.surface }}>
            <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-[130px] opacity-20" style={{ background: C.red }} />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[130px] opacity-10" style={{ background: C.cyan }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12">
                  <SectionLabel color={C.red}>Let's Talk 🎊</SectionLabel>
                  <motion.h2 {...fromLeft(0.1)} className="bebas text-[clamp(2.5rem,7vw,6rem)] leading-tight">
                     Ready to <span style={{ color: C.red }}>Direct</span><br />Your Next Event?
                  </motion.h2>
               </div>

               <div className="max-w-2xl mx-auto">
                  {/* Info */}
                  <div className="space-y-4">
                     {[
                        { icon: "✉️", label: "Email", val: d.contactEmail, color: C.red },
                        { icon: "📞", label: "Phone", val: d.phone, color: C.cyan },
                        { icon: "📍", label: "Studio", val: d.address, color: C.amber },
                     ].map((item, i) => (
                        <motion.div key={i} {...fromLeft(i * 0.1)}
                           whileHover={{ x: 8 }}
                           className="flex gap-4 p-4 sm:p-5 rounded-xl border"
                           style={{ background: C.card, borderColor: `${item.color}25` }}>
                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border"
                              style={{ background: `${item.color}12`, borderColor: `${item.color}35` }}>{item.icon}</div>
                           <div>
                              <div className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: item.color }}>{item.label}</div>
                              <div className="font-semibold text-xs sm:text-sm break-all" style={{ color: C.white }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}

                     <motion.div {...fromLeft(0.35)} className="p-5 rounded-xl text-center border"
                        style={{ background: C.card, borderColor: `${C.red}40`, boxShadow: `0 0 30px ${C.redGlow}` }}>
                        <div className="font-black text-sm sm:text-base italic uppercase mb-1" style={{ color: C.red }}>500+ Epic Events Delivered</div>
                        <div className="text-xs" style={{ color: C.muted }}>Join our roster of legendary clients</div>
                     </motion.div>
                  </div>

                  
               </div>
            </div>
         </section>

         {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-14 pb-6 border-t" style={{ background: C.bg, borderColor: C.border }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-10 border-b" style={{ borderColor: C.border }}>
                  <motion.div {...fromLeft(0)} className="max-w-xs">
                     <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded flex items-center justify-center font-black text-sm" style={{ background: C.red }}>L</div>
                        <span className="bebas text-2xl tracking-widest">{d.agencyName}</span>
                     </div>
                     <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.muted }}>{d.footerDescription || d.tagline}</p>
                     <div className="flex gap-2 mt-4">
                        {[
                           { label: "in", url: d.linkedIn },
                           { label: "tw", url: d.twitter },
                           { label: "fb", url: d.facebook },
                           { label: "ig", url: d.instagram },
                        ].map(s => s.url ? (
                           <a key={s.label} href={s.url.startsWith('http') ? s.url : `https://${s.url}`} target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 rounded flex items-center justify-center text-[9px] font-black uppercase border hover:border-red-500 transition-colors"
                              style={{ background: "rgba(255,255,255,0.04)", borderColor: C.border, color: C.muted }}>{s.label}</a>
                        ) : null)}
                        {!d.linkedIn && !d.twitter && !d.facebook && !d.instagram && ["in", "tw", "fb", "ig"].map(s => (
                           <a key={s} href="#"
                              className="w-8 h-8 rounded flex items-center justify-center text-[9px] font-black uppercase border hover:border-red-500 transition-colors"
                              style={{ background: "rgba(255,255,255,0.04)", borderColor: C.border, color: C.muted }}>{s}</a>
                        ))}
                     </div>
                  </motion.div>

                  <motion.div {...fromRight(0)} className="grid grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
                     {[
                        { title: "Services", links: ["Festivals", "Tech Expos", "Nightlife", "Corporate"] },
                        { title: "Company", links: ["About Us", "Work", "Crew", "Blog"] },
                        { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
                     ].map(col => (
                        <div key={col.title}>
                           <h5 className="text-[9px] font-black uppercase tracking-widest mb-3" style={{ color: C.red }}>{col.title}</h5>
                           <ul className="space-y-2">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#" className="text-[10px] sm:text-xs hover:text-white transition-colors uppercase tracking-wide" style={{ color: C.muted }}>{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </motion.div>
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6">
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: C.dim }}>{d.footerCopyright}</p>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider" style={{ color: C.dim }}>
                     <span>Made for</span>
                     <span style={{ color: C.red }}>every unforgettable night</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}