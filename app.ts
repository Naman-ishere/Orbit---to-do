import { addTask, advanceTask, filterByStatus, type Task, type TaskStatus } from "./model.js";

type FilterStatus = TaskStatus | "all";

const form = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const emptyState = document.getElementById("empty-state") as HTMLDivElement;
const taskCount = document.getElementById("task-count") as HTMLSpanElement;
const progressCopy = document.getElementById("progress-copy") as HTMLParagraphElement;
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));
const countAll = document.getElementById("count-all") as HTMLSpanElement;
const countTodo = document.getElementById("count-todo") as HTMLSpanElement;
const countProgress = document.getElementById("count-progress") as HTMLSpanElement;
const countDone = document.getElementById("count-done") as HTMLSpanElement;

let tasks: Task[] = [];
let activeFilter: FilterStatus = "all";

const statusLabels: Record<TaskStatus, string> = {
  "todo": "To do",
  "in-progress": "In progress",
  "done": "Done"
};

function createTaskElement(task: Task): HTMLLIElement {
  const item = document.createElement("li");
  item.className = `task-item status-${task.status}`;

  const marker = document.createElement("span");
  marker.className = "task-marker";
  marker.setAttribute("aria-hidden", "true");
  marker.textContent = task.status === "done" ? "✓" : task.status === "in-progress" ? "↗" : "·";

  const content = document.createElement("div");
  content.className = "task-content";

  const title = document.createElement("p");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("p");
  meta.className = "task-meta";
  meta.textContent = `Added ${new Date(task.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;

  content.append(title, meta);

  const badge = document.createElement("span");
  badge.className = `status-badge badge-${task.status}`;
  badge.textContent = statusLabels[task.status];

  const advanceButton = document.createElement("button");
  advanceButton.type = "button";
  advanceButton.className = "advance-button";
  advanceButton.dataset.taskId = task.id;
  advanceButton.setAttribute("aria-label", `${task.status === "done" ? "Reset" : "Advance"} task: ${task.title}`);
  advanceButton.title = task.status === "todo" ? "Start task" : task.status === "in-progress" ? "Complete task" : "Move back to to do";
  advanceButton.textContent = task.status === "todo" ? "Start →" : task.status === "in-progress" ? "Complete ✓" : "Reset ↺";

  item.append(marker, content, badge, advanceButton);
  return item;
}

function render(): void {
  const visibleTasks = filterByStatus(tasks, activeFilter);
  taskList.replaceChildren(...visibleTasks.map(createTaskElement));
  emptyState.hidden = visibleTasks.length > 0;
  taskList.hidden = visibleTasks.length === 0;
  taskCount.textContent = String(tasks.length);
  countAll.textContent = String(tasks.length);
  countTodo.textContent = String(tasks.filter((task) => task.status === "todo").length);
  countProgress.textContent = String(tasks.filter((task) => task.status === "in-progress").length);
  countDone.textContent = String(tasks.filter((task) => task.status === "done").length);

  const completed = tasks.filter((task) => task.status === "done").length;
  progressCopy.textContent = tasks.length === 0
    ? "A fresh start."
    : completed === tasks.length
      ? "Everything wrapped. Nice work."
      : `${completed} of ${tasks.length} completed`;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return;
  }
  tasks = addTask(tasks, title);
  titleInput.value = "";
  activeFilter = "all";
  render();
  titleInput.focus();
});

taskList.addEventListener("click", (event: MouseEvent) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest<HTMLButtonElement>("button[data-task-id]");
  if (!button?.dataset.taskId) return;
  tasks = advanceTask(tasks, button.dataset.taskId);
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const requestedFilter = button.dataset.filter;
    if (requestedFilter === "all" || requestedFilter === "todo" ||
        requestedFilter === "in-progress" || requestedFilter === "done") {
      activeFilter = requestedFilter;
      render();
    }
  });
});

render();
