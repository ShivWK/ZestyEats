export const aboutHeadings = [
  "Educational Use Disclaimer",
  "About ZestyEats",
  "Purpose Behind ZestyEats",
  "Core Features",
  "Performance Optimizations",
  "Security Highlights",
  "Tech Stack",
  "User Role",
  "What I Learned",
];

// 
// 

export const about = [
  {
    title: "Educational Use Disclaimer",
    description: [
      "<p>This application is created solely for educational, learning, and portfolio demonstration purposes.All content and data used here are fetched to replicate real - world scenarios for personal skill development.</p>",

      "<p>This project is <span style='font-weight: bold'>not affiliated with, endorsed by, or representing any real-world brand, company, or service.</span></p>",

      "<p> No data is used for commercial purposes, and no user information is collected or stored. If any data usage unintentionally violates any rights, please reach out via the contact section for immediate removal or correction.</p>",
    ],
  },
  {
    title: "About ZestyEats",
    description: [
      "<p><span style='font-weight: bold'>ZestyEats</span> is a <span style='font-weight: bold'>full-stack</span>, production-grade <span style='font-weight: bold'>online food delivery web application</span> inspired by platforms like Swiggy. It is built with a focus on real-world development practices, performance, and security — aimed at delivering a seamless and optimized food ordering experience to users.</p>",

      "<p>This project was created to strengthen my skills in full-stack web development, <span style='font-weight: bold'>API integration</span>, and <span style='font-weight: bold'>secure authentication</span>, while solving a real-world problem end-to-end.</p>",
    ],
  },

  {
    title: "Purpose Behind ZestyEats",
    description: [
      "<p>The primary goal of ZestyEats is to simulate a <span style='font-weight: bold'>real-world e-commerce experience</span> in the food delivery domain. This app helped me deeply understand:</p>",
    ],
    list: {
      mainList: [
        "<p><span style='font-weight: bold'>RESTful API architecture</span> through self-built endpoints for users, cart, wishlist, and orders.</p>",
        "<p><span style='font-weight: bold'>Backend-to-frontend</span> data flow using modern React patterns.</p>",
        "<p><span style='font-weight: bold'>Secure user authentication</span> using JWT, CSRF tokens, HTTP-only cookies, OTP systems, and OAuth 2.0.</p>",
        "<p>Building <span style='font-weight: bold'>scalable</span>, <span style='font-weight: bold'>responsive</span>, and <span style='font-weight: bold'>user-friendly</span> interfaces.</p>",
      ],
    },
    lastDescription: [
      "<p>It serves both as a learning platform and a demonstration of my software engineering capabilities.</p>",
    ],
  },
  {
    title: "Core Features",
    description: [
      "<p>This app offers a variety of features to simulate a complete food delivery experience.</p>",
    ],
    list: {
      mainList: [
        "<p><span style='font-weight: bold'>Geolocation Access:</span> Fetch live location using the browser's Geolocation API.</p>",
        "<p><span style='font-weight: bold'>Autocomplete Search:</span> Debounced search for restaurants, dishes, and locations with intelligent suggestions.</p>",
        "<p><span style='font-weight: bold'>Cart, Wishlist & Orders:</span> Complete user flow including product management and ordering system.</p>",
        "<p><span style='font-weight: bold'>Sorting & Filtering:</span> Sort by veg/non-veg, delivery time, rating, etc.</p>",
        "<p><span style='font-weight: bold'>Login/Signup System:</span> With OTP verification and reCAPTCHA protection.</p>",
        "<p><span style='font-weight: bold'>Google OAuth 2.0:</span> One-click sign in/sign up using Google account.</p>",
        "<p><span style='font-weight: bold'>Session Management:</span> Using JWT and secure cookie storage.</p>",
        "<p><span style='font-weight: bold'>CSRF Protection:</span> Implemented using CSRF tokens to protect sensitive routes.</p>",
        "<p><span style='font-weight: bold'>Theme Switcher:</span> Toggle between light, dark, and system themes.</p>",
        "<p><span style='font-weight: bold'>Proxy Server Integration:</span> Fetch data from Swiggy APIs securely by bypassing CORS via a custom backend proxy.</p>",
      ],
    },
  },

  {
    title: "Performance Optimizations",
    description: ["<p>ZestyEats is built to be fast and efficient:</p>"],
    list: {
      mainList: [
        "<p><span style='font-weight: bold'>Code Splitting & Lazy Loading:</span> Improve load speed by deferring heavy components.</p>",
        "<p><span style='font-weight: bold'>Memoization:</span> Avoid unnecessary re-renders for smoother UX.</p>",
        "<p><span style='font-weight: bold'>Shimmer UI:</span> Display placeholders during API data fetch for better perceived performance.</p>",
        "<p><span style='font-weight: bold'>Smart Caching:</span></p>",
      ],
      subList: [
        "<p>Uses RTK Query to automatically cache API responses (default: 60s).</p>",
        "<p>Previously visited location data is stored to avoid repeated network calls.</p>",
        "<p>Searched locations are cached for quick recall.</p>",
      ],
    },
  },

  {
    title: "Security Highlights",
    description: [
      "<p>Security is a core focus area in ZestyEats, including:</p>",
    ],
    list: {
      mainList: [
        "<p><span style='font-weight: bold'>JWT-based</span> secure authentication with refresh token support.</p>",
        "<p><span style='font-weight: bold'>CSRF protection</span> using tokens stored in cookies.</p>",
        "<p><span style='font-weight: bold'>HTTP-only & SameSite</span> cookies to prevent XSS attacks.</p>",
        "<p>Google <span style='font-weight: bold'>OAuth</span> login.</p>",
        "<p>OTP-based signup with <span style='font-weight: bold'>reCAPTCHA</span> validation.</p>",
      ],
    },
  },

  {
    title: "Tech Stack",
    description: [
      "<p>ZestyEats is built using a <span style='font-weight: bold'>modern MERN-based tech stack</span> to ensure a responsive, scalable, and secure user experience. It combines powerful frontend tools with a robust backend and secure authentication mechanisms to deliver a real-world production-grade food delivery app.</p>",
    ],
    list: {
      mainList: [
        "<p><span style='font-weight: bold'>Frontend:</span> React, Redux Toolkit, React Router DOM, Tailwind CSS, RTK Query</p>",
        "<p><span style='font-weight: bold'>Backend:</span> Node.js, Express.js</p>",
        "<p><span style='font-weight: bold'>Database:</span> MongoDB (Mongoose)</p>",
        "<p><span style='font-weight: bold'>APIs:</span> RESTful APIs + proxy to Swiggy APIs.</p>",
        "<p><span style='font-weight: bold'>Auth:</span> JWT, OAuth 2.0, CSRF tokens, OTP system, cookies.</p>",
        "<p><span style='font-weight: bold'>Deployment:</span></p>",
      ],
      subList: [
        "<p><span style='font-weight: bold'>Codebase:</span> <a style='color: blue; text-decoration: underline; font-weight: bold' href='https://github.com/ShivWK/ZestyEats.git'>GitHub Repo</a></p>",
        "<p><span style='font-weight: bold'>Frontend:</span> <a style='color: blue; text-decoration: underline; font-weight: bold' href='https://vercel.com'>Vercel</a></p>",
        "<p><span style='font-weight: bold'>Backend:</span> <a style='color: blue; text-decoration: underline; font-weight: bold' href='https://render.com'>Render</a></p>",
      ],
    },
  },

  {
    title: "User Role",
    description: [
      "<p>ZestyEats is a user-centric platform. While there's no dedicated admin panel, the backend is fully developer-controlled with secure logic for every user interaction — from searching to placing an order.</p>"
    ],
  },

  {
    title: "What I Learned",
    description: ["<p>This project deepened my understanding of:</p>"],
    list: {
      mainList: [
        "<p>Building secure, scalable REST APIs.</p>",
        "<p>Managing auth flows with JWT, OAuth, and CSRF tokens.</p>",
        "<p>Real time geolocation and dynamic UI rendering.</p>",
        "<p>Performance engineering: caching, debouncing, lazy loading.</p>",
        "<p>Production level backend architecture and deployment</p>",
      ],
    },
    lastDescription: [
      "<p>ZestyEats is more than just a clone, it's a demonstration of production-quality software engineering, combining frontend finesse with backend power, optimized UX, and robust security.</p>",
    ],
  },
];
