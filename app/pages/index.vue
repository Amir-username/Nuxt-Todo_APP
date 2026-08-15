<script setup lang="ts">
import type { Todo } from "~~/shared/types/todo";

// Fetch all todos
const { data: todos, refresh } = await useFetch<Todo[]>("/api/todos");

// Modal state
const isModalOpen = ref(false);

// Called by TodoForm when the API successfully creates a todo
function handleTodoAdded() {
  isModalOpen.value = false;
  refresh();
}

// Toggle Completed Status (Optimistic Update)
async function toggleCompleted(todo: Todo) {
  const previousState = todo.completed;
  todo.completed = !todo.completed; // Update UI instantly

  try {
    await $fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      body: { completed: todo.completed },
    });
  } catch (err) {
    todo.completed = previousState; // Revert on failure
    console.error("Failed to update todo status", err);
  } finally {
    refresh();
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <!-- Header & Add Button -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Todos</h1>
      <UButton
        type="button"
        icon="i-lucide-plus"
        color="primary"
        @click="isModalOpen = true"
      >
        Add Todo
      </UButton>
    </div>

    <!-- Todo List Component -->
    <TodoList :todos="todos" @toggle="toggleCompleted" />

    <!-- Add Todo Modal -->
    <UModal v-model:open="isModalOpen" title="Add a New Todo">
      <template #body>
        <TodoForm @success="handleTodoAdded" />
      </template>

      <template #footer>
        <div class="flex justify-end gap-3 w-full">
          <UButton
            type="button"
            color="neutral"
            variant="ghost"
            @click="isModalOpen = false"
          >
            Cancel
          </UButton>
          <UButton type="submit" form="addTodoForm" color="primary">
            Save Todo
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
