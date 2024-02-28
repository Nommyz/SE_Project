import Logout from "./logout";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  function Profile() {
    navigate("/profile");
  }

  return (
    <nav className="navbar bg-black">
      <div className="dropdown d-block" style={{ marginLeft: "auto" , paddingRight:"10px"}}>
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {props.fullName}
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
