import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendUrl = process.env.REACT_APP_BASE_URL;

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/products`)
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message
      } else {
        return error.message
      }
    }
  }
)

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/products/${id}`)
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message
      } else {
        return error.message
      }
    }
  }
)

// Create the async thunk
export const createProduct = createAsyncThunk('products/add-product', async ({
  user,
  name,
  dosageForm,
  packSize,
  image,
  sku,
  category,
  price,
  countInStock
}, {rejectWithValue}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post(`${backendUrl}/api/products`, {user,
      name,
      dosageForm,
      packSize,
      image,
      sku,
      category,
      price,
      countInStock}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
