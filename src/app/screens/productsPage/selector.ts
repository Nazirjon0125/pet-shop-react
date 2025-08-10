/*  REDUX STORE orqali yuklangan oxirgi ma'lumotni qabul qilish*/
import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;

export const retrieveRestaurant = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.shop
);

export const retrieveChosenProduct = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.products
);
