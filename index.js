const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_PASSWORD,
  MONGO_USER,
} = require("./config/config");
dotenv.config();

const postRouter = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;

const connectWithRetry = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h2>Hello World</h2>");
});

app.use("/api/v1/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
