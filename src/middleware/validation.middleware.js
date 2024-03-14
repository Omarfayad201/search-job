import { Types } from "mongoose";


export const isValidObjectId = (value,helper ) => {
    if (Types.ObjectId.isValid(value)) return true
    return helper.message("Invalid objectId");
}

export const validation = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };

        const validationResult = schema.validate(data, { abortEarly: false });
        
        if (validationResult.error) {
            const errorMassages = validationResult.error.details.map((errorObj) => errorObj.message);
            return next(new Error(errorMassages, { cause: 400 }))
        }
        return next();
    };
}

export const isFound = (val) => {
    return (req, res, next) => {
        if (req.user.id.toString() !== val.toString()) return next(new Error("Not allowed to Delete!", { cause: 401 }))
    }
}

