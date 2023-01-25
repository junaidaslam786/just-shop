import { createSlice } from '@reduxjs/toolkit'
import {
  userLogout,
  userLogin,
  registerUser,
  updateUserProfile,
  getUserDetails,
  getAllUsers
} from './userThunk'

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  users: [],
  loading: false,
  userToken,
  userInfo: null,
  error: null,
  success: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // user login
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.token
      state.error = null
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // user logout
    [userLogout.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload.userInfo
      state.userToken = payload.userToken
      state.error = null
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = ''
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.token
      state.error = null
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // update user profile
    [updateUserProfile.pending]: (state) => {
      state.loading = true
      state.error = null
      state.success = false
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.token
      state.error = null
      state.success = true
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.success = false
    },
    // get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userInfo.token = state.userToken
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.error = payload
    },
    // get all users details
    [getAllUsers.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getAllUsers.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.users = payload
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.error = payload
    },
  },
})

// export const {  } = userSlice.actions

export default userSlice.reducer
