const { Router } = require("express");
const { findAllRoleHandler, newRoleHandler, updateRoleHandler, deleteRoleHandler } = require("../controllers/role.controller");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-controll.middleware");

const router = Router();

/**
 * @openapi
 * /api/roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: Success, return all roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RoleDto"
 *       500:
 *         description: User not logged in
 * 
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateRoleDto" 
 *     responses:
 *       201:
 *         description: Created new role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RoleDto"
 * 
 * /api/roles/{id}:
 *   patch:
 *     tags:
 *       - Roles
 *     summary: Update Role by Id
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
 *             $ref: "#/components/schemas/UpdateRoleDto"
 *     responses:
 *       202:
 *         description: Successfully updated role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RoleDto"
 * 
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete role by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Successfully deleted the role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RoleDto"
 * 
 */

router.use(isAuthenticated);
router.use(isStaff);
router.use(hasPermission("canManageStaff"));

router.route("/").get(findAllRoleHandler).post(newRoleHandler);
router.route("/:id").patch(updateRoleHandler).delete(deleteRoleHandler);

module.exports = router;