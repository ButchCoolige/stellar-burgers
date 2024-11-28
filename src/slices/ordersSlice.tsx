import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersState {
    orders: TOrder[];
    loading: boolean;
    error: string | null;
  }
  
  export const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null
  };

  export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
  });

  export default ordersSlice.reducer;
