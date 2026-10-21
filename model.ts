export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
}

let nextId = 1;

export function addTask(tasks: Task[], title: string): Task[] {
  const cleanTitle = title.trim();
  if (!cleanTitle) return tasks;

  const task: Task = {
    id: `task-${Date.now()}-${nextId++}`,
    title: cleanTitle,
    status: "todo",
    createdAt: Date.now()
  };
  return [task, ...tasks];
}

export function advanceTask(tasks: Task[], taskId: string): Task[] {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    "todo": "in-progress",
    "in-progress": "done",
    "done": "todo"
  };

  return tasks.map((task) =>
    task.id === taskId ? { ...task, status: nextStatus[task.status] } : task
  );
}

export function filterByStatus(tasks: Task[], status: TaskStatus | "all"): Task[] {
  return status === "all" ? tasks : tasks.filter((task) => task.status === status);
}
