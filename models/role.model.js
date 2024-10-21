const { DataTypes } = require("sequelize")

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateRoleDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           default: librarian
 *         canLendBooks:
 *           type: boolean
 *           default: false
 *         canManageBooks:
 *           type: boolean
 *           default: false
 *         canManageStaff:
 *           type: boolean
 *           default: false
 *         canManageUsers:
 *           type: boolean
 *           default: false
 *       required:
 *         - name
 *
 *     UpdateRoleDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           default: librarian
 *         canLendBooks:
 *           type: boolean
 *           default: false
 *         canManageBooks:
 *           type: boolean
 *           default: false
 *         canManageStaff:
 *           type: boolean
 *           default: false
 *         canManageUsers:
 *           type: boolean
 *           default: false
 *
 *     RoleDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         permissions:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 */

const roleModel = (db) => {
    return db.define("Role", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        canLendBooks: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        canManageBooks: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        canManageStaff: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        canManageUsers: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    })
}

module.exports = { roleModel };