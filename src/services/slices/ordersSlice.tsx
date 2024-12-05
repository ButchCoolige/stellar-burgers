import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../storage/store';

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

const getOrders = createAsyncThunk<TOrder[]>('orders/getOrders', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  }
});

export default ordersSlice.reducer;
export { getOrders };
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectLoading = (state: RootState) => state.orders.loading;
