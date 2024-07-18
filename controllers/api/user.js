const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.post("/login", async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    console.log("user:", user)
    console.log("req.body.username:", req.body.username)
    console.log("req.body.password:", req.body.password)
    if (!user || !user.checkPassword(req.body.password)) {
        res.status(400).json({ message: "username or password is not correct" })
        return;
    }
    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.login = true
        res.status(200).json({ user, message: "you are logged in" })

    });
    // res.json({ message: "you are logged in" })   
});


module.exports = router
