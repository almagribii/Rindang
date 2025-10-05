// src/app/page.tsx (Landing Page Publik)

import Link from "next/link";
import { Search, KeyRound, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-8 text-center ">
      <main className="flex flex-col gap-8 items-center max-w-3xl w-full">
        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
          Temukan Kamar Kost Idaman Anda di{" "}
          <span className="text-indigo-600">Rindang</span>
        </h1>
        <p className="text-xl text-gray-600">
          Kelola atau pesan kamar kost dengan mudah, cepat, dan transparan.
          Akses mudah ke semua kamar tersedia.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center mt-4">
          <Link
            href="/rooms"
            className="flex items-center justify-center gap-3 bg-indigo-600 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300 w-full sm:w-auto transform hover:scale-[1.02]"
          >
            <Search size={20} />
            Lihat Semua Kamar
          </Link>

          <Link
            href="/dashboard" 
            className="flex items-center justify-center gap-3 border-2 border-indigo-600 text-indigo-600 font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 w-full sm:w-auto"
          >
            Akses Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>
      </main>

      <footer className="mt-20 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Rindang. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
