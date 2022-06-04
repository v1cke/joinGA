let backlogTask = [];
let users = [];



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
    users = JSON.parse(backend.getItem('user')) || [];
}

/**
 * rendering of each task in backlog
 */
function renderBord() {
    document.getElementById('idBacklogContainer').innerHTML = '';
    for (let i = 0; i < backlogTask.length; i++) {
        const element = backlogTask[i];

        document.getElementById('idBacklogContainer').innerHTML += generateBacklogHTML(element);
    }
}


function generateBacklogHTML(element) {
    return `  <div class="backlog-container">
    <div class="color-stripe" style="background-color: --c-${element['urgency']}"></div>
    <div class="identification">
        <img id="profile-picture" src="img/man3.jpg" alt="">
        <div>
            <span id="name">${element.assignedPerson[0].name}</span><br>
        </div>
    </div>
    <div class="category">
        <div id="category" class="text-capitalize" style="color: --c-${element['category']}">${element['category']}</div>
    </div>
    <div class="details">
        <span id="details">${element['text']}</span>
    </div>
</div>
    `
}