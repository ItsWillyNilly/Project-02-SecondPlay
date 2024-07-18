// seeds/userdata.js

const bcrypt = require('bcrypt');
const { User } = require('../models');

const userdata = [
  {
    username: 'john_doe',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    username: 'jane_doe',
    password: bcrypt.hashSync('password456', 10),
  },
  {
    username: 'gamer123',
    password: bcrypt.hashSync('password789', 10),
  },
];

const seedUsers = async () => {
  await User.bulkCreate(userdata);
};

module.exports = seedUsers;
