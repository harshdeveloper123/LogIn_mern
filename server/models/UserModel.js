// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt');
// const userSchema = new mongoose.Schema({
//     email:{
//         type:String,
//         required:[true,"email is required"],
//         unique:true
//     },
//       username:{
//         type:String,
//         required:[true,"password is required"]
//     },
    
//     password:{
//         type:String,
//         required:[true,"password is required"]
//     },
//     createdAt:{
//         type:Date,
//         default: new Date()
//     },

// });

// userSchema.pre('save',async function(){
//     this.password = await bcrypt.hash(this.password,12);
// });
// module.exports=mongoose.model("User",userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  username: {
    type: String,
    required: [true, "Username is required"] // fixed typo: said "password is required" before
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

// Use regular function to access `this`
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // only hash if modified
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
