const asyncHandler= require("express-async-handler");
const { createNewUser, findUserByIdAndUpdate, findUserById } = require("../services/user.service");



const signUpHandler = asyncHandler( async (req, res) => {
    const { username, password, email } = req.body;
    if (!(username && email && password)) throw new Error("Bad request: username, email and password are required");
    const user = await createNewUser({ username, email, password });
    res.status(201).json(user);
})

const getCurrentUserHandler = asyncHandler( async ( req, res ) => {
    res.json(req.user);
})

const loginUserHandler = asyncHandler( async ( req, res ) => {
    res.json({
        message: "User Logged In",
        user: req.user});
})

const logoutUserHandler = asyncHandler(async ( req, res) => {
    const username = await req.user.username;
    req.logout((err) => {
        if (err) throw new Error("unable to logout");
    });
    res.json(`User ${username} has logged out`);
});

const updateUserHandler = asyncHandler(async ( req, res) => {
    const { password, username, email } = req.body;
    const user = await findUserByIdAndUpdate(req.user.id, { password, username, email });
    res.json(user);
});

module.exports = { signUpHandler, getCurrentUserHandler, logoutUserHandler, updateUserHandler, loginUserHandler };