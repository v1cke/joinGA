let Tasks = [];
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
    backend.setItem('Tasks', JSON.stringify(Tasks));
    confirmTask();
}


/**
 * @param {task} task - creates new JSON with data from function createTask
 * JSON task gets pushed into array Tasks
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
    Tasks.push(task);
    console.log(Tasks);
}


/**
 * @param {Tasks} Tasks - JSON from backend-server loaded and added to array Tasks when loading addtasks.html
 */
async function loadTasks() {
    await downloadFromServer();
    Tasks = JSON.parse(backend.getItem('Tasks')) || [];
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