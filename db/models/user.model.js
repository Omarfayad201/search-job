import { Schema, model } from "mongoose";


const userSchema = new Schema({

     firstName:{type:String , required:true , min:2 , max:20},
    lastName: { type: String, required: true, min: 2, max: 20 },
    userName: { type: String },
    email: { type: String, required: true, unique: true, lowerCase: true },
    password: { type: String, required: true }, 
    reCoveryEmail: { type: String },
    dateBirth:{type:Date},
    isConfirmed: { type: Boolean, default: false },
    mobileNumber:{type:String , required:true},
    role: { type: String, enum: ["user", "companyHr"] , default:"user"},
    status: {type:Boolean , default:false},
    forgetCode: String,
    
    
}, { timestamps: true })

export const User = model("User", userSchema);