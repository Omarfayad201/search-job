import express from 'express'
import { connectDb } from './db/dbConnection.js';
import dotenv from "dotenv";
import authRouter from "./src/modules/auth/auth.routes.js"
import companyRouter from "./src/modules/company/company.routes.js"
import jobRouter from "./src/modules/job/job.routes.js"
dotenv.config();
const app = express()
const port = process.env.PORT;
app.use(express.json())
//data base connection
await connectDb();

//routers
app.use("/auth", authRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
//page not found
app.all("*", (req, res, next) => {
    return next(new Error("page not found" , {cause:404}))
})

// global error handler
app.use((error, req, res, next) => {
    const statusCode = error.cause || 500
    return res.status(statusCode).json({success:false , message: error.message || error , stack : error.stack})
})

app.listen(port, () => console.log(`app listening on port ${port}!`))