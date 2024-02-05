const express = require("express");
const basicInfo = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
basicInfo.use(cookieParser());

basicInfo.get("/", async (req, res) => {
  const token = req.cookies["cmu-oauth-token"];

  if (typeof token !== "string") {
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      ok: true,
      cmuAccount: decoded.cmuAccount,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      studentId: decoded.studentId,
    });
  } catch (error) {
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
});

module.exports = basicInfo;
