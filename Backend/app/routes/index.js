const express = require("express");
const router = express.Router();

// Import Routes Spesifik
const authRoutes = require("./authRoutes");

// Definisi Base Paths untuk Routes
router.use("/auth", authRoutes);
// Tambahkan route lain di sini nanti: router.use('/properties', propertyRoutes);

// Optional: Root API Status Check
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Rindang API router online.",
  });
});

module.exports = router;
