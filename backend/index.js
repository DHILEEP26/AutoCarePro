//Requirement:You must have Node.js in your System
//In 'backend' folder you Need to Install libraries
//first open the new terminal and give 'npm init' command and after that give 'npm i body-parser cors express mysql2' command in the terminal

const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nilavan@12", // Enter your DataBase password 
    database: "commandhq", // Enter the database name that your created by using script.py file
    connectionLimit: 10,
  });
  
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
    } else {
      console.log("Connected to database");
    }
  });


//USER SIDE SERVERS

  app.post("/api/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = `SELECT * FROM customer_info_login WHERE username = '${username}' AND password = '${password}'`;
  
    connection.query(query, [username, password], (err, result) => {
      if (err) {
        console.error("Error executing SQL query: " + err.message);
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
  
    const checkUsernameQuery =
      "SELECT * FROM customer_info_login WHERE username = ?";
    connection.query(checkUsernameQuery, [username], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Registration failed" });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: "Username already in use" });
      } else {
        const insertUserQuery =
          "INSERT INTO customer_info_login (username, password) VALUES (?, ?)";
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
    for (const cartItem of cartItems) {
      const { id, name, amount, price } = cartItem;
      const sql =
        "INSERT INTO orders (user_name, service_id, service_name, amount, price) VALUES (?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [username, id, name, amount, price],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Order insertion failed" });
          }
        }
      );
    }
  
    return res.status(200).json({ message: "Orders inserted successfully" });
  });


  app.get("/api/services", (req, res) => {
    const sqlGet = "SELECT * FROM available_services ";
    connection.query(sqlGet, (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });


  app.get('/api/userprofile/:username', (req, res) => {
    const username = req.params.username;
    if (!username) {
      return res.status(400).send('Username is required');
    }
  
    const query = "SELECT * FROM orders WHERE user_name = ?";
    connection.query(query, [username], (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).send('Server error');
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

//ADMIN SIDE SERVERS

app.post("/api/adminlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM admin_info WHERE admin_username = '${username}' AND admin_password = '${password}'`;

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error executing SQL query: " + err.message);
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



app.get('/api/admin/orders', (req, res) => {
  const query = "SELECT * FROM orders";
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});


app.put('/api/admin/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { status, date_delivered } = req.body;

  const query = "UPDATE orders SET status = ?, date_delivered = ? WHERE id = ?";
  connection.query(query, [status, date_delivered, orderId], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      return res.status(500).send('Server error');
    }
    res.send('Order updated successfully');
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});