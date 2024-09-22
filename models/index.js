const { Sequelize } = require("sequelize");
const { bookmodel } = require("./book.model");
require("dotenv").config();

const db = new Sequelize({
    host: "127.0.0.1",
    port: "3306",
    password: process.env.MYSQL_PASS,
    username: "root",
    database: "LibraryApi",
    dialect: "mysql",
});

const Book = bookmodel(db);

module.exports = { db, Book };
