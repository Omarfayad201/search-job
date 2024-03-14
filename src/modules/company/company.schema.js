import joi from "joi";
import {isValidObjectId} from "../../middleware/validation.middleware.js"
export const createCompany = joi.object({
    companyName:joi.string().trim().min(1).max(25).required(),
     description:joi.string().trim().required(),
    industry: joi.string(),
    address: joi.string(),
    numberOfCompany:joi.string().trim().min(11).max(20).required(),
    companyEmail:joi.string().email().required(),
    
    

 }).required()
export const updateCompany = joi
  .object({
    companyName: joi.string().trim().min(1).max(25),
    id: joi.string().custom(isValidObjectId).required(),
    description: joi.string().trim(),
    address: joi.string(),
    companyEmail: joi.string().email(),
  })
    .required();
  
export const deleteCompany = joi.object({
    id: joi.string().custom(isValidObjectId).required(),
    
}).required();

export const specificCompany = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
    .required();
  
