"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // handle input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Login successful ✅");
                login(data.user);
                router.push("/");
            } else {
                alert(data.message || "Error ❌");
            }
        } catch (error) {
            console.error(error);
            alert("Server error ❌");
        }
    };

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="login-password"
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-300"
                                placeholder="Password"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700">
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477-1 12-1s10 4.477 10 10a9.96 9.96 0 01-1.574 4.93M3 3l18 18" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700">Sign in</button>
                </form>
                <div className="mt-4 text-center text-sm text-slate-500">
                    Don&apos;t have an account? <Link href="/auth/signup" className="text-indigo-600 font-semibold hover:underline">Sign up</Link>
                </div>
            </div>
        </main>
    );
}
