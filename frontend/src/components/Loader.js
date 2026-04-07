"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Loader() {
  const { loading } = useAuth();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const isVisible = loading || !minTimeElapsed;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950"
        >
          <div className="relative">
            {/* Soft decorative glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-10 bg-indigo-500/20 blur-3xl rounded-full"
            />
            
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-600/30">
                  T
                </div>
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                  Tekunik<span className="text-indigo-600">.</span>
                </span>
              </motion.div>

              <div className="w-48 h-[2px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-indigo-600 to-transparent"
                />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-[10px] uppercase tracking-[0.4em] font-black text-slate-400"
              >
                Refining Experience
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
