const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type:DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        sale_id: {
            type:DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sale',
                key: 'id'
            }
        },
        request_id: {
            type:DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'request',
                key: 'id',
            }
        }
    },
    {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
    }
)

module.exports = Comment;