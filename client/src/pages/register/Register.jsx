import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        navigate("/");
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
              placeholder="Your Name"
              value={name}
              required
              className="loginInput"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              required
              className="loginInput"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              value={password}
              required
              className="loginInput"
              type="password"
              minLength="3"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/")}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
