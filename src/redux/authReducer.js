import { createSlice } from '@reduxjs/toolkit';
import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from './operation';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from 'config/toastConfig';

const initialState = {
  isLoading: false,
  error: null,
  userData: null,
  token: null,
  authentificated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      //------REGISTER-------
      .addCase(registerUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // toast.error(
        //   'Oops...., Your email address is already in use, please enter another email or go to the login page',
        //   {
        //     position: 'top-center',
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: 'colored',
        //   }
        // );
        toast('🦄 Wow so easy!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        // alert(
        //   'Oops...., Your email address is already in use, please enter another email or go to the login page'
        // );
      })
      // ----- LOGIN -----
      .addCase(loginUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        alert(
          'Oops...., something is error, check that the password and email are entered correctly' +
          '        ' +  action.payload
        );
      })
      // ----- REFRESH -----
      .addCase(refreshUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ----- LOGOUT -----
      .addCase(logoutUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = false;
        state.userData = null;
        state.token = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const selectUserLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectToken = state => state.auth.token;
export const selectUserData = state => state.auth.userData;
export const selectAuthentificated = state => state.auth.authentificated;

export const authReducer = authSlice.reducer;
