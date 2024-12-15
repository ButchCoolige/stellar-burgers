import { configureStore } from '@reduxjs/toolkit';
import ordersReducer, { getOrders, initialState } from './ordersSlice';

const mockOrders = [
  {
    _id: 1,
    status: 'done',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: []
  },
  {
    _id: 2,
    status: 'done',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 2,
    ingredients: []
  }
];

const createTestStore = (preloadedState = initialState) =>
  configureStore({
    reducer: { orders: ordersReducer }
  });

describe('тест ordersSlice', () => {
  it('тест getOrders.pending', () => {
    const store = createTestStore();
    store.dispatch({ type: getOrders.pending.type });
    const state = store.getState();
    expect(state.orders.loading).toBe(true);
    expect(state.orders.error).toBe(null);
  });

  it('тест getOrders.fulfilled', () => {
    const store = createTestStore();
    store.dispatch({ type: getOrders.fulfilled.type, payload: mockOrders });
    const state = store.getState();
    expect(state.orders.orders).toEqual(mockOrders);
    expect(state.orders.loading).toBe(false);
    expect(state.orders.error).toBe(null);
  });

  it('тест getOrders.rejected', () => {
    const store = createTestStore();
    const mockError = 'Cannot fetch orders';
    store.dispatch({
      type: getOrders.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState();
    expect(state.orders.loading).toBe(false);
    expect(state.orders.error).toBe(mockError);
  });
});
