import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // List of items
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Add a new item
    },
    updateItem: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedData };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItems: (state, action) => {
      state.items = action.payload; // Set items (e.g., fetched from an API)
    },
  },
});

export const { addItem, updateItem, deleteItem, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
