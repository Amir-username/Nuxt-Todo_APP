<script setup lang="ts">
import type { Todo } from "~~/shared/types/todo";

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{ toggle: [] }>();

// Helper for priority badge colors using Nuxt UI v4 semantic colors
const priorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";
    default:
      return "neutral";
  }
};
</script>

<template>
  <UCard class="hover:ring-primary-400 transition">
    <div class="flex items-center justify-between gap-4">
      <!-- Left Side: Checkbox & Title -->
      <div class="flex items-center gap-3 flex-1">
        <UCheckbox
          :model-value="props.todo.completed"
          @update:model-value="emit('toggle')"
        />
        <NuxtLink :to="`/todos/${props.todo.id}`" class="flex-1 cursor-pointer">
          <h3
            class="font-medium text-lg transition"
            :class="
              props.todo.completed
                ? 'line-through text-gray-400'
                : 'text-gray-800 dark:text-gray-100'
            "
          >
            {{ props.todo.title }}
          </h3>
        </NuxtLink>
      </div>

      <!-- Right Side: Status & Priority Badge -->
      <div class="flex items-center gap-3">
        <span class="text-gray-400 text-sm hidden sm:flex items-center gap-1">
          <UIcon
            :name="
              props.todo.completed ? 'i-lucide-check-circle' : 'i-lucide-clock'
            "
            class="w-4 h-4"
          />
          {{ props.todo.completed ? "Done" : "Pending" }}
        </span>
        <UBadge :color="priorityColor(props.todo.priority)" variant="subtle">
          {{ props.todo.priority }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>

