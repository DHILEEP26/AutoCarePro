import React, { Fragment, useEffect, useState } from "react";
import hpageimg from "../assets/manipageimg.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import hpageicon from "../assets/settings.png";

const Header = (props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const atIndex = storedUsername.indexOf("@");
    if (atIndex !== -1) {
      setUsername(storedUsername.substring(0, atIndex));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("username");
    window.location.href = "/Login";
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <section className={classes["title-wrappers-hpage"]}>
        <div className={classes["logo-hpage"]}>
          <img src={hpageicon} alt="Company Icon" className={classes["icon-hpage"]} />
          <h1 className={classes["title-hpage"]}>AutoCarePro</h1>
        </div>
        </section>
        <div className={classes["header-buttons"]}>
          <a href="/UserProfile" alt='Your Profile' className={classes["profile-link"]}>{username}</a>
          
          <HeaderCartButton onClick={props.onClick} />
          <button className={classes["button-hp"]} onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={hpageimg} alt="All the iteams are ready" />
      </div>
    </Fragment>
  );
};
export default Header;
