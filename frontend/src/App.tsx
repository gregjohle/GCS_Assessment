import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadTodos } from './store/todosSlice';
import { loadCategories } from './store/categoriesSlice';
import CategoryForm from './components/CategoryForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const todosLoading = useAppSelector(state => state.todos.loading);
  const categoriesLoading = useAppSelector(state => state.categories.loading);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadTodos());
  }, [dispatch]);

  if (todosLoading || categoriesLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Todo App</h1>
      </header>

      <div className="container">
        <section className="sidebar">
          <h2>Categories</h2>
          <CategoryForm />
        </section>

        <section className="main">
          <h2>Add New Todo</h2>
          <TodoForm />
          <TodoList />
        </section>
      </div>
    </div>
  );
}

export default App;
