const nodemailer = require("nodemailer");

const sendMail = async (userEmail, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "OTP from ZestyEats",
        text
    }

    return await transporter.sendMail(mailOption);
}

module.exports = sendMail;