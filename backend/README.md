# Todo Backend API

Express.js REST API with TypeScript and Redis for todo management.

## Prerequisites

- Node.js 18+
- Redis (`brew install redis`)

## Setup

```bash
npm install
```

## Running

Start Redis:
```bash
redis-server
```

Development mode:
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (body: `{ name: string }`)
- `DELETE /api/categories/:id` - Delete category

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create todo (body: `{ title, description?, dueDate?, categoryId, completed? }`)
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Health
- `GET /health` - Health check
