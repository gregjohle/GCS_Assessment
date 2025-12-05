export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt'>;
export type UpdateTodoInput = Partial<CreateTodoInput>;
export type CreateCategoryInput = Omit<Category, 'id'>;

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'dueDate' | 'createdAt';
