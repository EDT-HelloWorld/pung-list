export class View {
  constructor() {
    // task 추가
    this.$dataAddForm;
    this.$inputAddName;
    this.$buttonAddFiveSeconds;
    this.$buttonAddTenSeconds;
    this.$buttonAddTwentySeconds;

    // 합계현황
    this.$totalCount;
    this.$totalAverageTime;

    // 전체 task 컨트롤러
    this.$totalTaskController;
    this.$buttonTotalReset;
    this.$buttonTotalCopyTasks;
    this.$buttonTotalIncreaseTimer;
    this.$buttonTotalStop;
    this.$buttonTotalStart;

    // task 라이브 현황
    this.$taskList;
    this.$taskUnit;
  }

  init() {
    this.$dataAddForm = document.querySelector(".data-add-form");
    this.$inputAddName = document.querySelector("#input-add-name");
    this.$buttonAddFiveSeconds = document.querySelector(
      "#button-add-five-seconds"
    );
    this.$buttonAddTenSeconds = document.querySelector(
      "#button-add-ten-seconds"
    );
    this.$buttonAddTwentySeconds = document.querySelector(
      "#button-add-twenty-seconds"
    );

    this.$totalCount = document.querySelector("#total-count");
    this.$totalAverageTime = document.querySelector("#total-average-time");

    this.$totalTaskController = document.querySelector(
      ".total-task-controller"
    );
    this.$buttonTotalReset = document.querySelector("#button-total-reset");
    this.$buttonTotalCopyTasks = document.querySelector(
      "#button-total-copy-tasks"
    );
    this.$buttonTotalIncreaseTimer = document.querySelector(
      "#button-total-increase-timer"
    );
    this.$buttonTotalStop = document.querySelector("#button-total-stop");
    this.$buttonTotalStart = document.querySelector("#button-total-start");

    this.$taskList = document.querySelector("#task-list");
    this.$taskUnit = document.querySelectorAll(".task-unit");
  }

  // task 추가 이벤트
  bindAddTask(handler) {
    this.$buttonAddFiveSeconds.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this.$inputAddName.value, 5);
      this.$inputAddName.value = "";
    });
    this.$buttonAddTenSeconds.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this.$inputAddName.value, 10);
      this.$inputAddName.value = "";
    });
    this.$buttonAddTwentySeconds.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this.$inputAddName.value, 20);
      this.$inputAddName.value = "";
    });
  }

  // total task 초기화
  bindResetTotalTask(handler) {
    this.$buttonTotalReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // total task 복사
  bindCopyTotalTask(handler) {
    this.$buttonTotalCopyTasks.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // total task 타이머 증가
  bindIncreaseTotalTimer(handler) {
    this.$buttonTotalIncreaseTimer.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // total task 타이머 정지
  bindStopTotalTimer(handler) {
    this.$buttonTotalStop.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // total task 타이머 시작
  bindStartTotalTimer(handler) {
    this.$buttonTotalStart.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // total start 시작 버튼 이벤트 넣기
  bindStartTotalTimer(handler) {
    this.$buttonTotalStart.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // total stop 시작 버튼 이벤트 넣기
  bindStopTotalTimer(handler) {
    this.$buttonTotalStop.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  bindIncreaseTotalTimer(handler) {
    this.$buttonTotalIncreaseTimer.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  bindDuplicateTasks(handler) {
    this.$buttonTotalCopyTasks.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  bindInitTasks(handler) {
    this.$buttonTotalReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  bindIncreaseUnitTaskTimer(handler) {
    this.$taskList.addEventListener("click", (e) => {
      if (!e.target.classList.contains("increase-timer")) return;
      const $li = e.target.closest("li");
      const id = $li.id;
      handler(id);
    });
  }

  bindRemoveUnitTask(handler) {
    this.$taskList.addEventListener("click", (e) => {
      if (!e.target.classList.contains("task-delete")) return;
      const $li = e.target.closest("li");
      const id = $li.id;
      handler(id);
    });
  }

  bindStopUnitTaskTimer(handler) {
    this.$taskList.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.target.classList.contains("task-stop")) return;
      const $li = e.target.closest("li");
      const id = $li.id;
      handler(id);
    });
  }

  bindStartUnitTaskTimer(handler) {
    this.$taskList.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.target.classList.contains("task-start")) return;
      const $li = e.target.closest("li");
      const id = $li.id;
      handler(id);
    });
  }

  renderStartButton(id) {
    const $li = this.$taskList.querySelector(`#${id}`);
    $li.querySelector(`#stop-${id}`).classList.add("hide");
    $li.querySelector(`#start-${id}`).classList.remove("hide");
  }

  renderStopButton(id) {
    const $li = this.$taskList.querySelector(`#${id}`);
    $li.querySelector(`#stop-${id}`).classList.remove("hide");
    $li.querySelector(`#start-${id}`).classList.add("hide");
  }

  readerUpdate(tasks, averageTime) {
    this.#renderTasks(tasks);
    this.#renderTotalCount(tasks.length);
    this.#renderAverageTime(averageTime);
  }

  // total count 변경
  #renderTotalCount(count) {
    this.$totalCount.textContent = count;
  }

  // total average time 변경
  #renderAverageTime(averageTime) {
    this.$totalAverageTime.textContent = averageTime.toFixed(1);
  }

  // rander tasks
  #renderTasks(tasks) {
    this.$taskList.innerHTML = "";
    tasks.forEach((task) => {
      const $li = document.createElement("li");
      $li.id = task.getId();
      $li.classList.add("task-unit");
      $li.innerHTML = `
        <span class="task-name">${task.getName()}</span>
        <span class="task-time">${task.getTime()} 초</span>
        <button class="btn increase-timer">+5초</button>
        <button class="btn task-stop ${
          task.getPlay() ? "" : "hide"
        }" id=\"stop-${task.getId()}\">중지</button>
        <button class="btn task-start ${
          task.getPlay() ? "hide" : ""
        }" id=\"start-${task.getId()}\" >시작</button>
        <button class="btn task-delete">삭제</button>
      `;
      this.$taskList.appendChild($li);
    });
  }
}
