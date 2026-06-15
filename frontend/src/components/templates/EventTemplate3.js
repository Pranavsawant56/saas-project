import { useState, useEffect, useRef } from "react";
import {
   motion,
   useScroll,
   useTransform,
   AnimatePresence,
   useInView,
   useMotionValue,
   useSpring,
} from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
   orange: "#FF6B35",
   coral: "#FF4E6A",
   yellow: "#FFD93D",
   turquoise: "#06D6A0",
   sky: "#4CC9F0",
   lavender: "#9B5DE5",
   mint: "#38EF7D",
   warm: "#FFF8F0",
   white: "#FFFFFF",
   ink: "#1A0A2E",
   mid: "#4A3060",
   muted: "#8B7B9A",
};

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
const DEFAULT_DATA = {
   agencyName: "Fiesta Studio",
   tagline: "Life's Too Short for Boring Events",
   heroTitle: "We Turn Moments Into Memories.",
   bio: "Fiesta Studio is a full-service celebration design agency that specializes in creating unforgettable experiences. From intimate backyard weddings to massive festival productions — we bring color, joy, and magic to every single event we touch.",
   aboutUsTitle: "About Fiesta Studio",
   contactEmail: "hello@fiestastudio.co",
   phone: "+91 99887 76655",
   address: "Celebration House, Juhu, Mumbai — 400049",
   footerCopyright: `© ${new Date().getFullYear()} Fiesta Studio. All rights reserved.`,
   heroImage: "/images/templates/template-img-38.jpg",
   aboutImage: "/images/templates/template-img-39.jpg",
   services: [],
   projects: [],
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const DEFAULT_SERVICES = [
   { name: "Dream Weddings", desc: "Bespoke wedding experiences from intimate ceremonies to grand celebrations.", icon: "💍", color: C.coral, img: "/images/templates/template-img-36.jpg" },
   { name: "Music Festivals", desc: "High-energy festival productions with world-class sound and stage design.", icon: "🎵", color: C.orange, img: "/images/templates/template-img-37.jpg" },
   { name: "Corporate Galas", desc: "Sophisticated corporate events that reward, inspire and impress.", icon: "🥂", color: C.lavender, img: "/images/templates/template-img-41.jpg" },
   { name: "Birthday Parties", desc: "Showstopping birthday celebrations personalized down to every last detail.", icon: "🎂", color: C.yellow, img: "/images/templates/template-img-39.jpg" },
   { name: "Product Launches", desc: "Cinematic launch events that make your product the talk of the town.", icon: "🚀", color: C.turquoise, img: "/images/templates/template-img-44.jpg" },
   { name: "Destination Events", desc: "Exotic travel event experiences across the most beautiful locations globally.", icon: "🌴", color: C.sky, img: "/images/templates/template-img-45.jpg" },
];

const DEFAULT_PROJECTS = [
   { name: "Sunrise Wedding", desc: "A coastal wedding for 800 guests with golden hour magic.", tag: "Wedding", color: C.coral, img: "/images/templates/template-img-44.jpg", stat: "800", emoji: "💍" },
   { name: "Color Fest 2024", desc: "Mumbai's biggest Holi celebration with 25,000 attendees.", tag: "Festival", color: C.orange, img: "/images/templates/template-img-45.jpg", stat: "25K", emoji: "🎨" },
   { name: "Bloom Gala", desc: "Floral-themed corporate gala for a Fortune 500 brand.", tag: "Corporate", color: C.lavender, img: "/images/templates/template-img-46.jpg", stat: "1.2K", emoji: "🌸" },
   { name: "Priya's 30th", desc: "An over-the-top surprise birthday in Goa that went viral.", tag: "Birthday", color: C.yellow, img: "/images/templates/template-img-47.jpg", stat: "500", emoji: "🎂" },
];

const DEFAULT_CATEGORIES = [
   { label: "Weddings", emoji: "💍", from: "#FF4E6A", to: "#FF6B35" },
   { label: "Conferences", emoji: "🎙", from: "#4CC9F0", to: "#9B5DE5" },
   { label: "Concerts", emoji: "🎵", from: "#FF6B35", to: "#FFD93D" },
   { label: "Exhibitions", emoji: "🖼", from: "#06D6A0", to: "#4CC9F0" },
   { label: "Product Launches", emoji: "🚀", from: "#9B5DE5", to: "#FF4E6A" },
   { label: "Corporate Events", emoji: "💼", from: "#FFD93D", to: "#06D6A0" },
   { label: "Birthdays", emoji: "🎂", from: "#FF4E6A", to: "#9B5DE5" },
];

const DEFAULT_PROCESS = [
   { step: "01", title: "Dream Session", desc: "We dive deep into your vision, preferences and goals.", icon: "💭", color: C.coral },
   { step: "02", title: "Creative Plan", desc: "A full creative brief with moodboards, palettes and layouts.", icon: "🎨", color: C.orange },
   { step: "03", title: "Design & Build", desc: "Our team builds every décor, stage and experience element.", icon: "🏗", color: C.lavender },
   { step: "04", title: "Day Magic", desc: "Flawless on-ground coordination so you can simply enjoy.", icon: "✨", color: C.turquoise },
   { step: "05", title: "The Memory", desc: "Content delivery and post-event highlights within 48 hours.", icon: "📸", color: C.yellow },
];

const DEFAULT_TESTIMONIALS = [
   { name: "Priya Kapoor", role: "Bride, Sunrise Wedding", text: "Fiesta turned my dream wedding into something even better than I could have imagined. Every single detail was perfection!", avatar: "PK", color: C.coral },
   { name: "Rahul Singhania", role: "CEO, TechBloom", text: "Our product launch was a cultural moment. People are still talking about the experience months later. Absolutely stunning.", avatar: "RS", color: C.lavender },
   { name: "Meera Joshi", role: "Birthday Girl, Goa 30th", text: "I cried happy tears the moment I walked in. Fiesta Studio created my dream birthday party from scratch. Unbelievable!", avatar: "MJ", color: C.orange },
];

const DEFAULT_TEAM = [
   { name: "Kavya Sharma", role: "Chief Creative", badge: "Design", color: C.coral },
   { name: "Arjun Mehta", role: "Event Director", badge: "Operations", color: C.orange },
   { name: "Diya Nair", role: "Décor Specialist", badge: "Styling", color: C.lavender },
   { name: "Rohan Das", role: "Tech & Lighting", badge: "Production", color: C.turquoise },
];

const DEFAULT_PRICING = [
   { name: "Spark", price: "₹85K", desc: "Perfect for intimate celebrations up to 150 guests.", color: C.orange, features: ["Up to 150 guests", "Creative direction", "Day-of coordination", "Basic décor package", "Event photography"] },
   { name: "Glow", price: "₹2.5L", desc: "Our signature package for mid-scale events.", color: C.coral, popular: true, features: ["Up to 500 guests", "Full décor & styling", "Team of 10", "Premium A/V", "Video highlights", "30-day content"] },
   { name: "Blaze", price: "Custom", desc: "For legendary events that demand everything.", color: C.lavender, features: ["Unlimited scale", "Bespoke design universe", "Full production team", "Global logistics", "PR & media support", "Year-long partnership"] },
];

const DEFAULT_FAQS = [
   { q: "How early should I book?", a: "For weddings and large events, 8-12 months ahead is ideal. For smaller celebrations, 6-8 weeks gives us enough time to create something extraordinary." },
   { q: "Do you do destination events?", a: "Yes! We've planned events in Goa, Udaipur, Maldives, Bali and beyond. Our travel event division handles all logistics end-to-end." },
   { q: "What's included in your packages?", a: "All packages include creative direction, vendor coordination, day-of management, and post-event content. Add-ons can be customized for any budget." },
   { q: "Can you work with our own vendors?", a: "Absolutely. We can work alongside your chosen vendors or recommend from our trusted partner network built over 10+ years." },
   { q: "How is content delivered after the event?", a: "Within 48 hours of your event, you'll receive a curated photo album, video highlights reel, and a full social media content pack." },
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

const DEFAULT_CLIENTS = ["WedWise", "SunCorp", "Blooms Co", "ColorFest", "GalaGroup", "LuxTech", "PartyPro", "Neon Events", "Tropic Co", "DreamDays"];

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

// ─── CONFETTI DOTS ────────────────────────────────────────────────────────────
function ConfettiDot({ x, y, color, size, delay }) {
   return (
      <motion.div
         className="absolute rounded-full pointer-events-none"
         style={{ left: x, top: y, width: size, height: size, background: color }}
         animate={{ y: [0, -20, 0], rotate: [0, 180, 360], opacity: [0.6, 1, 0.6] }}
         transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
      />
   );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee({ items, speed = 30, reverse = false }) {
   return (
      <div className="overflow-hidden whitespace-nowrap">
         <motion.div
            className="inline-flex gap-10 items-center"
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
         >
            {[...items, ...items, ...items, ...items].map((item, i) => (
               <span key={i} className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest shrink-0" style={{ color: C.mid }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: i % 3 === 0 ? C.coral : i % 3 === 1 ? C.orange : C.lavender }} />
                  {item}
               </span>
            ))}
         </motion.div>
      </div>
   );
}

// ─── SECTION HEADING ──────────────────────────────────────────────────────────
function SectionTag({ color, children }) {
   return (
      <motion.span
         initial={{ opacity: 0, scale: 0.8 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4"
         style={{ background: `${color}20`, color }}
      >
         {children}
      </motion.span>
   );
}

// ─── REVEAL ───────────────────────────────────────────────────────────────────
const rv = (i = 0) => ({
   initial: { opacity: 0, y: 40 },
   whileInView: { opacity: 1, y: 0 },
   viewport: { once: true, margin: "-60px" },
   transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EventTemplate3({ data }) {
   const d = { ...DEFAULT_DATA, ...data };
   const services = d.services?.length && d.services.some(s => s.name) ? d.services : DEFAULT_SERVICES;
   const projects = d.projects?.length && d.projects.some(p => p.name) ? d.projects : DEFAULT_PROJECTS;
   const CLIENTS = d.trustedClients?.length > 0 && d.trustedClients.some(c => c.name) ? d.trustedClients.map(c => c.name) : DEFAULT_CLIENTS;
   const CATEGORIES = d.eventCategories?.length > 0 ? d.eventCategories.map((c, i) => ({ ...DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length], label: c.name })) : DEFAULT_CATEGORIES;
   const PROCESS = d.eventPlanningProcess?.length > 0 && d.eventPlanningProcess.some(p => p.step) ? d.eventPlanningProcess.map((p, i) => ({ ...DEFAULT_PROCESS[i % DEFAULT_PROCESS.length], title: p.step, desc: p.desc })) : DEFAULT_PROCESS;
   const TESTIMONIALS = d.testimonials?.length > 0 && d.testimonials.some(t => t.review) ? d.testimonials.map((t, i) => ({ name: t.clientName, role: t.event, text: t.review, avatar: "T", color: DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].color })) : DEFAULT_TESTIMONIALS;
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

   // Portfolio carousel auto-play
   useEffect(() => {
      const t = setInterval(() => setActiveSlide(p => (p + 1) % projects.length), 4500);
      return () => clearInterval(t);
   }, [projects.length]);

   // Testimonials auto-play
   useEffect(() => {
      const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
      return () => clearInterval(t);
   }, [TESTIMONIALS.length]);

   const confettiColors = [C.coral, C.orange, C.yellow, C.turquoise, C.lavender, C.sky, C.mint];
   const confetti = Array.from({ length: 18 }, (_, i) => ({
      x: `${(i * 6) % 100}%`, y: `${(i * 13) % 80}%`,
      color: confettiColors[i % confettiColors.length],
      size: 6 + (i % 4) * 4,
      delay: i * 0.3,
   }));

   return (
      <div style={{ fontFamily: "'Nunito', 'Poppins', system-ui, sans-serif", background: C.warm, color: C.ink, overflowX: "hidden" }}>

         {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
         <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3"
         >
            <div className="max-w-7xl mx-auto relative">
               <div className="rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", boxShadow: "0 4px 30px rgba(255,107,53,0.12)", border: "1.5px solid rgba(255,107,53,0.15)" }}>
                  <div className="flex items-center gap-2 sm:gap-3">
                     <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-sm font-black" style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})` }}>F</div>
                     <span className="font-black text-base sm:text-lg truncate max-w-[140px] xs:max-w-[200px] sm:max-w-[300px]" style={{ color: C.ink }}>{d.agencyName}</span>
                  </div>
                  <nav className="hidden lg:flex items-center gap-6 text-sm font-bold" style={{ color: C.mid }}>
                     {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-70 transition-opacity">{item}</a>
                     ))}
                  </nav>

                  <div className="hidden lg:block">
                     <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black text-white"
                        style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, boxShadow: `0 6px 20px ${C.coral}40` }}
                     >
                        Plan Your Event 🎉
                     </motion.a>
                  </div>

                  {/* Hamburger Button */}
                  <button className="lg:hidden p-2 rounded-lg ml-2 flex-shrink-0" style={{ background: `${C.coral}15`, color: C.coral }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                     </svg>
                  </button>
               </div>

               {/* Mobile Menu */}
               <AnimatePresence>
                  {isMobileMenuOpen && (
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 mt-2 p-6 rounded-2xl lg:hidden flex flex-col gap-4 shadow-2xl z-50 origin-top"
                        style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", border: `1.5px solid ${C.coral}20` }}
                     >
                        {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
                           <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold" style={{ color: C.mid }}>{item}</a>
                        ))}
                        <a
                           href="#contact"
                           onClick={() => setIsMobileMenuOpen(false)}
                           className="w-full text-center px-6 py-3 rounded-xl text-sm font-black text-white mt-2"
                           style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, boxShadow: `0 6px 20px ${C.coral}40` }}
                        >
                           Plan Your Event 🎉
                        </a>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </motion.header>

         {/* ── HERO ─────────────────────────────────────────────────────────────── */}
         <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: `linear-gradient(135deg, #FFF8F0 0%, #FFF0F5 40%, #F0F8FF 100%)` }}>
            {/* Confetti */}
            {confetti.map((dot, i) => <ConfettiDot key={i} {...dot} />)}
            {/* Big blobs */}
            <div className="absolute top-20 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[80px] pointer-events-none" style={{ background: `${C.coral}25` }} />
            <div className="absolute bottom-10 left-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-[80px] pointer-events-none" style={{ background: `${C.sky}30` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: `${C.yellow}20` }} />

            <motion.div style={{ y: heroY }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-20">
               <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 xl:gap-16 items-center">
                  {/* Left — 3 cols */}
                  <div className="lg:col-span-3">
                     <div className="flex justify-center lg:justify-start">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                           className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
                           style={{ background: `${C.orange}20`, color: C.orange, border: `1.5px solid ${C.orange}30` }}>
                           <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                           Now Booking 2025–26
                        </motion.div>
                     </div>

                     <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.1] sm:leading-[1.0] tracking-tight mb-4 sm:mb-6 text-center lg:text-left" style={{ color: C.ink }}>
                        {d.heroTitle.split(" ").map((word, i) => (
                           <motion.span key={i} className="inline-block mr-2 sm:mr-3 max-w-full break-all"
                              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                              <span style={{ color: [C.coral, C.orange, C.lavender, C.turquoise, C.yellow, C.coral][i % 6] }}>{word}</span>
                           </motion.span>
                        ))}
                     </motion.h1>

                     <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="text-base sm:text-lg font-semibold mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left break-words overflow-hidden" style={{ color: C.mid }}>
                        {d.tagline}
                     </motion.p>

                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 items-center lg:items-start justify-center lg:justify-start">
                        <motion.a href="#contact" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                           className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-white text-sm"
                           style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, boxShadow: `0 10px 30px ${C.coral}50` }}>
                           Start Planning ✨
                        </motion.a>
                        <motion.a href="#work" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                           className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-sm border-2"
                           style={{ borderColor: C.coral, color: C.coral, background: "white" }}>
                           See Our Work
                        </motion.a>
                     </motion.div>

                     {/* Stats row */}
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                        className="flex gap-4 sm:gap-10 flex-wrap justify-center lg:justify-start">
                        {[{ v: 750, s: "+", l: "Events Celebrated" }, { v: 99, s: "%", l: "Happy Clients" }, { v: 12, s: "", l: "Years of Joy" }].map((stat, i) => (
                           <div key={i} className="text-center sm:text-left">
                              <div className="text-2xl sm:text-3xl font-black" style={{ color: [C.coral, C.orange, C.lavender][i] }}>
                                 <Counter to={stat.v} suffix={stat.s} />
                              </div>
                              <div className="text-xs font-bold mt-0.5" style={{ color: C.muted }}>{stat.l}</div>
                           </div>
                        ))}
                     </motion.div>
                  </div>

                  {/* Right — 2 cols: image collage */}
                  <div className="lg:col-span-2 relative w-full max-w-[340px] sm:max-w-none mx-auto h-[340px] sm:h-[460px] mt-4 sm:mt-8 lg:mt-0">
                     {/* Main image */}
                     <motion.div initial={{ opacity: 0, scale: 0.85, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="absolute top-0 left-2 right-0 bottom-12 rounded-[2rem] overflow-hidden"
                        style={{ boxShadow: `0 30px 60px rgba(255,107,53,0.25)` }}>
                        <img src={d.heroImage || "/images/templates/template-img-38.jpg"} alt="Event" className="w-full h-full object-cover" />
                     </motion.div>

                     {/* Floating emoji card */}
                     <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                        className="absolute right-0 sm:-right-4 top-6 sm:top-8 rounded-2xl p-3 sm:p-4 text-center z-10"
                        style={{ background: "white", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}>
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                           <div className="text-3xl sm:text-4xl">🎉</div>
                           <div className="text-xs font-black mt-1" style={{ color: C.coral }}>750+ Events!</div>
                        </motion.div>
                     </motion.div>

                     {/* Rating card */}
                     <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                        className="absolute left-0 sm:-left-4 bottom-10 sm:bottom-16 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 z-10"
                        style={{ background: "white", boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}>
                        <div className="flex gap-0.5 mb-1">{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: C.yellow }} className="text-sm">{s}</span>)}</div>
                        <div className="text-xs font-black" style={{ color: C.ink }}>5.0 — 1,200+ Reviews</div>
                     </motion.div>

                     {/* Color blob behind image */}
                     <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full -z-10" style={{ background: `linear-gradient(135deg, ${C.yellow}, ${C.orange})`, opacity: 0.3, filter: "blur(30px)" }} />
                  </div>
               </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
               className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ color: C.muted }}>
               <span className="text-[10px] font-black uppercase tracking-widest">Scroll Down</span>
               <div className="w-0.5 h-8" style={{ background: `linear-gradient(to bottom, ${C.coral}, transparent)` }} />
            </motion.div>
         </section>

         {/* ── MARQUEE ──────────────────────────────────────────────────────────── */}
         <section className="py-8 overflow-hidden" style={{ background: "white", borderTop: `3px solid ${C.yellow}`, borderBottom: `3px solid ${C.yellow}` }}>
            <Marquee items={CLIENTS} speed={30} />
         </section>

         {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
         <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.warm }}>
            <div className="max-w-7xl mx-auto">
               <div className="max-w-2xl mx-auto">
                  {/* Image */}
                  <motion.div {...rv(0)} className="relative">
                     <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5]" style={{ boxShadow: `0 40px 80px ${C.coral}25` }}>
                        <img src={d.aboutImage || "/images/templates/template-img-39.jpg"} alt="About" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.coral}80, transparent 60%)` }} />
                     </div>
                     {/* Floating badges */}
                     <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -right-4 sm:-right-8 top-1/4 p-4 sm:p-6 rounded-3xl text-white font-black"
                        style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, boxShadow: `0 20px 40px ${C.coral}50` }}>
                        <div className="text-3xl sm:text-4xl"><Counter to={10} suffix="+" /></div>
                        <div className="text-xs opacity-70 mt-1">Years of Joy</div>
                     </motion.div>
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="absolute -left-3 sm:-left-6 bottom-20 p-4 sm:p-5 rounded-2xl"
                        style={{ background: "white", boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}>
                        <div className="text-2xl sm:text-3xl font-black" style={{ color: C.turquoise }}><Counter to={750} suffix="+" /></div>
                        <div className="text-xs font-bold mt-1" style={{ color: C.muted }}>Events Done</div>
                     </motion.div>
                  </motion.div>

                  {/* Copy */}
                  <div>
                     <SectionTag color={C.coral}>Our Story 🎊</SectionTag>
                     <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6" style={{ color: C.ink }}>
                        {d.aboutUsTitle || "We Live For<br/>Celebrations."}
                     </motion.h2>
                     <motion.p {...rv(2)} className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: C.mid }}>{d.bio}</motion.p>
                     <motion.div {...rv(3)} className="flex flex-wrap gap-3 mb-10">
                        {["Joyful Designs", "Flawless Execution", "Colorful World", "100% Love"].map((pill, i) => (
                           <span key={i} className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold"
                              style={{ background: [C.coral, C.orange, C.lavender, C.turquoise][i] + "20", color: [C.coral, C.orange, C.lavender, C.turquoise][i], border: `1.5px solid ${[C.coral, C.orange, C.lavender, C.turquoise][i]}30` }}>
                              {pill}
                           </span>
                        ))}
                     </motion.div>
                     <motion.a {...rv(4)} href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-white text-sm"
                        style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, boxShadow: `0 10px 30px ${C.coral}40` }}>
                        Let's Celebrate Together 🎊
                     </motion.a>
                  </div>
               </div>
            </div>
         </section>

         {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
         <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: "white" }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.orange}>What We Do 🌟</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>
                     Every Celebration,<br />
                     <span style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Perfectly Crafted.</span>
                  </motion.h2>
               </div>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {services.map((svc, i) => (
                     <motion.div key={i} {...rv(i * 0.5)}
                        whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group rounded-3xl overflow-hidden cursor-pointer relative"
                        style={{ background: `${svc.color || C.coral}10`, border: `2px solid ${svc.color || C.coral}20` }}>
                        <div className="relative h-44 sm:h-52 overflow-hidden rounded-t-3xl">
                           <img src={svc.img || "/images/templates/template-img-40.jpg"} alt={svc.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${svc.color || C.coral}CC, transparent)` }} />
                           <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl flex items-center justify-center text-2xl bg-white/90">{svc.icon}</div>
                        </div>
                        <div className="p-5 sm:p-6">
                           <h3 className="text-lg font-black mb-2" style={{ color: C.ink }}>{svc.name}</h3>
                           <p className="text-sm leading-relaxed" style={{ color: C.mid }}>{svc.desc}</p>
                           <div className="mt-4 flex items-center gap-1 text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: svc.color || C.coral }}>
                              Explore More →
                           </div>
                        </div>
                        {/* Corner dot */}
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full" style={{ background: svc.color || C.coral }} />
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── EVENT CATEGORIES ─────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.warm }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-10 sm:mb-16">
                  <SectionTag color={C.lavender}>Event Types 🎭</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>Every Occasion,<br />We've Got You!</motion.h2>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {CATEGORIES.map((cat, i) => (
                     <motion.div key={i} {...rv(i * 0.2)}
                        whileHover={{ y: -8, scale: 1.04 }}
                        className="relative p-5 sm:p-7 rounded-3xl text-white cursor-pointer overflow-hidden group"
                        style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})`, boxShadow: `0 8px 30px ${cat.from}40` }}>
                        <div className="text-4xl sm:text-5xl mb-3">{cat.emoji}</div>
                        <div className="font-black text-sm sm:text-base">{cat.label}</div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
                        <motion.div className="absolute top-3 right-3 text-lg opacity-0 group-hover:opacity-100 transition-opacity">✨</motion.div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO ────────────────────────────────────────────────────────── */}
         <section id="work" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: "white" }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4">
                  <div>
                     <SectionTag color={C.turquoise}>Our Work 🏆</SectionTag>
                     <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>Events That<br />Made History</motion.h2>
                  </div>
                  <div className="flex gap-2">
                     {projects.map((_, i) => (
                        <button key={i} onClick={() => setActiveSlide(i)}
                           className="h-2 rounded-full transition-all duration-300"
                           style={{ width: i === activeSlide ? 32 : 8, background: i === activeSlide ? C.coral : `${C.coral}30` }} />
                     ))}
                  </div>
               </div>

               {/* Featured slide */}
               <AnimatePresence mode="wait">
                  <motion.div key={activeSlide}
                     initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}
                     transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                     className="relative rounded-[2.5rem] overflow-hidden cursor-pointer group mb-6"
                     style={{ height: "50vh", minHeight: 300 }}
                     onClick={() => setActiveSlide((activeSlide + 1) % projects.length)}>
                     <img src={projects[activeSlide].img || "/images/templates/template-img-44.jpg"}
                        alt={projects[activeSlide].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,10,46,0.85) 0%, rgba(26,10,46,0.3) 50%, transparent 100%)" }} />

                     <div className="absolute top-5 sm:top-8 left-5 sm:left-8">
                        <span className="px-4 py-2 rounded-full text-xs font-black text-white" style={{ background: `${projects[activeSlide].color || C.coral}CC` }}>
                           {projects[activeSlide].emoji} {projects[activeSlide].tag}
                        </span>
                     </div>

                     <motion.div className="absolute top-5 sm:top-8 right-5 sm:right-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex flex-col items-center justify-center text-white font-black"
                        style={{ background: `linear-gradient(135deg, ${projects[activeSlide].color || C.coral}, ${C.orange})`, boxShadow: `0 8px 24px ${projects[activeSlide].color || C.coral}60` }}
                        animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                        <span className="text-base sm:text-lg leading-none">{projects[activeSlide].stat}</span>
                        <span className="text-[8px] opacity-70">guests</span>
                     </motion.div>

                     <div className="absolute bottom-6 sm:bottom-10 left-5 sm:left-10 right-5 sm:right-16">
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2">{projects[activeSlide].name}</h3>
                        <p className="text-sm sm:text-base text-white/70">{projects[activeSlide].desc}</p>
                     </div>
                  </motion.div>
               </AnimatePresence>

               {/* Thumbnails */}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {projects.map((p, i) => (
                     <motion.div key={i} onClick={() => setActiveSlide(i)} whileHover={{ scale: 1.04 }}
                        className="relative rounded-2xl overflow-hidden cursor-pointer"
                        style={{ height: 90, outline: i === activeSlide ? `3px solid ${C.coral}` : "none", opacity: i === activeSlide ? 1 : 0.55 }}>
                        <img src={p.img || "/images/templates/template-img-44.jpg"} alt={p.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-2 left-2 text-white text-[10px] sm:text-xs font-bold truncate">{p.name}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
         <section id="process" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.warm }}>
            <div className="absolute -top-10 right-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: `${C.lavender}20` }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.orange}>How We Work 🗺</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>
                     The Fiesta<br />Journey
                  </motion.h2>
               </div>

               <div className="relative">
                  {/* Curved path line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 hidden sm:block" style={{ background: `linear-gradient(to bottom, ${C.coral}, ${C.orange}, ${C.lavender}, ${C.turquoise}, ${C.yellow})` }} />
                  <div className="space-y-6 sm:space-y-10 sm:pl-16">
                     {PROCESS.map((step, i) => (
                        <motion.div key={i} {...rv(i * 0.4)}
                           className="relative flex gap-5 sm:gap-8 items-start p-5 sm:p-7 rounded-3xl group cursor-default"
                           style={{ background: "white", boxShadow: "0 4px 30px rgba(0,0,0,0.06)", border: `2px solid ${step.color}20` }}
                           whileHover={{ x: 8, boxShadow: `0 8px 40px ${step.color}25` }}>
                           {/* Step number on line */}
                           <div className="hidden sm:flex absolute -left-[52px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white text-xs font-black z-10"
                              style={{ background: `linear-gradient(135deg, ${step.color}, ${C.orange})`, boxShadow: `0 4px 16px ${step.color}50` }}>
                              {step.step}
                           </div>
                           <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0"
                              style={{ background: `${step.color}15` }}>
                              {step.icon}
                           </div>
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest mb-1 sm:hidden" style={{ color: step.color }}>Step {step.step}</div>
                              <h3 className="text-lg sm:text-xl font-black mb-1" style={{ color: C.ink }}>{step.title}</h3>
                              <p className="text-sm leading-relaxed" style={{ color: C.mid }}>{step.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── WHY US ───────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})` }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <div className="max-w-7xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <motion.span {...rv(0)} className="inline-block px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-white/20 text-white mb-4">Why Fiesta 💎</motion.span>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight">
                     Numbers That<br />Say It All
                  </motion.h2>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-20">
                  {[
                     { v: 750, s: "+", l: "Events Celebrated", icon: "🎪" },
                     { v: 99, s: "%", l: "Happy Clients", icon: "💎" },
                     { v: 1200, s: "+", l: "Five-Star Reviews", icon: "⭐" },
                     { v: 50, s: "+", l: "Cities Covered", icon: "🌍" },
                  ].map((stat, i) => (
                     <motion.div key={i} {...rv(i * 0.2)}
                        whileHover={{ y: -6, scale: 1.04 }}
                        className="p-5 sm:p-8 rounded-3xl text-center relative overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                        <div className="text-3xl sm:text-4xl mb-3">{stat.icon}</div>
                        <div className="text-3xl sm:text-5xl font-black text-white mb-2"><Counter to={stat.v} suffix={stat.s} /></div>
                        <div className="text-xs sm:text-sm font-semibold text-white/70">{stat.l}</div>
                     </motion.div>
                  ))}
               </div>

               <div className="grid sm:grid-cols-3 gap-5 sm:gap-8">
                  {[
                     { title: "Joy-First Design", desc: "We start with 'what will make people smile?' Every element is crafted for delight.", icon: "😍" },
                     { title: "Zero Stress Promise", desc: "You celebrate. We handle every single detail with precision and passion.", icon: "🧘" },
                     { title: "Magic On Demand", desc: "From same-week surprises to year-long planned extravaganzas — we deliver.", icon: "🪄" },
                  ].map((item, i) => (
                     <motion.div key={i} {...rv(i * 0.3)}
                        className="flex gap-4 p-5 sm:p-7 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.2)" }}>
                        <div className="text-3xl flex-shrink-0">{item.icon}</div>
                        <div>
                           <h4 className="text-white font-black mb-2">{item.title}</h4>
                           <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PRICING ──────────────────────────────────────────────────────────── */}
         <section id="pricing" className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: "white" }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.lavender}>Packages 🎁</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>
                     Pick Your<br />Party Plan
                  </motion.h2>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                  {PRICING.map((pkg, i) => (
                     <motion.div key={i} {...rv(i * 0.3)}
                        whileHover={{ y: -12, scale: 1.02 }}
                        className={`relative rounded-3xl overflow-hidden ${pkg.popular ? "sm:col-span-2 lg:col-span-1" : ""}`}
                        style={{
                           background: pkg.popular ? `linear-gradient(135deg, ${C.coral}, ${C.orange})` : "white",
                           border: pkg.popular ? "none" : `2px solid ${pkg.color}20`,
                           boxShadow: pkg.popular ? `0 30px 60px ${C.coral}40` : "0 4px 20px rgba(0,0,0,0.06)",
                           transform: pkg.popular ? "scale(1.02)" : "scale(1)",
                        }}>
                        {pkg.popular && <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${C.yellow}, ${C.lavender}, ${C.turquoise})` }} />}
                        <div className="p-6 sm:p-8">
                           {pkg.popular && <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-white/20 text-white">⭐ Most Loved</div>}
                           <div className="text-3xl mb-3">{["✨", "🎊", "🌟"][i]}</div>
                           <h3 className="text-2xl font-black mb-2" style={{ color: pkg.popular ? "white" : C.ink }}>{pkg.name}</h3>
                           <p className="text-sm mb-5" style={{ color: pkg.popular ? "rgba(255,255,255,0.7)" : C.muted }}>{pkg.desc}</p>
                           <div className="text-4xl sm:text-5xl font-black mb-7" style={{ color: pkg.popular ? "white" : C.ink }}>
                              {pkg.price}{pkg.price !== "Custom" && <span className="text-sm font-semibold opacity-50 ml-1">onwards</span>}
                           </div>
                           <ul className="space-y-3 mb-8">
                              {pkg.features.map((f, j) => (
                                 <li key={j} className="flex items-center gap-3 text-sm">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                                       style={{ background: pkg.popular ? "rgba(255,255,255,0.25)" : `${pkg.color}20`, color: pkg.popular ? "white" : pkg.color }}>✓</div>
                                    <span style={{ color: pkg.popular ? "rgba(255,255,255,0.85)" : C.mid }}>{f}</span>
                                 </li>
                              ))}
                           </ul>
                           <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              className="w-full py-3 sm:py-4 rounded-2xl font-black text-sm"
                              style={pkg.popular
                                 ? { background: "rgba(255,255,255,0.2)", color: "white", border: "1.5px solid rgba(255,255,255,0.3)" }
                                 : { background: `linear-gradient(135deg, ${pkg.color}, ${C.orange})`, color: "white" }}>
                              Get Started 🎉
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.warm }}>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: `${C.yellow}30` }} />
            <div className="max-w-4xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.coral}>Love Notes 💌</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>
                     Happy Clients,<br />Happy Us!
                  </motion.h2>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial}
                     initial={{ opacity: 0, y: 40, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -40, scale: 0.95 }}
                     transition={{ duration: 0.4 }}
                     className="relative p-6 sm:p-10 rounded-3xl text-center overflow-hidden"
                     style={{ background: "white", boxShadow: `0 20px 60px ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.coral}25`, border: `2px solid ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.coral}20` }}>
                     <div className="text-6xl sm:text-8xl font-black absolute top-4 left-6 leading-none opacity-10" style={{ color: TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.coral }}>"</div>
                     <div className="text-4xl mb-4">💬</div>
                     <p className="text-lg sm:text-2xl font-semibold leading-relaxed mb-8 relative z-10" style={{ color: C.ink }}>
                        "{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.text}"
                     </p>
                     <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                           style={{ background: `linear-gradient(135deg, ${TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.color || C.coral}, ${C.orange})` }}>
                           {TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.avatar}
                        </div>
                        <div className="text-left">
                           <div className="font-black text-base" style={{ color: C.ink }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.name}</div>
                           <div className="text-xs" style={{ color: C.muted }}>{TESTIMONIALS[activeTestimonial % TESTIMONIALS.length]?.role}</div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>

               <div className="flex justify-center gap-3 mt-8">
                  {TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="h-2.5 rounded-full transition-all duration-300"
                        style={{ width: i === activeTestimonial % TESTIMONIALS.length ? 28 : 10, background: i === activeTestimonial % TESTIMONIALS.length ? C.coral : `${C.coral}30` }} />
                  ))}
               </div>
            </div>
         </section>

         {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6" style={{ background: "white" }}>
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.turquoise}>Our Team 🤝</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>
                     The Magic<br />Makers
                  </motion.h2>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {TEAM.map((member, i) => (
                     <motion.div key={i} {...rv(i * 0.3)} whileHover={{ y: -10 }}
                        className="group rounded-3xl overflow-hidden cursor-pointer"
                        style={{ background: `${member.color}10`, border: `2px solid ${member.color}20` }}>
                        <div className="relative h-44 sm:h-56 flex items-center justify-center overflow-hidden"
                           style={{ background: `linear-gradient(135deg, ${member.color}25, ${member.color}50)` }}>
                           <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white font-black text-3xl"
                              style={{ background: `linear-gradient(135deg, ${member.color}, ${C.orange})`, boxShadow: `0 10px 30px ${member.color}60` }}>
                              {member.name[0]}
                           </div>
                           {/* Hover overlay */}
                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                              style={{ background: `linear-gradient(to top, ${member.color}cc, transparent)` }}>
                              <div className="flex gap-2">
                                 {["in", "tw", "ig"].map(s => (
                                    <div key={s} className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-white text-[9px] font-black uppercase">{s}</div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="p-4 sm:p-5">
                           <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2"
                              style={{ background: `${member.color}20`, color: member.color }}>
                              {member.badge}
                           </span>
                           <h4 className="font-black text-base" style={{ color: C.ink }}>{member.name}</h4>
                           <p className="text-xs mt-0.5" style={{ color: C.muted }}>{member.role}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6 relative" style={{ background: C.warm }}>
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.orange}>Gallery 📸</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>
                     Frames from<br />Our Best Days
                  </motion.h2>
               </div>
               {/* Masonry */}
               <div className="columns-2 md:columns-3 gap-3 sm:gap-4">
                  {GALLERY.map((img, i) => (
                     <motion.div key={i} {...rv(i * 0.15)} whileHover={{ scale: 1.03 }}
                        onClick={() => setLightbox(img)}
                        className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group mb-3 sm:mb-4"
                        style={{ height: i % 3 === 0 ? 220 : i % 3 === 1 ? 160 : 190 }}>
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 text-white text-3xl transition-opacity">🔍</div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
               {lightbox && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
                     onClick={() => setLightbox(null)}>
                     <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                        src={lightbox} alt="Gallery" className="max-w-4xl w-full max-h-[85vh] object-contain rounded-3xl" />
                     <button className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-black" onClick={() => setLightbox(null)}>✕</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </section>

         {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
         <section className="py-20 sm:py-32 px-4 sm:px-6" style={{ background: "white" }}>
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.sky}>FAQ 💬</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight" style={{ color: C.ink }}>
                     Got Questions?<br />We've Got Answers!
                  </motion.h2>
               </div>
               <div className="space-y-3 sm:space-y-4">
                  {FAQS.map((faq, i) => (
                     <motion.div key={i} {...rv(i * 0.15)}
                        className="rounded-2xl overflow-hidden cursor-pointer"
                        style={{ background: C.warm, border: `2px solid ${activeFaq === i ? C.coral : "transparent"}`, boxShadow: activeFaq === i ? `0 6px 30px ${C.coral}20` : "0 2px 12px rgba(0,0,0,0.05)" }}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                        <div className="flex items-center justify-between p-4 sm:p-6 gap-4">
                           <h4 className="font-black text-sm sm:text-base" style={{ color: C.ink }}>{faq.q}</h4>
                           <motion.div animate={{ rotate: activeFaq === i ? 45 : 0 }}
                              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black"
                              style={{ background: activeFaq === i ? C.coral : C.muted }}>+</motion.div>
                        </div>
                        <AnimatePresence>
                           {activeFaq === i && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                 <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm leading-relaxed" style={{ color: C.mid }}>{faq.a}</div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
         <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: C.warm }}>
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: `${C.coral}20` }} />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: `${C.sky}25` }} />
            <div className="max-w-6xl mx-auto relative z-10">
               <div className="text-center mb-12 sm:mb-20">
                  <SectionTag color={C.coral}>Let's Talk 🎊</SectionTag>
                  <motion.h2 {...rv(1)} className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-black tracking-tight leading-tight" style={{ color: C.ink }}>
                     Ready to Plan<br />
                     <span style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Something Amazing?
                     </span>
                  </motion.h2>
               </div>

               <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                  {/* Info */}
                  <div className="space-y-4 sm:space-y-5">
                     {[
                        { icon: "✉️", label: "Email", val: d.contactEmail, color: C.coral },
                        { icon: "📞", label: "Phone", val: d.phone || "+91 99887 76655", color: C.orange },
                        { icon: "📍", label: "Studio", val: d.address, color: C.lavender },
                     ].map((item, i) => (
                        <motion.div key={i} {...rv(i * 0.2)} whileHover={{ x: 6 }}
                           className="flex gap-4 p-4 sm:p-6 rounded-2xl"
                           style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: `2px solid ${item.color}15` }}>
                           <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                              style={{ background: `${item.color}15` }}>{item.icon}</div>
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: item.color }}>{item.label}</div>
                              <div className="font-semibold text-sm sm:text-base break-all sm:break-normal" style={{ color: C.ink }}>{item.val}</div>
                           </div>
                        </motion.div>
                     ))}

                     {/* Social proof */}
                     <motion.div {...rv(3)} className="p-4 sm:p-6 rounded-2xl text-center"
                        style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})`, boxShadow: `0 10px 30px ${C.coral}40` }}>
                        <div className="text-white font-black text-lg mb-1">🎉 Over 750 Happy Events!</div>
                        <div className="text-white/80 text-sm">Join our growing family of celebrators</div>
                     </motion.div>
                  </div>

                  
               </div>
            </div>
         </section>

         {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
         <footer className="px-4 sm:px-6 pt-14 sm:pt-20 pb-8" style={{ background: C.ink }}>
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-10 sm:pb-14 border-b border-white/10">
                  <div className="max-w-xs">
                     <div className="flex items-center gap-2 sm:gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
                           style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.orange})` }}>F</div>
                        <span className="font-black text-lg text-white">{d.agencyName}</span>
                     </div>
                     <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{d.tagline}</p>
                     {/* Social */}
                     <div className="flex gap-3 mt-5">
                        {["in", "tw", "ig", "yt"].map(s => (
                           <a key={s} href="#"
                              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black uppercase transition-all hover:scale-110"
                              style={{ background: `${C.coral}30`, color: C.coral }}>
                              {s}
                           </a>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
                     {[
                        { title: "Services", links: ["Weddings", "Festivals", "Corporate", "Birthdays"] },
                        { title: "Company", links: ["About Us", "Portfolio", "Our Team", "Blog"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms", "Cookies"] },
                     ].map(col => (
                        <div key={col.title}>
                           <h5 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: C.coral }}>{col.title}</h5>
                           <ul className="space-y-2.5">
                              {col.links.map(link => (
                                 <li key={link}>
                                    <a href="#" className="text-xs font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.35)" }}>{link}</a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
                  <p className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.25)" }}>{d.footerCopyright}</p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                     <span>Made with</span>
                     <span style={{ color: C.coral }}>❤️</span>
                     <span>for every celebration</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}