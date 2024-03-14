import { Token } from "../../db/models/token.model.js";
import { User } from "../../db/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt  from "jsonwebtoken";
export const isAuthenticated = asyncHandler(async (req, res, next) => {
    /// check token existence
    let token = req.headers["token"];
    // check bearer key
    if (!token || !token.startsWith(process.env.BEARER_KEY)) return next(new Error("valid token is required!"))
    
    // extract payload
    
    token = token.split(process.env.BEARER_KEY)[1]
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    //check token in db
    
    const tokenDb = await Token.findOne({ token, isValid: true });
    if (!tokenDb) return next(new Error("Token is invalid!"));
    
    //check user
    
    const user = await User.findById(payload.id)
    if (!user) return next(new Error("user not found!", { cause: 404 }));
    
    //pass user
    
    req.user = user

    return next()
    

})