import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  getUser,
  regUser,
  loginUser,
  updateUser,
  logoutUser,
  UserState,
  initialState
} from './userSlice';
import * as cookieUtils from '../../utils/cookie';

const mockUser = { email: 'john@example.com', name: 'John Doe' };

const createTestStore = (preloadedState = initialState) =>
  configureStore({
    reducer: { user: userReducer }
  });

describe('тест userSlice', () => {
  beforeAll(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };
    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('тест getUser.pending', () => {
    const store = createTestStore();
    store.dispatch({ type: getUser.pending.type });
    const state = store.getState();
    expect(state.user.loading).toBe(true);
    expect(state.user.error).toBe(null);
  });

  it('тест getUser.fulfilled', () => {
    const store = createTestStore();
    store.dispatch({
      type: getUser.fulfilled.type,
      payload: { user: mockUser }
    });
    const state = store.getState();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(null);
    expect(state.user.user).toEqual(mockUser);
  });

  it('тест getUser.rejected', () => {
    const store = createTestStore();
    const mockError = 'Failed to fetch user';
    store.dispatch({
      type: getUser.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(mockError);
  });

  it('тест regUser.pending', () => {
    const store = createTestStore();
    store.dispatch({ type: regUser.pending.type });
    const state = store.getState();
    expect(state.user.loading).toBe(true);
    expect(state.user.error).toBe(null);
  });

  it('тест regUser.fulfilled', () => {
    const setCookieMock = jest.fn();
    const deleteCookieMock = jest.fn();
    jest.spyOn(cookieUtils, 'setCookie').mockImplementation(setCookieMock);
    jest
      .spyOn(cookieUtils, 'deleteCookie')
      .mockImplementation(deleteCookieMock);

    const mockregUserResponse = {
      refreshToken: 'fakeRefreshToken',
      accessToken: 'fakeAccessToken',
      user: mockUser
    };

    const store = createTestStore();
    store.dispatch({
      type: regUser.fulfilled.type,
      payload: mockregUserResponse
    });

    const state = store.getState();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(null);
    expect(state.user.user).toEqual(mockUser);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'fakeRefreshToken'
    );
    expect(setCookieMock).toHaveBeenCalledWith(
      'accessToken',
      'fakeAccessToken'
    );

    jest.restoreAllMocks();
  });

  it('тест regUser.rejected', () => {
    const store = createTestStore();
    const mockError = 'Cannot register user';
    store.dispatch({
      type: regUser.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(mockError);
  });

  it('тест loginUser.pending', () => {
    const store = createTestStore();
    store.dispatch({ type: loginUser.pending.type });
    const state = store.getState();
    expect(state.user.loading).toBe(true);
    expect(state.user.error).toBe(null);
  });

  it('тест loginUser.fulfilled', () => {
    const setCookieMock = jest.fn();
    const deleteCookieMock = jest.fn();
    jest.spyOn(cookieUtils, 'setCookie').mockImplementation(setCookieMock);
    jest
      .spyOn(cookieUtils, 'deleteCookie')
      .mockImplementation(deleteCookieMock);

    const mockregUserResponse = {
      refreshToken: 'fakeRefreshToken',
      accessToken: 'fakeAccessToken',
      user: mockUser
    };
    const store = createTestStore();
    store.dispatch({
      type: regUser.fulfilled.type,
      payload: mockregUserResponse
    });
    const state = store.getState();

    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(null);
    expect(state.user.user).toEqual(mockUser);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'fakeRefreshToken'
    );
    expect(setCookieMock).toHaveBeenCalledWith(
      'accessToken',
      'fakeAccessToken'
    );

    jest.restoreAllMocks();
  });

  it('тест loginUser.rejected', () => {
    const store = createTestStore();
    const mockError = 'Cannot login user';
    store.dispatch({
      type: loginUser.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(mockError);
  });

  it('тест updateUser.pending', () => {
    const store = createTestStore();
    store.dispatch({ type: updateUser.pending.type });
    const state = store.getState();
    expect(state.user.loading).toBe(true);
    expect(state.user.error).toBe(null);
  });

  it('тест updateUser.fulfilled', () => {
    const mockregUserResponse = {
      user: { ...mockUser, name: 'John Doe' }
    };
    const store = createTestStore();
    store.dispatch({
      type: updateUser.fulfilled.type,
      payload: mockregUserResponse
    });
    const state = store.getState();

    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(null);
    expect(state.user.user).toEqual({
      email: 'john@example.com',
      name: 'John Doe'
    });
  });

  it('тест updateUser.rejected', () => {
    const store = createTestStore();
    const mockError = 'Cannot update user';
    store.dispatch({
      type: updateUser.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(mockError);
  });

  it('тест logoutUser.pending', () => {
    const store = createTestStore();
    store.dispatch({ type: logoutUser.pending.type });
    const state = store.getState();
    expect(state.user.loading).toBe(true);
    expect(state.user.error).toBe(null);
  });

  it('тест logoutUser.fulfilled', () => {    
    const setCookieMock = jest.fn();
    const deleteCookieMock = jest.fn();
    jest.spyOn(cookieUtils, 'setCookie').mockImplementation(setCookieMock);
    jest
      .spyOn(cookieUtils, 'deleteCookie')
      .mockImplementation(deleteCookieMock);
    
    setCookieMock('accessToken', 'fakeAccessToken');
    localStorage.setItem('refreshToken', 'fakeRefreshToken');

    const initialState = {
      user: mockUser,
      loading: false,
      checked: false,
      error: null
    };

    const store = createTestStore(initialState);

    store.dispatch({
      type: logoutUser.fulfilled.type
    });
    const state = store.getState();

    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(null);
    expect(state.user.user).toBe(null);

    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    expect(deleteCookieMock).toHaveBeenCalledWith('accessToken');

    jest.restoreAllMocks();
  });

  it('тест logoutUser.rejected', () => {
    const store = createTestStore();
    const mockError = 'Cannot logout user';
    store.dispatch({
      type: logoutUser.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState();
    expect(state.user.loading).toBe(false);
    expect(state.user.error).toBe(mockError);
  });
});
