const { SESSION_SECRET } = require("../config/env.config")

sessionConfig = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 600000
    }
};

module.exports = { sessionConfig }