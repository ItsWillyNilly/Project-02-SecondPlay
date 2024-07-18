const router = require('express').Router();
const userRoutes = require('./user');

// Add other routes here as needed
// const productRoutes = require('./product');

router.use('/users', userRoutes);
// router.use('/products', productRoutes);

module.exports = router;

