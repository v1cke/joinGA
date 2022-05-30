let Tasks = [];


/**
 * function to put values of the task as a JSON in an array and save it in storage
 * 
 * @param {string} title - Value of the field title
 * @param {category} title - Value of the field category
 * @param {date} title - Value of the field date
 * @param {urgency} title - Value of the field urgency
 * @param {text} title - Value of the field description
 * @param {id} title - id of the created task
 * 
 * 
 * */

async function createTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;
    let text = document.getElementById('description').value;
    let id = Tasks.length + 1;

    if (title && date && description) {
        generateTask(title, date, category, urgency, text, id);
        await backend.setItem('Tasks', JSON.stringify(Tasks));
        confirmTask(id);
    }
}


function generateTask(title, date, category, urgency, text, id){
    let task = {
        'title': title,
        'date': date,
        'category': category,
        'urgency': urgency,
        'description': text,
        'taskID': id,
        'menu': false,
    }
    Tasks.push(task);
    console.log(Tasks);
}


function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}


async function loadTasks() {
    await downloadFromServer();
    let TasksAsString = await backend.getItem('Tasks');
    if (TasksAsString){
    Tasks = JSON.parse(Tasks);
    } else {
        Tasks = [];
    }
}


async function confirmTask(taskID) {
    document.getElementById('TaskID').innerHTML = taskID;
    showConfirmMessage();
    
    setTimeout(() => {
        hideConfirmMessage();
    }, 50000);
}


function showConfirmMessage() {
    document.getElementById('confirmMessage').style.display = "block";
}

function hideConfirmMessage() {
    document.getElementById('confirmMessage').style.display = "none";
}