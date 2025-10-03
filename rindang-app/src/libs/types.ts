 export type RoomStatus = "available" | "occupied" | "maintenance";
export type RentalStatus = "active" | "expired" | "cancelled";
export type PaymentStatus = "paid" | "pending" | "failed";
export type UserRole = "admin" | "tenant";

export interface User {
  user_id: string; // UUID
  nama: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Room {
  room_id: number;
  nomor_kamar: string;
  tipe_kamar: string;
  harga_bulanan: number; // DECIMAL
  status: RoomStatus;
  created_at: string;
}

export interface Rental {
  rental_id: number;
  tenant_id: string; // Foreign Key ke User
  room_id: number; // Foreign Key ke Room
  tanggal_mulai: string; // DATE
  tanggal_selesai: string | null; // DATE (bisa null)
  durasi_bulan: number;
  total_biaya: number; // DECIMAL
  status: RentalStatus;
}

export interface Payment {
  payment_id: number;
  rental_id: number; // Foreign Key ke Rental
  jumlah_bayar: number; // DECIMAL
  bulan_untuk: string; // DATE
  tanggal_bayar: string; // DATETIME
  metode: string;
  status: PaymentStatus;
}
