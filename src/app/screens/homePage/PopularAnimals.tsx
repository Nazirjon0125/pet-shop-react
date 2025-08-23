import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularAnimals } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductStatus } from "../../../lib/enums/product.enum";
import { CartItem } from "../../../lib/types/search";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularAnimals } from "./slice";
import ProductService from "../../services/ProductService";

import SearchIcon from "@mui/icons-material/Search";

/* REDUX SELECTOR */
const popularAnimalsRetriever = createSelector(
  retrievePopularAnimals,
  (popularAnimals) => ({ popularAnimals })
);

interface PopularAnimalsProps {
  onAdd: (item: CartItem) => void;
}

export default function PopularAnimals(props: PopularAnimalsProps) {
  const { onAdd } = props;
  const { popularAnimals } = useSelector(popularAnimalsRetriever);

  console.log("popularAnimals", popularAnimals);
  return (
    <div className={"popular-animals-frame"}>
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Animals</Box>
          <Stack className="card-frame">
            <CssVarsProvider>
              {popularAnimals.length !== 0 ? (
                popularAnimals.map((product: Product) => {
                  const isSoldOut =
                    product.productStatus === ProductStatus.SOLDOUT;
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <div key={product._id}>
                      <Card className={"card"}>
                        <CardCover>
                          <img src={imagePath} alt="" />
                        </CardCover>
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
                            e.stopPropagation();
                            if (!isSoldOut) {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                            }
                          }}
                          sx={{
                            position: "absolute",
                            zIndex: 10,
                            opacity: isSoldOut ? 0.4 : 1,
                            pointerEvents: isSoldOut ? "none" : "auto",
                            cursor: "pointer",
                          }}
                        >
                          <img src="/icons/shop.svg" alt="" />
                        </Box>

                        <CardCover className={"card-cover"} />
                        <CardContent sx={{ justifyContent: "flex-end" }}>
                          <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            <Typography
                              level="h2"
                              fontSize="lg"
                              textColor="fff"
                              mb={1}
                            >
                              {product.productName}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: "md",
                                color: "netural.300",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 25, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </CardContent>
                        <CardOverflow
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            py: 1.5,
                            px: "var(--Card-padding)",
                            borderTop: "1px solid",
                            height: "60px",
                          }}
                        >
                          <Typography
                            startDecorator={<DescriptionOutlinedIcon />}
                            textColor={"neutral.300"}
                          >
                            {product.productDesc}
                          </Typography>
                        </CardOverflow>
                      </Card>
                    </div>
                  );
                })
              ) : (
                <Box className="no-data">
                  Popular products are not availabale!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
