import TemplateLayout from "./TemplateLayout";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BusinessTemplate2({ data }) {
  const {
    companyName, heroTitle, tagline, heroImage, aboutUsTitle, aboutUsContent, aboutUsImage,
    headerType, logoUrl, address, contactEmail, email, phone, facebookUrl, twitterUrl, linkedinUrl,
    companyNameFontSize, heroTitleFontSize, taglineFontSize,
    aboutUsTitleFontSize, aboutUsContentFontSize,
    services,
    countryCode,
  } = data || {};

  const displayName = companyName || "NextGen";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : phone;

  const displayServices = (services && services.length > 0 && services.some(s => s.name || s.desc)) ? services : [
    { name: 'App Design', desc: 'Crafting intuitive mobile experiences.' },
    { name: 'Web Dev', desc: 'Building high-performance web applications.' },
    { name: 'Cloud Ops', desc: 'Scaling infrastructure with precision.' },
    { name: 'AI Solutions', desc: 'Automating the future of business.' }
  ];

  return (
    <TemplateLayout data={data} theme="dark" category="Business" hideHeader={true} hideFooter={true}>
      {/* Modernist Header - Unique for Business 2 */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 py-6 px-12 transition-all flex justify-between items-center">
        <div className="flex items-center gap-3">
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
              className="text-xl font-black tracking-tighter"
              style={{ fontSize: companyNameFontSize ? `${companyNameFontSize}px` : undefined }}
            >
              {displayName}<span className="text-indigo-500">.</span>
            </div>
          )}
        </div>
        <nav className="hidden md:flex items-center gap-10">
          {['Home', 'Services', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-white transition-all">{item}</a>
          ))}
          <button className="bg-white text-slate-950 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
            Join Now
          </button>
        </nav>
      </header>

      <div id="home" className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white scroll-smooth flex flex-col">

        <main className="flex-1">
          {/* Geometric Hero */}
          <section className="relative pt-16 pb-12 overflow-hidden px-8">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -ml-32 -mb-32" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="inline-block px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-8 shadow-inner">
                  Redefining the Future
                </div>
                <h1
                  className="text-5xl lg:text-6xl font-black mb-6 leading-[0.9] tracking-tighter italic"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
                >
                  {heroTitle || `Scale Your ${displayName} Legacy.`}
                </h1>
                <p
                  className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed border-l-2 border-indigo-500/30 pl-6 font-light italic"
                  style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : undefined }}
                >
                  {tagline || "We help businesses scale through cutting-edge technology and strategic digital disruption."}
                </p>
                <div className="flex gap-6">
                  <button className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all flex items-center gap-4 group shadow-2xl shadow-indigo-600/20 text-xs uppercase tracking-widest">
                    Start Project <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                  <Image
                    src={(heroImage && typeof heroImage === 'string' && heroImage.trim() !== "") ? heroImage : "/images/templates/template-img-1.jpg"}
                    alt={`${displayName} Hero section representing innovation`}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Diagonal Services */}
          <section id="services" className="py-16 bg-slate-900 border-y border-white/5 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-8">
              <div className="flex flex-col gap-3">
                {displayServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-950/50 backdrop-blur-xl p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group flex items-center gap-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />
                    <div className="relative flex-shrink-0 w-10 h-10 group-hover:rotate-12 transition-transform overflow-hidden flex items-center justify-center text-2xl">
                      {(service.image && typeof service.image === 'string' && service.image.trim() !== "") ? <Image src={service.image} alt={service.name} fill className="object-cover rounded-lg" /> : (index % 2 === 0 ? "🚀" : "🛡️")}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 min-w-0 relative z-10">
                      <h3
                        className="text-base font-black tracking-tighter italic whitespace-nowrap"
                        style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                      >
                        {service.name}
                      </h3>
                      <span className="text-white/10 hidden sm:inline">—</span>
                      <p
                        className="text-slate-400 text-xs italic truncate"
                        style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                      >
                        {service.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Modern About */}
          <section id="about" className="py-24 px-8 scroll-mt-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/5 blur-[200px] rounded-full" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-32 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-indigo-400 font-black uppercase tracking-[0.5em] mb-8 text-[10px] block border-l-4 border-indigo-600 pl-4">The Vision</span>
                <h3
                  className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic"
                  style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                >
                  {aboutUsTitle || "Engineering the future of connectivity."}
                </h3>
                <p
                  className="text-slate-400 text-xl leading-relaxed mb-12 font-light italic"
                  style={{ fontSize: aboutUsContentFontSize ? `${aboutUsContentFontSize}px` : undefined }}
                >
                  {aboutUsContent || "Our mission is to empower organizations with the tools they need to thrive in an increasingly complex and interconnected world."}
                </p>
                <div className="grid grid-cols-3 gap-12">
                  <div><div className="text-5xl font-black mb-2 italic">99<span className="text-indigo-600 text-3xl">%</span></div><div className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">Efficiency</div></div>
                  <div><div className="text-5xl font-black mb-2 italic">24<span className="text-indigo-600 text-3xl">/</span>7</div><div className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">Real-time</div></div>
                  <div><div className="text-5xl font-black mb-2 italic">∞</div><div className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">Integrity</div></div>
                </div>
              </div>
              <div className="lg:col-span-5 relative group">
                <div className="relative w-full aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl z-10 border border-white/5">
                  <Image
                    src={(aboutUsImage && typeof aboutUsImage === 'string' && aboutUsImage.trim() !== "") ? aboutUsImage : "/images/templates/template-img-20.jpg"}
                    alt="About Us representation"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                <div className="absolute -inset-4 border border-indigo-500/20 rounded-[4.5rem] -rotate-3 transition-transform group-hover:rotate-0" />
              </div>
            </div>
          </section>
          {/* Features Section */}
          {data?.features && data.features.length > 0 && (
            <section id="features" className="py-24 px-8 bg-slate-900 border-t border-white/5 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Why Choose Us</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">Key Features</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {data.features.map((feature, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="p-8 rounded-3xl bg-slate-950/50 border border-white/5 text-center hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">
                      <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform relative overflow-hidden">
                        {feature.icon ? <Image src={feature.icon} alt={feature.title} fill className="object-cover" /> : "✦"}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 italic">{feature.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Portfolio Section */}
          {((data?.portfolio && data.portfolio.length > 0) || (displayProjects && displayProjects.length > 0)) && (
            <section id="portfolio" className="py-24 px-8 bg-slate-950 border-y border-white/5 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Our Work</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">Selected Projects</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(data?.portfolio || displayProjects).map((item, idx) => (
                    <motion.a key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} href={item.link || '#'} className="group block overflow-hidden rounded-3xl bg-slate-900 shadow-lg border border-white/5 hover:border-indigo-500/30 transition-all">
                      <div className="relative h-64 overflow-hidden">
                        {item.image ? (
                          <Image src={item.image} alt={item.title || item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        ) : (
                          <div className="w-full h-full bg-slate-800" />
                        )}
                      </div>
                      <div className="p-8">
                        <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors italic">{item.title || item.name}</h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Team Section */}
          {data?.team && data.team.length > 0 && (
            <section id="team" className="py-24 px-8 bg-slate-900 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">The Experts</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">Our Leadership</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {data.team.map((member, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="group text-center">
                      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-slate-800 group-hover:border-indigo-500 transition-all duration-500">
                        {member.image ? (
                          <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        ) : (
                          <div className="w-full h-full bg-slate-800" />
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-white italic">{member.name}</h4>
                      <p className="text-indigo-400 font-medium text-[10px] uppercase tracking-widest mb-3 mt-1">{member.role}</p>
                      <p className="text-slate-400 text-sm">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials */}
          {data?.testimonials && data.testimonials.length > 0 && (
            <section id="testimonials" className="py-24 px-8 bg-indigo-600 text-white scroll-mt-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply"></div>
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-300 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Client Feedback</h2>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight italic">Testimonials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data.testimonials.map((testi, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="text-indigo-400 text-4xl mb-4 font-serif">"</div>
                      <p className="text-lg font-light leading-relaxed mb-8 text-slate-300 italic">{testi.review}</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-indigo-500">
                          {testi.image ? <Image src={testi.image} alt={testi.name} fill className="object-cover" /> : <div className="w-full h-full bg-slate-600" />}
                        </div>
                        <div>
                          <h4 className="font-bold">{testi.name}</h4>
                          <p className="text-[10px] text-indigo-300 uppercase tracking-widest mt-1">{testi.role}</p>
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
            <section id="pricing" className="py-24 px-8 bg-slate-950 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Flexible Plans</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">Pricing & Packages</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {data.pricing.map((plan, idx) => {
                    const featuresList = plan.features ? plan.features.split(',').map(f => f.trim()) : [];
                    return (
                      <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`p-8 rounded-3xl bg-slate-900/50 border ${idx === 1 ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 relative z-10' : 'border-white/5'} text-center backdrop-blur-sm`}>
                        {idx === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>}
                        <h4 className="text-xl font-black text-white mb-2 italic">{plan.planName}</h4>
                        <div className="text-4xl font-black text-indigo-400 mb-8">{plan.price}</div>
                        <ul className="space-y-4 mb-8 text-slate-400 text-sm font-light">
                          {featuresList.map((f, i) => (
                            <li key={i} className="flex items-center justify-center gap-2">
                              <span className="text-indigo-500">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${idx === 1 ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30' : 'bg-white/5 text-white hover:bg-white/10'}`}>
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
            <section id="faq" className="py-24 px-8 bg-slate-900 border-y border-white/5 scroll-mt-24">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Got Questions?</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">FAQ</h3>
                </div>
                <div className="space-y-4">
                  {data.faq.map((q, idx) => (
                    <details key={idx} className="group bg-slate-950/50 border border-white/5 rounded-2xl open:border-indigo-500/30 transition-all">
                      <summary className="font-bold text-white p-6 cursor-pointer select-none outline-none group-open:text-indigo-400 italic">
                        {q.question}
                      </summary>
                      <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed font-light">
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
            <section id="blog" className="py-24 px-8 bg-slate-950 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-indigo-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Latest Insights</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">Our Blog</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {data.blog.map((post, idx) => (
                    <motion.a key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} href={post.link || '#'} className="block bg-slate-900/50 rounded-3xl overflow-hidden shadow-lg border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group">
                      <div className="relative h-48 overflow-hidden">
                        {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" /> : <div className="w-full h-full bg-slate-800" />}
                      </div>
                      <div className="p-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 block">{post.date}</span>
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors italic">{post.title}</h4>
                        <p className="text-slate-400 text-sm line-clamp-3 mb-4 font-light">{post.excerpt}</p>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Read More →</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-32 px-8 bg-slate-950 text-white text-center relative overflow-hidden border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full" />
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic">{data?.ctaTitle || "Ready to transform your business?"}</h2>
              <p className="text-lg md:text-xl text-slate-400 mb-10 font-light italic max-w-2xl mx-auto">{data?.ctaDesc || "Join hundreds of successful companies working with us today to scale their operations."}</p>
              <a href={data?.ctaButtonLink || '#contact'} className="inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-600/20">
                {data?.ctaButtonText || "Get Started Now"}
              </a>
            </div>
          </section>

        </main>

        <footer id="contact" className="py-20 bg-slate-900/80 backdrop-blur-md border-t border-white/5 px-8 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              {/* Brand Column */}
              <div className="col-span-1 md:col-span-1">
                <div className="relative text-2xl font-black tracking-tighter italic mb-6">
                  {headerType === "Image" ? (
                    (logoUrl && typeof logoUrl === 'string' && logoUrl.trim() !== "") ? (
                      <div className="relative h-8 w-32">
                        <Image src={logoUrl} alt={displayName} fill className="object-contain object-left" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">{displayName[0]}</div>
                    )
                  ) : (
                    <>{displayName}<span className="text-indigo-500">_</span></>
                  )}
                </div>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                  {data?.footerDescription || "Scaling digital legacies through innovative disruption and enterprise-grade technological solutions."}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Solutions</h4>
                <div className="flex flex-col gap-4 text-[10px] items-start font-black uppercase tracking-[0.2em] text-slate-500">
                  {displayServices.slice(0, 4).map((item, idx) => (
                    <span key={idx} className="hover:text-white transition-colors uppercase">{item.name}</span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Base of Operations</h4>
                <div className="flex flex-col gap-4 text-[11px] font-medium text-slate-500">
                  {address && <p className="flex items-center gap-2">📍 {address}</p>}
                  {(contactEmail || email) && <p className="flex items-center gap-2">📧 {contactEmail || email}</p>}
                  {phone && <p className="flex items-center gap-2">📞 {phone}</p>}
                </div>
              </div>

              {/* Newsletter / Social */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">{data?.newsletterTitle || "Digital Channels"}</h4>
                <p className="text-slate-500 text-xs mb-4">{data?.newsletterDesc || "Subscribe for the latest insights."}</p>
                <div className="flex flex-col gap-3 mb-6">
                  <input type="email" placeholder="your@email.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-white" />
                  <button className="bg-indigo-600 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all text-white">Subscribe</button>
                </div>
                <div className="flex gap-4 mt-8">
                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all group">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all group">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all group">
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-slate-600 text-[10px] font-mono tracking-widest uppercase">
                {data?.footerCopyright || `© ${new Date().getFullYear()} / ${displayName} Intelligence`}
              </div>
              <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-slate-700">
                <span>Privacy Protocol</span>
                <span>Security Standards</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
