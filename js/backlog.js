let backlogTask = [];


/**
 * load the json and render the backlog
 */
async function renderBacklog() {
    await loadTasks();
    renderBord();
}

/**
 * load the json
 */
async function loadTasks() {
    await downloadFromServer();
    backlogTask = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * rendering of each task in backlog
 */
function renderBord() {
    document.getElementById('idBacklogContainer').innerHTML = '';
    for (let i = 0; i < backlogTask.length; i++) {
        const element = backlogTask[i];
        document.getElementById('idBacklogContainer').innerHTML += generateBacklogHTML(element, i);
        let currentTask = document.getElementById(`assignedPersonImgBacklog${i}`);
        for (let j = 0; j < element.assignedPerson.length; j++) {
            const assignedWorker = element.assignedPerson[j];
            currentTask.innerHTML += `
            <img src="img/${assignedWorker.img}">
            ` 
        }
    }
}


function generateBacklogHTML(element, i, assignedWorker) {
    return `  <div class="backlog-container">
    <div class="color-stripe" style="background-color:--c-${element['urgency'].toLowerCase()}"></div>
    <div class="identification">
        <div id="assignedPersonImgBacklog${i}">
            
        </div>
    </div>
    <div class="title">
        <div>${element['title']}</div>
    </div>
    <div class="due-date">
        <div>${element['date']}</div>
    </div>
    <div class="urgency">
        <div style="color: --c-${element.urgency}">${element['urgency']}</div>
    </div>
    <div class="details">
        <span>${element['description']}</span>
    </div>
</div>
    `
}