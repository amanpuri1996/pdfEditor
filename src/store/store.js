import { configureStore } from "@reduxjs/toolkit";
import flagReducer from "./flagSlice";

const store = configureStore({
    reducer: {

        flag: flagReducer,

    },
});
export default store;