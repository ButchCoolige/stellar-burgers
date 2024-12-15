import { configureStore } from '@reduxjs/toolkit';
import feedReducer, { getFeed, initialState } from './feedSlice';
import { TFeedsResponse } from '@api';

const createTestStore = (preloadedState = initialState) =>
  configureStore({
    reducer: { feed: feedReducer }
  });

describe('тест feedSlice', () => {
  it('тест getFeed.pending', () => {  
    const store = createTestStore();    
    store.dispatch({ type: getFeed.pending.type });    
    const state = store.getState().feed;   
    expect(state.loading).toBe(true);   
    expect(state.error).toBe(null);
  });

  it('тест getFeed.fulfilled', () => {
    const store = createTestStore();
    // имитация  responce на запрос feed
    const mockFeedResponse: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Test Order',
          createdAt: '2024-08-09T12:34:56Z',
          updatedAt: '2024-08-09T12:34:56Z',
          number: 1,
          ingredients: ['ingredient1', 'ingredient2']
        }
      ],
      total: 100,
      totalToday: 10
    };
    // запуск getFeed в состоянии fulfilled
    store.dispatch({
      type: getFeed.fulfilled.type,
      payload: mockFeedResponse
    });

    const state = store.getState().feed;  
    expect(state.loading).toBe(false);   
    expect(state.feed).toEqual(mockFeedResponse);   
    expect(state.error).toBe(null);
  });

  it('тест getFeed.rejected', () => {
    const store = createTestStore();   
    const mockError = 'Cannot get feed';

    store.dispatch({
      type: getFeed.rejected.type,
      error: { message: mockError }
    });

    const state = store.getState().feed;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
