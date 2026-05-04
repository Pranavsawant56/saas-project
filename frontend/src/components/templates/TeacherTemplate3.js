import TemplateLayout from "./TemplateLayout";
import Image from "next/image";

export default function TeacherTemplate3({ data }) {
  const {
    name,
    tagline,
    heroTitle,
    heroImage,
    services,
    aboutUsTitle,
    bio,
    aboutImage,
    contactEmail,
    phone,
    address,
    footerCopyright,
    headerType,
    logoUrl,
    nameFontSize,
    taglineFontSize,
    heroTitleFontSize,
    aboutUsTitleFontSize,
    bioFontSize,
    countryCode,
  } = data || {};

  const displayEmail = contactEmail || "book@davidtutors.com";
  const displayPhone = phone ? `${countryCode ? countryCode.split(' ')[0] : ''} ${phone}` : "123-456-7890";
  const displayAddress = address || "Online via Zoom";
  const displayName = name || "David Mathers";

  const displayServices = services && services.length > 0 ? services : [
    { name: 'Calculus I & II', desc: 'Limits, derivatives, and integrals made easy.' },
    { name: 'SAT/ACT Math Prep', desc: 'Strategies and practice for standardized testing.' },
    { name: 'Algebra & Geometry', desc: 'Building a strong foundation for advanced math.' }
  ];

  return (
    <TemplateLayout data={data} theme="light" category="Teacher" hideHeader={true} hideFooter={true}>
      <div className="scroll-smooth bg-white text-gray-800 flex flex-col min-h-screen font-sans">

        {/* Header */}
        <header className="bg-[#111827] text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {headerType === "Image" && logoUrl ? (
                <div className="relative h-10 w-32">
                  <Image src={logoUrl} alt={displayName} fill className="object-contain object-left brightness-0 invert" />
                </div>
              ) : (
                <h1
                  className="font-bold tracking-tight"
                  style={{ fontSize: nameFontSize ? `${nameFontSize}px` : '22px' }}
                >
                  {displayName}
                </h1>
              )}
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Why Me</a>
              <a href="#subjects" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Subjects</a>
              <a href="#contact" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors">
                Book a Session
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-indigo-50 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                {tagline && (
                  <p
                    className="text-indigo-600 font-semibold tracking-wide uppercase mb-4"
                    style={{ fontSize: taglineFontSize ? `${taglineFontSize}px` : '14px' }}
                  >
                    {tagline}
                  </p>
                )}
                <h2
                  className="font-extrabold text-gray-900 tracking-tight mb-6"
                  style={{ fontSize: heroTitleFontSize ? `${heroTitleFontSize}px` : '48px', lineHeight: '1.2' }}
                >
                  {heroTitle || "Master Math with Confidence."}
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Personalized 1-on-1 tutoring that demystifies complex subjects and builds long-lasting problem-solving skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-base font-medium shadow-sm transition-colors">
                    Start Learning Today
                  </a>
                  <a href="#subjects" className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-3 rounded-md text-base font-medium transition-colors">
                    View Subjects
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={heroImage || "/images/templates/template-img-3.jpg"}
                    alt="Tutoring Session"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
          <section id="subjects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Tutoring Subjects</h2>
                <p className="text-lg text-gray-500">Targeted support for the classes that matter most.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayServices.map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                      {service.image ? (
                        <Image src={service.image} alt={service.name} fill className="object-cover" />
                      ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      )}
                    </div>
                    <h4
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontSize: service.nameFontSize ? `${service.nameFontSize}px` : undefined }}
                    >
                      {service.name}
                    </h4>
                    <p
                      className="text-gray-600 text-sm"
                      style={{ fontSize: service.descFontSize ? `${service.descFontSize}px` : undefined }}
                    >
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              {aboutImage && (
                <div className="w-48 h-48 flex-shrink-0 relative rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <Image src={aboutImage} alt="Profile" fill className="object-cover" />
                </div>
              )}
              <div>
                <h2
                  className="text-3xl font-extrabold text-gray-900 mb-4"
                  style={{ fontSize: aboutUsTitleFontSize ? `${aboutUsTitleFontSize}px` : undefined }}
                >
                  {aboutUsTitle || "Why Choose Me?"}
                </h2>
                <div
                  className="prose prose-indigo text-gray-600"
                  style={{ fontSize: bioFontSize ? `${bioFontSize}px` : undefined }}
                >
                  <p>{bio || "With a background in Engineering, I break down complex concepts into simple, actionable steps. I focus not just on getting the right answer, but on understanding the underlying principles so you can tackle any problem with confidence."}</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA / Contact Section */}
          <section id="contact" className="bg-indigo-600 py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold mb-4">Ready to improve your grades?</h2>
              <p className="text-indigo-100 mb-8 text-lg">Contact me to schedule your first session or ask any questions.</p>

              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20">
                <div className="flex flex-col md:flex-row justify-center gap-8 text-lg font-medium">
                  <a href={`mailto:${displayEmail}`} className="flex items-center justify-center gap-2 hover:text-indigo-200 transition-colors">
                    ✉️ {displayEmail}
                  </a>
                  <span className="flex items-center justify-center gap-2">
                    📞 {displayPhone}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-indigo-100">
                  📍 {displayAddress}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm px-4">
          <p>{footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}</p>
        </footer>
      </div>
    </TemplateLayout>
  );
}
