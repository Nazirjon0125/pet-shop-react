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
import { T } from "../lib/types/common";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Message } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /* HANDLERS */
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: T) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLoguot = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Message.error1);
    }
  };

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
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLoguot={handleCloseLoguot}
          handleLogoutRequest={handleLogoutRequest}
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
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLoguot={handleCloseLoguot}
          handleLogoutRequest={handleLogoutRequest}
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
