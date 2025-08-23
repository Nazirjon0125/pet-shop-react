import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Message, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { T } from "../../../lib/types/common";
import { setProducts } from "../productsPage/slice";
import { retrieveProducts } from "../productsPage/selector";

/** REDUX SELECTORS **/
const pausedOrderRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const dispatch = useDispatch();
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrderRetriever);
  const { products } = useSelector(productsRetriever);

  /** REDUX ACTIONS **/
  const updateProductsStore = (newProducts: Product[]) => {
    dispatch(setProducts(newProducts));
  };

  /** HANDLERS **/

  // Delete order
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Message.error2);
      const orderId = e.target.value;
      const confirmation = window.confirm("Do you want to delete the order?");
      if (!confirmation) return;

      const orderService = new OrderService();
      await orderService.updateOrder({
        orderId,
        orderStatus: OrderStatus.DELETE,
      });

      setOrderBuilder(new Date());
    } catch (err) {
      console.error(err);
      sweetErrorHandling(err).then();
    }
  };

  // Buy product / decrement leftCount
  const handleBuyProduct = async (productId: string) => {
    try {
      const res = await fetch(`${serverApi}/product/decrement/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to decrement product");

      const updatedProduct: Product = await res.json();

      // Redux store update
      const newProducts = products.map((p: Product) =>
        p._id === updatedProduct._id ? updatedProduct : p
      );
      updateProductsStore(newProducts);

      console.log("Updated product:", updatedProduct);
    } catch (err) {
      console.error(err);
    }
  };

  // Process payment and decrement products
  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Message.error2);

      const orderId = e.target.value;
      const confirmation = window.confirm(
        "Do you want to proceed with payment?"
      );
      if (!confirmation) return;

      // 1️⃣ Update order status
      const orderService = new OrderService();
      await orderService.updateOrder({
        orderId,
        orderStatus: OrderStatus.PROCESS,
      });

      // 2️⃣ Decrement product leftCount for each item
      const order = pausedOrders.find((o) => o._id === orderId);
      if (order) {
        for (const item of order.orderItems) {
          await handleBuyProduct(item.productId);
        }
      }

      // 3️⃣ Refresh UI and switch tab
      setValue("2");
      setOrderBuilder(new Date());
    } catch (err) {
      console.error(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack spacing={2}>
        {pausedOrders?.length ? (
          pausedOrders.map((order: Order) => (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order.orderItems.map((item: OrderItem) => {
                  const product: Product = order.productData.find(
                    (ele: Product) => item.productId === ele._id
                  )!;
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const isSoldOut =
                    product.productStatus === "SOLD-OUT" ||
                    product.productLeftCount === 0;

                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img
                        src={imagePath}
                        className={"order-dish-img"}
                        style={{
                          filter: isSoldOut ? "grayscale(70%)" : "none",
                        }}
                      />
                      {isSoldOut && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 24,
                            fontWeight: "bold",
                          }}
                        >
                          SOLD OUT
                        </Box>
                      )}
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>
                        <img src={"/icons/close.svg"} />
                        <p>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>ProductPrice</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className={"cancel-button"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"pay-button"}
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Box display={"flex"} justifyContent={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
