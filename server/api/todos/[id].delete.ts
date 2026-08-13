import { todos } from "~~/server/utils/db";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID is required" });
  }

  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: "Todo not found" });
  }

  // Remove from array
  const [deletedTodo] = todos.splice(todoIndex, 1);

  // 204 No Content is standard for DELETE, but returning the object is often helpful for UI updates
  setResponseStatus(event, 200);
  return { success: true, deleted: deletedTodo };
});
