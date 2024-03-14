import { Router } from "express";
import jobRouter from "./../job/job.routes.js"
import { validation } from "../../middleware/validation.middleware.js";
import * as companySchema from "./company.schema.js"
import * as companyController from "./company.controller.js"
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorization } from "../../middleware/authorization.middleware.js";
const router = Router()
router.use("/:company/job" , jobRouter)

router.post("",
    isAuthenticated,
    isAuthorization("companyHr"),
    validation(companySchema.createCompany),
    companyController.createCompany
);

router.patch("/:id",
    isAuthenticated,
    isAuthorization("companyHr"),
    validation(companySchema.updateCompany),
    companyController.updateCompany
);
router.delete("/:id",
    isAuthenticated,
    isAuthorization("companyHr"),
    validation(companySchema.deleteCompany),
    companyController.deleteCompany
);
router.get("/",
    isAuthenticated,
    isAuthorization("companyHr"),
    validation(companySchema.deleteCompany),
    companyController.deleteCompany
);
router.get(
  "/:id",
  isAuthenticated,
  isAuthorization("companyHr"),
  validation(companySchema.specificCompany),
  companyController.specificCompany
);
 router.get("allCompany" , companyController.getCompany )

export default router;
