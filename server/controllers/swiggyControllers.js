const axios = require("axios");
const { JSDOM } = require("jsdom");
// const asyncErrorHandler = require("./../utils/asyncErrorHandler");

const client = axios.create({
  headers: {
    "User-Agent": "Mozilla/5.0",
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: process.env.BASE_URL,
    Origin: process.env.BASE_URL,
  },
});

const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      console.log("Failed to fetch", err);
      res.status(500).json({
        status: "failed",
        error: err.message || "Something went wrong",
      });
    });
  };
};

const missingParamsError = (msg, res) => {
  return res.status(400).json({
    status: "failed",
    message: msg,
  });
};

exports.homePageData = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Both lat and lng query parameters are required" });
    }

    const mainUrl = `${process.env.BASE_URL}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await client.get(mainUrl);

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
};

exports.addressRecommend = async (req, res) => {
  try {
    const { place_id } = req.query;

    if (!place_id) {
      return res
        .status(400)
        .json({ error: "place_id query parameter is required" });
    }

    const mainUrl = `${process.env.BASE_URL}/dapi/misc/address-recommend?place_id=${place_id}`;

    const response = await client.get(mainUrl);
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
};

exports.addressAutoComplete = async (req, res) => {
  try {
    const { input } = req.query;

    if (!input) {
      return res
        .status(400)
        .json({ error: "Input query parameter is required" });
    }

    const mainUrl = `${process.env.BASE_URL}/dapi/misc/place-autocomplete?input=${input}&types=`;

    const response = await client.get(mainUrl);
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
};

exports.addressFromCoordinates = async (req, res) => {
  try {
    const { lat1, lng1 } = req.query;

    if (!lat1 || !lng1) {
      return res.status(400).json({
        error: "Both lat and lng query parameters are required",
      });
    }

    const mainUrl = `${process.env.BASE_URL}/dapi/misc/address-recommend?latlng=${lat1}%2C${lng1}`;

    const response = await client.get(mainUrl);
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
};

exports.specificRestaurantData = asyncErrorHandler(async (req, res, next) => {
  const { lat, lng, id } = req.query;

  if (!lat || !lng || !id) {
    return res.status(400).json({
      error: "lat, lng and id are required",
    });
  }

  const mainUrl = `${process.env.BASE_URL}/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

  const response = await client.get(mainUrl);
  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  return res.status(200).json(response.data);
});

exports.dishSearchData = async (req, res) => {
  const { lat, lng, restro_Id, searchTerm } = req.query;

  console.log(lat, lng, restro_Id, searchTerm);

  if (!lat || !lng || !restro_Id || !searchTerm) {
    return res.status(400).json({
      error: "lat, lng, restro_id and searchTerm are required",
    });
  }

  const searchUrl = `${process.env.BASE_URL}/dapi/menu/pl/search?lat=${lat}&lng=${lng}&restaurantId=${restro_Id}&isMenuUx4=true&query=${searchTerm}&submitAction=ENTER`;

  console.log(searchUrl);

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
};

exports.specificFoodCategoryData = asyncErrorHandler(async (req, res) => {
  const { lat, lng, collection_id, tags } = req.query;

  if (!lat || !lng || !collection_id || !tags) {
    return res.status(400).json({
      error: "lat, lng, collection_id, and tags are required",
    });
  }

  const mainUrl = `${process.env.BASE_URL}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collection_id}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

  const response = await client.get(mainUrl);
  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  return res.status(200).json(response?.data);
});

exports.searchHomeData = asyncErrorHandler(async (req, res, next) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      status: "fail",
      error: "Provide lat and lng",
    });
  }

  const mainUrl = `${process.env.BASE_URL}/dapi/landing/PRE_SEARCH`;

  const result = await client.get(mainUrl, {
    params: {
      lat,
      lng,
    },
  });

  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  return res.status(200).json(result?.data);
});

exports.specificFoodSearchSuggestions = asyncErrorHandler(
  async (req, res, next) => {
    const { lat, lng, food } = req.query;

    if (!lat || !lng || !food) {
      return missingParamsError("Please provide lat , lng, and food", res);
    }

    const mainUrl = `${process.env.BASE_URL}/dapi/restaurants/search/suggest?trackingId=null&includeIMItem=true`;

    let response = await client.get(mainUrl, {
      params: {
        lat,
        lng,
        str: food,
      },
    });

    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });

    res.status(200).json(response.data);
  }
);

exports.extraSuggestionsData = asyncErrorHandler(async (req, res, nest) => {
  const { lat, lng, food } = req.query;

  if (!lat || !lng || !food) {
    return missingParamsError("Please provide lat , lng, and food", res);
  }

  const mainUrl =
    `${process.env.BASE_URL}/dapi/restaurants/search/v3?trackingId=null&submitAction=DEFAULT_SUGGESTION&queryUniqueId=14731ed6-27b3-ab73-ccc8-2c29158c3c5d`;

  let response = await client.get(mainUrl, {
    params: {
      lat,
      lng,
      str: food,
    },
  });

  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  res.status(200).json(response.data);
});

exports.suggestedDataHandler = asyncErrorHandler(async (req, res, next) => {
  const { lat, lng, str, metadata } = req.query;

  if (!lat || !lng || !str || !metadata) {
    return missingParamsError(
      "Please provide lat , lng, str and metadata",
      res
    );
  }

  const mainUrl =
    `${process.env.BASE_URL}/dapi/restaurants/search/v3?trackingId=b3988e37-6215-174a-2625-44876a86072b&submitAction=SUGGESTION&queryUniqueId=`;

  let response = await client.get(mainUrl, {
    params: {
      lat,
      lng,
      str,
      metadata,
    },
  });

  //https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=Pizza&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=56d33ab0-e59a-ddc7-a35a-f27cd23f4091&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A158220%2C%22primaryRestaurantId%22%3A1040462%2C%22cloudinaryId%22%3A%22RX_THUMBNAIL%2FIMAGES%2FVENDOR%2F2025%2F2%2F6%2F7edd818b-f30b-47d5-a2dd-ef74af7474ae_1040462.jpg%22%2C%22brandId%22%3A158220%2C%22dishFamilyId%22%3A%22846647%22%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D

  // https://swiggy-clone-klzu.onrender.com/api/zestyeats/suggested-data?lat=28.7040592&lng=77.10249019999999&str=Pizza&metadata=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A158220%2C%22primaryRestaurantId%22%3A1040462%2C%22cloudinaryId%22%3A%22RX_THUMBNAIL%2FIMAGES%2FVENDOR%2F2025%2F2%2F6%2F7edd818b-f30b-47d5-a2dd-ef74af7474ae_1040462.jpg%22%2C%22brandId%22%3A158220%2C%22dishFamilyId%22%3A%22846647%22%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D

  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  res.status(200).json(response.data);
});

exports.searchOnTabClick = asyncErrorHandler(async (req, res, next) => {
  const { lat, lng, str, submitAction, selectedPLTab } = req.query;

  if (!lat || !lng || !str || !submitAction || !selectedPLTab) {
    return missingParamsError("Please provide lat , lng, and ", res);
  }

  const mainUrl =
    `${process.env.BASE_URL}/dapi/restaurants/search/v3?trackingId=undefined&queryUniqueId=`;

  let response = await client.get(mainUrl, {
    params: {
      lat,
      lng,
      str,
      submitAction,
      selectedPLTab,
    },
  });

  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  res.status(200).json(response.data);
});

exports.cityLocalityCuisineCardHandler = asyncErrorHandler(
  async (req, res, next) => {
    const { city, type } = req.query;

    console.log("Hit", city, type, "citylocality")

    if (!city) {
      return missingParamsError("Please provide city or locality or cuisine type", res);
    }

    const mainUrl = `${process.env.BASE_URL}/city/${city}/${type ? type : ""}order-online`;

    console.log(mainUrl)

    const html = await client.get(mainUrl);
    const dom = new JSDOM(html.data);
    const scriptContent =
      dom.window.document.getElementById("__NEXT_DATA__")?.textContent;

    if (!scriptContent) {
      throw new Error("Script tag with restaurants data not found.");
    }

    const restaurantData = JSON.parse(scriptContent);

    const origin = req.headers.origin;

    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET",
    });

    res.status(200).json(restaurantData);
  }
);

exports.restaurantChainInCityHandler = asyncErrorHandler(async (req, res, next) => {
  const { city, restaurant } = req.query;
  console.log("hit", restaurant, city);

  if (!city || !restaurant) return missingParamsError("Please provide city and restaurant name", res);
  
  const mainUrl = `${process.env.BASE_URL}/city/${city}/${restaurant}`;

  const html = await client.get(mainUrl);
  const dom = new JSDOM(html.data);
  const scriptContent =
    dom.window.document.getElementById("__NEXT_DATA__")?.textContent;

  if (!scriptContent) {
    throw new Error("Script tag with restaurants data not found.");
  }

  const restaurantData = JSON.parse(scriptContent);

  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  res.status(200).json(restaurantData);
});

exports.dishesInCityHandler = asyncErrorHandler(async (req, res, next) => {
  const { city, dish } = req.query;
  console.log("hit", dish, city);

  if (!city || !dish) return missingParamsError("Please provide city and dish", res);
  
  const mainUrl = `${process.env.BASE_URL}/city/${city}/${dish}-dish-restaurants`;

  const html = await client.get(mainUrl);
  const dom = new JSDOM(html.data);
  const scriptContent =
    dom.window.document.getElementById("__NEXT_DATA__")?.textContent;

  if (!scriptContent) {
    throw new Error("Script tag with restaurants data not found.");
  }

  const restaurantData = JSON.parse(scriptContent);

  const origin = req.headers.origin;

  res.set({
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET",
  });

  res.status(200).json(restaurantData);
});

// Near me URL: https://www.swiggy.com/city/delhi/american-cuisine-order-online
// https://www.swiggy.com/city/mumbai/chilli-chicken-dish-restaurants