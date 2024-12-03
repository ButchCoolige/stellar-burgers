import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../storage/store';

interface ingredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: ingredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const getIngredients = createAsyncThunk<TIngredient[]>(
  'order/getIngredients',
  async () => {
    const data = await getIngredientsApi();

    return data;
  }
);

export const ingredientsSliсe = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch ingredients';
        state.loading = false;
      });
  }
});

export { getIngredients };

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectLoading = (state: RootState) => state.ingredients.loading;

export default ingredientsSliсe.reducer;
