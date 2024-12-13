const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    Name : {
        type:String
    },
    email :String,
    contactno: Number,
    password: String,
    product:{
        type: Array,
        default :[]
    },
    picture: String,
    gstin:String

});

module.exports= mongoose.model("owner",OwnerSchema);