import { Router, Request, Response } from 'express';
import redis from '../redis';
import { Category, CreateCategoryInput } from '../types';

const router = Router();

// GET all categories
router.get('/', async (_req: Request, res: Response) => {
  try {
    const keys = await redis.keys('category:*');
    const categories: Category[] = [];

    for (const key of keys) {
      const data = await redis.get(key);
      if (data) categories.push(JSON.parse(data));
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET category by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await redis.get(`category:${req.params.id}`);

    if (!data) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// POST create category
router.post('/', async (req: Request, res: Response) => {
  try {
    const input: CreateCategoryInput = req.body;

    if (!input.name || input.name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const id = Date.now().toString();
    const category: Category = { id, name: input.name.trim() };

    await redis.set(`category:${id}`, JSON.stringify(category));
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// DELETE category
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await redis.del(`category:${req.params.id}`);

    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
