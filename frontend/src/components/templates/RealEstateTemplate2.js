import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export default function RealEstateTemplate2({ data }) {
  const {
    agencyName,
    agencyNameFontSize,
    tagline,
    taglineFontSize,
    heroTitle,
    heroTitleFontSize,
    heroImage,
    bio,
    bioFontSize,
    aboutUsTitle,
    aboutUsTitleFontSize,
    aboutImage,
    projects,
    contactEmail,
    phone,
    address,
    headerType,
    logoUrl,
    footerCopyright,
    countryCode
  } = data || {};

  const displayAgency = agencyName || "Royal Heritage Realty";
  const displayTagline = tagline || "Excellence in Every Square Foot";
  const displayHeroTitle = heroTitle || "Your Legacy Starts Here.";
  const displayAboutTitle = aboutUsTitle || "OUR HERITAGE";
  const displayBio = bio || "With a legacy spanning over three decades, Royal Heritage Realty has been the cornerstone of luxury living. We don't just sell properties; we facilitate the transition to your next great chapter with unparalleled sophistication and market expertise.";
  const displayEmail = contactEmail || "prestige@royalheritage.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "+1 (800) 777-ROYAL";
  const displayAddress = address || "777 Grand Boulevard, Beverly Hills, CA";

  const displayProperties = projects && projects.length > 0 ? projects : [
    { name: 'The Sapphire Estate', desc: 'Malibu, CA • 6 Beds • 8 Baths • $24.5M', image: '/images/templates/template-img-14.jpg' },
    { name: 'Golden Gate Manor', desc: 'Bel Air, CA • 8 Beds • 12 Baths • $42.0M', image: '/images/templates/template-img-13.jpg' },
    { name: 'Emerald Peak', desc: 'Aspen, CO • 5 Beds • 6 Baths • $15.5M', image: '/images/templates/template-img-15.jpg' }
  ];

  const containerRef = useRef(null);
  
  return (
    <TemplateLayout data={data} theme="dark" category="Real Estate" hideHeader={true} hideFooter={true}>
      <div ref={containerRef} className="bg-[#0f172a] text-[#f8fafc] min-h-screen font-sans selection:bg-[#e2b85a] selection:text-[#0f172a] overflow-x-hidden">
        
        {/* Majestic Header */}
        <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center bg-[#0f172a]/80 backdrop-blur-xl border-b border-[#e2b85a]/20">
          <div className="flex items-center gap-4">
            {headerType === "Image" && logoUrl ? (
              <div className="relative h-10 w-40">
                <Image src={logoUrl} alt="Logo" fill className="object-contain object-left" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e2b85a] rounded-full flex items-center justify-center text-[#0f172a] font-black text-xl shadow-[0_0_20px_rgba(226,184,90,0.4)]">R</div>
                <span 
                  className="text-xl md:text-2xl font-black tracking-tight uppercase text-white" 
                  style={{ fontSize: agencyNameFontSize ? `${agencyNameFontSize}px` : undefined }}
                >
                  {displayAgency}
                </span>
              </div>
            )}
          </div>
          
          <nav className="hidden lg:flex gap-12 text-[11px] uppercase tracking-[0.2em] font-bold">
            {['Expertise', 'Properties', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white/70 hover:text-[#e2b85a] transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e2b85a] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <button className="hidden md:block bg-[#e2b85a] text-[#0f172a] text-[11px] uppercase tracking-widest font-black px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(226,184,90,0.3)]">
            Book Viewing
          </button>
        </header>

        {/* Dynamic Hero */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage || "/images/templates/template-img-51.jpg"}
              alt="Luxury Estate"
              fill
              className="object-cover brightness-[0.4]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#e2b85a]"></div>
                <span className="text-[#e2b85a] text-xs font-black uppercase tracking-[0.4em]">{displayTagline}</span>
              </div>
              <h1 
                className="text-6xl md:text-9xl font-black leading-[1.05] tracking-tight mb-12 text-white"
                style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
              >
                {displayHeroTitle}
              </h1>
              <div className="flex flex-wrap gap-6">
                <button className="bg-[#e2b85a] text-[#0f172a] px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-2xl">Explore Listings</button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all">Our Story</button>
              </div>
            </motion.div>
          </div>
          
          {/* Animated Element */}
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-20 hidden lg:block"
          >
            <div className="w-40 h-40 border border-[#e2b85a]/20 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 border border-[#e2b85a]/40 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-[#e2b85a]/10 rounded-full flex items-center justify-center text-[#e2b85a] animate-pulse">
                  <span className="text-[10px] font-black uppercase tracking-tighter">Premium</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Expertise - Rich Colors & Texture */}
        <section id="expertise" className="py-32 bg-[#1e293b] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e2b85a]/5 rounded-full blur-[120px] -mr-60 -mt-60"></div>
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-[#e2b85a] text-xs font-black uppercase tracking-[0.5em] mb-6" style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}>{displayAboutTitle}</h2>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">Mastering the Art of <span className="text-[#e2b85a]">Elite</span> Real Estate.</h3>
                <p className="text-[#94a3b8] text-xl leading-relaxed mb-12 font-medium" style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}>
                  {displayBio}
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-12">
                  <div>
                    <span className="text-4xl font-black text-[#e2b85a] block">$4.2B+</span>
                    <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mt-2 block">Career Sales</span>
                  </div>
                  <div>
                    <span className="text-4xl font-black text-white block">100%</span>
                    <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mt-2 block">Client Privacy</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#e2b85a]/10">
                  <Image src={aboutImage || "/images/templates/template-img-14.jpg"} alt="Executive" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-[#e2b85a] p-10 rounded-[2rem] shadow-2xl hidden md:block">
                  <p className="text-[#0f172a] text-4xl font-black leading-none mb-2 italic">35+</p>
                  <p className="text-[#0f172a]/60 text-[10px] font-black uppercase tracking-widest">Years Expertise</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Properties - High Energy Grid */}
        <section id="properties" className="py-32 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div>
                <h2 className="text-[#e2b85a] text-xs font-black uppercase tracking-[0.5em] mb-4 italic underline decoration-[#e2b85a]/20 underline-offset-8">Featured</h2>
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">The Collection.</h3>
              </div>
              <p className="text-[#94a3b8] font-bold text-sm uppercase tracking-widest flex items-center gap-4 hover:text-[#e2b85a] transition-all cursor-pointer">
                View Global Portfolio 
                <span className="w-10 h-10 bg-[#e2b85a] rounded-full flex items-center justify-center text-[#0f172a]">➔</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {displayProperties.map((property, idx) => (
                <PropertyCard key={idx} property={property} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact - Bold & Professional */}
        <footer id="contact" className="bg-[#020617] text-white py-32 px-6 md:px-12 relative">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-7">
                <h3 className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-16 italic text-[#e2b85a]">LET'S CONNECT.</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/5 hover:border-[#e2b85a]/40 transition-all group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-4">Inquiries</p>
                    <p className="text-xl md:text-2xl font-black group-hover:text-[#e2b85a] transition-colors">{displayEmail}</p>
                  </div>
                  <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/5 hover:border-[#e2b85a]/40 transition-all group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-4">Direct Access</p>
                    <p className="text-xl md:text-2xl font-black group-hover:text-[#e2b85a] transition-colors">{displayPhone}</p>
                  </div>
                  <div className="md:col-span-2 bg-[#1e293b]/50 p-8 rounded-3xl border border-white/5 hover:border-[#e2b85a]/40 transition-all group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-4">Headquarters</p>
                    <p className="text-xl md:text-2xl font-black group-hover:text-[#e2b85a] transition-colors">{displayAddress}</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 flex flex-col justify-between h-full lg:min-h-[400px]">
                <div className="p-10 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#e2b85a] -mr-10 -mt-10 rotate-45 transition-transform group-hover:scale-150"></div>
                  <p className="text-2xl md:text-3xl font-bold italic text-white/40 leading-relaxed relative z-10">
                    "Luxury is not about a price tag, it's about an experience of unparalleled service."
                  </p>
                </div>
                <div className="flex gap-12 mt-12 text-[10px] font-black uppercase tracking-[0.4em] italic text-[#64748b]">
                  <a href="#" className="hover:text-[#e2b85a] transition-colors">Instagram</a>
                  <a href="#" className="hover:text-[#e2b85a] transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-[#e2b85a] transition-colors">Bloomberg</a>
                </div>
              </div>
            </div>

            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-[#475569] italic">
              <span>{footerCopyright || `© ${new Date().getFullYear()} ${displayAgency}`}</span>
              <div className="flex gap-8">
                <span>Privacy</span>
                <span>Security</span>
                <span>Terms</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}

function PropertyCard({ property, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group bg-[#1e293b]/50 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#e2b85a]/40 transition-all duration-500 shadow-xl"
    >
      <div className="relative h-80 overflow-hidden">
        <Image 
          src={property.image || "/images/templates/template-img-51.jpg"} 
          alt={property.name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-[2s]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-6 left-6">
          <span className="bg-[#e2b85a] text-[#0f172a] px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">New Release</span>
        </div>
      </div>
      
      <div className="p-8">
        <h4 
          className="text-3xl font-black text-white mb-4 group-hover:text-[#e2b85a] transition-colors uppercase italic"
          style={{ fontSize: property.nameFontSize ? `${property.nameFontSize}px` : undefined }}
        >
          {property.name}
        </h4>
        <div className="h-px w-full bg-white/5 mb-6"></div>
        <p 
          className="text-[#94a3b8] text-xs font-bold uppercase tracking-widest leading-relaxed italic"
          style={{ fontSize: property.descFontSize ? `${property.descFontSize}px` : undefined }}
        >
          {property.desc}
        </p>
      </div>
    </motion.div>
  );
}

