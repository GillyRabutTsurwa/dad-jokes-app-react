import { configureStore } from "@reduxjs/toolkit";
import jokesReducer from "./modules/jokes/jokesSlice";
const store = configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});

export default store;
