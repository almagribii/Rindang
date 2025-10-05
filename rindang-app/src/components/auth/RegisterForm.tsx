// src/components/auth/RegisterForm.tsx
"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client-auth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMsg("");

    // 1. Memanggil API Supabase Auth untuk mendaftar
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // Metadata opsional (dapat digunakan oleh trigger SQL)
      options: {
        data: {
          nama_lengkap: namaLengkap,
        },
      },
    });

    if (error) {
      // Pendaftaran gagal
      setErrorMsg(error.message);
    } else if (data.user) {
      // Pendaftaran sukses. Supabase Auth akan membuat record.
      // Trigger SQL akan otomatis menyinkronkan ke tabel "Users" kita dengan role TENANT.
      setMessage("Pendaftaran berhasil! Mengarahkan ke Dashboard...");

      // Beri sedikit jeda lalu refresh dan arahkan
      setTimeout(() => {
        router.refresh();
        router.push("/dashboard");
      }, 1500);
    } else {
      // Kasus di mana Supabase memerlukan konfirmasi email
      setMessage(
        "Pendaftaran berhasil. Silakan cek email Anda untuk verifikasi."
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 flex items-center justify-center gap-2">
        <UserPlus size={28} /> Daftar Akun Rindang
      </h2>

      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
          {errorMsg}
        </div>
      )}
      {message && (
        <div className="bg-green-100 text-green-700 p-3 rounded text-sm">
          {message}
        </div>
      )}

      {/* 1. Nama Lengkap */}
      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-gray-700"
        >
          Nama Lengkap
        </label>
        <input
          id="nama"
          type="text"
          value={namaLengkap}
          onChange={(e) => setNamaLengkap(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      {/* 2. Email */}
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
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      {/* 3. Password */}
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
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition duration-150"
        disabled={loading}
      >
        {loading ? "Mendaftar..." : "Daftar Akun"}
      </button>

      <div className="text-center text-sm">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login di sini
        </Link>
      </div>
    </form>
  );
}
