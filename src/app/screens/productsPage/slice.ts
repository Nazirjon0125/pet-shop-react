/* REDUX STORE ga ma'lumot yuklash */
import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen";

const initialState: ProductPageState = {
  shop: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },

    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setShop, setChosenProduct, setProducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
