// components/auth/LoginForm.tsx
"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link untuk navigasi

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Memanggil API Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // Login berhasil!
      // Kita panggil router.refresh() agar Next.js menjalankan middleware/Server Components
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Masuk ke Rindang</h2>
      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
          {errorMsg}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition duration-150"
        disabled={loading}
      >
        {loading ? "Memuat..." : "Login"}
      </button>

      <div className="text-center text-sm">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Daftar di sini
        </Link>
      </div>
    </form>
  );
}
