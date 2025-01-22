const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("<h2>Hello Worl</h2>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
