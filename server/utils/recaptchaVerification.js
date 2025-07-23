// const fetch = require("node-fetch");
// const querystring = require("querystring");

const recaptchaVerification = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append('response', token)

    try {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        })

        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error in verification", err);
        return false;
    }
}

module.exports = recaptchaVerification;