import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { linkWithCredential } from 'firebase/auth';

const initialState = {
  isLoading: false,
};

export const login = createAsyncThunk('loginAuth', async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/login',
      data,
      {
        withCredentials: true,
      }
    );

    const verifyres = await axios.post(
      'http://localhost:3000/api/auth/verify',
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {}
});
export const signup = createAsyncThunk('signAuth', async (data) => {
  try {
    const response = axios.post('http://localhost:3000/api/auth/signup', data);
    return response.data;
  } catch (error) {}
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default AuthSlice.reducer;
