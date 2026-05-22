'use client';

import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useMemo, useRef } from "react";

export default function BusinessTemplate({ data }) {
  const scrollRef = useRef(null);
  const heroImageRef = useRef(null);
  const aboutImageRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const featuresContainerRef = useRef(null);
  const portfolioContainerRef = useRef(null);
  const testimonialsRef = useRef(null);
  const footerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute templateData from props using useMemo to avoid setState in effect
  const templateData = useMemo(() => {
    if (data && Object.keys(data).length > 0) {
      // console.log("BusinessTemplate received data:", data);
      return data;
    } else {
      console.warn("BusinessTemplate received empty or invalid data");
      return {};
    }
  }, [data]);

  // Destructure data safely - only when templateData is available
  const {
    companyName, heroTitle, heroSubtitle, tagline, heroImage,
    service4_name, service4_image, service4_desc,
    services, projects, portfolio, features, team, testimonials, pricing, faq, blog,
    aboutUsTitle, aboutUsContent, aboutUsImage,
    email, contactEmail, phone, address, location,
    headerType, logoUrl,
    facebookUrl, twitterUrl, linkedinUrl,
    companyNameFontSize, heroTitleFontSize, taglineFontSize,
    aboutUsTitleFontSize, aboutUsContentFontSize,
    countryCode,
    ctaTitle, ctaDesc, ctaButtonLink, ctaButtonText,
    footerDescription, newsletterTitle, newsletterDesc, footerCopyright
  } = templateData || {};

  // Improved safeRender: only use fallback if value is truly empty
  const safeRender = (value, fallback) => {
    if (value === undefined || value === null || value === "") return fallback;
    if (typeof value === 'string' && value.trim() === "") return fallback;
    return value;
  };

  // Safe image renderer: handle both regular URLs and base64
  const isValidImageUrl = (url) => {
    if (!url) return false;
    if (typeof url !== 'string') return false;
    return url.startsWith('data:image/') || url.startsWith('/') || url.startsWith('http');
  };

  const displayEmail = safeRender(contactEmail || email, "studio@editorial.com");
  const displayPhone = safeRender(phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : phone, "+1 800 123 4567");
  const displayLocation = safeRender(address || location, "New York, NY");
  const displayName = safeRender(companyName, "Atelier");

  // Improved services display logic
  const displayServices = (() => {
    if (services && Array.isArray(services) && services.length > 0) {
      // Filter to only services that have at least a name or desc
      const validServices = services.filter(s => s && (s.name || s.desc));
      if (validServices.length > 0) return validServices;
    }
    // Return defaults only if no valid services provided
    return [
      { name: 'Art Direction', desc: 'Crafting the visual language and aesthetic principles.' },
      { name: 'Brand Strategy', desc: 'Setting the long-term vision and market positioning.' },
      { name: 'Digital Experience', desc: 'Building the technical and interactive foundation.' },
      { name: 'Editorial Design', desc: 'Reaching the global audience through typography.' }
    ];
  })();

  // Improved portfolio/projects display logic
  const displayProjects = (() => {
    if (portfolio && Array.isArray(portfolio) && portfolio.length > 0) {
      const validProjects = portfolio.filter(p => p && (p.title || p.name));
      if (validProjects.length > 0) return validProjects;
    }
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const validProjects = projects.filter(p => p && (p.name || p.desc));
      if (validProjects.length > 0) return validProjects;
    }
    return [
      { title: 'Project Alpha', desc: 'Brand Identity', image: '/images/templates/template-img-1.jpg', link: '#' },
      { title: 'Project Beta', desc: 'Digital Flagship', image: '/images/templates/template-img-2.jpg', link: '#' },
      { title: 'Project Gamma', desc: 'Art Direction', image: '/images/templates/template-img-3.jpg', link: '#' }
    ];
  })();

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };



  return (
    <TemplateLayout data={data} theme="light" category="Business" hideHeader={true} hideFooter={true}>
      <div 
        ref={scrollRef}
        data-scroll-container
        className="bg-[#F4F1EA] text-[#2C2A25] font-sans selection:bg-[#B65942] selection:text-[#F4F1EA] min-h-screen relative overflow-x-hidden"
      >

        {/* Grain Overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }}></div>

        {/* Minimal Editorial Header */}
        <header className="absolute top-0 left-0 w-full z-50 p-8 md:p-12 flex justify-between items-center mix-blend-difference text-[#F4F1EA]">
          <div className="text-2xl font-serif tracking-tighter italic">
            {headerType === "Image" ? (
              (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                <div className="relative h-10 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                </div>
              ) : (
                <span>{displayName}</span>
              )
            ) : (
              <span style={{ fontSize: companyNameFontSize ? `clamp(16px, 3.5vw, ${companyNameFontSize}px)` : undefined }}>{displayName}</span>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12 font-bold text-[10px] tracking-widest uppercase">
            {['Services', 'Work', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:italic transition-all">{item}</a>
            ))}
          </nav>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="flex md:hidden flex-col justify-center items-end gap-1.5 w-8 h-8 z-50 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`h-[1.5px] bg-[#F4F1EA] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7.5px] w-6' : 'w-6'}`}></span>
            <span className={`h-[1.5px] bg-[#F4F1EA] transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4'}`}></span>
            <span className={`h-[1.5px] bg-[#F4F1EA] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7.5px] w-6' : 'w-5'}`}></span>
          </button>
        </header>

        {/* Premium Menu Drawer Overlay */}
        <div className={`fixed inset-0 bg-[#2C2A25] text-[#F4F1EA] z-40 flex items-center p-8 sm:p-12 md:p-24 transition-all duration-700 ease-[0.16,1,0.3,1] ${menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center">
            {/* Left Column: Navigation Links */}
            <nav className="md:col-span-7 flex flex-col gap-6 md:gap-10">
              {['Services', 'Work', 'About', 'Contact'].map((item, idx) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none hover:italic hover:translate-x-4 transition-all duration-300 transform block w-fit ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${menuOpen ? idx * 80 : 0}ms` }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right Column: Editorial Contact & Tagline */}
            <div className={`md:col-span-5 flex flex-col gap-10 md:border-l md:border-[#F4F1EA]/10 md:pl-16 pt-8 md:pt-0 transition-all duration-500 delay-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#A49A87]">Practice</span>
                <p className="font-serif text-lg md:text-xl italic text-[#F4F1EA]/90 font-light leading-relaxed">
                  {safeRender(tagline, "Independent Creative Studio")}
                </p>
              </div>

              <div className="flex flex-col gap-6 font-bold uppercase tracking-widest text-[#A49A87]">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.3em] text-[#A49A87]/50">Inquiries</span>
                  <a href={`mailto:${displayEmail}`} className="text-sm text-[#F4F1EA] hover:text-[#B65942] transition-colors normal-case font-medium">{displayEmail}</a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.3em] text-[#A49A87]/50">Call</span>
                  <a href={`tel:${displayPhone}`} className="text-sm text-[#F4F1EA] hover:text-[#B65942] transition-colors font-medium">{displayPhone}</a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] tracking-[0.3em] text-[#A49A87]/50">Visit</span>
                  <span className="text-sm text-[#F4F1EA] font-normal normal-case italic font-serif leading-relaxed">{displayLocation}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-6 mt-2 text-[#A49A87]">
                {facebookUrl && <a href={facebookUrl} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold tracking-widest hover:text-[#B65942] transition-colors">Facebook</a>}
                {twitterUrl && <a href={twitterUrl} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold tracking-widest hover:text-[#B65942] transition-colors">Twitter</a>}
                {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold tracking-widest hover:text-[#B65942] transition-colors">LinkedIn</a>}
                {!facebookUrl && !twitterUrl && !linkedinUrl && (
                  <>
                    <span className="text-[10px] uppercase font-bold tracking-widest hover:text-[#B65942] transition-colors cursor-pointer">Instagram</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest hover:text-[#B65942] transition-colors cursor-pointer">Pinterest</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <main>
          {/* Asymmetrical Hero */}
          <section data-scroll-section className="relative min-h-screen md:h-screen md:min-h-[700px] flex flex-col md:flex-row items-stretch pb-12 md:pb-0 pt-24 md:pt-0">
            <div className="w-full md:w-[55%] lg:w-[60%] p-8 pt-28 md:p-16 lg:p-24 z-10 flex flex-col justify-center">
              <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}>
                <motion.div 
                  variants={fadeIn} 
                  className="text-[#8C7A6B] uppercase tracking-[0.3em] text-xs font-bold mb-8"
                  style={{ fontSize: taglineFontSize ? `clamp(10px, 2.5vw, ${taglineFontSize}px)` : undefined }}
                >
                  {safeRender(tagline, "Independent Creative Studio")}
                </motion.div>
                <motion.h1
                  variants={fadeIn}
                  className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] tracking-tighter mb-12 text-[#2C2A25]"
                  style={{ fontSize: heroTitleFontSize ? `clamp(32px, 8vw, ${heroTitleFontSize}px)` : undefined }}
                >
                  {safeRender(heroTitle, `Crafting visual legacies.`)}
                </motion.h1>
                <motion.div variants={fadeIn} className="flex gap-8 items-center">
                  <button className="bg-[#2C2A25] text-[#F4F1EA] px-8 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#B65942] transition-colors duration-500">
                    Discover Our Work
                  </button>
                  <a href="#contact" className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#2C2A25] border-b border-[#2C2A25] pb-1 hover:text-[#B65942] hover:border-[#B65942] transition-colors">
                    Let&apos;s Talk
                  </a>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              key={heroImage || "default"}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full md:w-[45%] lg:w-[40%] p-6 sm:p-8 md:p-12 flex items-center justify-center z-10"
            >
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl md:rounded-[2.5rem] overflow-hidden group shadow-2xl">
              {isValidImageUrl(heroImage) ? (
                heroImage.startsWith('data:image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={heroImage}
                    alt="Hero Art"
                    className="absolute inset-0 w-full h-full object-cover sepia-[0.15] contrast-[1.1] group-hover:scale-105 transition-transform duration-[3s]"
                  />
                ) : (
                  <Image
                    src={heroImage}
                    alt="Hero Art"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover sepia-[0.15] contrast-[1.1] group-hover:scale-105 transition-transform duration-[3s]"
                    priority
                  />
                )
              ) : (
                <Image
                  src="/images/templates/template-img-25.jpg"
                  alt="Hero Art"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover sepia-[0.15] contrast-[1.1] group-hover:scale-105 transition-transform duration-[3s]"
                  priority
                />
              )}
              </div>
            </motion.div>
          </section>

          {/* Editorial About */}
          <section id="about" data-scroll-section className="py-16 md:py-24 px-8 md:px-16 bg-[#2C2A25] text-[#F4F1EA] scroll-mt-24">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-32">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
                className="w-full lg:w-5/12 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter"
                style={{ fontSize: aboutUsTitleFontSize ? `clamp(24px, 5vw, ${aboutUsTitleFontSize}px)` : undefined }}
              >
                {aboutUsTitle || "We believe in the power of restraint and intention."}
              </motion.div>
              <div className="w-full lg:w-7/12 flex flex-col md:flex-row gap-12 md:gap-16">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="flex-1">
                  <p
                    className="text-[#A49A87] leading-relaxed text-lg md:text-xl font-light mb-16"
                    style={{ fontSize: aboutUsContentFontSize ? `clamp(14px, 2vw, ${aboutUsContentFontSize}px)` : undefined }}
                  >
                    {safeRender(aboutUsContent, "Our approach combines rigorous strategic thinking with unparalleled aesthetic execution. We design for tomorrow while honoring the timeless principles of proportion, typography, and space.")}
                  </p>
                  <div className="grid grid-cols-2 gap-8 border-t border-[#A49A87]/30 pt-10">
                    <div>
                      <div className="font-serif text-4xl mb-3 text-[#F4F1EA] italic">Est.</div>
                      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A49A87]">2014, Paris</div>
                    </div>
                    <div>
                      <div className="font-serif text-4xl mb-3 text-[#F4F1EA] italic">Awwwards</div>
                      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A49A87]">Site of the Year</div>
                    </div>
                  </div>
                </motion.div>
                <div className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden group rounded-xl md:rounded-2xl" ref={aboutImageRef} data-scroll data-scroll-speed="2">
                  <Image
                    src={(aboutUsImage && typeof aboutUsImage === 'string' && aboutUsImage.trim() !== "") ? aboutUsImage : "/images/templates/template-img-7.jpg"}
                    alt="Studio Vibe"
                    fill
                    className="object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-[2s]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Staggered Services */}
          <section id="services" data-scroll-section className="py-16 md:py-24 px-8 md:px-16 scroll-mt-24 bg-[#E8E3D7]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-32 gap-8">
                <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tighter">Our Expertise</h2>
                <div className="text-[#8C7A6B] uppercase tracking-[0.2em] text-[10px] font-bold max-w-xs leading-relaxed">
                  Comprehensive disciplines for holistic brand evolution and visual storytelling.
                </div>
              </div>

              <div className="border-t border-[#2C2A25]/10" ref={servicesContainerRef}>
                {displayServices.map((service, idx) => (
                  <motion.div
                    key={idx}
                    data-service-item
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}
                    className="py-8 md:py-16 border-b border-[#2C2A25]/10 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-[#F4F1EA] transition-colors -mx-8 px-8 md:-mx-16 md:px-16 group"
                  >
                    <div className="font-serif text-3xl italic w-16">{(idx + 1).toString().padStart(2, '0')}</div>
                    <div className="flex-1">
                      <h3 className="text-4xl md:text-6xl font-serif tracking-tighter group-hover:italic transition-all">
                        {service.name || service.title}
                      </h3>
                    </div>
                    <div className="w-full md:w-1/3 text-[#8C7A6B] font-light leading-relaxed text-lg">
                      {service.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features (Editorial Style) */}
          {features && features.length > 0 && (
            <section id="features" data-scroll-section className="py-16 md:py-24 px-8 md:px-16 bg-[#F4F1EA]">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16" ref={featuresContainerRef}>
                <div className="col-span-1 md:col-span-2 lg:col-span-4 mb-8 md:mb-16">
                  <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tighter">The Standard</h2>
                </div>
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    data-feature-item
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} 
                    className="flex flex-col"
                  >
                    <div className="w-16 h-16 rounded-full border border-[#2C2A25] flex items-center justify-center mb-8">
                      {feature.icon ? <Image src={feature.icon} alt={feature.title} width={24} height={24} /> : <span className="font-serif italic text-xl">✦</span>}
                    </div>
                    <h4 className="text-sm font-bold mb-4 uppercase tracking-widest">{feature.title}</h4>
                    <p className="text-[#8C7A6B] font-light leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Asymmetrical Portfolio */}
          {displayProjects && displayProjects.length > 0 && (
            <section id="work" data-scroll-section className="py-16 md:py-24 bg-[#2C2A25] text-[#F4F1EA] px-8 md:px-16 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl sm:text-6xl md:text-8xl tracking-tighter mb-16 md:mb-32 text-center italic">Selected Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-32 gap-x-12 md:gap-x-24" ref={portfolioContainerRef}>
                  {displayProjects.map((item, idx) => (
                    <motion.a
                      key={idx}
                      data-portfolio-item
                      href={item.link || '#'}
                      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
                      className={`block group ${idx % 2 === 1 ? 'md:mt-48' : ''}`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden mb-10 bg-[#1A1916] rounded-xl md:rounded-2xl">
                        {item.image && (
                          <Image src={item.image} alt={item.title || item.name} fill className="object-cover sepia-[0.1] grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                        )}
                      </div>
                      <h4 className="text-3xl font-serif tracking-tight mb-3 group-hover:italic transition-all">{item.title || item.name}</h4>
                      <p className="text-[#A49A87] text-[10px] font-bold uppercase tracking-[0.2em]">{item.desc}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Team / Leadership */}
          {team && team.length > 0 && (
            <section id="team" className="py-16 md:py-24 px-8 md:px-16 bg-[#F4F1EA]">
              <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tighter mb-16 md:mb-32">The Minds</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
                  {team.map((member, idx) => (
                    <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="group">
                      <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-[#E8E3D7] rounded-xl">
                        {member.image && <Image src={member.image} alt={member.name} fill className="object-cover sepia-[0.1] group-hover:scale-105 transition-transform duration-[2s]" />}
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{member.name}</h4>
                      <p className="text-[#B65942] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{member.role}</p>
                      <p className="text-[#8C7A6B] font-light leading-relaxed text-sm">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials - Large Quote Style */}
          {testimonials && testimonials.length > 0 && (
            <section id="testimonials" className="py-16 md:py-24 px-8 md:px-16 bg-[#68735C] text-[#F4F1EA]">
              <div className="max-w-5xl mx-auto text-center" ref={testimonialsRef}>
                <div className="font-serif text-9xl mb-12 text-[#F4F1EA]/20 leading-none">&ldquo;</div>
                {testimonials.map((testi, idx) => (
                  <motion.div key={idx} data-testimonial initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-32 last:mb-0">
                    <p className="font-serif text-2xl sm:text-4xl md:text-6xl leading-tight tracking-tighter mb-10 md:mb-16 italic">
                      {testi.review}
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="font-bold uppercase tracking-widest text-sm mb-3">{testi.name}</div>
                      <div className="text-[#F4F1EA]/70 text-[10px] font-bold uppercase tracking-[0.2em]">{testi.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Pricing - Minimal List */}
          {pricing && pricing.length > 0 && (
            <section id="pricing" className="py-16 md:py-24 px-8 md:px-16 bg-[#E8E3D7]">
              <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tighter mb-16 md:mb-32">Engagements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {pricing.map((plan, idx) => (
                    <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className={`p-12 md:p-16 border rounded-2xl ${idx === 1 ? 'border-[#2C2A25] bg-[#F4F1EA]' : 'border-[#2C2A25]/20'}`}>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-8">{plan.planName}</h4>
                      <div className="font-serif text-6xl tracking-tighter mb-12">{plan.price}</div>
                      <ul className="space-y-5 mb-16 text-[#8C7A6B] font-light">
                        {(plan.features ? plan.features.split(',') : []).map((f, i) => (
                          <li key={i} className="flex gap-4"><span className="text-[#2C2A25]">—</span> {f.trim()}</li>
                        ))}
                      </ul>
                      <button className={`w-full py-5 rounded-full uppercase tracking-widest text-[10px] font-bold transition-colors ${idx === 1 ? 'bg-[#2C2A25] text-[#F4F1EA] hover:bg-[#B65942]' : 'border border-[#2C2A25] text-[#2C2A25] hover:bg-[#2C2A25] hover:text-[#F4F1EA]'}`}>
                        {plan.buttonText || "Inquire"}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ - Accordion */}
          {faq && faq.length > 0 && (
            <section id="faq" className="py-16 md:py-24 px-8 md:px-16 bg-[#F4F1EA]">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tighter mb-12 md:mb-24">Inquiries</h2>
                <div className="border-t border-[#2C2A25]/20">
                  {faq.map((q, idx) => (
                    <details key={idx} className="group border-b border-[#2C2A25]/20">
                      <summary className="font-serif text-xl sm:text-2xl md:text-4xl py-6 md:py-10 cursor-pointer select-none outline-none group-open:italic transition-all flex justify-between items-center">
                        {q.question}
                        <span className="text-4xl font-light group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="pb-10 text-[#8C7A6B] font-light leading-relaxed max-w-2xl text-lg md:text-xl">
                        {q.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Blog - Magazine Style */}
          {blog && blog.length > 0 && (
            <section id="blog" className="py-16 md:py-24 px-8 md:px-16 bg-[#2C2A25] text-[#F4F1EA]">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-24 border-b border-[#A49A87]/30 pb-6 md:pb-10 gap-4">
                  <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tighter">Journal</h2>
                  <a href="#" className="hidden md:inline-block uppercase tracking-widest text-[10px] font-bold hover:text-[#B65942] transition-colors">View All</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {blog.map((post, idx) => (
                    <motion.a key={idx} href={post.link || '#'} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden mb-8 bg-[#1A1916] rounded-xl">
                        {post.image && <Image src={post.image} alt={post.title} fill className="object-cover sepia-[0.1] grayscale group-hover:grayscale-0 transition-all duration-1000" />}
                      </div>
                      <div className="text-[#A49A87] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{post.date}</div>
                      <h4 className="font-serif text-3xl mb-4 group-hover:italic transition-all">{post.title}</h4>
                      <p className="text-[#A49A87] font-light text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Giant CTA */}
          <section className="py-16 md:py-32 px-6 md:px-16 bg-[#B65942] text-[#F4F1EA] text-center">
            <div className="max-w-5xl mx-auto">
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="font-serif text-5xl sm:text-7xl md:text-9xl tracking-tighter leading-[0.8] mb-8 md:mb-12">
                {safeRender(ctaTitle, "Let's Create")}
              </motion.h2>
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-2xl md:text-4xl font-serif italic mb-16 max-w-3xl mx-auto opacity-90 leading-tight">
                {safeRender(ctaDesc, "Partner with us to build a brand that defies convention and stands the test of time.")}
              </motion.p>
              <motion.a initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} href={safeRender(ctaButtonLink, '#contact')} className="inline-block bg-[#F4F1EA] text-[#B65942] px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#2C2A25] hover:text-[#F4F1EA] transition-colors duration-500">
                {safeRender(ctaButtonText, "Start the Dialogue")}
              </motion.a>
            </div>
          </section>
        </main>

        <footer id="contact" ref={footerRef} className="bg-[#2C2A25] text-[#F4F1EA] pt-16 pb-12 px-8 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
              <div className="lg:col-span-1">
                <div className="font-serif text-3xl italic mb-8">
                  {headerType === "Image" ? (
                    (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                      <div className="relative h-10 w-32">
                        <Image src={logoUrl} alt={displayName} fill className="object-contain object-left grayscale" />
                      </div>
                    ) : displayName
                  ) : displayName}
                </div>
                <p className="text-[#A49A87] font-light text-sm max-w-xs leading-relaxed">
                  {safeRender(footerDescription, "An independent design practice focusing on brand identity, digital experiences, and art direction.")}
                </p>
              </div>

              <div>
                <h4 className="uppercase tracking-[0.3em] text-[10px] font-bold mb-8 text-[#A49A87]">Connect</h4>
                <ul className="space-y-4 font-light text-sm">
                  <li><a href={`mailto:${displayEmail}`} className="hover:text-[#B65942] transition-colors">{displayEmail}</a></li>
                  <li><a href={`tel:${displayPhone}`} className="hover:text-[#B65942] transition-colors">{displayPhone}</a></li>
                  <li className="text-[#A49A87]">{displayLocation}</li>
                </ul>
              </div>

              <div>
                <h4 className="uppercase tracking-[0.3em] text-[10px] font-bold mb-8 text-[#A49A87]">Social</h4>
                <ul className="space-y-4 font-light text-sm">
                  {facebookUrl && <li><a href={facebookUrl} target="_blank" rel="noreferrer" className="hover:text-[#B65942] transition-colors">Facebook</a></li>}
                  {twitterUrl && <li><a href={twitterUrl} target="_blank" rel="noreferrer" className="hover:text-[#B65942] transition-colors">Twitter</a></li>}
                  {linkedinUrl && <li><a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#B65942] transition-colors">LinkedIn</a></li>}
                  {!facebookUrl && !twitterUrl && !linkedinUrl && <li className="text-[#A49A87]">Instagram</li>}
                </ul>
              </div>

              <div>
                <h4 className="uppercase tracking-[0.3em] text-[10px] font-bold mb-8 text-[#A49A87]">{newsletterTitle || "Newsletter"}</h4>
                <p className="text-[#A49A87] font-light text-sm mb-6 leading-relaxed">{newsletterDesc || "Curated insights, once a month."}</p>
                <div className="flex border-b border-[#A49A87]/50 focus-within:border-[#F4F1EA] transition-colors">
                  <input type="email" placeholder="Email address" className="bg-transparent border-none outline-none text-sm py-3 flex-1 text-[#F4F1EA] placeholder:text-[#A49A87]/50" />
                  <button className="uppercase tracking-[0.2em] text-[10px] font-bold hover:text-[#B65942] transition-colors px-2">Submit</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#A49A87]/30 text-[#A49A87] text-[10px] font-bold uppercase tracking-[0.2em]">
              <div>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}</div>
              <div className="mt-4 md:mt-0">Crafted with precision</div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}


