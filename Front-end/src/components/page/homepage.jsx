import "./sign-in.css";

export default function Homepage() {
  return (
    <div className="login-btn">
      <a href="http://localhost:3000/login">
        <button className="sign-in">Sign-in with CMU Account</button>
      </a>
    </div>
  );
}
