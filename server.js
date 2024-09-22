const express = require("express");
const { db } = require("./models")
const { router } = require("./routers");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("server is running");
    db.sync();
})