// appSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunk to load credit data, now accepting getToken as an argument
export const loadCreditsData = createAsyncThunk(
  "app/loadCreditsData",
  async (getToken, { rejectWithValue }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const token = await getToken();
      if (!token) throw new Error("Authorization token missing");

      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        return data.credits;
      } else {
        return rejectWithValue(data.message || "Failed to load credits");
      }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing credits
const appSlice = createSlice({
  name: "app",
  initialState: {
    credit: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCreditsData.fulfilled, (state, action) => {
        state.credit = action.payload;
      })
      .addCase(loadCreditsData.rejected, (state, action) => {
        toast.error(action.payload);
      });
  },
});

export default appSlice.reducer;
