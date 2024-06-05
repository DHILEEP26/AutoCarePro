import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./userProfile.css";
import backicon from "./assets/undo.png";
import lpageicon from "./assets/settings.png";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenticated = localStorage.getItem("authenticated") === "true";

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      setUsername(username);
      setPassword(password);

      try {
        const response = await axios.get(
          `https://autocarepro.onrender.com/api/userprofile/${username}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/status/${orderId}`, {
        status: "Canceled",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Canceled" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  if (!authenticated) {
    navigate("/Login");
    return (
      <div>
        <p>This page need Authentication,So login first!!</p>
        <a href="/Login">Login</a>
      </div>
    );
  } else {
    return (
      <Fragment>
        <header className="header-ppage">
          <div className="logo-ppage">
            <img src={lpageicon} alt="Company Icon" className="icon-ppage" />
            <h1 className="title-ppage">AUTOCAREPRO</h1>
          </div>
          <div className="login-ppage">
            <a href="/Home" title="User Login">
              <img
                src={backicon}
                alt="User Login"
                className="icon-button-ppage"
              />
            </a>
          </div>
        </header>
        <div className="img-container">
          <div className="orders-container-p">
            <br />
            <br />
            <div className="table-container-p">
              <table className="orders-table-p">
                <thead>
                  <tr>
                    <th>SERVICES ID</th>
                    <th>SERVICES NAME</th>
                    <th>AMOUNT</th>
                    <th>PRICE</th>
                    <th>PLACED DATE</th>
                    <th>STATUS</th>
                    <th>DELIVERED DATE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.service_id}</td>
                      <td>{order.service_name}</td>
                      <td>{order.amount}</td>
                      <td>{order.price}</td>
                      <td>{formatDate(order.date_placed)}</td>{" "}
                      <td>{order.status}</td>
                      <td>
                        {order.date_delivered &&
                          formatDate(order.date_delivered)}
                      </td>{" "}
                      <td>
                        {order.status === "Processing" && (
                          <button
                            onClick={() => handleStatusChange(order.id)}
                            className="button-p"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="personal-details-p">
            <h2>ACCOUNT DETAILS</h2>
            <p>
              <strong>USER NAME : </strong> {username}
            </p>
            <p>
              <strong>USER PASSWORD : </strong> {password}
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default UserProfile;
