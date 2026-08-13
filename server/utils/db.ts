// server/utils/db.ts
import type { Todo } from "~~/shared/types/todo";

export const todos: Todo[] = [
  {
    id: "1a2b3c4d-1111-2222-3333-444455556666",
    title: "Set up Nuxt 4 project structure",
    description:
      "Initialize the project, configure tailwind, and set up server routes.",
    completed: true,
    priority: "high",
    created_at: "2024-05-01T09:00:00.000Z",
    updated_at: "2024-05-01T11:30:00.000Z",
  },
  {
    id: "2b3c4d5e-1111-2222-3333-444455556666",
    title: "Implement Zod validation schemas",
    description:
      "Create Zod schemas for CreateTodoInput and UpdateTodoInput to ensure data integrity.",
    completed: true,
    priority: "medium",
    created_at: "2024-05-02T10:15:00.000Z",
    updated_at: "2024-05-02T14:20:00.000Z",
  },
  {
    id: "3c4d5e6f-1111-2222-3333-444455556666",
    title: "Build CRUD API endpoints",
    description:
      "Create GET, POST, PATCH, and DELETE routes in the server/api/todos directory.",
    completed: false,
    priority: "high",
    created_at: "2024-05-03T08:45:00.000Z",
    updated_at: "2024-05-03T08:45:00.000Z",
  },
  {
    id: "4d5e6f7g-1111-2222-3333-444455556666",
    title: "Design the Todo UI components",
    description: "Build the TodoList, TodoItem, and TodoForm Vue components.",
    completed: false,
    priority: "medium",
    created_at: "2024-05-04T13:00:00.000Z",
    updated_at: "2024-05-04T15:45:00.000Z",
  },
  {
    id: "5e6f7g8h-1111-2222-3333-444455556666",
    title: "Write documentation",
    description:
      "Document how to use the Todo API endpoints and how to run the project locally.",
    completed: false,
    priority: "low",
    created_at: "2024-05-05T16:30:00.000Z",
    updated_at: "2024-05-05T16:30:00.000Z",
  },
];
