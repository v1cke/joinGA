let currentDraggedElementId;
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
    countTasksId();
    renderBord();
}


/**
 * load the json
 */
async function loadTasks() {
    await downloadFromServer();
    bordTasks = JSON.parse(backend.getItem('bordTasks')) || [];
}


/**
 * assigns unique id to each task
 */
function countTasksId() {
    for (let index = 0; index < bordTasks.length; index++) {
        let tasksIndexId = bordTasks[index];
        tasksIndexId.id = idCount;
        idCount++;
    }
}


/**
 * rendering of each process and order of urgency
 */
function renderBord() {
    checkHighUrgency();
    checkLowUrgency();
    displayOfTheDifferentProcesses('todo');
    displayOfTheDifferentProcesses('inProgress');
    displayOfTheDifferentProcesses('testing');
    displayOfTheDifferentProcesses('done');
}


/**
 * check of the highest urgency
 */
function checkHighUrgency() {
    let highUrgency = bordTasks.filter(t => t['urgency'] == 'high');
    for (let i = 0; i < highUrgency.length; i++) {
        let index = bordTasks.indexOf(highUrgency[i]);
        urgencyIsHigh(index, highUrgency, i);
    }
}


/**
 * check the least urgency
 */
function checkLowUrgency() {
    let lowUrgency = bordTasks.filter(t => t['urgency'] == 'low');
    for (let i = 0; i < lowUrgency.length; i++) {
        let index = bordTasks.indexOf(lowUrgency[i]);
        urgencyIsLow(index, lowUrgency, i);
    }
}


/**
 * bring the element to the first position of the json
 * 
 * @param {number} index - index position in json
 * @param {array} filterId - array with elements to be changed
 * @param {number} i - current position in the for loop
 */
function urgencyIsHigh(index, filterId, i) {
    if (filterId[i]['urgency'] == 'high') {
        bordTasks.splice(index, 1);
        bordTasks.unshift(filterId[i]);
    }
}


/**
 * bring the element to the last position of the json
 * 
 * @param {number} index - index position in json
 * @param {array} filterId - array with elements to be changed
 * @param {number} i - current position in the for loop
 */
function urgencyIsLow(index, filterId, i) {
    if (filterId[i]['urgency'] == 'low') {
        bordTasks.splice(index, 1);
        bordTasks.push(filterId[i]);
    }
}


/**
 * display the items in the todo area
 * 
 * @param {string} processValue - correct process name
 */
function displayOfTheDifferentProcesses(processValue) {
    let process = bordTasks.filter(t => t['process'] == processValue);
    document.getElementById(processValue).innerHTML = /* html */ `
    <span  class="headline_bord text-uppercase text-center padding-20"><h3>${processValue}</h3></span>`;
    for (let i = 0; i < process.length; i++) {
        const processArray = process[i];
        document.getElementById(processValue).innerHTML += cartHtml(processArray);
        displayUsersImg(processArray);
        checkTodoAndFillMenu(processArray, processValue);
        checkInProgressAndFillMenu(processArray, processValue);
        checkTestingAndFillMenu(processArray, processValue);
        checkDoneAndFillMenu(processArray, processValue);
    }
}



function displayUsersImg(processArray) {
    let currentTask = document.getElementById(`assignedUserBord${processArray['id']}`);
    for (let j = 0; j < processArray.assignedPerson.length; j++) {
        const assignedUser = processArray.assignedPerson[j];
        currentTask.innerHTML += `
            <div class="d-flex f-colum">
                <img src="${assignedUser.img}">
                <span class="name-Img">${assignedUser.name}</span>
            </div>
            `;
    }
}


/**
 * generate the html for every process
 * 
 * @param {array} cartArray - array with all elements for the specific process
 * @returns - html code for the cart
 */
function cartHtml(cartArray) {
    return /* html */ `
            <div draggable="true" onclick="addFullHeight(${cartArray['id']})" ondragstart="startDragging(${cartArray['id']})" class="word_break_all cart padding-20">
                <div class="color-stripe ${cartArray['urgency']}"></div>   
                <div id="menu${cartArray['id']}" onclick="openMenu(${cartArray['id']})" class="p-absolute d-flex j-center-a-center cursor-pointer cart_menu_btn">
                    <div  class="menu_btn_burger  "></div>
                    <ul id="list${cartArray['id']}" class="drop_menu p-absolute d-none f-colum w-space-nowrap">
                        
                    </ul>
                </div>
                <h4 class="text-center">${cartArray['title']}</h4>
                <div>
                    <div class="d-flex">
                    <span id="assignedUserBord${cartArray['id']}" class="assignedUser gap10 d-flex flex-wrap"></span>
                    </div>
                </div>
                <p id="boardTextId${cartArray['id']}" class="text_container">${cartArray['description']}</p>
                <div class="d-flex j-space-betwen">
                    <span>${cartArray['date']}</span>
                    <span class="text-capitalize ${cartArray['category']}">${cartArray['category']}</span>
                </div>
            </div>
        `;
}


function addFullHeight(i) {

    document.getElementById(`boardTextId${i}`).classList.toggle('heightAuto');

    document.getElementById(`assignedUserBord${i}`).classList.toggle('heightAuto');
    // console.log(document.getElementById(`assignedUserBord${i}`).children)



}


/**
 * filling the menu with all possible options for todo container
 * 
 * @param {array} processArray - array with the right content for the specific process
 * @param {string} processValue - correct process name
 */
function checkTodoAndFillMenu(processArray, processValue) {
    if (processValue == 'todo') {
        document.getElementById(`list${processArray['id']}`).innerHTML = `
            <li onclick="moveTo('inProgress', ${processArray['id']})">Move to In Progress</li>
            <li onclick="moveTo('testing', ${processArray['id']})">Move to Testing</li>
            <li onclick="moveTo('done', ${processArray['id']})">Move to Done</li>
            <li onclick="removeTask(${processArray['id']})">Delete</li>
        `;
    }
}


/**
 * filling the menu with all possible options for inProgress container
 * 
 * @param {array} processArray - array with the right content for the specific process
 * @param {string} processValue - correct process name
 */
function checkInProgressAndFillMenu(processArray, processValue) {
    if (processValue == 'inProgress') {
        document.getElementById(`list${processArray['id']}`).innerHTML = `
            <li onclick="moveTo('todo', ${processArray['id']})">Move to To Do</li>
            <li onclick="moveTo('testing', ${processArray['id']})">Move to Testing</li>
            <li onclick="moveTo('done', ${processArray['id']})">Move to Done</li>
            <li onclick="removeTask(${processArray['id']})">Delete</li>
        `;
    }
}


/**
 * filling the menu with all possible options for testing container
 * 
 * @param {array} processArray - array with the right content for the specific process
 * @param {string} processValue - correct process name
 */
function checkTestingAndFillMenu(processArray, processValue) {
    if (processValue == 'testing') {
        document.getElementById(`list${processArray['id']}`).innerHTML = `
            <li onclick="moveTo('todo', ${processArray['id']})">Move to To Do</li>
            <li onclick="moveTo('inProgress', ${processArray['id']})">Move to In Progress</li>
            <li onclick="moveTo('done', ${processArray['id']})">Move to Done</li>
            <li onclick="removeTask(${processArray['id']})">Delete</li>
        `;
    }
}


/**
 * filling the menu with all possible options for done container
 * 
 * @param {array} processArray - array with the right content for the specific process
 * @param {string} processValue - correct process name
 */
function checkDoneAndFillMenu(processArray, processValue) {
    if (processValue == 'done') {
        document.getElementById(`list${processArray['id']}`).innerHTML = `
            <li onclick="moveTo('todo', ${processArray['id']})">Move to To Do</li>
            <li onclick="moveTo('inProgress', ${processArray['id']})">Move to In Progress</li>
            <li onclick="moveTo('testing', ${processArray['id']})">Move to Testing</li>
            <li onclick="removeTask(${processArray['id']})">Delete</li>
        `;
    }
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
    let filterId = bordTasks.filter(t => t['id'] == currentDraggedElementId);
    filterId[0]['process'] = process;
    renderBord();
    backend.setItem('bordTasks', JSON.stringify(bordTasks));
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
    let menuBtnId = bordTasks.filter(t => t['id'] == id);
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
    listContainer.classList.remove('d-none');
    listContainer.classList.add('d-flex');
    setTimeout(() => {
        listContainer.classList.add('show');
        menuBtnId[0]['OpenMenu'] = true;
    });

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
    setTimeout(() => {
        listContainer.classList.remove('d-flex');
        listContainer.classList.add('d-none');
    });


}


/**
 * closing the menu before removing the element from the json
 * 
 * @param {number} id - id of the item to be removed
 */
function removeTask(id) {
    let menuBtnId = bordTasks.filter(t => t['id'] == id);
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
    let removeTask = bordTasks.filter(t => t['id'] == id);
    let index = bordTasks.indexOf(removeTask[0]);
    bordTasks.splice(index, 1);
    renderBord();
    backend.setItem('bordTasks', JSON.stringify(bordTasks));
}

function openSliderMenu() {
    document.getElementById('sliderlinks').classList.toggle('open');
    document.getElementById('sliderList').classList.toggle('d-none');
    document.getElementById('sliderList').classList.toggle('d-flex');
    setTimeout(() => {
        document.getElementById('sliderList').classList.toggle('show');
    });
}