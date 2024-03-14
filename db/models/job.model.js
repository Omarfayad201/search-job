import { Schema, Types, model } from "mongoose";

const jobSchema = new Schema({
    jobTitle: { type: String, required: true }, 
    jobLocation: { type: String, required: true },
    workingTime: { type: String, required: true },
    seniorityLevel: { type: String, enum: ["junior", "mid level", "senior", "team lead", "cto"], required: true},
    jobDescription: { type: String, required: true },
    technicalSkills: [{ type: String,  }],
    softSkills: [{ type: String,  }],
    addedBy: { type: Types.ObjectId, ref: "User", required: true },
    company: { type: Types.ObjectId, ref: "Company", required:true },
    
    
}, { timestamps: true })

export const Job = model("Job", jobSchema);