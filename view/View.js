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

  // 할일 추가 이벤트
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

  // 전체 타이머 증가 이벤트 넣기
  bindIncreaseTotalTimer(handler) {
    this.$buttonTotalIncreaseTimer.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // 전체 시작 버튼 이벤트 넣기
  bindStartTotalTimer(handler) {
    this.$buttonTotalStart.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // 전체 정지 버튼 이벤트 넣기
  bindStopTotalTimer(handler) {
    this.$buttonTotalStop.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // 전체 타이머 증가 버튼 이벤트 넣기
  bindIncreaseTotalTimer(handler) {
    this.$buttonTotalIncreaseTimer.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // 전체 할일 복제하기 이벤트 넣기
  bindDuplicateTasks(handler) {
    this.$buttonTotalCopyTasks.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // 전체 할일 초기화 이벤트 넣기
  bindInitTasks(handler) {
    this.$buttonTotalReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // 단위 타이머 증가 이벤트 넣기
  bindIncreaseUnitTaskTimer(handler) {
    this.$taskList.addEventListener("click", (e) => {
      if (!e.target.classList.contains("increase-timer")) return;
      const $li = e.target.closest("li");
      const id = $li.id;
      handler(id);
    });
  }

  // 단위 삭제 이벤트 넣기
  bindRemoveUnitTask(handler) {
    this.$taskList.addEventListener("click", (e) => {
      if (!e.target.classList.contains("task-delete")) return;
      const $li = e.target.closest("li");
      const id = $li.id;
      handler(id);
    });
  }

  // 단위 타이머 정지 이벤트 넣기
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

  // 단위 타이머 시작 이벤트 넣기
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

  // 단위 타이머 시작 버튼 렌더링
  renderStartButton(id) {
    const $li = this.$taskList.querySelector(`#${id}`);
    $li.querySelector(`#stop-${id}`).classList.add("hide");
    $li.querySelector(`#start-${id}`).classList.remove("hide");
  }

  // 단위 타이머 정지 버튼 렌더링
  renderStopButton(id) {
    const $li = this.$taskList.querySelector(`#${id}`);
    $li.querySelector(`#stop-${id}`).classList.remove("hide");
    $li.querySelector(`#start-${id}`).classList.add("hide");
  }

  // 데이터 업데이트 반영 렌더링
  readerUpdate(tasks, averageTime) {
    this.#renderTasks(tasks);
    this.#renderTotalCount(tasks.length);
    this.#renderAverageTime(averageTime);
  }

  // 총 할일 수 렌더링
  #renderTotalCount(count) {
    this.$totalCount.textContent = count;
  }

  // 전체 평균 남은 시간 렌더링
  #renderAverageTime(averageTime) {
    this.$totalAverageTime.textContent = averageTime.toFixed(1);
  }

  // 단위 할일 렌더링
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
