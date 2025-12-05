# Todo Application

Full-stack todo application with Node.js/Express backend and React/Redux frontend.

## Project Structure

```
├── backend/          # Express.js API with TypeScript and Redis
└── frontend/         # React + Redux Toolkit with TypeScript (Vite)
```

## Prerequisites

- Node.js 18+
- Redis (`brew install redis`)

## Quick Start

### 1. Start Redis
```bash
redis-server
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:3000`

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Features

- **Categories**: Create and manage todo categories
- **Todos**: Full CRUD operations (Create, Read, Update, Delete)
- **Completion Tracking**: Mark todos as complete/incomplete
- **Filtering**: View all, active, or completed todos
- **Sorting**: Sort by creation date or due date
- **Grouping**: View todos organized by category

## Tech Stack

### Backend
- Node.js with Express.js
- TypeScript
- Redis for data storage
- RESTful API design

### Frontend
- React 18
- Redux Toolkit for state management
- TypeScript
- Vite for build tooling
- CSS for styling

## API Endpoints

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category
- `DELETE /api/categories/:id` - Delete category

### Todos
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Development

See individual README files in `/backend` and `/frontend` directories for detailed setup instructions.
