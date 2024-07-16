// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const passport = require('./middleware/passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
// requiring our models
const db = require('./models');

// temporary user obj array for storing new users until I figure out how to save them to the db instead
const users = [];

// express.js setup
const port = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// sessions that keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('home-page.handlebars');
});

app.get('/login', (req, res) => {
    res.render('login.handlebars');
});

app.post('/login',)

app.get('/signup', (req, res) => {
    res.render('signup.handlebars');
});

app.post('/signup', async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.signup-password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.signup-username,
            password: hash,
            email: req.body.signup-email
        });
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.redirect('/signup');
    }
});

// syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});