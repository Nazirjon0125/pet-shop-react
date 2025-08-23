import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, MenuItem, Select, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import {
  ProductCollection,
  ProductStatus,
} from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "@mui/joy/Link";
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
    limit: 16,
    order: "createdAt",
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

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
    navigate(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection="column" alignItems="center">
          <Stack className="single-search-big-box">
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
              endIcon={<SearchIcon />}
              onClick={searchProductHandler}
            ></Button>
          </Stack>
          <Box className="top-title">Pets for Sale</Box>
          <Stack className={"animals-filter-box"}>
            <Stack className="category-box">
              <Button
                className="img-box"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.CAT
                      ? "#FF7043"
                      : "#e0b074",
                }}
                onClick={() => searchCollectionHandler(ProductCollection.CAT)}
              >
                <img className="image" src="/icons/cats.png" alt="" />
                <p className="animals-name">Cat</p>
              </Button>
              <Button
                className="img-box"
                sx={{
                  background:
                    productSearch.productCollection === ProductCollection.DOG
                      ? "#FF7043"
                      : "#84CD16",
                }}
                onClick={() => searchCollectionHandler(ProductCollection.DOG)}
              >
                <img className="image" src="/icons/dogs.png" alt="" />
                <p className="animals-name">Dog</p>
              </Button>
              <Button
                className="img-box"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.PARROT
                      ? "#FF7043"
                      : "#FFC0CB",
                }}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.PARROT)
                }
              >
                <img className="image" src="/icons/parrot.png" alt="" />
                <p className="animals-name">Parrot</p>
              </Button>
              <Button
                className="img-box"
                sx={{
                  backgroundColor:
                    productSearch.productCollection ===
                    ProductCollection.HAMSTER
                      ? "#FF7043"
                      : "#d9e3d7",
                }}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.HAMSTER)
                }
              >
                <img className="image" src="/icons/hamster.png" alt="" />
                <p className="animals-name">Hamster</p>
              </Button>
              <Button
                className="img-box"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.TURTLE
                      ? "#FF7043"
                      : "#19bcb6",
                }}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.TURTLE)
                }
              >
                <img className="image" src="/icons/turtle.png" alt="" />
                <p className="animals-name">Turtle</p>
              </Button>
              <Button
                className="img-box"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.FISH
                      ? "#FF7043"
                      : "#b5324c",
                }}
                onClick={() => searchCollectionHandler(ProductCollection.FISH)}
              >
                <img className="image" src="/icons/fish.png" alt="" />
                <p className="animals-name">Fish</p>
              </Button>
              <Button
                className="img-box"
                sx={{
                  backgroundColor:
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "#FF7043"
                      : "#9e9e9e",
                }}
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                <img className="image" src="/icons/rubbit.png" alt="" />
                <p className="animals-name">Other</p>
              </Button>
            </Stack>
            <Stack className="filter-box">
              <Select
                className="filter-select"
                value={productSearch.order}
                onChange={(e) => searchOrderHandler(e.target.value)}
              >
                <MenuItem className="selected" value="createdAt">
                  New
                </MenuItem>
                <MenuItem className="selected" value="productPrice">
                  Price
                </MenuItem>
                <MenuItem className="selected" value="productViews">
                  Views
                </MenuItem>
              </Select>
            </Stack>
          </Stack>
          <Stack className={"product-wrapper"}>
            <CssVarsProvider>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const date = new Date(product.createdAt);
                  const isSoldOut =
                    product.productStatus === ProductStatus.SOLDOUT;
                  const formatted = date.toLocaleString("uz-UZ", {
                    year: "numeric",
                    month: "numeric",
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
                        className="product-card"
                        variant="outlined"
                        sx={{
                          minWidth: 300,
                          position: "relative", // overlay chiqarish uchun
                          "--Card-radius": (theme) => theme.vars.radius.xs,
                        }}
                      >
                        <Stack
                          className="product-image-box"
                          sx={{ position: "relative" }}
                        >
                          <img
                            onClick={() => chooseAnimalsHandler(product._id)}
                            src={imagePath}
                            alt=""
                            loading="lazy"
                            style={{
                              filter: isSoldOut ? "grayscale(70%)" : "none",
                            }}
                          />
                          <div className={"product-sale"}>{sizeVolume}</div>

                          {/* Agar sold out bo‘lsa overlay chiqaramiz */}
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
                        </Stack>
                        <CardContent>
                          <Link
                            component="button"
                            underline="none"
                            textColor="text.primary"
                            sx={{ fontSize: "sm", fontWeight: "lg" }}
                          >
                            {" "}
                            {product.productViews}{" "}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />{" "}
                          </Link>
                          <Typography sx={{ fontSize: "sm" }}>
                            <Link
                              component="button"
                              color="neutral"
                              textColor="text.primary"
                              sx={{ fontWeight: "lg" }}
                            >
                              {product.productName}:
                            </Link>{" "}
                            {product.productDesc}
                          </Typography>
                          <Typography
                            justifyContent={"space-between"}
                            sx={{ fontSize: "sm" }}
                          >
                            <Link
                              component="button"
                              underline="none"
                              sx={{
                                fontSize: "sm",
                                color: "text.tertiary",
                                marginRight: 2,
                              }}
                            >
                              {isSoldOut ? "Status: Sold out" : "Status: Sale"}
                            </Link>{" "}
                            {product.productPrice}$
                          </Typography>
                          <Link
                            component="button"
                            underline="none"
                            sx={{
                              fontSize: "10px",
                              color: "text.tertiary",
                              my: 0.5,
                            }}
                          >
                            {formatted}
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
          <Box className="brand-video">
            <video autoPlay muted loop playsInline src="/video/pet.mp4" />
          </Box>
          <Box className="brand-card">
            <img src="/img/cat/catfamily.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/dog/dogfamily.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/fish/fishfamly.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/parrot/parrotfamily.jpg" alt="" />
          </Box>
          <Box className="brand-video">
            <video autoPlay muted loop playsInline src="/video/cat&boy.mp4" />
          </Box>
        </Stack>
      </div>
      <div className={"address"}>
        <Box className={"title"}>Our address</Box>
        <Container>
          <Box className="address-area">
            <iframe
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
