import { createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient } from "@utils-types";

interface BurgerState {
    cartItems: TConstructorIngredient[]; // ингредиенты в бургере
    loading: boolean;
    error: string | null;
  }

export const initialState: BurgerState = {
    cartItems: [],
    loading: false,
    error: null
  };

export const burgerSliсe = createSlice({
    name: 'burger',
  initialState,
  reducers: {}

});

export default burgerSliсe.reducer;
