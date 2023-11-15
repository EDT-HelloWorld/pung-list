import { Task } from "./model/task.js";
import { TasksTimer } from "./model/tasksTimer.js";
import { View } from "./view/View.js";

class Controller {
  constructor() {
    this.view = new View();
    this.tasksTimer = new TasksTimer();
    this.timer;
  }

  init() {
    this.tasksTimer.init();

    this.view.init();
    this.view.bindAddTask(this.addTask.bind(this));
    this.view.bindStartTotalTimer(this.start.bind(this));
    this.view.bindStopTotalTimer(this.stop.bind(this));
    this.view.bindIncreaseTotalTimer(this.increaseTotalTime.bind(this));
    this.view.bindDuplicateTasks(this.duplicateTasks.bind(this));
    this.view.bindInitTasks(this.reset.bind(this));
    this.view.bindIncreaseUnitTaskTimer(this.increaseTime.bind(this));
    this.view.bindRemoveUnitTask(this.removeTask.bind(this));
  }

  // setInterval로 1초마다 tasks 업데이트
  run() {
    this.timer = setInterval(() => {
      const tasks = this.tasksTimer.getTasks();
      tasks.forEach((task) => {
        if (task.getPlay() == true) {
          this.tasksTimer.updateTask(task, task.getTime() - 1);
          if (task.getTime() === 0) this.tasksTimer.removeTask(task);
        }
      });
      this.tasksTimer.sortTasks();
      this.updateView();
    }, 1000);
  }

  start() {
    const tasks = this.tasksTimer.getTasks();
    tasks.forEach((task) => {
      this.startTask(task.getId());
    });
  }

  stop() {
    const tasks = this.tasksTimer.getTasks();
    tasks.forEach((task) => {
      this.stopTask(task.getId());
    });
  }

  reset() {
    this.tasksTimer.resetTasks();
    this.updateView();
  }

  // task 추가
  addTask(name, time) {
    this.tasksTimer.addTaskWithSort(name, time);
    this.updateView();
  }

  // task 업데이트
  updateView() {
    const tasks = this.tasksTimer.getTasks();
    const averageTime = this.tasksTimer.getAverageTime();
    this.view.readerUpdate(tasks, averageTime);
    this.view.bindStartUnitTaskTimer(this.startTask.bind(this));
    this.view.bindStopUnitTaskTimer(this.stopTask.bind(this));
  }

  // task 삭제
  removeTask(id) {
    const task = this.tasksTimer.findTaskById(id);
    this.tasksTimer.removeTask(task);
    this.updateView();
  }

  // task 시간 추가
  increaseTime(id) {
    const task = this.tasksTimer.findTaskById(id);
    if (!task) return;
    this.tasksTimer.updateTask(task, task.getTime() + 5);
    this.tasksTimer.sortTasks();
    this.updateView();
  }

  // total 시간 추가
  increaseTotalTime() {
    this.tasksTimer.getTasks().forEach((task) => {
      this.tasksTimer.updateTask(task, task.getTime() + 5);
    });
    this.tasksTimer.sortTasks();
    this.updateView();
  }

  // tasks에 task 복제 추가
  duplicateTasks() {
    const tasks = this.tasksTimer.getTasks();
    tasks.forEach((task) => {
      this.tasksTimer.pushTask(task.name, task.time);
    });
    this.tasksTimer.sortTasks();
    this.updateView();
  }

  // task 정지
  stopTask(id) {
    const task = this.tasksTimer.findTaskById(id);
    task.stop();
    this.view.renderStartButton(task.getId());
  }

  // task 시작
  startTask(id) {
    const task = this.tasksTimer.findTaskById(id);
    task.start();
    this.view.renderStopButton(task.getId());
  }
}

const controller = new Controller();
controller.init();
controller.run();
