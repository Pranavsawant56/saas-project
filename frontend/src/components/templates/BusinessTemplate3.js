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
      {/* Creative Agency Header - Unique for Business 3 */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <nav className="hidden md:flex gap-12 font-black text-[10px] uppercase tracking-[0.4em] text-slate-400">
            <a href="#home" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            {headerType === "Image" ? (
              (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                <div className="relative h-8 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">
                  {displayName[0]}
                </div>
              )
            ) : (
            <div 
              className="text-2xl font-black text-indigo-950 tracking-tighter"
              style={{ fontSize: companyNameFontSize ? `${companyNameFontSize}px` : undefined }}
            >
              {displayName}<span className="text-indigo-600">.</span>
            </div>
            )}
          </div>
          <nav className="hidden md:flex gap-12 font-black text-[10px] uppercase tracking-[0.4em] text-slate-400">
            <a href="#services" className="hover:text-indigo-600 transition-colors">Expertise</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Connect</a>
          </nav>
          {/* Mobile Menu Icon (Visual only) */}
          <div className="md:hidden w-6 h-[2px] bg-slate-900 relative after:absolute after:top-2 after:left-0 after:w-full after:h-full after:bg-slate-900 before:absolute before:-top-2 before:left-0 before:w-full before:h-full before:bg-slate-900" />
        </div>
      </header>

      <div id="home" className="min-h-screen bg-[#fafaf9] text-slate-900 font-sans tracking-tight scroll-smooth flex flex-col">

        <main className="flex-1">
          {/* Soft SaaS Hero */}
          <section className="pt-16 pb-16 px-8 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-100/50 to-transparent -z-10 rounded-full blur-[120px] opacity-60" />

            <div className="max-w-6xl mx-auto text-center relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-400 font-black text-[10px] uppercase tracking-[0.5em] mb-12 shadow-sm italic">
                  Creative Excellence since 2024
                </div>
                <h1 
                  className="text-5xl md:text-7xl font-black text-indigo-950 mb-6 leading-tight tracking-tighter"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
                >
                  {heroTitle || `We Build ${displayName} Dreams.`}
                </h1>
                <p 
                  className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed border-x-2 border-indigo-100 px-8 font-light italic"
                  style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                >
                  {tagline || "The modern platform designed for teams who demand excellence and simplicity in their workflow."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                  <button className="w-full sm:w-auto px-12 py-5 bg-indigo-950 text-white font-black rounded-full hover:bg-indigo-900 transition shadow-2xl shadow-indigo-900/40 text-xs uppercase tracking-widest">
                    Start a Project
                  </button>
                  <button className="w-full sm:w-auto px-12 py-5 bg-white text-slate-800 font-black border-2 border-slate-100 rounded-full hover:bg-slate-50 transition text-xs uppercase tracking-widest">
                    Watch Showreel
                  </button>
                </div>

                <div className="relative max-w-3xl mx-auto">
                  <div className="absolute -inset-10 bg-indigo-600/5 rounded-full blur-[100px] -z-10" />
                  <div className="relative rounded-[4rem] overflow-hidden border-8 border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group aspect-video">
                    <Image
                      src={(heroImage && typeof heroImage === 'string' && heroImage.trim() !== "") ? heroImage : "/images/templates/template-img-21.jpg"}
                      alt={`${displayName} Platform Preview`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Feature Grid */}
          <section id="services" className="py-12 px-8 bg-indigo-950 text-white rounded-[4rem] mx-4 relative overflow-hidden scroll-mt-24">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 blur-[150px] rounded-full" />
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-indigo-400 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">What We Do</h2>
                <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter">Impactful Solutions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayServices.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md group"
                  >
                    <div className="relative flex-shrink-0 w-10 h-10 bg-white text-indigo-900 rounded-lg flex items-center justify-center text-lg font-black italic group-hover:bg-indigo-400 group-hover:text-white transition-all overflow-hidden">
                      {(item.image && typeof item.image === 'string' && item.image.trim() !== "") ? (
                        <Image src={item.image} alt={item.title || item.name} fill className="object-cover rounded-lg" />
                      ) : (
                        idx + 1 < 10 ? `0${idx + 1}` : idx + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-lg font-black italic tracking-tighter truncate"
                        style={{ fontSize: (item.nameFontSize || item.titleFontSize) ? `${item.nameFontSize || item.titleFontSize}px` : undefined }}
                      >
                        {item.title || item.name}
                      </h3>
                      <p 
                        className="text-indigo-100/60 font-light italic text-xs truncate"
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
          <section id="about" className="py-12 px-8 scroll-mt-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 order-2 md:order-1 relative group">
                <div className="absolute -inset-4 bg-indigo-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src={(aboutUsImage && typeof aboutUsImage === 'string' && aboutUsImage.trim() !== "") ? aboutUsImage : "/images/templates/template-img-22.jpg"}
                  alt="Feature representation"
                  fill
                  className="object-cover"
                />
              </div>
                <div className="absolute -top-8 -left-8 w-40 h-40 bg-indigo-600 p-6 rounded-[2.5rem] shadow-2xl text-white flex flex-col justify-center border-8 border-[#fafafa] z-20 hidden md:flex">
                  <div className="text-4xl font-black italic mb-1 text-center">98%</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Client Growth Velocity</div>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <h2 className="text-indigo-600 font-black mb-6 uppercase tracking-[0.5em] text-[10px] border-b border-indigo-100 pb-2 inline-block">The Methodology</h2>
                <h3 
                  className="text-4xl md:text-5xl font-black mb-8 leading-[0.9] tracking-tighter italic"
                  style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                >
                  {aboutUsTitle || "Mastering the data layer."}
                </h3>
                <p 
                  className="text-slate-500 text-lg leading-relaxed mb-10 font-light italic border-l-4 border-indigo-100 pl-8"
                  style={{ fontSize: aboutUsContentFontSize ? `${aboutUsContentFontSize}px` : undefined }}
                >
                  {aboutUsContent || "We've built a logic layer that understands how modern businesses operate. Let us handle the complexity so you can focus on growth."}
                </p>
                <div className="flex gap-12 font-black text-[10px] uppercase tracking-[0.3em] overflow-x-auto pb-4 text-indigo-950">
                  <span>• INNOVATION</span>
                  <span>• SCALE</span>
                  <span>• INTEGRITY</span>
                  <span>• DESIGN</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          {data?.features && data.features.length > 0 && (
            <section id="features" className="py-24 px-8 bg-white border-y border-slate-100 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-600 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">Why Choose Us</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter italic">Key Features</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {data.features.map((feature, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="p-8 rounded-[2rem] bg-[#fafaf9] border border-slate-100 text-center hover:shadow-xl hover:shadow-indigo-900/5 transition-all group">
                      <div className="w-16 h-16 bg-white text-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform relative overflow-hidden">
                        {feature.icon ? <Image src={feature.icon} alt={feature.title} fill className="object-cover" /> : "✦"}
                      </div>
                      <h4 className="text-xl font-bold text-indigo-950 mb-3 italic">{feature.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-light">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Portfolio Section */}
          {((data?.portfolio && data.portfolio.length > 0) || (displayProjects && displayProjects.length > 0)) && (
            <section id="portfolio" className="py-24 px-8 bg-[#fafaf9] scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-600 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">Our Work</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter italic">Selected Projects</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(data?.portfolio || displayProjects).map((item, idx) => (
                    <motion.a key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} href={item.link || '#'} className="group block overflow-hidden rounded-[2rem] bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-900/10 transition-all">
                      <div className="relative h-64 overflow-hidden bg-slate-100">
                        {item.image && (
                          <Image src={item.image} alt={item.title || item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        )}
                      </div>
                      <div className="p-8">
                        <h4 className="text-2xl font-bold text-indigo-950 mb-2 group-hover:text-indigo-600 transition-colors italic">{item.title || item.name}</h4>
                        <p className="text-slate-500 text-sm font-light">{item.desc}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Team Section */}
          {data?.team && data.team.length > 0 && (
            <section id="team" className="py-24 px-8 bg-white border-y border-slate-100 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-600 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">The Experts</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter italic">Our Leadership</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {data.team.map((member, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="group text-center">
                      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-indigo-100 transition-all duration-500">
                        {member.image ? (
                          <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        ) : (
                          <div className="w-full h-full bg-slate-100" />
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-indigo-950 italic">{member.name}</h4>
                      <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3 mt-1">{member.role}</p>
                      <p className="text-slate-500 text-sm font-light">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials */}
          {data?.testimonials && data.testimonials.length > 0 && (
            <section id="testimonials" className="py-24 px-8 bg-indigo-950 text-white scroll-mt-24 rounded-[4rem] mx-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[150px] rounded-full" />
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-400 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">Client Feedback</h2>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter italic">Testimonials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data.testimonials.map((testi, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white/5 p-8 rounded-[2rem] backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="text-indigo-400 text-4xl mb-4 font-serif">"</div>
                      <p className="text-lg font-light leading-relaxed mb-8 text-indigo-100 italic">{testi.review}</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-indigo-400">
                          {testi.image ? <Image src={testi.image} alt={testi.name} fill className="object-cover" /> : <div className="w-full h-full bg-indigo-900" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{testi.name}</h4>
                          <p className="text-[10px] text-indigo-300 uppercase tracking-widest mt-1 font-black">{testi.role}</p>
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
            <section id="pricing" className="py-24 px-8 bg-[#fafaf9] scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-600 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">Flexible Plans</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter italic">Pricing & Packages</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {data.pricing.map((plan, idx) => {
                    const featuresList = plan.features ? plan.features.split(',').map(f => f.trim()) : [];
                    return (
                      <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`p-8 rounded-[2rem] bg-white border ${idx === 1 ? 'border-indigo-600 shadow-2xl shadow-indigo-900/10 scale-105 relative z-10' : 'border-slate-100 shadow-sm'} text-center`}>
                        {idx === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Most Popular</div>}
                        <h4 className="text-xl font-black text-indigo-950 mb-2 italic">{plan.planName}</h4>
                        <div className="text-4xl font-black text-indigo-600 mb-8">{plan.price}</div>
                        <ul className="space-y-4 mb-8 text-slate-500 text-sm font-light">
                          {featuresList.map((f, i) => (
                            <li key={i} className="flex items-center justify-center gap-2">
                              <span className="text-indigo-600 font-bold">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-full py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all ${idx === 1 ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/30' : 'bg-slate-100 text-indigo-950 hover:bg-slate-200'}`}>
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
            <section id="faq" className="py-24 px-8 bg-white border-y border-slate-100 scroll-mt-24">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-600 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">Got Questions?</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter italic">FAQ</h3>
                </div>
                <div className="space-y-4">
                  {data.faq.map((q, idx) => (
                    <details key={idx} className="group bg-[#fafaf9] border border-slate-100 rounded-[1.5rem] open:border-indigo-600 transition-all open:shadow-md">
                      <summary className="font-bold text-indigo-950 p-6 cursor-pointer select-none outline-none group-open:text-indigo-600 italic">
                        {q.question}
                      </summary>
                      <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed font-light">
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
            <section id="blog" className="py-24 px-8 bg-[#fafaf9] scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-600 font-black mb-4 uppercase tracking-[0.5em] text-[10px]">Latest Insights</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter italic">Our Blog</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {data.blog.map((post, idx) => (
                    <motion.a key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} href={post.link || '#'} className="block bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-500 group">
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        {post.image && <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />}
                      </div>
                      <div className="p-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">{post.date}</span>
                        <h4 className="text-xl font-bold text-indigo-950 mb-3 group-hover:text-indigo-600 transition-colors italic">{post.title}</h4>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-4 font-light">{post.excerpt}</p>
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Read More →</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-32 px-8 bg-indigo-950 text-white text-center relative overflow-hidden rounded-[4rem] mx-4 mb-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[150px] rounded-full" />
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic">{data?.ctaTitle || "Ready to transform your business?"}</h2>
              <p className="text-lg md:text-xl text-indigo-100/80 mb-10 font-light italic max-w-2xl mx-auto">{data?.ctaDesc || "Join hundreds of successful companies working with us today to scale their operations."}</p>
              <a href={data?.ctaButtonLink || '#contact'} className="inline-block bg-white text-indigo-950 px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-50 hover:-translate-y-1 transition-all shadow-xl shadow-black/20">
                {data?.ctaButtonText || "Get Started Now"}
              </a>
            </div>
          </section>

        </main>

        <footer id="contact" className="py-24 px-12 border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
              {/* Branding Column */}
              <div className="flex flex-col gap-8">
                {headerType === "Image" && (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                  <div className="relative h-8 w-32 self-start">
                    <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                  </div>
                ) : (
                  <div className="text-3xl font-black text-indigo-950 tracking-tighter italic">
                    {displayName}<span className="text-indigo-600">.</span>
                  </div>
                )}
                <p className="text-slate-500 font-light italic leading-relaxed text-sm">
                  {footerAbout || "Redefining the digital landscape through elite strategy and creative excellence."}
                </p>
              </div>

              {/* Quick Links Column */}
              <div className="flex flex-col gap-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-950 border-b border-indigo-50 pb-4">Quick Links</h4>
                <nav className="flex flex-col gap-4 font-black text-xs uppercase tracking-widest text-slate-400">
                  <a href="#home" className="hover:text-indigo-600 transition-colors italic">Home</a>
                  <a href="#services" className="hover:text-indigo-600 transition-colors italic">Expertise</a>
                  <a href="#about" className="hover:text-indigo-600 transition-colors italic">About</a>
                  <a href="#contact" className="hover:text-indigo-600 transition-colors italic">Connect</a>
                </nav>
              </div>

              {/* Contact Column */}
              <div className="flex flex-col gap-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-950 border-b border-indigo-50 pb-4">Contact</h4>
                <div className="flex flex-col gap-6">
                  {address && (
                    <div className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm">📍</div>
                      <p className="text-sm text-slate-500 italic font-light leading-snug">{address}</p>
                    </div>
                  )}
                  {displayPhone && (
                    <div className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm">📞</div>
                      <p className="text-sm text-slate-500 italic font-light">{displayPhone}</p>
                    </div>
                  )}
                  {contactEmail && (
                    <div className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm">✉️</div>
                      <p className="text-sm text-slate-500 italic font-light">{contactEmail}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Newsletter & Social Column */}
              <div className="flex flex-col gap-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-950 border-b border-indigo-50 pb-4">{data?.newsletterTitle || "Stay Updated"}</h4>
                <div className="flex flex-col gap-3">
                  <p className="text-slate-500 text-xs italic font-light mb-2">{data?.newsletterDesc || "Subscribe for the latest insights."}</p>
                  <input type="email" placeholder="your@email.com" className="bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-colors text-indigo-950" />
                  <button className="bg-indigo-950 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-800 transition-all text-white shadow-md shadow-indigo-900/20">Subscribe</button>
                </div>
                <div className="flex gap-4 mt-4">
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm group">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm group">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  )}
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm group">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {!facebookUrl && !twitterUrl && !linkedinUrl && (
                    <div className="text-[10px] text-slate-400 italic">No social links provided</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-100 font-black text-[10px] uppercase tracking-[0.5em] text-slate-300">
              <div>{footerCopyright || `© ${new Date().getFullYear()} ${displayName} / All Rights Reserved`}</div>
              <div className="mt-4 md:mt-0 italic tracking-normal">designed for the digital era</div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
