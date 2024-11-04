// appSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunk to load credit data
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

// Thunk to remove background from image
export const removeBg = createAsyncThunk(
  "app/removeBg",
  async ({ image, getToken, navigate }, { rejectWithValue }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const token = await getToken();
      if (!token) throw new Error("Authorization token missing");

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, {
        headers: { token },
      });

      if (data.success) {
        navigate("/result");
        return {
          resultImage: data.resultImage,
          creditBalance: data.creditBalance,
        };
      } else {
        toast.error(data.message);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
        return rejectWithValue(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing credits, images, and resultImage
const appSlice = createSlice({
  name: "app",
  initialState: {
    credit: false,
    image: null,
    resultImage: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    clearResultImage: (state) => {
      state.resultImage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCreditsData.fulfilled, (state, action) => {
        state.credit = action.payload;
      })
      .addCase(loadCreditsData.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(removeBg.fulfilled, (state, action) => {
        state.resultImage = action.payload.resultImage;
        if (action.payload.creditBalance) {
          state.credit = action.payload.creditBalance;
        }
      })
      .addCase(removeBg.rejected, (state, action) => {
        toast.error(action.payload);
      });
  },
});

export const { setImage, clearResultImage } = appSlice.actions;

export default appSlice.reducer;
