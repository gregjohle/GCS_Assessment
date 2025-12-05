import { Router, Request, Response } from 'express';
import redis from '../redis';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types';

const router = Router();

// GET all todos
router.get('/', async (_req: Request, res: Response) => {
  try {
    const keys = await redis.keys('todo:*');
    const todos: Todo[] = [];

    for (const key of keys) {
      const data = await redis.get(key);
      if (data) todos.push(JSON.parse(data));
    }

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET todo by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await redis.get(`todo:${req.params.id}`);

    if (!data) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// POST create todo
router.post('/', async (req: Request, res: Response) => {
  try {
    const input: CreateTodoInput = req.body;

    if (!input.title || input.title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!input.categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const id = Date.now().toString();
    const todo: Todo = {
      id,
      title: input.title.trim(),
      description: input.description || '',
      dueDate: input.dueDate || '',
      categoryId: input.categoryId,
      completed: input.completed || false,
      createdAt: new Date().toISOString()
    };

    await redis.set(`todo:${id}`, JSON.stringify(todo));
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT update todo
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const data = await redis.get(`todo:${req.params.id}`);

    if (!data) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const todo: Todo = JSON.parse(data);
    const updates: UpdateTodoInput = req.body;

    const updatedTodo: Todo = {
      ...todo,
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.dueDate !== undefined && { dueDate: updates.dueDate }),
      ...(updates.categoryId !== undefined && { categoryId: updates.categoryId }),
      ...(updates.completed !== undefined && { completed: updates.completed })
    };

    await redis.set(`todo:${req.params.id}`, JSON.stringify(updatedTodo));
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE todo
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await redis.del(`todo:${req.params.id}`);

    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;
