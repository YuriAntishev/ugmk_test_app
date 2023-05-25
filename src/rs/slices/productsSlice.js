/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  productsList: null,
  productsLoading: false,
  status: null,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.productsLoading = true;
    },
    productsSuccess: (state, action) => {
      state.productsLoading = false;
      state.productsList = action.payload;
      state.error = null;
    },
    productsFailure: (state, action) => {
      state.productsLoading = false;
      state.status = action.payload.status;
      state.error = action.payload.data;
    },
    clearState: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const getProducts = () => async (dispatch) => {
  dispatch(productsRequest());
  try {
    const { data } = await axios.get(`http://localhost:3001/products`);
    dispatch(productsSuccess(data));
  } catch (error) {
    error &&
      dispatch(
        productsFailure({
          status: error?.response?.status,
          data: error?.response?.data,
        })
      );
  }
};

export const { productsRequest, productsSuccess, productsFailure, clearState } =
  productsSlice.actions;

export const selectProductsList = (state) => state?.products?.productsList;

export const selectProductsLoading = (state) => state.products.productsLoading;

export default productsSlice.reducer;
