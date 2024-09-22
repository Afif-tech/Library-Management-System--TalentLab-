const { DataTypes } = require("sequelize")
const { toDefaultValue } = require("sequelize/lib/utils")

const bookmodel = (db) => {
    return db.define("Book", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}

module.exports = { bookmodel }