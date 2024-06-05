import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "./adminLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apageicon from "./assets/settings.png";
import backicon from "./assets/undo.png";

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    try {
      localStorage.setItem("adminauthenticated", "true");
      navigate("/adminPage");
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please provied the required value!");
    } else {
      if (
        !formData.username.includes("@") ||
        !formData.password.trim().length > 6
      ) {
        toast.error("Invalid Email Id and Password!!");
      } else {
        if (isSubmitting) {
          return;
        }

        try {
          setIsSubmitting(true);

          const response = await axios.post(
            "https://autocarepro.onrender.com/api/adminlogin",
            formData
          );

          if (response.status === 200) {
            handleLogin();
            toast.success("Welcome!!");
          } else {
            if (response.status === 401) {
              toast.error("Authentication failed");
            }
          }
        } catch (error) {
          toast.error("Username or the password is incorrect", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <Fragment>
      <header className="header-apage">
        <div className="logo-apage">
          <img src={apageicon} alt="Company Icon" className="icon-apage" />
          <h1 className="title-apage">AUTOCAREPRO</h1>
        </div>
        <div className="login-apage">
          <a href="/" title="User Login">
            <img
              src={backicon}
              alt="User Login"
              className="icon-button-apage"
            />
          </a>
        </div>
      </header>
      <div className="container-apage">
        <div className="wrapper-apage">
          <h2 className="login-title">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn">
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminLogin;
