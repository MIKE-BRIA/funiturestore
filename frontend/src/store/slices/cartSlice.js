import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchItems",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/cart/getCart/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cart items");

      const data = await res.json();
      // console.log(data);
      return data.reverse();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartData = createAsyncThunk(
  "cart/updatecartData",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/cart/updateCart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update cart item");
      }

      const data = await res.json();
      return data.cartItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveCartItem = createAsyncThunk(
  "cart/saveCartItem",
  async (item, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/cart/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) return res.status(400).json("error");

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteitem = createAsyncThunk(
  "cart/deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/cart/removecart/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete cart item");

      // console.log("Deleted item ID:", id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          img: newItem.img,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item._id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    // deleteItem(state, action) {
    //   const id = action.payload;
    //   const existingItem = state.cartItems.find((item) => item.id === id);

    //   if (existingItem) {
    //     state.totalQuantity -= existingItem.quantity;
    //     state.totalAmount -= existingItem.totalPrice;

    //     state.cartItems = state.cartItems.filter((item) => item.id !== id);
    //   }
    // },
    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount +=
          (quantity - existingItem.quantity) * existingItem.price;

        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.totalAmount = action.payload.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
        state.totalQuantity = action.payload.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        console.error("Failed to fetch cart items:", action.payload);
      })
      .addCase(updateCartData.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        // console.log("updateditemsss", updatedItem);
        const existingItem = state.cartItems.find(
          (item) => item._id === updatedItem._id
        );

        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
          existingItem.totalPrice = updatedItem.totalPrice;
          state.totalQuantity = state.cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          state.totalAmount = state.cartItems.reduce(
            (total, item) => total + item.totalPrice,
            0
          );
        }
      })
      .addCase(deleteitem.fulfilled, (state, action) => {
        const id = action.payload;
        // console.log("Reducer received delete item ID:", id);

        state.cartItems = state.cartItems.filter((item) => item._id !== id);
        state.totalQuantity = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.totalPrice,
          0
        );

        // console.log("Updated cartItems:", state.cartItems);
      })
      .addCase(deleteitem.rejected, (state, action) => {
        console.error("Failed to delete cart item:", action.payload);
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
  deleteItem,
} = cartSlice.actions;

export default cartSlice.reducer;
