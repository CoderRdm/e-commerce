const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    Name : {
        typr:String,
        minLength: 3,
        trim:true
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

module.export= mongoose.model("owner",OwnerSchema);