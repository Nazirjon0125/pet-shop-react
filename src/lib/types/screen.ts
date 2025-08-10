import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/* REACT APP STATE */

export interface AppRootState {
  homePage: HomePageState;
  productPage: ProductPageState;
  ordersPage: OrdersPageState;
}

/* HOME PAGE */
export interface HomePageState {
  popularAnimals: Product[];
  newAnimals: Product[];
  topUsers: Member[];
}

/* PRODUCT PAGE */
export interface ProductPageState {
  shop: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/* ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
