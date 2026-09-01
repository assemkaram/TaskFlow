const appView = document.getElementById("app-view");

const navItems = document.querySelectorAll(".nav-item");


navItems.forEach(item => {

    item.addEventListener("click", function (e) {

        e.preventDefault();

        const view = this.dataset.view;

        changeView(view);
    });

});


function changeView(view) {

    state.currentView = view;

    updateActiveNav();

    renderView();
}

function updateActiveNav() {

    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.view === state.currentView
        );

    });
}

function renderView() {

    switch (state.currentView) {

        case "dashboard":
            renderDashboard();
            break;

        case "tasks":
            renderTasksView();
            break;

        case "today":
            renderTodayView();
            break;

        case "focus":
            renderFocusView();
            break;

        case "analytics":
            renderAnalyticsView();
            break;

        case "settings":
            renderSettingsView();
            break;

        default:
            renderDashboard();
    }
}

function getTotalTasks() {
    return state.tasks.length;
}


function getCompletedTasks() {

    return state.tasks.filter(
        task => task.status === "completed"
    ).length;

}


function getInProgressTasks() {

    return state.tasks.filter(
        task => task.status === "in-progress"
    ).length;

}


function getPendingTasks() {

    return state.tasks.filter(
        task => task.status === "pending"
    ).length;

}

function getProgress() {

    const total = getTotalTasks();

    if (total === 0) {
        return 0;
    }

    return Math.round(
        (getCompletedTasks() / total) * 100
    );

}
function getDashboardTasks() {

    const today = "2026-08-24";

    return state.tasks
        .filter(task => task.dueDate === today)
        .slice(0, 5)
        .map(task => {

            const completed =
                task.status === "completed";

            const statusText = {
                completed: "Completed",
                "in-progress": "In Progress",
                pending: "Pending"
            };

            return `
                <div class="dashboard-task">

                    <div class="task-check">
                        ${
                            completed
                            ? `<i class="fa-solid fa-check"></i>`
                            : ""
                        }
                    </div>

                    <div class="task-details">

                        <h3>${task.title}</h3>

                        <span>
                            ${task.category} •
                            ${task.priority} priority
                        </span>

                    </div>

                    <span class="task-status ${task.status}">
                        ${statusText[task.status]}
                    </span>

                </div>
            `;
        })
        .join("");
}
function renderDashboard() {

    appView.innerHTML = `
        <div class="dashboard-view">

            <!-- Welcome -->
            <div class="dashboard-welcome">

                <div>
                    <span class="welcome-label">
                        OVERVIEW
                    </span>

                    <h1>
                        Good morning,Assem.
                    </h1>

                    <p>
                        Here's what's happening with your productivity today.
                    </p>
                </div>

                <button class="focus-btn" id="dashboard-focus-btn">
                    <i class="fa-solid fa-play"></i>
                    Start Focus
                </button>

            </div>


            <!-- Stats -->
            <div class="dashboard-stats">

                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="fa-regular fa-clipboard"></i>
                    </div>

                    <div class="stat-info">
                        <span>Total Tasks</span>
                        <h2>${getTotalTasks()}</h2>
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <div class="stat-info">
                        <span>Completed</span>
                        <h2>${getCompletedTasks()}</h2>
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="fa-solid fa-spinner"></i>
                    </div>

                    <div class="stat-info">
                        <span>In Progress</span>
                        <h2>${getInProgressTasks()}</h2>
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon">
                        <i class="fa-solid fa-bolt"></i>
                    </div>

                    <div class="stat-info">
                        <span>Focus Time</span>
                        <h2>3h 20m</h2>
                    </div>

                </div>

            </div>


            <!-- Main Dashboard Content -->
            <div class="dashboard-content">


                <!-- Today's Tasks -->
                <div class="dashboard-panel tasks-panel">

                    <div class="panel-header">

                        <div>
                            <h2>Today's Tasks</h2>

                            <p>
                                Your tasks for today
                            </p>
                        </div>

                        <button class="view-all-btn" data-view="today">
                            View All
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>

                    </div>


                    <div class="task-list">
                        ${getDashboardTasks()}
                    </div>

                </div>


                <!-- Productivity -->
                <div class="dashboard-panel productivity-panel">

                    <div class="panel-header">

                        <div>
                            <h2>Today's Progress</h2>

                            <p>
                                Keep going, you're doing great!
                            </p>
                        </div>

                        <span class="progress-percentage">
                            ${getProgress()}%
                        </span>

                    </div>


                    <div class="progress-container">

                        <div class="progress-bar">

                            <span
                                style="width: ${getProgress()}%;">
                            </span>

                        </div>

                    </div>


                    <div class="progress-details">

                        <span>
                            ${getCompletedTasks()}
                            of
                            ${getTotalTasks()}
                            tasks completed
                        </span>

                        <span>
                            ${getPendingTasks() + getInProgressTasks()}
                            remaining
                        </span>

                    </div>


                    <div class="focus-summary">

                        <div>

                            <i class="fa-regular fa-clock"></i>

                            <div>
                                <strong>3h 20m</strong>
                                <span>Focus time</span>
                            </div>

                        </div>


                        <div>

                            <i class="fa-solid fa-fire"></i>

                            <div>
                                <strong>5 days</strong>
                                <span>Current streak</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;
    const focusButton =
    document.getElementById("dashboard-focus-btn");


if (focusButton) {

    focusButton.addEventListener(
        "click",
        () => {

            changeView("focus");

        }
    );

}
}


function renderTasksView() {

    appView.innerHTML = `
        <div class="tasks-view">

            <!-- Tasks Header -->
            <div class="tasks-header">

                <div>
                    <span class="welcome-label">TASK MANAGEMENT</span>

                    <h1>My Tasks</h1>

                    <p>
                        Organize, track, and manage your tasks.
                    </p>
                </div>

                <button class="add-task-btn" id="add-task-btn">
                    <i class="fa-solid fa-plus"></i>
                    Add Task
                </button>

            </div>


            <!-- Filters -->
            <div class="tasks-toolbar">

                <div class="task-search">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        id="task-search"
                        placeholder="Search tasks..."
                        value="${state.filters.search}"
                    >

                </div>


                <div class="task-filters">

                    <select id="category-filter">

                        <option value="all">
                            All Categories
                        </option>

                        <option value="Project">
                            Project
                        </option>

                        <option value="Learning">
                            Learning
                        </option>

                        <option value="Planning">
                            Planning
                        </option>

                        <option value="Development">
                            Development
                        </option>

                        <option value="Study">
                            Study
                        </option>

                        <option value="Career">
                            Career
                        </option>

                    </select>


                    <select id="priority-filter">

                        <option value="all">
                            All Priorities
                        </option>

                        <option value="high">
                            High
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="low">
                            Low
                        </option>

                    </select>


                    <select id="status-filter">

                        <option value="all">
                            All Status
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="in-progress">
                            In Progress
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                    </select>

                </div>

            </div>


            <!-- Tasks Container -->
            <div class="tasks-container">

                <div class="tasks-list-header">

                    <h2>
                        Tasks
                        <span id="tasks-count">
                            ${state.tasks.length}
                        </span>
                    </h2>

                </div>


                <div id="tasks-list">
                    ${renderTasksList()}
                </div>

            </div>

        </div>
    `;

    setupTasksEvents();
    setupAddTaskEvents();
}

function renderTasksList() {

    const tasks = getFilteredTasks();

    if (tasks.length === 0) {

        return `
            <div class="empty-tasks">

                <i class="fa-regular fa-clipboard"></i>

                <h3>No tasks found</h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>
        `;
    }


    return tasks.map(task => {

        const statusText = {
            pending: "Pending",
            "in-progress": "In Progress",
            completed: "Completed"
        };


        return `
            <div class="task-item" data-id="${task.id}">

                <button
                    class="task-check-btn ${
                        task.status === "completed"
                            ? "checked"
                            : ""
                    }"
                    data-action="complete"
                    data-id="${task.id}"
                >

                    ${
                        task.status === "completed"
                            ? `<i class="fa-solid fa-check"></i>`
                            : ""
                    }

                </button>


                <div class="task-item-content">

                    <h3 class="${
                        task.status === "completed"
                            ? "task-completed"
                            : ""
                    }">
                        ${task.title}
                    </h3>

                    <div class="task-meta">

                        <span>
                            ${task.category}
                        </span>

                        <span>
                            ${task.priority}
                        </span>

                        <span>
                            ${task.dueDate}
                        </span>

                    </div>

                </div>


                <span class="task-status ${task.status}">
                    ${statusText[task.status]}
                </span>


                <div class="task-actions">

                    <button
                        data-action="edit"
                        data-id="${task.id}"
                        title="Edit"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>


                    <button
                        data-action="delete"
                        data-id="${task.id}"
                        title="Delete"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>
        `;

    }).join("");
}

function getFilteredTasks() {

    return state.tasks.filter(task => {

        const searchMatch =
            task.title
                .toLowerCase()
                .includes(
                    state.filters.search.toLowerCase()
                );


        const categoryMatch =
            state.filters.category === "all" ||
            task.category === state.filters.category;


        const priorityMatch =
            state.filters.priority === "all" ||
            task.priority === state.filters.priority;


        const statusMatch =
            state.filters.status === "all" ||
            task.status === state.filters.status;


        return (
            searchMatch &&
            categoryMatch &&
            priorityMatch &&
            statusMatch
        );

    });
}

function setupTasksEvents() {

    const searchInput =
        document.getElementById("task-search");

    const categoryFilter =
        document.getElementById("category-filter");

    const priorityFilter =
        document.getElementById("priority-filter");

    const statusFilter =
        document.getElementById("status-filter");


    searchInput.addEventListener("input", function () {

        state.filters.search = this.value;

        updateTasksList();

    });


    categoryFilter.addEventListener("change", function () {

        state.filters.category = this.value;

        updateTasksList();

    });


    priorityFilter.addEventListener("change", function () {

        state.filters.priority = this.value;

        updateTasksList();

    });


    statusFilter.addEventListener("change", function () {

        state.filters.status = this.value;

        updateTasksList();

    });

}

function updateTasksList() {

    const tasksList =
        document.getElementById("tasks-list");

    const tasksCount =
        document.getElementById("tasks-count");


    if (!tasksList) return;


    tasksList.innerHTML =
        renderTasksList();


    tasksCount.textContent =
        getFilteredTasks().length;


    setupTaskActionEvents();

}

function setupTaskActionEvents() {

    const tasksList =
        document.getElementById("tasks-list");

    if (!tasksList) return;


    tasksList.onclick = function (e) {

        const button =
            e.target.closest("[data-action]");

        if (!button) return;


        const taskId =
            Number(button.dataset.id);

        const action =
            button.dataset.action;


        if (action === "complete") {

            toggleTaskStatus(taskId);

        }


        if (action === "delete") {

            deleteTask(taskId);

        }


        if (action === "edit") {

            editTask(taskId);

        }

    };

}

function setupTasksEvents() {

    const searchInput =
        document.getElementById("task-search");

    const categoryFilter =
        document.getElementById("category-filter");

    const priorityFilter =
        document.getElementById("priority-filter");

    const statusFilter =
        document.getElementById("status-filter");


    searchInput.addEventListener("input", function () {

        state.filters.search = this.value;

        updateTasksList();

    });


    categoryFilter.addEventListener("change", function () {

        state.filters.category = this.value;

        updateTasksList();

    });


    priorityFilter.addEventListener("change", function () {

        state.filters.priority = this.value;

        updateTasksList();

    });


    statusFilter.addEventListener("change", function () {

        state.filters.status = this.value;

        updateTasksList();

    });


    setupTaskActionEvents();

}

function toggleTaskStatus(taskId) {

    const task =
        state.tasks.find(task => task.id === taskId);

    if (!task) return;


    if (task.status === "completed") {

        task.status = "pending";

    } else {

        task.status = "completed";

    }


    saveData();

    updateTasksList();

}

function deleteTask(taskId) {

    state.tasks =
        state.tasks.filter(
            task => task.id !== taskId
        );


    saveData();

    updateTasksList();

}

function showAddTaskModal() {

    const modal = document.createElement("div");

    modal.className = "modal-overlay";

    modal.innerHTML = `

        <div class="task-modal">

            <div class="modal-header">

                <div>
                    <span class="welcome-label">
                        TASK MANAGEMENT
                    </span>

                    <h2>Add New Task</h2>
                </div>

                <button
                    class="close-modal"
                    id="close-task-modal"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>


            <form id="add-task-form">

                <div class="form-group">

                    <label for="task-title">
                        Task Title
                    </label>

                    <input
                        type="text"
                        id="task-title"
                        placeholder="What do you need to do?"
                        required
                    >

                </div>


                <div class="form-row">

                    <div class="form-group">

                        <label for="task-category">
                            Category
                        </label>

                        <select id="task-category" required>

                            <option value="">
                                Select category
                            </option>

                            <option value="Project">
                                Project
                            </option>

                            <option value="Learning">
                                Learning
                            </option>

                            <option value="Planning">
                                Planning
                            </option>

                            <option value="Development">
                                Development
                            </option>

                            <option value="Study">
                                Study
                            </option>

                            <option value="Career">
                                Career
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label for="task-priority">
                            Priority
                        </label>

                        <select id="task-priority" required>

                            <option value="">
                                Select priority
                            </option>

                            <option value="high">
                                High
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="low">
                                Low
                            </option>

                        </select>

                    </div>

                </div>


                <div class="form-group">

                    <label for="task-date">
                        Due Date
                    </label>

                    <input
                        type="date"
                        id="task-date"
                        required
                    >

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="cancel-btn"
                        id="cancel-task"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="save-task-btn"
                    >
                        <i class="fa-solid fa-plus"></i>
                        Add Task
                    </button>

                </div>

            </form>

        </div>
    `;


    document.body.appendChild(modal);

    setupAddTaskModalEvents();
}

function setupAddTaskEvents() {

    const addButton =
        document.getElementById("add-task-btn");

    if (!addButton) return;


    addButton.addEventListener("click", function () {

        showAddTaskModal();

    });

}

function setupAddTaskModalEvents() {

    const modal =
        document.querySelector(".modal-overlay");

    const form =
        document.getElementById("add-task-form");

    const closeButton =
        document.getElementById("close-task-modal");

    const cancelButton =
        document.getElementById("cancel-task");


    closeButton.addEventListener("click", closeAddTaskModal);

    cancelButton.addEventListener("click", closeAddTaskModal);


    modal.addEventListener("click", function (e) {

        if (e.target === modal) {
            closeAddTaskModal();
        }

    });


    form.addEventListener("submit", function (e) {

        e.preventDefault();

        addNewTask();

    });

}

function closeAddTaskModal() {

    const modal =
        document.querySelector(".modal-overlay");

    if (modal) {
        modal.remove();
    }

}

function addNewTask() {

    const title =
        document.getElementById("task-title").value.trim();

    const category =
        document.getElementById("task-category").value;

    const priority =
        document.getElementById("task-priority").value;

    const dueDate =
        document.getElementById("task-date").value;


    const newTask = {

        id: Date.now(),

        title: title,

        category: category,

        priority: priority,

        status: "pending",

        dueDate: dueDate

    };


    state.tasks.push(newTask);
    saveData();

    closeAddTaskModal();


    renderTasksView();

}

function getTodayDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}

function getTodayTasks() {

    const today = getTodayDate();

    return state.tasks.filter(
        task => task.dueDate === today
    );

}

function renderTodayTasks() {

    const todayTasks =
        getTodayTasks();


    if (todayTasks.length === 0) {

        return `
            <div class="empty-tasks">

                <i class="fa-regular fa-calendar"></i>

                <h3>No tasks for today</h3>

                <p>
                    Enjoy your day or add a new task.
                </p>

            </div>
        `;

    }


    return todayTasks.map(task => {

        const statusText = {

            pending: "Pending",

            "in-progress": "In Progress",

            completed: "Completed"

        };


        return `
            <div
                class="today-task"
                data-id="${task.id}"
            >

                <button
                    class="task-check-btn ${
                        task.status === "completed"
                            ? "checked"
                            : ""
                    }"
                    data-action="complete"
                    data-id="${task.id}"
                >

                    ${
                        task.status === "completed"
                            ? `<i class="fa-solid fa-check"></i>`
                            : ""
                    }

                </button>


                <div class="today-task-content">

                    <h3 class="${
                        task.status === "completed"
                            ? "task-completed"
                            : ""
                    }">
                        ${task.title}
                    </h3>


                    <div class="task-meta">

                        <span>
                            ${task.category}
                        </span>

                        <span>
                            ${task.priority}
                        </span>

                    </div>

                </div>


                <span class="task-status ${task.status}">
                    ${statusText[task.status]}
                </span>

            </div>
        `;

    }).join("");

}

function renderTodayView() {

    const todayTasks =
        getTodayTasks();


    const completed =
        todayTasks.filter(
            task => task.status === "completed"
        ).length;


    const total =
        todayTasks.length;


    const progress =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    appView.innerHTML = `

        <div class="today-view">


            <!-- Header -->

            <div class="today-header">

                <div>

                    <span class="welcome-label">
                        DAILY PLANNER
                    </span>

                    <h1>Today</h1>

                    <p>
                        Here's what you need to focus on today.
                    </p>

                </div>


                <div class="today-date">

                    <i class="fa-regular fa-calendar"></i>

                    <span>
                        ${new Date().toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                                month: "long",
                                day: "numeric"
                            }
                        )}
                    </span>

                </div>

            </div>


            <!-- Today Stats -->

            <div class="today-stats">


                <div class="today-stat">

                    <span>
                        Today's Tasks
                    </span>

                    <strong>
                        ${total}
                    </strong>

                </div>


                <div class="today-stat">

                    <span>
                        Completed
                    </span>

                    <strong>
                        ${completed}
                    </strong>

                </div>


                <div class="today-stat">

                    <span>
                        Remaining
                    </span>

                    <strong>
                        ${total - completed}
                    </strong>

                </div>


                <div class="today-stat">

                    <span>
                        Progress
                    </span>

                    <strong>
                        ${progress}%
                    </strong>

                </div>


            </div>


            <!-- Progress -->

            <div class="today-progress">

                <div class="today-progress-header">

                    <div>

                        <h2>
                            Today's Progress
                        </h2>

                        <p>
                            Keep moving forward.
                        </p>

                    </div>

                    <strong>
                        ${progress}%
                    </strong>

                </div>


                <div class="progress-bar">

                    <span
                        style="width: ${progress}%">
                    </span>

                </div>

            </div>


            <!-- Tasks -->

            <div class="today-tasks-panel">

                <div class="panel-header">

                    <div>

                        <h2>
                            Today's Tasks
                        </h2>

                        <p>
                            ${total} tasks scheduled for today
                        </p>

                    </div>

                </div>


                <div class="today-task-list">

                    ${renderTodayTasks()}

                </div>

            </div>


        </div>

    `;


    setupTodayEvents();

}

function setupTodayEvents() {

    const todayTaskList =
        document.querySelector(".today-task-list");


    if (!todayTaskList) return;


    todayTaskList.addEventListener(
        "click",
        function (e) {

            const button =
                e.target.closest(
                    '[data-action="complete"]'
                );


            if (!button) return;


            const taskId =
                Number(button.dataset.id);


            toggleTaskStatus(taskId);


            renderTodayView();

        }
    );

}

function renderFocusView() {

    appView.innerHTML = `

        <div class="focus-view">

            <button class="exit-focus" id="exit-focus">
                <i class="fa-solid fa-arrow-left"></i>
                EXIT FOCUS
            </button>


            <div class="focus-container">

                <div class="focus-timer">

                    <div class="timer-content">

                        <div
                            class="timer-value"
                            id="focus-timer"
                        >
                            20:00
                        </div>

                        <div
                            class="timer-status"
                            id="focus-status"
                        >
                            READY
                        </div>

                    </div>

                </div>


                <div class="focus-controls">

                    <button
                        class="focus-main-btn"
                        id="focus-start"
                    >
                        <i class="fa-solid fa-play"></i>
                        START SESSION
                    </button>


                    <button
                        class="focus-reset-btn"
                        id="focus-reset"
                        title="Reset"
                    >
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>

                </div>

            </div>

        </div>

    `;


    updateFocusUI();

    setupFocusEvents();
}

function formatFocusTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;


    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

function updateFocusUI() {

    const timer =
        document.getElementById("focus-timer");

    const status =
        document.getElementById("focus-status");

    const button =
        document.getElementById("focus-start");


    if (!timer || !status || !button) {
        return;
    }


    timer.textContent =
        formatFocusTime(
            state.focus.remaining
        );


    if (state.focus.isRunning) {

        status.textContent = "FOCUSING";

        button.innerHTML = `
            <i class="fa-solid fa-pause"></i>
            PAUSE SESSION
        `;

    } else if (
        state.focus.remaining === 0
    ) {

        status.textContent = "SESSION COMPLETE";

        button.innerHTML = `
            <i class="fa-solid fa-rotate-left"></i>
            START AGAIN
        `;

    } else if (
        state.focus.remaining <
        state.focus.duration
    ) {

        status.textContent = "PAUSED";

        button.innerHTML = `
            <i class="fa-solid fa-play"></i>
            RESUME SESSION
        `;

    } else {

        status.textContent = "READY";

        button.innerHTML = `
            <i class="fa-solid fa-play"></i>
            START SESSION
        `;

    }

}

function toggleFocusTimer() {

    if (state.focus.remaining === 0) {

        resetFocusTimer();

    }


    if (state.focus.isRunning) {

        pauseFocusTimer();

    } else {

        startFocusTimer();

    }

}

function startFocusTimer() {

    if (state.focus.isRunning) {
        return;
    }


    state.focus.isRunning = true;


    state.focus.interval =
        setInterval(() => {

            state.focus.remaining--;


            if (state.focus.remaining <= 0) {

                state.focus.remaining = 0;

                completeFocusSession();

                return;

            }


            updateFocusUI();

        }, 1000);


    updateFocusUI();

}

function pauseFocusTimer() {

    clearInterval(
        state.focus.interval
    );


    state.focus.interval = null;

    state.focus.isRunning = false;


    updateFocusUI();

}

function resetFocusTimer() {

    clearInterval(
        state.focus.interval
    );


    state.focus.interval = null;

    state.focus.isRunning = false;

    state.focus.remaining =
        state.focus.duration;


    updateFocusUI();

}

function completeFocusSession() {

    clearInterval(
        state.focus.interval
    );


    state.focus.interval = null;

    state.focus.isRunning = false;

    state.focus.remaining = 0;


    updateFocusUI();

}

function setupFocusEvents() {

    const startButton =
        document.getElementById("focus-start");

    const resetButton =
        document.getElementById("focus-reset");

    const exitButton =
        document.getElementById("exit-focus");


    startButton.addEventListener(
        "click",
        toggleFocusTimer
    );


    resetButton.addEventListener(
        "click",
        resetFocusTimer
    );


    exitButton.addEventListener(
        "click",
        () => {

            pauseFocusTimer();

            changeView("dashboard");

        }
    );

}




function initApp() {

    loadData();

    renderView();

    updateActiveNav();
}

initApp();