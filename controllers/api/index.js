const router = require('express').Router();
const userRoutes = require('./user');
const listingRoutes = require('./listing');

// Add other routes here as needed
// const productRoutes = require('./product');

router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
// router.use('/products', productRoutes);

module.exports = router;

