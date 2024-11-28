import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

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

  export const ingredientsSliсe = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
  });

  export default ingredientsSliсe.reducer;
