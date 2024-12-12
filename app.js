const express = require('express')
const app = express();
const cookieparser = require('cookie-parser');
const path = require ('path');
const bodyparser = require('body-parser');


//Importing all the routes
const ownersRouter= require('./routes/ownersrouter');
const usersRouter= require('./routes/usersrouter');
const productsRouter= require('./routes/productsrouter');

//Importing all the databases for the cases of concern
const db = require('./configs/mongoose-connection');
const usermodel = require('./models/user');
const productmodel = require('./models/product');




app.use(express.json());
app.use(express.urlencoded({exteneded : true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);