import { Task } from "./task.js";

export class TasksTimer {
  constructor() {
    this.cumCount;
    this.tasks;
    this.totalTime;
  }

  init() {
    this.cumCount = 1;
    this.tasks = [];
    this.totalTime = 0;
  }

  getAverageTime() {
    if (this.tasks.length === 0) return 0;
    return this.totalTime / this.tasks.length;
  }

  findTaskById(id) {
    return this.tasks.find((task) => task.getId() === id);
  }

  getTasks() {
    return this.tasks;
  }

  getTotalCount() {
    return this.tasks.legnth;
  }

  sortTasks() {
    this.tasks.sort((a, b) => a.getTime() - b.getTime());
  }

  addTaskWithSort(name, time) {
    this.pushTask(name, time);
    this.sortTasks();
  }

  pushTask(name, time) {
    const newTask = new Task(this.cumCount++, name, time);
    this.tasks.push(newTask);
    this.totalTime += newTask.getTime();
  }

  resetTasks() {
    this.init();
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.totalTime -= task.time;
  }

  updateTask(task, time) {
    this.totalTime -= task.getTime();
    task.setTime(time);
    this.totalTime += time;
  }
}
