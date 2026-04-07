import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AuthProvider } from "@/context/AuthContext";
import { TemplateProvider } from "@/context/TemplateFilterContext";
import ConditionalLayout from "@/components/ConditionalLayout";
import Loader from "@/components/Loader";


export const metadata = {
  title: "Tekunik",
  description: "Tekunik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <TemplateProvider>
            <Loader />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </TemplateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
