const { Router } = require("express");
const { signUpHandler, getCurrentUserHandler, logoutUserHandler, updateUserHandler } = require("../controllers/user.controller");
const passport = require("passport");
const { isAuthenticated } = require("../middleware/access-controll.middleware");

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all the users
 *     responses:
 *       200:
 *         description: Success, return all the users in array
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/UserDto"
 *       500:
 *         description: User not logged in
 * 
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUserDto"
 *     responses:
 *       201:
 *         description: Created new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 * 
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update a user by id
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
 *             $ref: "#/components/schemas/UpdateUserDto"
 *     responses:
 *       202:
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 * 
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginUserDto"
 *     responses:
 *       201:
 *         description: Created new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 * 
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: User logout
 *     responses:
 *       200:
 *         description: User Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * 
 */

router.route("/")
    .post(signUpHandler)
    .get( isAuthenticated, getCurrentUserHandler)
    .patch( isAuthenticated, updateUserHandler);

router.route("/login").post(passport.authenticate("local"), getCurrentUserHandler);

router.route("/logout").post(isAuthenticated, logoutUserHandler);

module.exports = router;