// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));

// Task info
const taskTitleInputEl = $('#taskTitle')
const taskDateInputEl = $('#taskDueDate')
const taskDescriptionInputEl = $('#taskDescription')

// Task status
const todoListEl = $('#todo-cards')
const inProgressListEl = $('#in-progress-cards')
const doneListEl = $('#done-cards')

// Generates a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime()
    const randomNum = Math.floor(Math.random()*1000)
    const taskId = `${timestamp}${randomNum}`
    return taskId
}

// Creates a task card
function createTaskCard(task) {
    const newCard = $(`
        <div class="card draggable" data-id="${task.id}" data-status="${task.status}" data-deadline="${task.deadline}">
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

// Renders the task list and make cards draggable
function renderTaskList() {
    const savedTasks = loadTasksFromLocalStorage()

    // Clear lists
    todoListEl.empty()
    inProgressListEl.empty()
    doneListEl.empty()

    // Render cards in lane matching with card status
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

    // Makes card draggable
    $( ".draggable" ).draggable({
        stack: '.swim-lanes'
    })
}

// Handles adding a new task
function handleAddTask(event) {
    event.preventDefault()

    // Get current saved tasks
    const savedTasks = loadTasksFromLocalStorage()

    // Get form field values
    const taskTitle = taskTitleInputEl.val()
    const taskDate = taskDateInputEl.val()
    const taskDescription = taskDescriptionInputEl.val()

    // Can't submit empty fields
    if (taskTitle === '' || taskDate === ''|| taskDescription === '') {
        return
    }

    // Combines tasks info into an array
    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        status: 'todo',
        deadline: 'far'
    }

    // Hides modal after submit
    $('#task-modal').hide()

    // Saves new task info with old task info
    savedTasks.push(newTask)

    // Saves all tasks to local storage
    saveTasksToLocalStorage(savedTasks)

    // Colors card according to date
    taskColor()


    renderTaskList()

// Reset form
    taskTitleInputEl.val('')
    taskDateInputEl.val('')
    taskDescriptionInputEl.val('')

}

// Get tasks from local storage
function loadTasksFromLocalStorage() {
    const savedTasks = taskList || []
    return savedTasks
}

// Saves tasks to local storage
function saveTasksToLocalStorage(tasksData) {
    localStorage.setItem('tasks', JSON.stringify(tasksData))
}


// Handles deleting a task
function handleDeleteTask(event) {
    // Gets the card of the button being deleted
    const cardId = $(event.target).closest('.card').data('id')

    const savedTasks = loadTasksFromLocalStorage()
    const updatedTasks =[]

    // Takes out the card array that was in local storage
    for (const taskData of savedTasks) {
        if (cardId != taskData.id){
            updatedTasks.push(taskData)
        }
    }

    saveTasksToLocalStorage(updatedTasks)

    renderTaskList()
}

// Colors task card if close to date or overdue
function taskColor() {
    const savedTasks = loadTasksFromLocalStorage()
    const currentDate = dayjs().format('MM/DD/YYYY')

    // Gets date of task and current date for comparing
    for (const taskData of savedTasks) {
        const taskDate = dayjs(taskData.date)
        const differenceInHours = taskDate.diff(currentDate, 'hours')

        // Changes card info based on how close in hours
        if (differenceInHours <= 24){
            if (differenceInHours < 0){
                taskData.deadline = 'late'
            } else {
                taskData.deadline = 'near'
            }
        }
    }
    saveTasksToLocalStorage(savedTasks)
}

// Handles dropping a task into a new status lane
function handleDrop(event, ui) {
    $( ".swim-lane" ).droppable({
        drop: function(event, ui) {
            const targetListId = event.target.id.replace('-cards', '')
            const card = ui.draggable[0]
            const taskId = $(card).data('id')
            const savedTasks = loadTasksFromLocalStorage()

            // Checks Id for task that was dropped and changes dropped task's status to match lane
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

// Opens and closes modal form
function openModal (){

    $('#task-modal').show()

    $('.close').click(function () {
        $('#task-modal').hide();
    });
}

// When the page loads, renders the task list, adds event listeners, makes lanes droppable, and makes the due date field a date picker
$(document).ready(function () {
    // Date picker for adding tasks
    taskDateInputEl.datepicker()

    // Event listeners
    $('.add-btn').on('click', openModal)
    $('#task-form').on('submit', handleAddTask)
    $('.swim-lanes').on('click', '.delete-btn', handleDeleteTask)

    //functions
    renderTaskList()
    handleDrop()
    taskColor()
});
