let tasks = [];
let users = [];
//let taskID = 0;


/**
 * function to put values of the task as a JSON in an array and save it in storage
 * 
 * @param {string} title - Value of the field title
 * @param {category} category - Value of the field category
 * @param {date} date - Value of the field date
 * @param {urgency} urgency - Value of the field urgency
 * @param {text} text - Value of the field description
 * @param {id} id - id of the created task
 * */
async function createTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;
    let text = document.getElementById('description').value;
    //taskID = taskID ++;
    generateTask(title, date, category, urgency, text);
    backend.setItem('tasks', JSON.stringify(tasks));
    confirmTask();
}


/**
 * @param {task} task - creates new JSON with data from function createTask
 * JSON task gets pushed into array tasks
 * */
function generateTask(title, date, category, urgency, text) {
    let task = {
        'title': title,
        'date': date,
        'category': category,
        'urgency': urgency,
        'description': text,
        //   'taskID': taskID,
        'menu': false,
    }
    tasks.push(task);
    console.log(tasks);
    console.log(users);
}


/**
 * @param {tasks} tasks - JSON from backend-server loaded and added to array tasks when loading addtasks.html
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    users = JSON.parse(backend.getItem('user')) || [];
}


/**
 * 
 * @param {taskID} taskID - shows confirmMessage container with actual ID of the task, closes container after 3 seconds
 */
function confirmTask() {
    //document.getElementById('TaskID').innerHTML = taskID;
    document.getElementById('confirmMessage').style.display = "block";

    setTimeout(function() {
        document.getElementById('confirmMessage').style.display = "none";
    }, 5000);
}


function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}