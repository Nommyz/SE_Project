import React from "react";
import Profile from "./profile";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/basicInfo", {
        params: {
          token: Cookies.get("cmu-oauth-token"),
        },
      })
      .then((response) => {
        setFullName(response.data.firstName + " " + response.data.lastName);
      })

      .catch((error) => {
        if (!error.response) {
          setErrorMessage(
            "Cannot connect to the network. Please try again later."
          );
        } else if (error.response.status === 401) {
          setErrorMessage("Authentication failed");
        } else if (error.response.data.ok === false) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Unknown error occurred. Please try again later");
        }
      });
  }, []);

  return (
    <div>
      <Navbar fullName={fullName} />
      <Profile></Profile>
    </div>
  );
}
