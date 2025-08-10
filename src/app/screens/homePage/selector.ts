/*  REDUX STORE orqali yuklangan oxirgi ma'lumotni qabul qilish*/
import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularAnimals = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularAnimals
);

export const retrieveNewAnimals = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newAnimals
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
