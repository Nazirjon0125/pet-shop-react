import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { CssVarsProvider } from "@mui/joy/styles";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.CAT,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useNavigate();

  useEffect(() => {
    console.log("Sending productCollection:", productSearch.productCollection);
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /* HANDLERS */
  const searchCollectionHandler = (collection: ProductCollection) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      productCollection: collection,
    }));
  };
  const searchOrderHandler = (order: string) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      order,
    }));
  };

  const searchProductHandler = () => {
    setProductSearch((prev) => ({
      ...prev,
      search: searchText,
    }));
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const chooseAnimalsHandler = (id: string) => {
    history(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection="column" alignItems="center">
          <Stack className="avatar-big-box">
            <Stack className="top-title">
              <Box className="top-text">Pets for Sale</Box>
              <Box className="single-search-big-box">
                <input
                  type="search"
                  className="single-search-input"
                  name="singleResearch"
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className="single-button-search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className={"list-category-section"}>
            <Stack className="product-category">
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.CAT
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.CAT)}
              >
                Cat
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DOG
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DOG)}
              >
                Dog
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.PARROT
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.PARROT)
                }
              >
                Parrot
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.HAMSTER
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.HAMSTER)
                }
              >
                Hamster
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.TURTLE
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.TURTLE)
                }
              >
                Turtle
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.FISH
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.FISH)}
              >
                Fish
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                Other
              </Button>
            </Stack>
          </Stack>
          <Stack className={"product-wrapper"}>
            <CssVarsProvider>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const date = new Date(product.createdAt);
                  const formatted = date.toLocaleString("uz-UZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.FISH
                      ? product.productSize
                      : product.productYear;
                  return (
                    <div key={product._id}>
                      <Card
                        onClick={() => chooseAnimalsHandler(product._id)}
                        className="card"
                        variant="outlined"
                        sx={{
                          minWidth: 300,
                          "--Card-radius": (theme) => theme.vars.radius.xs,
                        }}
                      >
                        <CardOverflow className="product-image-box">
                          <AspectRatio>
                            <img src={imagePath} alt="" loading="lazy" />
                          </AspectRatio>
                        </CardOverflow>
                        <CardContent
                          orientation="horizontal"
                          sx={{ alignItems: "center", mx: -1 }}
                        >
                          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                            <IconButton
                              variant="plain"
                              color="neutral"
                              size="sm"
                            >
                              <FavoriteBorder />
                            </IconButton>
                            <IconButton
                              variant="plain"
                              color="neutral"
                              size="sm"
                            >
                              <ModeCommentOutlined />
                            </IconButton>
                            <IconButton
                              variant="plain"
                              color="neutral"
                              size="sm"
                            >
                              <SendOutlined />
                            </IconButton>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              mx: "auto",
                            }}
                          ></Box>
                          <Box
                            sx={{
                              width: 0,
                              display: "flex",
                              flexDirection: "row-reverse",
                            }}
                          >
                            <IconButton
                              variant="plain"
                              color="neutral"
                              size="sm"
                            >
                              <BookmarkBorderRoundedIcon />
                            </IconButton>
                          </Box>
                        </CardContent>

                        <CardContent>
                          <Link
                            component="button"
                            underline="none"
                            textColor="text.primary"
                            sx={{ fontSize: "sm", fontWeight: "lg" }}
                          >
                            {product.productViews}{" "}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Link>

                          <Typography sx={{ fontSize: "sm" }}>
                            <Link
                              component="button"
                              color="neutral"
                              textColor="text.primary"
                              sx={{ fontWeight: "lg" }}
                            >
                              {product.productName}
                            </Link>{" "}
                            {product.productDesc}
                          </Typography>
                          <Link
                            component="button"
                            underline="none"
                            sx={{ fontSize: "sm", color: "text.tertiary" }}
                          >
                            {product.productStatus}
                          </Link>
                          <Link
                            component="button"
                            underline="none"
                            sx={{
                              fontSize: "10px",
                              color: "text.tertiary",
                              my: 0.5,
                            }}
                          >
                            {dayjs(product.createdAt).format(
                              "YYYY.MM.DD HH:mm"
                            )}
                          </Link>
                        </CardContent>
                        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                          <IconButton
                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: -1 }}
                          >
                            <Face />
                          </IconButton>
                          <Input
                            variant="plain"
                            size="sm"
                            placeholder="Add a comment…"
                            sx={{
                              flex: 1,
                              px: 0,
                              "--Input-focusedThickness": "0px",
                            }}
                          />
                          <Link disabled underline="none" role="button">
                            Post
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                    // <Stack key={product._id}>
                    //   <Stack
                    //     className={"product-img"}
                    //     sx={{
                    //       backgroundImage: `url(${imagePath})`,
                    //       backgroundRepeat: "no-repeat",
                    //       backgroundPosition: "center",
                    //       backgroundSize: "cover",
                    //     }}
                    //   >
                    //     <div className={"product-sale"}>{sizeVolume}</div>
                    //
                    //     <Button className={"view-btn"} sx={{ right: "36px" }}>
                    //       <Badge
                    //         badgeContent={product.productViews}
                    //         color="secondary"
                    //       >
                    //         <RemoveRedEyeIcon
                    //           sx={{
                    //             color:
                    //               product.productViews === 0 ? "gray" : "white",
                    //           }}
                    //         />
                    //       </Badge>
                    //     </Button>
                    //   </Stack>
                    //   <Box className={"product-desc"}>
                    //     <span className={"product-title"}>
                    //       {product.productName}
                    //     </span>
                    //     <div className={"product-price"}>
                    //       <MonetizationOnIcon />
                    //       {product.productPrice}
                    //     </div>
                    //   </Box>
                    // </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available !</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
      <div className={"brands-logo"}>
        <Box className="brand-text">Our Family Brands</Box>
        <Stack className="brand-cards">
          <Box className="brand-card">
            <img src="/img/gurme.webp" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/seafood.webp" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/sweets.webp" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/doner.webp" alt="" />
          </Box>
        </Stack>
      </div>
      <div className={"address"}>
        <Box className={"title"}>Our address</Box>
        <Container>
          <Box className="address-area">
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6919.797538763219!2d127.94381393396152!3d37.32495849246551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356375bf121c3f79%3A0x1eac894dee1c07c6!2sWonju%20City%20Central%20Library!5e0!3m2!1sen!2skr!4v1712350784388!5m2!1sen!2skr"
              width="1300"
              height="568"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Container>
      </div>
    </div>
  );
}
