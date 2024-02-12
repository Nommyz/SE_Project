import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../libs/firebase";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (email == "teacher@cmu.ac.th") {
        navigate("/teacherboard");
      } else {
        navigate("/studentboard");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.massage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="container">
        <label htmlFor="username">Email</label>
        <input ref={emailRef} type="email" name="username" required />

        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" name="password" required />

        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
