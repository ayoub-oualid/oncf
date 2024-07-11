import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const initialState = {
  collabs: [],
  loading: false,
  error: null,
};

const collabSlice = createSlice({
  name: 'collabs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCollabs.fulfilled]: (state, { payload }) => {
      state.collabs = payload;
      state.loading = false;
    },
    [fetchCollabs.pending]: (state) => {
      state.loading = true;
    },
    [fetchCollabs.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    },
    [updateCollab.fulfilled]: (state, { payload }) => {
      const updatedCollabs = state.collabs.map((collab) =>
        collab._id === payload._id ? payload : collab
      );
      state.collabs = updatedCollabs;
    },
  },
});

export const fetchCollabs = createAsyncThunk(
  'collabs/fetchCollabs',
  async (userId, { getState }) => {
    const { userInfo } = getState().auth;
    const response = await apiSlice.utils.fetchBaseQuery({
      url: `/api/users/${userId}/collabs`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    return response.data;
  }
);

export const updateCollab = createAsyncThunk(
  'collabs/updateCollab',
  async (collabData, { getState }) => {
    const { userInfo } = getState().auth;
    const response = await apiSlice.utils.fetchBaseQuery({
      url: `/api/collabs/${collabData._id}`,
      method: 'PUT',
      body: collabData,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    return response.data;
  }
);

export default collabSlice.reducer;