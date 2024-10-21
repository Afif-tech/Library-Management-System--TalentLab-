const express = require("express");
const { db } = require("./models")
const { router } = require("./routers");
const { errorHandler } = require("./middleware/error.middleware");
const { PORT } = require("./config/env.config");
const session = require("express-session");
const passport = require("passport");
const { initPassport } = require("./utils/passport.utils");
const { sessionConfig } = require("./config/session.config");

initPassport(passport);
const app = express();
app.use(express.json());

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("server is running on port", PORT);
    db.authenticate();
    db.sync({});
    
})

// link: http://localhost:3000/api/docs/