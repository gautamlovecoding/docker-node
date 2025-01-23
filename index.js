const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb://docker:password@mongo:27017/?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/", (req, res) => {
    res.send("<h2>Hello World</h2>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
