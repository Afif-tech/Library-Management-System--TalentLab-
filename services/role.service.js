// find book
//find by id
// borrowing
// update 
// delete 
// create done

const { Role } = require("../models")

const createNewRole = (body) => {
    return Role.create({ ...body});
}

const findManyRoles = (searchParam) => {
    return Role.findAll({ where: { ...searchParam}});
}

const findRoleById = async (id) => {
    const role = await Role.findByPk(id);
    if (!role) throw new Error("Role with specified id does not exist");
    return role;
}

const findOneRole = (searchParam) => {
    return Role.findOne({ where: { ...searchParam}});
}

const findRoleByIdAndUpdate = async (id, body) => {
    const role = await findRoleById(id);
    for (const key of Object.keys(body)) {
        role[key] = body[key] ?? role[key];
    }
    await role.save();
    return role;
}

const findRoleByIdAndDelete = async (id) => {
    const role = await findRoleById(id);
    
    await role.destroy();
    return role;
}

module.exports = {
    findRoleById,
    findOneRole,
    findManyRoles,
    findRoleByIdAndUpdate,
    findRoleByIdAndDelete,
    createNewRole,
}