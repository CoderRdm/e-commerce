const jwt= require('jsonwebtoken');
const usermodel = require('../models/user');


module.exports= async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","yopu need to log in first")
        return res.redirect("/")
    }

    try{
        let decded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await usermodel.findOne({email:decoded.email})
        .select("-password");
        req.user=user;
        next();
    }
    catch(err){
        req.flash('error','something went wrong.');
        res.redirect('/');
    }
};