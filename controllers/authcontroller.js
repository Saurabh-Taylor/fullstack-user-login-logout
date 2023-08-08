import emailValidator from "email-validator"
import User from "../models/userSchema.js"
import bcrypt from "bcrypt"


export const signup = async(req,res)=>{

    try {
    const {name,username,bio,email,password} =  req.body

    if( !name || !username  || !email || !bio || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are mandatory"
        })
    }

    const validEmail = emailValidator.validate(email)
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"Email is not valid"
        })
    }

    const user = new User({       
        name,
        username,
        bio,
        email,
        password
    }) 

    const savedUser = await user.save()

    // const user  = await User.create({
    //     name,
    //     username,
    //     bio,
    //     email,
    //     password
    // })

    return res.status(200).json({
        success:true,
        message:"User Created Successfully"
    })

    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success:false,
                message:"Account Already Exists with the provided email id",
                error
            })
        }
        res.status(400).json({
            success:false,
            message:error.message
        })

    }



}

export const login =  async (req,res)=>{
    try {
        
        const {username,password} = req.body
        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"Username or Password is missing"
            })
        }

        const user = await User.findOne({username}).select("+password")


        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token = user.jwtToken
        user.password = undefined

        const cookieOption = {
            maxAge:24*60*60*1000,
            httpOnly:true
        }
        res.cookie("token",token,cookieOption)
        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            user
        })


    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}