import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const products = useMatch("products.productId");
  console.log("products", products);
  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProduct onAdd={onAdd} />} />
        <Route path="" element={<Products onAdd={onAdd} />} />
      </Routes>
    </div>
  );
}
