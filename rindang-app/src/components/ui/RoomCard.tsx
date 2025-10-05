// src/components/RoomCard.tsx
"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client-auth";
import { useRouter } from "next/navigation";
import { DollarSign, DoorOpen, Home, Zap } from "lucide-react";
// Tidak perlu import type { Prisma } lagi karena kita tidak menggunakan tipe Prisma.Decimal
// Namun, jika ada tipe lain yang dibutuhkan, pertahankan import ini.

// DEFINISI INTERFACE HARUS MENGGUNAKAN STRING UNTUK HARGA
interface RoomData {
  room_id: number;
  nomor_kamar: string;
  tipe_kamar: string;
  harga_bulanan: string; // HARUS string, BUKAN Prisma.Decimal
  status: string;
}

export default function RoomCard({ room }: { room: RoomData }) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleBooking = async () => {
    // Logic Gated Access: Cek Sesi
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("Anda harus login terlebih dahulu untuk memesan kamar!");
      router.push("/auth/login");
      return;
    }

    // Redirect jika sudah login
    router.push(`/booking/${room.room_id}`);
  };

  // SOLUSI: Konversi String ke Number dan Format
  const priceAsNumber = parseFloat(room.harga_bulanan);

  const formattedPrice = priceAsNumber.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const isAvailable = room.status === "AVAILABLE";

  return (
    <div
      className={`
        bg-white border rounded-xl p-6 flex flex-col justify-between 
        shadow-lg transition duration-300 hover:shadow-xl
        ${isAvailable ? "border-indigo-200" : "border-gray-300 bg-gray-50"}
    `}
    >
      {/* HEADER DAN NOMOR KAMAR */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-4xl font-extrabold text-indigo-700">
          {room.nomor_kamar}
        </h3>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider
            ${
              isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
        `}
        >
          {room.status === "AVAILABLE" ? "Siap Huni" : "Terisi"}
        </span>
      </div>

      {/* DETAIL KAMAR */}
      <div className="space-y-4 mb-6">
        {/* Tipe Kamar */}
        <div className="flex items-center text-gray-700">
          <Home size={18} className="mr-3 text-indigo-500" />
          <p className="font-semibold">Tipe:</p>
          <span className="ml-2 font-medium">{room.tipe_kamar}</span>
        </div>

        {/* Harga */}
        <div className="border-t border-gray-100 pt-3">
          <p className="text-sm text-gray-500">Harga Bulanan</p>
          <div className="flex items-end text-green-700">
            <DollarSign size={24} className="mr-1" />
            <p className="text-3xl font-extrabold">Rp {formattedPrice}</p>
            <span className="text-lg ml-1 text-gray-500">/ bln</span>
          </div>
        </div>
      </div>

      {/* TOMBOL AKSI */}
      <button
        onClick={handleBooking}
        disabled={!isAvailable}
        className={`mt-4 w-full font-semibold py-3 rounded-lg transition duration-200 shadow-md 
          ${
            isAvailable
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {isAvailable ? (
          <span className="flex items-center justify-center">
            <Zap size={18} className="mr-2" /> Pesan Sekarang
          </span>
        ) : (
          "Tidak Tersedia"
        )}
      </button>
    </div>
  );
}
