import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcEngineering } from "react-icons/fc";
import { FaIdCard } from "react-icons/fa";
import "./profile.css";

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
    <div
      style={{
        padding: "13%",
        fontWeight: "bold",
        fontSize: "35px",
      }}
    >
      <p>
        <FaUserAlt />
        <span class="space"></span>
        {fullName}
      </p>
      <p>
        <MdEmail />
        <span class="space"></span>
        {cmuAccount}
      </p>
      <p>
        <FaIdCard /> <span class="space"></span>
        {studentId}
      </p>
      <p>
        <FcEngineering /> <span class="space"></span>
        {organizationName}
      </p>
      <p className="text-danger">{errorMessage}</p>
    </div>
  );
}
