<script setup lang="ts">
import type { Todo, CreateTodoInput } from "~~/shared/types/todo";

// Fetch all todos
const { data: todos, refresh } = await useFetch<Todo[]>("/api/todos");

// Modal & Form state
const isModalOpen = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

const newTodo = reactive<CreateTodoInput>({
  title: "",
  description: "",
  priority: "medium",
});

// Nuxt UI v4 USelect uses `items` and accepts an array of strings directly
const priorityOptions = ["low", "medium", "high"];

// Create a new Todo
async function addTodo() {
  if (!newTodo.title) return;

  isSubmitting.value = true;
  errorMessage.value = null;

  try {
    await $fetch("/api/todos", {
      method: "POST",
      body: newTodo,
    });

    // Reset form
    newTodo.title = "";
    newTodo.description = "";
    newTodo.priority = "medium";

    // Close modal and update list
    isModalOpen.value = false;
    await refresh();
  } catch (err: any) {
    errorMessage.value = err.data?.message || "Failed to create todo.";
  } finally {
    isSubmitting.value = false;
  }
}

// Helper for priority badge colors using Nuxt UI v4 semantic colors
const priorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "error"; // replaces red
    case "medium":
      return "warning"; // replaces orange
    case "low":
      return "info"; // replaces blue
    default:
      return "neutral"; // replaces gray
  }
};
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

    <!-- Todo List -->
    <ul class="space-y-4">
      <li v-for="todo in todos" :key="todo.id">
        <NuxtLink :to="`/todo-${todo.id}`" class="block">
          <UCard class="hover:ring-primary-400 transition">
            <div class="flex justify-between items-center">
              <h3 class="font-medium text-lg">{{ todo.title }}</h3>
              <UBadge :color="priorityColor(todo.priority)" variant="subtle">
                {{ todo.priority }}
              </UBadge>
            </div>
            <p class="text-gray-500 text-sm mt-2 flex items-center gap-1">
              <UIcon
                :name="
                  todo.completed ? 'i-lucide-check-circle' : 'i-lucide-clock'
                "
                class="w-4 h-4"
              />
              {{ todo.completed ? "Completed" : "Pending" }}
            </p>
          </UCard>
        </NuxtLink>
      </li>
    </ul>

    <!-- Add Todo Modal (Nuxt UI v4 Syntax) -->
    <UModal v-model:open="isModalOpen" title="Add a New Todo">
      <template #body>
        <!-- Form is strictly inside the Modal Body -->
        <form @submit.prevent="addTodo" id="addTodoForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Title</label
            >
            <UInput
              v-model="newTodo.title"
              placeholder="e.g., Buy groceries"
              class="w-full"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Description</label
            >
            <UTextarea
              v-model="newTodo.description"
              :rows="3"
              placeholder="Optional details..."
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Priority</label
            >
            <USelect
              v-model="newTodo.priority"
              :items="priorityOptions"
              class="w-full"
            />
          </div>

          <div
            v-if="errorMessage"
            class="text-red-500 text-sm bg-red-50 p-3 rounded dark:bg-red-950 dark:text-red-300"
          >
            {{ errorMessage }}
          </div>
        </form>
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
          <!-- The form attribute connects this button to the form inside #body -->
          <UButton
            type="submit"
            form="addTodoForm"
            color="primary"
            :loading="isSubmitting"
          >
            Save Todo
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
