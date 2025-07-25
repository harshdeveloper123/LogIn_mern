const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
      username:{
        type:String,
        required:[true,"password is required"]
    },
    
    password:{
        type:String,
        required:[true,"password is required"]
    },
    createdAt:{
        type:Date,
        default: new Date()
    },

});