const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const saveLocalButton = document.getElementById('save-local');
const saveSessionButton = document.getElementById('save-session');

let tasks =[];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    if(newTask){
        tasks.push({id: Date.now(), text: newTask});
        taskInput.value = '';
        renderTasks();
    }
});

function renderTasks(){
taskList.innerHTML = '';
tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `<span>${task.text}</span>
    <div>
    <button class="btn btn-warning btn-sm me-2" onclick="editTask(${task.id})">Edit</button>
    <button class="btn btn-warning btn-sm" onclick="deleteTask(${task.id})">Delete</button>
    </div>`;
    taskList.appendChild(li);
});
}

function editTask(id){
    const task = tasks.find((task) => task.id === id);
    const newTask = prompt('edit your task:', task.text);
    if(newTask) {
        task.text = newTask.trim();
        renderTasks();
    }
}

function deleteTask(id){
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
}

saveLocalButton.addEventListener('click', () => {
    const newTask = taskInput.value.trim();
    if(newTask){
        tasks.push({id: Date.now(), text: newTask});
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
        alert('Görev kalıcı olarak kaydedildi!')
    }
});

saveSessionButton.addEventListener('click', () => {
    const newTask = taskInput.value.trim();
    if(newTask){
        tasks.push({id: Date.now(), text: newTask});
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
        alert('Görev geçici olarak kaydedildi!');
    }
    
});

function loadTasks() {
    const storedTasksLocal = JSON.parse(localStorage.getItem('tasks'));
    const storedTasksSession = JSON.parse(localStorage.getItem('tasks'));
 
    if(storedTasksLocal){
        tasks = storedTasksLocal;
        renderTasks();
    }else if (storedTasksSession){
        tasks = storedTasksSession;
        renderTasks();
    }
}
window.onload = loadTasks;
