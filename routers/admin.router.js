const { Router } = require("express");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-controll.middleware");
const { getAllStaffHandler, creatStaffUserHandler, updateStaffHandler, deleteStaffHandler, getAllUserHandler, removeUserHandler } = require("../controllers/admin.controller");

const router = Router();


/**
 * @openapi
 * /api/admin/staff:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all staff
 *     responses:
 *       200:
 *         description: Success, return all staff
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/UserDto"
 *       500:
 *         description: User not logged in
 *       403:
 *         description: Forbidden resource
 * 
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateStaffDto"
 *     responses:
 *       201:
 *         description: Created new staff
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 * 
 * /api/admin/staff/{id} :
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update staff by id
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
 *             $ref: "#/components/schemas/UpdateStaffDto"
 *     responses:
 *       202:
 *         descirption: Successfully updated the staff
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 * 
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete staff by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Successfully deleted the staff
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 * 
 * /api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: get all users
 *     responses:
 *       200:
 *         description: Success, return all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/UserDto"
 *       500:
 *         description: User not logged in
 *       403:
 *         description: Forbidden resource
 *     
 * /api/admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: remove user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Successfully removed the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserDto"
 * 
 */





router.use(isAuthenticated);
router.use(isStaff);

router.route("/staff")
    .get(hasPermission("canManageStaff"), getAllStaffHandler)
    .post(hasPermission("canManageStaff"), creatStaffUserHandler);
router.route("/staff/:id")
    .patch(hasPermission("canManageStaff"), updateStaffHandler)
    .delete(hasPermission("canManageStaff"), deleteStaffHandler);
router.route("/users").get(hasPermission("canManageUsers"), getAllUserHandler);
router.route("/users/:id").delete(hasPermission("canManageUsers"), removeUserHandler);

module.exports = router;