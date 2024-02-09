import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function Signout() {
    Cookies.remove("cmu-oauth-token");
    if (Cookies.get("cmu-oauth-token") === undefined) {
      navigate("/");
    } else {
      setErrorMessage("Cannot connect to the network. Please try again later.");
    }
  }

  return (
    <div className="p-3">
      <button className="btn btn-danger mb-3" onClick={Signout}>
        {errorMessage ? "Go back" : "Sign out"}
      </button>
      <p className="text-danger">{errorMessage}</p>
    </div>
  );
}
