const router = require("express").Router();
const { Post, User } = require('../models');
// route to get all products
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({

      order: [
        ['created_at', 'DESC']
      ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("postdata : >>\n", posts);
    // Pass serialized data and session flag into template
    res.render('home-page', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.get("/signup", (req, res) => {
  console.log("signup")
  res.render("signup");
});
router.get("/card/:id", async (req, res)=>{
  const cardData = await Post.findByPk(req.params.id);
  const card = cardData.get({
    plain: true
  });
  res.render("card-info", {
    card,
    loggedIn: req.session.loggedIn
  })


})
// route to get one product
// router.get()

module.exports = router;

// include: [
//   {
//     model: User,
//     attributes: ['username'],
//   },
// ],