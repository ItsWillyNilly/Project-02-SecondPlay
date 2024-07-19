// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
// const {passport} = require('./middleware/passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
// requiring our models
const db = require('./models');
const sequelize = require ('./config/connection')
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
// app.use(session({
//  secret: process.env.SESSION_SECRET,
//  resave: false,
//  saveUninitialized: false
// }));
app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
app.use(methodOverride('_method'));

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.get('/', checkIsAuthenticated, (req, res) => {
    res.render('home-page.handlebars');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.handlebars');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.handlebars');
});

app.post('/signup', checkNotAuthenticated , async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.signupPassword, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.signupUsername,
            password: hash,
            email: req.body.signupEmail
        });
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.redirect('/signup');
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

function checkIsAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

// syncing our sequelize models and then starting our express app
sequelize.sync().then(function () {
    app.listen(port, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", port, port);
    });
});
