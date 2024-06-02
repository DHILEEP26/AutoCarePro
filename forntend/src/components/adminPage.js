import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./adminPage.css";
import apageicon from "./assets/settings.png";
import logouticon from "./assets/logout.png";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryDates, setDeliveryDates] = useState({});
  const authenticated = localStorage.getItem("adminauthenticated") === "true";

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleApprove = async (orderId) => {
    const dateDelivered = deliveryDates[orderId];
    if (!dateDelivered) {
      alert("Please enter a delivery date.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, {
        status: "Approved",
        date_delivered: dateDelivered,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: "Approved", date_delivered: dateDelivered }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("adminauthenticated", "false");
    navigate("/adminLogin");
  };

  const handleDateChange = (orderId, value) => {
    setDeliveryDates((prevDates) => ({
      ...prevDates,
      [orderId]: value,
    }));
  };

  if (!authenticated) {
    navigate("/adminLogin");
    return (
      <div>
        <p>This page needs authentication, so login first!!</p>
        <a href="/adminLogin">Login</a>
      </div>
    );
  } else {
    return (
      <Fragment>
        <header className="header-apage-ap">
          <div className="logo-apage-ap">
            <img src={apageicon} alt="Company Icon" className="icon-apage-ap" />
            <h1 className="title-apage-ap">AUTOCAREPRO</h1>
          </div>
          <div className="login-apage-ap">
            <a title="User Login" onClick={handleLogout}>
              <img src={logouticon} alt="User Login" className="icon-button-apage-ap" />
            </a>
          </div>
        </header>
        <div className="admin-container-ap">
          <br />
          <h1 style={{ color: "white" }}>All Orders</h1>
          <div className="table-container-ap">
            <div className="table-wrapper-ap">
              <table className="orders-table-ap">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMERS ID</th>
                    <th>SERVICE ID</th>
                    <th>SERVICE Name</th>
                    <th>AMOUNT</th>
                    <th>PRICE</th>
                    <th>DATE ORDER PLACED</th>
                    <th>DATE ORDER DELIVERED</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.user_name}</td>
                      <td>{order.service_id}</td>
                      <td>{order.service_name}</td>
                      <td>{order.amount}</td>
                      <td>{order.price}</td>
                      <td>{order.date_placed}</td>
                      <td>
                        <input
                          type="date"
                          value={deliveryDates[order.id] || ""}
                          onChange={(e) => handleDateChange(order.id, e.target.value)}
                          disabled={order.status !== "Processing"}
                        />
                      </td>
                      <td>{order.status}</td>
                      <td>
                        {order.status === "Processing" && (
                          <button onClick={() => handleApprove(order.id)} className="button-ap">
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default AdminPage;
