const KEYS = {
  tasks: 'tasks',
  taskId: 'taskId',
};

export const getCategoriesCollection = () => [
  { id: '1', title: 'To Do' },
  { id: '2', title: 'In Progress' },
  { id: '3', title: 'Done' },
];

export function insertTask(data) {
  let tasks = getAllTasks();
  data['id'] = generateTaskId();
  tasks.push(data);
  console.log(tasks)
  localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}
export function updateTask(data) {
  let tasks = getAllTasks();
  let recordIndex = tasks.findIndex((x) => x.id === data.id);
  tasks[recordIndex] = { ...data };
  localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function deleteTask(id) {
  let tasks = getAllTasks();
  tasks = tasks.filter((x) => x.id !== id);
  localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function generateTaskId() {
  if (localStorage.getItem(KEYS.taskId) === null)
    localStorage.setItem(KEYS.taskId, '0');
  let id = parseInt(localStorage.getItem(KEYS.taskId));
  localStorage.setItem(KEYS.taskId, (++id).toString());
  return id;
}

export function getAllTasks() {
  if (localStorage.getItem(KEYS.tasks) === null)
    localStorage.setItem(KEYS.tasks, JSON.stringify([]));
  let tasks = JSON.parse(localStorage.getItem(KEYS.tasks));
  let categories = getCategoriesCollection();
  return tasks.map((t) => ({
    ...t,
    category: categories[parseInt(t.categoryId)-1]?.title,
  }));
}