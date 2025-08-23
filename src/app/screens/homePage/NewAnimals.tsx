import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewAnimals } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import {
  ProductCollection,
  ProductStatus,
} from "../../../lib/enums/product.enum";
import { CardContent } from "@mui/joy";
import dayjs from "dayjs";
import { CartItem } from "../../../lib/types/search";
import { Dispatch } from "@reduxjs/toolkit";
import ProductService from "../../services/ProductService";
import { setNewAnimals } from "./slice";

/* REDUX SELECTOR */
const newAnimalsRetriver = createSelector(retrieveNewAnimals, (newAnimals) => ({
  newAnimals,
}));

interface NewAnimalsProps {
  onAdd: (item: CartItem) => void;
}

export default function NewAnimals(props: NewAnimalsProps) {
  const { onAdd } = props;
  const { newAnimals } = useSelector(newAnimalsRetriver);

  console.log("newAnimals", newAnimals);
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>
          <Stack className="card-frame">
            <CssVarsProvider>
              {newAnimals.length !== 0 ? (
                newAnimals.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const isSoldOut =
                    product.productStatus === ProductStatus.SOLDOUT;
                  const sizeVolume =
                    product.productCollection === ProductCollection.FISH
                      ? product.productSize
                      : product.productYear;
                  const sale =
                    product.productStatus === ProductStatus.PROCESS
                      ? "Sale"
                      : "sold out";
                  return (
                    <Card
                      className="card"
                      variant="outlined"
                      sx={{ width: 290 }}
                    >
                      <CardOverflow>
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
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
                              borderRadius: 1,
                            }}
                          >
                            SOLD OUT
                          </Box>
                        )}
                        <Box
                          className="shop-btn"
                          onClick={(e) => {
                            if (!isSoldOut) {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                              e.stopPropagation();
                            }
                          }}
                          sx={{
                            opacity: isSoldOut ? 0.4 : 1,
                            pointerEvents: isSoldOut ? "none" : "auto",
                          }}
                        >
                          <img src="/icons/shop.svg" alt="" />
                        </Box>
                      </CardOverflow>
                      <CardContent>
                        <Typography level="body-sm">
                          Counts: {product.productLeftCount}
                        </Typography>
                        <Typography level="title-md">
                          Name: {product.productName} {product.productPrice}$
                        </Typography>
                        <Typography level="title-md">Status: {sale}</Typography>
                      </CardContent>
                      <CardOverflow
                        variant="soft"
                        sx={{ bgcolor: "background.level1" }}
                      >
                        <CardContent orientation="horizontal">
                          <Typography
                            level="body-xs"
                            textColor="text.secondary"
                            sx={{ fontWeight: "md" }}
                          >
                            {product.productViews} views
                          </Typography>
                          <Divider orientation="vertical" />
                          <Typography
                            level="body-xs"
                            textColor="text.primery"
                            sx={{ fontWeight: "md" }}
                          >
                            {dayjs(product.createdAt).format(
                              "YYYY.MM.DD HH:mm"
                            )}
                          </Typography>
                        </CardContent>
                      </CardOverflow>
                    </Card>
                    // <Card
                    //   key={product._id}
                    //   variant="outlined"
                    //   className={"card"}
                    // >
                    //   <CardOverflow>
                    //     <div className="product-sale">{sizeVolume}</div>
                    //     <AspectRatio ratio="1">
                    //       <img src={imagePath} alt="" />
                    //     </AspectRatio>
                    //   </CardOverflow>

                    //   <CardOverflow variant="soft" className="product-detail">
                    //     <Stack className="info">
                    //       <Stack flexDirection={"row"}>
                    //         <Typography className="titel">
                    //           {product.productName}
                    //         </Typography>
                    //         <Divider width="2" height="25" bg="#d9d9d9" />
                    //         <Typography className={"price"}>
                    //           ${product.productPrice}
                    //         </Typography>
                    //       </Stack>
                    //       <Stack>
                    //         <Typography className="views">
                    //           {product.productViews}
                    //           <VisibilityIcon
                    //             sx={{ fontSize: 20, marginLeft: "5px" }}
                    //           />
                    //         </Typography>
                    //       </Stack>
                    //     </Stack>
                    //   </CardOverflow>
                    // </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not availabale!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
