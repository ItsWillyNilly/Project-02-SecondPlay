// seeds/seeds.js

const sequelize = require('../config/connection');
const userdata = require('./userdata');
const postdata = require('./postdata');
//TODO: We need to change Post to Equipment later
const {User, Post} = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced!');

  
    await User.bulkCreate(userdata);
  
  
  console.log('Users seeded!');

  
    await Post.bulkCreate(postdata);
  
  
  console.log('Posts seeded!');

  process.exit(0);
};

seedAll();

