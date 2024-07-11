const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express()
const routes = require("./controllers")
const sequelize = require("./config/connection")
const hbs = exphbs.create({})
const sess = {
    secret: "Super secret secret",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}
app.use(session(sess));
app.use((req, res, next) => {
    if (req.session.login === undefined)
        req.session.login = false;
    next();
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

});