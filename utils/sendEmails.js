import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
    //sender

    const transporter = nodemailer.createTransport({
        host: "localhost",
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        }
    });

    //recevier

    const info = await transporter.sendMail({
        from: `"Search-Job Application"${process.env.EMAIL}`,
        to,
        subject,
        html,
    })

    if (info.rejected.length > 0) return false;
    return true;
};