const { Router } = require("express");
const { createBookHandler, getManyBooksHandler, updateHandler, deleteBookHandler, bookLendingHandler } = require("../controllers/book.controller");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-controll.middleware");

const router = Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all the books
 *     responses:
 *       200:
 *         description: Success, return all the books in array
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/BookDto"
 *       500:
 *         description: User not logged in
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateBookDto"
 *     responses:
 *       201:
 *         description: Created new book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BookDto"
 * 
 * /api/books/{id}:
 *   patch:
 *     tags:
 *       - Books
 *     summary: Update a book by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateBookDto"
 *     responses:
 *       202:
 *         description: Successfully updated the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BookDto"
 * 
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Successfully deleted the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BookDto"
 */

router.route("/")
    .post( isAuthenticated, isStaff, hasPermission("canManageBooks"), createBookHandler)
    .get(isAuthenticated, getManyBooksHandler);
    //.get( isAuthenticated, isStaff, hasPermission("canLendBooks"), getManyBooksHandler);
router.route("/:id")
    .patch( isAuthenticated, isStaff, hasPermission("canManageBooks"), updateHandler)
    .delete( isAuthenticated, isStaff, hasPermission("canManageBooks"), deleteBookHandler);
router.route("/:id/lend").patch( isAuthenticated, isStaff, hasPermission("canLendBooks"), bookLendingHandler);

module.exports = router;