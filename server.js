// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
// requiring our models
const db = require('./models');
// temporary user obj array for storing new users until I figure out how to save them to the db instead
const users = [];

// express.js setup
const port = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// line 8-11 is how we are going to use the dependencies above 
const sequelize = require('./config/connection')
const app = express();
const hbs = exphbs.create({});
const routes = require('./controllers');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));
app.use((req, res, next)=>{
    req.session.loggedIn = req.session.loggedIn ?? false;
next();
}
);
console.log("server.js line 28");
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

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
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});
