let nextId = 1;
export function addTask(tasks, title) {
    const cleanTitle = title.trim();
    if (!cleanTitle)
        return tasks;
    const task = {
        id: `task-${Date.now()}-${nextId++}`,
        title: cleanTitle,
        status: "todo",
        createdAt: Date.now()
    };
    return [task, ...tasks];
}
export function advanceTask(tasks, taskId) {
    const nextStatus = {
        "todo": "in-progress",
        "in-progress": "done",
        "done": "todo"
    };
    return tasks.map((task) => task.id === taskId ? { ...task, status: nextStatus[task.status] } : task);
}
export function filterByStatus(tasks, status) {
    return status === "all" ? tasks : tasks.filter((task) => task.status === status);
}
