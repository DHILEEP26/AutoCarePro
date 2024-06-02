require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "nilavan@12", // Make sure to use environment variables
  database: process.env.DB_NAME || "commandhq",
  connectionLimit: 10,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to AutoCarePro!');
});

// USER SIDE SERVERS

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM customer_info_login WHERE username = ? AND password = ?";

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Unauthorized" });
    }
  });
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  const checkUsernameQuery = "SELECT * FROM customer_info_login WHERE username = ?";
  connection.query(checkUsernameQuery, [username], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Registration failed" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Username already in use" });
    } else {
      const insertUserQuery = "INSERT INTO customer_info_login (username, password) VALUES (?, ?)";
      connection.query(insertUserQuery, [username, password], (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Registration failed" });
        }

        return res.status(200).json({ message: "Registration successful" });
      });
    }
  });
});

app.post("/api/orders", (req, res) => {
  const { cartItems, username } = req.body;
  const queries = cartItems.map(({ id, name, amount, price }) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO orders (user_name, service_id, service_name, amount, price) VALUES (?, ?, ?, ?, ?)";
      connection.query(sql, [username, id, name, amount, price], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });

  Promise.all(queries)
    .then(() => res.status(200).json({ message: "Orders inserted successfully" }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Order insertion failed" });
    });
});

app.get("/api/services", (req, res) => {
  const sqlGet = "SELECT * FROM available_services";
  connection.query(sqlGet, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
      return;
    }
    res.send(result);
  });
});

app.get("/api/userprofile/:username", (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query = "SELECT * FROM orders WHERE user_name = ?";
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

app.put("/api/status/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send("Status is required");
  }

  const query = "UPDATE orders SET status = ? WHERE id = ?";
  connection.query(query, [status, orderId], (err, results) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).send("Server error");
    }
    res.send("Order status updated successfully");
  });
});

// ADMIN SIDE SERVERS

app.post("/api/adminlogin", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM admin_info WHERE admin_username = ? AND admin_password = ?";

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Unauthorized" });
    }
  });
});

app.get("/api/admin/orders", (req, res) => {
  const query = "SELECT * FROM orders";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

app.put("/api/admin/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { status, date_delivered } = req.body;

  const query = "UPDATE orders SET status = ?, date_delivered = ? WHERE id = ?";
  connection.query(query, [status, date_delivered, orderId], (err, result) => {
    if (err) {
      console.error("Error updating order:", err);
      return res.status(500).send("Server error");
    }
    res.send("Order updated successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
