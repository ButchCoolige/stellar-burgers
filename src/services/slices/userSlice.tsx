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
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};
const getUser = createAsyncThunk<{ user: TUser }>('user/getUser', async () => {
  const data = await getUserApi();
  return data;
});
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
  async () => {
    const response = await logoutApi();
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export { getUser, regUser, loginUser, updateUser, logoutUser };

export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
