"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TemplateLayout from "./TemplateLayout";

/* ─── Animation Variants ─── */
const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] } },
});
const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] } },
});
const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] } },
});
const fadeSlideUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

/* ─── Reveal Section Wrapper ─── */
function Reveal({ children, className = "", direction = "up", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const variant =
    direction === "left" ? slideLeft(delay) :
      direction === "right" ? slideRight(delay) :
        fadeSlideUp(delay);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variant} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Stagger Container ─── */
function StaggerSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Gold Divider ─── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 bg-amber-400" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      <div className="h-px w-4 bg-amber-400/50" />
    </div>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children, light = false }) {
  return (
    <div className="mb-3">
      <GoldDivider />
      <span className={`text-xs font-bold uppercase tracking-[0.25em] ${light ? "text-amber-300" : "text-amber-600"}`}>{children}</span>
    </div>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({ children, light = false, className = "" }) {
  return (
    <h2 className={`dt2-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-5 ${light ? "text-white" : "text-slate-900"} ${className}`}>
      {children}
    </h2>
  );
}

/* ─── Stars ─── */
function Stars({ count = 5 }) {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? "text-amber-400 text-sm" : "text-slate-300 text-sm"}>★</span>
      ))}
    </span>
  );
}

/* ─── Accordion FAQ ─── */
function FaqItem({ question, answer, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeSlideUp(idx * 0.06)} className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-slate-800 text-sm md:text-base group-hover:text-amber-700 transition-colors leading-snug">{question}</span>
        <motion.div
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-7 h-7 min-w-[1.75rem] rounded-full border border-amber-300 flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:bg-amber-50 transition-colors"
        >
          +
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-500 text-sm leading-relaxed pr-4 md:pr-10">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Testimonial Slider ─── */
function TestimonialSlider({ items }) {
  const [active, setActive] = useState(0);
  const len = items.length;

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % len), 5500);
    return () => clearInterval(t);
  }, [len]);

  return (
    <div>
      <div className="relative" style={{ minHeight: "260px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-amber-100/60 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="text-4xl text-amber-300 dt2-serif mb-3 leading-none">"</div>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed italic mb-5">
                  {items[active].review || items[active].text}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {items[active].image ? (
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-200 relative flex-shrink-0">
                    <Image src={items[active].image} alt={items[active].name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold border-2 border-amber-200 flex-shrink-0">
                    {(items[active].name || "P").charAt(0)}
                  </div>
                )}
                <div>
                  <Stars count={items[active].rating || 5} />
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{items[active].name || items[active].patientName}</p>
                  <p className="text-amber-600 text-xs font-medium">Verified Patient</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-amber-500" : "w-3 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN TEMPLATE
══════════════════════════════════════ */
export default function DoctorTemplate2({ data }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Data destructure ── */
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
    { name: "Sarah Mitchell", review: "The team here is absolutely exceptional. I felt cared for from the moment I walked in.", rating: 5 },
    { name: "James Anderson", review: "World-class facilities and doctors who truly listen. Highly recommend to anyone.", rating: 5 },
    { name: "Priya Sharma", review: "Finally a clinic that combines expertise with genuine warmth and compassion.", rating: 5 },
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
    { name: "BlueCross BlueShield" }, { name: "Aetna" }, { name: "Cigna" },
    { name: "UnitedHealth" }, { name: "Humana" }, { name: "Medicare" },
  ];
  const displayInsurance = insurancePartners?.length ? insurancePartners : defaultInsurance;

  const defaultGallery = [
    { caption: "Modern Reception" }, { caption: "Consultation Room" },
    { caption: "Diagnostic Lab" }, { caption: "Patient Lounge" },
  ];
  const displayGallery = gallery?.length ? gallery : defaultGallery;

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Doctor" hideHeader hideFooter>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

        .dt2-root { font-family: 'Outfit', sans-serif; scroll-behavior: smooth; background: #faf9f7; color: #1c1a18; }
        .dt2-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .dt2-navy { background: #0e1f38; }
        .dt2-amber-bg { background: #d97706; }
        .dt2-amber-light { background: #fef3c7; }
        .dt2-dot-bg { background-image: radial-gradient(circle, #d9770615 1px, transparent 1px); background-size: 20px 20px; }
        .dt2-line-bg { background-image: repeating-linear-gradient(90deg, #0e1f3808 0, #0e1f3808 1px, transparent 0, transparent 50%); background-size: 32px 32px; }
        .dt2-diagonal { background: repeating-linear-gradient(-55deg, transparent, transparent 4px, #d9770608 4px, #d9770608 5px); }
        .dt2-hero-overlay { background: linear-gradient(to right, #0e1f38 50%, transparent 90%); }
        .dt2-card { transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.35s ease; }
        .dt2-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 14px 40px rgba(14,31,56,0.10); }
        .dt2-num { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 700; color: #fbbf2430; line-height: 1; position: absolute; top: 10px; right: 14px; }
        .dt2-nav-link { position: relative; }
        .dt2-nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1.5px; background:#d97706; transition:width 0.3s ease; }
        .dt2-nav-link:hover::after { width:100%; }
        .dt2-pill { display: inline-flex; align-items: center; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; border: 1px solid #fde68a; }
        .dt2-schedule-row { display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 1.25rem; border-left: 3px solid transparent; transition: border-color 0.2s, background 0.2s; }
        .dt2-schedule-row:hover { border-left-color: #d97706; background: #fffbeb; }
        .dt2-stat { border-top: 2px solid #d97706; padding-top: 0.9rem; }
        .dt2-gallery-item { overflow: hidden; }
        .dt2-gallery-item img, .dt2-gallery-item > div { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
        .dt2-gallery-item:hover img, .dt2-gallery-item:hover > div { transform: scale(1.06); }

        /* ─── Mobile hero: show image as background ─── */
        @media (max-width: 1023px) {
          .dt2-hero-img-col { display: none; }
          .dt2-hero-mobile-bg {
            position: absolute; inset: 0;
            background-size: cover; background-position: center top;
          }
          .dt2-hero-mobile-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to bottom, rgba(14,31,56,0.80) 0%, rgba(14,31,56,0.92) 60%, #0e1f38 100%);
          }
        }
        @media (min-width: 1024px) {
          .dt2-hero-mobile-bg { display: none; }
          .dt2-hero-mobile-overlay { display: none; }
        }

        /* ─── Trust strip: no dividers on mobile ─── */
        @media (max-width: 639px) {
          .dt2-trust-strip > * { border-right: none !important; }
        }

        /* ─── About: remove negative offset on mobile ─── */
        @media (max-width: 767px) {
          .dt2-about-offset { display: none; }
          .dt2-about-exp { top: auto; bottom: -1rem; right: 0.5rem; }
        }

        /* ─── Schedule row: wrap text on very small screens ─── */
        @media (max-width: 400px) {
          .dt2-schedule-row { flex-direction: column; align-items: flex-start; gap: 6px; }
        }

        /* ─── Insurance grid: 2 cols on xs ─── */
        @media (max-width: 479px) {
          .dt2-insurance-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* ─── Gallery: 2 col stacked on mobile ─── */
        @media (max-width: 639px) {
          .dt2-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dt2-gallery-featured { grid-column: span 2 !important; grid-row: span 1 !important; }
        }

        /* ─── Testimonial min-height: shorter on mobile ─── */
        @media (max-width: 639px) {
          .dt2-testimonial-inner { min-height: 220px !important; }
        }
      `}</style>

      <div className="dt2-root flex flex-col min-h-screen overflow-x-hidden">

        {/* ── ANNOUNCEMENT BAR ── */}
        <div className="dt2-navy text-white py-2 px-4 md:px-10 flex flex-wrap justify-between items-center text-xs font-medium gap-1.5">
          <div className="flex flex-wrap gap-3 sm:gap-5 items-center">
            <span className="flex items-center gap-1.5 truncate max-w-[180px] sm:max-w-none">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />📞 {displayPhone}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />✉ {displayEmail}
            </span>
          </div>
          <span className="hidden md:flex items-center gap-1.5 text-amber-300">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            🕒 {workingHours || "Mon – Sat: 8 AM – 8 PM"}
          </span>
        </div>

        {/* ── NAVBAR ── */}
        <motion.header
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/96 backdrop-blur-xl shadow-md shadow-slate-200/50 border-b border-amber-100/40" : "bg-white border-b border-slate-100"}`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2.5 min-w-0">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-9 w-32 flex-shrink-0"><Image src={logoUrl} alt={displayName} fill className="object-contain" /></div>
              ) : (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 dt2-navy rounded-lg flex items-center justify-center text-white text-sm">🏥</div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 dt2-amber-bg rounded-full" />
                  </div>
                  <div className="min-w-0">
                    <span
                      className="dt2-serif font-bold text-slate-900 leading-none block truncate"
                      style={{ fontSize: clinicNameFontSize ? `${clinicNameFontSize}px` : "clamp(1rem, 3vw, 1.25rem)" }}
                    >{displayName}</span>
                    <span className="text-[9px] tracking-[0.18em] uppercase text-amber-600 font-bold block leading-tight">{specialty || "Medical Excellence"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 flex-shrink-0">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="dt2-nav-link text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1">{label}</a>
              ))}
              <a href="#contact" className="relative overflow-hidden dt2-navy text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-all hover:scale-105 group flex-shrink-0">
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 dt2-amber-bg scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-lg" />
              </a>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0"
            >
              <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }} transition={{ duration: 0.2 }} className="w-5 h-0.5 bg-slate-800 rounded-full block" />
              <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-5 h-0.5 bg-slate-800 rounded-full block" />
              <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }} transition={{ duration: 0.2 }} className="w-5 h-0.5 bg-slate-800 rounded-full block" />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
              >
                <div className="px-5 py-5 flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="text-slate-800 font-semibold hover:text-amber-700 transition-colors text-base py-1 border-b border-slate-50 last:border-0">{label}</a>
                  ))}
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="dt2-navy text-white px-6 py-3 rounded-lg text-sm font-bold text-center mt-1">Book Appointment</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ══ HERO ══ */}
        <section id="home" ref={heroRef} className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center overflow-hidden dt2-navy">
          {/* Mobile: doctor image as faded background */}
          <div
            className="dt2-hero-mobile-bg"
            style={{ backgroundImage: `url(${heroImage || "/images/templates/template-img-26.jpg"})` }}
          />
          <div className="dt2-hero-mobile-overlay" />

          {/* Background pattern */}
          <div className="absolute inset-0 dt2-line-bg opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 40%, #d97706 0%, transparent 70%)" }} />

          {/* Desktop: Doctor Image column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="dt2-hero-img-col absolute right-0 top-0 bottom-0 w-1/2"
          >
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <Image src={heroImage || "/images/templates/template-img-26.jpg"} alt="Doctor" fill className="object-cover object-top" priority />
              <div className="absolute inset-0 dt2-hero-overlay" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full relative z-10 py-16 sm:py-20 lg:py-24">
            <motion.div style={{ y: textY }} className="max-w-xl w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
                <span className="dt2-pill mb-5 inline-flex" style={{ fontSize: specialtyFontSize ? `${specialtyFontSize}px` : undefined }}>
                  ◆ {specialty || "Expert Medical Care"}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="dt2-serif text-white font-bold leading-[1.08] mb-5"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : "clamp(2.2rem, 6vw, 4.5rem)" }}
              >
                {heroTitle || "Your Health,\nOur Highest\nPriority"}
              </motion.h1>

              <motion.div
                initial={{ width: 0 }} animate={{ width: "3.5rem" }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="h-0.5 bg-amber-400 mb-5"
              />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.65 }} className="text-slate-200 text-sm sm:text-base leading-relaxed mb-2 font-medium">
                {tagline || "Trusted Medical Excellence"}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.75 }} className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
                {heroDescription || "Providing compassionate, cutting-edge healthcare with a team of dedicated specialists committed to your wellbeing."}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.85 }} className="flex flex-wrap gap-3 mb-10">
                <a href="#contact" className="dt2-amber-bg text-white px-6 sm:px-8 py-3.5 rounded-lg font-bold shadow-xl shadow-amber-900/30 hover:brightness-110 hover:scale-105 transition-all text-sm">
                  Book Appointment
                </a>
                <a href={`tel:${displayEmergency}`} className="flex items-center gap-2 border border-white/30 text-white px-6 sm:px-8 py-3.5 rounded-lg font-bold hover:border-amber-400 hover:text-amber-300 transition-all text-sm">
                  <span>🚨</span> Emergency Line
                </a>
              </motion.div>

              {/* Mini stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap gap-6 sm:gap-8 border-t border-white/10 pt-7">
                {[["15+", "Years Experience"], ["8K+", "Patients Treated"], ["98%", "Satisfaction"]].map(([val, label]) => (
                  <div key={label}>
                    <p className="dt2-serif text-amber-400 text-xl sm:text-2xl font-bold leading-none">{val}</p>
                    <p className="text-slate-400 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══ TRUST STRIP ══ */}
        <section className="bg-white border-b border-slate-100">
          <StaggerSection className="dt2-trust-strip max-w-7xl mx-auto px-4 md:px-10 py-8 grid grid-cols-2 sm:grid-cols-4 gap-0 sm:divide-x divide-slate-100">
            {[
              { icon: "🏅", title: "Certified Doctors", sub: "Board-certified specialists" },
              { icon: "🚑", title: "24/7 Emergency", sub: "Always here for you" },
              { icon: "🔬", title: "Modern Equipment", sub: "Latest medical technology" },
              { icon: "💙", title: "Trusted Care", sub: "10,000+ happy patients" },
            ].map((item, i) => (
              <motion.div key={item.title} variants={scaleIn(i * 0.08)} className="flex flex-col items-center text-center px-4 py-4 sm:px-6">
                <span className="text-2xl mb-2">{item.icon}</span>
                <p className="font-bold text-slate-800 text-sm mb-0.5 leading-snug">{item.title}</p>
                <p className="text-slate-400 text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </StaggerSection>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="py-16 sm:py-20 md:py-28 overflow-hidden bg-faf9f7">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Image */}
            <Reveal direction="left" className="w-full lg:w-5/12 flex-shrink-0">
              <div className="relative mx-auto" style={{ maxWidth: "420px" }}>
                {/* Offset amber rect — hidden on small screens to prevent layout bleed */}
                <div className="dt2-about-offset absolute -bottom-4 -left-4 w-full h-full dt2-amber-light rounded-2xl hidden sm:block" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] sm:aspect-[4/5]">
                  <Image src={aboutImage || "/images/templates/template-img-27.jpg"} alt="About Doctor" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                </div>
                {/* Experience badge */}
                <div className="dt2-about-exp absolute -top-3 -right-3 sm:-top-4 sm:-right-6 dt2-navy rounded-xl shadow-xl p-3.5 sm:p-5 z-10 border-2 border-amber-400/40">
                  <p className="dt2-serif text-2xl sm:text-3xl font-bold text-amber-400">{experience || "15"}+</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">Years Exp.</p>
                </div>
              </div>
            </Reveal>

            {/* Content */}
            <Reveal direction="right" className="w-full lg:w-7/12">
              <SectionLabel>{aboutUsTitle || "About The Doctor"}</SectionLabel>
              <SectionHeading>Committed to Medical Excellence</SectionHeading>
              <p className="text-slate-500 leading-relaxed mb-7 text-sm sm:text-base">{bio || "Welcome to our clinic. We are dedicated to providing the highest quality medical care, combining decades of experience with the latest medical innovations to deliver outstanding patient outcomes."}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {[
                  { icon: "🎓", label: "Education", value: qualification || education || "MD – International Medical University" },
                  { icon: "🏥", label: "Hospital / Clinic", value: hospitalName || displayName },
                  { icon: "🌐", label: "Languages", value: languagesSpoken || "English, Spanish" },
                  { icon: "📜", label: "Certifications", value: certifications || "MBBS, MD, FRCP" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 items-start p-3.5 bg-white rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-0.5">{item.label}</p>
                      <p className="text-slate-700 text-sm font-semibold truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 dt2-amber-bg text-white px-7 py-3.5 rounded-lg font-bold hover:brightness-110 transition-all hover:scale-105 shadow-lg shadow-amber-200 text-sm">
                Get a Consultation →
              </a>
            </Reveal>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1/3 dt2-dot-bg opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <Reveal><SectionLabel>Our Specialties</SectionLabel></Reveal>
                <Reveal><SectionHeading>Comprehensive Medical Services</SectionHeading></Reveal>
              </div>
              <Reveal direction="right">
                <p className="text-slate-500 max-w-xs text-sm leading-relaxed">Expert care across a wide range of medical disciplines, delivered with compassion.</p>
              </Reveal>
            </div>

            <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayServices.map((svc, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.06)} className="relative bg-white rounded-2xl border border-slate-100 p-6 dt2-card cursor-pointer group hover:border-amber-200">
                  <span className="dt2-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-amber-100 transition-all flex-shrink-0">
                    {svc.image ? (
                      <div className="relative w-full h-full rounded-xl overflow-hidden"><Image src={svc.image} alt={svc.title || svc.name} fill className="object-cover" /></div>
                    ) : (svc.icon || "🩺")}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors leading-snug">{svc.title || svc.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.description || svc.desc || "Expert care and personalised consultation."}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">Learn more →</div>
                </motion.div>
              ))}
            </StaggerSection>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="py-16 sm:py-20 md:py-28 dt2-navy relative overflow-hidden">
          <div className="absolute inset-0 dt2-diagonal pointer-events-none opacity-50" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
            <div className="text-center mb-12">
              <Reveal><SectionLabel light>Why Choose Us</SectionLabel></Reveal>
              <Reveal><SectionHeading light>Why Patients Trust Us</SectionHeading></Reveal>
              <Reveal><p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">We combine world-class medical expertise with genuine compassion for every patient we serve.</p></Reveal>
            </div>
            <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {displayWhyChoose.map((feat, i) => (
                <motion.div key={i} variants={fadeSlideUp(i * 0.1)} className="group border border-white/10 rounded-2xl p-6 hover:border-amber-400/50 hover:bg-white/5 transition-all dt2-card">
                  <div className="text-3xl mb-3">{feat.icon || "✦"}</div>
                  <div className="w-8 h-px bg-amber-400/50 mb-3 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-white font-bold text-sm mb-2 leading-snug">{feat.title || feat.featureTitle}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{feat.description || feat.featureDescription}</p>
                </motion.div>
              ))}
            </StaggerSection>
          </div>
        </section>

        {/* ══ SCHEDULE ══ */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              <div className="w-full md:w-1/3">
                <Reveal>
                  <SectionLabel>Working Hours</SectionLabel>
                  <SectionHeading>Clinic Schedule</SectionHeading>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">We're here when you need us most. Drop in or call ahead.</p>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-amber-700 font-bold text-sm border-b border-amber-300 pb-0.5 hover:border-amber-600 transition-colors">
                    Book a slot →
                  </a>
                </Reveal>
              </div>
              <div className="w-full md:w-2/3">
                <StaggerSection className="divide-y divide-slate-100 rounded-2xl overflow-hidden border border-slate-100">
                  {displaySchedule.map((row, i) => (
                    <motion.div key={i} variants={slideLeft(i * 0.07)} className="dt2-schedule-row bg-white">
                      <span className="font-semibold text-slate-800 text-sm">{row.day}</span>
                      <div className="flex items-center gap-2.5 text-sm flex-shrink-0">
                        <span className="font-bold text-amber-700">{row.open || row.openingTime}</span>
                        <span className="text-slate-300">—</span>
                        <span className="text-slate-600 font-medium">{row.close || row.closingTime}</span>
                      </div>
                    </motion.div>
                  ))}
                </StaggerSection>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="py-14 sm:py-20 bg-amber-50 border-y border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <StaggerSection className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 md:gap-14">
              {displayStats.map((stat, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.1)} className="dt2-stat">
                  <p className="dt2-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-1 leading-none">{stat.value}</p>
                  <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mt-1 leading-snug">{stat.label}</p>
                </motion.div>
              ))}
            </StaggerSection>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="py-16 sm:py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              {/* Label side */}
              <div className="w-full lg:w-2/5">
                <Reveal>
                  <SectionLabel>Patient Reviews</SectionLabel>
                  <SectionHeading>What Our Patients Say</SectionHeading>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">Real stories from real patients who've experienced our care.</p>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-amber-700 font-bold text-xs">P{n}</div>
                      ))}
                    </div>
                    <span className="text-slate-500 text-sm font-medium">2,000+ reviews</span>
                  </div>
                </Reveal>
              </div>
              {/* Slider */}
              <Reveal direction="right" className="w-full lg:w-3/5">
                <div className="dt2-testimonial-inner" style={{ minHeight: "260px" }}>
                  <TestimonialSlider items={displayTestimonials} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section id="team" className="py-16 sm:py-20 md:py-28 bg-slate-50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-1/2 h-2/3 dt2-dot-bg opacity-25 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative">
            <div className="text-center mb-12">
              <Reveal><SectionLabel>Our Specialists</SectionLabel></Reveal>
              <Reveal><SectionHeading>Meet The Doctors</SectionHeading></Reveal>
            </div>
            <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayTeam.map((doc, i) => (
                <motion.div key={i} variants={fadeSlideUp(i * 0.1)} className="bg-white rounded-2xl overflow-hidden border border-slate-100 dt2-card group">
                  <div className="relative h-56 sm:h-64 bg-gradient-to-br from-amber-50 to-slate-100 overflow-hidden">
                    {doc.image ? (
                      <Image src={doc.image} alt={doc.name || doc.doctorName} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-500">👨‍⚕️</div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-1 dt2-amber-bg" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-base mb-0.5">{doc.name || doc.doctorName}</h3>
                    <p className="text-amber-700 text-sm font-semibold mb-1">{doc.specialization}</p>
                    <p className="text-slate-400 text-xs font-medium">{doc.experience} Experience</p>
                  </div>
                </motion.div>
              ))}
            </StaggerSection>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="py-16 sm:py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              <div className="w-full md:w-1/3 md:sticky md:top-28">
                <Reveal>
                  <SectionLabel>FAQ</SectionLabel>
                  <SectionHeading>Common Questions</SectionHeading>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">Can't find what you're looking for? Contact us directly.</p>
                  <a href={`tel:${displayPhone}`} className="inline-flex items-center gap-2 dt2-amber-bg text-white px-6 py-3 rounded-lg text-sm font-bold hover:brightness-110 transition-all">
                    📞 Call Us
                  </a>
                </Reveal>
              </div>
              <StaggerSection className="w-full md:w-2/3">
                {displayFaqs.map((faq, i) => (
                  <FaqItem key={i} question={faq.question} answer={faq.answer} idx={i} />
                ))}
              </StaggerSection>
            </div>
          </div>
        </section>

        {/* ══ INSURANCE ══ */}
        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center mb-10">
              <Reveal><SectionLabel>Partners</SectionLabel></Reveal>
              <Reveal><SectionHeading>Accepted Insurance Plans</SectionHeading></Reveal>
            </div>
            <StaggerSection className="dt2-insurance-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {displayInsurance.map((ins, i) => (
                <motion.div key={i} variants={scaleIn(i * 0.05)} className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-slate-100 hover:border-amber-200 transition-colors dt2-card">
                  {ins.logo ? (
                    <div className="relative h-9 w-full"><Image src={ins.logo} alt={ins.name} fill className="object-contain" /></div>
                  ) : (
                    <span className="text-xl">🏢</span>
                  )}
                  <p className="text-slate-600 text-xs font-bold text-center leading-tight">{ins.name}</p>
                </motion.div>
              ))}
            </StaggerSection>
          </div>
        </section>

        {/* ══ BLOG ══ */}
        {(enableBlog !== false && blog?.enabled !== false) && (
          <section className="py-16 sm:py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
                <div>
                  <Reveal><SectionLabel>{blogSubtitle || blog?.subtitle || "Health Tips"}</SectionLabel></Reveal>
                  <Reveal><SectionHeading>{blogSectionTitle || blog?.title || "Latest Health Insights"}</SectionHeading></Reveal>
                </div>
                <Reveal direction="right" className="flex-shrink-0">
                  <a href="#" className="text-amber-700 font-bold text-sm border-b border-amber-300 pb-0.5 hover:border-amber-600 transition-colors whitespace-nowrap">
                    View all articles →
                  </a>
                </Reveal>
              </div>
              <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { tag: "Wellness", title: "10 Habits for a Healthier Heart", excerpt: "Simple daily practices that can significantly reduce your risk of cardiovascular disease.", date: "May 2025", emoji: "❤️" },
                  { tag: "Nutrition", title: "The Power of Anti-Inflammatory Foods", excerpt: "Discover which foods can help your body fight inflammation and boost immunity naturally.", date: "Apr 2025", emoji: "🥗" },
                  { tag: "Mental Health", title: "Managing Stress in Modern Life", excerpt: "Evidence-based strategies to help you maintain mental balance in a fast-paced world.", date: "Mar 2025", emoji: "🧘" },
                ].map((post, i) => (
                  <motion.article key={i} variants={fadeSlideUp(i * 0.1)} className="group cursor-pointer">
                    <div className="dt2-gallery-item h-44 sm:h-52 bg-amber-50 rounded-2xl flex items-center justify-center text-5xl mb-4 border border-amber-100 overflow-hidden">
                      <div className="transform group-hover:scale-110 transition-transform duration-500 text-5xl">{post.emoji}</div>
                    </div>
                    <span className="dt2-pill text-[10px]">{post.tag}</span>
                    <h3 className="dt2-serif font-bold text-slate-900 text-lg sm:text-xl mt-3 mb-2 group-hover:text-amber-700 transition-colors leading-tight">{post.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-2">{post.excerpt}</p>
                    <p className="text-slate-400 text-xs font-medium">{post.date}</p>
                  </motion.article>
                ))}
              </StaggerSection>
            </div>
          </section>
        )}

        {/* ══ GALLERY ══ */}
        <section className="py-16 sm:py-20 md:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center mb-12">
              <Reveal><SectionLabel>Clinic Gallery</SectionLabel></Reveal>
              <Reveal><SectionHeading>Our Facilities</SectionHeading></Reveal>
            </div>
            <StaggerSection className="dt2-gallery-grid grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {displayGallery.map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn(i * 0.08)}
                  className={`dt2-gallery-item relative rounded-2xl overflow-hidden group cursor-pointer aspect-square ${i === 0 ? "dt2-gallery-featured md:col-span-2 md:row-span-2" : ""}`}
                >
                  {item.image ? (
                    <Image src={item.image} alt={item.caption || `Gallery ${i + 1}`} fill className="object-cover" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-4xl ${["bg-amber-50", "bg-slate-100", "bg-amber-100", "bg-slate-50"][i % 4]}`}>
                      {["🏥", "💊", "🔬", "🩺"][i % 4]}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <p className="text-white text-xs sm:text-sm font-bold">{item.caption || `Facility ${i + 1}`}</p>
                  </div>
                  {i === 0 && <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-amber-400" />}
                </motion.div>
              ))}
            </StaggerSection>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" className="py-16 sm:py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center mb-12">
              <Reveal><SectionLabel>Get In Touch</SectionLabel></Reveal>
              <Reveal><SectionHeading>Contact & Location</SectionHeading></Reveal>
            </div>

            {/* Emergency Banner */}
            {(emergencyContact || displayPhone) && (
              <Reveal className="mb-8 sm:mb-10">
                <div className="dt2-navy rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-amber-500/20">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="text-2xl flex-shrink-0">🚨</span>
                    <div>
                      <p className="font-bold text-amber-400 text-sm">Emergency? We're available 24/7</p>
                      <p className="text-slate-400 text-xs leading-snug">{emergencyAvailability || "Immediate response for all medical emergencies"}</p>
                    </div>
                  </div>
                  <a href={`tel:${displayEmergency}`} className="dt2-amber-bg text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all flex-shrink-0 w-full sm:w-auto text-center">
                    Call {displayEmergency}
                  </a>
                </div>
              </Reveal>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Details */}
              <StaggerSection className="space-y-3">
                {[
                  { icon: "📍", label: "Address", value: displayAddress },
                  { icon: "📞", label: "Phone", value: displayPhone },
                  { icon: "✉️", label: "Email", value: displayEmail },
                  ...(whatsappNumber ? [{ icon: "💬", label: "WhatsApp", value: whatsappNumber }] : []),
                  ...(ambulanceNumber ? [{ icon: "🚑", label: "Ambulance", value: ambulanceNumber }] : []),
                ].map((item, i) => (
                  <motion.div key={i} variants={slideLeft(i * 0.07)} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all group">
                    <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">{item.label}</p>
                      <p className="font-semibold text-slate-800 text-sm truncate">{item.value}</p>
                    </div>
                  </motion.div>
                ))}

                {whatsappNumber && (
                  <Reveal>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-green-500 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-green-200/50 hover:bg-green-600 transition-colors w-full justify-center text-sm mt-1"
                    >
                      💬 Chat on WhatsApp
                    </a>
                  </Reveal>
                )}
              </StaggerSection>

              {/* Map */}
              <Reveal direction="right" className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center" style={{ minHeight: "300px", height: "100%" }}>
                {googleMapsEmbed ? (
                  <iframe src={googleMapsEmbed} className="w-full h-full border-0" style={{ minHeight: "300px" }} allowFullScreen loading="lazy" title="Clinic Location" />
                ) : (
                  <div className="text-center text-slate-400 p-8">
                    <div className="text-5xl mb-4">🗺️</div>
                    <p className="font-semibold text-slate-500 text-sm">Map will appear here</p>
                    <p className="text-xs mt-1">Add a Google Maps embed link in the editor</p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="dt2-navy text-white pt-14 pb-8 px-4 sm:px-6 md:px-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-amber-400/30" />
          <div className="absolute inset-0 dt2-diagonal opacity-25 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 dt2-amber-bg rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0">🏥</div>
                  <span className="dt2-serif text-lg font-bold truncate">{displayName}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">Delivering exceptional medical care with compassion, expertise, and innovation.</p>
                <div className="flex gap-2.5">
                  {["facebook", "twitter", "instagram", "linkedin"].map((s) => (
                    <a key={s} href={socialLinks?.[s] || "#"} className="w-9 h-9 border border-white/10 hover:border-amber-400/60 hover:bg-amber-400/10 rounded-lg flex items-center justify-center text-xs transition-colors flex-shrink-0" title={s}>
                      {s === "facebook" ? "f" : s === "twitter" ? "𝕏" : s === "instagram" ? "📷" : "in"}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-4">Quick Links</p>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  {navLinks.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1.5 group">
                        <span className="w-0 group-hover:w-3 h-px bg-amber-400 transition-all duration-200 inline-block flex-shrink-0" />{label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-4">Services</p>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  {displayServices.slice(0, 5).map((s, i) => (
                    <li key={i}>
                      <a href="#services" className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1.5 group">
                        <span className="w-0 group-hover:w-3 h-px bg-amber-400 transition-all duration-200 inline-block flex-shrink-0" />{s.title || s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-4">Contact</p>
                <div className="space-y-3 text-sm text-slate-400">
                  <p className="flex gap-2 items-start"><span className="mt-0.5 flex-shrink-0">📍</span><span className="break-words">{displayAddress}</span></p>
                  <p className="flex gap-2 items-center"><span className="flex-shrink-0">📞</span><span>{displayPhone}</span></p>
                  <p className="flex gap-2 items-center"><span className="flex-shrink-0">✉</span><span className="break-all">{displayEmail}</span></p>
                  {emergencyAvailability && <p className="flex gap-2 items-start text-amber-400"><span className="flex-shrink-0">🚨</span><span>{emergencyAvailability}</span></p>}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            {footerDisclaimer && (
              <div className="bg-white/5 rounded-xl p-4 mb-8 text-xs text-slate-500 leading-relaxed border border-white/10">
                <span className="font-bold text-amber-400">Medical Disclaimer: </span>
                {footerDisclaimer}
              </div>
            )}

            <div className="pt-7 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
              <p className="text-center sm:text-left">{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}</p>
              <div className="flex gap-5 flex-shrink-0">
                <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </TemplateLayout>
  );
}