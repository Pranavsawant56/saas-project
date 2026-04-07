"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTemplates } from "@/context/TemplateFilterContext";


const TemplateCard = ({ template, index }) => {
  const { deleteTemplate } = useTemplates();
  const isCustom = template.id?.startsWith("custom-");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={template.thumbnail}
          alt={template.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={index < 4}
          loading={index < 4 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-600 shadow-lg">
          {template.category}
        </div>

        {/* Delete Button (Only for Custom Templates) */}
        {isCustom && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (confirm("Are you sure you want to delete this template?")) {
                deleteTemplate(template.id);
              }
            }}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:scale-110 active:scale-95 z-20"
            title="Delete custom template"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col">
        <h2 className="text-base font-black text-slate-900 dark:text-white mb-1.5 leading-tight">
          {template.name}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-[12px] mb-3 leading-relaxed line-clamp-1">
          {template.description}
        </p>

        <Link
          href={`/editor/${template.id}`}
          className="w-full text-center py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-xl text-xs hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-lg group-hover:translate-y-[-2px]"
        >
          Use Template
        </Link>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
