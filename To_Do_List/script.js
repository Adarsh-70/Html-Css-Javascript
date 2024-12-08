let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const taskText = taskInput.value.trim();
    const taskTime = timeInput.value;

    if (taskText !== '') {
        tasks.push({ text: taskText, time: taskTime });
        taskInput.value = '';
        timeInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.className = 'task';
        taskText.textContent = task.text;

        const taskTime = document.createElement('span');
        taskTime.className = 'time';
        taskTime.textContent = task.time ? `⏰ ${task.time}` : '';

        const actions = document.createElement('div');
        actions.className = 'actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.onclick = () => deleteTask(index);

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(taskTime);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const newTask = prompt('Edit the task:', tasks[index].text);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index].text = newTask.trim();
        renderTasks();
    }
}
