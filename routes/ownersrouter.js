const express = require('express');
const router = express.Router();
const ownerModel= require('../models/owner');
const flash= require('flash')

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV=== "development"){
router.post("/create",async function(req,res){
   let owners=await ownerModel.find();
   if(owners.length>0) {
    return res.status(503).send("you dont have permission yto create a new owner")
   }
let {Name,email,password}= req.body;
let createdowner=await ownerModel.create({
    Name,
    email ,
   
    password

    

})

   res.status(201).send(createdowner)
})
}

router.get("/admin",function(req,res){
    let success=req.flash("success");
    res.render("createproducts",{success});
})


module.exports = router ;