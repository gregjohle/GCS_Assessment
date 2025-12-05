import { useState, type FormEvent } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addCategory } from '../store/categoriesSlice';

export default function CategoryForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await dispatch(addCategory({ name }));
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input
        type="text"
        placeholder="New category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
}
