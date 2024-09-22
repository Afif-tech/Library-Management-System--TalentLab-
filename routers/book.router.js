const { Router } = require("express");
const { createBookHandler, getManyBooksHandler, updateHandler, deleteBookHandler } = require("../controllers/book.controller");

const router = Router();

router.route("/").post(createBookHandler).get(getManyBooksHandler);
router.route("/:id").patch(updateHandler).delete(deleteBookHandler);

module.exports = router;