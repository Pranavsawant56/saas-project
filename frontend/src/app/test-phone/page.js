'use client';

import React, { useState } from 'react';
import PhoneInput from '../../components/PhoneInput';
import { motion } from 'framer-motion';

export default function TestPhonePage() {
  const [phoneData, setPhoneData] = useState({
    countryCode: '+91',
    phoneNumber: '',
    fullNumber: '',
    isValid: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneData.isValid) {
      alert(`Submitted: ${phoneData.fullNumber}`);
    } else {
      alert('Please enter a valid mobile number');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800"
      >
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 mx-auto shadow-lg shadow-cyan-500/30">
            📱
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
            Stay Connected
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Enter your mobile number to receive updates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Mobile Number
            </label>
            <PhoneInput 
              onChange={(data) => setPhoneData(data)} 
              initialCountryCode="+91"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!phoneData.isValid}
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl
                ${phoneData.isValid 
                  ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-500/20 active:scale-95 cursor-pointer' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-50'}`}
            >
              Establish Connection
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Country</p>
              <p className="text-sm font-bold dark:text-white">{phoneData.countryCode}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Local</p>
              <p className="text-sm font-bold dark:text-white">{phoneData.phoneNumber || '-'}</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-xl border border-cyan-500/10">
            <p className="text-[8px] font-black uppercase text-cyan-600 mb-1">Unified Output</p>
            <code className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
              {phoneData.fullNumber || 'Empty'}
            </code>
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
        Absolute Precision System
      </p>
    </div>
  );
}
