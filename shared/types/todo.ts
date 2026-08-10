export type Todo = {
  id: string
  title: string
  completed: boolean
  description: string
  priority: "low" | "medium" | "high"
  created_at: string
  updated_at: string
}

export CreateTodoInput = Pick<Todo, "title" | "description" | "priority">
export UpateTodoInput = Partial<Pick<Todo, "title" | "completed" | "description" | "priority">>
