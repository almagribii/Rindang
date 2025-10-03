// Rindang/Backend/app/models/Property.js

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      property_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        // Foreign Key
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Merujuk ke tabel users
          key: "user_id",
        },
      },
      nama_kos: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      total_kamar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      fasilitas: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "properties",
      timestamps: true,
      underscored: true,
    }
  );

  // Relasi (Association)
  Property.associate = function (models) {
    // Relasi N:1 (Banyak Property dikelola oleh satu User)
    Property.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "owner",
    });

    // Relasi 1:N (Satu Property memiliki banyak Room) - Akan diaktifkan setelah Room.js dibuat
    // Property.hasMany(models.Room, {
    //     foreignKey: 'property_id',
    //     as: 'rooms'
    // });
  };

  return Property;
};
