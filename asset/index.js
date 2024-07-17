document.addEventListener('DOMContentLoaded', (event) => {
    const tasks = [
        { name: "study english", priority: "Low", status: "Todo", deadline: "2022-03-02" },
        { name: "gym and workout", priority: "Medium", status: "Doing", deadline: "2022-03-09" },
        { name: "complete the Practice6", priority: "High", status: "Done", deadline: "2022-03-09" }
    ];

    function renderTasks() {
        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${task.name}</td>
                <td><span class="badge ${getPriorityClass(task.priority)}">${task.priority}</span></td>
                <td><span class="badge ${getStatusClass(task.status)}">${task.status}</span></td>
                <td>${task.deadline}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewTask(${index})">View</button>
                    <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
                </td>
            `;

            taskTableBody.appendChild(row);
        });
    }

    function getPriorityClass(priority) {
        switch (priority) {
            case 'Low': return 'priority-low';
            case 'Medium': return 'priority-medium';
            case 'High': return 'priority-high';
            default: return '';
        }
    }

    function getStatusClass(status) {
        switch (status) {
            case 'Todo': return 'status-todo';
            case 'Doing': return 'status-doing';
            case 'Done': return 'status-done';
            default: return '';
        }
    }

    window.viewTask = function (index) {
        const task = tasks[index];
        document.getElementById('viewTaskName').innerText = task.name;
        document.getElementById('viewTaskPriority').innerText = task.priority;
        document.getElementById('viewTaskStatus').innerText = task.status;
        document.getElementById('viewTaskDeadline').innerText = task.deadline;
        const viewTaskModal = new bootstrap.Modal(document.getElementById('viewTaskModal'));
        viewTaskModal.show();
    };

    window.editTask = function (index) {
        const task = tasks[index];
        document.getElementById('editTaskName').value = task.name;
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskStatus').value = task.status;
        document.getElementById('editTaskDeadline').value = task.deadline;

        const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        editTaskModal.show();

        document.getElementById('editTaskForm').onsubmit = function (e) {
            e.preventDefault();
            task.name = document.getElementById('editTaskName').value;
            task.priority = document.getElementById('editTaskPriority').value;
            task.status = document.getElementById('editTaskStatus').value;
            task.deadline = document.getElementById('editTaskDeadline').value;
            renderTasks();
            editTaskModal.hide();
        };
    };

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    window.showAddTaskModal = function () {
        const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
        addTaskModal.show();

        document.getElementById('addTaskForm').onsubmit = function (e) {
            e.preventDefault();
            const task = {
                name: document.getElementById('addTaskName').value,
                priority: document.getElementById('addTaskPriority').value,
                status: document.getElementById('addTaskStatus').value,
                deadline: document.getElementById('addTaskDeadline').value
            };
            tasks.push(task);
            renderTasks();
            addTaskModal.hide();
        };
    };

    renderTasks();
});
