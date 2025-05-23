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
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import Test from "./screens/Test";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  /* HANDLERS */
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
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

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}

export default App;
