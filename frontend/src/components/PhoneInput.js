'use client';

import React, { useState, useEffect, useRef } from 'react';
import { countryCodes } from '../data/countryCodes';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PhoneInput Component
 * A modern, unified phone number input with a country code dropdown.
 * 
 * @param {Function} onChange - Callback function returns { countryCode, phoneNumber, fullNumber }
 * @param {string} initialCountryCode - Default country code (e.g., '+91')
 * @param {string} initialPhoneNumber - Default phone number (e.g., '1234567890')
 */
export default function PhoneInput({ onChange, initialCountryCode = '+91', initialPhoneNumber = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find((c) => c.code === initialCountryCode || initialCountryCode.includes(c.code)) || null
  );
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [isValid, setIsValid] = useState(true);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Update validation and parent when values change
  useEffect(() => {
    const isNumValid = phoneNumber.length === 10;
    setIsValid(phoneNumber.length === 0 || isNumValid);

    if (onChangeRef.current) {
      onChangeRef.current({
        countryCode: selectedCountry?.code || '',
        phoneNumber: phoneNumber,
        fullNumber: selectedCountry ? `${selectedCountry.code}${phoneNumber}` : phoneNumber,
        isValid: isNumValid && selectedCountry !== null
      });
    }
  }, [selectedCountry, phoneNumber]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={`group relative flex items-center bg-white dark:bg-slate-900 border-2 transition-all duration-300 rounded-xl
          ${isOpen ? 'border-cyan-500 ring-4 ring-cyan-500/10' : isValid ? 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' : 'border-red-500 ring-4 ring-red-500/10'}`}
      >
        {/* Country Selector */}
        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-r border-slate-200 dark:border-slate-800 min-w-[110px]"
          >
            {selectedCountry ? (
              <>
                <span className="text-xl leading-none">{selectedCountry.flag}</span>
                <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{selectedCountry.code}</span>
              </>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select</span>
            )}
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100] overflow-hidden"
              >
                {/* Country List */}
                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 py-2">
                  {countryCodes.map((country, index) => (
                    <button
                      key={`${country.code}-${index}`}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors group/item
                        ${selectedCountry?.code === country.code && selectedCountry?.name === country.name ? 'bg-cyan-50/50 dark:bg-cyan-900/10' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl leading-none">{country.flag}</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400">
                          {country.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover/item:text-cyan-500">
                        {country.code}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phone Number Input */}
        <div className="flex-1 relative">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="98765 43210"
            className="w-full px-5 py-4 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 dark:text-white font-medium text-lg tracking-wider placeholder:text-slate-300 dark:placeholder:text-slate-600"
          />

          {/* Validation Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {phoneNumber.length === 10 ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            ) : phoneNumber.length > 0 && (
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                {phoneNumber.length}/10
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <AnimatePresence>
        {!isValid && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs font-bold mt-2 ml-1 uppercase tracking-widest"
          >
            Please enter a valid 10-digit mobile number
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
