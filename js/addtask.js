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
 * 
 * <script>
        setURL('https://gruppe-213.developerakademie.net/smallest_backend_ever');

    </script>
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
            'menu': false,
        };
        allTasks.push(task);
        console.log(allTasks);
        let allTasksAsString = JSON.stringify(allTasks);
        localStorage.setItem('allTasks', allTasksAsString);
        confirmTask(id);
    }
}


function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}


async function loadAllTasks() {
    //await downloadFromServer();
    let allTasksAsString = await localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
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