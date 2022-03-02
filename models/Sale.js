const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sale extends Model {}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    album_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    photo: {
        type: DataTypes.BLOB,
    },
    audio: {
        type: DataTypes.BLOB,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      },
    },
  },
  {
    // hooks: {
    //   beforeCreate: async (newUserData) => {
    //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //     return newUserData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'sale',
  }
);

module.exports = Sale;
