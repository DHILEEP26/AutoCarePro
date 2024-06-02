import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Services from "./components/Meal/Services";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { useNavigate } from "react-router-dom";
function Home() {
  const [cartShown, setcartShown] = useState(false);
  const authenticated = localStorage.getItem("authenticated") === "true";

  const navigate = useNavigate();

  const cartShownHandler = () => {
    setcartShown(true);
  };

  const cartCloseHandler = () => {
    setcartShown(false);
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
      <div style={{ backgroundColor: "gray" }}>
        <CartProvider>
          {cartShown && <Cart onClose={cartCloseHandler} />}
          <Header onClick={cartShownHandler} />
          <main>
            <Services />
          </main>
        </CartProvider>
        <br></br>
      </div>
    );
  }
}

export default Home;
