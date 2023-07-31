import emailValidator from "email-validator"
import User from "../models/userSchema.js"

export const signup = async(req,res)=>{

    try {
        
    
    const {name,username,bio,email,password} =  req.body

    console.log(username,bio,email,password);

    if( !name || !username || !bio || !email || !password){
        return res.status(400),json({
            success:false,
            message:"All fields are mandatory"
        })
    }

    const validEmail = emailValidator.validate(email)
    if(!validEmail){
        return res.status(400),json({
            success:false,
            message:"Email is not valid"
        })
    }

    const user  = await User.create({
        name,
        username,
        bio,
        email,
        password
    })

    return res.status(200).json({
        success:true,
        message:"User Created Successfully"
    })

    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success:false,
                message:"Account Already Exists with this email id"
            })
        }
        res.status(400).json({
            success:false,
            message:error.message
        })

    }



}