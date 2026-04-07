"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10 text-center">
          <p className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-xs">Contact Us</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">We’d love to hear from you</h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Share your project details, ask questions, or tell us how we can support your next launch.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <div className="space-y-5 border border-indigo-100 rounded-xl p-4 md:p-6 bg-slate-50">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-bold">Our Office</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">Address</h2>
              <p className="mt-2 text-slate-600">123 Tekunik Street, Mumbai, India 560001</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Email</p>
              <p className="mt-1 text-slate-700 font-medium">hello@tekunik.com</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Phone</p>
              <p className="mt-1 text-slate-700 font-medium">+91 xxxxx xxxxx</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Business Hours</p>
              <p className="mt-1 text-slate-700">Mon - Sat, 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 md:p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">First name</label>
                  <input type="text" placeholder="First name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Last name</label>
                  <input type="text" placeholder="Last name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Email</label>
                <input type="email" placeholder="you@example.com" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Message</label>
                <textarea rows="4" placeholder="Tell us about your project..." className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"></textarea>
              </div>
              <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-2.5 hover:from-indigo-700 hover:to-violet-700 transition">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
