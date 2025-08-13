import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewAnimals } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import {
  ProductCollection,
  ProductStatus,
} from "../../../lib/enums/product.enum";
import { CardContent } from "@mui/joy";
import dayjs from "dayjs";

/* REDUX SLICE & SELECTOR */
const newAnimalsRetriver = createSelector(retrieveNewAnimals, (newAnimals) => ({
  newAnimals,
}));

export default function NewAnimals() {
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
                  const sizeVolume =
                    product.productCollection === ProductCollection.FISH
                      ? product.productSize
                      : product.productYear;
                  const sale =
                    product.productStatus === ProductStatus.PROCESS
                      ? product.productStatus
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
