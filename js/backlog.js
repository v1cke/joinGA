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

/* <div class="color-stripe" style="background-color:--c-${element['urgency'].toLowerCase()}"></div> */

function generateBacklogHTML(element, i) {
    return /* html */ `  <div class="backlog-container">
                <div class="color-stripe ${element['urgency']}"></div>
             
                    <div class="identification">
                        <div id="assignedPersonImgBacklog${i}"></div>
                    </div>
                    <div class="title">
                        <div>${element['title']}</div>
                    </div>
                    <div class="due-date">
                        <div>${element['date']}</div>
                    </div>
                    <div class="urgency">
                        <div class="${element.category}">${element['category']}</div>
                    </div>
                    <div class="add-to-board">
                        <span><img onclick="addToBoard()" src="img/icon plus.png"></span>
                    </div>
                    <div class="backlog-text ">
                    <span>${element['description']}</span>
                    </div>
                </div>
            </div>
    `
}

function addToBoard() {
    
}