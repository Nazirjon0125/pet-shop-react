import React from "react";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { UserPage } from "./screens/userPage";
import { OrdersPage } from "./screens/orders";
import { ProductsPage } from "./screens/productsPage";
import { HomeNavbar } from "./components/header/HomeNavbar";
import { OtherNavbar } from "./components/header/OtherNavbar";
import { Footer } from "./components/footer";
import { HelpPage } from "./screens/helpPage";
import "../css/app.css";
import "../css/navbar.css";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Routes>
        <Route path="/products" element={<ProductsPage />}></Route>
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
