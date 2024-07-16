const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');

const port = process.env.PORT || 3001;
const app = express();

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

