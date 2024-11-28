import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedState {
    feed: { orders: TOrder[]; total: number | null; totalToday: number | null };
    loading: boolean;
    error: string | null;
  }
  
  export const initialState: FeedState = {
    feed: { orders: [], total: null, totalToday: null },
    loading: false,
    error: null
  };

  export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
  });

  export default feedSlice.reducer;  
