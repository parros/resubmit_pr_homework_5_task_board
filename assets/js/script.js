// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// function that generates a unique task id
function generateTaskId() {

    const timestamp = new Date().getTime()
    const randomNum = Math.floor(Math.random()*1000)
    
    return`task-${timestamp}-${randomNum}`

}

// Todo: create a function to create a task card
function createTaskCard(generateTaskId, taskTitle, taskDescription) {
    // Create a div element for the task card
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Create elements for task details
    const titleElement = document.createElement('h3');
    titleElement.textContent = taskTitle;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = taskDescription;

    // Add task details to the task card
    taskCard.appendChild(titleElement);
    taskCard.appendChild(descriptionElement);

    // Set a unique ID for the task card
    taskCard.id = taskId;

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

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


$(document).ready(function() {
    // Open the modal when the button is clicked
    $('#open-modal-btn').click(function() {
        $('#task-modal').show();
    });

    // Save task when the form is submitted
    $('#task-form').submit(function(event) {
        event.preventDefault();
        const taskName = $('#task-name').val();
        
        // Add task creation logic here (e.g., save to a list, update UI, etc.)

        // Close modal after saving
        $('#task-modal').hide();
    });
});