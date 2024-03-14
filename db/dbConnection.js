import mongoose from "mongoose";


export const connectDb = async ()=> {
    return await mongoose.connect(process.env.CONNECTION_URL).then(() => {
        console.log("db connection running...");
    }).catch((err) => {
        console.log("fill in dbConnection " , err );
    })

}