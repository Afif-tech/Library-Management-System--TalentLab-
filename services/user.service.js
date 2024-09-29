// find book
//find by id
// borrowing
// update 
// delete 
// create done

const { User, Role } = require("../models")

const createNewUser = (body) => {
    return User.create({ ...body});
}

const findManyUsers = (searchParam) => {
    return User.findAll({ where: { ...searchParam}, include: [{ model: Role, attributes: ['name']}]});
}

const findUserById = async (id) => {
    const user = await User.findByPk(id, { include: Role});
    if (!user) throw new Error("User with specified id does not exist");
    return user;
}

const findOneUser = (searchParam) => {
    return User.findOne({ where: { ...searchParam}});
}

const findUserByIdAndUpdate = async (id, body) => {
    const user = await findUserById(id);
    for (const key of Object.keys(body)) {
        user[key] = body[key] ?? user[key];
    }
    await user.save();
    return user;
}

const findUserByIdAnddelete = async (id) => {
    const user = await findUserById(id);
    
    await user.destroy();
    return user;
}

module.exports = {
    createNewUser,
    findUserById,
    findOneUser,
    findManyUsers,
    findUserByIdAndUpdate,
    findUserByIdAnddelete
}