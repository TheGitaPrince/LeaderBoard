import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/axiosInterceptors.js"

export const createUser = createAsyncThunk("createUser", async (useData, { rejectWithValue }) => {
        try {
            const response = await  authAxios.post('/users/create-user',useData); 
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "create user failed");
        }
});

export const getLeaderboard = createAsyncThunk("getLeaderboard", async (_, { rejectWithValue }) => {
        try {
            const response = await  authAxios.get('/users/get-leaderboard'); 
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "getLeaderboard failed");
        }
});

export const claimPoints = createAsyncThunk("claimPoints", async (userId, { rejectWithValue }) => {
        try {
            const response = await  authAxios.post('/users/claimpoints',{userId});
            return response?.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data );
        }
});

export const getHistory = createAsyncThunk("getHistory", async (_, { rejectWithValue }) => {
        try {
            const response = await  authAxios.get('/users/get-history');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "getHistory failed");
        }
});

const initialState = {
    users: [],
    history: [],
    loading: false,
    error: null
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder
          .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
          })
          .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
          })
          .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message
          })
          .addCase(getLeaderboard.pending, (state) => {
                state.loading = true;
                state.error = null;
          })
          .addCase(getLeaderboard.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
          })
          .addCase(getLeaderboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message
          })
          .addCase(claimPoints.pending, (state) => {
                state.loading = true;
                state.error = null;
          })
          .addCase(claimPoints.fulfilled, (state, action) => {
                state.loading = false;
          })
          .addCase(claimPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
          })
          .addCase(getHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
          })
          .addCase(getHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
          })
          .addCase(getHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message
          })
         
    },
})


export default leaderboardSlice.reducer