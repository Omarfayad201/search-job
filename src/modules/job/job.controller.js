import { Application } from "../../../db/models/application.model.js";
import { Company } from "../../../db/models/company.model.js";
import { Job } from "../../../db/models/job.model.js";
import { User } from "../../../db/models/user.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import cloudinary from "./../../../utils/cloud.js"

export const createJob = asyncHandler(async (req, res, next) => {

  const company = await Company.findById(req.params.company);
  if (!company) return next(new Error("company not found!", { cause: 404 }))
  if (req.user.id.toString() !== company.companyHr.toString()) return next(new Error("you not owner!"))
  const isJob = await Job.create({
    jobTitle: req.body.jobTitle,
    jobLocation: req.body.jobLocation,
    workingTime: req.body.workingTime,
    jobDescription: req.body.jobDescription,
    seniorityLevel: req.body.seniorityLevel,
    addedBy: req.user.id,
    company: req.params.company
  });
  req.body.technicalSkills.forEach((val) => isJob.technicalSkills.push(val));
  req.body.softSkills.forEach((val) => isJob.softSkills.push(val));
  await isJob.save()
  return res.json({ success: true, message: "job created successfully!" })
});


export const updateJob = asyncHandler(async (req, res, next) => {
  // check job in database
  const isJob = await Job.findById(req.params.id)
  if (!isJob) return next(new Error("job not found!"), { cause: 404 })
  if (req.user.id.toString() !== isJob.addedBy.toString()) return next("Not allowed to update!", { cause: 401 });
  const isCompany = await Company.findById(req.body.company)
  if (!isCompany) return next(new Error("not found company"), { cause: 404 })
  //update data
  isJob.jobTitle = req.body.jobTitle ? req.body.jobTitle : isJob.jobTitle;
  isJob.jobLocation = req.body.jobLocation ? req.body.jobLocation : isJob.jobLocation;
  isJob.workingTime = req.body.workingTime ? req.body.workingTime : isJob.workingTime;
  isJob.jobDescription = req.body.jobDescription ? req.body.jobDescription : isJob.jobDescription;
  isJob.seniorityLevel = req.body.seniorityLevel ? req.body.seniorityLevel : isJob.seniorityLevel;
  
  // create new array and push it in place of the old one
  let newTechnicalSkills = [];
  req.body.technicalSkills.map((val) => newTechnicalSkills.push(val));
  isJob.technicalSkills = newTechnicalSkills;
  
  let newSoftSkills = [];
  req.body.softSkills?.map((val) => newSoftSkills.push(val));
  isJob.softSkills = newSoftSkills
  // save new data
  await isJob.save()
  // send response
  return res.json({ success: true, message: "job updated successfully!" });
});

export const deleteJob = asyncHandler(async (req, res, next) => {
  // check job
  const isJob = await Job.findById(req.params.id);
  if (!isJob) return next(new Error("job not found"));
  //check owner
  if (req.user.id.toString() !== isJob.addedBy.toString()) return next(new Error("not allowed to delete"))
  
  // delete
  await isJob.deleteOne()
  //return response
  return res.json({
    success: true,
    message: "job deleted successfully!",
  });

});


export const allJob = asyncHandler(async (req, res, next) => {
  if (req.params.company) {
    const isCompany = await Company.findById(req.params.company)
    if (!isCompany) return next(new Error("company not found"))
    //all job certain company
    const result = await Job.find({ company: req.params.company });
    return res.json({ success: true, result })
  }
  const result = await Job.find().populate("company");
  return res.json({ success: true, result });

});
export const allJobWithCompany = asyncHandler(async (req, res, next) => {
  const result = await Company.find({ companyName: req.body.companyName}).populate("job");
  if(!result) return next(new Error("job company not found!" , {cause:404}))
  return res.json({ success: true, result })
});

export const allJobWithFilter = asyncHandler(async (req, res, next) => {
  
  const result = await Job.find({
    $or: [
      { jobTitle: req.body.jobTitle },
      { jobLocation: req.body.jobLocation },
      { workingTime: req.body.workingTime }, 
      {seniorityLevel:req.body.seniorityLevel},
    ],
  });
  return res.json({success:true , result})
});

//application

export const jobApply = asyncHandler(async (req, res, next) => {
  // check user
  const user = await User.findById(req.user.id)
  if (!user) return next(new Error("user not found", { cause: 404 }));

  
  const job = await Job.findById(req.params.jobId);
  if (!job) return next(new Error("job not found", { cause: 404 }));

  if(!req.file) return next(new Error("CV is required" , {cause:400}))
  
  //upload file
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.CLOUD_FOLDER_NAME}/cvJob`,
    }
  );
// save data       
  await Application.create({
    userId: req.user.id,
    jobId: req.params.jobId,
    userTechSkills: req.body.userTechSkills,
    userSoftSkills: req.body.userSoftSkills,
    userResume: { id: public_id, url: secure_url },
  });
  // return response
  return res.json({success:true , message:"apply successfully!" , result})
})




