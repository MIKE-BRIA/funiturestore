import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  favouriteItems: [],
};

export const saveFavouriteItem = createAsyncThunk(
  "favourites/saveFavouriteItem",
  async (favouriteItem, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/favourites/addtofavourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favouriteItem),
      });

      if (!res.ok) return res.status(400).json("error");

      const data = await res.json();
      return data.favouriteProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFavourites = createAsyncThunk(
  "favourites/getFavourites",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/favourites/getFavourites/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cart items");

      const data = await res.json();
      console.log("favourites", data);
      return data.reverse();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearAllFavourites = createAsyncThunk(
  "favourites/clearAllFavourites",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/favourites/deleteFavourite/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to clear favourites");

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addItemToFavourite: (state, action) => {
      const item = action.payload;
      const exist = state.favouriteItems.find((fav) => fav.id === item.id);

      if (!exist) {
        state.favouriteItems.push({
          productId: item.id,
          name: item.name,
          img: item.img,
          price: item.price,
          category: item.category,
        });
      }
    },
    removeItemFromFavourite: (state, action) => {
      const itemId = action.payload;
      state.favouriteItems = state.favouriteItems.filter(
        (fav) => fav.productId !== itemId
      );
    },
    clearFavourites: (state) => {
      state.favouriteItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.favouriteItems = action.payload;
      })
      .addCase(clearAllFavourites.fulfilled, (state) => {
        state.favouriteItems = [];
      });
  },
});

export const { addItemToFavourite, removeItemFromFavourite, clearFavourites } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
