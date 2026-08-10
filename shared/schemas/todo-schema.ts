import { z } from "zod";

/**
 * Full todo entity schema — mirrors the Todo type in shared/types/todo.ts
 */
export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  created_at: z.string(),
  updated_at: z.string(),
});

/**
 * Schema for creating a todo — matches CreateTodoInput
 */
export const createTodoSchema = todoSchema.pick({
  title: true,
  description: true,
  priority: true,
});

/**
 * Schema for updating a todo — matches UpateTodoInput (partial fields)
 */
export const updateTodoSchema = todoSchema
  .pick({
    title: true,
    completed: true,
    description: true,
    priority: true,
  })
  .partial();
