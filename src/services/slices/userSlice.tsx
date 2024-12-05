import {
  getUserApi,
  registerUserApi,
  TRegisterData,
  TAuthResponse,
  loginUserApi,
  TLoginData,
  updateUserApi,
  TUserResponse,
  logoutApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../storage/store';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  user: TUser | null;
  loading: boolean;
  checked: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  checked: false,
  error: null
};
const getUser = createAsyncThunk<{ user: TUser }>('user/getUser', getUserApi);
const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (data) => {
    const response = await loginUserApi(data);
    return response;
  }
);
const regUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/regUser',
  async (regData) => {
    const response = await registerUserApi(regData);
    return response;
  }
);
const updateUser = createAsyncThunk<TUserResponse, Partial<TRegisterData>>(
  'user/updateUser',
  async (userData) => {
    const response = await updateUserApi(userData);
    return response;
  }
);
const logoutUser = createAsyncThunk<{ success: boolean }>(
  'user/logoutUser',
  logoutApi
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'An error during getting the user data';
      })
      .addCase(regUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(regUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'An error during user registration';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to logout user';
      });
  }
});

export { getUser, regUser, loginUser, updateUser, logoutUser };

export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
