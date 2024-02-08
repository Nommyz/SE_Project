const express = require("express");
const login = express.Router();
require("dotenv").config();

login.get("/", async (req, res) => {
  res.redirect(process.env.NEXT_PUBLIC_CMU_OAUTH_URL);
});

module.exports = login;
