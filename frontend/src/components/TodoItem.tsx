import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { editTodo, removeTodo } from '../store/todosSlice';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleToggle = () => {
    dispatch(editTodo({ id: todo.id, data: { completed: !todo.completed } }));
  };

  const handleSave = () => {
    dispatch(editTodo({ id: todo.id, data: { title, description } }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="todo-content">
          <h3>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}
          {todo.dueDate && <small>Due: {new Date(todo.dueDate).toLocaleDateString()}</small>}
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
