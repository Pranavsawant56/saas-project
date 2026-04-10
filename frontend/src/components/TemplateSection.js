"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TemplateCard from "./templates/TemplateCard";
import { useTemplates } from "@/context/TemplateFilterContext";

const TemplateSection = () => {
  const router = useRouter();
  const { templates, filterType, updateFilter, clearFilter, savedTypes, removeSavedType } = useTemplates();
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (filterType) {
      setSearchTerm(filterType);
    }
  }, [filterType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      updateFilter(searchTerm.trim());
    } else {
      clearFilter();
    }
  };

  const filteredTemplates = filterType === ""
    ? templates
    : templates.filter(t =>
      t.category.toLowerCase().includes(filterType.toLowerCase()) ||
      t.name.toLowerCase().includes(filterType.toLowerCase()) ||
      t.description.toLowerCase().includes(filterType.toLowerCase()) ||
      (t.tags && t.tags.some(tag => tag.toLowerCase().includes(filterType.toLowerCase())))
    );

  // Carousel Animation Settings
  const itemWidth = 324; // 300px card width + 24px (gap-6)
  const visibleCount = 4;
  const totalCount = filteredTemplates.length;
  const overflowCount = Math.max(0, totalCount - visibleCount);
  const scrollDistance = totalCount * itemWidth; // Scroll by exactly one full set of items for a seamless loop

  return (
    <section className="pt-24 pb-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
            >
              Start with a <span className="text-indigo-600">Premium</span> Template
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all py-3"
            >
              View Full Gallery <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Discovery Form */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-800/30 p-8 md:p-12 rounded-[3.5rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-none backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left max-w-md">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                  Find Your Template Type
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Enter the type of templates you are looking for, and we’ll show you the best matches instantly.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-xl group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex flex-col md:flex-row items-stretch gap-4">
                  <div className="relative flex-1">
                    <label className="sr-only">Template Type</label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="e.g. Portfolio, Business, Wedding..."
                      className="w-full px-8 py-5 rounded-2xl md:rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-600 outline-none transition-all font-bold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                      required
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => { setSearchTerm(""); clearFilter(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl md:rounded-3xl font-black transition-all shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] active:scale-95 flex items-center justify-center min-w-[200px]"
                  >
                    Get My Templates
                  </button>
                </div>
              </form>
            </div>

            {/* Saved search history badges */}
            {(savedTypes.length > 0 || filterType) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your saved types:</span>

                {savedTypes.map((type) => (
                  <div key={type} className="flex items-center group/badge">
                    <button
                      onClick={() => updateFilter(type)}
                      className={`px-4 py-1.5 rounded-full text-sm font-black border transition-all ${filterType === type
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:scale-105"
                        }`}
                    >
                      {type}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeSavedType(type); }}
                      className="ml-[-10px] z-10 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity hover:bg-red-600 scale-75"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {filterType && (
                  <button
                    onClick={() => { setSearchTerm(""); clearFilter(); }}
                    className="ml-4 text-sm font-bold text-slate-500 hover:text-red-500 transition-colors uppercase tracking-widest text-[10px]"
                  >
                    Clear Filter
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Interactive Template Carousel */}
      <div
        className="w-full relative px-6 md:px-20 select-none pb-4 group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${scrollDistance}px); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee ${totalCount * 5}s linear infinite;
          }
          .animate-marquee-paused {
            animation-play-state: paused;
          }
        `}</style>
        <div className="max-w-[1600px] mx-auto overflow-visible md:overflow-hidden rounded-[2.5rem]">
          {filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700"
            >
              <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-xl mb-6">
                <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No templates found</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
                We couldn't find any templates matching "{filterType}". Try another type!
              </p>
              <button
                onClick={() => { setSearchTerm(""); clearFilter(); }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <div
              className={`flex gap-6 items-start w-max py-8 px-4 ${totalCount > 4 ? "animate-marquee" : ""} ${isHovered ? "animate-marquee-paused" : ""}`}
            >
              <AnimatePresence mode="popLayout">
                {/* 
                   To make it an infinite loop correctly, we double the items if count > 4 
                   Otherwise we just show them static/sliding.
                */}
                {[...filteredTemplates, ...(totalCount > 4 ? filteredTemplates : [])].map((template, index) => (
                  <div
                    key={`${template.id}-${index}`}
                    className="w-[300px] shrink-0"
                  >
                    <TemplateCard template={template} index={index % totalCount} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Hover Hint Overlay (Mobile Friendly) */}
        {!isHovered && totalCount > 4 && (
          <div className="hidden md:flex absolute top-1/2 right-12 -translate-y-1/2 p-4 bg-indigo-600 text-white rounded-full shadow-2xl animate-bounce pointer-events-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplateSection;
