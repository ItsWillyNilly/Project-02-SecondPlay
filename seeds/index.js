const sequelize = require("../config/connection")
const seedUser = require("./userdata")
const seedPost = require("./postdata")
const seedComment = require("./commentdata")
const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
    await seedComment();
};
seedAll();
