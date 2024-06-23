import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minumum:6,

    },
    city :{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    zipCode:{
        type:Number,
        required:true,
    },
    token:{
        type:String,

    },
    isDeleted:{
        type:Boolean,
        default:false,
    },


    },{timestamps:true})

userSchema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY});
    user.token = token;
    await user.save();
    return token;
}
const User  = mongoose.model('User',userSchema);
export default User;