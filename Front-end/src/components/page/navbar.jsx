import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Logout from "./logout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  function Profile() {
    navigate("/profile");
  }

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
    <nav className="navbar bg-black">
      <div className="dropdown d-block" style={{ marginLeft: "auto" }}>
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {fullName}
        </button>
        <ul className="dropdown-menu" style={{ height: "5px" }}>
          <li>
            <button
              className="ml-5 btn btn-dark rounded-0"
              style={{ width: "165px" }}
              type="button"
              onClick={Profile}
            >
              Profile
            </button>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
}
