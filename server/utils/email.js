const  { Resend } = require("resend");

const sendMail = async (userEmail, text) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const send = resend.send({
        from: "ZestyEats <zestyeats@shivendra.site>",
        to: userEmail,
        subject: "OTP from ZestyEats",
        html: text
    })

    return await send;
}

module.exports = sendMail;