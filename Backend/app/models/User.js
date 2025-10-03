module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // user_id (Primary Key, Auto Increment)
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      // Data Pribadi
      nama_lengkap: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      // Otentikasi
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255), // Untuk menampung hash Bcrypt
        allowNull: false,
      },

      // Otorisasi
      role: {
        type: DataTypes.ENUM("admin", "staff", "tenant"),
        allowNull: false,
        defaultValue: "staff",
      },
    },
    {
      tableName: "users", // Nama tabel di MySQL
      timestamps: true, // Menggunakan createdAt dan updatedAt
      underscored: true, // Menggunakan snake_case (e.g., created_at)
    }
  );

  // Definisi Relasi (Association)
  User.associate = function (models) {
    // Relasi 1:N: Satu User dapat mengelola banyak Properti
    models.User.hasMany(models.Property, {
      foreignKey: "user_id",
      as: "properties", // Alias untuk query
    });
  };

  return User;
};
