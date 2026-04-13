"use client";
import Image from "next/image";

export default function CommonTemplateHeader({ data, theme = "light", category }) {
  const {
    companyName,
    name, // for portfolio
    logoUrl,
    headerType,
    nameFontSize,
    companyNameFontSize
  } = data || {};

  const isDark = theme === "dark";
  const displayName = companyName || name || "Brand";
  const templateCategory = category || data?.category;

  let navItems = ['Home', 'About', 'Services', 'Contact'];
  if (templateCategory === "Portfolio") {
    navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
  }

  return (
    <header className={`flex justify-between items-center px-8 py-4 border-b sticky top-0 z-50 backdrop-blur-md ${isDark
      ? "bg-slate-950/80 border-slate-800/50 text-white"
      : "bg-white/80 border-slate-100 text-slate-900"
      }`}>
      <div className="flex items-center gap-3">
        {headerType === "Image" ? (
          logoUrl ? (
            <div className="relative h-8 w-32">
              <Image src={logoUrl} alt="Company Logo" fill className="object-contain object-left" />
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${isDark ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-indigo-600"
              }`}>
              {displayName[0]}
            </div>
          )
        ) : (
          <span className={`text-xl font-black tracking-tight ${isDark ? "" : "text-indigo-950"}`}>
            {displayName}
          </span>
        )}
      </div>
      <nav className="hidden md:flex gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`text-sm font-semibold transition-colors uppercase tracking-widest ${isDark
              ? "text-slate-400 hover:text-indigo-400"
              : "text-slate-600 hover:text-indigo-600"
              }`}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
