"use client";

import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client-auth";
import { LogIn, Home, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  // Memeriksa status sesi saat komponen dimuat
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session); // Set true jika ada sesi
    };
    checkSession();

    // Listener untuk perubahan sesi (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Cleanup function
    return () => subscription?.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh untuk update UI dan Server Component
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Nama Aplikasi */}
          <Link
            href="/"
            className="flex-shrink-0 text-2xl font-bold text-indigo-600"
          >
            Rindang
          </Link>

          {/* Navigasi Utama */}
          <div className="flex items-center space-x-4">
            <Link
              href="/rooms"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Kamar Tersedia
            </Link>
          </div>

          {/* Tombol Login/Dashboard */}
          <div>
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  <Home size={18} className="mr-1" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 transition"
                >
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                <LogIn size={18} className="mr-1" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
