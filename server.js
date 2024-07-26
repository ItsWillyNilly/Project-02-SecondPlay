// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const { initializePassport } = require('./middleware/passport');
const passport = require('passport');
// requiring our models
const db = require('./models');
// temporary user obj array for storing new users until I figure out how to save them to the db instead
const users = [];

// express.js setup
const PORT = process.env.PORT || 3001;
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess));
app.use((req, res, next) => {
    req.session.loggedIn = req.session.loggedIn ?? false;
    next();
}
);

console.log("server.js line 28");
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

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);
app.use(routes);


// syncing our sequelize models and then starting our express app
sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});
