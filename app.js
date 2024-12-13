const express = require('express')
const app = express();
const cookieparser = require('cookie-parser');
const path = require ('path');
const bodyparser = require('body-parser');
const expressSession= require('express-session');
const flash = require('connect-flash');


//configs//used for the variables which are used in the .env file
require('dotenv').config();

//Importing all the routes
const ownersRouter= require('./routes/ownersrouter');
const usersRouter= require('./routes/usersrouter');
const productsRouter= require('./routes/productsrouter');
const indexRouter = require('./routes/index');



//Importing all the databases for the cases of concern
const db = require('./config/mongoose-connection');
const usermodel = require('./models/user');
const productmodel = require('./models/product');



//setting the middlewares
app.use(express.json());
app.use(express.urlencoded({exteneded : true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,"public")));
app.use(flash());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
);
app.set("view engine","ejs");


//setting the routes
app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);