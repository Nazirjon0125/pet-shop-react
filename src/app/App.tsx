import React from "react";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
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

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Routes>
        <Route path="/products/*" element={<ProductsPage />}></Route>
        <Route path="/orders" element={<OrdersPage />}></Route>
        <Route path="/member-page" element={<UserPage />}></Route>
        <Route path="/help" element={<HelpPage />}></Route>
        <Route path="/" element={<Test />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
