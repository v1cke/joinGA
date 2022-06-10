let bordTasks = [];


/**
 * load the json and render the backlog
 */
async function renderBacklog() {
    await loadTasks();
    renderBord();
}


/**
 * Load JSON from BackendServer to tasks json
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    countTasksId();
}


/**
 * assigns unique id to each task
 */
 function countTasksId() {
    for (let index = 0; index < tasks.length; index++) {
        let tasksIndexId = tasks[index];
        tasksIndexId.id = idCount;
        idCount++;
    }
}


/**
 * rendering of each task in backlog
 */
function renderBord() {
    document.getElementById('idBacklogContainer').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        document.getElementById('idBacklogContainer').innerHTML += generateBacklogHTML(element, i);
        displaySelectedUser(element, i);
    }
}


/**
 * show each selected user
 * 
 * @param {*} element - current element of tasks json
 * @param {*} i - current index of tasks json
 */
function displaySelectedUser(element, i) {
    let currentTask = document.getElementById(`assignedPersonImgBacklog${i}`);
    for (let j = 0; j < element.assignedPerson.length; j++) {
        const assignedWorker = element.assignedPerson[j];
        currentTask.innerHTML += /* html */ `
            <div class="d-flex f-colum">
                <img src="${assignedWorker.img}">
                <span class="name-Img">${assignedWorker.name}</span>
            </div>
            `
    }
}


/**
 * html for idBacklogContainer
 * 
 * @param {array} element current element of tasks json
 * @param {number} i - current index of tasks json
 * @returns - html for idBacklogContainer
 */
function generateBacklogHTML(element, i) {
    return /* html */ `  
            <div class="backlog-container">
                <div class="color-stripe ${element['urgency']}"></div>
                    <div class="identification">
                        <div id="assignedPersonImgBacklog${i}" class="d-flex flex-wrap gap10"></div>
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
                        <span class="trashContainer"><img onclick="deleteTask(${i})" src="img/trash.png"></span>
                    </div>
                    <div class="backlog-text ">
                    <span>${element['description']}</span>
                    </div>
                </div>
            </div>
    `;
}


/**
 * removing the element from the json after closing the menu
 * 
 * @param {number} id - id of the item to be removed
 */
 function deleteTask(id) {
    let deleteTask = tasks.filter(t => t['id'] == id);
    let index = tasks.indexOf(deleteTask[0]);
    tasks.splice(index, 1);
    renderBord();
    backend.setItem('tasks', JSON.stringify(tasks));
}


/**
 * pushes the selected task into the board and saves it in the backend
 * 
 * @param {number} i - current index of tasks json
 */
function addToBoard(i) {
    let backlog = tasks[i];
    bordTasks = JSON.parse(backend.getItem('bordTasks')) || [];
    bordTasks.push(backlog);
    backend.setItem('bordTasks', JSON.stringify(bordTasks));
    tasks.splice(i, 1);
    backend.setItem('tasks', JSON.stringify(tasks));
    renderBord();
}