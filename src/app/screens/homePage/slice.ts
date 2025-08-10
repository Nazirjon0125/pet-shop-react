/* REDUX STORE ga ma'lumot yuklash */
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularAnimals: [],
  newAnimals: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularAnimals: (state, action) => {
      state.popularAnimals = action.payload; // backend data
    },
    setNewAnimals: (state, action) => {
      state.newAnimals = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularAnimals, setNewAnimals, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
