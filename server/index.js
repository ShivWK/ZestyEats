const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Allow all origins
app.use(express.json());

// Proxy for Swiggy API
app.get("/api/swiggy-restaurants", async (req, res) => {
  try {
    const swiggyURL =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8496217&lng=81.0072193&page_type=DESKTOP_WEB_LISTING";

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
    console.error("Swiggy Proxy Error:", error.message);
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to fetch from Swiggy API" });
  }
});

// 👇 This was missing!
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
