import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function DoctorTemplate({ data }) {
  const {
    clinicName,
    heroTitle,
    specialty,
    heroImage,
    bio,
    aboutUsTitle,
    aboutImage,
    education,
    experience,
    contactEmail,
    phone,
    countryCode,
    address,
    workingHours,
    headerType,
    logoUrl,
    clinicNameFontSize,
    heroTitleFontSize,
    specialtyFontSize,
    services,
  } = data || {};

  const displayEmail = contactEmail || "appointments@clinic.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : (phone || "+1 800 MED HELP");
  const displayLocation = address || "123 Medical Center, NY";
  const displayName = clinicName || "SafeCare Medical";

  const displayServices = services || [
    { name: 'General Checkup', desc: 'Comprehensive health evaluation.' },
    { name: 'Cardiology', desc: 'Heart health monitoring and care.' },
    { name: 'Pediatrics', desc: 'Specialized care for children.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Doctor" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-white text-slate-800 flex flex-col min-h-screen font-sans">

        {/* Medical Header */}
        <header className="w-full">
          <div className="bg-blue-600 text-white py-3 px-8 flex justify-between items-center text-xs font-semibold">
            <div className="flex gap-6">
              <span className="flex items-center gap-2">📞 {displayPhone}</span>
              <span className="flex items-center gap-2">📧 {displayEmail}</span>
            </div>
            <div className="hidden md:block">
              🕒 {workingHours || "Mon - Sat: 8:00 AM - 8:00 PM"}
            </div>
          </div>

          <div className="bg-white py-5 px-8 flex justify-between items-center border-b border-slate-100 shadow-sm sticky top-0 z-50">
            <div className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              {headerType === "Image" ? (
                logoUrl ? (
                  <div className="relative h-10 w-40">
                    <Image src={logoUrl} alt={displayName} fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">🏥</div>
                )
              ) : (
                <span style={{ fontSize: clinicNameFontSize ? `${clinicNameFontSize}px` : undefined }}>{displayName}</span>
              )}
            </div>
            <nav className="hidden lg:flex gap-10 items-center font-bold text-sm text-slate-600">
              <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#specialties" className="hover:text-blue-600 transition-colors">Specialties</a>
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200">
                Book Appointment
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section id="home" className="relative h-[650px] flex items-center bg-blue-50 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <div className="absolute inset-0 bg-blue-600/10 z-10" />
              <Image
                src={heroImage || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"}
                alt="Doctor Hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent z-20" />
            </div>

            <div className="container mx-auto px-8 relative z-30">
              <div className="max-w-2xl">
                <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-6 block" style={{ fontSize: specialtyFontSize ? `${specialtyFontSize}px` : undefined }}>
                  {specialty || "Expert Medical Care"}
                </span>
                <h1
                  className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : undefined }}
                >
                  {heroTitle || "Top Quality Healthcare For You"}
                </h1>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                  Providing cutting-edge medical treatments with a compassionate approach. Your health and wellbeing are our only concern.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition-all shadow-xl">
                    View Services
                  </button>
                  <button className="bg-white text-blue-900 border-2 border-blue-900 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all">
                    Emergency Call
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Specialty Grid */}
          <section id="specialties" className="py-24 bg-white">
            <div className="container mx-auto px-8">
              <div className="text-center mb-16">
                <h2 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">Our Expertise</h2>
                <h3 className="text-4xl font-black text-slate-900">Medical Specialties</h3>
                <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="group p-10 bg-slate-50 rounded-3xl hover:bg-blue-600 transition-all duration-500 border border-slate-100 hover:border-blue-600 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-white group-hover:scale-110 transition-all">
                      {service.image ? (
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <Image src={service.image} alt={service.name} fill className="object-cover" />
                        </div>
                      ) : (
                        "🩺"
                      )}
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors">{service.name}</h4>
                    <p className="text-slate-600 leading-relaxed group-hover:text-blue-50 transition-colors">
                      {service.desc || `Expert care and consultation for all your ${service.name.toLowerCase()} needs.`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Doctor */}
          <section id="about" className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-[12px] border-white z-10">
                  <Image
                    src={aboutImage || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800"}
                    alt="Doctor Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl z-20 hidden md:block">
                  <p className="text-4xl font-black text-blue-600 mb-1">{experience || "15"}+</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Years Experience</p>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mb-6">{aboutUsTitle || "About The Doctor"}</h2>
                <h3 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Committed to Medical Excellence</h3>
                <div className="prose prose-slate prose-lg mb-10">
                  <p className="text-slate-600 leading-relaxed">
                    {bio || "Welcome to our clinic. We are dedicated to providing the highest quality medical care to our patients. Our team of experienced professionals is committed to ensuring your health and wellbeing through personalized treatment plans and advanced medical technology."}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0 text-xl">🎓</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Education & Certifications</p>
                      <p className="text-slate-500 text-sm italic">{education || "MD from International University of Health Science"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="bg-slate-900 text-white py-20 px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
              <div>
                <h4 className="text-2xl font-bold mb-8 text-white">{displayName}</h4>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Providing professional medical services and expert consultation since 2010.
                </p>
                <p className="flex items-center gap-3 text-slate-300">
                  📍 {displayLocation}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest text-xs">Quick Links</h4>
                <ul className="space-y-4 text-slate-400 font-medium">
                  <li><a href="#home" className="hover:text-blue-400">Home</a></li>
                  <li><a href="#specialties" className="hover:text-blue-400">Specialties</a></li>
                  <li><a href="#about" className="hover:text-blue-400">About</a></li>
                  <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest text-xs">Contact Us</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-xl">📞</span>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Call Us</p>
                      <p className="text-sm font-bold">{displayPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-xl">📧</span>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Email Us</p>
                      <p className="text-sm font-bold">{displayEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-12 border-t border-white/10 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">
              {data.footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All Rights Reserved.`}
            </div>
          </div>
        </footer>
      </div>
    </TemplateLayout>
  );
}
