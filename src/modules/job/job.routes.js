import { Router } from "express";
import * as jobSchema from "./job.schema.js";
import * as jobController from "./job.controller.js"
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorization } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { fileUpload } from "../../../utils/fileUpload.js";
const router = Router({ mergeParams: true });

 router.post(
   "/:company",
   isAuthenticated,
   isAuthorization("companyHr"),
   validation(jobSchema.createJob),
   jobController.createJob
 );

 router.patch(
   "/:id",
   isAuthenticated,
   isAuthorization("companyHr"),
   validation(jobSchema.updateJob),
   jobController.updateJob
);
 
 router.delete(
   "/:id",
   isAuthenticated,
   isAuthorization("companyHr"),
   validation(jobSchema.deleteJob),
   jobController.deleteJob
);
 
router.get("/", jobController.allJob);

router.get(
  "/company",
  validation(jobSchema.allJobWithCompany),
  jobController.allJobWithCompany
);
router.get(
  "/filter",
  validation(jobSchema.allJobWithFilter),
  jobController.allJobWithFilter
);
router.post(
  "/apply/:jobId",
  isAuthenticated,
  isAuthorization("user"),
  fileUpload().single("pdf"),
  validation(jobSchema.jobApply),
  jobController.jobApply
);


export default router;
