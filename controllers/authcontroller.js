const usermodel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookieparser = require('cookie-parser');
const { generateToken } = require('../utils/generatetoken')




module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, Name } = req.body;

        ////checking if the user already exists
        let existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message);
                }
                else {
                    let createduser = await usermodel.create({
                        email,
                        password:hash,
                        Name
                    });
                    let token = generateToken(createduser);
                    res.cookie("token", token);
                    res.send("user created successfully")
                }
            })
        });



    }
    catch (err) {
        console.log(err.message);
    }

};

module.exports.loginUser = async function (req, res) {
    try{
    let { email, password } = req.body;

    let user = await usermodel.findOne({ email: email });
    if (!user) {
        res.send("Email or password incorrrect");
        res.redirect("/")
    }

    bcrypt.compare(password, user.password,async function (err, result) {
       if(result){
       let token= generateToken(user);
       res.cookie("token",token);
      
       res.redirect("/shop")
       }
       else{
        res.send("incorrect password ")
       }

    })
}catch (err) {
    console.log(err.message);
}
};

module.exports.logoutUser= async function(req,res){
    res.cookie("token","");
    res.redirect("/");
}