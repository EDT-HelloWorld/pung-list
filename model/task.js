export class Task {
  constructor(id, name, time) {
    this.id = `task-${id}`;
    this.name = name;
    this.time = time;
    this.play = true;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getTime() {
    return this.time;
  }

  getPlay() {
    return this.play;
  }

  setTime(time) {
    this.time = time;
  }

  stop() {
    this.play = false;
  }

  start() {
    this.play = true;
  }
}
