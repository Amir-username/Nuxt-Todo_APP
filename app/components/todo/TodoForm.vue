<script setup lang="ts">
import type { CreateTodoInput } from "~~/shared/types/todo";

const emit = defineEmits<{ success: [] }>();

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

const newTodo = reactive<CreateTodoInput>({
  title: "",
  description: "",
  priority: "medium",
});

const priorityOptions = ["low", "medium", "high"];

async function handleSubmit() {
  if (!newTodo.title) return;

  isSubmitting.value = true;
  errorMessage.value = null;

  try {
    await $fetch("/api/todos", {
      method: "POST",
      body: newTodo,
    });

    // Reset form for next time
    newTodo.title = "";
    newTodo.description = "";
    newTodo.priority = "medium";

    // Tell parent the API call succeeded
    emit("success");
  } catch (err: any) {
    errorMessage.value = err.data?.message || "Failed to create todo.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" id="addTodoForm" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
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

