<script setup lang="ts">
import type { Todo } from "~~/shared/types/todo";

// Fetch all todos
const { data: todos, refresh } = await useFetch<Todo[]>("/api/todos");

// Create a new Todo
async function addTodo() {
  await $fetch("/api/todos", {
    method: "POST",
    body: {
      title: "Learn Nuxt 4",
      description: "Build a CRUD app",
      priority: "high",
    },
  });
  await refresh(); // Update list
}
</script>

<template>
  <div>
    <h1>Todo App</h1>
    <ul v-for="todo in todos" :key="todo.id">
      <li>{{ todo.title }}</li>
    </ul>
    <button @click="addTodo">add</button>
  </div>
</template>
