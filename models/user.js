const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    Name : String,
    email :String,
    contactno: Number,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
ref: "product"    }],
    order:{
        type: Array,
        default :[]
    },
    picture: String

});

module.exports= mongoose.model("user",UserSchema);