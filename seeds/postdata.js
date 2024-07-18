// seeds/postdata.js

const { Equipment } = require('../models');

const postdata = [
  {
    type: 'Console',
    price: 100,
    description: 'Old PlayStation 2 in good condition.',
    condition: 'Good',
    image_url: 'https://example.com/images/ps2.jpg',
  },
  {
    type: 'Controller',
    price: 20,
    description: 'Xbox One controller, slightly used.',
    condition: 'Slightly Used',
    image_url: 'https://example.com/images/xbox-controller.jpg',
  },
  {
    type: 'Game',
    price: 15,
    description: 'Gameboy Advance game - Pokémon Emerald.',
    condition: 'Like New',
    image_url: 'https://example.com/images/pokemon-emerald.jpg',
  },
];

const seedPosts = async () => {
  await Equipment.bulkCreate(postdata);
};

module.exports = seedPosts;
