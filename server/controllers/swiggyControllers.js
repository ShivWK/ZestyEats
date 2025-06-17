const axios = require("axios");
// const asyncErrorHandler = require("./../utils/asyncErrorHandler");

const client = axios.create({
  headers: {
    "User-Agent": "Mozilla/5.0",
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.swiggy.com/",
    Origin: "https://www.swiggy.com",
  },
})

const asyncErrorHandler = func => {
  return (req, res, next) => {
    func(req, res, next).catch(err => {
      console.log("Failed to fetch", err);
      res.status(500).json({
        status: "failed",
        error: err.message || "Something went wrong",
      })
    })
  }
}

exports.homePageData = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Both lat and lng query parameters are required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await client.get(swiggyURL);

    const origin = req.headers.origin;
    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Swiggy Proxy Error:", error.message);
    res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
}

exports.addressRecommend = async (req, res) => {
  try {
    const { place_id } = req.query;

    if (!place_id) {
      return res
        .status(400)
        .json({ error: "place_id query parameter is required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place_id}`;

    const response = await client.get(swiggyURL);
    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Address Recommend Error:", error.message);
    res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
}

exports.addressAutoComplete = async (req, res) => {
  try {
    const { input } = req.query;

    if (!input) {
      return res
        .status(400)
        .json({ error: "Input query parameter is required" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${input}&types=`;

    const response = await client.get(swiggyURL);
    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Place Autocomplete Error:", error.message);
    res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
}

exports.addressFromCoordinates = async (req, res) => {
  try {
    const { lat1, lng1 } = req.query;

    if (!lat1 || !lng1) {
      return res.status(400).json({
        error: "Both lat and lng query parameters are required",
      });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${lat1}%2C${lng1}`;

    const response = await client.get(swiggyURL);
    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Address from Coordinates Error:", error.message);
    res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
}

exports.specificRestaurantData = async (req, res) => {
  const { lat, lng, id } = req.query;

  if (!lat || !lng || !id) {
    return res.status(400).json({
      error: "lat, lng and id are required",
    });
  }

  const mainUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await client.get(mainUrl);
    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Restaurant data can't be fetched: ", err.message);
    res.status(404).json({
      status: "failed",
      error: err.message,
    });
  }
}

exports.dishSearchData = async (req, res) => {
  const { lat, lng, restro_Id, searchTerm } = req.query;

  if (!lat || !lng || !restro_Id || !searchTerm) {
    return res.status(400).json({
      error: "lat, lng, restro_id and searchTerm are required",
    });
  }

  const searchUrl = `https://www.swiggy.com/dapi/menu/pl/search?lat=${lat}&lng=${lng}&restaurantId=${restro_Id}&isMenuUx4=true&query=${searchTerm}&submitAction=ENTER`;

  try {
    const response = await client.get(searchUrl);
    // console.log(response);
    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.log("Dish search data can't be fetched; ", err);
    res.status(404).json({
      status: "failed",
      error: err.message,
    });
  }
}

exports.specificFoodCategoryData = async (req, res) => {
  const { lat, lng, collection_id, tags } = req.query;

  if (!lat || !lng || !collection_id || !tags) {
    return res.status(400).json({
      error: "lat, lng, collection_id, and tags are required",
    });
  }

  const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collection_id}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

  try {
    const response = await client.get(swiggyUrl);
    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });
    res.status(200).json(response?.data);
  } catch (err) {
    console.log("Error occured:", err);
    res.status(404).json({
      status: "failed",
      error: err.message,
    });
  }
}

exports.searchHomeData = asyncErrorHandler(async (req, res, next) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      status: "fail",
      error: "Provide lat and lng"
    })
  }

  const swiggyUrl = "https://www.swiggy.com/dapi/landing/PRE_SEARCH";

  const result = await client.get(swiggyUrl, {
    params: {
      lat,
      lng
    }
  });

  return res.status(200).json(result?.data);
})




