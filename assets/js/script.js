// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTaskBtn = $('.add-btn')
const taskDisplayEl = $('.swim-lanes')
const taskTitleInputEl = $('#taskTitle')
const taskDateInputEl = $('#taskDueDate')
const taskDescriptionInputEl = $('#taskDescription')
const taskForm = $('#task-form')
const todoListEl = $('#todo-cards')
const inProgressListEl = $('#in-progress-cards')
const doneListEl = $('#done-cards')

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime()
    const randomNum = Math.floor(Math.random()*1000)
    const taskId = `${timestamp}${randomNum}`
    return taskId
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const newCard = $(`
        <div class="card draggable" data-id="${task.id}" data-status="${task.status}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-date">${task.date}</p>
        <p class="card-date">${task.description}</p>
        <button class="delete-btn btn btn-danger">Delete</button>
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
    $( ".draggable" ).draggable({
        stack: '.swim-lanes'
    })
    
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault()

    // get current saved projects
    const savedTasks = loadTasksFromLocalStorage()
    // get form field values
    const taskTitle = taskTitleInputEl.val()
    const taskDate = taskDateInputEl.val()
    const taskDescription = taskDescriptionInputEl.val()



    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        status: 'todo'
    }
    $('#task-modal').hide()

    savedTasks.push(newTask)

    saveTasksToLocalStorage(savedTasks)

    renderTaskList()

// reset form
    taskTitleInputEl.val('')
    taskDateInputEl.val('')
    taskDescriptionInputEl.val('')

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
    $( ".swim-lane" ).droppable({
        drop: function(event, ui) {
            console.log(event)
            const targetListId = event.target.id.replace('-cards', '')
            const card = ui.draggable[0]
            const taskId = $(card).data('id')
            console.log(targetListId, taskId)
            const savedTasks = loadTasksFromLocalStorage()

            for (const taskData of savedTasks) {

                if (taskData.id == taskId){
 
                    taskData.status = targetListId
                }
            }
            saveTasksToLocalStorage(savedTasks)

            renderTaskList()
        }
    })
}

function openModal (){
    // open modal
    $('#task-modal').show()
    // close modal
    $('.close').click(function () {
        $('#task-modal').hide();
    });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    taskDateInputEl.datepicker()

    addTaskBtn.on('click', openModal)
    taskForm.on('submit', handleAddTask)

    renderTaskList()
    handleDrop()


});
