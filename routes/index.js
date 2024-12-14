const express = require('express');
const router = express.Router();
const isLoggedin= require('../middlewares/isLoggedin');
const productmodel = require('../models/product');

router.get("/",function(req,res){
    let error= req.flash("error");
    res.render("index",{error});
});

router.get("/shop",isLoggedin,async function(req,res){
    let products = await productmodel.find(); 
    res.render("shop",{products});
});

module.exports= router;