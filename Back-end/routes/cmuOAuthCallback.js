const axios = require("axios").default;
const express = require("express");
const cmuOAuthCallback = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getCMUBasicInfoAsync(accessToken) {
  try {
    const response = await axios.get(process.env.CMU_OAUTH_GET_BASIC_INFO, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response.data;
  } catch (err) {
    return null;
  }
}

cmuOAuthCallback.get("/", async (req, res) => {
  const authorizationCode = req.query.code;

  if (typeof authorizationCode !== "string") {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid authorization code" });
  }

  try {
    const response = await axios.post(
      process.env.CMU_OAUTH_GET_TOKEN_URL,
      {},
      {
        params: {
          code: authorizationCode,
          redirect_uri: process.env.CMU_OAUTH_REDIRECT_URL,
          client_id: process.env.CMU_OAUTH_CLIENT_ID,
          client_secret: process.env.CMU_OAUTH_CLIENT_SECRET,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;

    if (!accessToken) {
      return res
        .status(400)
        .json({ ok: false, message: "Cannot get OAuth access token" });
    }

    const cmuBasicInfo = await getCMUBasicInfoAsync(accessToken);
    if (!cmuBasicInfo) {
      return res
        .status(400)
        .json({ ok: false, message: "Cannot get cmu basic info" });
    }

    //create session using cmubasicinfo (student name, student id, ...)
    if (typeof process.env.JWT_SECRET !== "string") {
      throw "Please assign jwt secret in .env!";
    }

    const token = jwt.sign(
      {
        cmuAccount: cmuBasicInfo.cmuitaccount,
        firstName: cmuBasicInfo.firstname_EN,
        lastName: cmuBasicInfo.lastname_EN,
        studentId: cmuBasicInfo.student_id, //Note that not everyone has this. Teachers and CMU Staffs don't have student id!
        organizationName: cmuBasicInfo.organization_name_EN,
        itaccounttypeId: cmuBasicInfo.itaccounttype_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token will last for one hour only
      }
    );

    res.cookie("cmu-oauth-token", token, {
      maxAge: 90000000, //millisecond
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.redirect(process.env.REDIRECT_TO_HOMEPAGE_URL);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = cmuOAuthCallback;
