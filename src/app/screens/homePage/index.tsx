import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularAnimals from "./PopularAnimals";
import NewAnimals from "./NewAnimals";
import Advertisement from "./Advertisement";
import Events from "./Events";
import ActiveUsers from "./ActiveUsers";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewAnimals, setPopularAnimals, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularAnimals: (data: Product[]) => dispatch(setPopularAnimals(data)),
  setNewAnimals: (data: Product[]) => dispatch(setNewAnimals(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  // Selector: Store => Data
  const { setPopularAnimals, setNewAnimals, setTopUsers } = actionDispatch(
    useDispatch()
  ); // reduser

  useEffect(() => {
    // Backend server data request => Data
    const product = new ProductService();
    //CALL
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.CAT,
      })
      .then((data) => {
        // BACKEND DATA FETCH=> data
        setPopularAnimals(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.CAT,
      })
      .then((data) => {
        console.log("data passed here", data);
        setNewAnimals(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
    //Slice: Data => Store
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularAnimals />
      <NewAnimals />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
