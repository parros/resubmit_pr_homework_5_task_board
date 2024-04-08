// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTaskBtn = $('.btn')
const taskTitleInputEl = $('#taskTitle')
const taskDateInputEl = $('#taskDueDate')
const taskDescriptionInputEl = $('#taskDescription')
const taskForm = $('#task-form')

const todoListEl = $('#todo-cards')
const inProgressListEl = $('#in-progress-cards')
const doneListEl = $('#done-cards')

console.log(todoListEl, inProgressListEl ,doneListEl)

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const newCard = $(`
        <div class="card" data-id="${task.id}" data-status="${task.status}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-date">${task.date}</p>
        <p class="card-date">${task.description}</p>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
    `)
    return newCard
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const savedTasks = loadTasksFromLocalStorage()

    todoListEl.empty()
    inProgressListEl.empty()
    doneListEl.empty()

    for (const taskData of savedTasks) {
        const cardEl = createTaskCard(taskData)

        if (taskData.status === 'todo') {
            todoListEl.append(cardEl)
        }   else if (taskData.status === 'in-progress'){
            inProgressListEl.append(cardEl)
        }   else {
            doneListEl.append(cardEl)
        }
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

    // open modal
    $('#task-modal').show()

    // get current saved projects
    const savedTasks = loadTasksFromLocalStorage()

    // close modal
    $('#submit').click(function (event) {
        // get form field values
        event.preventDefault()
        let taskTitle = taskTitleInputEl.val()
        let taskDate = taskDateInputEl.val()
        let taskDescription = taskDescriptionInputEl.val()
        let timestamp = new Date().getTime()
        let randomNum = Math.floor(Math.random()*1000)

        const newTask = {
            id: `${timestamp}${randomNum}`,
            title: taskTitle,
            date: taskDate,
            description: taskDescription,
            status: 'todo'
        }
        $('#task-modal').hide()


        savedTasks.push(newTask)

        saveTasksToLocalStorage(savedTasks)

        renderTaskList()



        taskTitleInputEl.val('')
        taskDateInputEl.val('')
        taskDescriptionInputEl.val('')
    })

    $('.close').click(function () {
        $('#task-modal').hide();
    });


    // reset form

}


function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    return savedTasks
}


function saveTasksToLocalStorage(tasksData) {
    localStorage.setItem('tasks', JSON.stringify(tasksData))
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    taskDateInputEl.datepicker()

    addTaskBtn.on('click', handleAddTask)

    renderTaskList()

});
