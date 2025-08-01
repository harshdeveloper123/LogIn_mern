// const User = require('../models/UserModel');
// const {createSecretToken} = require('../util/SecretToken');
// const bcrypt = require('bcrypt');

// module.exports.Signup = async(req,res,next)=>{
//     try{
//         const{email,password,username,createdAt}= req.body;
//         const existinguser =await User.findOne({email});
//         if(existinguser){
//             return res.json({message:"user already exists"})
//         }
//         const user = await User.create({email,password,username,createdAt});
//         const token = createSecretToken(user.id);
//         res.cookie("token",token,{
//             withCredentials:true,
//             httpOnly:false,
//         })
//         res
//         .status(201)
//         .json({message:"User signed in succesfully", success:true,user});
//         next();

//     }catch(error){
//         console.error(error)
//     }
// }

const User = require('../models/UserModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcrypt');

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password,
      username,
      createdAt,
    });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//login controller
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);   
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: true,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}