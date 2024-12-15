const express = require('express');
const router = express.Router();
const isLoggedin= require('../middlewares/isLoggedin');
const productmodel = require('../models/product');
const usermodel = require('../models/user');


//rputes
router.get("/",function(req,res){
    let error= req.flash("error");
    res.render("index",{error,loggedin:false});
});


router.get("/shop", isLoggedin, async function (req, res) {
    try {
        let products = await productmodel.find();
        req.flash("success");
        console.log(products); // Debug: Check if data is retrieved correctly
        res.render("shop", { products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});



router.get("/cart", isLoggedin, async function (req, res) {
    try {
        let user = await usermodel.findOne({email:req.user.email})
        .populate("cart")
        console.log(user);
       res.render("cart",{user});
       console.log("Populated Cart Data:", user.cart);


    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/addtocart/:id", isLoggedin, async function (req, res) {
    try {
        // Find the user by email
        let user = await usermodel.findOne({ email: req.user.email });

        // Push the product ID from the URL parameter into the user's cart
        user.cart.push(req.params.id); // Use `req.params.id`, not `productid`

        // Save the user document
        await user.save();

        // Flash a success message and redirect to the shop page
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).send("Internal Server Error");
    }
});



module.exports= router;