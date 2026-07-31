import type { Metadata } from "next";
import { Nanum_Pen_Script } from "next/font/google";
import { Calculator } from "lucide-react";
import Link from "next/link";
import "./globals.css";

const nanumPen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nanum-pen",
});

export const metadata: Metadata = {
  title: "수학교실 웹앱",
  description: "나만의 교육용 웹앱 만들기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumPen.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-teal-900 text-white font-nanum text-2xl selection:bg-yellow-300 selection:text-teal-900">
        {/* Header (Analog Chalkboard Style) */}
        <header className="border-b-2 border-dashed border-white/30 p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <Calculator className="w-8 h-8 text-yellow-300" />
            <span className="text-4xl text-yellow-300 tracking-wider">수학교실</span>
          </Link>
          <nav>
            <ul className="flex gap-6 text-2xl text-white/80">
              <li>
                <Link href="/grade1" className="hover:text-white hover:underline decoration-wavy cursor-pointer transition-all">1학년</Link>
              </li>
              <li>
                <Link href="/grade2" className="hover:text-white hover:underline decoration-wavy cursor-pointer transition-all">2학년</Link>
              </li>
              <li>
                <Link href="/grade3" className="hover:text-white hover:underline decoration-wavy cursor-pointer transition-all">3학년</Link>
              </li>
              <li>
                <Link href="/signatures" className="hover:text-white hover:underline decoration-wavy cursor-pointer transition-all text-yellow-200">선언문 서명</Link>
              </li>
            </ul>
          </nav>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t-2 border-dashed border-white/30 p-4 text-center text-xl text-white/50">
          &copy; {new Date().getFullYear()} 수학교실. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
