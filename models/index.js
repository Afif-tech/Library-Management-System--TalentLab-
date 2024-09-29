const { Sequelize } = require("sequelize");
const { bookmodel } = require("./book.model");
const { userModel } = require("./user.model");
const { DB_HOST, DB_PASS, DB_PORT, DB_USER, DB_NAME } = require("../config/env.config");
const { roleModel } = require("./role.model");

const db = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    password: DB_PASS,
    username: DB_USER,
    database: DB_NAME,
    dialect: "mysql",
});

const Book = bookmodel(db);
const User = userModel(db);
const Role = roleModel(db);

User.hasMany(Book, { foreignKey: "borrower"});
Book.belongsTo(User, { foreignKey: "borrower"});

Role.hasMany(User, { foreignKey: "roleID"});
User.belongsTo(Role, { foreignKey: "roleID"});

module.exports = { db, Book, User, Role };
