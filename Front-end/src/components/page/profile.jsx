import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Profile(props) {
  const [fullName, setFullName] = useState("");
  const [cmuAccount, setCmuAccount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
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
          setCmuAccount(response.data.cmuAccount);
          setStudentId(response.data.studentId ?? "No Student Id");
          setOrganizationName(response.data.organizationName);
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

  return (
    <div style={{ padding: "17%" }}>
      <h1>Hi, {fullName}</h1>
      <p>{cmuAccount}</p>
      <p>{studentId}</p>
      <p>{organizationName}</p>
      <p className="text-danger">{errorMessage}</p>
    </div>
  );
}
