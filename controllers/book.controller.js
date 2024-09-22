const asyncHandler = require("express-async-handler");
const { createNewBook, findBookById, findManyBooks, findBookByIdAnddelete, findBookByIdAndUpdate } = require("../services/book.service");

const createBookHandler = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
    const book = await createNewBook({ title, author });
    res.status(201).json(book);
})

const getManyBooksHandler = asyncHandler(async(req, res) => {
    const books = await findManyBooks({ ...req.query});
    res.json(books);
})

const deleteBookHandler = asyncHandler(async (req, res) => {
    const book = await findBookByIdAnddelete(req.params.id);
    res.status(202).json(book)
})

const updateHandler = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
    const book = await findBookByIdAndUpdate(req.params.id, {title, author});
    res.status(202).json(book)
})

module.exports = { createBookHandler, getManyBooksHandler, deleteBookHandler, updateHandler };