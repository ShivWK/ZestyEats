const fetch = require("node-fetch");
const querystring = require("querystring");

const recaptchaVerification = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    try {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            body: querystring.stringify({
                secret,
                response: token
            })
        })

        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error in verification", err);
        return false;
    }
}

module.exports = recaptchaVerification;