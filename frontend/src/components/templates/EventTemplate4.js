import { useState, useEffect, useRef, useCallback } from "react";
import {
   motion,
   useScroll,
   useTransform,
   AnimatePresence,
   useInView,
   useSpring,
} from "framer-motion";

// ─── LUXURY DESIGN TOKENS ─────────────────────────────────────────────────────
const T = {
   cream: "#F8F5F0",
   creamDark: "#EDE8DF",
   creamMid: "#F0EBE3",
   gold: "#C9A96E",
   goldLight: "#E8D5B0",
   goldDark: "#A07840",
   goldPale: "#F4ECD8",
   ink: "#1A1A1A",
   inkLight: "#2C2C2A",
   charcoal: "#3D3D3B",
   muted: "#6B6B6B",
   light: "#9A9A9A",
   white: "#FFFFFF",
   offwhite: "#FDFAF6",
   border: "#D8CFC4",
   borderLight: "#EAE4DA",
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "Luminary Events",
   tagline: "Where Dreams Become Celebrations",
   heroTitle: "Craft Moments That Last Forever.",
   bio: "Luminary Events is an award-winning full-service event production studio. We blend artistry, technology, and passion to create experiences that move people—from intimate soirées to grand spectacles. Every detail is thoughtfully designed, every moment meticulously orchestrated.",
   aboutUsTitle: "Our Story",
   contactEmail: "hello@luminaryevents.in",
   phone: "+91 98765 43210",
   address: "The Studio, Bandra West, Mumbai — 400050",
   footerCopyright: `© ${new Date().getFullYear()} Luminary Events. All rights reserved.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

const DEFAULT_SERVICES = [
   { name: "Luxury Weddings", desc: "From intimate ceremonies to grand affairs—every love story deserves a perfect stage.", icon: "💍", color: T.gold, img: "/images/templates/template-img-36.jpg" },
   { name: "Music Festivals", desc: "Electrifying festival experiences with world-class stage design and production.", icon: "🎶", color: T.gold, img: "/images/templates/template-img-37.jpg" },
   { name: "Corporate Summits", desc: "Sophisticated corporate events that inspire, reward, and leave lasting impressions.", icon: "🏛", color: T.gold, img: "/images/templates/template-img-41.jpg" },
   { name: "Birthday Galas", desc: "Personalized birthday celebrations that become the talk of the season.", icon: "🎂", color: T.gold, img: "/images/templates/template-img-39.jpg" },
   { name: "Product Reveals", desc: "Cinematic product unveilings that ignite conversations and media coverage.", icon: "🚀", color: T.gold, img: "/images/templates/template-img-44.jpg" },
   { name: "Destination Events", desc: "Exotic event experiences in the world's most breathtaking locations.", icon: "🌊", color: T.gold, img: "/images/templates/template-img-45.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Azure Coast Wedding", desc: "A seaside ceremony for 600 guests with ocean-view dining and fireworks.", tag: "Wedding", color: T.gold, img: "/images/templates/template-img-44.jpg", stat: "600", emoji: "💍" },
   { name: "Neon Nights 2024", desc: "Mumbai's premier music festival—20,000 attendees, 3 stages, 48 hours of music.", tag: "Festival", color: T.gold, img: "/images/templates/template-img-45.jpg", stat: "20K", emoji: "🎵" },
   { name: "Bloom Summit", desc: "A Fortune 100 company's annual gala reimagined as a floral fantasy world.", tag: "Corporate", color: T.gold, img: "/images/templates/template-img-46.jpg", stat: "1.5K", emoji: "🌸" },
   { name: "Casa Rooftop 40th", desc: "A surprise rooftop birthday under the stars—45 guests, pure magic.", tag: "Birthday", color: T.gold, img: "/images/templates/template-img-47.jpg", stat: "450", emoji: "🎂" },
];

const DEFAULT_CATEGORIES = [
   { label: "Weddings", emoji: "💍" },
   { label: "Conferences", emoji: "🎙" },
   { label: "Concerts", emoji: "🎵" },
   { label: "Exhibitions", emoji: "🖼" },
   { label: "Product Launches", emoji: "🚀" },
   { label: "Corporate", emoji: "💼" },
   { label: "Birthdays", emoji: "🎂" },
   { label: "Galas", emoji: "✨" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Discovery Call", desc: "We understand your vision, goals, and the story you want to tell.", icon: "✦", color: T.gold },
   { step: "02", title: "Concept Design", desc: "Moodboards, palettes, layouts—your event universe takes shape.", icon: "✦", color: T.gold },
   { step: "03", title: "Production", desc: "Every element crafted: décor, staging, tech, logistics, catering.", icon: "✦", color: T.gold },
   { step: "04", title: "Rehearsal", desc: "A full dry-run to ensure flawless, stress-free execution.", icon: "✦", color: T.gold },
   { step: "05", title: "Event Day", desc: "Our team orchestrates every moment so you can live in it.", icon: "✦", color: T.gold },
   { step: "06", title: "Memories", desc: "Curated photos, videos, and content delivered within 48 hours.", icon: "✦", color: T.gold },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Ananya Reddy", role: "Bride, Azure Coast Wedding", text: "Luminary didn't just plan our wedding—they painted a dream. Every single detail was beyond what we imagined.", avatar: "AR", color: T.gold },
   { name: "Vikram Kapoor", role: "CEO, NovaTech", text: "Our product launch became a cultural moment. The design, the execution, the energy—completely world-class.", avatar: "VK", color: T.gold },
   { name: "Seema Jain", role: "Host, Casa Rooftop 40th", text: "I wept the moment I saw the setup. Luminary turned a blank rooftop into an absolute fairytale. Unmatched.", avatar: "SJ", color: T.gold },
   { name: "Rohit Sharma", role: "Director, Bloom Summit", text: "Working with Luminary is effortless. They anticipate everything. Our guests were absolutely blown away.", avatar: "RS", color: T.gold },
];

const DEFAULT_TEAM = [
   { name: "Aisha Verma", role: "Creative Director", badge: "Vision", color: T.gold },
   { name: "Dev Malhotra", role: "Production Head", badge: "Operations", color: T.gold },
   { name: "Priti Nair", role: "Design Lead", badge: "Aesthetics", color: T.gold },
   { name: "Sameer Khan", role: "Tech & Lighting", badge: "Production", color: T.gold },
   { name: "Neha Bose", role: "Client Relations", badge: "Experience", color: T.gold },
   { name: "Aryan Mehta", role: "Logistics Expert", badge: "Execution", color: T.gold },
];

const DEFAULT_PRICING = [
   { name: "Spark", price: "₹75K", desc: "Perfect for intimate celebrations up to 100 guests.", color: T.gold, features: ["Up to 100 guests", "Creative direction", "Day-of coordination", "Décor package", "Event photography"] },
   { name: "Radiance", price: "₹2.2L", desc: "Our signature mid-scale package.", color: T.gold, popular: true, features: ["Up to 400 guests", "Full décor & styling", "Team of 12", "Premium A/V", "Video highlights", "Content delivery"] },
   { name: "Luminary", price: "Custom", desc: "For legendary, boundless experiences.", color: T.gold, features: ["Unlimited scale", "Bespoke universe", "Full production", "Global logistics", "PR & media", "Year-long support"] },
];

const DEFAULT_FAQS = [
   { q: "How far in advance should we book?", a: "For weddings and large events, 8–12 months is ideal. For smaller celebrations, 6–8 weeks typically works well." },
   { q: "Do you handle destination events?", a: "Absolutely. We've produced events in Goa, Udaipur, Maldives, Bali, and across Europe. Our destination team handles all logistics." },
   { q: "What's included in your packages?", a: "All packages include creative direction, vendor management, day-of coordination, and post-event content delivery." },
   { q: "Can you work with existing vendors?", a: "Yes. We collaborate seamlessly with your preferred vendors, or we can introduce you to our vetted partner network." },
   { q: "How is content delivered post-event?", a: "Within 48 hours: curated photo album, highlight video, and a complete social content pack." },
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

const DEFAULT_CLIENTS = ["Taj Hotels", "Infosys", "Zara India", "HDFC Bank", "Nykaa", "Tata Motors", "Google India", "Reliance", "Vogue India", "Netflix India"];

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
   <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }

      .luxury-site {
         font-family: 'Inter', sans-serif;
         background: ${T.cream};
         color: ${T.ink};
         overflow-x: hidden;
      }

      .playfair { font-family: 'Playfair Display', serif; }
      .cormorant { font-family: 'Cormorant Garamond', serif; }

      .gold-line {
         display: block;
         width: 40px;
         height: 1px;
         background: ${T.gold};
      }

      .gold-line-full {
         display: block;
         width: 100%;
         height: 1px;
         background: linear-gradient(90deg, transparent, ${T.gold}, transparent);
      }

      .luxury-input {
         width: 100%;
         padding: 14px 0;
         background: transparent;
         border: none;
         border-bottom: 1px solid ${T.border};
         font-family: 'Inter', sans-serif;
         font-size: 13px;
         color: ${T.ink};
         outline: none;
         transition: border-color 0.3s ease;
         letter-spacing: 0.02em;
      }
      .luxury-input::placeholder { color: ${T.light}; }
      .luxury-input:focus { border-bottom-color: ${T.gold}; }

      .luxury-btn {
         display: inline-flex;
         align-items: center;
         gap: 12px;
         padding: 16px 40px;
         background: transparent;
         border: 1px solid ${T.ink};
         font-family: 'Inter', sans-serif;
         font-size: 11px;
         font-weight: 500;
         letter-spacing: 0.18em;
         text-transform: uppercase;
         color: ${T.ink};
         cursor: pointer;
         transition: all 0.4s ease;
         text-decoration: none;
      }
      .luxury-btn:hover {
         background: ${T.ink};
         color: ${T.cream};
      }

      .luxury-btn-gold {
         background: ${T.gold};
         border-color: ${T.gold};
         color: ${T.white};
      }
      .luxury-btn-gold:hover {
         background: ${T.goldDark};
         border-color: ${T.goldDark};
         color: ${T.white};
      }

      .section-label {
         font-family: 'Inter', sans-serif;
         font-size: 10px;
         font-weight: 500;
         letter-spacing: 0.22em;
         text-transform: uppercase;
         color: ${T.gold};
      }

      .editorial-number {
         font-family: 'Cormorant Garamond', serif;
         font-size: 72px;
         font-weight: 300;
         color: ${T.goldLight};
         line-height: 1;
         position: absolute;
         top: -16px;
         left: -10px;
         pointer-events: none;
         user-select: none;
      }

      .img-overlay-dark::after {
         content: '';
         position: absolute;
         inset: 0;
         background: linear-gradient(to top, rgba(26,26,26,0.72) 0%, rgba(26,26,26,0.15) 60%, transparent 100%);
      }

      .img-hover-zoom {
         overflow: hidden;
      }
      .img-hover-zoom img {
         transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .img-hover-zoom:hover img {
         transform: scale(1.06);
      }

      /* ── RESPONSIVE BREAKPOINTS ─────────────────────────────────────────── */

      /* Container padding */
      .section-container {
         max-width: 1200px;
         margin: 0 auto;
         padding: 0 40px;
      }

      /* Section vertical rhythm */
      .section-pad {
         padding: 100px 0;
      }

      /* Navbar */
      .nav-desktop { display: flex; }
      .nav-mobile { display: none; }
      .nav-cta-desktop { display: block; }

      /* Hero */
      .hero-copy-panel {
         flex: 0 0 48%;
         display: flex;
         flex-direction: column;
         justify-content: center;
         padding: 80px 60px 80px 80px;
         position: relative;
         z-index: 2;
      }
      .hero-mobile-overlay { display: none; }
      .hero-scroll-indicator { display: flex; }

      /* Two-column grids */
      .grid-2col {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 80px;
         align-items: center;
      }
      .grid-2col-start {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 80px;
         align-items: start;
      }

      /* Services 3-col */
      .services-grid {
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         gap: 2px;
      }

      /* Categories 4-col */
      .categories-grid {
         display: grid;
         grid-template-columns: repeat(4, 1fr);
         gap: 1px;
      }

      /* Process 3-col */
      .process-grid {
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         gap: 0;
      }

      /* Pricing 3-col */
      .pricing-grid {
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         gap: 0;
      }

      /* Team 6-col */
      .team-grid {
         display: grid;
         grid-template-columns: repeat(6, 1fr);
         gap: 2px;
      }

      /* Awards 4-col */
      .awards-grid {
         display: grid;
         grid-template-columns: repeat(4, 1fr);
         gap: 0;
      }

      /* Footer 4-col */
      .footer-grid {
         display: grid;
         grid-template-columns: 1.5fr 1fr 1fr 1fr;
         gap: 60px;
         padding-bottom: 52px;
         border-bottom: 1px solid rgba(255,255,255,0.08);
      }

      /* Gallery columns */
      .gallery-cols {
         columns: 3;
         gap: 2px;
      }

      /* Stats inline grid */
      .stats-grid-2x2 {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 0;
      }

      /* Contact form inline grid */
      .contact-name-grid {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 20px;
      }

      /* Why us grid — process border logic */
      .process-cell-border-right { border-right: 1px solid ${T.borderLight}; }
      .process-cell-border-bottom { border-bottom: 1px solid ${T.borderLight}; }
      .pricing-cell-border { border: 1px solid ${T.borderLight}; }

      /* ── TABLET (≤1024px) ──────────────────────────────────────────────── */
      @media (max-width: 1024px) {
         .section-container { padding: 0 28px; }
         .section-pad { padding: 80px 0; }

         .hero-copy-panel { padding: 60px 40px 60px 40px; }

         .team-grid { grid-template-columns: repeat(3, 1fr); }

         .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
         }
      }

      /* ── SMALL TABLET / LARGE MOBILE (≤768px) ──────────────────────────── */
      @media (max-width: 768px) {
         .section-container { padding: 0 20px; }
         .section-pad { padding: 64px 0; }

         /* Navbar */
         .nav-desktop { display: none !important; }
         .nav-cta-desktop { display: none !important; }
         .nav-mobile { display: block !important; }

         /* Hero — hide desktop panel, show mobile overlay */
         .hero-copy-panel { display: none !important; }
         .hero-mobile-overlay { display: block !important; }
         .hero-scroll-indicator { display: none !important; }

         /* 2-col grids → 1-col */
         .grid-2col {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
         }
         .grid-2col-start {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
         }

         /* Services → 1-col */
         .services-grid { grid-template-columns: 1fr !important; }

         /* Categories → 2-col */
         .categories-grid { grid-template-columns: 1fr 1fr !important; }

         /* Process → 1-col */
         .process-grid { grid-template-columns: 1fr !important; }
         .process-cell-border-right { border-right: none !important; }
         .process-cell-border-bottom { border-bottom: 1px solid ${T.borderLight} !important; }

         /* Pricing → 1-col */
         .pricing-grid { grid-template-columns: 1fr !important; }

         /* Team → 2-col */
         .team-grid { grid-template-columns: repeat(2, 1fr) !important; }

         /* Awards → 2-col */
         .awards-grid { grid-template-columns: 1fr 1fr !important; }

         /* Footer → 2-col */
         .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
         }

         /* Gallery → 2-col */
         .gallery-cols { columns: 2 !important; }

         /* Stats 2x2 stays same */
         .stats-grid-2x2 { grid-template-columns: 1fr 1fr !important; }

         /* Contact name grid → 1-col */
         .contact-name-grid { grid-template-columns: 1fr !important; gap: 0 !important; }

         /* Luxury btn full width on small */
         .luxury-btn-block { width: 100%; justify-content: center; }
      }

      /* ── MOBILE (≤480px) ────────────────────────────────────────────────── */
      @media (max-width: 480px) {
         .section-container { padding: 0 16px; }
         .section-pad { padding: 52px 0; }

         /* Categories → 2-col stays, no overflow */
         .categories-grid { grid-template-columns: 1fr 1fr !important; }

         /* Team → 2-col */
         .team-grid { grid-template-columns: repeat(2, 1fr) !important; }

         /* Gallery → 1-col */
         .gallery-cols { columns: 1 !important; }

         /* Awards → 2-col */
         .awards-grid { grid-template-columns: 1fr 1fr !important; }

         /* Footer → 1-col */
         .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }

         /* Hero floating badge — hide on very small */
         .hero-badge { display: none !important; }

         /* Testimonial padding */
         .testimonial-card { padding: 36px 20px !important; }

         /* Shrink editorial number on process */
         .editorial-number { font-size: 48px !important; }
      }
   `}</style>
);

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
   const ref = useRef(null);
   const inView = useInView(ref, { once: true });
   const [val, setVal] = useState(0);
   useEffect(() => {
      if (!inView) return;
      let start = null;
      const go = (ts) => {
         if (!start) start = ts;
         const p = Math.min((ts - start) / 2000, 1);
         setVal(Math.floor(p * to));
         if (p < 1) requestAnimationFrame(go);
         else setVal(to);
      };
      requestAnimationFrame(go);
   }, [inView, to]);
   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── REVEAL VARIANT ──────────────────────────────────────────────────────────
const rv = (i = 0, dir = "up") => ({
   initial: { opacity: 0, y: dir === "up" ? 28 : -28, x: dir === "left" ? -28 : dir === "right" ? 28 : 0 },
   whileInView: { opacity: 1, y: 0, x: 0 },
   viewport: { once: true, margin: "-40px" },
   transition: { duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

// ─── GOLD DIVIDER ─────────────────────────────────────────────────────────────
function GoldDivider({ center = false }) {
   return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, justifyContent: center ? "center" : "flex-start" }}>
         {center && <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${T.gold})` }} />}
         <div style={{ width: 40, height: 1, background: T.gold, flexShrink: 0 }} />
         <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1px solid ${T.gold}`, flexShrink: 0 }} />
         <div style={{ width: 40, height: 1, background: T.gold, flexShrink: 0 }} />
         {center && <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />}
      </div>
   );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee({ items, speed = 40, reverse = false }) {
   return (
      <div style={{ overflow: "hidden" }}>
         <motion.div
            style={{ display: "inline-flex", gap: 48, alignItems: "center", whiteSpace: "nowrap" }}
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted, flexShrink: 0 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.gold, display: "inline-block" }} />
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EventTemplate4({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length && d.services.some(s => s.name) ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length && d.projects.some(p => p.name) ? d.projects : DEFAULT_PROJECTS;
   const CLIENTS = d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name) ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;
   const CATEGORIES = d.eventCategories?.length > 0 ? d.eventCategories.map((c, i) => ({ ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length], label: c.name })) : DEFAULT_CATEGORIES;
   const PROCESS = d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step) ? d.eventPlanningProcess.map((p, i) => ({ ...DEFAULT_PROCESS[i % DEFAULT_PROCESS.length], title: p.step, desc: p.desc })) : DEFAULT_PROCESS;
   const TESTIMONIALS = d.testimonials?.length > 0 && d.testimonials.some(t => t.review) ? d.testimonials.map((t, i) => ({ name: t.clientName, role: t.event, text: t.review, avatar: "T", color: T.gold })) : DEFAULT_TESTIMONIALS;
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
   const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
   const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

   useEffect(() => {
      const t = setInterval(() => setActiveProject(p => (p + 1) % projects.length), 5500);
      return () => clearInterval(t);
   }, [projects.length]);

   useEffect(() => {
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
      return () => clearInterval(t);
   }, [TESTIMONIALS.length]);

   // Close menu on resize to desktop
   useEffect(() => {
      const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
   }, []);

   return (
      <div className="luxury-site">
         <GlobalStyles />

         {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
               position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
               padding: "20px 40px",
               display: "flex", alignItems: "center", justifyContent: "space-between",
               background: "rgba(248,245,240,0.92)",
               backdropFilter: "blur(20px)",
               borderBottom: `1px solid ${T.borderLight}`,
            }}
         >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
               <div style={{ width: 28, height: 28, border: `1px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 14, fontWeight: 400, color: T.gold }}>L</span>
               </div>
               <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink }}>
                  {d.agencyName}
               </span>
            </div>

            {/* Desktop Nav */}
            <nav className="nav-desktop" style={{ alignItems: "center", gap: 36 }}>
               {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`}
                     style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: T.charcoal, textDecoration: "none", transition: "color 0.3s" }}
                     onMouseEnter={e => e.target.style.color = T.gold}
                     onMouseLeave={e => e.target.style.color = T.charcoal}>
                     {item}
                  </a>
               ))}
            </nav>

            <div className="nav-cta-desktop">
               <motion.a href="#contact" className="luxury-btn"
                  style={{ fontSize: 10, padding: "12px 28px" }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  Enquire Now
                  <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
               </motion.a>
            </div>

            {/* Hamburger — shown via CSS class */}
            <button
               className="nav-mobile"
               style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: T.ink }}
               onClick={() => setMenuOpen(!menuOpen)}
               aria-label="Toggle menu">
               <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                  {menuOpen ? (
                     <>
                        <line x1="1" y1="1" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="21" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" />
                     </>
                  ) : (
                     <>
                        <line x1="0" y1="2" x2="22" y2="2" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="0" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" />
                     </>
                  )}
               </svg>
            </button>

            <AnimatePresence>
               {menuOpen && (
                  <motion.div
                     initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                     style={{
                        position: "absolute", top: "100%", left: 0, right: 0,
                        background: T.cream, borderBottom: `1px solid ${T.borderLight}`,
                        padding: "24px 20px",
                     }}>
                     {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                           style={{
                              display: "block", padding: "14px 0",
                              fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
                              color: T.charcoal, textDecoration: "none",
                              borderBottom: `1px solid ${T.borderLight}`,
                           }}>
                           {item}
                        </a>
                     ))}
                     <a href="#contact" onClick={() => setMenuOpen(false)}
                        style={{
                           display: "block", marginTop: 20, padding: "14px 0", textAlign: "center",
                           fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
                           color: T.white, background: T.ink, textDecoration: "none",
                        }}>
                        Enquire Now
                     </a>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.header>

         {/* ── HERO ───────────────────────────────────────────────────────── */}
         <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", position: "relative", overflow: "hidden", paddingTop: 80 }}>
            {/* Desktop left copy panel */}
            <motion.div
               className="hero-copy-panel"
               style={{ y: heroY, opacity: heroOpacity }}
            >
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <span className="section-label" style={{ marginBottom: 24, display: "block" }}>Now Booking 2025 — 2026</span>
               </motion.div>

               <GoldDivider />

               <motion.h1
                  className="playfair"
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: "clamp(38px, 4.5vw, 68px)", fontWeight: 400, lineHeight: 1.1, color: T.ink, letterSpacing: "-0.01em", marginBottom: 28 }}
               >
                  Crafting<br />
                  <em style={{ fontStyle: "italic", color: T.charcoal }}>Extraordinary</em><br />
                  Experiences
               </motion.h1>

               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                  style={{ fontSize: 15, lineHeight: 1.8, color: T.muted, fontWeight: 300, maxWidth: 380, marginBottom: 44 }}>
                  {d.tagline}
               </motion.p>

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                  style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
                  <a href="#contact" className="luxury-btn luxury-btn-gold"
                     style={{ border: `1px solid ${T.gold}`, background: T.gold, color: T.white }}>
                     Begin Your Journey
                  </a>
                  <a href="#work" className="luxury-btn" style={{ fontSize: 10 }}>
                     View Portfolio
                  </a>
               </motion.div>

               {/* Stats row */}
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                  style={{ display: "flex", gap: 44, flexWrap: "wrap", borderTop: `1px solid ${T.borderLight}`, paddingTop: 36 }}>
                  {[
                     { v: 600, s: "+", l: "Events" },
                     { v: 98, s: "%", l: "Satisfaction" },
                     { v: 11, s: "+", l: "Years" },
                  ].map((st, i) => (
                     <div key={i}>
                        <div className="cormorant" style={{ fontSize: 40, fontWeight: 300, lineHeight: 1, color: T.ink, marginBottom: 4 }}>
                           <Counter to={st.v} suffix={st.s} />
                        </div>
                        <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, fontWeight: 400 }}>{st.l}</div>
                     </div>
                  ))}
               </motion.div>
            </motion.div>

            {/* Right image panel — full width on mobile */}
            <div style={{ flex: 1, position: "relative", minHeight: "100vh" }}>
               <motion.div
                  initial={{ scale: 1.05, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "absolute", inset: 0 }}>
                  <img
                     src={d.heroImage || "/images/templates/template-img-38.jpg"}
                     alt="Hero Event"
                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(248,245,240,0.6) 0%, transparent 35%), linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 50%)" }} />
               </motion.div>

               {/* Mobile hero text overlay */}
               <div className="hero-mobile-overlay" style={{ position: "absolute", bottom: 60, left: 20, right: 20, zIndex: 2 }}>
                  <span className="section-label" style={{ color: T.goldLight, marginBottom: 16, display: "block" }}>Now Booking 2025 — 2026</span>
                  <h1 className="playfair" style={{ fontSize: "clamp(32px, 9vw, 48px)", fontWeight: 400, color: T.white, lineHeight: 1.1, marginBottom: 20 }}>
                     Crafting<br /><em>Extraordinary</em><br />Experiences
                  </h1>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.75)", fontWeight: 300, marginBottom: 28, maxWidth: 400 }}>
                     {d.tagline}
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                     <a href="#contact" className="luxury-btn" style={{ borderColor: T.gold, background: T.gold, color: T.white, fontSize: 10, padding: "12px 24px" }}>
                        Begin Your Journey
                     </a>
                     <a href="#work" className="luxury-btn" style={{ borderColor: T.white, color: T.white, fontSize: 10, padding: "12px 24px" }}>
                        View Portfolio
                     </a>
                  </div>
               </div>

               {/* Floating rating badge */}
               <motion.div
                  className="hero-badge"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  style={{
                     position: "absolute", bottom: 48, right: 40, zIndex: 3,
                     background: T.white, padding: "18px 22px",
                     border: `1px solid ${T.borderLight}`,
                  }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                     {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: T.gold, fontSize: 11 }}>★</span>
                     ))}
                  </div>
                  <div className="cormorant" style={{ fontSize: 24, fontWeight: 400, lineHeight: 1, color: T.ink, marginBottom: 2 }}>5.0</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted }}>980+ Reviews</div>
               </motion.div>
            </div>

            {/* Scroll indicator — hidden on mobile via CSS class */}
            <motion.div
               className="hero-scroll-indicator"
               animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
               style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 3 }}>
               <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: T.muted }}>Scroll</span>
               <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${T.muted}, transparent)` }} />
            </motion.div>
         </section>

         {/* ── MARQUEE ────────────────────────────────────────────────────── */}
         <section style={{ padding: "18px 0", background: T.white, borderTop: `1px solid ${T.borderLight}`, borderBottom: `1px solid ${T.borderLight}`, overflow: "hidden" }}>
            <Marquee items={CLIENTS} speed={36} />
         </section>

         {/* ── ABOUT ──────────────────────────────────────────────────────── */}
         <section id="about" className="section-pad" style={{ background: T.offwhite }}>
            <div className="section-container">
               <div className="grid-2col">
                  {/* Left: magazine-style heading */}
                  <motion.div {...rv(0)}>
                     <span className="section-label" style={{ marginBottom: 20, display: "block" }}>Our Story</span>
                     <div style={{ width: 1, height: 60, background: T.gold, marginBottom: 24 }} />
                     <h2 className="playfair" style={{ fontSize: "clamp(34px, 4vw, 62px)", fontWeight: 400, lineHeight: 1.1, color: T.ink, marginBottom: 0 }}>
                        {d.aboutUsTitle || "Creating Joy,"}
                        <br />
                        <em style={{ fontStyle: "italic" }}>One Event</em>
                        <br />
                        at a Time.
                     </h2>

                     <div className="stats-grid-2x2" style={{ marginTop: 48 }}>
                        {[
                           { v: 600, s: "+", l: "Events Produced" },
                           { v: 11, s: "+", l: "Years of Excellence" },
                           { v: 98, s: "%", l: "Client Delight" },
                           { v: 40, s: "+", l: "Cities Reached" },
                        ].map((st, i) => (
                           <div key={i} style={{ borderTop: `1px solid ${T.borderLight}`, paddingTop: 20, paddingBottom: 8 }}>
                              <div className="cormorant" style={{ fontSize: 36, fontWeight: 300, color: T.ink, lineHeight: 1, marginBottom: 6 }}>
                                 <Counter to={st.v} suffix={st.s} />
                              </div>
                              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted }}>{st.l}</div>
                           </div>
                        ))}
                     </div>
                  </motion.div>

                  {/* Right: image + bio */}
                  <motion.div {...rv(1)}>
                     <div style={{ position: "relative" }} className="img-hover-zoom">
                        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
                           <img src={d.aboutImage || "/images/templates/template-img-39.jpg"} alt="About"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        {/* Gold corner accents */}
                        <div style={{ position: "absolute", top: -10, right: -10, width: 40, height: 40, borderTop: `2px solid ${T.gold}`, borderRight: `2px solid ${T.gold}` }} />
                        <div style={{ position: "absolute", bottom: -10, left: -10, width: 40, height: 40, borderBottom: `2px solid ${T.gold}`, borderLeft: `2px solid ${T.gold}` }} />
                     </div>

                     <div style={{ marginTop: 32, paddingTop: 28, borderTop: `1px solid ${T.borderLight}` }}>
                        <p style={{ fontSize: 15, lineHeight: 1.85, color: T.muted, fontWeight: 300, marginBottom: 24 }}>
                           {d.bio}
                        </p>
                        <a href="#contact" className="luxury-btn" style={{ fontSize: 10, padding: "12px 28px" }}>
                           Let's Build Together
                        </a>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── SERVICES ───────────────────────────────────────────────────── */}
         <section id="services" className="section-pad" style={{ background: T.cream }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 64 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>What We Craft</span>
                  <GoldDivider center />
                  <motion.h2 {...rv(1)} className="playfair"
                     style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink, lineHeight: 1.15 }}>
                     Every Event Type,<br />
                     <em style={{ fontStyle: "italic" }}>Masterfully Executed</em>
                  </motion.h2>
               </div>

               <div className="services-grid">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...rv(i * 0.1)}
                        style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                        className="img-hover-zoom"
                        whileHover="hover">
                        <div style={{ height: 280, position: "relative" }}>
                           <img src={svc.img || "/images/templates/template-img-40.jpg"} alt={svc.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                           <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.2) 60%, transparent 100%)" }} />
                           <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
                              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.goldLight, marginBottom: 8 }}>{svc.icon}</div>
                              <h3 className="playfair" style={{ fontSize: 20, fontWeight: 500, color: T.white, marginBottom: 8 }}>{svc.name}</h3>
                              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, fontWeight: 300 }}>{svc.desc}</p>
                           </div>
                           <motion.div
                              variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
                              initial="initial"
                              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: T.gold, transformOrigin: "left" }}
                              transition={{ duration: 0.3 }}
                           />
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ─────────────────────────────────────────────── */}
         <section style={{ padding: "80px 0", background: T.ink }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 52 }}>
                  <span className="section-label" style={{ color: T.goldLight, marginBottom: 20, display: "block" }}>Event Types</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(28px, 3vw, 46px)", fontWeight: 400, color: T.white }}>
                     Every Occasion,<br /><em style={{ fontStyle: "italic" }}>We're Ready</em>
                  </h2>
               </div>

               <div className="categories-grid">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div key={i} {...rv(i * 0.08)}
                        whileHover={{ y: -4 }}
                        style={{
                           padding: "36px 20px",
                           border: `1px solid rgba(201,169,110,0.2)`,
                           cursor: "pointer",
                           transition: "border-color 0.3s",
                           textAlign: "center",
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = T.gold}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)"}>
                        <div style={{ fontSize: 28, marginBottom: 14 }}>{cat.emoji}</div>
                        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: T.white }}>{cat.label}</div>
                        <div style={{ width: 20, height: 1, background: T.gold, margin: "14px auto 0" }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO ──────────────────────────────────────────────────── */}
         <section id="work" className="section-pad" style={{ background: T.cream }}>
            <div className="section-container">
               <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
                  <div>
                     <span className="section-label" style={{ marginBottom: 16, display: "block" }}>Our Portfolio</span>
                     <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink }}>
                        Events That<br /><em style={{ fontStyle: "italic" }}>Became Legends</em>
                     </h2>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                     {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveProject(i)}
                           style={{
                              height: 2, width: i === activeProject ? 32 : 12,
                              background: i === activeProject ? T.gold : T.borderLight,
                              border: "none", cursor: "pointer", transition: "all 0.4s ease", padding: 0,
                           }} />
                     ))}
                  </div>
               </div>

               {/* Featured */}
               <AnimatePresence mode="wait">
                  <motion.div key={activeProject}
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                     style={{ position: "relative", height: "55vmin", minHeight: 280, maxHeight: 520, cursor: "pointer", marginBottom: 2, overflow: "hidden" }}
                     className="img-hover-zoom"
                     onClick={() => setActiveProject((activeProject + 1) % projects.length)}>
                     <img src={projects[activeProject].img || "/images/templates/template-img-44.jpg"} alt={projects[activeProject].name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                     <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.15) 55%, transparent 100%)" }} />

                     <div style={{ position: "absolute", top: 20, left: 20 }}>
                        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: T.goldLight, border: `1px solid ${T.gold}`, padding: "6px 14px" }}>
                           {projects[activeProject].emoji} {projects[activeProject].tag}
                        </span>
                     </div>

                     <div style={{ position: "absolute", top: 20, right: 20, textAlign: "right" }}>
                        <div className="cormorant" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, color: T.white, lineHeight: 1 }}>{projects[activeProject].stat}</div>
                        <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>guests</div>
                     </div>

                     <div style={{ position: "absolute", bottom: 28, left: 20, right: 20 }}>
                        <h3 className="playfair" style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 400, color: T.white, marginBottom: 10 }}>
                           {projects[activeProject].name}
                        </h3>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>{projects[activeProject].desc}</p>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnails */}
               <div style={{ display: "grid", gridTemplateColumns: `repeat(${projects.length}, 1fr)`, gap: 2 }}>
                  {projects.map((p, i) => (
                     <motion.div key={i} onClick={() => setActiveProject(i)}
                        style={{
                           position: "relative", height: 72, cursor: "pointer", overflow: "hidden",
                           opacity: i === activeProject ? 1 : 0.45,
                           outline: i === activeProject ? `2px solid ${T.gold}` : "none",
                           outlineOffset: -2,
                        }}
                        whileHover={{ opacity: 0.85 }}>
                        <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name}
                           style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "rgba(26,26,26,0.4)" }} />
                        <div style={{ position: "absolute", bottom: 6, left: 8, right: 8, fontSize: 10, color: T.white, fontWeight: 500, letterSpacing: "0.04em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                           {p.name}
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PROCESS ────────────────────────────────────────────────────── */}
         <section id="process" className="section-pad" style={{ background: T.offwhite }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>How We Work</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink }}>
                     The Luminary<br /><em style={{ fontStyle: "italic" }}>Process</em>
                  </h2>
               </div>

               <div className="process-grid">
                  {PROCESS.map((step, i) => {
                     const col = i % 3;
                     const row = Math.floor(i / 3);
                     const totalRows = Math.ceil(PROCESS.length / 3);
                     return (
                        <motion.div key={i} {...rv(i * 0.1)}
                           className={[
                              col < 2 ? "process-cell-border-right" : "",
                              row < totalRows - 1 ? "process-cell-border-bottom" : "",
                           ].join(" ")}
                           style={{ padding: "44px 36px", position: "relative" }}
                           whileHover={{ background: T.white }}
                           transition={{ duration: 0.3 }}>
                           <div className="editorial-number">{step.step}</div>
                           <div style={{ position: "relative", zIndex: 1 }}>
                              <div style={{ width: 32, height: 1, background: T.gold, marginBottom: 20 }} />
                              <h3 className="playfair" style={{ fontSize: 20, fontWeight: 500, color: T.ink, marginBottom: 12 }}>{step.title}</h3>
                              <p style={{ fontSize: 14, lineHeight: 1.75, color: T.muted, fontWeight: 300 }}>{step.desc}</p>
                           </div>
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* ── WHY US / STATS ─────────────────────────────────────────────── */}
         <section className="section-pad" style={{ background: T.cream, borderTop: `1px solid ${T.borderLight}`, borderBottom: `1px solid ${T.borderLight}` }}>
            <div className="section-container">
               <div className="grid-2col-start" style={{ gap: "80px" }}>
                  <motion.div {...rv(0)}>
                     <span className="section-label" style={{ marginBottom: 20, display: "block" }}>Why Luminary</span>
                     <div style={{ width: 1, height: 52, background: T.gold, marginBottom: 24 }} />
                     <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink, marginBottom: 28 }}>
                        The Numbers<br /><em style={{ fontStyle: "italic" }}>Behind the Magic</em>
                     </h2>
                     <p style={{ fontSize: 15, lineHeight: 1.85, color: T.muted, fontWeight: 300, marginBottom: 36 }}>
                        Over a decade of crafting unforgettable moments for the world's most discerning clients. Our track record speaks through every celebration.
                     </p>
                     <div className="stats-grid-2x2">
                        {[
                           { v: 600, s: "+", l: "Events Crafted" },
                           { v: 98, s: "%", l: "Client Delight" },
                           { v: 980, s: "+", l: "5‑Star Reviews" },
                           { v: 40, s: "+", l: "Cities Reached" },
                        ].map((st, i) => (
                           <div key={i} style={{
                              padding: "28px 0",
                              borderTop: `1px solid ${T.borderLight}`,
                              borderRight: i % 2 === 0 ? `1px solid ${T.borderLight}` : "none",
                              paddingRight: i % 2 === 0 ? 28 : 0,
                              paddingLeft: i % 2 === 1 ? 28 : 0,
                           }}>
                              <div className="cormorant" style={{ fontSize: 44, fontWeight: 300, lineHeight: 1, color: T.ink, marginBottom: 8 }}>
                                 <Counter to={st.v} suffix={st.s} />
                              </div>
                              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted }}>{st.l}</div>
                           </div>
                        ))}
                     </div>
                  </motion.div>

                  <motion.div {...rv(1)} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                     {[
                        { title: "Experience-First", desc: "We design for emotion first. Every decision optimizes for the feeling your guests will carry home long after the evening ends." },
                        { title: "Zero Stress", desc: "From first call to last spotlight—we own every detail so you can be fully present in the moment you've been waiting for." },
                        { title: "On-Demand Excellence", desc: "Same-week microcelebrations or year-planned grand productions—we deliver both with absolute precision and care." },
                     ].map((item, i) => (
                        <div key={i} style={{ padding: "36px 0", borderBottom: i < 2 ? `1px solid ${T.borderLight}` : "none" }}>
                           <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                              <div style={{ width: 20, height: 1, background: T.gold, marginTop: 11, flexShrink: 0 }} />
                              <div>
                                 <h4 className="playfair" style={{ fontSize: 18, fontWeight: 500, color: T.ink, marginBottom: 10 }}>{item.title}</h4>
                                 <p style={{ fontSize: 14, lineHeight: 1.8, color: T.muted, fontWeight: 300 }}>{item.desc}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── PRICING ────────────────────────────────────────────────────── */}
         <section id="pricing" className="section-pad" style={{ background: T.offwhite }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 64 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>Packages</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink }}>
                     Choose Your<br /><em style={{ fontStyle: "italic" }}>Perfect Plan</em>
                  </h2>
               </div>

               <div className="pricing-grid">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i} {...rv(i * 0.15)}
                        style={{
                           padding: "52px 40px",
                           background: pkg.popular ? T.ink : T.white,
                           border: pkg.popular ? "none" : `1px solid ${T.borderLight}`,
                           position: "relative",
                        }}>
                        {pkg.popular && (
                           <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.gold }} />
                        )}
                        {pkg.popular && (
                           <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: 24 }}>
                              ✦ Most Popular
                           </div>
                        )}
                        <h3 className="playfair" style={{ fontSize: 26, fontWeight: 400, color: pkg.popular ? T.white : T.ink, marginBottom: 10 }}>{pkg.name}</h3>
                        <p style={{ fontSize: 13, color: pkg.popular ? "rgba(255,255,255,0.5)" : T.muted, fontWeight: 300, marginBottom: 28, lineHeight: 1.6 }}>{pkg.desc}</p>
                        <div style={{ borderTop: `1px solid ${pkg.popular ? "rgba(255,255,255,0.12)" : T.borderLight}`, borderBottom: `1px solid ${pkg.popular ? "rgba(255,255,255,0.12)" : T.borderLight}`, padding: "20px 0", marginBottom: 28 }}>
                           <span className="cormorant" style={{ fontSize: 52, fontWeight: 300, color: pkg.popular ? T.white : T.ink, lineHeight: 1 }}>{pkg.price}</span>
                           {pkg.price !== "Custom" && <span style={{ fontSize: 12, color: pkg.popular ? "rgba(255,255,255,0.4)" : T.muted, marginLeft: 8 }}>onwards</span>}
                        </div>
                        <ul style={{ listStyle: "none", marginBottom: 36, display: "flex", flexDirection: "column", gap: 14 }}>
                           {pkg.features.map((f, j) => (
                              <li key={j} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: pkg.popular ? "rgba(255,255,255,0.7)" : T.charcoal }}>
                                 <span style={{ width: 16, height: 1, background: T.gold, flexShrink: 0 }} />
                                 {f}
                              </li>
                           ))}
                        </ul>
                        <button className={pkg.popular ? "luxury-btn luxury-btn-gold" : "luxury-btn"}
                           style={{
                              width: "100%", justifyContent: "center",
                              ...(pkg.popular ? { background: T.gold, borderColor: T.gold, color: T.white } : { borderColor: T.ink, color: T.ink }),
                              fontSize: 10, padding: "14px 20px",
                           }}>
                           Get Started
                        </button>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
         <section className="section-pad" style={{ background: T.cream }}>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
               <div style={{ textAlign: "center", marginBottom: 60 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>Client Words</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink }}>
                     Voices That<br /><em style={{ fontStyle: "italic" }}>Inspire Us Daily</em>
                  </h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial}
                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
                     className="testimonial-card"
                     style={{ textAlign: "center", padding: "56px 40px", background: T.white, border: `1px solid ${T.borderLight}`, position: "relative" }}>
                     <div className="cormorant" style={{ position: "absolute", top: 16, left: 20, fontSize: 100, fontWeight: 300, color: T.borderLight, lineHeight: 1, userSelect: "none" }}>"</div>

                     <div style={{ width: 24, height: 1, background: T.gold, margin: "0 auto 28px" }} />
                     <p className="playfair" style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.6, color: T.charcoal, marginBottom: 36, position: "relative", zIndex: 1 }}>
                        "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                     </p>
                     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                        <div style={{ width: 36, height: 36, border: `1px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                           <span style={{ fontSize: 11, fontWeight: 500, color: T.gold }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}</span>
                        </div>
                        <div style={{ textAlign: "left" }}>
                           <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, marginBottom: 2 }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                           <div style={{ fontSize: 11, color: T.muted, letterSpacing: "0.06em" }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>

               <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        style={{
                           height: 1, width: i === activeTestimonial % TESTIMONIALS.length ? 28 : 12,
                           background: i === activeTestimonial % TESTIMONIALS.length ? T.gold : T.borderLight,
                           border: "none", cursor: "pointer", transition: "all 0.4s ease", padding: 0,
                        }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ───────────────────────────────────────────────────────── */}
         <section className="section-pad" style={{ background: T.offwhite }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 64 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>The Team</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink }}>
                     The Visionaries<br /><em style={{ fontStyle: "italic" }}>Behind the Magic</em>
                  </h2>
               </div>

               <div className="team-grid">
                  {TEAM.map((member, i) => (
                     <motion.div key={i} {...rv(i * 0.1)}
                        style={{ cursor: "pointer" }}
                        whileHover="hover">
                        <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: T.creamDark }}>
                           <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span className="cormorant" style={{ fontSize: 56, fontWeight: 300, color: T.goldLight }}>{member.name[0]}</span>
                           </div>
                           <motion.div
                              variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                              initial="initial"
                              style={{ position: "absolute", inset: 0, border: `2px solid ${T.gold}` }}
                              transition={{ duration: 0.2 }}
                           />
                        </div>
                        <div style={{ padding: "14px 4px" }}>
                           <div style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: T.gold, marginBottom: 4 }}>{member.badge}</div>
                           <div style={{ fontSize: 14, fontWeight: 500, color: T.ink, marginBottom: 2 }}>{member.name}</div>
                           <div style={{ fontSize: 11, color: T.muted }}>{member.role}</div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ────────────────────────────────────────────────────── */}
         <section className="section-pad" style={{ background: T.cream }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 64 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>Gallery</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink }}>
                     Glimpses of<br /><em style={{ fontStyle: "italic" }}>Pure Magic</em>
                  </h2>
               </div>

               <div className="gallery-cols">
                  {GALLERY.map((img, i) => (
                     <motion.div key={i} {...rv(i * 0.08)}
                        onClick={() => setLightbox(img)}
                        style={{
                           breakInside: "avoid",
                           position: "relative",
                           marginBottom: 2,
                           cursor: "pointer",
                           overflow: "hidden",
                           height: i % 3 === 0 ? 260 : i % 3 === 1 ? 180 : 220,
                        }}
                        className="img-hover-zoom"
                        whileHover="hovered">
                        <img src={img} alt={`Gallery ${i + 1}`}
                           style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        <motion.div
                           variants={{ hovered: { opacity: 1 }, initial: { opacity: 0 } }}
                           initial="initial"
                           style={{ position: "absolute", inset: 0, background: "rgba(26,26,26,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}
                           transition={{ duration: 0.3 }}>
                           <div style={{ width: 32, height: 32, border: `1px solid ${T.white}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: 16, color: T.white }}>+</span>
                           </div>
                        </motion.div>
                     </motion.div>
                  ))}
               </div>
            </div>

            <AnimatePresence>
               {lightbox && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,26,26,0.95)", padding: "20px" }}
                     onClick={() => setLightbox(null)}>
                     <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                        src={lightbox} alt="Gallery"
                        style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain" }} />
                     <button onClick={() => setLightbox(null)}
                        style={{ position: "absolute", top: 20, right: 20, background: "none", border: `1px solid rgba(255,255,255,0.3)`, color: T.white, cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                        ✕
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── AWARDS & RECOGNITION ──────────────────────────────────────── */}
         <section style={{ padding: "72px 0", background: T.ink, borderTop: `1px solid rgba(201,169,110,0.2)` }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <span className="section-label" style={{ color: T.goldLight, marginBottom: 16, display: "block" }}>Recognition</span>
                  <h2 className="playfair" style={{ fontSize: "clamp(26px, 2.5vw, 32px)", fontWeight: 400, color: T.white }}>Awards & <em style={{ fontStyle: "italic" }}>Accolades</em></h2>
               </div>
               <div className="awards-grid">
                  {[
                     { award: "Best Wedding Planner", year: "2024", body: "India Event Awards" },
                     { award: "Top Event Agency", year: "2023", body: "Vogue India" },
                     { award: "Excellence in Production", year: "2023", body: "Event Pro Guild" },
                     { award: "Luxury Brand of the Year", year: "2022", body: "Times of India" },
                  ].map((a, i) => (
                     <motion.div key={i} {...rv(i * 0.1)}
                        style={{
                           padding: "32px 20px",
                           borderRight: i < 3 ? `1px solid rgba(201,169,110,0.15)` : "none",
                           textAlign: "center",
                        }}>
                        <div style={{ fontSize: 22, marginBottom: 12 }}>✦</div>
                        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: T.white, marginBottom: 8 }}>{a.award}</div>
                        <div style={{ width: 20, height: 1, background: T.gold, margin: "0 auto 10px" }} />
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{a.body} · {a.year}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── FAQ ────────────────────────────────────────────────────────── */}
         <section className="section-pad" style={{ background: T.offwhite }}>
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px" }}>
               <div style={{ textAlign: "center", marginBottom: 64 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>FAQ</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(30px, 3.5vw, 52px)", fontWeight: 400, color: T.ink }}>
                     Everything You<br /><em style={{ fontStyle: "italic" }}>Want to Know</em>
                  </h2>
               </div>

               <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {FAQS.map((faq, i) => (
                     <motion.div key={i} {...rv(i * 0.08)}
                        style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                        <button
                           onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                           style={{
                              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                           }}>
                           <span style={{ fontSize: 15, fontWeight: 400, color: T.ink, flex: 1, paddingRight: 20, lineHeight: 1.5 }}>{faq.q}</span>
                           <motion.span
                              animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              style={{ fontSize: 20, color: T.gold, fontWeight: 300, flexShrink: 0, lineHeight: 1 }}>
                              +
                           </motion.span>
                        </button>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                                 <div style={{ paddingBottom: 24, fontSize: 14, lineHeight: 1.85, color: T.muted, fontWeight: 300 }}>
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

         {/* ── CONTACT ────────────────────────────────────────────────────── */}
         <section id="contact" className="section-pad" style={{ background: T.cream }}>
            <div className="section-container">
               <div style={{ textAlign: "center", marginBottom: 72 }}>
                  <span className="section-label" style={{ marginBottom: 20, display: "block" }}>Let's Create</span>
                  <GoldDivider center />
                  <h2 className="playfair" style={{ fontSize: "clamp(30px, 4vw, 60px)", fontWeight: 400, color: T.ink }}>
                     Ready to Create<br />
                     <em style={{ fontStyle: "italic" }}>Something Extraordinary?</em>
                  </h2>
               </div>

               <div className="grid-2col-start">
                  {/* Info */}
                  <div>
                     <p style={{ fontSize: 15, lineHeight: 1.85, color: T.muted, fontWeight: 300, marginBottom: 44 }}>
                        Every great event begins with a conversation. Tell us your vision—we'll handle everything else.
                     </p>

                     {[
                        { label: "Email", val: d.contactEmail },
                        { label: "Phone", val: d.phone || "+91 98765 43210" },
                        { label: "Studio", val: d.address },
                     ].map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 20, padding: "22px 0", borderBottom: `1px solid ${T.borderLight}` }}>
                           <div style={{ width: 20, height: 1, background: T.gold, marginTop: 11, flexShrink: 0 }} />
                           <div>
                              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: 6 }}>{item.label}</div>
                              <div style={{ fontSize: 14, color: T.charcoal, fontWeight: 400, wordBreak: "break-word" }}>{item.val}</div>
                           </div>
                        </div>
                     ))}

                     <div style={{ marginTop: 44, padding: "32px", background: T.ink, textAlign: "center" }}>
                        <div className="cormorant" style={{ fontSize: 44, fontWeight: 300, color: T.white, lineHeight: 1, marginBottom: 6 }}>600+</div>
                        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.gold }}>Extraordinary Events</div>
                        <div style={{ width: 20, height: 1, background: T.gold, margin: "14px auto 0" }} />
                     </div>
                  </div>

                  {/* Form */}
                  <motion.div {...rv(1)}>
                     <h3 className="playfair" style={{ fontSize: 26, fontWeight: 400, color: T.ink, marginBottom: 36 }}>Tell us about your event</h3>
                     <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        <div className="contact-name-grid">
                           <input placeholder="Your Name" className="luxury-input" />
                           <input placeholder="Brand / Company" className="luxury-input" />
                        </div>
                        <input placeholder="Email Address" className="luxury-input" style={{ marginTop: 20 }} />
                        <select className="luxury-input" style={{ marginTop: 20, cursor: "pointer" }}>
                           <option value="">Event Type</option>
                           {CATEGORIES.map(c => <option key={c.label}>{c.emoji} {c.label}</option>)}
                        </select>
                        <textarea rows={5} placeholder="Describe your vision..." className="luxury-input"
                           style={{ marginTop: 20, resize: "none" }} />
                        <motion.button
                           className="luxury-btn luxury-btn-gold"
                           style={{ marginTop: 36, width: "100%", justifyContent: "center", fontSize: 10, padding: "18px 20px", cursor: "pointer" }}
                           whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                           Let's Make It Happen
                           <span style={{ width: 24, height: 1, background: "currentColor", display: "inline-block" }} />
                        </motion.button>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── FOOTER ─────────────────────────────────────────────────────── */}
         <footer style={{ background: T.ink, padding: "72px 0 36px" }}>
            <div className="section-container">
               <div className="footer-grid">
                  <div>
                     <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 28, height: 28, border: `1px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                           <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 14, color: T.gold }}>L</span>
                        </div>
                        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.white }}>
                           {d.agencyName}
                        </span>
                     </div>
                     <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.35)", fontWeight: 300, marginBottom: 28 }}>{d.tagline}</p>
                     <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {["in", "tw", "ig", "yt"].map(s => (
                           <a key={s} href="#"
                              style={{
                                 width: 30, height: 30, border: `1px solid rgba(201,169,110,0.3)`,
                                 display: "flex", alignItems: "center", justifyContent: "center",
                                 fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                                 color: T.goldLight, textDecoration: "none", transition: "all 0.3s",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = T.gold; e.currentTarget.style.color = T.white; e.currentTarget.style.borderColor = T.gold; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = T.goldLight; e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}>
                              {s}
                           </a>
                        ))}
                     </div>
                  </div>

                  {[
                     { title: "Services", links: ["Weddings", "Festivals", "Corporate", "Birthdays"] },
                     { title: "Company", links: ["About Us", "Portfolio", "Our Team", "Blog"] },
                     { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
                  ].map(col => (
                     <div key={col.title}>
                        <h5 style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: 20 }}>{col.title}</h5>
                        <ul style={{ listStyle: "none" }}>
                           {col.links.map(link => (
                              <li key={link} style={{ marginBottom: 12 }}>
                                 <a href="#" style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.3s", letterSpacing: "0.04em" }}
                                    onMouseEnter={e => e.target.style.color = T.white}
                                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}>
                                    {link}
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>

               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28, flexWrap: "wrap", gap: 12 }}>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>{d.footerCopyright}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                     <div style={{ width: 20, height: 1, background: T.gold }} />
                     <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>Crafted for every celebration</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}