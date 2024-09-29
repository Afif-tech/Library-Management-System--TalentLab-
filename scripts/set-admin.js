const { createNewRole } = require("../services/role.service");
const { findUserById } = require("../services/user.service");


const setAdmin = async() => {
    const admin = await createNewRole({
        name: "admin",
        canLendBooks: true,
        canManageUsers: true,
        canManageStaff: true,
        canManageBooks: true
    });
    const user = await findUserById("84ab1d98-4173-49b8-8db0-20e81ef73be7");
    user.isStaff = true;
    user.roleID = admin.id;
    await user.save();
    console.log(user);
}

setAdmin();