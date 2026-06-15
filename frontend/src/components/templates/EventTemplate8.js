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
   bg: "#07050F",
   surface: "#0E0A1C",
   glass: "rgba(255,255,255,0.04)",
   glassBorder: "rgba(255,255,255,0.08)",
   aurora1: "#7B2FBE",
   aurora2: "#00C8FF",
   aurora3: "#FF3CAC",
   aurora4: "#39FFC2",
   auroraMid: "#4A7CFF",
   white: "#FFFFFF",
   muted: "#8B87A8",
   dim: "#3E3A55",
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "LUMINA EVENTS",
   tagline: "Where Light Meets Imagination",
   heroTitle: "Crafting Unforgettable Experiences",
   bio: "LUMINA is a next-generation event production studio. We blend cutting-edge technology with artistic vision to create immersive festivals, tech summits, and luxury experiences that transcend reality.",
   aboutUsTitle: "Who We Are",
   contactEmail: "hello@luminaevents.com",
   phone: "+91 99999 88888",
   address: "Bandra Kurla Complex, Mumbai 400051",
   footerCopyright: `© ${new Date().getFullYear()} LUMINA Events.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const DEFAULT_SERVICES = [
   { name: "Music Festivals", desc: "Mind-blowing stage designs and AV setups that rattle bones and lift souls.", icon: "🎵", from: "#7B2FBE", to: "#00C8FF", img: "/images/templates/template-img-36.jpg" },
   { name: "Tech Conferences", desc: "Immersive expos and networking zones that buzz with energy and spark ideas.", icon: "💻", from: "#00C8FF", to: "#39FFC2", img: "/images/templates/template-img-37.jpg" },
   { name: "Nightlife & Clubs", desc: "Curating the best DJs and atmospheric experiences for unforgettable nights.", icon: "🎧", from: "#FF3CAC", to: "#7B2FBE", img: "/images/templates/template-img-41.jpg" },
   { name: "Corporate Events", desc: "High-impact brand events that leave audiences electrified and inspired.", icon: "💼", from: "#4A7CFF", to: "#FF3CAC", img: "/images/templates/template-img-44.jpg" },
   { name: "Product Launches", desc: "Cinematic reveal experiences that make your product impossible to ignore.", icon: "🚀", from: "#39FFC2", to: "#4A7CFF", img: "/images/templates/template-img-45.jpg" },
   { name: "Immersive XR", desc: "Multi-sensory universes built with XR, projection mapping, and spatial audio.", icon: "🌐", from: "#FF3CAC", to: "#39FFC2", img: "/images/templates/template-img-46.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Aurora Nights '24", desc: "A techno festival hosting 15,000 attendees across 5 stages.", tag: "Festival", from: "#7B2FBE", to: "#00C8FF", img: "/images/templates/template-img-44.jpg", stat: "15K", emoji: "🎵" },
   { name: "Horizon Summit", desc: "Global AI expo with holographic displays and 8K projection domes.", tag: "Tech Expo", from: "#00C8FF", to: "#39FFC2", img: "/images/templates/template-img-45.jpg", stat: "5K", emoji: "💻" },
   { name: "Prism Underground", desc: "Exclusive warehouse party that broke the internet overnight.", tag: "Nightlife", from: "#FF3CAC", to: "#7B2FBE", img: "/images/templates/template-img-46.jpg", stat: "3K", emoji: "🎧" },
   { name: "Nebula Gala", desc: "Black-tie corporate event fused with immersive tech art installations.", tag: "Corporate", from: "#4A7CFF", to: "#FF3CAC", img: "/images/templates/template-img-47.jpg", stat: "1.5K", emoji: "💎" },
];

const DEFAULT_CATEGORIES = [
   { label: "Music Festivals", emoji: "🎵", from: "#7B2FBE", to: "#00C8FF" },
   { label: "Tech Expos", emoji: "💻", from: "#00C8FF", to: "#39FFC2" },
   { label: "Nightlife", emoji: "🎧", from: "#FF3CAC", to: "#7B2FBE" },
   { label: "Corporate", emoji: "💼", from: "#4A7CFF", to: "#FF3CAC" },
   { label: "Product Launches", emoji: "🚀", from: "#39FFC2", to: "#4A7CFF" },
   { label: "Immersive XR", emoji: "🌐", from: "#FF3CAC", to: "#39FFC2" },
   { label: "Brand Events", emoji: "⚡", from: "#FFD93D", to: "#FF3CAC" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Discovery", desc: "We decode your vision, energy, and audience to design the perfect experience.", icon: "📡", from: "#7B2FBE", to: "#00C8FF" },
   { step: "02", title: "Blueprint", desc: "Full production brief with stage schematics, light maps, and AV architecture.", icon: "⚡", from: "#00C8FF", to: "#39FFC2" },
   { step: "03", title: "Build", desc: "Our crew assembles every rig, LED wall, and sound system with precision.", icon: "🏗", from: "#FF3CAC", to: "#7B2FBE" },
   { step: "04", title: "Showtime", desc: "Flawless on-site execution — so you can be in the crowd, not backstage.", icon: "🎬", from: "#4A7CFF", to: "#FF3CAC" },
   { step: "05", title: "Echo", desc: "Event highlights, content drops, and media packs within 48 hours.", icon: "📸", from: "#39FFC2", to: "#4A7CFF" },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Aryan Malhotra", role: "Founder, Aurora Nights", text: "LUMINA didn't just produce our festival — they redefined what's possible. 15,000 people lost their minds in the best way. Absolutely legendary execution.", avatar: "AM", from: "#7B2FBE", to: "#00C8FF" },
   { name: "Shreya Bose", role: "CEO, Horizon Summit", text: "Our conference felt like being inside a sci-fi film. The holographic displays had guests completely awestruck. LUMINA are true geniuses of their craft.", avatar: "SB", from: "#00C8FF", to: "#39FFC2" },
   { name: "Dev Rajan", role: "Brand Director, Prism", text: "Nothing touched what LUMINA delivered. It went viral within hours. They understand atmosphere and energy like nobody else in the industry.", avatar: "DR", from: "#FF3CAC", to: "#7B2FBE" },
];

const DEFAULT_TEAM = [
   { name: "Zara Khatri", role: "Creative Director", badge: "Vision", from: "#7B2FBE", to: "#00C8FF" },
   { name: "Kiran Shetty", role: "Stage Architect", badge: "Production", from: "#00C8FF", to: "#39FFC2" },
   { name: "Ravi Menon", role: "Lighting Designer", badge: "Atmosphere", from: "#FF3CAC", to: "#7B2FBE" },
   { name: "Preet Gill", role: "Sound Engineer", badge: "Audio", from: "#4A7CFF", to: "#FF3CAC" },
];

const DEFAULT_PRICING = [
   { name: "Spark", price: "₹1.2L", desc: "Perfect for intimate events up to 300 guests.", from: "#00C8FF", to: "#39FFC2", features: ["Up to 300 guests", "Basic stage design", "PA system & lighting", "Day-of coordination", "Event photography"] },
   { name: "Surge", price: "₹4.5L", desc: "Our signature production for mid-scale events.", from: "#7B2FBE", to: "#FF3CAC", popular: true, features: ["Up to 2,000 guests", "Full stage & LED walls", "Production team of 15", "Artist booking support", "Video highlights reel", "Social media content"] },
   { name: "Cosmos", price: "Custom", desc: "For legendary events that demand everything.", from: "#39FFC2", to: "#4A7CFF", features: ["Unlimited scale", "Bespoke stage universe", "Full crew deployment", "Global logistics", "PR & media support", "Year-long partnership"] },
];

const DEFAULT_FAQS = [
   { q: "Do you handle artist bookings?", a: "Yes, we have direct connections with top-tier international DJs, live acts, and performers across genres. We manage the full rider and logistics." },
   { q: "Can you build custom stages?", a: "Absolutely. Our set designers build 100% custom stages with immersive LED walls, pyrotechnics, and spatial audio rigs for any scale." },
   { q: "How early should I book?", a: "For major festivals, 6–12 months ahead is ideal. For club nights and smaller events, 4–8 weeks gives us enough runway to build something extraordinary." },
   { q: "Do you do destination events?", a: "Yes. We've produced events in Goa, Dubai, Bali, London, and beyond. Our travel production division handles full logistics end-to-end." },
   { q: "How is content delivered post-event?", a: "Within 48 hours you'll receive a curated photo pack, highlight reel, and a full social content drop ready to publish." },
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

const DEFAULT_CLIENTS = ["Aurora Nights", "Horizon Summit", "Prism", "Nebula Gala", "SoundWave", "NovaCorp", "PulseXR", "Luminate Co", "GridFest", "DarkMatter"];

// ─── AURORA MESH BACKGROUND ───────────────────────────────────────────────────
function AuroraMesh({ variant = "default" }) {
   const blobs = variant === "warm"
      ? [
         { color: "#FF3CAC", x: "10%", y: "20%", size: 500, opacity: 0.18 },
         { color: "#7B2FBE", x: "70%", y: "60%", size: 600, opacity: 0.15 },
         { color: "#4A7CFF", x: "40%", y: "80%", size: 400, opacity: 0.12 },
      ]
      : [
         { color: "#7B2FBE", x: "15%", y: "30%", size: 550, opacity: 0.2 },
         { color: "#00C8FF", x: "75%", y: "20%", size: 500, opacity: 0.15 },
         { color: "#39FFC2", x: "50%", y: "75%", size: 400, opacity: 0.1 },
      ];

   return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {blobs.map((b, i) => (
            <motion.div
               key={i}
               className="absolute rounded-full"
               style={{
                  left: b.x, top: b.y,
                  width: b.size, height: b.size,
                  background: b.color,
                  opacity: b.opacity,
                  filter: "blur(120px)",
                  transform: "translate(-50%, -50%)",
               }}
               animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
               transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            />
         ))}
      </div>
   );
}

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
function GlassCard({ children, style = {}, className = "", ...rest }) {
   return (
      <div
         className={className}
         style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            ...style,
         }}
         {...rest}
      >
         {children}
      </div>
   );
}

// ─── GRADIENT TEXT ────────────────────────────────────────────────────────────
function GradText({ from, to, children, style = {} }) {
   return (
      <span style={{ background: `linear-gradient(135deg, ${from}, ${to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...style }}>
         {children}
      </span>
   );
}

// ─── GRADIENT PILL ────────────────────────────────────────────────────────────
function GradPill({ from, to, children }) {
   return (
      <motion.span
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
         style={{ background: `linear-gradient(135deg, ${from}25, ${to}25)`, border: `1px solid ${from}50`, color: from }}
      >
         {children}
      </motion.span>
   );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true });
   const [val, setVal] = useState(0);
   useEffect(() => {
      if (!inView) return;
      let start = null;
      const animate = (ts) => {
         if (!start) start = ts;
         const p = Math.min((ts - start) / 2000, 1);
         setVal(Math.floor(p * to));
         if (p < 1) requestAnimationFrame(animate);
         else setVal(to);
      };
      requestAnimationFrame(animate);
   }, [inView, to]);
   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee({ items, reverse = false, speed = 25 }) {
   return (
      <div className="flex overflow-hidden whitespace-nowrap py-4 sm:py-5 border-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
         <motion.div
            className="flex items-center gap-6 sm:gap-10 shrink-0"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span
                  key={i}
                  className="text-xl sm:text-2xl md:text-4xl font-black uppercase italic tracking-tighter shrink-0"
                  style={i % 2 === 0
                     ? { background: `linear-gradient(135deg, ${C.aurora2}, ${C.aurora4})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                     : { color: "transparent", WebkitTextStroke: `1.5px ${C.aurora3}` }
                  }
               >
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────────
const slideInLeft = (i = 0) => ({
   initial: { opacity: 0, x: -70 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-60px" },
   transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const slideInRight = (i = 0) => ({
   initial: { opacity: 0, x: 70 },
   whileInView: { opacity: 1, x: 0 },
   viewport: { once: true, margin: "-60px" },
   transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

const fadeUp = (i = 0) => ({
   initial: { opacity: 0, y: 50, x: -15 },
   whileInView: { opacity: 1, y: 0, x: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
});

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EventTemplate8({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length && d.services.some(s => s.name) ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length && d.projects.some(p => p.name) ? d.projects : DEFAULT_PROJECTS;
   const CLIENTS = d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name) ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;
   const CATEGORIES = d.eventCategories?.length > 0 ? d.eventCategories.map((c, i) => ({ ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length], label: c.name })) : DEFAULT_CATEGORIES;
   const PROCESS = d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step) ? d.eventPlanningProcess.map((p, i) => ({ ...DEFAULT_PROCESS[i % DEFAULT_PROCESS.length], title: p.step, desc: p.desc })) : DEFAULT_PROCESS;
   const TESTIMONIALS = d.testimonials?.length > 0 && d.testimonials.some(t => t.review) ? d.testimonials.map((t, i) => ({ name: t.clientName, role: t.event, text: t.review, avatar: t.clientName?.[0] || "T", from: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].from, to: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].to })) : DEFAULT_TESTIMONIALS;
   const TEAM = d.team?.length > 0 && d.team.some(t => t.name) ? d.team.map((t, i) => ({ ...DEFAULT_TEAM[i % DEFAULT_TEAM.length], name: t.name, role: t.role })) : DEFAULT_TEAM;
   const PRICING = d.pricing?.length > 0 && d.pricing.some(p => p.planName) ? d.pricing.map((p, i) => ({ ...DEFAULT_PRICING[i % DEFAULT_PRICING.length], name: p.planName, price: p.price, features: p.features ? p.features.split(",").map(f => f.trim()) : [] })) : DEFAULT_PRICING;
   const FAQS = d.faqs?.length > 0 && d.faqs.some(f => f.question) ? d.faqs.map(f => ({ q: f.question, a: f.answer })) : DEFAULT_FAQS;
   const GALLERY = d.gallery?.length > 0 && d.gallery.some(g => g.image) ? d.gallery.map(g => g.image) : DEFAULT_GALLERY;

   const [activeSlide, setActiveSlide] = useState(0);
   const [activeTestimonial, setActiveTestimonial] = useState(0);
   const [activeFaq, setActiveFaq] = useState(null);
   const [lightbox, setLightbox] = useState(null);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const heroRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
   const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

   useEffect(() => {
      const t = setInterval(() => setActiveSlide(p => (p + 1) % projects.length), 4500);
      return () => clearInterval(t);
   }, [projects.length]);

   useEffect(() => {
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500);
      return () => clearInterval(t);
   }, [TESTIMONIALS.length]);

   useEffect(() => {
      const handleKey = (e) => { if (e.key === "Escape") setLightbox(null); };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
   }, []);

   // Close mobile menu on scroll
   useEffect(() => {
      const handleScroll = () => { if (isMobileMenuOpen) setIsMobileMenuOpen(false); };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
   }, [isMobileMenuOpen]);

   return (
      <div
         style={{
            fontFamily: "'Clash Display', 'DM Sans', system-ui, sans-serif",
            background: C.bg,
            color: C.white,
            overflowX: "hidden",
            // Ensure text doesn't overflow on small screens
            wordBreak: "break-word",
            WebkitTextSizeAdjust: "100%",
         }}
      >

         {/* ── RESPONSIVE GLOBAL STYLES ─────────────────────────────────────────── */}
         <style>{`
        * { box-sizing: border-box; }
        img { max-width: 100%; height: auto; }
        
        /* Prevent horizontal scroll */
        html, body { overflow-x: hidden; max-width: 100vw; }

        /* Input placeholder styling */
        ::placeholder { color: ${C.muted}; opacity: 0.7; }
        select option { background: ${C.surface}; color: ${C.white}; }

        /* Custom xs breakpoint (below 480px) */
        @media (max-width: 479px) {
          .xs\\:hidden { display: none !important; }
          .xs\\:flex { display: flex !important; }
          .xs\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Tap highlight removal on mobile */
        button, a { -webkit-tap-highlight-color: transparent; }

        /* Smooth scrolling */
        html { scroll-behavior: smooth; }

        /* Ensure columns layout doesn't break on very small screens */
        @media (max-width: 400px) {
          .masonry-grid { columns: 2 !important; gap: 8px !important; }
          .masonry-item { margin-bottom: 8px !important; }
        }

        /* Fix floating badges overflow on mobile */
        @media (max-width: 640px) {
          .hero-badge-right { right: -8px !important; }
          .hero-badge-left { left: -8px !important; }
          .hero-ring { display: none !important; }
        }

        /* Testimonial card overflow fix */
        .testimonial-quote {
          position: absolute;
          top: 3px;
          left: 5px;
          font-size: clamp(40px, 8vw, 80px);
          font-weight: 900;
          line-height: 1;
          opacity: 0.1;
          font-style: italic;
          pointer-events: none;
        }
      `}</style>

         {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50"
            style={{ padding: "12px 16px" }}
         >
            <div className="mx-auto" style={{ maxWidth: 1280 }}>
               <GlassCard style={{ borderRadius: 16, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  {/* Logo */}
                  <motion.div
                     initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                     className="flex items-center gap-2"
                     style={{ flexShrink: 0, minWidth: 0 }}
                  >
                     <div
                        className="flex items-center justify-center text-white font-black flex-shrink-0"
                        style={{
                           width: 32, height: 32, borderRadius: 10,
                           background: `linear-gradient(135deg, ${C.aurora1}, ${C.aurora2})`,
                           fontSize: 13,
                        }}
                     >L</div>
                     <span
                        className="font-black tracking-tight"
                        style={{
                           background: `linear-gradient(135deg, ${C.aurora2}, ${C.aurora4})`,
                           WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                           fontSize: "clamp(11px, 2.5vw, 15px)",
                           whiteSpace: "nowrap",
                           overflow: "hidden",
                           textOverflow: "ellipsis",
                           maxWidth: "clamp(80px, 30vw, 200px)",
                        }}
                     >
                        {d.agencyName}
                     </span>
                  </motion.div>

                  {/* Desktop Nav */}
                  <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold" style={{ color: C.muted }}>
                     {["Services", "Work", "Process", "Pricing", "Contact"].map((item, i) => (
                        <motion.a
                           key={item}
                           href={`#${item.toLowerCase()}`}
                           initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 * i + 0.3 }}
                           className="hover:text-white transition-colors whitespace-nowrap"
                           style={{ fontSize: 13 }}
                        >{item}</motion.a>
                     ))}
                  </nav>

                  <div className="flex items-center gap-2">
                     <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="hidden lg:block">
                        <motion.a
                           href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                           className="px-4 xl:px-5 py-2.5 rounded-full font-bold text-white whitespace-nowrap"
                           style={{ background: `linear-gradient(135deg, ${C.aurora1}, ${C.aurora3})`, boxShadow: `0 0 24px ${C.aurora1}50`, fontSize: 12, letterSpacing: "0.05em" }}
                        >
                           Book Now ✦
                        </motion.a>
                     </motion.div>

                     {/* Mobile hamburger */}
                     <button
                        className="lg:hidden flex items-center justify-center rounded-xl"
                        style={{ background: `${C.aurora1}20`, color: C.aurora2, width: 38, height: 38, flexShrink: 0 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                     >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                     </button>
                  </div>
               </GlassCard>

               {/* Mobile Menu Dropdown */}
               <AnimatePresence>
                  {isMobileMenuOpen && (
                     <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.97 }}
                        className="absolute flex flex-col gap-2 z-50"
                        style={{
                           left: 16, right: 16, top: "100%", marginTop: 8,
                           padding: 20, borderRadius: 20,
                           background: C.surface, border: `1px solid ${C.glassBorder}`,
                           boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
                        }}
                     >
                        {["Services", "Work", "Process", "Pricing", "Contact"].map((item) => (
                           <a
                              key={item}
                              href={`#${item.toLowerCase()}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="font-bold uppercase tracking-wider py-2 px-1 border-b"
                              style={{ color: C.white, fontSize: 13, borderColor: "rgba(255,255,255,0.06)" }}
                           >{item}</a>
                        ))}
                        <a
                           href="#contact"
                           onClick={() => setIsMobileMenuOpen(false)}
                           className="text-center rounded-full font-bold text-white mt-2"
                           style={{ padding: "12px 20px", background: `linear-gradient(135deg, ${C.aurora1}, ${C.aurora3})`, fontSize: 13, letterSpacing: "0.05em" }}
                        >Book Now ✦</a>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </motion.header>

         {/* ── HERO ────────────────────────────────────────────────────────────── */}
         <section
            ref={heroRef}
            className="relative flex flex-col justify-center overflow-hidden"
            style={{ minHeight: "100svh", paddingTop: "clamp(96px,18vw,140px)", paddingBottom: "clamp(48px,8vw,80px)", paddingLeft: "clamp(16px,4vw,24px)", paddingRight: "clamp(16px,4vw,24px)" }}
         >
            <AuroraMesh />
            {/* Grid texture */}
            <div
               className="absolute inset-0 pointer-events-none"
               style={{ opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
            />

            <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: 1280 }} className="relative z-10 w-full mx-auto" >
               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "1fr",
                     gap: "clamp(32px,6vw,48px)",
                     alignItems: "center",
                  }}
                  className="lg:grid-cols-2"
               >
                  {/* Left Content */}
                  <div className="text-center lg:text-left">
                     <motion.div
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-widest mb-5"
                        style={{ padding: "8px 16px", background: `${C.aurora4}15`, border: `1px solid ${C.aurora4}40`, color: C.aurora4, fontSize: 11 }}
                     >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.aurora4, flexShrink: 0 }} />
                        <span>Now Booking 2025–26</span>
                     </motion.div>

                     <div className="overflow-hidden mb-6">
                        <motion.h1
                           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                           style={{ fontSize: "clamp(2.2rem,7vw,5.5rem)", fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.02em", marginBottom: 0 }}
                        >
                           {d.heroTitle.split(" ").map((w, i) => (
                              <motion.span
                                 key={i}
                                 initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                                 transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                 className="inline-block"
                                 style={{
                                    marginRight: "0.2em",
                                    ...(i % 3 === 1
                                       ? { background: `linear-gradient(135deg, ${C.aurora2}, ${C.aurora4})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                                       : i % 3 === 2
                                          ? { background: `linear-gradient(135deg, ${C.aurora3}, ${C.aurora1})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                                          : { color: C.white })
                                 }}
                              >
                                 {w}
                              </motion.span>
                           ))}
                        </motion.h1>
                     </div>

                     <motion.p
                        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mx-auto lg:mx-0 mb-8 leading-relaxed"
                        style={{ color: C.muted, fontSize: "clamp(14px,2.2vw,18px)", maxWidth: 480 }}
                     >
                        {d.tagline}
                     </motion.p>

                     <motion.div
                        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.65 }}
                        className="flex flex-col gap-3 mb-10 justify-center lg:justify-start"
                        style={{ flexDirection: "row", flexWrap: "wrap" }}
                     >
                        <motion.a
                           href="#contact" whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}
                           className="text-center rounded-full font-bold text-white uppercase tracking-wider"
                           style={{
                              padding: "clamp(10px,2vw,16px) clamp(20px,4vw,32px)",
                              background: `linear-gradient(135deg, ${C.aurora1}, ${C.aurora3})`,
                              boxShadow: `0 0 40px ${C.aurora1}50`,
                              fontSize: "clamp(11px,1.5vw,14px)",
                              whiteSpace: "nowrap",
                           }}
                        >
                           Experience the Magic ✦
                        </motion.a>
                        <motion.a
                           href="#work" whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}
                           className="text-center rounded-full font-bold border"
                           style={{
                              padding: "clamp(10px,2vw,16px) clamp(20px,4vw,32px)",
                              borderColor: C.aurora2, color: C.aurora2, background: `${C.aurora2}08`,
                              fontSize: "clamp(11px,1.5vw,14px)",
                              whiteSpace: "nowrap",
                           }}
                        >
                           See Our Work
                        </motion.a>
                     </motion.div>

                     {/* Stats row */}
                     <motion.div
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        style={{ display: "flex", gap: "clamp(20px,5vw,48px)", flexWrap: "wrap", justifyContent: "center" }}
                        className="lg:justify-start"
                     >
                        {[
                           { v: 500, s: "+", l: "Events Produced", from: C.aurora3, to: C.aurora1 },
                           { v: 99, s: "%", l: "Client Satisfaction", from: C.aurora2, to: C.aurora4 },
                           { v: 8, s: "", l: "Years of Magic", from: C.aurora4, to: C.aurora2 },
                        ].map((stat, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + i * 0.1 }}
                              className="text-center lg:text-left"
                           >
                              <div
                                 style={{
                                    fontSize: "clamp(20px,4vw,30px)", fontWeight: 900,
                                    background: `linear-gradient(135deg, ${stat.from}, ${stat.to})`,
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                                 }}
                              >
                                 <Counter to={stat.v} suffix={stat.s} />
                              </div>
                              <div style={{ color: C.muted, fontSize: 10, fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.l}</div>
                           </motion.div>
                        ))}
                     </motion.div>
                  </div>

                  {/* Right — Hero Image */}
                  <div
                     className="relative mx-auto"
                     style={{ width: "100%", maxWidth: "clamp(260px, 50vw, 420px)", marginTop: 16 }}
                  >
                     <motion.div
                        initial={{ scale: 0.85, opacity: 0, x: 70 }} animate={{ scale: 1, opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative rounded-3xl overflow-hidden"
                        style={{
                           aspectRatio: "4/5",
                           border: "1px solid rgba(123,47,190,0.5)",
                           boxShadow: `0 0 80px ${C.aurora1}40, 0 0 160px ${C.aurora2}20`,
                        }}
                     >
                        <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Event" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}CC, transparent 50%)` }} />
                        <div className="absolute inset-0 rounded-3xl" style={{ background: `linear-gradient(135deg, ${C.aurora1}20, ${C.aurora2}10, transparent)` }} />
                     </motion.div>

                     {/* Floating badge — right */}
                     <motion.div
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="hero-badge-right absolute"
                        style={{ right: -16, top: 32 }}
                     >
                        <GlassCard style={{ padding: "12px 16px", textAlign: "center" }}>
                           <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                              <div style={{ fontSize: 28, marginBottom: 2 }}>✦</div>
                              <div style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: C.aurora2 }}>500+ Events</div>
                           </motion.div>
                        </GlassCard>
                     </motion.div>

                     {/* Stars badge — left */}
                     <motion.div
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="hero-badge-left absolute"
                        style={{ left: -16, bottom: 80 }}
                     >
                        <GlassCard style={{ padding: "10px 14px" }}>
                           <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                              {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: C.aurora2, fontSize: 11 }}>★</span>)}
                           </div>
                           <div style={{ fontSize: 11, fontWeight: 700, color: C.white, whiteSpace: "nowrap" }}>5.0 — 800+ Reviews</div>
                        </GlassCard>
                     </motion.div>

                     {/* Spinning ring */}
                     <motion.div
                        animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="hero-ring absolute flex items-center justify-center rounded-full"
                        style={{
                           bottom: -24, right: -24,
                           width: "clamp(64px,10vw,96px)", height: "clamp(64px,10vw,96px)",
                           border: `2px dashed ${C.aurora2}60`,
                           background: C.bg,
                        }}
                     >
                        <div style={{ fontWeight: 900, textAlign: "center", fontSize: 8, textTransform: "uppercase", lineHeight: 1.4, color: C.aurora2 }}>100%<br />Live</div>
                     </motion.div>
                  </div>
               </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
               animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
               className="absolute left-1/2 flex flex-col items-center gap-1"
               style={{ bottom: 24, transform: "translateX(-50%)", color: C.muted }}
            >
               <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Scroll</span>
               <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${C.aurora2}, transparent)` }} />
            </motion.div>
         </section>

         {/* ── MARQUEE ──────────────────────────────────────────────────────────── */}
         <Marquee items={CLIENTS} />

         {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
         <section
            id="about"
            className="relative overflow-hidden"
            style={{
               background: C.surface,
               padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)",
            }}
         >
            <AuroraMesh variant="warm" />
            <div className="mx-auto relative z-10" style={{ maxWidth: 1280 }}>
               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "1fr",
                     gap: "clamp(40px,8vw,80px)",
                     alignItems: "center",
                  }}
                  className="lg:grid-cols-2"
               >
                  {/* Image */}
                  <motion.div {...slideInLeft(0)} className="relative mx-auto" style={{ width: "100%", maxWidth: 400 }}>
                     <div
                        className="relative rounded-3xl overflow-hidden"
                        style={{
                           aspectRatio: "4/5",
                           border: "1px solid rgba(255,60,172,0.3)",
                           boxShadow: `0 0 60px ${C.aurora3}25`,
                        }}
                     >
                        <img src={d.aboutImage || "/images/templates/template-img-39.jpg"} alt="About" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}CC, transparent 55%)` }} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.aurora3}15, transparent)` }} />
                     </div>

                     <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: "absolute", right: -20, top: "25%" }}>
                        <GlassCard style={{ padding: "16px 20px", textAlign: "center" }}>
                           <div style={{ fontSize: 28, fontWeight: 900, background: `linear-gradient(135deg, ${C.aurora3}, ${C.aurora1})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                              <Counter to={8} suffix="+" />
                           </div>
                           <div style={{ fontSize: 9, fontWeight: 700, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted }}>Years</div>
                        </GlassCard>
                     </motion.div>

                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1.2 }} style={{ position: "absolute", left: -20, bottom: 80 }}>
                        <GlassCard style={{ padding: "14px 18px" }}>
                           <div style={{ fontSize: 22, fontWeight: 900, background: `linear-gradient(135deg, ${C.aurora2}, ${C.aurora4})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                              <Counter to={500} suffix="+" />
                           </div>
                           <div style={{ fontSize: 9, fontWeight: 700, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted }}>Events Done</div>
                        </GlassCard>
                     </motion.div>
                  </motion.div>

                  {/* Copy */}
                  <div>
                     <GradPill from={C.aurora3} to={C.aurora1}>Our Story ✦</GradPill>
                     <motion.h2
                        {...slideInLeft(1)}
                        style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24, color: C.white }}
                     >
                        {d.aboutUsTitle || "We Live For"}<br />
                        <GradText from={C.aurora3} to={C.aurora1}>The Extraordinary.</GradText>
                     </motion.h2>
                     <motion.p
                        {...slideInLeft(2)}
                        className="leading-relaxed mb-8"
                        style={{ color: C.muted, fontSize: "clamp(14px,2vw,18px)" }}
                     >
                        {d.bio}
                     </motion.p>
                     <motion.div {...slideInLeft(3)} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                        {["Visionary", "Limitless", "Immersive", "Iconic"].map((pill, i) => {
                           const colors = [[C.aurora3, C.aurora1], [C.aurora2, C.aurora4], [C.aurora4, C.aurora2], [C.aurora1, C.aurora3]];
                           return (
                              <span
                                 key={i}
                                 style={{
                                    padding: "8px 16px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                                    textTransform: "uppercase", letterSpacing: "0.08em",
                                    background: `linear-gradient(135deg, ${colors[i][0]}20, ${colors[i][1]}20)`,
                                    border: `1px solid ${colors[i][0]}40`, color: colors[i][0],
                                 }}
                              >{pill}</span>
                           );
                        })}
                     </motion.div>
                     <motion.a
                        {...slideInLeft(4)} href="#contact" whileHover={{ scale: 1.04, x: 6 }} whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full font-bold text-white uppercase tracking-widest"
                        style={{
                           padding: "clamp(12px,2vw,16px) clamp(24px,4vw,32px)",
                           background: `linear-gradient(135deg, ${C.aurora3}, ${C.aurora1})`,
                           boxShadow: `0 0 30px ${C.aurora3}40`,
                           fontSize: "clamp(11px,1.4vw,13px)",
                        }}
                     >
                        Let's Create Together ✦
                     </motion.a>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
         <section
            id="services"
            className="relative"
            style={{ background: C.bg, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <div className="mx-auto" style={{ maxWidth: 1280 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora2} to={C.aurora4}>What We Do 🌟</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     Every Event,<br /><GradText from={C.aurora2} to={C.aurora4}>Perfectly Orchestrated.</GradText>
                  </motion.h2>
               </div>

               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                     gap: "clamp(12px,2vw,24px)",
                  }}
               >
                  {services.map((svc, i) => (
                     <motion.div
                        key={i} {...fadeUp(i)}
                        whileHover={{ y: -10, x: 4 }}
                        className="group relative rounded-2xl overflow-hidden cursor-pointer"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                     >
                        <div className="relative overflow-hidden" style={{ height: "clamp(160px,20vw,200px)" }}>
                           <img
                              src={svc.img || "/images/templates/template-img-40.jpg"} alt={svc.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal"
                           />
                           <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}EE, transparent 60%)` }} />
                           <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${svc.from}20, transparent)` }} />
                           <div
                              className="absolute flex items-center justify-center"
                              style={{ top: 12, left: 12, width: 40, height: 40, borderRadius: 12, fontSize: 20, background: `linear-gradient(135deg, ${svc.from}30, ${svc.to}30)`, border: `1px solid ${svc.from}50` }}
                           >
                              {svc.icon}
                           </div>
                        </div>
                        <div style={{ padding: "clamp(16px,3vw,24px)" }}>
                           <h3
                              style={{
                                 fontSize: 13, fontWeight: 900, textTransform: "uppercase", marginBottom: 8,
                                 background: `linear-gradient(135deg, ${svc.from}, ${svc.to})`,
                                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                              }}
                           >{svc.name}</h3>
                           <p style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{svc.desc}</p>
                           <div
                              className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: svc.from }}
                           >Explore More →</div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                           style={{ background: `linear-gradient(90deg, ${svc.from}, ${svc.to})` }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ───────────────────────────────────────────────── */}
         <section
            className="relative overflow-hidden"
            style={{ background: C.surface, padding: "clamp(64px,10vw,112px) clamp(16px,4vw,24px)" }}
         >
            <AuroraMesh />
            <div className="mx-auto relative z-10" style={{ maxWidth: 1280 }}>
               <div className="text-center mb-10">
                  <GradPill from={C.aurora4} to={C.aurora2}>Event Types 🎭</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     Every Occasion,<br /><GradText from={C.aurora4} to={C.aurora2}>We've Got It Covered!</GradText>
                  </motion.h2>
               </div>

               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
                     gap: "clamp(10px,2vw,16px)",
                  }}
               >
                  {CATEGORIES.map((cat, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -8, x: 4, scale: 1.04 }}
                        className="relative cursor-pointer overflow-hidden group"
                        style={{
                           padding: "clamp(16px,3vw,28px) clamp(14px,2.5vw,24px)",
                           borderRadius: 16,
                           background: `linear-gradient(135deg, ${cat.from}15, ${cat.to}15)`,
                           border: `1px solid ${cat.from}35`,
                        }}
                     >
                        <div style={{ fontSize: "clamp(24px,4vw,36px)", marginBottom: 10 }}>{cat.emoji}</div>
                        <div style={{ fontWeight: 700, fontSize: "clamp(11px,1.5vw,14px)", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.3, color: C.white }}>{cat.label}</div>
                        <div
                           className="absolute rounded-full group-hover:scale-150 transition-all duration-500"
                           style={{ bottom: -24, right: -24, width: 80, height: 80, background: cat.from, filter: "blur(20px)", opacity: 0.2 }}
                        />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO / CAROUSEL ───────────────────────────────────────────── */}
         <section
            id="work"
            className="relative overflow-hidden"
            style={{ background: C.bg, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <div className="mx-auto" style={{ maxWidth: 1280 }}>
               <div
                  style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 48 }}
               >
                  <div>
                     <GradPill from={C.aurora3} to={C.aurora1}>Past Glory 🏆</GradPill>
                     <motion.h2
                        {...slideInLeft(1)}
                        style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                     >
                        Events That<br /><GradText from={C.aurora3} to={C.aurora1}>Broke the Internet</GradText>
                     </motion.h2>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                     {projects.map((_, i) => (
                        <button
                           key={i}
                           onClick={() => setActiveSlide(i)}
                           style={{
                              height: 6, borderRadius: 3,
                              width: i === activeSlide ? 36 : 8,
                              background: i === activeSlide ? C.aurora3 : `${C.aurora3}30`,
                              transition: "all 0.4s",
                              border: "none", cursor: "pointer", padding: 0,
                           }}
                        />
                     ))}
                  </div>
               </div>

               {/* Main carousel */}
               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeSlide}
                     initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
                     transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                     className="relative rounded-3xl overflow-hidden cursor-pointer group"
                     style={{
                        height: "clamp(240px,45vw,500px)",
                        border: `1px solid ${projects[activeSlide]?.from || C.aurora1}50`,
                        boxShadow: `0 0 80px ${projects[activeSlide]?.from || C.aurora1}25`,
                        marginBottom: 20,
                     }}
                     onClick={() => setActiveSlide((activeSlide + 1) % projects.length)}
                  >
                     <img
                        src={projects[activeSlide]?.img || "/images/templates/template-img-44.jpg"}
                        alt={projects[activeSlide]?.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg}DD 0%, ${C.bg}60 40%, transparent 100%)` }} />
                     <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${projects[activeSlide]?.from || C.aurora1}20, transparent)` }} />

                     {/* Tag */}
                     <div style={{ position: "absolute", top: 20, left: 20 }}>
                        <span
                           style={{
                              padding: "8px 16px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                              textTransform: "uppercase", letterSpacing: "0.08em",
                              background: `linear-gradient(135deg, ${projects[activeSlide]?.from || C.aurora1}40, ${projects[activeSlide]?.to || C.aurora2}40)`,
                              border: `1px solid ${projects[activeSlide]?.from || C.aurora1}60`,
                              color: projects[activeSlide]?.from || C.aurora1,
                           }}
                        >
                           {projects[activeSlide]?.emoji} {projects[activeSlide]?.tag}
                        </span>
                     </div>

                     {/* Stat circle */}
                     <motion.div
                        style={{
                           position: "absolute", top: 20, right: 20,
                           width: "clamp(52px,8vw,80px)", height: "clamp(52px,8vw,80px)",
                           borderRadius: "50%",
                           display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                           fontWeight: 900,
                           background: `linear-gradient(135deg, ${projects[activeSlide]?.from || C.aurora1}40, ${projects[activeSlide]?.to || C.aurora2}40)`,
                           backdropFilter: "blur(12px)", border: `1px solid ${projects[activeSlide]?.from || C.aurora1}60`,
                           color: projects[activeSlide]?.from || C.aurora1,
                        }}
                        animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}
                     >
                        <span style={{ fontSize: "clamp(11px,2vw,18px)" }}>{projects[activeSlide]?.stat}</span>
                        <span style={{ fontSize: 7, opacity: 0.7 }}>guests</span>
                     </motion.div>

                     {/* Info */}
                     <div style={{ position: "absolute", bottom: 28, left: 28, right: 80 }}>
                        <h3 style={{ fontSize: "clamp(20px,5vw,48px)", fontWeight: 900, color: C.white, letterSpacing: "-0.02em", marginBottom: 8 }}>
                           {projects[activeSlide]?.name}
                        </h3>
                        <p style={{ fontSize: "clamp(12px,1.8vw,16px)", opacity: 0.7, color: C.white }}>{projects[activeSlide]?.desc}</p>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnails */}
               <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(8px,1.5vw,12px)" }}>
                  {projects.map((p, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        onClick={() => setActiveSlide(i)} whileHover={{ scale: 1.04 }}
                        className="relative rounded-2xl overflow-hidden cursor-pointer"
                        style={{
                           height: "clamp(56px,8vw,100px)",
                           border: `1px solid ${i === activeSlide ? (p.from || C.aurora1) : "transparent"}`,
                           opacity: i === activeSlide ? 1 : 0.5,
                           boxShadow: i === activeSlide ? `0 0 20px ${p.from || C.aurora1}40` : "none",
                           transition: "all 0.3s",
                        }}
                     >
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "rgba(7,5,15,0.5)" }} />
                        <div
                           className="absolute truncate uppercase font-bold"
                           style={{ bottom: 6, left: 8, right: 8, color: C.white, fontSize: "clamp(7px,1.2vw,11px)" }}
                        >{p.name}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <Marquee items={["IMMERSIVE", "ELECTRIC", "VISIONARY", "CINEMATIC", "ICONIC", "AURORA"]} reverse speed={20} />

         {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
         <section
            id="process"
            className="relative overflow-hidden"
            style={{ background: C.surface, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <AuroraMesh />
            <div className="mx-auto relative z-10" style={{ maxWidth: 800 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora2} to={C.aurora4}>How We Work 🗺</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     The LUMINA<br /><GradText from={C.aurora2} to={C.aurora4}>Journey</GradText>
                  </motion.h2>
               </div>

               <div className="relative">
                  {/* Vertical line — hidden on smallest screens */}
                  <div
                     className="hidden sm:block absolute"
                     style={{
                        left: 22, top: 0, bottom: 0, width: 1,
                        background: `linear-gradient(to bottom, ${C.aurora1}, ${C.aurora2}, ${C.aurora4}, ${C.aurora3}, ${C.aurora1})`,
                     }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="sm:pl-16">
                     {PROCESS.map((step, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, x: -70 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true, margin: "-40px" }}
                           transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                           whileHover={{ x: 8 }}
                           className="relative flex gap-4 sm:gap-6 items-start"
                           style={{
                              padding: "clamp(16px,3vw,28px)",
                              borderRadius: 20,
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.07)",
                           }}
                        >
                           {/* Bubble on line */}
                           <div
                              className="hidden sm:flex absolute items-center justify-center text-white font-black z-10"
                              style={{
                                 left: -46, top: "50%", transform: "translateY(-50%)",
                                 width: 36, height: 36, borderRadius: "50%", fontSize: 10,
                                 background: `linear-gradient(135deg, ${step.from}, ${step.to})`,
                                 boxShadow: `0 0 20px ${step.from}60`,
                              }}
                           >{step.step}</div>

                           {/* Icon */}
                           <div
                              className="flex items-center justify-center flex-shrink-0"
                              style={{
                                 width: "clamp(44px,7vw,56px)", height: "clamp(44px,7vw,56px)",
                                 borderRadius: 14, fontSize: "clamp(20px,3vw,28px)",
                                 background: `linear-gradient(135deg, ${step.from}20, ${step.to}20)`,
                                 border: `1px solid ${step.from}30`,
                              }}
                           >{step.icon}</div>

                           <div style={{ minWidth: 0 }}>
                              <div className="sm:hidden" style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: step.from, marginBottom: 2 }}>Step {step.step}</div>
                              <h3
                                 style={{
                                    fontSize: "clamp(13px,2vw,17px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 6,
                                    background: `linear-gradient(135deg, ${step.from}, ${step.to})`,
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                                 }}
                              >{step.title}</h3>
                              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", lineHeight: 1.6, color: C.muted }}>{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── WHY US / STATS ───────────────────────────────────────────────────── */}
         <section
            className="relative overflow-hidden"
            style={{ background: C.bg, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <div className="mx-auto" style={{ maxWidth: 1280 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora3} to={C.aurora1}>Why LUMINA 💎</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     Numbers That<br /><GradText from={C.aurora3} to={C.aurora1}>Say It All</GradText>
                  </motion.h2>
               </div>

               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(2, 1fr)",
                     gap: "clamp(10px,2vw,16px)",
                     marginBottom: 48,
                  }}
                  className="lg:grid-cols-4"
               >
                  {[
                     { v: 500, s: "+", l: "Events Produced", icon: "✦", from: C.aurora3, to: C.aurora1 },
                     { v: 99, s: "%", l: "Client Satisfaction", icon: "💎", from: C.aurora2, to: C.aurora4 },
                     { v: 800, s: "+", l: "Five-Star Reviews", icon: "★", from: C.aurora4, to: C.aurora2 },
                     { v: 30, s: "+", l: "Cities Covered", icon: "🌍", from: C.aurora1, to: C.aurora3 },
                  ].map((stat, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -6, x: 4 }}
                        className="text-center relative overflow-hidden"
                        style={{
                           padding: "clamp(20px,4vw,32px) clamp(16px,3vw,24px)",
                           borderRadius: 20,
                           background: `linear-gradient(135deg, ${stat.from}10, ${stat.to}10)`,
                           border: `1px solid ${stat.from}25`,
                        }}
                     >
                        <div style={{ fontSize: "clamp(20px,3vw,28px)", marginBottom: 10 }}>{stat.icon}</div>
                        <div
                           style={{
                              fontSize: "clamp(24px,5vw,40px)", fontWeight: 900, marginBottom: 6,
                              background: `linear-gradient(135deg, ${stat.from}, ${stat.to})`,
                              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                           }}
                        >
                           <Counter to={stat.v} suffix={stat.s} />
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>{stat.l}</div>
                     </motion.div>
                  ))}
               </div>

               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                     gap: "clamp(12px,2vw,20px)",
                  }}
               >
                  {[
                     { title: "Artistic Vision", desc: "Every element is engineered to hit harder, look more stunning, and feel more alive than anything before it.", icon: "✦", from: C.aurora3, to: C.aurora1 },
                     { title: "Zero Stress", desc: "You live in the moment. We handle every cable, every cue, every crowd surge with military precision.", icon: "🧘", from: C.aurora2, to: C.aurora4 },
                     { title: "Pure Magic", desc: "From 48-hour pop-ups to 6-month mega productions — we always deliver extraordinary, lasting impact.", icon: "🌐", from: C.aurora4, to: C.aurora2 },
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                           display: "flex", gap: 16,
                           padding: "clamp(20px,3vw,28px)",
                           borderRadius: 20,
                           background: `linear-gradient(135deg, ${item.from}08, ${item.to}08)`,
                           border: `1px solid ${item.from}20`,
                        }}
                     >
                        <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                        <div>
                           <h4
                              style={{
                                 fontWeight: 900, textTransform: "uppercase", marginBottom: 8, fontSize: 13,
                                 background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                              }}
                           >{item.title}</h4>
                           <p style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ──────────────────────────────────────────────────────────── */}
         <section
            id="pricing"
            className="relative overflow-hidden"
            style={{ background: C.surface, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <AuroraMesh variant="warm" />
            <div className="mx-auto relative z-10" style={{ maxWidth: 1100 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora4} to={C.aurora2}>Packages 🎁</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     Pick Your<br /><GradText from={C.aurora4} to={C.aurora2}>Power Plan</GradText>
                  </motion.h2>
               </div>

               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                     gap: "clamp(16px,3vw,32px)",
                     alignItems: "start",
                  }}
               >
                  {PRICING.map((pkg, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i === 1 ? 0 : i === 0 ? -60 : 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -12, scale: 1.02 }}
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                           background: pkg.popular ? `linear-gradient(135deg, ${pkg.from}20, ${pkg.to}20)` : "rgba(255,255,255,0.03)",
                           border: pkg.popular ? `1px solid ${pkg.from}60` : "1px solid rgba(255,255,255,0.08)",
                           boxShadow: pkg.popular ? `0 0 60px ${pkg.from}30` : "none",
                        }}
                     >
                        {pkg.popular && (
                           <div className="absolute top-0 left-0 right-0" style={{ height: 2, background: `linear-gradient(90deg, ${pkg.from}, ${pkg.to})` }} />
                        )}
                        <div style={{ padding: "clamp(24px,4vw,36px)" }}>
                           {pkg.popular && (
                              <div
                                 style={{
                                    display: "inline-block", padding: "4px 12px", borderRadius: 999, fontSize: 10,
                                    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16,
                                    background: `${pkg.from}25`, border: `1px solid ${pkg.from}50`, color: pkg.from,
                                 }}
                              >✦ Most Popular</div>
                           )}
                           <div style={{ fontSize: 28, marginBottom: 12 }}>{["⚡", "🔋", "💥"][i]}</div>
                           <h3
                              style={{
                                 fontSize: "clamp(18px,3vw,24px)", fontWeight: 900, textTransform: "uppercase", marginBottom: 8,
                                 background: `linear-gradient(135deg, ${pkg.from}, ${pkg.to})`,
                                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                              }}
                           >{pkg.name}</h3>
                           <p style={{ fontSize: 13, marginBottom: 20, color: C.muted }}>{pkg.desc}</p>
                           <div style={{ fontSize: "clamp(32px,6vw,48px)", fontWeight: 900, marginBottom: 28, color: pkg.popular ? C.white : pkg.from }}>
                              {pkg.price}
                              {pkg.price !== "Custom" && <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.4, marginLeft: 4 }}>onwards</span>}
                           </div>
                           <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                              {pkg.features.map((f, j) => (
                                 <li key={j} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
                                    <div
                                       style={{
                                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9,
                                          background: `linear-gradient(135deg, ${pkg.from}30, ${pkg.to}30)`,
                                          border: `1px solid ${pkg.from}50`, color: pkg.from,
                                       }}
                                    >✓</div>
                                    <span style={{ color: C.muted }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button
                              whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
                              className="w-full rounded-full font-bold uppercase tracking-widest"
                              style={{
                                 padding: "14px 20px", fontSize: 12, cursor: "pointer", border: "none",
                                 ...(pkg.popular
                                    ? { background: `linear-gradient(135deg, ${pkg.from}, ${pkg.to})`, color: "white", boxShadow: `0 0 24px ${pkg.from}40` }
                                    : { background: `linear-gradient(135deg, ${pkg.from}15, ${pkg.to}15)`, color: pkg.from, border: `1px solid ${pkg.from}50` })
                              }}
                           >Get Started ✦</motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
         <section
            className="relative overflow-hidden"
            style={{ background: C.bg, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <AuroraMesh />
            <div className="mx-auto relative z-10" style={{ maxWidth: 700 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora2} to={C.aurora4}>Love Notes 💌</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     The Crowd<br /><GradText from={C.aurora2} to={C.aurora4}>Has Spoken!</GradText>
                  </motion.h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeTestimonial}
                     initial={{ opacity: 0, x: -80, scale: 0.95 }}
                     animate={{ opacity: 1, x: 0, scale: 1 }}
                     exit={{ opacity: 0, x: 80, scale: 0.95 }}
                     transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                     <GlassCard style={{ padding: "clamp(24px,5vw,48px)", textAlign: "center", border: `1px solid ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.from || C.aurora1}35`, position: "relative", overflow: "hidden" }}>
                        <div
                           className="testimonial-quote"
                           style={{
                              background: `linear-gradient(135deg, ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.from}, ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.to})`,
                              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                           }}
                        >"</div>
                        <div style={{ fontSize: 32, marginBottom: 16 }}>💬</div>
                        <p style={{ fontSize: "clamp(14px,2.2vw,20px)", fontWeight: 500, lineHeight: 1.7, marginBottom: 32, color: C.white, position: "relative", zIndex: 1 }}>
                           "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                           <div
                              style={{
                                 width: 48, height: 48, borderRadius: "50%",
                                 display: "flex", alignItems: "center", justifyContent: "center",
                                 fontWeight: 900, color: "white", fontSize: 14, flexShrink: 0,
                                 background: `linear-gradient(135deg, ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.from}, ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.to})`,
                              }}
                           >{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}</div>
                           <div className="text-left">
                              <div style={{ fontWeight: 900, fontSize: 13, textTransform: "uppercase", fontStyle: "italic", color: C.white }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                           </div>
                        </div>
                     </GlassCard>
                  </motion.div>
               </AnimatePresence>

               <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
                  {TESTIMONIALS.map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        style={{
                           height: 6, borderRadius: 3,
                           width: i === activeTestimonial % TESTIMONIALS.length ? 32 : 8,
                           background: i === activeTestimonial % TESTIMONIALS.length ? C.aurora2 : `${C.aurora2}30`,
                           transition: "all 0.3s", border: "none", cursor: "pointer", padding: 0,
                        }}
                     />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
         <section
            className="relative"
            style={{ background: C.surface, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <div className="mx-auto" style={{ maxWidth: 1280 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora4} to={C.aurora3}>Our Crew 🤝</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     The Vision<br /><GradText from={C.aurora4} to={C.aurora3}>Makers</GradText>
                  </motion.h2>
               </div>

               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(2, 1fr)",
                     gap: "clamp(10px,2vw,20px)",
                  }}
                  className="lg:grid-cols-4"
               >
                  {TEAM.map((member, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -10, x: 4 }}
                        className="group rounded-2xl overflow-hidden cursor-pointer"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                     >
                        <div
                           className="relative flex items-center justify-center overflow-hidden"
                           style={{
                              height: "clamp(110px,18vw,220px)",
                              background: `linear-gradient(135deg, ${member.from}15, ${member.to}25)`,
                           }}
                        >
                           <div
                              style={{
                                 width: "clamp(52px,9vw,96px)", height: "clamp(52px,9vw,96px)",
                                 borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                 color: "white", fontWeight: 900, fontSize: "clamp(20px,4vw,32px)",
                                 background: `linear-gradient(135deg, ${member.from}, ${member.to})`,
                                 boxShadow: `0 0 40px ${member.from}50`,
                              }}
                           >{member.name[0]}</div>
                           <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                              style={{ padding: 12, background: `linear-gradient(to top, ${member.from}CC, transparent)` }}
                           >
                              <div style={{ display: "flex", gap: 6 }}>
                                 {["in", "tw", "ig"].map(s => (
                                    <div
                                       key={s}
                                       style={{
                                          width: 26, height: 26, borderRadius: "50%",
                                          display: "flex", alignItems: "center", justifyContent: "center",
                                          color: "white", fontSize: 8, fontWeight: 900, textTransform: "uppercase",
                                          background: `linear-gradient(135deg, ${member.from}, ${member.to})`,
                                       }}
                                    >{s}</div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div style={{ padding: "clamp(12px,2vw,20px)" }}>
                           <span
                              style={{
                                 display: "inline-block", padding: "4px 10px", borderRadius: 999, fontSize: 9,
                                 fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8,
                                 background: `linear-gradient(135deg, ${member.from}20, ${member.to}20)`,
                                 border: `1px solid ${member.from}40`, color: member.from,
                              }}
                           >{member.badge}</span>
                           <h4 style={{ fontWeight: 900, fontSize: "clamp(12px,2vw,15px)", textTransform: "uppercase", color: C.white }}>{member.name}</h4>
                           <p style={{ fontSize: "clamp(9px,1.4vw,12px)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>{member.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
         <section
            className="relative"
            style={{ background: C.bg, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <div className="mx-auto" style={{ maxWidth: 1280 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora2} to={C.aurora4}>Gallery 📸</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     Frames from<br /><GradText from={C.aurora2} to={C.aurora4}>Our Best Nights</GradText>
                  </motion.h2>
               </div>

               <div
                  className="masonry-grid"
                  style={{ columns: "2 200px", gap: "clamp(8px,1.5vw,16px)" }}
               >
                  {GALLERY.map((img, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setLightbox(img)}
                        className="masonry-item break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group"
                        style={{
                           height: i % 3 === 0 ? "clamp(120px,18vw,220px)" : i % 3 === 1 ? "clamp(90px,14vw,170px)" : "clamp(100px,16vw,200px)",
                           marginBottom: "clamp(8px,1.5vw,16px)",
                           borderRadius: 16,
                           border: "1px solid transparent",
                           transition: "border-color 0.3s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = C.aurora2}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
                     >
                        <img
                           src={img} alt={`Gallery ${i}`}
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal"
                        />
                        <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-colors flex items-center justify-center">
                           <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
               {lightbox && (
                  <motion.div
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 flex items-center justify-center"
                     style={{ zIndex: 9999, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)", padding: 16 }}
                     onClick={() => setLightbox(null)}
                  >
                     <motion.img
                        initial={{ scale: 0.8, x: -60 }} animate={{ scale: 1, x: 0 }} exit={{ scale: 0.8, x: 60 }}
                        src={lightbox} alt="Gallery"
                        style={{
                           maxWidth: "min(900px, 95vw)", maxHeight: "85vh",
                           objectFit: "contain", borderRadius: 24,
                           border: `1px solid ${C.aurora2}40`,
                           boxShadow: `0 0 80px ${C.aurora2}30`,
                        }}
                     />
                     <button
                        onClick={() => setLightbox(null)}
                        style={{
                           position: "absolute", top: 20, right: 20,
                           color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)",
                           border: "none", borderRadius: "50%", width: 40, height: 40,
                           fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                     >✕</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
         <section
            className="relative"
            style={{ background: C.surface, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <AuroraMesh />
            <div className="mx-auto relative z-10" style={{ maxWidth: 720 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora2} to={C.aurora4}>FAQ 💬</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: C.white }}
                  >
                     Got Questions?<br /><GradText from={C.aurora2} to={C.aurora4}>We've Got Answers!</GradText>
                  </motion.h2>
               </div>

               <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {FAQS.map((faq, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-2xl overflow-hidden cursor-pointer"
                        style={{
                           background: "rgba(255,255,255,0.03)",
                           border: `1px solid ${activeFaq === i ? C.aurora2 : "rgba(255,255,255,0.07)"}`,
                           boxShadow: activeFaq === i ? `0 0 30px ${C.aurora2}15` : "none",
                           transition: "all 0.2s",
                        }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                     >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(16px,3vw,24px)", gap: 16 }}>
                           <h4 style={{ fontWeight: 700, fontSize: "clamp(13px,2vw,15px)", textTransform: "uppercase", color: C.white, flex: 1 }}>{faq.q}</h4>
                           <motion.div
                              animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              style={{
                                 width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                                 display: "flex", alignItems: "center", justifyContent: "center",
                                 fontWeight: 900, fontSize: 18, cursor: "pointer",
                                 background: activeFaq === i ? `linear-gradient(135deg, ${C.aurora2}, ${C.aurora4})` : "transparent",
                                 border: `1px solid ${activeFaq === i ? C.aurora2 : C.dim}`,
                                 color: activeFaq === i ? "white" : C.muted,
                                 transition: "all 0.2s",
                              }}
                           >+</motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.3 }}
                                 style={{ overflow: "hidden" }}
                              >
                                 <div style={{ padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,20px)", fontSize: 14, lineHeight: 1.7, color: C.muted, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                    {faq.a}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
         <section
            id="contact"
            className="relative overflow-hidden"
            style={{ background: C.bg, padding: "clamp(64px,12vw,144px) clamp(16px,4vw,24px)" }}
         >
            <AuroraMesh variant="warm" />
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="mx-auto relative z-10" style={{ maxWidth: 1280 }}>
               <div className="text-center mb-12">
                  <GradPill from={C.aurora3} to={C.aurora1}>Let's Talk 🎊</GradPill>
                  <motion.h2
                     {...slideInLeft(1)}
                     style={{ fontSize: "clamp(1.8rem,6vw,4.5rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.05, color: C.white }}
                  >
                     Ready to Create<br /><GradText from={C.aurora3} to={C.aurora1}>Something Epic?</GradText>
                  </motion.h2>
               </div>

               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "1fr",
                     gap: "clamp(24px,5vw,48px)",
                     alignItems: "start",
                  }}
                  className="max-w-2xl mx-auto"
               >
                  {/* Contact info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                     {[
                        { icon: "✉️", label: "Email", val: d.contactEmail, from: C.aurora3, to: C.aurora1 },
                        { icon: "📞", label: "Phone", val: d.phone || "+91 99999 88888", from: C.aurora2, to: C.aurora4 },
                        { icon: "📍", label: "Studio", val: d.address, from: C.aurora4, to: C.aurora2 },
                     ].map((item, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                           whileHover={{ x: 10 }}
                           style={{
                              display: "flex", gap: 16, alignItems: "flex-start",
                              padding: "clamp(16px,3vw,24px)",
                              borderRadius: 20,
                              background: `linear-gradient(135deg, ${item.from}08, ${item.to}08)`,
                              border: `1px solid ${item.from}20`,
                           }}
                        >
                           <div
                              style={{
                                 width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                                 display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                                 background: `linear-gradient(135deg, ${item.from}20, ${item.to}20)`,
                                 border: `1px solid ${item.from}40`,
                              }}
                           >{item.icon}</div>
                           <div style={{ minWidth: 0 }}>
                              <div
                                 style={{
                                    fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 2,
                                    background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                                 }}
                              >{item.label}</div>
                              <div style={{ fontWeight: 600, fontSize: "clamp(13px,2vw,16px)", color: C.white, wordBreak: "break-word" }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}

                     <motion.div
                        initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.4 }}
                        style={{
                           padding: "clamp(16px,3vw,24px)", borderRadius: 20, textAlign: "center",
                           background: `linear-gradient(135deg, ${C.aurora1}15, ${C.aurora3}15)`,
                           border: `1px solid ${C.aurora1}40`,
                           boxShadow: `0 0 40px ${C.aurora1}20`,
                        }}
                     >
                        <div
                           style={{
                              fontWeight: 900, fontSize: "clamp(13px,2vw,16px)", marginBottom: 4,
                              background: `linear-gradient(135deg, ${C.aurora3}, ${C.aurora1})`,
                              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                           }}
                        >✦ Over 500 Legendary Events!</div>
                        <div style={{ fontSize: 12, color: C.muted }}>Join our roster of extraordinary clients</div>
                     </motion.div>
                  </div>


               </div>
            </div>
         </section>

         {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
         <footer
            style={{
               background: C.surface,
               borderTop: "1px solid rgba(255,255,255,0.06)",
               padding: "clamp(48px,8vw,80px) clamp(16px,4vw,24px) clamp(24px,4vw,32px)",
            }}
         >
            <div className="mx-auto" style={{ maxWidth: 1280 }}>
               <div
                  style={{
                     display: "flex", flexWrap: "wrap", justifyContent: "space-between",
                     gap: "clamp(32px,5vw,40px)",
                     paddingBottom: "clamp(32px,5vw,56px)",
                     borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
               >
                  {/* Brand */}
                  <motion.div {...slideInLeft(0)} style={{ maxWidth: 300, minWidth: 200 }}>
                     <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <div
                           style={{
                              width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "white", fontWeight: 900, fontSize: 14,
                              background: `linear-gradient(135deg, ${C.aurora1}, ${C.aurora2})`,
                           }}
                        >L</div>
                        <span
                           style={{
                              fontWeight: 900, fontSize: "clamp(13px,2vw,18px)", letterSpacing: "-0.01em",
                              background: `linear-gradient(135deg, ${C.aurora2}, ${C.aurora4})`,
                              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                           }}
                        >{d.agencyName}</span>
                     </div>
                     <p style={{ fontSize: 13, lineHeight: 1.6, color: C.muted, marginBottom: 20 }}>{d.tagline}</p>
                     <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {["in", "tw", "ig", "yt"].map((s, i) => {
                           const colors = [[C.aurora3, C.aurora1], [C.aurora2, C.aurora4], [C.aurora4, C.aurora2], [C.aurora1, C.aurora3]];
                           return (
                              <a
                                 key={s} href="#"
                                 style={{
                                    width: 32, height: 32, borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 9, fontWeight: 900, textTransform: "uppercase", color: "white",
                                    background: `linear-gradient(135deg, ${colors[i][0]}30, ${colors[i][1]}30)`,
                                    border: `1px solid ${colors[i][0]}40`,
                                    textDecoration: "none",
                                 }}
                              >{s}</a>
                           );
                        })}
                     </div>
                  </motion.div>

                  {/* Links */}
                  <motion.div {...slideInRight(0)} style={{ display: "flex", gap: "clamp(24px,5vw,48px)", flexWrap: "wrap" }}>
                     {[
                        { title: "Services", links: ["Festivals", "Tech Expos", "Nightlife", "Corporate"] },
                        { title: "Company", links: ["About Us", "Projects", "Our Crew", "Blog"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms", "Cookies"] },
                     ].map(col => (
                        <div key={col.title} style={{ minWidth: 80 }}>
                           <h5
                              style={{
                                 fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16,
                                 background: `linear-gradient(135deg, ${C.aurora2}, ${C.aurora4})`,
                                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                              }}
                           >{col.title}</h5>
                           <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a
                                       href="#"
                                       style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: C.muted, textDecoration: "none" }}
                                       onMouseEnter={e => e.target.style.color = C.white}
                                       onMouseLeave={e => e.target.style.color = C.muted}
                                    >{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </motion.div>
               </div>

               {/* Bottom bar */}
               <div
                  style={{
                     display: "flex", flexWrap: "wrap", justifyContent: "space-between",
                     alignItems: "center", gap: 12,
                     paddingTop: "clamp(20px,3vw,32px)",
                  }}
               >
                  <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: C.dim }}>{d.footerCopyright}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.dim }}>
                     <span>Made with</span>
                     <GradText from={C.aurora3} to={C.aurora1}>✦</GradText>
                     <span>for every luminous night</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}