let allTasks = [];


function createTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let date = document.getElementById('date').value;
    let dateAsString = date.toString();
    let urgency = document.getElementById('urgency').value;
    let text = document.getElementById('description').value;

    if (title && date && description && email) {
        let task = {
            'title': title,
            'date': dateAsString,
            'category': category,
            'urgency': urgency,
            'description': text,
        };
        allTasks.push(task);
        console.log(allTasks);
        let allTasksAsString = JSON.stringify(allTasks);
        localStorage.setItem('allTasks', allTasksAsString);
    }
}


function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}


function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}