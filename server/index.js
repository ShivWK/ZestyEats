const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const swiggyRouter = require("./routes/swiggyRouter");
const userRouter = require("./routes/userRouter");
// const userActivityRouter = require("./routes/"))

const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://swiggy-clone-beige-gamma.vercel.app",
  "https://zestyeats-beige-gamma.vercel.app"
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

mongoose.connect(process.env.MONGOOSE_URI)
.then(() => {
  console.log("Connected to MongoDB Atlas");
})
.catch((err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(1);
})

app.get("/", (req, res) => {
  res.status(500).send(`Swiggy Proxy API is running.`);
});

app.get("/api/server/wake-up", (req, res) => {
  console.log("Wake up call");
  res.status(200).json({
    status: "success",
    message: "I'm awake"
  })
})

app.use("/api/zestyeats", swiggyRouter);
app.use("/api/user", userRouter);

// Catch All route middleware runs for endpoint which is not handled, no need to call next() because there is no middleware or route handler is present after it.

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Proxy server running on ${PORT}`);
});
