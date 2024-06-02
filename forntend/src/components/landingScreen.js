import React from "react";
import "./landingScreen.css";
import settingsIcon from "./assets/settings.png";
import userIcon from "./assets/user.png";
import adminIcon from "./assets/mechanism.png";
import serviceImg from "./assets/service.jpg";
import teslaicon from "./assets/tesla.png";
import oilIcon from "./assets/oil.png";
import tyreicon from "./assets/tyre.png";
import Painting from "./assets/car-painting.jpg";
import OilCha from "./assets/lubrication.jpg";
import Overall from "./assets/maintenance.jpg";

const LandingScreen = () => {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src={settingsIcon} alt="Company Icon" className="icon" />
          <h1 className="title">AUTOCAREPRO</h1>
        </div>
        <div className="login">
          <a href="/Login" title="User Login">
            <img src={userIcon} alt="User Login" className="icon-button" />
          </a>
          <a href="/adminLogin" title="Admin Login">
            <img src={adminIcon} alt="Admin Login" className="icon-button" />
          </a>
        </div>
      </header>

      <main className="body">
        <section className="content-container">
          <div className="text-content">
            <div className="about">
              <h1 style={{ color: "#282c34" }}>ABOUT US</h1>
              <p>
                AutoCarePro is a comprehensive platform designed to streamline
                vehicle maintenance for both service providers and customers.
                Whether you're managing your own service shop or looking to book
                services conveniently, AutoCarePro has got you covered.
                <br />
                Our platform offers a wide range of features, including
                scheduling appointments, tracking maintenance history, receiving
                reminders for upcoming services, and accessing a network of
                trusted service providers. We prioritize user convenience and
                satisfaction, providing a seamless experience for all your
                vehicle maintenance needs.
                <br />
                Join AutoCarePro today and experience the future of automotive
                maintenance!
              </p>
            </div>

            <div className="services-container">
              <h2 style={{ color: "#282c34" }}>OUR SERVICES</h2>
              <div className="services">
                <div className="service">
                  <img
                    src={Painting}
                    alt="Service 1"
                    className="service-image"
                  />
                  <h3 style={{ color: "#282c34" }}>PAINTING</h3>
                </div>
                <div className="service">
                  <img src={OilCha} alt="Service 2" className="service-image" />
                  <h3 style={{ color: "#282c34" }}>OIL CHANGE</h3>
                </div>
                <div className="service">
                  <img
                    src={Overall}
                    alt="Service 3"
                    className="service-image"
                  />
                  <h3 style={{ color: "#282c34" }}>OVER ALL</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image">
            <img src={serviceImg} alt="Large Visual" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <h2 style={{ textAlign: "left" }}>Our Sponsors :</h2>
        <div className="footer-content">
          <div className="sponsors">
            <img src={teslaicon} alt="Tesla" className="sponsor" />
            <img src={oilIcon} alt="Bharat Petrolum" className="sponsor" />
            <img src={tyreicon} alt="C Tyres" className="sponsor" />
          </div>
          <div className="contact">
            <h3>Contact Us:</h3>
            <p>Phone: +91 9958674321</p>
            <p>Email: AutoCarePro441@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
