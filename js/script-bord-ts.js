let currentDraggedElementId;
let tasks = [];


screenWidth();


function screenWidth() {
    let draggableCart = document.getElementsByClassName('cart');
    setInterval(() => {
        checkWidth(draggableCart);
    }, 200);
}


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
function fillBord() {
    loadTasks();
    setTimeout(() => {
        renderBord();
    }, 100);
}

/**
 * load the json
 */
async function loadTasks() {
    let respons = await fetch('./tasks.json');
    tasks = await respons.json();
}

/**
 * rendering of each category and order of urgency
 */
function renderBord() {
    checkHightUrgency();
    checkLowUrgency();
    dispalyTodo();
    dispalyInProgress();
    dispalyTesting();
    dispalyDone();
}

/**
 * check of the highest urgency
 */
function checkHightUrgency() {
    let hightUrgency = tasks.filter(t => t['urgency'] == 'hight');
    for (let i = 0; i < hightUrgency.length; i++) {
        let index = tasks.indexOf(hightUrgency[i]);
        urgencyIsHight(index, hightUrgency, i);
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
function urgencyIsHight(index, filterId, i) {
    if (filterId[i]['urgency'] == 'hight') {
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
    let todo = tasks.filter(t => t['category'] == 'todo');
    document.getElementById('todo').innerHTML = /* html */ `
    <span class="headline_bord text-uppercase text-center padding-20"><h3>to do</h3></span>`;
    for (let i = 0; i < todo.length; i++) {
        const todoArray = todo[i];
        document.getElementById('todo').innerHTML += todoHtml(todoArray);
    }
}

/**
 * generate the html for todo
 * 
 * @param {array} todoArray - array with all elements with category todo
 * @returns 
 */
function todoHtml(todoArray) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${todoArray['id']})" class="word_break_all cart padding-20 ${todoArray['urgency']}">
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
                    <p>${todoArray['name']}</p>
                    </div>
                    <span class="word_break_all">${todoArray['email']}</span>
                </div>
                <p class="text_container">${todoArray['text']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${todoArray['date']}</span>
                    <span>${todoArray['department']}</span>
                </div>
            </div>
        `;
}

/**
 * display the items in the inProgress area
 */
function dispalyInProgress() {
    let inProgress = tasks.filter(t => t['category'] == 'inProgress');
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
 * @param {array} inProgressArray - array with all elements with category inProgress
 * @returns 
 */
function inProgressHtml(inProgressArray) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${inProgressArray['id']})" class="word_break_all cart padding-20 ${inProgressArray['urgency']}">
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
                    <p>${inProgressArray['name']}</p>
                    </div>
                    <span class="word_break_all">${inProgressArray['email']}</span>
                </div>
                <p class="text_container">${inProgressArray['text']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${inProgressArray['date']}</span>
                    <span>${inProgressArray['department']}</span>
                </div>
            </div>
        `;
}

/**
 * display the items in the testing area
 */
function dispalyTesting() {
    let testing = tasks.filter(t => t['category'] == 'testing');
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
 * @param {array} testingArray - array with all elements with category testing
 * @returns 
 */
function testingHtml(testingArray) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${testingArray['id']})" class="word_break_all cart padding-20 ${testingArray['urgency']}">
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
                    <p>${testingArray['name']}</p>
                    </div>
                    <span class="word_break_all">${testingArray['email']}</span>
                </div>
                <p class="text_container">${testingArray['text']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${testingArray['date']}</span>
                    <span>${testingArray['department']}</span>
                </div>
            </div>
        `;
}

/**
 * display the items in the done area
 */
function dispalyDone() {
    let done = tasks.filter(t => t['category'] == 'done');
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
 * @param {array} doneArray - array with all elements with category done
 * @returns 
 */
function doneHtml(doneArray) {
    return /* html */ `
            <div draggable="true" ondragstart="startDragging(${doneArray['id']})" class="word_break_all cart padding-20 ${doneArray['urgency']}">
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
                    <p>${doneArray['name']}</p>
                </div>
                    <span class="word_break_all">${doneArray['email']}</span>
                </div>
                <p class="text_container">${doneArray['text']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${doneArray['date']}</span>
                    <span>${doneArray['department']}</span>
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
 * moves an object to another category
 * 
 * @param {string} category - new category of the object to be moved
 * @param {number} id - id of the object to be moved
 */
function moveTo(category, id) {
    if (id) {
        currentDraggedElementId = id;
    }
    let filterId = tasks.filter(t => t['id'] == currentDraggedElementId);
    filterId[0]['category'] = category;
    renderBord();
}

/**
 * Highlight the category to move the item to
 * 
 * @param {string} id - name of the category to which the element should be moved 
 */
function hightlight(id) {
    document.getElementById(id).classList.add('drag_area_highlight');
}

/**
 * remove the highlight of the category to move the item to
 * 
 * @param {string} id - name of the category to which the element should be moved 
 */
function removehightlight(id) {
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