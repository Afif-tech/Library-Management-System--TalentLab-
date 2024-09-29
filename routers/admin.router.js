const { Router } = require("express");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-controll.middleware");
const { getAllStaffHandler, creatStaffUserHandler, updateStaffHandler, deleteStaffHandler, getAllUserHandler, removeUserHandler } = require("../controllers/admin.controller");

const router = Router();

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