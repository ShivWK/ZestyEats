export const aboutHeadings = ["About ZestyEats", "Purpose Behind ZestyEats", "Core Features", "Performance Optimizations", "Security Highlights", "Tech Stack", "User Role", "What I Learned"];

export const about = [
    {
        title: "About ZestyEats",
        description: `
        **ZestyEats** is a **full-stack**, production-grade food delivery web application inspired by platforms like Swiggy. It is built with a focus on real-world development practices, performance, and security — aimed at delivering a seamless and optimized food ordering experience to users.

        This project was created to strengthen my skills in full-stack web development, **API integration**, and **secure authentication**, while solving a real-world problem end-to-end.`
    },
    {
        title: "Purpose Behind ZestyEats",
        description: `
        The primary goal of ZestyEats is to simulate a **real-world e-commerce experience** in the food delivery domain. This app helped me deeply understand:
       
        - **RESTful API architecture** through self-built endpoints for users, cart, wishlist, and orders.

        - **Backend-to-frontend** data flow using modern React patterns.

        - **Secure user authentication** using JWT, CSRF tokens, HTTP-only cookies, OTP systems, and OAuth 2.0.

        - Building **scalable**, **responsive**, and **user-friendly** interfaces.
        
        It serves both as a learning platform and a demonstration of my software engineering capabilities.`
    },
    {
        title: "Core Features",
        description: `
        This app offers a variety of features to simulate a complete food delivery experience.
        
        - **Geolocation Access:** Fetch live location using the browser's Geolocation API.

        - **Autocomplete Search:** Debounced search for restaurants, dishes, and locations with intelligent suggestions.

        - **Cart, Wishlist & Orders:** Complete user flow including product management and ordering system.

        - **Sorting & Filtering:** Sort by veg/non-veg, delivery time, rating, etc.

        - **Login/Signup System:** With OTP verification and reCAPTCHA protection.

        - **Google OAuth 2.0:** One-click sign in/sign up using Google account.

        - **Session Management:** Using JWT and secure cookie storage.

        - **CSRF Protection:** Implemented using CSRF tokens to protect sensitive routes.

        - **Theme Switcher:** Toggle between light, dark, and system themes.

        - **Customer Support:** Reach us via email directly from the app.

        - **Proxy Server Integration:** Fetch data from Swiggy APIs securely by bypassing CORS via a custom backend proxy.`
    },
    {
        title: "Performance Optimizations",
        description: `
        ZestyEats is built to be fast and efficient:
        
        - **Code Splitting & Lazy Loading:** Improve load speed by deferring heavy components.

        - **Memoization:** Avoid unnecessary re-renders for smoother UX.

        - **Shimmer UI:** Display placeholders during API data fetch for better perceived performance.

        - **Smart Caching:**

            - Uses RTK Query to automatically cache API responses (default: 60s).

            - Previously visited location data is stored to avoid repeated network calls.

            - Searched locations are cached for quick recall.`
    },
    {
        title: "Security Highlights",
        description: `
        Security is a core focus area in ZestyEats, including:
                
        - **JWT-based** secure authentication with refresh token support.

        - **CSRF protection** using tokens stored in cookies.

        - **HTTP-only & SameSite** cookies to prevent XSS attacks.

        - Google **OAuth** login.

        - OTP-based signup with **reCAPTCHA** validation.`
    },

    {
        title: "Tech Stack",
        description: `
        ZestyEats is built using a **modern MERN-based tech stack** to ensure a responsive, scalable, and secure user experience. It combines powerful frontend tools with a robust backend and secure authentication mechanisms to deliver a real-world production-grade food delivery app.
        
        - **Frontend:** React, Redux Toolkit, React Router DOM, Tailwind CSS, RTK Query

        - **Backend:** Node.js, Express.js

        - **Database:** MongoDB (Mongoose)

        - **APIs:** RESTful APIs + proxy to Swiggy APIs.

        - **Auth:** JWT, OAuth 2.0, CSRF tokens, OTP system, cookies.

        - **Deployment:**
    
            - **Frontend:** [Vercel](https://vercel.com) 
            - **Backend:** [Render](https://render.com/)
        `
    },
    {
        title: "User Role",
        description: `
        ZestyEats is a user-centric platform. While there's no dedicated admin panel, the backend is fully developer-controlled with secure logic for every user interaction — from searching to placing an order.`
    },
    {
        title: "What I Learned",
        description: `
        This project deepened my understanding of:

        - Building secure, scalable REST APIs.

        - Managing auth flows with JWT, OAuth, and CSRF tokens.

        - Real - time geolocation and dynamic UI rendering.

        - Performance engineering: caching, debouncing, lazy loading.

        - Production - level backend architecture and deployment
        
        ZestyEats is more than just a clone — it's a demonstration of production-quality software engineering, combining frontend finesse with backend power, optimized UX, and robust security.`
    }
];

const base = {
    title: "",
    description: [],
    list: {
        mainList: [],
        subList: [],
    },
    lastDescription: []
}


// MarkDown 

export const techStackMarkdown = `
## Tech Stack

ZestyEats is built using a modern **MERN-based tech stack** to ensure a responsive, scalable, and secure user experience.  
It combines powerful frontend tools with a robust backend and secure authentication mechanisms to deliver a real-world production-grade food delivery app.

- **Frontend**: React, Redux Toolkit, React Router DOM, Tailwind CSS, RTK Query  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **APIs**: RESTful APIs + proxy to Swiggy APIs  
- **Auth**: JWT, OAuth 2.0, CSRF tokens, OTP system, cookies  
- **Deployment**:  
  - Frontend: Vercel  
  - Backend: Render
`;
