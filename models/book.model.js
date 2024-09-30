const { DataTypes } = require("sequelize")
const { toDefaultValue } = require("sequelize/lib/utils")

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBookDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           default: An amazing book
 *         author:
 *           type: string
 *           default: Jane Doe
 *       required:
 *         - title
 *         - author
 * 
 *     UpdateBookDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           default: An amazing book
 *         author:
 *           type: string
 *           default: Jane Doe
 * 
 *     LendReturnBookDto:
 *       type: object
 *       properties:
 *         action:
 *           type: string
 *           default: lend
 *         userId:
 *           type: string
 *       required:
 *         - action
 *         - userId
 * 
 *     BookDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         isAvailable:
 *           type: boolean
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 * 
 */

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
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    })
}

module.exports = { bookmodel }