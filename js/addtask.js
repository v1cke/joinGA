let tasks = [{
    "title": "add Task erstellen",
    "category": "todo",
    "department": "management",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla perspiciatis, itaque atque et ut quasi. Deleniti ipsum facilis similique at.",
    "date": "06.06.2022",
    "urgency": "low",
}, ];

function createTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let urgency = document.getElementById('urgency').value;
    let text = document.getElementById('description').value;

    let task = {
        title: title,
        date: date,
        category: category,
        urgency: urgency,
        text: text
    }

    tasks.push(task);
    console.log(tasks);
}















function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}