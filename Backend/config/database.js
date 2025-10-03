
// Rindang/Backend/config/database.js
require('dotenv').config(); // Pastikan variabel .env dimuat di sini juga

module.exports = {
  // --- DEVELOPMENT ENVIRONMENT (Digunakan saat NODE_ENV='development') ---
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // 'mysql'
    logging: false, // Set true jika ingin melihat query SQL di console
    
    // Konfigurasi tambahan pool koneksi MySQL
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  
  // --- PRODUCTION ENVIRONMENT (Untuk masa depan) ---
  production: {
    // Gunakan variabel lingkungan yang berbeda untuk environment produksi
    username: process.env.PROD_DB_USER, 
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: 'mysql',
    logging: false
  }
};