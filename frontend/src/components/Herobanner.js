"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Herobanner() {
    const { user, loading } = useAuth();

    return (
        <section className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                <div className="md:grid md:grid-cols-2 md:items-center gap-8">
                    <div>
                        <p className="inline-block bg-white/20 text-sm uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
                            New Launch
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                            Build your next website faster with polished templates
                        </h1>
                        <p className="mt-4 max-w-xl text-indigo-100 text-lg">
                            Start from ready-made layouts and launch in minutes.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="/templates" className="inline-flex items-center justify-center rounded-lg bg-white text-indigo-700 font-semibold px-5 py-3 hover:bg-indigo-100 transition">
                                Explore Templates
                            </a>
                            <a href="#services" className="inline-flex items-center justify-center rounded-lg border border-white/50 text-white px-5 py-3 hover:bg-white/10 transition">
                                View Services
                            </a>
                        </div>

                        {!loading && !user && (
                            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <Link href="/auth/signup" className="block rounded-2xl border border-white/30 bg-white/10 px-4 py-4 shadow-xl hover:bg-white/20 transition">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Sign up quickly</p>
                                            <p className="mt-1 text-white text-lg font-semibold">Create account in one step</p>
                                            <p className="text-indigo-100 text-sm mt-1">Name, email, password — get started now.</p>
                                        </div>
                                        <span className="rounded-full bg-indigo-500 text-white px-3 py-1 text-xs font-semibold">Open</span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="mt-10 md:mt-0">
                        {!loading && user ? (
                            <div className="rounded-2xl bg-white/20 border border-white/30 p-8 backdrop-blur-md shadow-2xl animate-in zoom-in-95 duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
                                        <p className="text-indigo-100">It's great to see you again.</p>
                                    </div>
                                </div>
                                <p className="text-lg text-indigo-50 font-medium mb-6">
                                    Ready to kickstart your next big project? Explore our latest premium templates.
                                </p>
                                <div className="space-y-3">
                                    <Link href="/templates" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition group">
                                        <span className="font-semibold text-white">Continue to Templates</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                    <Link href="/profile" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition group border border-white/10">
                                        <span className="font-semibold text-indigo-100">Go to My Profile</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur shadow-2xl">
                                <h2 className="text-xl font-bold mb-2">Get started in minutes</h2>
                                <p className="text-indigo-100 mb-4">Choose a template, edit your content, and deploy a production-ready landing page quickly.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <div className="rounded-lg bg-white/20 p-3">
                                        <p className="text-slate-100 font-semibold">Team-ready</p>
                                        <p className="text-slate-200">Collaborate with your team and ship design updates.</p>
                                    </div>
                                    <div className="rounded-lg bg-white/20 p-3">
                                        <p className="text-slate-100 font-semibold">Fully responsive</p>
                                        <p className="text-slate-200">Templates that look great on desktop and mobile.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}