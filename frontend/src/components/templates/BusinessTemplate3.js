import TemplateLayout from "./TemplateLayout";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BusinessTemplate3({ data }) {
  const {
    companyName,
    heroTitle,
    tagline,
    heroImage,
    service1_name, service1_desc,
    service2_name, service2_desc,
    service3_name, service3_desc,
    service4_name, service4_desc,
    aboutUsTitle,
    aboutUsContent,
    aboutUsImage,
    headerType,
    logoUrl,
    phone, address, countryCode, contactEmail, footerAbout, footerCopyright,
    facebookUrl, twitterUrl, linkedinUrl,
    companyNameFontSize,
    heroTitleFontSize,
    taglineFontSize,
    service1_nameFontSize, service1_descFontSize,
    service2_nameFontSize, service2_descFontSize,
    service3_nameFontSize, service3_descFontSize,
    service4_nameFontSize, service4_descFontSize,
    aboutUsTitleFontSize, aboutUsContentFontSize,
    addressFontSize, contactEmailFontSize, phoneFontSize,
    services,
  } = data || {};

  const displayName = companyName || "Agency X";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : phone;
  const displayServices = (services && services.length > 0 && services.some(s => s.name || s.title || s.desc)) ? services : [
    { title: service1_name || "Visual Identity", desc: service1_desc || "Building brands.", nameFontSize: service1_nameFontSize, descFontSize: service1_descFontSize },
    { title: service2_name || "Growth Strategy", desc: service2_desc || "Market velocity.", nameFontSize: service2_nameFontSize, descFontSize: service2_descFontSize },
    { title: service3_name || "Digital Products", desc: service3_desc || "Encryption layers.", nameFontSize: service3_nameFontSize, descFontSize: service3_descFontSize },
    { title: service4_name || "Web Architecture", desc: service4_desc || "Scalable solutions.", nameFontSize: service4_nameFontSize, descFontSize: service4_descFontSize }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Business" hideHeader={true} hideFooter={true}>
      {/* Xiaomi-Inspired Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-black/[0.04] px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <nav className="hidden md:flex gap-12 font-bold text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">
            <a href="#home" className="hover:text-[#FF6900] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#FF6900] transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            {headerType === "Image" ? (
              (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                <div className="relative h-8 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-[#FF6900] to-[#FF8A3D] rounded-lg flex items-center justify-center text-white text-xs shadow-[0_4px_10px_rgba(255,105,0,0.3)]">
                  {displayName[0]}
                </div>
              )
            ) : (
            <div 
              className="text-2xl font-bold text-[#111827] tracking-tight"
              style={{ fontSize: companyNameFontSize ? `${companyNameFontSize}px` : undefined }}
            >
              {displayName}<span className="text-[#FF6900]">.</span>
            </div>
            )}
          </div>
          <nav className="hidden md:flex gap-12 font-bold text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">
            <a href="#services" className="hover:text-[#FF6900] transition-colors">Expertise</a>
            <a href="#contact" className="hover:text-[#FF6900] transition-colors">Connect</a>
          </nav>
          {/* Mobile Menu Icon */}
          <div className="md:hidden w-6 h-[2px] bg-[#111827] relative after:absolute after:top-2 after:left-0 after:w-full after:h-full after:bg-[#111827] before:absolute before:-top-2 before:left-0 before:w-full before:h-full before:bg-[#111827]" />
        </div>
      </header>

      <div id="home" className="min-h-screen bg-[#F5F7FA] text-[#111827] font-sans tracking-tight scroll-smooth flex flex-col">

        <main className="flex-1">
          {/* Premium Light Hero */}
          <section className="pt-24 pb-16 px-8 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#FF6900]/10 to-transparent -z-10 rounded-full blur-[100px] opacity-70" />

            <div className="max-w-6xl mx-auto text-center relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-block px-6 py-2 bg-white border border-black/5 rounded-full text-[#6B7280] font-bold text-[11px] uppercase tracking-[0.2em] mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md">
                  Premium Quality Since 2024
                </div>
                <h1 
                  className="text-5xl md:text-7xl font-bold text-[#111827] mb-6 leading-tight tracking-tight"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
                >
                  {heroTitle || `We Build ${displayName} Dreams.`}
                </h1>
                <p 
                  className="text-lg md:text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed border-x-2 border-[#FF6900]/20 px-8 font-light"
                  style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                >
                  {tagline || "The modern platform designed for teams who demand excellence and simplicity in their workflow."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                  <button className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-[#FF6900] to-[#FF8A3D] text-white font-bold rounded-full hover:shadow-[0_8px_25px_rgba(255,105,0,0.3)] hover:-translate-y-1 transition-all duration-300 text-xs uppercase tracking-[0.2em]">
                    Start a Project
                  </button>
                  <button className="w-full sm:w-auto px-12 py-5 bg-white text-[#111827] font-bold border border-black/5 rounded-full hover:bg-[#F8F9FB] hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 text-xs uppercase tracking-[0.2em]">
                    Watch Showreel
                  </button>
                </div>

                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute -inset-10 bg-[#FF6900]/5 rounded-[4rem] blur-[80px] -z-10" />
                  <div className="relative rounded-[2.5rem] overflow-hidden border border-black/5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)] group aspect-video bg-white">
                    <Image
                      src={(heroImage && typeof heroImage === 'string' && heroImage.trim() !== "") ? heroImage : "/images/templates/template-img-21.jpg"}
                      alt={`${displayName} Platform Preview`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.22,1,0.36,1]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Feature Grid */}
          <section id="services" className="py-24 px-8 bg-white border border-black/[0.04] text-[#111827] rounded-[3rem] mx-4 md:mx-8 relative overflow-hidden scroll-mt-24 shadow-[0_10px_50px_rgba(0,0,0,0.02)]">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6900]/5 blur-[120px] rounded-full" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">What We Do</h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827]">Impactful Solutions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayServices.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    transition={{ ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-6 p-6 bg-[#F8F9FB] border border-black/5 rounded-2xl group hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:bg-white transition-all duration-300"
                  >
                    <div className="relative flex-shrink-0 w-14 h-14 bg-white text-[#111827] rounded-xl flex items-center justify-center text-xl font-bold shadow-sm group-hover:bg-[#FF6900] group-hover:text-white transition-colors duration-300 overflow-hidden border border-black/5">
                      {(item.image && typeof item.image === 'string' && item.image.trim() !== "") ? (
                        <Image src={item.image} alt={item.title || item.name} fill className="object-cover rounded-xl" />
                      ) : (
                        idx + 1 < 10 ? `0${idx + 1}` : idx + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-lg font-bold tracking-tight truncate text-[#111827] mb-1"
                        style={{ fontSize: (item.nameFontSize || item.titleFontSize) ? `${item.nameFontSize || item.titleFontSize}px` : undefined }}
                      >
                        {item.title || item.name}
                      </h3>
                      <p 
                        className="text-[#6B7280] font-light text-sm truncate"
                        style={{ fontSize: item.descFontSize ? `${item.descFontSize}px` : undefined }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32 px-8 scroll-mt-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2 order-2 md:order-1 relative group">
                <div className="absolute -inset-4 bg-[#FF6900]/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 border border-black/5">
                  <Image
                    src={(aboutUsImage && typeof aboutUsImage === 'string' && aboutUsImage.trim() !== "") ? aboutUsImage : "/images/templates/template-img-22.jpg"}
                    alt="Feature representation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.22,1,0.36,1]"
                  />
                </div>
                <div className="absolute -top-8 -left-8 w-44 h-44 bg-white/90 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col justify-center border border-white z-20 hidden md:flex backdrop-blur-xl">
                  <div className="text-5xl font-bold mb-2 text-center bg-gradient-to-r from-[#FF6900] to-[#FF8A3D] bg-clip-text text-transparent">98%</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B7280] text-center leading-tight">Client Growth<br/>Velocity</div>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <h2 className="text-[#FF6900] font-bold mb-6 uppercase tracking-[0.3em] text-[11px] border-b border-[#FF6900]/20 pb-2 inline-block">The Methodology</h2>
                <h3 
                  className="text-4xl md:text-5xl font-bold mb-8 leading-[1.1] tracking-tight text-[#111827]"
                  style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                >
                  {aboutUsTitle || "Mastering the logic layer."}
                </h3>
                <p 
                  className="text-[#6B7280] text-lg leading-relaxed mb-10 font-light border-l-4 border-[#FF6900]/30 pl-8"
                  style={{ fontSize: aboutUsContentFontSize ? `${aboutUsContentFontSize}px` : undefined }}
                >
                  {aboutUsContent || "We've built a logic layer that understands how modern businesses operate. Let us handle the complexity so you can focus on growth."}
                </p>
                <div className="flex gap-12 font-bold text-[11px] uppercase tracking-[0.2em] overflow-x-auto pb-4 text-[#6B7280]">
                  <span className="hover:text-[#FF6900] transition-colors cursor-default">INNOVATION</span>
                  <span className="hover:text-[#FF6900] transition-colors cursor-default">SCALE</span>
                  <span className="hover:text-[#FF6900] transition-colors cursor-default">INTEGRITY</span>
                  <span className="hover:text-[#FF6900] transition-colors cursor-default">DESIGN</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          {data?.features && data.features.length > 0 && (
            <section id="features" className="py-24 px-8 bg-white border-y border-black/5 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">Why Choose Us</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Key Features</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {data.features.map((feature, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }} className="p-10 rounded-[2rem] bg-[#F8F9FB] border border-black/[0.04] text-center hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 group">
                      <div className="w-16 h-16 bg-white text-[#FF6900] rounded-2xl mx-auto flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-black/5">
                        {feature.icon ? <Image src={feature.icon} alt={feature.title} fill className="object-cover" /> : "✦"}
                      </div>
                      <h4 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h4>
                      <p className="text-[#6B7280] text-sm leading-relaxed font-light">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Portfolio Section */}
          {((data?.portfolio && data.portfolio.length > 0) || (displayProjects && displayProjects.length > 0)) && (
            <section id="portfolio" className="py-32 px-8 bg-[#F5F7FA] scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">Our Work</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Selected Projects</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(data?.portfolio || displayProjects).map((item, idx) => (
                    <motion.a key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }} href={item.link || '#'} className="group block overflow-hidden rounded-[2rem] bg-white shadow-sm border border-black/5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden bg-[#F8F9FB]">
                        {item.image && (
                          <Image src={item.image} alt={item.title || item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                        )}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                      </div>
                      <div className="p-8">
                        <h4 className="text-xl font-bold text-[#111827] mb-2 group-hover:text-[#FF6900] transition-colors">{item.title || item.name}</h4>
                        <p className="text-[#6B7280] text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Team Section */}
          {data?.team && data.team.length > 0 && (
            <section id="team" className="py-24 px-8 bg-white border-y border-black/5 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">The Experts</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Our Leadership</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {data.team.map((member, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }} className="group text-center bg-[#F8F9FB] p-8 rounded-[2rem] border border-black/5 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
                      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-sm border-4 border-white group-hover:border-[#FF6900]/20 transition-all duration-500">
                        {member.image ? (
                          <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                        ) : (
                          <div className="w-full h-full bg-[#F5F7FA]" />
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-[#111827]">{member.name}</h4>
                      <p className="text-[#FF6900] font-bold text-[10px] uppercase tracking-[0.2em] mb-3 mt-1">{member.role}</p>
                      <p className="text-[#6B7280] text-sm font-light leading-relaxed">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials */}
          {data?.testimonials && data.testimonials.length > 0 && (
            <section id="testimonials" className="py-24 px-8 bg-[#F8F9FB] border border-black/5 text-[#111827] scroll-mt-24 rounded-[3rem] mx-4 md:mx-8 relative overflow-hidden my-24">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6900]/5 blur-[120px] rounded-full" />
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">Client Feedback</h2>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Testimonials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data.testimonials.map((testi, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }} className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500">
                      <div className="text-[#FF6900] text-5xl mb-4 font-serif leading-none opacity-50">"</div>
                      <p className="text-lg font-light leading-relaxed mb-10 text-[#6B7280]">{testi.review}</p>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-white shadow-sm">
                          {testi.image ? <Image src={testi.image} alt={testi.name} fill className="object-cover" /> : <div className="w-full h-full bg-[#F5F7FA]" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#111827]">{testi.name}</h4>
                          <p className="text-[10px] text-[#6B7280] uppercase tracking-widest mt-1 font-bold">{testi.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Pricing */}
          {data?.pricing && data.pricing.length > 0 && (
            <section id="pricing" className="py-32 px-8 bg-white scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">Flexible Plans</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Pricing & Packages</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {data.pricing.map((plan, idx) => {
                    const featuresList = plan.features ? plan.features.split(',').map(f => f.trim()) : [];
                    return (
                      <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }} className={`p-10 rounded-[2.5rem] bg-white border ${idx === 1 ? 'border-[#FF6900]/30 shadow-[0_20px_60px_rgba(255,105,0,0.1)] scale-105 relative z-10' : 'border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500'}`}>
                        {idx === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF6900] to-[#FF8A3D] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">Most Popular</div>}
                        <h4 className="text-xl font-bold text-[#111827] mb-2">{plan.planName}</h4>
                        <div className="text-5xl font-bold text-[#111827] mb-8 tracking-tight">{plan.price}</div>
                        <ul className="space-y-4 mb-10 text-[#6B7280] text-sm font-light">
                          {featuresList.map((f, i) => (
                            <li key={i} className="flex items-center justify-start gap-3">
                              <span className="text-[#FF6900] font-bold text-lg bg-[#FF6900]/10 w-6 h-6 rounded-full flex items-center justify-center">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-full py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${idx === 1 ? 'bg-gradient-to-r from-[#FF6900] to-[#FF8A3D] text-white hover:shadow-[0_8px_20px_rgba(255,105,0,0.3)] hover:-translate-y-1' : 'bg-[#F8F9FB] text-[#111827] hover:bg-[#FF6900] hover:text-white border border-black/5'}`}>
                          {plan.buttonText || "Get Started"}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          {data?.faq && data.faq.length > 0 && (
            <section id="faq" className="py-24 px-8 bg-[#F5F7FA] border-y border-black/5 scroll-mt-24">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">Got Questions?</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">FAQ</h3>
                </div>
                <div className="space-y-4">
                  {data.faq.map((q, idx) => (
                    <details key={idx} className="group bg-white border border-black/5 rounded-[1.5rem] open:border-[#FF6900]/30 transition-all duration-300 open:shadow-[0_10px_30px_rgba(255,105,0,0.05)] shadow-sm">
                      <summary className="font-bold text-[#111827] p-6 cursor-pointer select-none outline-none group-open:text-[#FF6900]">
                        {q.question}
                      </summary>
                      <div className="px-6 pb-6 text-[#6B7280] text-sm leading-relaxed font-light">
                        {q.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Blog */}
          {data?.blog && data.blog.length > 0 && (
            <section id="blog" className="py-32 px-8 bg-white scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[#FF6900] font-bold mb-4 uppercase tracking-[0.3em] text-[11px]">Latest Insights</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Our Blog</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {data.blog.map((post, idx) => (
                    <motion.a key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }} href={post.link || '#'} className="block bg-[#F8F9FB] rounded-[2rem] overflow-hidden shadow-sm border border-black/5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:bg-white hover:-translate-y-2 transition-all duration-500 group">
                      <div className="relative h-56 overflow-hidden bg-[#F5F7FA]">
                        {post.image && <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]" />}
                      </div>
                      <div className="p-8">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6900] mb-3 block">{post.date}</span>
                        <h4 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#FF6900] transition-colors">{post.title}</h4>
                        <p className="text-[#6B7280] text-sm line-clamp-3 mb-6 font-light leading-relaxed">{post.excerpt}</p>
                        <span className="text-[11px] font-bold text-[#111827] group-hover:text-[#FF6900] uppercase tracking-widest transition-colors">Read More →</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-32 px-8 bg-gradient-to-br from-[#F8F9FB] to-[#F5F7FA] border border-black/5 text-[#111827] text-center relative overflow-hidden rounded-[3rem] mx-4 md:mx-8 mb-24 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6900]/5 blur-[120px] rounded-full" />
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-[#111827]">{data?.ctaTitle || "Ready to transform your business?"}</h2>
              <p className="text-lg md:text-xl text-[#6B7280] mb-12 font-light max-w-2xl mx-auto leading-relaxed">{data?.ctaDesc || "Join hundreds of successful companies working with us today to scale their operations."}</p>
              <a href={data?.ctaButtonLink || '#contact'} className="inline-block bg-gradient-to-r from-[#FF6900] to-[#FF8A3D] text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,105,0,0.3)] transition-all duration-300">
                {data?.ctaButtonText || "Get Started Now"}
              </a>
            </div>
          </section>

        </main>

        <footer id="contact" className="py-24 px-8 md:px-12 border-t border-black/5 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
              {/* Branding Column */}
              <div className="flex flex-col gap-8">
                {headerType === "Image" && (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                  <div className="relative h-8 w-32 self-start">
                    <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-[#111827] tracking-tight">
                    {displayName}<span className="text-[#FF6900]">.</span>
                  </div>
                )}
                <p className="text-[#6B7280] font-light leading-relaxed text-sm">
                  {footerAbout || "Redefining the digital landscape through elite strategy and creative excellence."}
                </p>
              </div>

              {/* Quick Links Column */}
              <div className="flex flex-col gap-8">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#111827] border-b border-black/5 pb-4">Quick Links</h4>
                <nav className="flex flex-col gap-4 font-bold text-xs uppercase tracking-[0.2em] text-[#6B7280]">
                  <a href="#home" className="hover:text-[#FF6900] transition-colors">Home</a>
                  <a href="#services" className="hover:text-[#FF6900] transition-colors">Expertise</a>
                  <a href="#about" className="hover:text-[#FF6900] transition-colors">About</a>
                  <a href="#contact" className="hover:text-[#FF6900] transition-colors">Connect</a>
                </nav>
              </div>

              {/* Contact Column */}
              <div className="flex flex-col gap-8">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#111827] border-b border-black/5 pb-4">Contact</h4>
                <div className="flex flex-col gap-6">
                  {address && (
                    <div className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#FF6900] group-hover:bg-[#FF6900] group-hover:text-white transition-colors duration-300 text-sm border border-black/5">📍</div>
                      <p className="text-sm text-[#6B7280] font-light leading-snug pt-1">{address}</p>
                    </div>
                  )}
                  {displayPhone && (
                    <div className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#FF6900] group-hover:bg-[#FF6900] group-hover:text-white transition-colors duration-300 text-sm border border-black/5">📞</div>
                      <p className="text-sm text-[#6B7280] font-light">{displayPhone}</p>
                    </div>
                  )}
                  {contactEmail && (
                    <div className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#FF6900] group-hover:bg-[#FF6900] group-hover:text-white transition-colors duration-300 text-sm border border-black/5">✉️</div>
                      <p className="text-sm text-[#6B7280] font-light">{contactEmail}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Newsletter & Social Column */}
              <div className="flex flex-col gap-8">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#111827] border-b border-black/5 pb-4">{data?.newsletterTitle || "Stay Updated"}</h4>
                <div className="flex flex-col gap-4">
                  <p className="text-[#6B7280] text-sm font-light">{data?.newsletterDesc || "Subscribe for the latest insights."}</p>
                  <input type="email" placeholder="your@email.com" className="bg-[#F8F9FB] border border-black/5 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#FF6900] transition-colors text-[#111827] placeholder:text-[#6B7280]/50" />
                  <button className="bg-gradient-to-r from-[#FF6900] to-[#FF8A3D] py-3 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,105,0,0.3)] transition-all duration-300 text-white">Subscribe</button>
                </div>
                <div className="flex gap-4 mt-2">
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#6B7280] hover:bg-[#FF6900] hover:text-white transition-all duration-300 shadow-sm group border border-black/5">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#6B7280] hover:bg-[#FF6900] hover:text-white transition-all duration-300 shadow-sm group border border-black/5">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  )}
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#6B7280] hover:bg-[#FF6900] hover:text-white transition-all duration-300 shadow-sm group border border-black/5">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {!facebookUrl && !twitterUrl && !linkedinUrl && (
                    <div className="text-[11px] text-[#6B7280] font-light">No social links provided</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 font-bold text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">
              <div>{footerCopyright || `© ${new Date().getFullYear()} ${displayName} / All Rights Reserved`}</div>
              <div className="mt-4 md:mt-0 tracking-widest">Designed for the modern web</div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
