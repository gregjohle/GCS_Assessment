import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, UpdateTodoInput, FilterStatus, SortBy } from '../types';
import * as api from '../api';

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
  filter: FilterStatus;
  sortBy: SortBy;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
  sortBy: 'createdAt',
};

export const loadTodos = createAsyncThunk('todos/load', api.fetchTodos);
export const addTodo = createAsyncThunk('todos/add', api.createTodo);
export const editTodo = createAsyncThunk(
  'todos/edit',
  async ({ id, data }: { id: string; data: UpdateTodoInput }) => api.updateTodo(id, data)
);
export const removeTodo = createAsyncThunk('todos/remove', api.deleteTodo);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load todos';
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.meta.arg);
      });
  },
});

export const { setFilter, setSortBy } = todosSlice.actions;
export default todosSlice.reducer;
