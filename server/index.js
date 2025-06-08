const express = require("express");
const axios = require("axios");
const cors = require("cors");
const swiggyRouter = require("./routes/swiggyRouter");
const userRouter = require("./routes/userRouter");
// const userActivityRouter = require("./routes/")

const client = axios.create({
  headers: {
    "User-Agent": "Mozilla/5.0",
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.swiggy.com/",
    Origin: "https://www.swiggy.com",
  },
})

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://swiggy-clone-beige-gamma.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(500).send(`Swiggy Proxy API is running.`);
});

app.use("/api/swiggy", swiggyRouter);
app.use("/api/user", userRouter);

// Catch All route middleware runs for endpoint which is not handled, no need to call next() because there is no middleware or route handler is present after it.

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Proxy server running on https://swiggy-clone-klzu.onrender.com:${PORT}`);
});
