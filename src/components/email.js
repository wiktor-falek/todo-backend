import nodemailer from "nodemailer";
import dotenv from "dotenv"; dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
});

export const sendConfirmationEmail = (to, subject, text) => {
    let mailOptions = { to, subject, text };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Email sent: ${info.response}`);
    }
)}