import React from "react";
import { Routes, Route } from "react-router-dom";

import ChosenProduct from "./ChosenProduct";
import Products from "./Products";

export default function ProductsPage() {
  return (
    <div className="products-page">
      <Routes>
        <Route path=":productsId" element={<ChosenProduct />} />
        <Route path="" element={<Products />} />
      </Routes>
    </div>
  );
}
