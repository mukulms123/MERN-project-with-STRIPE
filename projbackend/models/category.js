const mongoose= require("mongoose");

const categoryScheme= new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: 32,
        maxlength:32,
        unique: true
    }
},{timestamps: true}
);


module.exports= mongoose.model("Category",categoryScheme);