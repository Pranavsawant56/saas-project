"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EditorPanel = ({
  router,
  undo,
  redo,
  historyIndex,
  history,
  activeMode,
  templates,
  currentPreviewId,
  modeFields,
  openSection,
  setOpenSection,
  formData,
  setFormData,
  expandedItems,
  toggleExpand,
  addListItem,
  removeListItem,
  handleListChange,
  handleListImageUpload,
  handleChange,
  handleImageUpload,
  handleSave,
  isSaving,
  message,
  pushToHistory,
  validationErrors
}) => {
  return (
    <div className="w-full lg:w-[420px] h-full flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 overflow-hidden">
      {/* Editor Sidebar Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/templates")}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2"
          >
            ← Gallery
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-all"
              title="Undo"
            >
              ↩️
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-all"
              title="Redo"
            >
              ↪️
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
          Canvas Editor
        </h1>
        <p className="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-widest">
          {activeMode} • {templates.find(t => t.id === currentPreviewId)?.name}
        </p>
      </div>

      {/* Scrollable Fields with Accordions */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {Object.entries(
          modeFields[activeMode].reduce((acc, field) => {
            const section = field.section || "General";
            if (!acc[section]) acc[section] = [];
            acc[section].push(field);
            return acc;
          }, {})
        ).map(([sectionName, sectionFields], sIdx) => {
          const isOpen = openSection === sectionName;

          return (
            <div
              key={sectionName}
              className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${isOpen
                ? "border-indigo-500/30 bg-indigo-50/5 dark:bg-indigo-900/5 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/5"
                : "border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => setOpenSection(isOpen ? null : sectionName)}
                className="w-full p-5 flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-all duration-500 ${isOpen ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 rotate-0" : "bg-slate-100 dark:bg-slate-800 text-slate-400 rotate-[-10deg]"}`}>
                    {sIdx + 1}
                  </div>
                  <span className={`text-[13px] font-black uppercase tracking-widest transition-colors ${isOpen ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`}>
                    {sectionName}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-slate-400 text-xs"
                >
                  ▼
                </motion.span>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="p-6 pt-0 space-y-8">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mb-8" />

                      {sectionFields.map((field) => {
                        if (field.type === "list") {
                          const listData = formData[field.id] || [];
                          return (
                            <div key={field.id} className="space-y-6">
                              <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500/60">{field.label}</label>
                                <button
                                  onClick={() => {
                                    addListItem(field.id, field.itemSchema);
                                    pushToHistory(formData);
                                  }}
                                  className="bg-slate-900 dark:bg-indigo-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-lg active:scale-95"
                                >
                                  + Add Item
                                </button>
                              </div>

                              <div className="space-y-4">
                                {listData.map((item, idx) => {
                                  const isExpanded = expandedItems[field.id]?.[idx];
                                  return (
                                    <div key={idx} className={`relative bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all ${isExpanded ? 'p-6 ring-2 ring-indigo-500/20 shadow-xl' : 'p-4 hover:border-indigo-500/30 cursor-pointer'}`} onClick={() => !isExpanded && toggleExpand(field.id, idx)}>
                                      {!isExpanded ? (
                                        <div className="flex items-center justify-between gap-4">
                                          <div className="flex items-center gap-4 truncate">
                                            <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm">{idx + 1}</div>
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                                              {item.title || item.name || item.company || `Entry ${idx + 1}`}
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <button onClick={() => removeListItem(field.id, idx)} className="w-8 h-8 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all text-xs">✕</button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div onClick={(e) => e.stopPropagation()} className="space-y-6">
                                          <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Editing Entry {idx + 1}</span>
                                            <button onClick={() => toggleExpand(field.id, idx)} className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Done</button>
                                          </div>
                                          <div className="space-y-6">
                                            {field.itemSchema.map(sField => {
                                              const value = item[sField.id] || "";
                                              let currentLength = 0;
                                              let limitExceeded = false;
                                              let countDisplay = null;

                                              if (sField.maxLength) {
                                                currentLength = value.length;
                                                countDisplay = `${currentLength}/${sField.maxLength}`;
                                                limitExceeded = currentLength >= sField.maxLength;
                                              }

                                              if (sField.maxTags) {
                                                const tags = typeof value === 'string' ? value.split(',').filter(t => t.trim() !== '') : [];
                                                currentLength = tags.length;
                                                limitExceeded = currentLength >= sField.maxTags;
                                                countDisplay = `${currentLength} / ${sField.maxTags} Skills Added`;
                                              }

                                              return (
                                                <div key={sField.id} className="space-y-2 relative group/sfield">
                                                  <div className="flex justify-between items-center">
                                                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{sField.label}</label>
                                                    {countDisplay && (
                                                      <span className={`text-[9px] font-bold transition-colors ${currentLength > (sField.maxLength || sField.maxTags) ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>
                                                        {countDisplay}
                                                      </span>
                                                    )}
                                                  </div>
                                                  {/* List Item Specific Fields */}
                                                  {sField.type === "textarea" ? (
                                                    <textarea
                                                      value={value}
                                                      maxLength={sField.maxLength}
                                                      onChange={(e) => handleListChange(field.id, idx, sField.id, e.target.value)}
                                                      className="w-full p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 transition-all"
                                                      rows={3}
                                                    />
                                                  ) : sField.type === "image" ? (
                                                    <div className="space-y-4">
                                                      {item[sField.id] && (
                                                        <div className="relative h-24 w-full rounded-xl overflow-hidden shadow-md">
                                                          <Image src={item[sField.id]} alt="Item Image" fill className="object-cover" />
                                                          <button onClick={() => handleListChange(field.id, idx, sField.id, "")} className="absolute top-2 right-2 p-1 bg-rose-500 text-white rounded-full text-[10px]">✕</button>
                                                        </div>
                                                      )}
                                                      <label className="block w-full p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-center cursor-pointer hover:border-indigo-500 transition-colors">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Image</span>
                                                        <input type="file" className="hidden" onChange={(e) => handleListImageUpload(e, field.id, idx, sField.id)} />
                                                      </label>
                                                    </div>
                                                  ) : sField.type === "boolean" ? (
                                                    <button
                                                      onClick={() => handleListChange(field.id, idx, sField.id, !item[sField.id])}
                                                      className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${item[sField.id] ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"}`}
                                                    >
                                                      <span className={`text-[10px] font-black uppercase tracking-widest ${item[sField.id] ? "text-indigo-600" : "text-slate-400"}`}>
                                                        {item[sField.id] ? "Active" : "Disabled"}
                                                      </span>
                                                      <div className={`w-8 h-4 rounded-full p-1 transition-all ${item[sField.id] ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"}`}>
                                                        <div className={`w-2 h-2 bg-white rounded-full transition-all ${item[sField.id] ? "translate-x-4" : "translate-x-0"}`} />
                                                      </div>
                                                    </button>
                                                  ) : (
                                                    <input
                                                      type={sField.type}
                                                      value={value}
                                                      maxLength={sField.maxLength}
                                                      onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (sField.maxTags) {
                                                          const numTags = val.split(',').length;
                                                          if (numTags > sField.maxTags) return; // Prevent typing if exceeding tags
                                                        }
                                                        handleListChange(field.id, idx, sField.id, val);
                                                      }}
                                                      className={`w-full p-3 bg-white dark:bg-slate-900 rounded-xl border ${currentLength > (sField.maxLength || sField.maxTags) ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-100 dark:border-slate-800 focus:ring-indigo-500'} text-xs focus:ring-2 transition-all`}
                                                    />
                                                  )}
                                                  {currentLength > (sField.maxLength || sField.maxTags) && (
                                                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-bold text-rose-500 mt-1">
                                                      Limit exceeded.
                                                    </motion.p>
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        // Render Individual Field
                        return (
                          <div key={field.id} className="space-y-2 group/field">
                            <div className="flex justify-between items-center px-1">
                              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 group-focus-within/field:text-indigo-600 transition-colors">
                                {field.label}
                              </label>
                              {field.maxLength && (
                                <span className="text-[9px] font-bold text-slate-300">
                                  {formData[field.id]?.length || 0}/{field.maxLength}
                                </span>
                              )}
                            </div>

                            {field.type === "boolean" ? (
                              <button
                                onClick={() => {
                                  handleChange({ target: { name: field.id, value: !formData[field.id] } });
                                  pushToHistory(formData);
                                }}
                                className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${formData[field.id]
                                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 ring-1 ring-indigo-500/20"
                                  : "border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300"
                                  }`}
                              >
                                <span className={`text-[10px] font-black uppercase tracking-widest ${formData[field.id] ? "text-indigo-600" : "text-slate-400"}`}>
                                  {formData[field.id] ? "Enabled" : "Disabled"}
                                </span>
                                <div className={`w-10 h-5 rounded-full p-1 transition-all flex items-center ${formData[field.id] ? "bg-indigo-600 justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"}`}>
                                  <motion.div layout className="w-3 h-3 bg-white rounded-full shadow-sm" />
                                </div>
                              </button>
                            ) : field.type === "color" ? (
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl border-2 border-white dark:border-slate-800 shadow-lg overflow-hidden group/color">
                                  <input
                                    type="color"
                                    name={field.id}
                                    value={formData[field.id] || "#4f46e5"}
                                    onChange={(e) => { handleChange(e); pushToHistory(formData); }}
                                    className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={formData[field.id] || "#4f46e5"}
                                  onChange={(e) => handleChange(e)}
                                  name={field.id}
                                  className="flex-1 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-mono font-bold text-slate-600"
                                />
                              </div>
                            ) : field.type === "range" ? (
                              <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-black text-indigo-500 uppercase">{formData[field.id] || field.min}{field.id.includes('FontSize') ? 'px' : ''}</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Range</span>
                                </div>
                                <input
                                  type="range"
                                  name={field.id}
                                  min={field.min}
                                  max={field.max}
                                  step={field.step || 1}
                                  value={formData[field.id] || field.min}
                                  onChange={(e) => { handleChange(e); pushToHistory(formData); }}
                                  className="w-full accent-indigo-600 cursor-pointer"
                                />
                              </div>
                            ) : field.type === "textarea" ? (
                              <textarea
                                name={field.id}
                                value={formData[field.id] || ""}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all text-sm min-h-[120px]"
                              />
                            ) : field.type === "image" ? (
                              <div className="space-y-3">
                                {formData[field.id] && (
                                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group/img">
                                    <Image src={formData[field.id]} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                      <button onClick={() => setFormData(p => ({ ...p, [field.id]: "" }))} className="bg-rose-500 text-white p-2 rounded-full text-xs font-bold">Remove</button>
                                    </div>
                                  </div>
                                )}
                                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500 transition-all cursor-pointer bg-slate-50 dark:bg-slate-900 group/upload">
                                  <span className="text-2xl mb-2 group-hover/upload:scale-110 transition-transform">🖼️</span>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upload Media</span>
                                  <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, field.id)} />
                                </label>
                              </div>
                            ) : field.type === "select" ? (
                              <select
                                name={field.id}
                                value={formData[field.id] || ""}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 appearance-none text-[13px] font-bold text-slate-700 dark:text-slate-300"
                              >
                                {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                name={field.id}
                                value={formData[field.id] || ""}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-semibold"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Floating Save/Publish Bar */}
      <div className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 space-y-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30 disabled:bg-indigo-400 active:scale-95 text-xs uppercase tracking-widest"
        >
          {isSaving ? "Syncing..." : "Save Progress"}
        </button>

        <div className="flex items-center justify-between px-2">
          <span className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Auto-saved
          </span>
          {message && <span className="text-[9px] font-bold text-slate-500 truncate max-w-[200px]">{message}</span>}
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
