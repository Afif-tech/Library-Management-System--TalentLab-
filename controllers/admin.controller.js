const asyncHandler = require("express-async-handler");
const { findManyUsers, createNewUser, findUserByIdAndUpdate, findUserByIdAnddelete } = require("../services/user.service");


const getAllStaffHandler = asyncHandler(async (req, res) => {
    const staff = await findManyUsers({ isStaff: true });
    res.json(staff);
})

const creatStaffUserHandler = asyncHandler(async(req, res) => {
    const { roleID, email, username, password } = req.body;
    if (!(roleID && email && username && password )) throw new Error("Bad request, please use all fields");
    const newStaffMember = await createNewUser ({ roleID, email, username, password, isStaff: true});
    res.status(201).json(newStaffMember);
})

const updateStaffHandler = asyncHandler(async ( req, res) => {
    const { roleID, email, username, password, isStaff } = req.body;
    const updatedStaff = await findUserByIdAndUpdate(req.params.id, { roleID, email, username, password, isStaff});
    res.status(202).json(updatedStaff);
})

const deleteStaffHandler = asyncHandler( async ( req, res ) => {
    const staff = await findUserByIdAndUpdate(req.params.id, { isStaff: false});
    staff.roleID = null;
    await staff.save();
    res.status(202).json(staff);
})

const getAllUserHandler = asyncHandler( async (req, res ) => {
    const users = await findManyUsers({});
    res.json(users);
})

const removeUserHandler = asyncHandler( async ( req, res ) => {
    const user = await findUserByIdAnddelete(req.params.id);
    res.status(202).json(user);
})

module.exports = { getAllStaffHandler, creatStaffUserHandler, updateStaffHandler, deleteStaffHandler, getAllUserHandler, removeUserHandler};