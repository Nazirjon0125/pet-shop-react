import React from "react";
import "../css/app.css";
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

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Routes>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/orders" element={<OrdersPage />}></Route>
        <Route path="/member-page" element={<UserPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
