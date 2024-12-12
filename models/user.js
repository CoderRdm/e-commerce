const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    Name : String,
    email :String,
    contactno: Number,
    password: String,
    cart: {
        type: Array,
        default :[]
    },
    order:{
        type: Array,
        default :[]
    },
    picture: String,
    isadmin: Boolean

});

module.export= mongoose.model("user",UserSchema);