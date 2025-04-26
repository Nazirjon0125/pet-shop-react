import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
    { productName: "Cutlet", imagePath: "/img/cutlet.webp", productViews: 100, productPrice: 12 },
    { productName: "Kebab", imagePath: "/img/kebab.webp", productViews: 200, productPrice: 15 },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp", productViews: 200, productPrice: 15 },
    { productName: "Lavash", imagePath: "/img/lavash.webp", productViews: 100, productPrice: 17 },
    { productName: "lavash", imagePath: "/img/lavash.webp", productViews: 200, productPrice: 17 },
    { productName: "Cutlet", imagePath: "/img/cutlet.webp", productViews: 100, productPrice: 12 },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp", productViews: 200, productPrice: 15 },
    { productName: "Kebab", imagePath: "/img/kebab.webp", productViews: 100, productPrice: 15 },
];

export default function Products() {
    function setSearchText(value: string): void {
        throw new Error("Function not implemented.");
    }

    function searchProductHandler() {
        throw new Error("Function not implemented.");
    }

    function searchCollectionHandler(DISH: any): void {
        throw new Error("Function not implemented.");
    }

    function handleSort(arg0: string): void {
        throw new Error("Function not implemented.");
    }

    return <div className={"products"}>
        <Container>
            <Stack flexDirection="column" alignItems="center">
                <Stack className="avatar-big-box">
                    <Stack className="top-title">
                        <Box className="top-text">Burak Restaurant</Box>
                        <Box className="single-search">
                            <input
                                className="single-search-input"
                                placeholder="Type here"
                                // value={searchText}
                                type="text"
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                if (e.key === "Enter") searchProductHandler();
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="single-button-search"
                                onClick={searchProductHandler}
                            >
                                Search
                                <SearchIcon />
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
                <Stack className={"dishes-filter-section"}>
                    <Stack className={"dishes-filter-box"}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            className={"order"}
                            onClick={() => handleSort("new")}
                        >
                            New
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            className={"order"}
                            onClick={() => handleSort("price")}
                        >
                            Price
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            className={"order"}
                            onClick={() => handleSort("views")}
                        >
                            Views
                        </Button>
                    </Stack>
                </Stack>
                <Stack className={"list-category-section"}>
                    <Stack className="product-category">
                        <Button
                            variant="contained"
                            color={"primary"}
                            // onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                        >
                            Dish
                        </Button>
                        <Button
                            variant="contained"
                            color={"secondary"}
                        >
                            Salads
                        </Button>
                        <Button
                            variant="contained"
                            color={"secondary"}
                        >
                            Drink
                        </Button>
                        <Button
                            variant="contained"
                            color={"secondary"}
                        >
                            Desert
                        </Button>
                        <Button
                            variant="contained"
                            color={"secondary"}
                        >
                            Other
                        </Button>
                    </Stack>
                </Stack>
                <Stack className={"product-wrapper"}>
                    {products.length !== 0 ? (
                        products.map((product, index) => {
                            return (
                                <Stack key={index} className={"product-card"}>
                                    <Stack
                                        className={"product-img"}
                                        sx={{ backgroundImage: `url(${product.imagePath})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        }}
                                    >
                                        <div className={"product-sale"}>Normal size</div>
                                        <Button className={"shop-btn"}>
                                            <img 
                                                src={"/icon/shopping-cart.svg"} alt=""
                                                style={{  display: "flex" }}
                                            />
                                        </Button>
                                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                                            <Badge badgeContent={30} color="secondary">
                                                <RemoveRedEyeIcon 
                                                    sx={{ color:product. productViews === 0 ? "gray" : "white" }}
                                                />
                                            </Badge>
                                        </Button>
                                    </Stack>
                                    <Box className={"product-desc"}>
                                        <span className={"product-title"}>
                                            {product.productName}
                                        </span>
                                        <div className={"product-price"}>
                                            <MonetizationOnIcon />
                                            {product.productPrice}
                                        </div>
                                    </Box>
                                </Stack>
                            )
                        })
                    ) : (
                        <Box className="no-data">Products are not available !</Box>
                    )
                    }
                </Stack>
                <Stack className={"pagination-section"} spacing={2}>
                    <Pagination 
                        count={3}
                        color="secondary"
                        page={1}
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
                    />
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
                    width="1300" height="568"
                    referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Box>
            </Container>
        </div>
    </div>;
}