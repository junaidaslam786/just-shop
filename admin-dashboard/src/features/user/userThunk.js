import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendUrl = process.env.REACT_APP_BASE_URL;

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/api/users/login`,
        { email, password },
        config
      );
      localStorage.setItem('userToken', data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogout = createAsyncThunk('user/logout', () => {
  localStorage.removeItem('userToken');
  return {
    userToken: null,
    userInfo: null,
  };
});

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/users`,
        { name, email, password },
        config
      );
      localStorage.setItem('userToken', data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ id, name, email, password }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userToken },
      } = getState();
      const user = {
        id,
        name,
        email,
        password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.put(
        `${backendUrl}/api/users/profile`,
        user,
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { dispatch, getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // use token from user data object
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(
        `${backendUrl}/api/users/profile`,
        config
      );
      console.log('User details fetched:', data);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(userLogout());
      }
      return rejectWithValue(message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'users/list-users',
  async (arg, { dispatch, getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // use token from user data object
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(`${backendUrl}/api/users`, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(userLogout());
      }
      return rejectWithValue(message);
    }
  }
);
