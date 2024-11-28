import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";

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
  
export const userSlice = createSlice({
    name: 'burger',
  initialState,
  reducers: {}

});

export default userSlice.reducer;
