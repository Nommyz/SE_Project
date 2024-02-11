import "./sign-in.css";

export default function Homepage() {
  return (
    <div className="p-3 vstack gap-3">
      <h1>Sign-in using CMU OAuth Example</h1>
      <a href="/login">
        <button className="sign-in">Sign-in with CMU Account</button>
      </a>
    </div>
  );
}
