// seeds/seeds.js

const sequelize = require('../config/connection');
const seedUsers = require('./userdata');
const seedPosts = require('./postdata');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced!');

  await seedUsers();
  console.log('Users seeded!');

  await seedPosts();
  console.log('Posts seeded!');

  process.exit(0);
};

seedAll();
