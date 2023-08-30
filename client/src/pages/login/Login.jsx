import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { useAuth } from "../../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth1", JSON.stringify(res.data));
        navigate("/recorder");
      } else {
        alert("Wrong Credentials");
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MERN_Recorder_App</h3>
          <span className="loginDesc">
            Capturing your moments has never been this easy and versatile! Using
            this app you have the power to record your screen activities, video,
            audio narrations, and more, all in one comprehensive app.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="3"
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Log in
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
