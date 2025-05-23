import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import UserPage from "./screens/userPage";
import OrdersPage from "./screens/orders";
import ProductsPage from "./screens/productsPage";
import HelpPage from "./screens/helpPage";
import HomeNavbar from "./components/header/HomeNavbar";
import OtherNavbar from "./components/header/OtherNavbar";
import Footer from "./components/footer";
import Test from "./screens/Test";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import { CartItem } from "../lib/types/search";

function App() {
  const location = useLocation();

  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>([currentCart]);

  /* HANDLERS */

  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems} />
      ) : (
        <OtherNavbar cartItems={cartItems} />
      )}
      <Routes>
        <Route
          path="/products/*"
          element={<ProductsPage onAdd={onAdd} />}
        ></Route>
        <Route path="/orders" element={<OrdersPage />}></Route>
        <Route path="/member-page" element={<UserPage />}></Route>
        <Route path="/help" element={<HelpPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
