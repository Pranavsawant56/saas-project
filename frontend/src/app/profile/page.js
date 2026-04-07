"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { templates as templateDefs } from "@/data/templates";

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [savedTemplates, setSavedTemplates] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    const fetchTemplates = async () => {
        if (!user) return;
        try {
            const res = await fetch("http://localhost:8000/api/templates/my-templates", {
                credentials: "include",
                cache: "no-store",
            });
            if (res.ok) {
                const data = await res.json();
                setSavedTemplates(data);
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, [user]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this template?")) return;

        try {
            const res = await fetch(`http://localhost:8000/api/templates/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (res.ok) {
                setSavedTemplates(prev => prev.filter(t => t._id !== id));
            } else {
                alert("Failed to delete template");
            }
        } catch (error) {
            alert("Error deleting template");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* User Info Header */}
                <div className="bg-white dark:bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 h-40 relative">
                        <div className="absolute -bottom-16 left-8 sm:left-12">
                            <div className="w-32 h-32 rounded-full border-8 border-white dark:border-slate-900 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
                                <span className="text-4xl font-black text-indigo-600 uppercase">
                                    {user.name.charAt(0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-10 px-8 sm:px-12">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                    {user.name}
                                </h1>
                                <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">
                                    {user.email}
                                </p>
                            </div>
                            <div className="flex gap-4 w-full sm:w-auto">
                                <button
                                    onClick={logout}
                                    className="px-8 py-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-black rounded-2xl hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all border border-rose-100 dark:border-rose-900/30 flex-1 sm:flex-none text-center"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Templates Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                            My Saved Templates
                        </h2>
                        <Link
                            href="/templates"
                            className="text-indigo-600 dark:text-indigo-400 font-black text-sm hover:underline"
                        >
                            + Create New
                        </Link>
                    </div>

                    {fetchLoading ? (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600 mx-auto" />
                        </div>
                    ) : savedTemplates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {savedTemplates.map((saved) => {
                                const def = templateDefs.find(t => t.id === saved.templateId);
                                return (
                                    <div key={saved._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                        <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            {def?.thumbnail && (
                                                <img src={def.thumbnail} alt={def.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            )}
                                            <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                                                {def?.category || "Template"}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                                                {def?.name || `Saved Template (${saved.templateId})`}
                                            </h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-6 tracking-widest">
                                                Last updated: {new Date(saved.updatedAt).toLocaleDateString()}
                                            </p>
                                            <div className="flex gap-3">
                                                <Link
                                                    href={`/editor/${saved.templateId}`}
                                                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-center font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-sm"
                                                >
                                                    Edit Data
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(saved._id)}
                                                    className="px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-rose-500 transition-all border border-slate-100 dark:border-slate-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-400 font-bold mb-6 italic">No templates saved yet.</p>
                            <Link href="/templates" className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition shadow-lg">
                                Browse Templates
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
