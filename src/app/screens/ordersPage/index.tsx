import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ProcessOrders from "./ProcessOrders";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import "../../../css/order.css";
import { Order } from "../../../lib/types/order";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  // Selector: Store => Data
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch()); // reduser
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-naw-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src="/icons/default-user.svg"
                  className="order-user-avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src="/icons/user-badge.svg"
                    className="order-user-prof-img"
                  />
                </div>
              </div>
              <span className="order-user-name">John</span>
              <span className="order-user-prof">User</span>
            </Box>
            <Box className="liner"></Box>
            <Box className="order-user-address">
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
                <div className="spec-address-txt">Do not exist</div>
              </div>
            </Box>
          </Box>

          <Box className="order-info-box">
            <Box className="member-box">
              <input
                type="text"
                className="card-input"
                placeholder="Card number : 1000 7335 4817"
              />
              <div>
                <input
                  type="text"
                  className="card-half-input"
                  placeholder="07/29"
                />
                <input
                  type="text"
                  className="card-half-input"
                  placeholder="CVV : 010"
                />
              </div>
              <input
                type="text"
                className="card-input"
                placeholder="John Johns"
              />
            </Box>

            <Box className="cards-box">
              <img src="/icons/visa-card.svg" alt="" />
              <img src="/icons/western-card.svg" alt="" />
              <img src="/icons/paypal-card.svg" alt="" />
              <img src="/icons/master-card.svg" alt="" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
