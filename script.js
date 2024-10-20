const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value;
    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = ''; // Clear input field
        saveTasks(); // Save tasks
    }
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach((li) => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(li);
                saveTasks();
            });
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
}
