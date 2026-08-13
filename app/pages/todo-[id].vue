<template>
  <div class="max-w-2xl mx-auto p-6">
    <!-- Back Link -->
    <NuxtLink to="/" class="text-blue-500 hover:underline mb-6 inline-block">
      &larr; Back to Todos
    </NuxtLink>

    <!-- Loading State -->
    <div v-if="pending" class="text-gray-500 text-lg">
      Loading todo details...
    </div>

    <!-- Error State (e.g., 404 Not Found) -->
    <div v-else-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg">
      <p class="font-bold">Error</p>
      <p>{{ error.statusMessage }}</p>
    </div>

    <!-- Success State -->
    <div
      v-else-if="todo"
      class="bg-white shadow-md rounded-lg p-6 border border-gray-200"
    >
      <div class="flex justify-between items-start mb-4">
        <h1 class="text-2xl font-bold text-gray-800">
          {{ todo.title }}
        </h1>
        <span
          class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
          :class="
            todo.completed
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          "
        >
          {{ todo.completed ? "Completed" : "Pending" }}
        </span>
      </div>

      <!-- Priority Badge -->
      <div class="mb-6">
        <span class="text-sm font-medium text-gray-500 mr-2">Priority:</span>
        <span
          class="px-2 py-1 rounded text-xs font-bold uppercase"
          :class="priorityClasses"
        >
          {{ todo.priority }}
        </span>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <h2 class="text-sm font-semibold text-gray-500 uppercase mb-2">
          Description
        </h2>
        <p class="text-gray-700 whitespace-pre-wrap">
          {{ todo.description || "No description provided." }}
        </p>
      </div>

      <!-- Metadata -->
      <div
        class="border-t border-gray-100 pt-4 mt-4 text-sm text-gray-500 flex justify-between"
      >
        <div>
          <p>Created: {{ formatDate(todo.created_at) }}</p>
          <p>Updated: {{ formatDate(todo.updated_at) }}</p>
        </div>
        <div class="text-right">
          <p>
            ID: <span class="font-mono text-xs">{{ todo.id }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "~~/shared/types/todo";

// 1. Get the dynamic ID from the route URL
const route = useRoute();
const id = route.params.id as string;

// 2. Fetch the specific todo from the API
const { data: todo, pending, error } = await useFetch<Todo>(`/api/todos/${id}`);

// 3. Helper function to format the priority badge color
const priorityClasses = computed(() => {
  if (!todo.value) return "";
  switch (todo.value.priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-orange-100 text-orange-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
});

// 4. Helper function to format ISO dates into readable strings
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
