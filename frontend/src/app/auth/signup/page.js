"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        // validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            console.log("Response:", data);

            if (res.ok) {
                alert("Signup successful ✅");
                login(data.user);
                router.push("/");

                // reset form
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                alert(data.message || "Error ❌");
            }
        } catch (error) {
            console.log(error);
            alert("Server error ❌");
        }
    };
    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                <div className="text-center mb-4">
                    <h1 className="mt-2 text-2xl font-bold text-slate-900">Create your account</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <input type="text" id="signup-name" name="name" placeholder="Full Name" value={formData.name || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" id="signup-email" name="email" placeholder="you@example.com" value={formData.email || ""} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <div className="relative mt-1">
                            <input type={showPassword ? "text" : "password"} id="signup-password" name="password" placeholder="Password" value={formData.password || ""} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-300" />
                            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700">
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10a9.96 9.96 0 01-1.574 4.93M3 3l18 18" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.88 9.88a3 3 0 104.24 4.24" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
                        <div className="relative mt-1">
                            <input type={showConfirmPassword ? "text" : "password"} id="signup-confirm-password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword || ""} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-300" />
                            <button type="button" onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            } className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700">
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10a9.96 9.96 0 01-1.574 4.93M3 3l18 18" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.88 9.88a3 3 0 104.24 4.24" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 transition">
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-500">Already have an account? <Link href="/auth/login" className="text-indigo-600 hover:underline">Login</Link></p>
            </div>
        </main>
    );
}
