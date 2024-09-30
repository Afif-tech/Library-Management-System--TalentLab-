const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           default: John Doe
 *         email:
 *           type: string
 *           default: john@doe.com
 *         password:
 *           type: string
 *           default: password123
 *       required:
 *         - username
 *         - email
 *         - password
 * 
 *     CreateStaffDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           default: jane
 *         email:
 *           type: string
 *           default: jane@doe.com
 *         password:
 *           type: string
 *           default: pass
 *         roleID:
 *           type: string 
 *       required:
 *         - username
 *         - email
 *         - password
 *         - roleID
 * 
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           default: John Doe
 *         email:
 *           type: string
 *           default: john@doe.com
 *         password:
 *           type: string
 *           default: password123
 * 
 *     UpdateStaffDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           default: jane
 *         email:
 *           type: string
 *           default: jane@doe.com
 *         password:
 *           type: string
 *           default: pass
 *         roleID:
 *           type: string
 * 
 *     LoginUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           default: john@doe.com
 *         password:
 *           type: string
 *           default: password123
 *       required:
 *         - email
 *         - password
 * 
 *     UserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         isStaff:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *         roleID: 
 *           type: string
 * 
 */


const userModel = (db) => {
    return db.define("User", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isStaff: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }  
    }, {
        hooks: {
            beforeSave: async(user) => {
                if (user.changed("password")) {
                    const salt = await bcryptjs.genSalt(10);
                    const hash = await bcryptjs.hash(user.password, salt);
                    user.password = hash;
                }
            }
        }
    })
}

module.exports = { userModel }

