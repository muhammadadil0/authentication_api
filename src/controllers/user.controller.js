const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
async function registerUser(req,res){
  try{
  const {username,email,password,role} = req.body;

  const isAlreadyUser = await userModel.findOne({
    email
  })

  if(isAlreadyUser){
    return res.status(400).json({
        message:'Email already Used'
    });
  }
  const hashPassword = await bcrypt.hash(password,10)

  const user = await userModel.create({
    username,email,password:hashPassword,role
  })
  res.status(201).json({
    message:"User created successfully",
    user
  })
  }catch(err){
    res.status(500).json({message:err.message})
  }
}


async function loginUser(req,res){
  try{
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email
    })
    
    if(!user){
       return res.status(404).json({
            message:'User Not Found',
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
       return res.status(400).json({
            message:'Incorrect password'
        })
    }

    const token = jwt.sign({
       id:user._id,
       role:user.role
    }, process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    res.status(200).json({
        message:'Login Successfully',
        token
    })
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

async function getProfile(req,res){
    const user = await userModel.findById(req.user.id).select('-password');

    res.status(200).json({
        message:'Profile fetched successfully',
        user
    })
}   


module.exports = {registerUser,loginUser,getProfile} 
