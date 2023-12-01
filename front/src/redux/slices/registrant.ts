import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  IRegistrant,
  SortDirection,
  SortColumnName,
  IRegistrantCart,
} from "../../type/type";

const initialState: {
  sortColumnName: SortColumnName;
  sortDirection: SortDirection;
  registrants: IRegistrant[];
  registrantsRepo: IRegistrant[];
  cart: Record<number, IRegistrantCart>;
  loading: boolean;
} = {
  sortColumnName: SortColumnName.title,
  sortDirection: SortDirection.ascending,
  registrantsRepo: [],
  registrants: [],
  cart: {},
  loading: false,
};

const registrantsSlice = createSlice({
  name: "registrants",
  initialState,
  reducers: {
    setRegistrantsRepo: (state, action: PayloadAction<IRegistrant[]>) => {
      state.registrantsRepo = action.payload;
    },
    setRegistrants: (state, action: PayloadAction<IRegistrant[]>) => {
      state.registrants = action.payload;
    },
    searchItem: (state, action: PayloadAction<string>) => {
      const regex = new RegExp(action.payload, "gi");
      state.registrants = state.registrantsRepo
        .filter((p) => regex.test(p.title) || regex.test(p.category.name))
        .slice(0, 10);
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    setSortColumn: (state, action: PayloadAction<SortColumnName>) => {
      state.sortColumnName = action.payload;
    },
    updateCart: (state, action: PayloadAction<IRegistrantCart>) => {
      if (state.cart[action.payload.registrant.id]) {
        delete state.cart[action.payload.registrant.id];
        toast("item removed from cart");
        return;
      }
      state.cart[action.payload.registrant.id] = action.payload;
      toast("item added to cart");
    },
    updateCartItemQty: (state, action: PayloadAction<IRegistrantCart>) => {
      state.cart[action.payload.registrant.id] = action.payload;
    },
    checkoutCart: (state) => {
      if (!Object.values(state.cart).length) {
        toast("cart is empty");
        return;
      }
      state.cart = {};
      toast("checkout successul");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const { actions: registrantStoreActions, reducer: registrantReducer } = registrantsSlice;

export { registrantStoreActions, registrantReducer };
