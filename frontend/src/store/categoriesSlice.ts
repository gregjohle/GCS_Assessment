import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../types';
import * as api from '../api';

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const loadCategories = createAsyncThunk('categories/load', api.fetchCategories);
export const addCategory = createAsyncThunk('categories/add', api.createCategory);
export const removeCategory = createAsyncThunk('categories/remove', api.deleteCategory);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load categories';
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.items.push(action.payload);
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.meta.arg);
      });
  },
});

export default categoriesSlice.reducer;
