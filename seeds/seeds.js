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


//.JSON FILES DONT ALLOW COMMENTS
//changed userdata.js to userdata.json because the body of userdata.js is delared as an array object
//so to use this object we have to change userdata.js to userdata.json

//changed postdata.js to post.json because the body of postdata,js is delared as an array object
//so to use this object we have to change postdata.js to postdata.json