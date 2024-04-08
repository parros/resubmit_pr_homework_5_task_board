// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTaskBtn = $('.btn')
const taskTitleInputEl = $('#taskTitle')
const taskDateInputEl = $('#taskDueDate')
const taskDescriptionInputEl = $('#taskDescription')
const taskForm = $('#task-form')



// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    task.preventDefault()
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault()
    // open modal
    $('#task-modal').show()

    // get current saved projects
    const savedTasks = loadTasksFromLocalStorage()

    // close modal
    $('#submit').click(function(){
        
        // get form field values
        const taskTitle = taskTitleInputEl.val()
        const taskDate = taskDateInputEl.val()
        const taskDescription = taskDescriptionInputEl.val()
        const newTask = {
            Title: taskTitle,
            Date: taskDate,
            Description: taskDescription
        }
        $('#task-modal').hide()

        savedTasks.push(newTask)

        saveTasksToLocalStorage(savedTasks)

        taskTitleInputEl.val('')
        taskDateInputEl.val('')
        taskDescriptionInputEl.val('')
    })

    $('.close').click(function() {
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
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    taskDateInputEl.datepicker()
    
    addTaskBtn.on('click', handleAddTask)

    taskForm.on('submit', createTaskCard)



});
