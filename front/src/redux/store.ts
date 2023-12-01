import { configureStore } from "@reduxjs/toolkit";
import textColorReducer from "./slices/textColor";
import { registrantReducer } from "./slices/registrant";

const store = configureStore({
  reducer: {
    registrant: registrantReducer,
    color: textColorReducer,
    registrants: registrantReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
