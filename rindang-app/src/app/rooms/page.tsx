// src/app/rooms/page.tsx (Server Component)

import prisma from "@/lib/prisma/client";
import RoomCard from "@/components/ui/RoomCard";
// Tidak perlu type { Prisma } dari client lagi setelah mapping
import type { Prisma } from "@prisma/client";

// [TIPE DATA BARU YANG AMAN UNTUK CLIENT]
interface SafeRoomData {
  room_id: number;
  nomor_kamar: string;
  tipe_kamar: string;
  harga_bulanan: string;
  status: string;
}

export default async function RoomsPage() {
  const rawRooms = await prisma.rooms.findMany({
    where: {
      status: "AVAILABLE",
    },
    select: {
      room_id: true,
      nomor_kamar: true,
      tipe_kamar: true,
      harga_bulanan: true,
      status: true,
    },
    orderBy: {
      nomor_kamar: "asc",
    },
  });

  // ************ SOLUSI: SERIALISASI DATA ************
  const availableRooms: SafeRoomData[] = rawRooms.map((room) => ({
    ...room,
    // Konversi objek Decimal menjadi String sebelum dikirim ke Client Component
    harga_bulanan: room.harga_bulanan.toString(),
  }));
  // ************ END SOLUSI ************

  return (
    // ... (sisa kode tampilan sama)
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {availableRooms.map((room) => (
        // Mengirim data dengan tipe SafeRoomData (string untuk harga)
        <RoomCard key={room.room_id} room={room} />
      ))}
    </div>
    // ...
  );
}
