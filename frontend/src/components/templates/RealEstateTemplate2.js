import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
    footerCopyright
  } = data || {};

  const displayAgency = agencyName || "Aura luxury Estates";
  const displayTagline = tagline || "Exceptional Properties for Exceptional Lives";
  const displayProperties = projects || [
    { name: 'Villa Emerald', desc: 'Cap ferrat, France | $12.5M', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
    { name: 'Sky Loft', desc: 'Manhattan, NY | $8.2M', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800' }
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const reveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <TemplateLayout data={data} theme="dark" category="Real Estate" hideHeader={true} hideFooter={true}>
      <div className="bg-slate-950 text-white min-h-screen font-serif selection:bg-slate-100 selection:text-slate-950">
        
        {/* Minimalist Header */}
        <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-10 py-10 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            {headerType === "Image" ? (
              logoUrl ? (
                <div className="relative h-8 w-24 grayscale invert">
                  <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                </div>
              ) : (
                <span className="text-2xl font-light tracking-[0.3em] uppercase italic">AURA</span>
              )
            ) : (
              <span className="text-xl font-light tracking-[0.3em] uppercase" style={{ fontSize: agencyNameFontSize ? `${agencyNameFontSize}px` : undefined }}>{displayAgency} / LUXURY</span>
            )}
          </div>
          <nav className="flex gap-16 text-[10px] uppercase tracking-[0.4em] font-black italic hidden md:flex">
             <a href="#about" className="hover:opacity-50 transition-opacity">Philosophy</a>
             <a href="#collection" className="hover:opacity-50 transition-opacity">Collection</a>
             <a href="#contact" className="hover:opacity-50 transition-opacity">Inquiry</a>
          </nav>
        </header>

        <main ref={targetRef}>
          {/* Full-Bleed Hero */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <motion.div 
               style={{ opacity: heroOpacity, scale: heroScale }}
               className="absolute inset-0 z-0"
            >
               <Image 
                  src={heroImage || "https://images.unsplash.com/photo-1549419017-f2738260b759?auto=format&fit=crop&q=80&w=1200"}
                  alt="Luxury Estate"
                  fill
                  className="object-cover grayscale active:grayscale-0 transition-all duration-1000"
                  priority
               />
               <div className="absolute inset-0 bg-slate-950/30" />
            </motion.div>
            <div className="relative z-10 text-center px-6">
                <motion.h1 
                  className="text-7xl md:text-[10rem] font-light leading-[0.85] tracking-tighter mb-8"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                >
                   {heroTitle || "THE RESIDENCE."}
                </motion.h1>
                <motion.p 
                  className="text-xs uppercase font-black tracking-[0.8em] text-white/60 mb-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                   Curated for the Discerning
                </motion.p>
                <div className="flex justify-center flex-col items-center gap-10">
                   <div className="h-40 w-px bg-white/20 animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">Explore The Void</span>
                </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section id="about" className="py-60 px-10 relative">
             <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start">
                   <motion.div {...reveal}>
                      <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 mb-16" style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}>{aboutUsTitle || "OUR PHILOSOPHY"}</h2>
                      <h3 className="text-6xl md:text-8xl font-light mb-16 leading-[0.9] tracking-tighter">Beyond The Structure.</h3>
                      <p className="text-2xl font-light text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-16 max-w-lg italic" style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}>
                        {bio || "Aura Luxury is not a real estate agency; we are curators of environments. We understand that a home is the ultimate expression of identity. We represent only the most architecturally significant properties in the world."}
                      </p>
                   </motion.div>
                   <motion.div {...reveal} transition={{ delay: 0.3 }} className="pt-20">
                      <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 grayscale">
                         <Image 
                           src={aboutImage || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"}
                           alt="Architectural Detail"
                           fill
                           className="object-cover"
                         />
                      </div>
                      <p className="mt-10 text-[10px] font-black uppercase tracking-[0.5em] text-center opacity-30">Geometry x Luxury</p>
                   </motion.div>
                </div>
             </div>
          </section>

          {/* The Collection */}
          <section id="collection" className="py-32 px-10 bg-white text-slate-950 rounded-t-[10rem]">
             <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-40 gap-10">
                   <h2 className="text-7xl md:text-[12rem] font-light leading-none tracking-tighter italic">The Collection.</h2>
                   <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.5em] max-w-xs text-right">01//Exclusive Selection 02//Global Access</p>
                </div>

                <div className="space-y-40">
                   {displayProperties.map((property, idx) => (
                     <motion.div 
                        key={idx} 
                        className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
                        {...reveal}
                     >
                        <div className="lg:w-2/3 relative h-[600px] w-full group overflow-hidden">
                           <Image 
                             src={property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"} 
                             alt={property.name} 
                             fill 
                             className="object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                           />
                           <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div className="lg:w-1/3">
                           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6 block font-black">Featured Listing</span>
                           <h4 className="text-5xl font-light mb-8 tracking-tighter uppercase italic" style={{ fontSize: property.nameFontSize ? `${property.nameFontSize}px` : undefined }}>{property.name}</h4>
                           <p className="text-slate-500 font-medium mb-12 italic" style={{ fontSize: property.descFontSize ? `${property.descFontSize}px` : undefined }}>{property.desc}</p>
                           <button className="px-12 py-5 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all cursor-pointer">
                              Explore Property
                           </button>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>
        </main>

        {/* Minimal Footer */}
        <footer id="contact" className="bg-white text-slate-950 py-48 px-10">
           <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-32 mb-40">
                 <div className="lg:w-1/2">
                    <h5 className="text-8xl md:text-[15rem] font-light leading-[0.8] tracking-[ -0.05em] mb-12 italic">INQUIRE.</h5>
                    <div className="h-px w-full bg-slate-100 mb-12"></div>
                    <div className="grid grid-cols-2 gap-10">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">Email</p>
                          <p className="text-lg font-black">{contactEmail || "private@aura.com"}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">Direct</p>
                          <p className="text-lg font-black">{phone || "+1 888 AURA"}</p>
                       </div>
                    </div>
                 </div>
                 <div className="lg:w-1/3">
                    <p className="text-3xl font-light italic leading-relaxed mb-20 text-slate-400">
                      "Real estate is the most fundamental expression of the human spirit. We provide the stage."
                    </p>
                    <div className="space-y-6">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Office</p>
                       <p className="text-xl font-bold max-w-[250px] leading-relaxed">{address || "Pacific Coast Highway, Studio 11, Malibu"}</p>
                    </div>
                 </div>
              </div>

              <div className="pt-24 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20 text-[10px] font-black uppercase tracking-[0.6em]">
                 <span>{footerCopyright || `© ${new Date().getFullYear()} Aura Luxury Estates`}</span>
                 <div className="flex gap-12 font-black italic">
                    <span>IG</span> / <span>TW</span> / <span>LI</span>
                 </div>
              </div>
           </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
