import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching collaborator statistics
export const fetchCollabStats = createAsyncThunk(
  'collabs/fetchCollabStats',
  async (_, { getState, rejectWithValue }) => {
    const { userInfo } = getState().auth;
    try {
      const response = await fetch('/api/collabs/stats', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for collaborator statistics
const collabStatsSlice = createSlice({
  name: 'collabStats',
  initialState: {
    stats: {
      totalCollaborators: 0,
      assignedCollaborators: 0,
      unassignedCollaborators: 0,
      assignmentsByInspector: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollabStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollabStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchCollabStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default collabStatsSlice.reducer;