let currentDraggedElementId;
let tasks = [];
let bordTasks = [];
let idCount = 1;


screenWidth();


/**
 * screen width under 600px draggable disable
 */
function screenWidth() {
    let draggableCart = document.getElementsByClassName('cart');
    setInterval(() => {
        checkWidth(draggableCart);
    }, 200);
}


/**
 * check the width
 * 
 * @param {string} draggableCart - content of the class to be deactivated
 */
function checkWidth(draggableCart) {
    let width = window.innerWidth;
    if (width <= 600) {
        for (let i = 0; i < draggableCart.length; i++) {
            const element = draggableCart[i];
            element.draggable = false;
        }
    } else if (width > 600) {
        for (let i = 0; i < draggableCart.length; i++) {
            const element = draggableCart[i];
            element.draggable = true;
        }
    }
}


/**
 * load the json and render the board
 */
async function fillBord() {
    await loadTasks();
    renderBord();
}


/**
 * load the json
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    // bordTasks = JSON.parse(backend.getItem('bordTasks')) || [];
}


/**
 * rendering of each process and order of urgency
 */
function renderBord() {
    countTasksId();
    checkHighUrgency();
    checkLowUrgency();
    dispalyTodo();
    dispalyInProgress();
    dispalyTesting();
    dispalyDone();
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
 * check of the highest urgency
 */
function checkHighUrgency() {
    let highUrgency = tasks.filter(t => t['urgency'] == 'high');
    for (let i = 0; i < highUrgency.length; i++) {
        let index = tasks.indexOf(highUrgency[i]);
        urgencyIsHigh(index, highUrgency, i);
    }
}


/**
 * check the least urgency
 */
function checkLowUrgency() {
    let lowUrgency = tasks.filter(t => t['urgency'] == 'low');
    for (let i = 0; i < lowUrgency.length; i++) {
        let index = tasks.indexOf(lowUrgency[i]);
        urgencyIsLow(index, lowUrgency, i);
    }
}


/**
 * bring the element to the first position of the json
 * 
 * @param {number} index - index position in json
 * @param {array} filterId - array with elements to be changed
 * @param {number} i - position in the for loop
 */
function urgencyIsHigh(index, filterId, i) {
    if (filterId[i]['urgency'] == 'high') {
        tasks.splice(index, 1);
        tasks.unshift(filterId[i]);
    }
}


/**
 * bring the element to the last position of the json
 * 
 * @param {number} index - index position in json
 * @param {array} filterId - array with elements to be changed
 * @param {number} i - position in the for loop
 */
function urgencyIsLow(index, filterId, i) {
    if (filterId[i]['urgency'] == 'low') {
        tasks.splice(index, 1);
        tasks.push(filterId[i]);
    }
}


/**
 * display the items in the todo area
 */
function dispalyTodo() {
    let todo = tasks.filter(t => t['process'] == 'todo');
    document.getElementById('todo').innerHTML = /* html */ `
    <span class="headline_bord text-uppercase text-center padding-20"><h3>to do</h3></span>`;
    for (let i = 0; i < todo.length; i++) {
        const todoArray = todo[i];
        document.getElementById('todo').innerHTML += todoHtml(todoArray, i);
        let currentTask = document.getElementById(`assignedUserBord${i}`);
        for (let j = 0; j < todoArray.assignedPerson.length; j++) {
            const assignedUser = todoArray.assignedPerson[j];
            currentTask.innerHTML += `
            <img src="img/${assignedUser.img}">
            `
        }
    }
}


/**
 * generate the html for todo
 * 
 * @param {array} todoArray - array with all elements with process todo
 * @returns 
 */
function todoHtml(todoArray, i) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${todoArray['id']})" class="word_break_all cart padding-20">
                <div class="color-stripe ${todoArray['urgency']}"></div>   
                <div id="menu${todoArray['id']}" onclick="openMenu(${todoArray['id']})" class="p-absolute d-flex j-center-a-center cursor-pointer cart_menu_btn">
                    <div class="menu_btn_burger "></div>
                    <ul id="list${todoArray['id']}" class="drop_menu p-absolute d-flex f-colum w-space-nowrap">
                        <li onclick="moveTo('inProgress', ${todoArray['id']})">Move to In Progress</li>
                        <li onclick="moveTo('testing', ${todoArray['id']})">Move to Testing</li>
                        <li onclick="moveTo('done', ${todoArray['id']})">Move to Done</li>
                        <li onclick="removeTask(${todoArray['id']})">Delete</li>
                    </ul>
                </div>
                <h4 class="text-center">${todoArray['title']}</h4>
                <div>
                    <div class="d-flex">
                    <span id="assignedUserBord${i}" class="assignedUser"></span>
                    </div>
                </div>
                <p class="text_container">${todoArray['description']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${todoArray['date']}</span>
                    <span class="text-capitalize ${todoArray['category']}">${todoArray['category']}</span>
                </div>
            </div>
        `;
}


/**
 * display the items in the inProgress area
 */
function dispalyInProgress() {
    let inProgress = tasks.filter(t => t['process'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = /* html */ `
    <span class="headline_bord text-uppercase text-center padding-20"><h3>in Progress</h3></span>`;
    for (let i = 0; i < inProgress.length; i++) {
        const inProgressArray = inProgress[i];
        document.getElementById('inProgress').innerHTML += inProgressHtml(inProgressArray);
    }
}


/**
 * generate the html for inProgress
 * 
 * @param {array} inProgressArray - array with all elements with process inProgress
 * @returns 
 */
function inProgressHtml(inProgressArray) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${inProgressArray['id']})" class="word_break_all cart padding-20">
                <div class="color-stripe ${inProgressArray['urgency']}"></div>      
                <div id="menu${inProgressArray['id']}" onclick="openMenu(${inProgressArray['id']})" class="p-absolute d-flex j-center-a-center cursor-pointer cart_menu_btn">
                    <div class="menu_btn_burger "></div>
                    <ul id="list${inProgressArray['id']}" class="drop_menu p-absolute d-flex f-colum w-space-nowrap">
                        <li onclick="moveTo('todo', ${inProgressArray['id']})">Move to To Do</li>
                        <li onclick="moveTo('testing', ${inProgressArray['id']})">Move to Testing</li>
                        <li onclick="moveTo('done', ${inProgressArray['id']})">Move to Done</li>
                        <li onclick="removeTask(${inProgressArray['id']})">Delete</li>
                    </ul>
                </div>
                <h4 class="text-center">${inProgressArray['title']}</h4>
                <div>
                    <div class="d-flex">
                    <span>${inProgressArray['name']}</span>
                    </div>
                </div>
                <p class="text_container">${inProgressArray['text']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${inProgressArray['date']}</span>
                    <span class="text-capitalize ${inProgressArray['category']}">${inProgressArray['department']}</span>
                </div>
            </div>
        `;
}


/**
 * display the items in the testing area
 */
function dispalyTesting() {
    let testing = tasks.filter(t => t['process'] == 'testing');
    document.getElementById('testing').innerHTML = /* html */ `
    <span class="headline_bord text-uppercase text-center padding-20"><h3>testing</h3></span>`;
    for (let i = 0; i < testing.length; i++) {
        const testingArray = testing[i];
        document.getElementById('testing').innerHTML += testingHtml(testingArray);
    }
}


/**
 * generate the html for testing
 * 
 * @param {array} testingArray - array with all elements with process testing
 * @returns 
 */
function testingHtml(testingArray) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${testingArray['id']})" class="word_break_all cart padding-20">
                <div class="color-stripe ${testingArray['urgency']}"></div>     
                <div id="menu${testingArray['id']}" onclick="openMenu(${testingArray['id']})" class="p-absolute d-flex j-center-a-center cursor-pointer cart_menu_btn">
                    <div class="menu_btn_burger "></div>
                    <ul id="list${testingArray['id']}" class="drop_menu p-absolute d-flex f-colum w-space-nowrap">
                        <li onclick="moveTo('todo', ${testingArray['id']})">Move to To Do</li>
                        <li onclick="moveTo('inProgress', ${testingArray['id']})">Move to In Progress</li>
                        <li onclick="moveTo('done', ${testingArray['id']})">Move to Done</li>
                        <li onclick="removeTask(${testingArray['id']})">Delete</li>
                    </ul>
                </div>
                <h4 class="text-center">${testingArray['title']}</h4>
                <div>
                    <div class="d-flex">
                    <span>${testingArray['name']}</span>
                    </div>
                </div>
                <p class="text_container">${testingArray['text']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${testingArray['date']}</span>
                    <span class="text-capitalize ${testingArray['category']}">${testingArray['department']}</span>
                </div>
            </div>
        `;
}


/**
 * display the items in the done area
 */
function dispalyDone() {
    let done = tasks.filter(t => t['process'] == 'done');
    document.getElementById('done').innerHTML = /* html */ `
    <span class="headline_bord text-uppercase text-center padding-20"><h3>done</h3></span>`;
    for (let i = 0; i < done.length; i++) {
        const doneArray = done[i];
        document.getElementById('done').innerHTML += doneHtml(doneArray);
    }
}


/**
 * generate the html for done
 * 
 * @param {array} doneArray - array with all elements with process done
 * @returns 
 */
function doneHtml(doneArray) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${doneArray['id']})" class="word_break_all cart padding-20">
                <div class="color-stripe ${doneArray['urgency']}"></div>   
                <div id="menu${doneArray['id']}" onclick="openMenu(${doneArray['id']})" class="p-absolute d-flex j-center-a-center cursor-pointer cart_menu_btn">
                    <div class="menu_btn_burger "></div>
                    <ul id="list${doneArray['id']}" class="drop_menu p-absolute d-flex f-colum w-space-nowrap">
                        <li onclick="moveTo('todo', ${doneArray['id']})">Move to To Do</li>
                        <li onclick="moveTo('inProgress', ${doneArray['id']})">Move to In Progress</li>
                        <li onclick="moveTo('testing', ${doneArray['id']})">Move to Testing</li>
                        <li onclick="removeTask(${doneArray['id']})">Delete</li>
                    </ul>
                </div>
                <h4 class="text-center">${doneArray['title']}</h4><div>
                <div class="d-flex">
                    <span>${doneArray['name']}</span>
                </div>
                </div>
                <p class="text_container">${doneArray['text']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${doneArray['date']}</span>
                    <span class="text-capitalize ${doneArray['category']}">${doneArray['department']}</span>
                </div>
            </div>
        `;
}


/**
 * saves the id of the object to be moved
 * 
 * @param {number} id - id of the object to be moved
 */
function startDragging(id) {
    currentDraggedElementId = id;
}


/**
 * allowed to drop an object
 * 
 * @param {event} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * moves an object to another process
 * 
 * @param {string} process - new process of the object to be moved
 * @param {number} id - id of the object to be moved
 */
function moveTo(process, id) {
    if (id) {
        currentDraggedElementId = id;
    }
    let filterId = tasks.filter(t => t['id'] == currentDraggedElementId);
    filterId[0]['process'] = process;
    renderBord();
}


/**
 * Highlight the process to move the item to
 * 
 * @param {string} id - name of the process to which the element should be moved 
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag_area_highlight');
}


/**
 * remove the highlight of the process to move the item to
 * 
 * @param {string} id - name of the process to which the element should be moved 
 */
function removehighlight(id) {
    document.getElementById(id).classList.remove('drag_area_highlight');
}


/**
 * open the menu
 * 
 * @param {number} id - id of the menu to be opened
 */
function openMenu(id) {
    let menuBtnId = tasks.filter(t => t['id'] == id);
    let menuBtn = document.getElementById(`menu${id}`)
    let listContainer = document.getElementById(`list${id}`)
    if (!menuBtnId[0]['OpenMenu']) {
        dispalyMenu(listContainer, menuBtnId, menuBtn, id);
    } else {
        removeMenu(listContainer, menuBtnId, menuBtn, id);
    }
}


/**
 * display of the menu
 * 
 * @param {string} listContainer - Content to be changed
 * @param {array} menuBtnId - array with elements to be changed
 * @param {string} menuBtn - Content to be changed 
 */
function dispalyMenu(listContainer, menuBtnId, menuBtn) {
    menuBtn.classList.add('open');
    listContainer.classList.add('show');
    menuBtnId[0]['OpenMenu'] = true;
}


/**
 * close the menu
 * 
 * @param {string} listContainer - Content to be changed
 * @param {array} menuBtnId - array with elements to be changed
 * @param {string} menuBtn - Content to be changed 
 */
function removeMenu(listContainer, menuBtnId, menuBtn) {
    menuBtn.classList.remove('open');
    listContainer.classList.remove('show');
    menuBtnId[0]['OpenMenu'] = false;
}


/**
 * closing the menu before removing the element from the json
 * 
 * @param {number} id - id of the item to be removed
 */
function removeTask(id) {
    let menuBtnId = tasks.filter(t => t['id'] == id);
    let menuBtn = document.getElementById(`menu${id}`)
    let listContainer = document.getElementById(`list${id}`)
    removeMenu(listContainer, menuBtnId, menuBtn, id);
    setTimeout(() => {
        removeIt(id);
    }, 100);
}


/**
 * removing the element from the json after closing the menu
 * 
 * @param {number} id - id of the item to be removed
 */
function removeIt(id) {
    let removeTask = tasks.filter(t => t['id'] == id);
    let index = tasks.indexOf(removeTask[0]);
    tasks.splice(index, 1);
    renderBord();
}