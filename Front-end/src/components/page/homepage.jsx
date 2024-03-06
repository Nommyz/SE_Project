import "./sign-in.css";

export default function Homepage() {
  return (
    <div className="login-btn">
      {/*
      <h1
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "5rem",
          letterSpacing: "1.6rem",
          wordSpacing: "0px",
          color: "#000000",
          marginTop: "250px",
          fontWeight: "bolder",
          animation: "myAnim",
        }}
      >
        ACTREC
      </h1>
      */}
      {/*
      <p
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "1rem",
          letterSpacing: "0.34rem",
          wordSpacing: "0px",
          color: "#000000",
        }}
      >
        Connect Activitys , Skills , Achievements
      </p>
      */}
      <a href="http://localhost:3000/login">
        <button className="sign-in">Sign-in with CMU Account</button>
      </a>
    </div>
  );
}
