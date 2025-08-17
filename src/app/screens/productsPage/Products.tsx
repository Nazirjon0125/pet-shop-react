import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
          <Box className="top-title">Pets for Sale</Box>
          <Stack className={"animals-filter-box"}>
            <Stack className="category-box">
              <Button
                className="img-box"
                variant="contained"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.CAT
                      ? "#757575"
                      : "#237803",
                  color: "757575", // matn rangi
                  "&:hover": {
                    backgroundColor:
                      productSearch.productCollection === ProductCollection.CAT
                        ? "#237803"
                        : "#757575",
                  },
                }}
                onClick={() => searchCollectionHandler(ProductCollection.CAT)}
              >
                <img className="image" src="/icons/cats.png" alt="" />
                <p>Cat</p>
              </Button>
              <Button
                className="img-box"
                variant="contained"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.DOG
                      ? "#f57c00"
                      : "#9e9e9e",
                  color: "757575", // matn rangi
                  "&:hover": {
                    backgroundColor:
                      productSearch.productCollection === ProductCollection.DOG
                        ? "#ef6c00"
                        : "#757575",
                  },
                }}
                onClick={() => searchCollectionHandler(ProductCollection.DOG)}
              >
                <img className="image" src="/icons/dogs.png" alt="" />
                <p>Dog</p>
              </Button>
              <Button
                className="img-box"
                variant="contained"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.PARROT
                      ? "#f57c00"
                      : "#9e9e9e",
                  color: "757575", // matn rangi
                  "&:hover": {
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.PARROT
                        ? "#ef6c00"
                        : "#757575",
                  },
                }}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.PARROT)
                }
              >
                <img className="image" src="/icons/parrot.png" alt="" />
                <p>Parrot</p>
              </Button>
              <Button
                className="img-box"
                variant="contained"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.PARROT
                      ? "#f57c00"
                      : "#9e9e9e",
                  color: "757575", // matn rangi
                  "&:hover": {
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.PARROT
                        ? "#ef6c00"
                        : "#757575",
                  },
                }}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.HAMSTER)
                }
              >
                <img className="image" src="/icons/hamster.png" alt="" />
                <p>Hamster</p>
              </Button>
              <Button
                className="img-box"
                variant="contained"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.PARROT
                      ? "#f57c00"
                      : "#9e9e9e",
                  color: "757575", // matn rangi
                  "&:hover": {
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.PARROT
                        ? "#ef6c00"
                        : "#757575",
                  },
                }}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.TURTLE)
                }
              >
                <img className="image" src="/icons/turtle.png" alt="" />
                <p>Turtle</p>
              </Button>
              <Button
                className="img-box"
                variant="contained"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.PARROT
                      ? "#f57c00"
                      : "#9e9e9e",
                  color: "757575", // matn rangi
                  "&:hover": {
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.PARROT
                        ? "#ef6c00"
                        : "#757575",
                  },
                }}
                onClick={() => searchCollectionHandler(ProductCollection.FISH)}
              >
                <img className="image" src="/icons/fish.png" alt="" />
                <p>Fish</p>
              </Button>
              <Button
                className="img-box"
                variant="contained"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.PARROT
                      ? "#f57c00"
                      : "#9e9e9e",
                  color: "757575", // matn rangi
                  "&:hover": {
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.PARROT
                        ? "#ef6c00"
                        : "#757575",
                  },
                }}
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                <img className="image" src="/icons/dogs.png" alt="" />
                <p>Other</p>
              </Button>
            </Stack>
            <Stack className="filter-box">
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
                    <Stack key={product._id}>
                      <Card
                        onClick={() => chooseAnimalsHandler(product._id)}
                        className="product-card"
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
                          <Box
                            onClick={(e) => {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                              e.stopPropagation();
                            }}
                          >
                            <img src="/icons/shopping-card.svg" alt="" />
                          </Box>
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
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available !</Box>
              )}
            </CssVarsProvider>
          </Stack>
          <Stack className={"pagination-section"} spacing={2}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className={"brands-logo"}>
        <Box className="brand-text">Our Animals Family</Box>
        <Stack className="brand-cards">
          <Box className="brand-card">
            <img src="/img/others/6.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/others/7.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/others/9.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/others/8.jpg" alt="" />
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
