// server/api/todos/[id]/index.patch.ts
import { updateTodoSchema } from '~~/shared/schemas/todo-schema';
import { todos } from '~~/server/utils/db';
import type { Todo } from '~~/shared/types/todo'; // Ensure this is imported

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID is required' });
  }

  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Todo not found' });
  }

  // 1. Validate body
  const body = await readBody(event);
  const result = updateTodoSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: result.error.flatten(),
    });
  }

  // 2. Extract the current todo into a variable
  const currentTodo = todos[todoIndex];

  // 3. Add a type guard to tell TypeScript this is definitely a Todo
  if (!currentTodo) {
    throw createError({ statusCode: 404, statusMessage: 'Todo not found' });
  }

  // 4. Now TypeScript knows currentTodo is a valid Todo, the spread will work perfectly
  const updatedTodo: Todo = {
    ...currentTodo,
    ...result.data,
    updated_at: new Date().toISOString(),
  };

  todos[todoIndex] = updatedTodo;

  return updatedTodo;
});