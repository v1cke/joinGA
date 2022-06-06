let pushToBoardTask = [];


/**
 * load the json and render the backlog
 */
async function renderBacklog() {
    await loadTasks();
    renderBord();
}

/**
 * @param {backlogTask} backlogTask - Load JSON from BackendServer to backlogTask Array
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}


/**
 * @param {element} element - each JSON from backlogTask Array
 * @param {currentTask} currenTask - replaces innerHTML of assignedPersonImgBacklog
 * @param {assignedPerson} assignedPerson - JSON with assigned users in JSON from backlogTask Array
 * rendering of each task in backlog
 */
function renderBord() {
    document.getElementById('idBacklogContainer').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        document.getElementById('idBacklogContainer').innerHTML += generateBacklogHTML(element, i);
        let currentTask = document.getElementById(`assignedPersonImgBacklog${i}`);
        for (let j = 0; j < element.assignedPerson.length; j++) {
            const assignedWorker = element.assignedPerson[j];
            currentTask.innerHTML += `
            <img src="${assignedWorker.img}">
            `
        }
    }
}


/**
 * 
 * creates container with data from Array backlogTask / function renderBord() 
 */
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
                        <span><img onclick="addToBoard(${i})" src="img/icon plus.png"></span>
                    </div>
                    <div class="backlog-text ">
                    <span>${element['description']}</span>
                    </div>
                </div>
            </div>
    `
}

function addToBoard(i) {
    let backlog = tasks[i];
    pushToBoardTask.push(backlog);
    backend.setItem('bordTasks', JSON.stringify(pushToBoardTask));
    tasks.splice(i, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
    renderBord();
}