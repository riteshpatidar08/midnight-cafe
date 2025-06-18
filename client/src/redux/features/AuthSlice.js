import { setCookie } from '../../../utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isLoading: false,
  authenticated : false ,
  name : null ,
  id : null ,
  role : null

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

    const verifyres = await fetch( 'http://localhost:3000/api/auth/verify', {
      method :'POST' ,
      credentials : 'include'
    })

    const  dataa = await verifyres.json()
     
     console.log(dataa)
    
    return { ...response.data, ...dataa };
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
        state.authenticated = action.payload.authenticated ;
        state.name = action.payload.name ;
        state.id = action.payload.id ;
        state.role =  action.payload.role ;
        setCookie('name' , action.payload.name)
        setCookie('id' , action.payload.id)
        setCookie('authenticated' , action.payload.authenticated)
        setCookie('role' , action.payload.role)

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
