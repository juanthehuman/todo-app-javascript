const form = document.getElementById('form');
const taskTitle = document.getElementById('taskTitle');
const taskDueDate = document.getElementById('taskDueDate');
const taskDescription = document.getElementById('taskDescription');
const message = document.getElementById('message');
const tasks = document.getElementById('tasks');
const add = document.getElementById('add');
const close = document.querySelectorAll('#close');
const newForm = document.getElementById('newForm');
const modalTitle = document.querySelector('.modal-title');

close.forEach((element) => {
    element.addEventListener('click', () => {
        formValidation();
        message.innerHTML = '';
    });
});

newForm.addEventListener('click', () => {
    modalTitle.innerHTML = 'Add new task';
    add.innerHTML = 'Add';
    resetForm();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

const formValidation = () => {
    if (taskTitle.value === '') {
        message.innerHTML = 'Title field is empty';
    } else {
        message.innerHTML = '';
        storeData();
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();

        (() => {
            add.setAttribute('data-bs-dismiss', '');
        })();
    }
};

let data = [];

const storeData = () => {
    data.push({
        title: taskTitle.value,
        date: taskDueDate.value,
        description: taskDescription.value,
    });

    localStorage.setItem('data', JSON.stringify(data));
    renderTasks();
};

const renderTasks = () => {
    tasks.innerHTML = '';
    data.map((x, y) => {
        const { title, date, description } = x;
        return (tasks.innerHTML += `
        <div id="${y}" class="task">
            <h6>${title}</h6>
            <span class="date">${date}</span>
            <p>${description}</p>
            <div class="actions">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteTask(this)" class="fa-solid fa-trash"></i>
            </div>
        </div>
        `);
    });

    resetForm();
};

const resetForm = () => {
    taskTitle.value = '';
    taskDueDate.value = '';
    taskDescription.value = '';
};

const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);
};

const editTask = (e) => {
    const selectedTask = e.parentElement.parentElement;

    taskTitle.value = selectedTask.children[0].innerHTML;
    taskDueDate.value = selectedTask.children[1].innerHTML;
    taskDescription.value = selectedTask.children[2].innerHTML;

    modalTitle.innerHTML = 'Edit task';
    add.innerHTML = "Update";

    deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    console.log(data);
    renderTasks();
})();