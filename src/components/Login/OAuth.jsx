import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const OAuth = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    async function fetchIdToken() {
        console.log("Called")
    // const code = "4%2F0AVMBsJg9eXC5fqulggtQl0MAzQa4AsuJxOG_80D2WrHaOQ3elTGznG1vzlIDv8aCY80PSA";
    const clientId = "85933172238-ah6d3fr9r43oh77h3b9bkfmmhau05b2l.apps.googleusercontent.com";
    const clientSecret = "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";
    const redirect_uri = "http://localhost:5173"

    const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`

    const resp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload
    })
    const data = await resp.json();
    const userDataString = data["id_token"].split(".")[1];
    const userData = JSON.parse(atob(userDataString));

    console.log(data)
    console.log(userData);
  }

  useEffect(() => {
    console.log("Code from URL:", code);
    if(code) {
        fetchIdToken();
    }
  }, [code])


    return <>
        <Link
            to={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=85933172238-ah6d3fr9r43oh77h3b9bkfmmhau05b2l.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http://localhost:5173`}

            className="absolute mt-7 lg:mt-6 left-[50%] transform -translate-1/2 text-center font-semibold text-blue-500 cursor-pointer border-2 rounded-md px-3.5 py-1 active:scale-95 transition-all duration-150 ease-in-out bg-white dark:bg-black">
            <p className="whitespace-nowrap flex gap-2 items-center">
                Continue with{" "}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                >
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                </svg>
            </p>
        </Link>
        {/* <button onClick={fetchIdToken} className="bg-green-400 px-2 py-1.5 rounded text-white">click</button> */}
    </>
}

export default OAuth;

// `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=85933172238-ah6d3fr9r43oh77h3b9bkfmmhau05b2l.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http://localhost:5173`

//     `http://localhost:5173/?code=4%2F0AVMBsJimmZi9ZMPfFBIAA42AtRaqX2uTSVKTdk7EsllyN3JDwX5wyCmrSjDuA2vclmYYtw&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent`

// async function fetchIdToken() {
//     const code = "4%2F0AVMBsJimmZi9ZMPfFBIAA42AtRaqX2uTSVKTdk7EsllyN3JDwX5wyCmrSjDuA2vclmYYtw";
//     const clientId = "85933172238-ah6d3fr9r43oh77h3b9bkfmmhau05b2l.apps.googleusercontent.com";
//     const clientSecret = "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";
//     const redirect_uri = "http://localhost:5173"

//     const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`

//     const resp = await fetch("https://oauth2.googleapis.com/token", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: payload
//     })
//     const data = await resp.json();
//     console.log(data);
// }


// {
//     "access_token": "ya29.a0AS3H6NzwGwUftzjkdlnG2itpHiW_kdmurdwJRurvpwOFrces_g1no1owkV7PVFI-9cpwNj7xPaohcbMsbiLhjcrQLsbnvik83amYHafMzfTA07cpfOW8cwLE3hQnzuAo29Ne0my135ykGsppUXmzHPRHvt4bz848r6ew07NSaCgYKARwSARQSFQHGX2MiQiHhwiP7tbSk5uS25FXtNw0175",
//     "expires_in": 3599,
//     "scope": "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
//     "token_type": "Bearer",
//     "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MDljNTEzODc2OGY3Y2YyZTgyN2UwNGIyN2U3ZTRjYmM3YmI5MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NTkzMzE3MjIzOC1haDZkM2ZyOXI0M29oNzdoM2I5YmtmbW1oYXUwNWIybC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6Ijg1OTMzMTcyMjM4LWFoNmQzZnI5cjQzb2g3N2gzYjlia2ZtbWhhdTA1YjJsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MzAzNjIwNTM2MjQ1MzU3MzQ0IiwiZW1haWwiOiJzaGl2ZW5kcmF3a0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImM5aXBKZm1GdXRpTDdHbHJKdXUxX2ciLCJuYW1lIjoiU2hpdmVuZHJhIER3aXZlZGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSUFydDNpYmJoRXJmdFJ0X0M3VUdidUZ5QmZCb21VV0RZaWdkVGptY2RONnZUZTNEUT1zOTYtYyIsImdpdmVuX25hbWUiOiJTaGl2ZW5kcmEiLCJmYW1pbHlfbmFtZSI6IkR3aXZlZGkiLCJpYXQiOjE3NTM2MTkzNjUsImV4cCI6MTc1MzYyMjk2NX0.eAvyZs1nIzV6CUjT_25Pzdfyktfou737erE_lHGKzLjfenwRiVP31b1aMwJT4D8KkOH5lNJDshdaE00fP80xoy1jrwZIPlCLwqGmX-8m2FGLtE0suVzRH6QwTwfaEH9HQsTw_vwwLFhsAkzCfM88qpL3Wv5QUPDRblKeGwiVCRcXBuFDOxA0zH6mYH4XWZCmUNlNQKDvWQTsVzIQLyCfIwaa-zg1jeW3jt0oNVAS_fLC6PSchT7jeSEswyICnx_x6MEsXX2Pvo8mFa2F1l95VXtfCF8VGgtMQ25RFJ5weyvvVCxmE66tacc23kDGdkPBE1FgQ3kELhHRbsfEyq95qw"
// }