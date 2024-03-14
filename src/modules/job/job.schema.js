import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const createJob = joi.object({
  jobTitle: joi.string().trim().required(),
  company: joi.string().custom(isValidObjectId).required(),
  jobLocation: joi.string().required().trim(),
  workingTime: joi.string().required(),
  jobDescription: joi.string().required(),
  seniorityLevel: joi.string().required(),
  technicalSkills: joi.array(),
  softSkills: joi.array(),
});

export const updateJob = joi.object({
  jobTitle: joi.string().trim().optional(),
  id: joi.string().custom(isValidObjectId).required(),
  company: joi.string().custom(isValidObjectId).required(),
  jobLocation: joi.string().trim().optional(),
  workingTime: joi.string().optional(),
  jobDescription: joi.string().optional(),
  seniorityLevel: joi.string().optional(),
  technicalSkills: joi.array().optional(),
  softSkills: joi.array().optional(),
});

export const deleteJob = joi.object({
  id:joi.string().custom(isValidObjectId).required(),
})

// export const getJob = joi.object({
//   company: joi.string().custom(isValidObjectId),
// });

export const allJobWithCompany = joi.object({
  companyName: joi.string().trim(),
});

export const allJobWithFilter = joi.object({
  jobTitle: joi.string().trim().optional(),
  jobLocation: joi.string().trim().optional(),
  workingTime: joi.string().optional(),
  seniorityLevel: joi.string().optional(),
  technicalSkills: joi.string().optional(),
});

export const jobApply = joi.object({
  jobId: joi.string().custom(isValidObjectId).required(),
  userTechSkills: joi.array().required(),
  userSoftSkills: joi.array().required(),
});

