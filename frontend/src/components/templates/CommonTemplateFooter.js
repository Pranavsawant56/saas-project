"use client";

export default function CommonTemplateFooter({ data, theme = "light" }) {
  const {
    companyName,
    name,
    address,
    contactEmail,
    email,
    phone,
    location,
    footerAbout,
    footerCopyright,
    facebookUrl,
    twitterUrl,
    linkedinUrl,
    githubUrl,
    nameFontSize,
  } = data || {};

  const isDark = theme === "dark";
  const displayName = companyName || name || "Brand";
  const displayEmail = contactEmail || email || "hello@example.com";
  const displayPhone = phone || "+1 234 567 890";
  const displayLocation = address || location || "New York, NY";

  const socialLinks = [
    { 
      name: 'facebook', 
      url: facebookUrl, 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      )
    },
    { 
      name: 'twitter', 
      url: twitterUrl, 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      )
    },
    { 
      name: 'linkedin', 
      url: linkedinUrl, 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
  ].filter(s => s.url);

  return (
    <footer className={`py-20 px-8 mt-auto rounded-t-[3rem] ${
      isDark ? "bg-slate-900 text-white" : "bg-slate-900 text-white" 
    }`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
        <div className="col-span-1">
          <h4 
            className="text-xl font-black mb-6 tracking-tight"
            style={{ fontSize: nameFontSize ? `${nameFontSize}px` : undefined }}
          >
            {displayName}
          </h4>
          <p className="text-slate-400 leading-relaxed text-sm">
            {footerAbout || "Making the world a better place through premium experiences."}
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-8 tracking-wide">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            {['Home', 'About', 'Services', 'Contact'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-indigo-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-8 tracking-wide">Contact Us</h4>
          <div className="space-y-4 text-slate-400 text-sm">
          <div className="space-y-4 text-slate-400 text-sm">
            <p className="flex items-center gap-2">📍 {displayLocation}</p>
            <p className="flex items-center gap-2">📧 {displayEmail}</p>
            <p className="flex items-center gap-2">📞 {displayPhone}</p>
          </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-8 tracking-wide">Social</h4>
          <div className="flex gap-4">
            {socialLinks.map(social => (
              <a 
                key={social.name}
                href={social.url || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-8 text-center text-slate-500 text-sm">
        {footerCopyright || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`}
      </div>
    </footer>
  );
}
