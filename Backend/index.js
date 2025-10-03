// 1. Load Environment Variables (Harus di baris paling atas!)
require("dotenv").config();

// 2. Set Environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// 3. Import Modules
const express = require("express");
const db = require("./app/models"); // Mengarahkan ke app/models/index.js
const mainRoutes = require("./app/routes"); // Router utama dari app/routes/index.js

const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middlewares Dasar (Global)
app.use(express.json()); // Untuk parsing body JSON (penting untuk POST/PUT)
app.use(express.urlencoded({ extended: true })); // Untuk parsing form data

// 5. Setup Main API Route
// Semua request API akan diproses melalui router utama ini dengan prefix /api/v1
app.use("/api/v1", mainRoutes);

// 6. Test Route Sederhana (Jika akses tanpa /api/v1)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Selamat datang di API Rindang! Entry point adalah /api/v1",
    environment: process.env.NODE_ENV,
  });
});

// 7. Sinkronisasi Database dan Jalankan Server
db.sequelize
  .sync({ alter: true }) // Mencoba menyesuaikan skema DB (membuat tabel jika belum ada)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `✅ Server Rindang [${process.env.NODE_ENV}] berjalan di http://localhost:${PORT}`
      );
      console.log(`✅ Database ${process.env.DB_NAME} terhubung!`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal terhubung ke database:", err.message);
    console.error("Pastikan container Docker MySQL Anda berjalan!");
    // Opsional: Keluar dari aplikasi jika DB tidak bisa terhubung
    // process.exit(1);
  });
