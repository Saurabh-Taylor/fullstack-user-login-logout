import mongoose from "mongoose"

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
})

export default mongoose.model("User",userSchema)