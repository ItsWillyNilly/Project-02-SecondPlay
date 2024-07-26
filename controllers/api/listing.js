const router = require("express").Router();
const { User, Post } = require("../../models");
const isAuth = require("../../utils/isAuth");

router.post('/create', isAuth, function (req, res) {
    // Assuming you have a 'Listing' model defined
    console.log("req.body", req.body);
    Post.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        condition: req.body.condition,
        user_id: req.session.user_id// Associate the listing with the logged-in user
    })
        .then(function (newListing) {
            res.json(newListing);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;