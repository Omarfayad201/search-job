import { Schema, Types, model } from "mongoose";

const companySchema = new Schema({
    companyName: { type: String, required: true, unique: true, min: 1, max: 25 },
    description: { type: String, required: true },
    industry: String,
    address: String,
    numberOfCompany: { type:String, required: true, unique: true, min: 11, max: 20 },
    companyEmail: { type: String, unique: true },
    companyHr:{type:Types.ObjectId , ref:"User" , required:true}
}, { timestamps: true , toJSON:{virtuals:true} , toObject:{virtuals:true}})

companySchema.virtual("job", {
    ref:"Job",
    localField:"_id",
    foreignField:"company",
})

export const Company = model("Company", companySchema);