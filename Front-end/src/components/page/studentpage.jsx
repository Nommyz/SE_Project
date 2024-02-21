import React from "react";
import Navbar from "./navbar";
import Studentboard from "./studentboard";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function StudentPage() {
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/basicInfo", {
        params: {
          token: Cookies.get("cmu-oauth-token"),
        },
      })
      .then((response) => {
        if (response.data.ok) {
          setFullName(response.data.firstName + " " + response.data.lastName);
          setStudentId(response.data.studentId ?? "No Student Id");
        }
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

  const id = "1111";

  return (
    <div>
      <Navbar fullName={fullName} />
      <Studentboard studentId={studentId} />
    </div>
  );
}
