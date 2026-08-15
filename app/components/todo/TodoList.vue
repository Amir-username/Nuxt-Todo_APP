<script setup lang="ts">
import type { Todo } from "~~/shared/types/todo";

// Define props
const props = defineProps<{ todos: Todo[] }>();

// Define emits
const emit = defineEmits<{
  toggle: [todo: Todo]; // Pass the whole todo object up to the parent
}>();
</script>

<template>
  <!-- Fallback UI if there are no todos -->
  <div
    v-if="props.todos.length === 0"
    class="text-center py-12 text-gray-500 dark:text-gray-400"
  >
    <UIcon
      name="i-lucide-clipboard-list"
      class="w-10 h-10 mx-auto mb-2 opacity-50"
    />
    <p>No todos yet. Add one to get started!</p>
  </div>

  <!-- Todo List -->
  <ul v-else class="space-y-4">
    <li v-for="todo in props.todos" :key="todo.id">
      <!--
        Render the TodoItem component.
        Listen to its 'toggle' event and re-emit it to the parent page.
      -->
      <TodoItem :todo="todo" @toggle="emit('toggle', todo)" />
    </li>
  </ul>
</template>

