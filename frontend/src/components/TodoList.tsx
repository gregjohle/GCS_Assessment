import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setFilter, setSortBy } from '../store/todosSlice';
import TodoItem from './TodoItem';

export default function TodoList() {
  const dispatch = useAppDispatch();
  const { items, filter, sortBy } = useAppSelector(state => state.todos);
  const categories = useAppSelector(state => state.categories.items);

  const filteredAndSorted = useMemo(() => {
    let filtered = items;

    // Filter by status
    if (filter === 'active') filtered = items.filter(t => !t.completed);
    if (filter === 'completed') filtered = items.filter(t => t.completed);

    // Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [items, filter, sortBy]);

  // Group by category
  const groupedTodos = useMemo(() => {
    const groups: Record<string, typeof items> = {};
    filteredAndSorted.forEach(todo => {
      if (!groups[todo.categoryId]) groups[todo.categoryId] = [];
      groups[todo.categoryId].push(todo);
    });
    return groups;
  }, [filteredAndSorted]);

  return (
    <div className="todo-list">
      <div className="controls">
        <div>
          <label>Filter: </label>
          <button onClick={() => dispatch(setFilter('all'))} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => dispatch(setFilter('active'))} className={filter === 'active' ? 'active' : ''}>Active</button>
          <button onClick={() => dispatch(setFilter('completed'))} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>
        <div>
          <label>Sort by: </label>
          <button onClick={() => dispatch(setSortBy('createdAt'))} className={sortBy === 'createdAt' ? 'active' : ''}>Created</button>
          <button onClick={() => dispatch(setSortBy('dueDate'))} className={sortBy === 'dueDate' ? 'active' : ''}>Due Date</button>
        </div>
      </div>

      {categories.map(category => {
        const todos = groupedTodos[category.id] || [];
        if (todos.length === 0) return null;

        return (
          <div key={category.id} className="category-group">
            <h2>{category.name}</h2>
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
