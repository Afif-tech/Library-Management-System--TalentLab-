const { Router } = require("express");
const { findAllRoleHandler, newRoleHandler, updateRoleHandler, deleteRoleHandler } = require("../controllers/role.controller");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-controll.middleware");

const router = Router();

router.use(isAuthenticated);
router.use(isStaff);
router.use(hasPermission("canManageStaff"));

router.route("/").get(findAllRoleHandler).post(newRoleHandler);
router.route("/:id").patch(updateRoleHandler).delete(deleteRoleHandler);

module.exports = router;