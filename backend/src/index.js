const express = require("express");
const app = express();
const port = 3001;
const modPacks = require('./modpacks/modpacks')


const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

app.get("/modpacks", (req, res) => {
  res.json(modPacks);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
