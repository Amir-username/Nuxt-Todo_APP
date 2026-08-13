import { todos } from "~~/server/utils/db";

export default defineEventHandler(() => {
  return todos;
});
