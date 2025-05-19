import { Member } from "./member";
import { Product } from "./product";

/* REACT APP STATE */

export interface AppRootState {
  homePage: HomePageState;
  productPage: ProductPageState;
}

/* HOME PAGE */
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/* PRODUCT PAGE */
export interface ProductPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/* ORDERS PAGE */
