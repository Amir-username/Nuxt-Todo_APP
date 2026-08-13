import { todos } from "~~/server/utils/db";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    throw createError({ statusCode: 404, statusMessage: "Todo not found" });
  }

  return todo;
});
