import * as reduxToolkit from '@reduxjs/toolkit';
import orderSlice from '../slices/orderSlice';
import userSlice from '../slices/userSlice';
import ingredientsSlice from '../slices/ingredientsSlice';
import ordersSlice from '../slices/ordersSlice';
import feedSlice from '../slices/feedSlice';

jest.mock('../slices/orderSlice', () => jest.fn(() => ({})));
jest.mock('../slices/userSlice', () => jest.fn(() => ({})));
jest.mock('../slices/ingredientsSlice', () => jest.fn(() => ({})));
jest.mock('../slices/ordersSlice', () => jest.fn(() => ({})));
jest.mock('../slices/feedSlice', () => jest.fn(() => ({})));

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  combineReducers: jest.fn() 
}));

describe('тест корневого редьюсера', () => {
  it('должен правильно комбинировать все редьюсеры', () => {    
    const fakeState = {
      order: { someData: 'order' },
      user: { someData: 'user' },
      ingredients: { someData: 'ingredients' },
      orders: { someData: 'orders' },
      feed: { someData: 'feed' }
    };
    
    const mockCombineReducers = jest.fn(() => () => fakeState);
    (reduxToolkit.combineReducers as jest.Mock).mockImplementation(
      mockCombineReducers
    );
 
    const { default: store } = require('./store');
   
    expect(reduxToolkit.combineReducers).toHaveBeenCalledWith({
      order: orderSlice,
      user: userSlice,
      ingredients: ingredientsSlice,
      orders: ordersSlice,
      feed: feedSlice
    });

    expect(store.getState()).toEqual(fakeState);
  });
});
