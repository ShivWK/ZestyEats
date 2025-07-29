const nodemailer = require("nodemailer");

const sendMail = async (userEmail, text) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: "resend",
            pass: process.env.RESEND_API_KEY
        }
    });

    const mailOption = {
        from: "ZestyEats <zestyeats@shivendra.site>",
        to: userEmail,
        subject: "OTP from ZestyEats",
        text
    }

    return await transporter.sendMail(mailOption);
}

module.exports = sendMail;