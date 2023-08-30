import React from "react";
import "./topbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function TopBar() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth1");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">MERN_Recorder_App</span>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">{auth?.user?.name}</span>
          <NavLink
            to="/"
            style={{ textDecoration: "none", color: "#fff" }}
            onClick={handleLogout}
          >
            <span className="topbarLink">Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
