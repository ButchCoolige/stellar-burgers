import { TConstructorIngredient, TOrder } from '../../utils/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';
import { RootState } from '../storage/store';

interface BurgerState {
  Ingredients: TConstructorIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: BurgerState = {
  Ingredients: [],
  loading: false,
  error: null
};

const sendOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/sendOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data;
  }
);

export const orderSliсe = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.Ingredients = state.Ingredients.filter(
          (item) => item.type !== 'bun'
        );
      }
      state.Ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.Ingredients = state.Ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const currentIndex = state.Ingredients.findIndex(
        (item) => item.id === itemId
      );
      const newArray = [...state.Ingredients];
      const temp = newArray[currentIndex];
      newArray[currentIndex] = newArray[currentIndex - 1];
      newArray[currentIndex - 1] = temp;
      state.Ingredients = newArray;
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const currentIndex = state.Ingredients.findIndex(
        (item) => item.id === itemId
      );
      const newArray = [...state.Ingredients];
      const temp = newArray[currentIndex];
      newArray[currentIndex] = newArray[currentIndex + 1];
      newArray[currentIndex + 1] = temp;
      state.Ingredients = newArray;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.Ingredients = [];
        state.loading = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feed';
      });
  }
});

export default orderSliсe.reducer;

export { sendOrder };

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = orderSliсe.actions;

export const selectLoading = (state: RootState) => state.order.loading;
export const selectError = (state: RootState) => state.order.error;
export const selectIngredients = (state: RootState) => state.order.Ingredients;
