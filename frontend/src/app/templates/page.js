"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TemplateCard from "@/components/templates/TemplateCard";
import { useTemplates } from "@/context/TemplateFilterContext";

function TemplatesContent() {
  const searchParams = useSearchParams();
  const { templates, filterType, updateFilter, clearFilter, savedTypes, removeSavedType } = useTemplates();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      updateFilter(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (filterType) {
      setSearchTerm(filterType);
    }
  }, [filterType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilter(searchTerm);
  };

  const filteredTemplates = filterType === ""
    ? templates
    : templates.filter(t =>
      t.category.toLowerCase().includes(filterType.toLowerCase()) ||
      t.name.toLowerCase().includes(filterType.toLowerCase()) ||
      t.description.toLowerCase().includes(filterType.toLowerCase()) ||
      (t.tags && t.tags.some(tag => tag.toLowerCase().includes(filterType.toLowerCase())))
    );

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Choose Your <span className="text-indigo-600">Template</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Select a professional design to start building your personal or business page.
            All templates are conversion-optimized and fully responsive.
          </motion.p>
        </div>

        {/* Discovery Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <form
            onSubmit={handleSubmit}
            className="relative group mb-8"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-stretch gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter the template type (e.g. Portfolio, Business, Wedding...)"
                  className="w-full px-8 py-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-600 outline-none transition-all font-bold text-slate-800 dark:text-white shadow-inner"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center min-w-[160px]"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Saved search history badges */}
          {(savedTypes.length > 0 || filterType) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Quick Access:</span>

              {savedTypes.map((type) => (
                <div key={type} className="flex items-center group/badge">
                  <button
                    onClick={() => updateFilter(type)}
                    className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all ${filterType === type
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
                  className="ml-4 text-[10px] font-bold text-slate-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                  Clear all
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {filteredTemplates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-100/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-300 dark:border-slate-800"
            >
              <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl mb-6">
                <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No templates found</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
                We couldn't find any templates matching this type. Try another template type!
              </p>
              <button
                onClick={() => { setSearchTerm(""); clearFilter(); }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            filteredTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <TemplatesContent />
    </Suspense>
  );
}
