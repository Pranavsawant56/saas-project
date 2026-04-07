"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <header className="w-full bg-white shadow-[0_12px_30px_-18px_rgba(37,99,235,0.6)] border-b border-blue-100">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* LEFT - Logo */}
                <div className="text-xl font-bold">
                    <Link href="/">
                        {/*  <Image src="/tekunik.png" alt="tekunik" width={120} height={40} className="inline-block mr-2" /> */}
                        <Image
                            src="/tekunik.png"
                            alt="MyCompany Logo"
                            width={120}
                            height={40}
                            className="inline-block mr-2"
                            style={{ height: "auto" }}
                        />
                    </Link>
                </div>

                {/* CENTER - Navigation */}
                <nav className="hidden md:flex gap-8 text-gray-700 font-medium">

                    <Link href="/templates" className="relative group">
                        Templates
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link href="/#services" className="relative group">
                        Service
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link href="/#about" className="relative group">
                        About Us
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                </nav>
                {/* RIGHT - Auth Section */}
                <div className="flex items-center gap-4">
                    {!loading && (
                        user ? (
                            <Link href="/profile" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="hidden lg:inline font-medium text-gray-700">{user.name}</span>
                            </Link>
                        ) : (
                            <Link href="/auth/signup">
                                <button className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-violet-600 transition">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    )}
                </div>

            </div>
        </header>
    );
}