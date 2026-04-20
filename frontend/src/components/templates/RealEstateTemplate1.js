import TemplateLayout from "./TemplateLayout";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RealEstateTemplate1({ data }) {
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

  const displayAgency = agencyName || "Vista Realty";
  const displayTagline = tagline || "Your Vision, Our Expertise";
  const displayProperties = projects || [
    { name: 'Sunset Villa', desc: '$1,250,000 | 4BR 3BA', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
    { name: 'Mountain Retreat', desc: '$850,000 | 3BR 2BA', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <TemplateLayout data={data} theme="light" category="Real Estate" hideHeader={true} hideFooter={true}>
      <div className="bg-white text-slate-900 min-h-screen font-sans">
        {/* Modern Header */}
        <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {headerType === "Image" ? (
                logoUrl ? (
                  <div className="relative h-10 w-32">
                    <Image src={logoUrl} alt="Agency Logo" fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
                )
              ) : (
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-none uppercase" style={{ fontSize: agencyNameFontSize ? `${agencyNameFontSize}px` : undefined }}>{displayAgency}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1" style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}>{displayTagline}</span>
                </div>
              )}
            </div>
            <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
              <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#listings" className="hover:text-indigo-600 transition-colors">Listings</a>
              <a href="#contact" className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Contact</a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative h-[80vh] flex items-center overflow-hidden">
            <Image 
              src={heroImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"}
              alt="Luxury Home"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-slate-900/40" />
            <div className="container mx-auto px-6 relative z-10 text-white">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-8xl font-black leading-none mb-8 tracking-tighter" style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}>
                  {heroTitle || "Discover Your Future."}
                </h1>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white p-2 rounded-2xl flex items-center shadow-2xl max-w-lg">
                    <input type="text" placeholder="Search by location..." className="flex-1 px-4 py-2 border-none focus:ring-0 text-slate-900 font-bold" />
                    <button className="bg-indigo-600 px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all">Search</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeIn} className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src={aboutImage || "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=800"}
                  alt="Real Estate Team"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <h2 className="text-indigo-600 text-xs font-black uppercase tracking-[0.4em] mb-6" style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}>{aboutUsTitle || "About Our Agency"}</h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">Unmatched Expertise in Local Markets.</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-10" style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}>
                  {bio || "With over two decades of experience, we've helped thousands of families find their perfect piece of property. Our data-driven approach and personal touch ensure that every transaction is seamless and rewarding."}
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-10">
                  <div>
                    <span className="text-3xl font-black text-slate-900 block">$2B+</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Sales Volume</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block">5k+</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Closed Deals</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Listings Section */}
          <section id="listings" className="py-24 px-6">
            <div className="container mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-indigo-600 text-xs font-black uppercase tracking-[0.4em] mb-4 italic">Properties</h2>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter transition-all">Featured Listings.</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {displayProperties.map((property, idx) => (
                  <motion.div 
                    key={idx} 
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
                    {...fadeIn}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image 
                        src={property.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} 
                        alt={property.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">For Sale</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-black text-slate-900" style={{ fontSize: property.nameFontSize ? `${property.nameFontSize}px` : undefined }}>{property.name}</h4>
                        <span className="text-indigo-600 font-black text-lg" style={{ fontSize: property.descFontSize ? `${property.descFontSize}px` : undefined }}>{property.desc.split('|')[0]}</span>
                      </div>
                      <p className="text-slate-400 font-medium text-sm border-t border-slate-100 pt-4 flex items-center gap-2">
                        <span>📍</span> {property.desc.split('|')[1] || "Prime Location"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Professional Footer */}
        <footer id="contact" className="bg-slate-900 text-white py-24 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-slate-800 pb-20">
              <div className="col-span-1 lg:col-span-2">
                <span className="text-2xl font-black uppercase tracking-tight mb-8 block font-black">{displayAgency}</span>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed italic">
                  Leading the industry with high-end technology and unparalleled local expertise. Your dream home is just an inquiry away.
                </p>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Contact Us</h5>
                <div className="space-y-4 font-bold text-slate-200">
                  <p>{phone || "+1 234 567 890"}</p>
                  <p>{contactEmail || "hello@vista.com"}</p>
                </div>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Location</h5>
                <p className="font-bold text-slate-200 leading-relaxed max-w-[200px]">{address || "123 Reality Lane, City Center"}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] font-black uppercase tracking-widest italic">
              <span>{footerCopyright || `© ${new Date().getFullYear()} ${displayAgency}`}</span>
              <div className="flex gap-8">
                <span className="cursor-pointer hover:text-white transition-colors">Zillow</span>
                <span className="cursor-pointer hover:text-white transition-colors">Redfin</span>
                <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
