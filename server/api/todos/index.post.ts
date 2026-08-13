import type { Todo } from "~~/shared/types/todo";
import { createTodoSchema } from "~~/shared/schemas/todo-schema";
import { todos } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  // 1. Read and validate the body using Zod
  const body = await readBody(event);
  const result = createTodoSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation Error",
      data: result.error.flatten(),
    });
  }

  const { title, description, priority } = result.data;

  // 2. Create the new Todo
  const newTodo: Todo = {
    id: crypto.randomUUID(), // Node 18+ global
    title,
    description,
    priority,
    completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 3. Save to DB
  todos.push(newTodo);

  // 4. Return created resource with 201 status
  setResponseStatus(event, 201);
  return newTodo;
});
