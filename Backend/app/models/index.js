"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
// Pastikan .env sudah dimuat sebelum file ini dipanggil,
// Tapi di index.js kita sudah panggil dotenv.config()

const env = process.env.NODE_ENV || "development";
// JALUR HARUS BENAR: Dari models -> app -> Backend -> config/database.js
const config = require(__dirname + "/../../config/database.js")[env];
console.log("DB Config Loaded:", config); // Cek apakah konfigurasi terbaca


const db = {};

// 1. INISIASI KONEKSI SEQUELIZE
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // BARIS KRITIS: Inisiasi koneksi
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// 2. Load semua model (User.js, Property.js, dll.)
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

// 3. Setup Relasi
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 4. EXPORT KRITIS
db.sequelize = sequelize; // <-- Jika ini undefined, index.js akan error!
db.Sequelize = Sequelize;

module.exports = db;
