// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000; // Use environment variable for port

// app.use(cors()); // Allow all origins
// app.use(express.json());

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Swiggy Proxy API is running. Use /api/swiggy-restaurants to fetch data.");
// });

// // Proxy for Swiggy API
// app.get("/api/swiggy-restaurants", async (req, res) => {
//   try {
//     const swiggyURL =
//       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8496217&lng=81.0072193&page_type=DESKTOP_WEB_LISTING";

//     const response = await axios.get(swiggyURL, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0',
//         'Accept': 'application/json',
//         'Accept-Language': 'en-US,en;q=0.9',
//         'Referer': 'https://www.swiggy.com/',
//         'Origin': 'https://www.swiggy.com',
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Swiggy Proxy Error:", error.message);
//     if (error.response) {
//       console.log("Status:", error.response.status);
//       console.log("Data:", error.response.data);
//     }
//     res.status(500).json({ error: "Failed to fetch from Swiggy API" });
//   }
// });

// // Handle 404 for undefined routes
// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

// app.listen(PORT, () => {
//   console.log(`Proxy server running on http://localhost:${PORT}`);
// });

// make Home API Dynamic

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Swiggy Proxy API is running. Use /api/swiggy-restaurants?lat=YOUR_LAT&lng=YOUR_LNG to fetch data.");
// });

// // Proxy for Swiggy API
// app.get("/api/swiggy-restaurants", async (req, res) => {
//   try {
//     const { lat, lng } = req.query;

//     // Validate that lat and lng are provided
//     if (!lat || !lng) {
//       return res.status(400).json({ error: "Both lat and lng query parameters are required" });
//     }

//     const swiggyURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

//     const response = await axios.get(swiggyURL, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0',
//         'Accept': 'application/json',
//         'Accept-Language': 'en-US,en;q=0.9',
//         'Referer': 'https://www.swiggy.com/',
//         'Origin': 'https://www.swiggy.com',
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Swiggy Proxy Error:", error.message);
//     if (error.response) {
//       console.log("Status:", error.response.status);
//       console.log("Data:", error.response.data);
//     }
//     res.status(500).json({ error: "Failed to fetch from Swiggy API" });
//   }
// });

// // Handle 404 for undefined routes
// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

// app.listen(PORT, () => {
//   console.log(`Proxy server running on http://localhost:${PORT}`);
// });

// Add search API too

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send(`
    Swiggy Proxy API is running. Available endpoints:
    <ul>
      <li>/api/swiggy-restaurants?lat=YOUR_LAT&lng=YOUR_LNG</li>
      <li>/api/place-autocomplete?input=SEARCH_TERM</li>
      <li>/api/address-recommend?place_id=PLACE_ID</li>
      <li>/api/address-from-coordinates??latlng=latitude%2Clongitude</li>
    </ul>
  `);
});

// Proxy for Swiggy restaurants API
app.get("/api/swiggy-restaurants", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Both lat and lng query parameters are required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await axios.get(swiggyURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.swiggy.com/',
        'Origin': 'https://www.swiggy.com',
      },
    });
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Swiggy Proxy Error:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurants data" });
  }
});

// New endpoint for place autocomplete
app.get("/api/place-autocomplete", async (req, res) => {
  try {
    const { input } = req.query;

    if (!input) {
      return res.status(400).json({ error: "Input query parameter is required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${input}&types=`;

    const response = await axios.get(swiggyURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.swiggy.com/',
        'Origin': 'https://www.swiggy.com',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Place Autocomplete Error:", error.message);
    res.status(500).json({ error: "Failed to fetch place suggestions" });
  }
});

app.get("/api/address-recommend", async (req, res) => {
  try {
    const { place_id } = req.query;
    
    if (!place_id) {
      return res.status(400).json({ error: "place_id query parameter is required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place_id}`;

    const response = await axios.get(swiggyURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.swiggy.com/',
        'Origin': 'https://www.swiggy.com',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Address Recommend Error:", error.message);
    res.status(500).json({ error: "Failed to fetch address recommendation" });
  }
});

app.get("/api/address-from-coordinates", async (req, res) => {
  try {
    const { lat1, lng1 } = req.query;
    
    if (!lat1 || !lng1) {
      return res.status(400).json({ 
        error: "Both lat and lng query parameters are required" 
      });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${lat1}%2C${lng1}`;

    const response = await axios.get(swiggyURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.swiggy.com/',
        'Origin': 'https://www.swiggy.com',
        'Cookie': '__SW=O0eWTlPnGwOjUkaIZw6DKGyTUbcUNfXA; _device_id=d1b12bfa-90a5-6675-3827-6e93ab5515c9; _gcl_au=1.1.92825078.1742806418; _swuid=d1b12bfa-90a5-6675-3827-6e93ab5515c9; application_name=; category=; x-channel=; _ot=REGULAR; _ga_YD063E4XCC=GS1.2.1745251713.1.0.1745251713.0.0.0; _ga_76P34S6XQ2=GS1.1.1745251712.1.1.1745251763.0.0.0; _ga_LK8E6WBG6G=GS1.1.1745251713.1.1.1745251763.0.0.0; fontsLoaded=1; _gid=GA1.2.1664181634.1746628755; _ga_X3K3CELKLV=GS2.1.s1746873571$o11$g1$t1746875630$j0$l0$h0; userLocation={%22lat%22:12.9715987%2C%22lng%22:77.5945627%2C%22address%22:%22Bengaluru%2C%20Karnataka%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _guest_tid=4216899c-4191-4e4c-b870-a0b833fa655e; _sid=kjc16afe-b8ad-4652-8119-07a155709b33; _gat_0=1; _ga=GA1.2.1598272018.1727292903; _ga_YE38MFJRBZ=GS2.1.s1746991189$o86$g1$t1746991207$j0$l0$h0; _ga_34JYJ0BCRN=GS2.1.s1746991190$o99$g1$t1746991208$j0$l0$h0',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Address from Coordinates Error:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch address from coordinates",
      details: error.message 
    });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});