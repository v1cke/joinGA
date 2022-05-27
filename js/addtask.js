let allTasks = [];


/**
 * function to put values of the task as a JSON in an array and save it in storage
 * 
 * @param {string} title - Value of the field title
 * @param {category} title - Value of the field category
 * @param {date} title - Value of the field date
 * @param {urgency} title - Value of the field urgency
 * @param {text} title - Value of the field description
 * @param {id} title - id of the created task
 * */

function createTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let date = document.getElementById('date').value;
    let dateAsString = date.toString();
    let urgency = document.getElementById('urgency').value;
    let text = document.getElementById('description').value;
    let id = allTasks.length + 1;

    if (title && date && description) {
        let task = {
            'title': title,
            'date': dateAsString,
            'category': category,
            'urgency': urgency,
            'description': text,
            'taskID': id,
        };
        allTasks.push(task);
        confirmTask(id);
        console.log(allTasks);
        let allTasksAsString = JSON.stringify(allTasks);
        backend.setItem('allTasks', allTasksAsString);
    }
}


function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}


async function loadAllTasks() {
    await downloadFromServer();
    let allTasksAsString = await backend.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}


function confirmTask(taskID) {
    document.getElementById('TaskID').innerHTML = taskID;
    document.getElementById('confirmMessage').style.display = "block";
    
    setTimeout(() => {
        document.getElementById('confirmMessage').style.display = "none";
    }, 3000);
}