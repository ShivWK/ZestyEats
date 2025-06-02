const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(500).send(`
    Swiggy Proxy API is running. Available endpoints:
    <ul>
      <li>/api/swiggy-restaurants?lat=YOUR_LAT&lng=YOUR_LNG</li>
      <li>/api/place-autocomplete?input=SEARCH_TERM</li>
      <li>/api/address-recommend?place_id=PLACE_ID</li>
      <li>/api/address-from-coordinates?latlng=latitude%2Clongitude</li>
    </ul>
  `);
});

app.get("/api/swiggy-restaurants", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Both lat and lng query parameters are required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await axios.get(swiggyURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Swiggy Proxy Error:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurants data" });
  }
});

app.get("/api/place-autocomplete", async (req, res) => {
  try {
    const { input } = req.query;

    if (!input) {
      return res
        .status(400)
        .json({ error: "Input query parameter is required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${input}&types=`;

    const response = await axios.get(swiggyURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Place Autocomplete Error:", error.message);
    res.status(500).json({ error: "Failed to fetch place suggestions" });
  }
});

app.get("/api/address-recommend", async (req, res) => {
  try {
    const { place_id } = req.query;

    if (!place_id) {
      return res
        .status(400)
        .json({ error: "place_id query parameter is required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place_id}`;

    const response = await axios.get(swiggyURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
    });

    res.status(200).json(response.data);
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
        error: "Both lat and lng query parameters are required",
      });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${lat1}%2C${lng1}`;

    const response = await axios.get(swiggyURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Address from Coordinates Error:", error.message);
    res.status(500).json({
      error: "Failed to fetch address from coordinates",
      details: error.message,
    });
  }
});

app.get("/api/specific-restaurants", async (req, res) => {
  const { lat, lng, id } = req.query;

  if (!lat || !lng || !id) {
    return res.status(400).json({
      error: "lat, lng and id are required",
    });
  }

  const mainUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await axios.get(mainUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error("Restaurant data can't be fetched: ", err.message);
    res.status(500).json({
      error: "Restaurant data can't be fetched",
      details: err.message
    })
  }
});

app.get("/api/dish-search", async (req, res) => {
  const {lat, lng, restro_id, searchTerm} = req.params;

  if (!lat || !lng || !restro_id || !searchTerm) {
    return res.status(400).json({
      error: "lat, lng, restro_id and searchTerm are required",
    })
  }

  const searchUrl = `https://www.swiggy.com/dapi/menu/pl/search?lat=${lat}&lng=${lng}&restaurantId=${restro_Id}&isMenuUx4=true&query=${searchTerm}&submitAction=ENTER`;

  try {
    const response = axios.get(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Origin: "https://www.swiggy.com",
      }
    })

    res.status(200).json(response.data);
  }catch (err) {
    console.log("Dish search data can't be fetched; ", err.message);
    res.status(404).json({
      error: "Dish search data can't be fetched",
      details: err.message,
    })
  }
})

// Catch All route middleware runs for endpoint which is not handled, no need to call next() because there is no middleware or route handler is present after it.

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
