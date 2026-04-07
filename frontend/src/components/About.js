"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    title: "Instant Launch",
    label: "Speed",
    description: "Go from idea to live URL in under 24 hours with our optimized deployment workflows.",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Designer Grade",
    label: "Quality",
    description: "Every pixel is crafted with precision, ensuring a high-end feel that matches your brand's ambition.",
    icon: (
      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Future Proof",
    label: "Tech",
    description: "Built with the latest Next.js and React standards, keeping your site fast and secure for years to come.",
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

const values = [
  {
    title: "Our Mission",
    tag: "We Ship",
    color: "indigo",
    description: "Building the digital infrastructure of tomorrow, one pixel at a time. We don't just ship code; we craft the future of human interaction.",
    size: "sm",
    image: "/mission-bg.png"
  },
  {
    title: "Our Vision",
    tag: "We Lead",
    color: "purple",
    description: "Redefining the standard for modern web experiences with design that inspires.",
    size: "sm",
    image: "/vision-bg.png"
  },
  {
    title: "Our Values",
    tag: "We Care",
    color: "blue",
    description: "Transparency, speed, and design-centric thinking guide everything we build.",
    size: "sm",
    image: "/values-bg.png"
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-10 lg:py-16 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-[10%] w-[40%] h-[40%] bg-indigo-50/70 dark:bg-indigo-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -left-[5%] w-[30%] h-[30%] bg-blue-50/70 dark:bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20">
          {/* Narrative Hero Side */}
          <div className="flex-[1.2] text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="h-0.5 w-12 bg-indigo-600 rounded-full" />
                <span className="text-sm font-black tracking-[0.3em] text-indigo-600 uppercase">
                  Our Story
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tight leading-[1.05]">
                Ship better. <br />
                Launch <span className="text-indigo-600 italic">faster.</span>
              </h2>

              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl font-medium">
                We believe that premium design shouldn't be slow. We provide polished templates and expert-driven components to help your team go live in hours, not months.
              </p>

              {/* Signature Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-8 pt-8">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex flex-col"
                  >
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center mb-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                      {benefit.icon}
                    </div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">{benefit.title}</h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Visual Excellence Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full max-w-2xl relative"
          >
            {/* Smooth Floating Visual Container */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative group p-4"
            >
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative aspect-[4/5] rounded-[3.5rem] bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_48px_80px_-20px_rgba(79,70,229,0.2)]">
                <Image
                  src="/about-workspace.png"
                  alt="Modern Tech Workspace"
                  fill
                  className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                />

                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900/10" />

                {/* High Density Floating Tag */}
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-black text-lg">Elite Quality</p>
                      <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">Verified Professional</p>
                    </div>
                  </div>
                </div>
              </div>



            </motion.div>
          </motion.div>
        </div>

        {/* Bento Grid Styling for Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {values.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
              style={{ borderRadius: '2.5rem' }}
              className={`group p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden relative isolate transform-gpu backface-hidden ${item.size === "lg" ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
                }`}
            >
              {/* Conditional Background Image for Featured Card */}
              {item.image && (
                <>
                  <div className="absolute inset-0 z-0" style={{ borderRadius: '2.5rem', overflow: 'hidden' }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/40 to-indigo-950/20 z-10" />
                  </div>
                </>
              )}

              <div className="relative z-20">
                <span className={`inline-block px-3 py-1 mb-6 text-[10px] font-black uppercase tracking-widest rounded-full border transition-all ${item.image
                  ? "border-white/30 text-white bg-white/10 backdrop-blur-md"
                  : `border-${item.color}-200 text-${item.color}-600 bg-${item.color}-50/50`
                  }`}>
                  {item.tag}
                </span>
                <h3 className={`text-2xl font-black mb-4 transition-colors ${item.image ? "text-white" : "text-slate-900 dark:text-white group-hover:text-indigo-600"
                  }`}>
                  {item.title}
                </h3>
              </div>
              <p className={`text-base font-medium leading-relaxed relative z-20 transition-colors ${item.image ? "text-slate-100" : "text-slate-500 dark:text-slate-400"
                }`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
