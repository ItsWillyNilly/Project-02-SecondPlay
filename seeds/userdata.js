const{User} = require("../models");
const userData = [{
    username: "FaizaHaque",
    password:"helloo",
}];
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});
module.exports = seedUsers;
