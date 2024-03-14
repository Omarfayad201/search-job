import { Company } from "../../../db/models/company.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { isFound } from "../../middleware/validation.middleware.js";

export const createCompany = asyncHandler(async (req, res, next) => {
    // data
    
    await Company.create({
        companyName: req.body.companyName,
        description: req.body.description,
        industry: req.body.industry,
        address: req.body.address,
        numberOfCompany: req.body.numberOfCompany,
        companyEmail: req.body.companyEmail,
        companyHr: req.user.id
    });
    //return response
    return res.json({ success: true, message: "company created successfully!" });
});
export const updateCompany = asyncHandler(async (req, res, next) => {
    //check company in database
    const company = await Company.findById(req.params.id)
    if (!company) return next(new Error("company not found!", { cause: 404 }));
    
    //check company owner
    
    if (req.user.id.toString() !== company.companyHr.toString()) return next("Not allowed TO update!");

    // update

    company.companyName = req.body.companyName ? req.body.companyName : company.companyName
    company.companyEmail = req.body.companyEmail ? req.body.companyEmail : company.companyEmail
    company.description = req.body.description ? req.body.description : company.description
    company.address = req.body.address ? req.body.address : company.address

    await company.save();


    //return response
    return res.json({ success: true, message: "company updated successfully!" })
});
export const deleteCompany = asyncHandler(async (req, res, next) => {
    //check company
    const company = await Company.findById(req.params.id);
    if (!company) return next(new Error("company not found!", { cause: 404 }))

    isFound(company.companyHr);

    // delete company
    await company.deleteOne()

    //return response
    return res.json({ success: true, message: "company deleted successfully!" });
});
export const specificCompany = asyncHandler(async (req, res, next) => {
  //check company
  const company = await Company.findById(req.params.id);
  if (!company) return next(new Error("company not found!", { cause: 404 }));

  isFound(company.companyHr);


  //return response
  return res.json({ success: true, company });
});

export const getCompany = asyncHandler(async (req, res, next) => {
    const result = await Company.find();
    return res.json({ success: true, result})
})
