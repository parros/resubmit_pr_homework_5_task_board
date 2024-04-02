// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTask = document.getElementById('open-modal-btn')
const taskDescription = document.getElementById('task-description')
const taskDate = document.getElementById('task-due-date')
const taskTitle = document.getElementById('task-title')
const todoBody = document.getElementById('todo-cards')

// function that generates a unique task id
function generateTaskId() {

    const timestamp = new Date().getTime()
    const randomNum = Math.floor(Math.random()*1000)
    
    return`task-${timestamp}-${randomNum}`

}

// Todo: create a function to create a task card

$( function() {
    $( taskDate ).datepicker();
  } )

function createTaskCard() {
    // Create a div element for the task card
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Create elements for task details
    const titleElement = document.createElement('h3');
    titleElement.innerText = taskTitle.value;

    const dateElement = document.createElement('h4');
    dateElement.innerText =taskDate.value;

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = taskDescription.value;

    // Add task details to the task card
    taskCard.appendChild(titleElement);
    taskCard.appendChild(dateElement);
    taskCard.appendChild(descriptionElement);

    // Set a unique ID for the task card
    taskCard.id = generateTaskId();
    console.log(taskCard)
    todoBody.appendChild(taskCard)
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Open the modal when the button is clicked
    $('#open-modal-btn').click(function() {
        $('#task-modal').show();
    });
    
    // Save task when the form is submitted
    $('#task-form').submit(function(event) {
        event.preventDefault();
        const taskName = $('#task-name').val();
            
        // Add task creation logic here (e.g., save to a list, update UI, etc.)
        createTaskCard()
        // Close modal after saving
        $('#task-modal').hide();
    });
}

addTask.addEventListener('click', renderTaskList())

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});


