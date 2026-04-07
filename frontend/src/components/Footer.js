"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200   py-8">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="grid gap-8 md:grid-cols-3 items-start text-center md:text-left">
                        <div className="mx-auto md:mx-0 flex flex-col items-center md:items-start">
                            <Image src="/tekunik.png" alt="MyCompany Logo" width={160} height={1} className="mb-3" />

                            <p className="mt-2 text-sm text-slate-300"> Raylon Arcade, B302, Kondivita, Andheri East, Mumbai, Maharashtra 400059</p>
                        </div>

                        <div>
                            <p className="font-semibold text-white mb-2">Quick links</p>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
                                <li><Link href="/#services" className="hover:text-white">Services</Link></li>
                                <li><Link href="/#about" className="hover:text-white">About</Link></li>
                                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="mx-auto md:mx-0">
                            <p className="font-semibold text-white mb-4 italic tracking-wide">Connect With Us</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                {/* Instagram */}
                                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-purple-500 hover:to-orange-500 hover:border-transparent transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.748.08-2.942.358-3.987 1.403-1.045 1.045-1.323 2.239-1.403 3.987-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.08 1.748.358 2.942 1.403 3.987 1.045 1.045 2.239 1.323 3.987 1.403 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.748-.08 2.942-.358 3.987-1.403 1.045-1.045 1.323-2.239 1.403-3.987.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.08-1.748-.358-2.942-1.403-3.987-1.045-1.045-2.239-1.323-3.987-1.403-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-transparent transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                    </svg>
                                </a>
                                {/* Twitter */}
                                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500 hover:border-transparent transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                {/* LinkedIn */}
                                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-700 hover:border-transparent transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-slate-700 pt-4 text-center text-slate-400 text-xs grid grid-cols-2 ">
                        © {new Date().getFullYear()} Tekunik. All rights reserved.
                        <p>-Developed and designed by tekunik</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
