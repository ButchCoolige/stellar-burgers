import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/storage/store';

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

const getFeed = createAsyncThunk<TFeedsResponse>('burger/getFeed', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.loading = false;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get feed';
      });
  }
});

export { getFeed };

export default feedSlice.reducer;

export const selectFeed = (state: RootState) => state.feed.feed;
export const selectLoading = (state: RootState) => state.feed.loading;
export const selectError = (state: RootState) => state.feed.error;
