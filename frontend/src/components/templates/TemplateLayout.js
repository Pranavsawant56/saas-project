"use client";

import CommonTemplateHeader from "./CommonTemplateHeader";
import CommonTemplateFooter from "./CommonTemplateFooter";

export default function TemplateLayout({ data, theme = "light", category, children, hideHeader = false, hideFooter = false }) {
  const isDark = theme === "dark";

  return (
    <div className={`min-h-full flex flex-col font-sans ${
      isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
    }`}>
      {!hideHeader && <CommonTemplateHeader data={data} theme={theme} category={category} />}
      
      <main className="flex-1">
        {children}
      </main>

      {!hideFooter && <CommonTemplateFooter data={data} theme={theme} />}
    </div>
  );
}
