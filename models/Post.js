const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Post extends Model { }
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id"
            }
        }
    }, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post"
});
module.exports = Post;
