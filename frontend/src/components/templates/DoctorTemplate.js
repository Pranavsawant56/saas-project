"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TemplateLayout from "./TemplateLayout";

/* ─── tiny helpers ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay } },
});

function Section({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.span
      variants={fadeUp(0)}
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-teal-600 mb-4"
    >
      <span className="w-6 h-px bg-teal-500 inline-block" />
      {children}
      <span className="w-6 h-px bg-teal-500 inline-block" />
    </motion.span>
  );
}

function SectionHeading({ children, light = false }) {
  return (
    <motion.h2
      variants={fadeUp(0.1)}
      className={`text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight ${light ? "text-white" : "text-slate-900"}`}
    >
      {children}
    </motion.h2>
  );
}

/* ─── Carousel ─── */
function Carousel({ items, renderItem, autoPlay = true, interval = 4000 }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const len = items.length;

  useEffect(() => {
    if (!autoPlay || len < 2) return;
    const t = setInterval(() => { setDir(1); setIdx((i) => (i + 1) % len); }, interval);
    return () => clearInterval(t);
  }, [len, autoPlay, interval]);

  const go = (next) => {
    setDir(next > idx ? 1 : -1);
    setIdx((next + len) % len);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.4 } }),
  };

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div key={idx} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
          {renderItem(items[idx], idx)}
        </motion.div>
      </AnimatePresence>
      {len > 1 && (
        <>
          <button onClick={() => go(idx - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-white transition-all z-10 hover:scale-110">‹</button>
          <button onClick={() => go(idx + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-white transition-all z-10 hover:scale-110">›</button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => go(i)} className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-teal-500" : "w-2 bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Star Rating ─── */
function Stars({ count = 5 }) {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? "text-amber-400" : "text-slate-200"}>★</span>
      ))}
    </span>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ question, answer, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp(idx * 0.07)} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors gap-4"
      >
        <span className="font-semibold text-slate-800 text-sm md:text-base">{question}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-teal-500 text-xl flex-shrink-0">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────── MAIN TEMPLATE ─────────── */
export default function DoctorTemplate({ data }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── destructure all fields with safe fallbacks ── */
  const {
    clinicName, heroTitle, specialty, heroImage, bio, aboutUsTitle, aboutImage,
    education, experience, contactEmail, phone, countryCode, address,
    workingHours, headerType, logoUrl, clinicNameFontSize, heroTitleFontSize,
    specialtyFontSize, services, tagline, heroDescription, qualification,
    certifications, languagesSpoken, hospitalName, whyChooseUs, schedule,
    stats, testimonials, teamDoctors, faqs, insurancePartners, blog,
    gallery, googleMapsEmbed, emergencyContact, whatsappNumber, footerDisclaimer,
    emergencyAvailability, ambulanceNumber, footerCopyright, socialLinks,
    blogSectionTitle, blogSubtitle, enableBlog
  } = data || {};

  const displayPhone = phone ? `${countryCode ? countryCode.split(" ")[0] : ""}${phone}` : "+1 800 MED HELP";
  const displayEmail = contactEmail || "appointments@clinic.com";
  const displayAddress = address || "123 Medical Center, NY";
  const displayName = clinicName || "MediCare Clinic";
  const displayEmergency = emergencyContact || displayPhone;

  const defaultServices = [
    { icon: "🫀", title: "Cardiology", description: "Advanced heart health monitoring, diagnosis, and personalised treatment plans." },
    { icon: "🧠", title: "Neurology", description: "Expert care for brain and nervous system disorders with cutting-edge technology." },
    { icon: "🦴", title: "Orthopedics", description: "Comprehensive bone, joint, and muscle care for all ages." },
    { icon: "👶", title: "Pediatrics", description: "Gentle, specialised care tailored for children from newborns to teenagers." },
    { icon: "👁️", title: "Ophthalmology", description: "Complete eye care — from routine exams to advanced surgical treatments." },
    { icon: "🦷", title: "Dental Care", description: "Modern dental treatments for a healthy, confident smile." },
  ];
  const displayServices = services?.length ? services : defaultServices;

  const defaultWhyChoose = [
    { icon: "🏅", title: "Board-Certified Doctors", description: "All our specialists are nationally certified with years of clinical experience." },
    { icon: "🔬", title: "Advanced Technology", description: "State-of-the-art equipment ensuring accurate diagnosis and effective treatment." },
    { icon: "⏰", title: "24/7 Emergency Care", description: "Round-the-clock emergency services so you're never left without support." },
    { icon: "💊", title: "Personalised Plans", description: "Tailored treatment plans designed around your unique health needs." },
  ];
  const displayWhyChoose = whyChooseUs?.length ? whyChooseUs : defaultWhyChoose;

  const defaultSchedule = [
    { day: "Monday – Friday", open: "8:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "10:00 AM", close: "3:00 PM" },
  ];
  const displaySchedule = schedule?.length ? schedule : defaultSchedule;

  const defaultStats = [
    { value: "15+", label: "Years Experience" },
    { value: "8,000+", label: "Patients Treated" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "40+", label: "Medical Staff" },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  const defaultTestimonials = [
    { name: "Sarah Mitchell", review: "The team here is absolutely exceptional. I felt cared for from the moment I walked in.", rating: 5, image: null },
    { name: "James Anderson", review: "World-class facilities and doctors who truly listen. Highly recommend to anyone.", rating: 5, image: null },
    { name: "Priya Sharma", review: "Finally a clinic that combines expertise with genuine warmth and compassion.", rating: 5, image: null },
  ];
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials;

  const defaultTeam = [
    { name: "Dr. Emily Carter", specialization: "Cardiology", experience: "12 Years", image: null },
    { name: "Dr. Marcus Lee", specialization: "Neurology", experience: "9 Years", image: null },
    { name: "Dr. Aisha Patel", specialization: "Pediatrics", experience: "7 Years", image: null },
  ];
  const displayTeam = teamDoctors?.length ? teamDoctors : defaultTeam;

  const defaultFaqs = [
    { question: "How do I book an appointment?", answer: "You can book online via our website, call our helpline, or walk in during working hours." },
    { question: "Do you accept insurance?", answer: "Yes, we accept most major insurance plans. Please contact us to verify your specific coverage." },
    { question: "What should I bring to my first visit?", answer: "Please bring a valid ID, your insurance card, any previous medical records, and a list of current medications." },
    { question: "Is emergency care available after hours?", answer: "Yes, our emergency line is available 24/7. You can reach us at the emergency number listed on our website." },
  ];
  const displayFaqs = faqs?.length ? faqs : defaultFaqs;

  const defaultInsurance = [
    { name: "BlueCross BlueShield" }, { name: "Aetna" }, { name: "Cigna" }, { name: "UnitedHealth" }, { name: "Humana" }, { name: "Medicare" },
  ];
  const displayInsurance = insurancePartners?.length ? insurancePartners : defaultInsurance;

  const defaultGallery = [
    { caption: "Modern Reception" }, { caption: "Consultation Room" }, { caption: "Diagnostic Lab" }, { caption: "Patient Lounge" },
  ];
  const displayGallery = gallery?.length ? gallery : defaultGallery;

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
  ];

  /* colour token */
  const teal = "#0d9488";
  const navy = "#0f2c4a";

  return (
    <TemplateLayout data={data} theme="light" category="Doctor" hideHeader hideFooter>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .dt-root { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; background: #f8fafc; }
        .dt-display { font-family: 'DM Serif Display', serif; }
        .dt-grad-teal { background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); }
        .dt-card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .dt-card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(13,148,136,0.12); }
        .dt-floating { animation: floating 4s ease-in-out infinite; }
        .dt-floating-slow { animation: floating 6s ease-in-out infinite; }
        @keyframes floating { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .dt-section-wave { position:absolute; bottom:-1px; left:0; width:100%; overflow:hidden; line-height:0; }
        .dt-nav-link { position:relative; }
        .dt-nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#0d9488; transition:width 0.3s; border-radius:2px; }
        .dt-nav-link:hover::after { width:100%; }
        .gallery-img { transition: transform 0.4s ease; }
        .gallery-img:hover { transform: scale(1.05); }
      `}</style>

      <div className="dt-root text-slate-800 flex flex-col min-h-screen">

        {/* ── TOP BAR ── */}
        <div className="dt-grad-teal text-white py-2 px-4 md:px-10 flex flex-wrap justify-between items-center text-xs font-medium gap-2">
          <div className="flex flex-wrap gap-4 items-center break-all">
            <span>📞 {displayPhone}</span>
            <span>✉ {displayEmail}</span>
          </div>
          <span className="hidden sm:block">🕒 {workingHours || "Mon – Sat: 8 AM – 8 PM"}</span>
        </div>

        {/* ── NAVBAR ── */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-100/80" : "bg-white"} border-b border-slate-100`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-10 w-36"><Image src={logoUrl} alt={displayName} fill className="object-contain" /></div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 dt-grad-teal rounded-xl flex items-center justify-center text-white text-lg">🏥</div>
                  <span className="dt-display text-xl text-slate-900 font-bold" style={{ fontSize: clinicNameFontSize ? `clamp(1.2rem, 4vw, ${clinicNameFontSize}px)` : undefined }}>{displayName}</span>
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt-nav-link text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors py-1">{label}</a>
              ))}
              <a href="#contact" className="dt-grad-teal text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-200/60 hover:opacity-90 transition-all hover:scale-105">
                Book Appointment
              </a>
            </nav>

            {/* Mobile Toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl hover:bg-slate-100 transition-colors">
              <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }} className="w-5 h-0.5 bg-slate-700 rounded-full block" />
              <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-5 h-0.5 bg-slate-700 rounded-full block" />
              <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }} className="w-5 h-0.5 bg-slate-700 rounded-full block" />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
              >
                <div className="px-6 py-4 flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-semibold hover:text-teal-600 transition-colors">{label}</a>
                  ))}
                  <a href="#contact" className="dt-grad-teal text-white px-6 py-3 rounded-full text-sm font-bold text-center">Book Appointment</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ── HERO ── */}
        <section id="home" ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/40 to-blue-50/60">
          {/* BG Shapes */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-20 w-full">
            {/* Left Content */}
            <div className="z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-teal-200 mb-6" style={{ fontSize: specialtyFontSize ? `clamp(0.75rem, 2.5vw, ${specialtyFontSize}px)` : undefined }}>
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse inline-block" />
                  {specialty || "Expert Medical Care"}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="dt-display text-5xl md:text-6xl xl:text-7xl text-slate-900 leading-[1.05] mb-6"
                style={{ fontSize: heroTitleFontSize ? `clamp(2.5rem, 6vw, ${heroTitleFontSize}px)` : undefined }}
              >
                {heroTitle || "Your Health, Our\nHighest Priority"}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="text-slate-500 text-lg leading-relaxed mb-3 max-w-lg font-medium">
                {tagline || "Trusted Medical Excellence"}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }} className="text-slate-500 leading-relaxed mb-10 max-w-xl">
                {heroDescription || "Providing compassionate, cutting-edge healthcare with a team of dedicated specialists committed to your wellbeing."}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="flex flex-wrap gap-4 mb-12">
                <a href="#contact" className="dt-grad-teal text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-teal-200/60 hover:opacity-90 hover:scale-105 transition-all">
                  Book Appointment
                </a>
                <a href={`tel:${emergencyContact || displayPhone}`} className="flex items-center gap-2 bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-full font-bold hover:border-teal-400 hover:text-teal-700 transition-all shadow-sm">
                  <span className="text-red-500">🚨</span> Emergency Call
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-6">
                {[["✓", "Board Certified"], ["✓", "24/7 Support"], ["✓", "500+ Doctors"]].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
                    <span className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-xs">{icon}</span>
                    {label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right – Doctor Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
              className="relative dt-hero-right mt-12 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none"
            >
              {/* Floating card: experience */}
              <motion.div className="dt-floating absolute -left-8 top-1/3 bg-white rounded-2xl shadow-2xl p-4 z-20 border border-slate-100 min-w-max">
                <p className="text-2xl font-black text-teal-600">{experience || "15"}+</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Years Experience</p>
              </motion.div>

              {/* Floating card: patients */}
              <motion.div className="dt-floating-slow absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-2xl p-4 z-20 border border-slate-100 min-w-max" style={{ animationDelay: "1s" }}>
                <p className="text-2xl font-black text-blue-600">8K+</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Happy Patients</p>
              </motion.div>

              <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-100">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-500/20 z-10 rounded-[3rem]" />
                <Image
                  src={heroImage || "/images/templates/template-img-26.jpg"}
                  alt="Doctor" fill className="object-cover object-top" priority
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-[16px] border-teal-100 rounded-full opacity-60 pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-teal-400/20 rounded-full blur-xl pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* ── TRUST INDICATORS ── */}
        <Section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🏅", title: "Certified Doctors", sub: "Board-certified specialists" },
                { icon: "🚑", title: "24/7 Emergency", sub: "Always here for you" },
                { icon: "🔬", title: "Modern Equipment", sub: "Latest medical tech" },
                { icon: "💙", title: "Trusted Clinic", sub: "10,000+ happy patients" },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fadeUp(i * 0.1)} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-teal-50/60 to-blue-50/40 border border-teal-100/60 dt-card-hover">
                  <span className="text-3xl mb-3">{item.icon}</span>
                  <p className="font-bold text-slate-800 text-sm md:text-base">{item.title}</p>
                  <p className="text-slate-500 text-xs mt-1">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── ABOUT DOCTOR ── */}
        <Section id="about" className="py-24 bg-gradient-to-br from-slate-50 to-teal-50/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col lg:flex-row items-center gap-16">
            {/* Image side */}
            <motion.div variants={fadeUp(0)} className="w-full lg:w-5/12 relative flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image src={aboutImage || "/images/templates/template-img-27.jpg"} alt="About Doctor" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white rounded-2xl shadow-xl p-5 border border-slate-100">
                <p className="text-3xl font-black text-teal-600">{experience || "15"}+</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Years Exp.</p>
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal-400/20 rounded-full blur-xl" />
            </motion.div>

            {/* Content side */}
            <div className="w-full lg:w-7/12">
              <SectionLabel>{aboutUsTitle || "About The Doctor"}</SectionLabel>
              <SectionHeading>Committed to Medical Excellence</SectionHeading>
              <motion.p variants={fadeUp(0.15)} className="text-slate-500 leading-relaxed mb-8 text-base">{bio || "Welcome to our clinic. We are dedicated to providing the highest quality medical care, combining decades of experience with the latest medical innovations to deliver outstanding patient outcomes."}</motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "🎓", label: "Education", value: qualification || education || "MD – International Medical University" },
                  { icon: "🏥", label: "Hospital/Clinic", value: hospitalName || displayName },
                  { icon: "🌐", label: "Languages", value: languagesSpoken || "English, Spanish" },
                  { icon: "📜", label: "Certifications", value: certifications || "MBBS, MD, FRCP" },
                ].map((item, i) => (
                  <motion.div key={item.label} variants={fadeUp(0.1 + i * 0.07)} className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-0.5">{item.label}</p>
                      <p className="text-slate-700 text-sm font-semibold">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.a variants={fadeUp(0.3)} href="#contact" className="inline-block dt-grad-teal text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-teal-200/50 hover:opacity-90 hover:scale-105 transition-all">
                Get a Consultation
              </motion.a>
            </div>
          </div>
        </Section>

        {/* ── SERVICES ── */}
        <Section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-16">
              <SectionLabel>Our Specialties</SectionLabel>
              <SectionHeading>Comprehensive Medical Services</SectionHeading>
              <motion.p variants={fadeUp(0.2)} className="text-slate-500 max-w-xl mx-auto">Expert care across a wide range of medical disciplines, delivered with compassion and precision.</motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayServices.map((svc, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.07)} className="group p-7 bg-slate-50 rounded-3xl border border-slate-100 dt-card-hover cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/5 rounded-bl-full group-hover:bg-teal-400/10 transition-colors" />
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform border border-teal-100">
                    {svc.image ? (
                      <div className="relative w-full h-full rounded-2xl overflow-hidden"><Image src={svc.image} alt={svc.title || svc.name} fill className="object-cover" /></div>
                    ) : (svc.icon || "🩺")}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">{svc.title || svc.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.description || svc.desc || "Expert care and personalised consultation."}</p>
                  <div className="mt-4 text-teal-600 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <span>→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── WHY CHOOSE US ── */}
        <Section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 dt-grad-teal opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
          <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
            <div className="text-center mb-16">
              <motion.span variants={fadeUp(0)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-teal-200 mb-4">
                <span className="w-6 h-px bg-teal-300 inline-block" />Why Choose Us<span className="w-6 h-px bg-teal-300 inline-block" />
              </motion.span>
              <SectionHeading light>Why Patients Trust Us</SectionHeading>
              <motion.p variants={fadeUp(0.2)} className="text-teal-100 max-w-xl mx-auto">We combine world-class medical expertise with genuine compassion for every patient.</motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayWhyChoose.map((feat, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.1)} className="bg-white/10 backdrop-blur-sm rounded-3xl p-7 border border-white/20 hover:bg-white/20 transition-all dt-card-hover">
                  <div className="text-3xl mb-4">{feat.icon || "✦"}</div>
                  <h3 className="text-white font-bold text-base mb-2">{feat.title || feat.featureTitle}</h3>
                  <p className="text-teal-100 text-sm leading-relaxed">{feat.description || feat.featureDescription}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SCHEDULE ── */}
        <Section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <SectionLabel>Working Hours</SectionLabel>
              <SectionHeading>Clinic Schedule</SectionHeading>
            </div>
            <div className="space-y-4">
              {displaySchedule.map((row, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.08)} className="flex justify-between items-center bg-slate-50 rounded-2xl px-7 py-5 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition-all">
                  <span className="font-bold text-slate-800">{row.day}</span>
                  <div className="flex items-center gap-4 text-sm font-semibold">
                    <span className="text-teal-600">{row.open || row.openingTime}</span>
                    <span className="text-slate-300">–</span>
                    <span className="text-slate-600">{row.close || row.closingTime}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── STATS ── */}
        <Section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {displayStats.map((stat, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.1)} className="text-center">
                  <p className="dt-display text-4xl md:text-5xl font-bold text-teal-400 mb-2">{stat.value}</p>
                  <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── TESTIMONIALS (Carousel) ── */}
        <Section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <SectionLabel>Patient Reviews</SectionLabel>
              <SectionHeading>What Our Patients Say</SectionHeading>
            </div>
            <motion.div variants={fadeIn(0.15)} className="max-w-3xl mx-auto">
              <Carousel
                items={displayTestimonials}
                autoPlay
                interval={5000}
                renderItem={(item) => (
                  <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-3xl p-10 md:p-14 border border-slate-100 text-center mx-2">
                    <div className="flex justify-center mb-6">
                      {item.image ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg relative"><Image src={item.image} alt={item.name} fill className="object-cover" /></div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-2xl font-bold border-4 border-white shadow-lg">
                          {(item.name || "P").charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center mb-5"><Stars count={item.rating || 5} /></div>
                    <blockquote className="text-slate-600 text-base md:text-lg leading-relaxed italic mb-6 max-w-xl mx-auto">
                      "{item.review || item.text}"
                    </blockquote>
                    <p className="font-bold text-slate-900">{item.name || item.patientName}</p>
                    <p className="text-teal-600 text-xs font-semibold uppercase tracking-wider mt-1">Verified Patient</p>
                  </div>
                )}
              />
            </motion.div>
          </div>
        </Section>

        {/* ── TEAM DOCTORS ── */}
        <Section id="team" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <SectionLabel>Our Specialists</SectionLabel>
              <SectionHeading>Meet The Doctors</SectionHeading>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayTeam.map((doc, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.1)} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 dt-card-hover group">
                  <div className="relative h-64 bg-gradient-to-br from-teal-50 to-blue-50">
                    {doc.image ? (
                      <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">👨‍⚕️</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{doc.name || doc.doctorName}</h3>
                    <p className="text-teal-600 text-sm font-semibold mb-2">{doc.specialization}</p>
                    <p className="text-slate-500 text-xs">{doc.experience} Experience</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── FAQ ── */}
        <Section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Frequently Asked Questions</SectionHeading>
            </div>
            <div className="space-y-3">
              {displayFaqs.map((faq, i) => (
                <FaqItem key={i} question={faq.question} answer={faq.answer} idx={i} />
              ))}
            </div>
          </div>
        </Section>

        {/* ── INSURANCE PARTNERS ── */}
        <Section className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-12">
              <SectionLabel>Partners</SectionLabel>
              <SectionHeading>Accepted Insurance Plans</SectionHeading>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {displayInsurance.map((ins, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.06)} className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center gap-2 border border-slate-100 shadow-sm dt-card-hover">
                  {ins.logo ? (
                    <div className="relative h-10 w-full"><Image src={ins.logo} alt={ins.name} fill className="object-contain" /></div>
                  ) : (
                    <span className="text-2xl">🏢</span>
                  )}
                  <p className="text-slate-600 text-xs font-bold text-center leading-tight">{ins.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── BLOG ── */}
        {(enableBlog !== false && blog?.enabled !== false) && (
          <Section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
              <div className="text-center mb-14">
                <SectionLabel>{blogSubtitle || blog?.subtitle || "Health Tips"}</SectionLabel>
                <SectionHeading>{blogSectionTitle || blog?.title || "Latest Health Insights"}</SectionHeading>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { tag: "Wellness", title: "10 Habits for a Healthier Heart", excerpt: "Simple daily practices that can significantly reduce your risk of cardiovascular disease.", date: "May 2025" },
                  { tag: "Nutrition", title: "The Power of Anti-Inflammatory Foods", excerpt: "Discover which foods can help your body fight inflammation and boost immunity naturally.", date: "Apr 2025" },
                  { tag: "Mental Health", title: "Managing Stress in Modern Life", excerpt: "Evidence-based strategies to help you maintain mental balance in a fast-paced world.", date: "Mar 2025" },
                ].map((post, i) => (
                  <motion.div key={i} variants={fadeUp(i * 0.1)} className="group rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm dt-card-hover cursor-pointer">
                    <div className="h-48 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                      {["❤️", "🥗", "🧘"][i]}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">{post.tag}</span>
                      <h3 className="font-bold text-slate-900 text-base mt-3 mb-2 group-hover:text-teal-700 transition-colors">{post.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                      <p className="text-slate-400 text-xs">{post.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* ── GALLERY ── */}
        <Section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <SectionLabel>Clinic Gallery</SectionLabel>
              <SectionHeading>Our Facilities</SectionHeading>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayGallery.map((item, i) => (
                <motion.div key={i} variants={fadeUp(i * 0.08)} className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                  {item.image ? (
                    <Image src={item.image} alt={item.caption || `Gallery ${i + 1}`} fill className="object-cover gallery-img" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${["from-teal-100 to-blue-200", "from-blue-100 to-indigo-200", "from-emerald-100 to-teal-200", "from-cyan-100 to-sky-200"][i % 4]} flex items-center justify-center text-4xl gallery-img`}>
                      {["🏥", "💊", "🔬", "🩺"][i % 4]}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-bold">{item.caption || `Facility ${i + 1}`}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-14">
              <SectionLabel>Get In Touch</SectionLabel>
              <SectionHeading>Contact & Location</SectionHeading>
            </div>

            {/* Emergency Banner */}
            {(emergencyContact || displayPhone) && (
              <motion.div variants={fadeUp(0)} className="mb-10 bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <p className="font-bold text-red-800 text-sm">Emergency? We're available 24/7</p>
                    <p className="text-red-600 text-xs">{emergencyAvailability || "Immediate response for all medical emergencies"}</p>
                  </div>
                </div>
                <a href={`tel:${displayEmergency}`} className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition-colors flex-shrink-0">
                  Call {displayEmergency}
                </a>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Cards */}
              <div className="space-y-4">
                {[
                  { icon: "📍", label: "Address", value: displayAddress },
                  { icon: "📞", label: "Phone", value: displayPhone },
                  { icon: "✉️", label: "Email", value: displayEmail },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", value: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", value: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp(i * 0.08)} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all">
                    <span className="text-2xl w-10 text-center flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">{item.label}</p>
                      <p className="font-semibold text-slate-800">{item.value}</p>
                    </div>
                  </motion.div>
                ))}

                {whatsappNumber && (
                  <motion.a
                    variants={fadeUp(0.4)}
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-500 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-green-200/50 hover:bg-green-600 transition-colors w-full justify-center"
                  >
                    💬 Chat on WhatsApp
                  </motion.a>
                )}
              </div>

              {/* Map */}
              <motion.div variants={fadeIn(0.2)} className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 h-80 lg:h-full min-h-[320px] bg-slate-100 flex items-center justify-center">
                {googleMapsEmbed ? (
                  <iframe src={googleMapsEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy" title="Clinic Location" />
                ) : (
                  <div className="text-center text-slate-400 p-8">
                    <div className="text-5xl mb-4">🗺️</div>
                    <p className="font-semibold text-slate-500">Map will appear here</p>
                    <p className="text-sm mt-1">Add a Google Maps embed link in the editor</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <footer className="bg-slate-900 text-white pt-16 pb-8 px-4 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 dt-grad-teal rounded-lg flex items-center justify-center text-white text-sm">🏥</div>
                  <span className="dt-display text-lg font-bold">{displayName}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">Delivering exceptional medical care with compassion, expertise, and the latest innovations.</p>
                {/* Social */}
                <div className="flex gap-3">
                  {["facebook", "twitter", "instagram", "linkedin"].map((s) => (
                    <a key={s} href={socialLinks?.[s] || "#"} className="w-9 h-9 bg-white/10 hover:bg-teal-600 rounded-xl flex items-center justify-center text-sm transition-colors" title={s}>
                      {s === "facebook" ? "f" : s === "twitter" ? "𝕏" : s === "instagram" ? "📷" : "in"}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5">Quick Links</p>
                <ul className="space-y-3 text-sm text-slate-400">
                  {navLinks.map(({ href, label }) => (
                    <li key={href}><a href={href} className="hover:text-teal-400 transition-colors font-medium">{label}</a></li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5">Services</p>
                <ul className="space-y-3 text-sm text-slate-400">
                  {displayServices.slice(0, 5).map((s, i) => (
                    <li key={i}><a href="#services" className="hover:text-teal-400 transition-colors font-medium">{s.title || s.name}</a></li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5">Contact</p>
                <div className="space-y-3 text-sm text-slate-400 break-words">
                  <p className="flex gap-2"><span>📍</span>{displayAddress}</p>
                  <p className="flex gap-2"><span>📞</span>{displayPhone}</p>
                  <p className="flex gap-2"><span>✉</span><span className="break-all">{displayEmail}</span></p>
                  {emergencyAvailability && <p className="flex gap-2 text-red-400"><span>🚨</span>{emergencyAvailability}</p>}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            {(footerDisclaimer) && (
              <div className="bg-white/5 rounded-2xl p-4 mb-8 text-xs text-slate-500 leading-relaxed border border-white/10">
                <span className="font-bold text-slate-400">Medical Disclaimer: </span>
                {footerDisclaimer}
              </div>
            )}

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600 font-semibold">
              <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}</p>
              <div className="flex gap-5">
                <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}