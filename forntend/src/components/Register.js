import React, { Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./loginpage.css";
import axios from "axios";
import { toast } from "react-toastify";
import rpageicon from "./assets/settings.png";

const initial = {
  username: "",
  password: "",
};

const AddPage = () => {
  const [state, setState] = useState(initial);

  const { username, password } = state;

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      localStorage.setItem("authenticated", "true");
      navigate("/home");
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please provied the required value!");
    } else {
      if (!username.includes("@") || !password.trim().length > 6) {
        toast.error("Incorrect Password or Email Id!!");
      } else {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        try {
          const response = await axios.post(
            "https://autocarepro.onrender.com/api/register",
            { username, password }
          );

          if (response.status === 200) {
            handleLogin();
            toast.success("Registration successful");
          }
        } catch (error) {
          console.error("Error occurred during registration:", error);
          toast.error("UserName Already Exist!!!");
        }
        //     axios
        //     .post("http://localhost:5000/api/register", {
        //       username,
        //       password,
        //     })
        //     .then(() => {
        //       setState({ username: "", password: ""});
        //     })
        //     .catch((err) => toast.error(err.response.data));
        //   toast.success("Successfully Logged In");

        // setTimeout(() => handleLogin(), 500);
      }
    }
  };
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <Fragment>
      <header className="header-lpage">
        <div className="logo-lpage">
          <img src={rpageicon} alt="Company Icon" className="icon-lpage" />
          <h1 className="title-lpage">AutoCarePro</h1>
        </div>
      </header>
      <div className="container-lpage">
        <div className="wrapper-lpage">
          <h2 className="login-title">Register</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Your Email Id..."
                value={username || ""}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Creat Your Password..."
                value={password || ""}
                onChange={inputChangeHandler}
              />
            </div>
            <input type="submit" value={"Save"} className="btn" />
          </form>
          <div className="register-link">
            <p>
              Don't want to register{" "}
              <Link to="/Login" style={{ color: "#FFF", fontStyle: "italic" }}>
                Back
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AddPage;
