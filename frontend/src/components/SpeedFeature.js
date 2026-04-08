"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function SpeedFeature() {
  const videoRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  }, []);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowPopup(false);
    }
  };

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-16 lg:gap-24">

          {/* Left Side: Video Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-[2] w-full relative group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Video Container */}
            <div className="relative aspect-video rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden group-hover:shadow-indigo-500/10 transition-all duration-700">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={() => setShowPopup(true)}
              >
                <source src="/videos/tem-vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

              {/* White Blur Gradient from Top */}
              <div className="absolute inset-x-0 top-0 h-30 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none z-10" />

              {/* Completion Popup Overlay */}
              <AnimatePresence>
                {showPopup && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-20 flex items-center justify-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl border border-white/20 text-center max-w-sm w-full"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                        Website Completed!
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                        Your vision has been successfully brought to life in record time.
                      </p>
                      <button
                        onClick={handleReplay}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Replay Overview
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between z-10">
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Live Workflow Preview
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 text-left flex"
          >
            <div className="flex-1 p-8 lg:p-12 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-center shadow-sm relative overflow-hidden">
              {/* Decorative Accent for the thought card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-0.5 w-8 bg-indigo-600 rounded-full" />
                  <span className="text-xs font-black tracking-widest text-indigo-600 uppercase">
                    The New Standard
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
                  Your Vision, Delivered in <span className="text-indigo-600 italic underline decoration-indigo-200 underline-offset-8">5 Minutes.</span>
                </h2>

                <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                  We've obsessionally optimized every second of the development cycle. No more wait times, no more friction. Experience the power of zero-barrier engineering.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    "Optimized Assets & Ready Deployment",
                    "Direct-to-URL Publishing Flow"
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tighter">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
