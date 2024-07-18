// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
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
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

const PORT = process.env.PORT || 3001;
// syncing our sequelize models and then starting our express app
sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});
