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
        'Cookie': req.headers.cookie || '',
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