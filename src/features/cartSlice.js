// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item._id === action.payload._id
//       );
//       if (itemIndex >= 0) {
//         state.cartItems[itemIndex].cartQuantity += 1;
//         toast.info(
//           `Increased ${state.cartItems[itemIndex].name} cart quantity`,
//           {
//             position: "bottom-left",
//           }
//         );
//       } else {
//         const tempProduct = { ...action.payload, cartQuantity: 1 };
//         state.cartItems.push(tempProduct);
//         toast.success(`${action.payload.name} added to cart`, {
//           position: "bottom-left",
//         });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     removeFromCart(state, action) {
//       const nextCartItems = state.cartItems.filter(
//         (cartItem) => cartItem._id !== action.payload._id
//       );
//       state.cartItems = nextCartItems;
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

//       toast.error(`${action.payload.name} removed from cart`, {
//         position: "bottom-left",
//       });
//     },
//     decreaseCart(state, action) {
//       const itemIndex = state.cartItems.findIndex(
//         (cartItem) => cartItem._id === action.payload._id
//       );

//       if (state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;

//         toast.info(`Decreased ${action.payload.name} cart quantity`, {
//           position: "bottom-left",
//         });
//       } else if (state.cartItems[itemIndex].cartQuantity === 1) {
//         const nextCartItems = state.cartItems.filter(
//           (cartItem) => cartItem._id !== action.payload._id
//         );

//         state.cartItems = nextCartItems;

//         toast.error(`${action.payload.name} removed from cart`, {
//           position: "bottom-left",
//         });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     clearCart(state, action) {
//       state.cartItems = [];
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       toast.error("Cart cleared", {
//         position: "bottom-left",
//       });
//     },
//     getTotals(state, action) {
//       let { total, quantity } = state.cartItems.reduce(
//         (cartTotal, cartItem) => {
//           const { price, cartQuantity } = cartItem;
//           const itemTotal = price * cartQuantity;

//           cartTotal.total += itemTotal;
//           cartTotal.quantity += cartQuantity;

//           return cartTotal;
//         },
//         {
//           total: 0,
//           quantity: 0,
//         }
//       );
//       total = parseFloat(total.toFixed(2));
//       state.cartTotalQuantity = quantity;
// state.cartTotalAmount = total;
//     },
//   },
// });

// export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
//   cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const response = await axios.get("/api/cart", {
      headers: {
        'x-auth-token': state.auth.token,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateCart = createAsyncThunk("cart/updateCart", async (cartItems, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const response = await axios.post("/api/cart", { items: cartItems }, {
      headers: {
        'x-auth-token': state.auth.token,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        if (state.cartItems[itemIndex].cartQuantity <= 0) {
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
    },
    clearCart(state) {
      state.cartItems = [];
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
        const { price, cartQuantity } = cartItem;
        const itemTotal = price * cartQuantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;
        return cartTotal;
      }, {
        total: 0,
        quantity: 0,
      });
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  }
});

export const { addToCart, decreaseCart, removeFromCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
