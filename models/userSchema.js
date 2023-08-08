import mongoose from "mongoose"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minLength:[5,"Name should be atleast 5 characters"],
        maxLength:[50,"Name should not exceed 50 characters"]
    },
    username:{
        type:String,
        unique:[true,"Username must be unique"]
    },
    bio:{
      type:String  
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"already Registerd"],
        lowercase:true,  
    },
    password:{
        type:String,
        select:false
    }
},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password =  await bcrypt.hash(this.password,10)
})

userSchema.methods = {
     jwtToken(){
        const payload= {id:this._id,email:this.email}
        const secretKey = process.env.SECRET_KEY
        return JWT.sign(payload,secretKey,{expiresIn:"24h"})
    }
}

export default mongoose.model("User",userSchema)