let tasks = [];
let users = [];
let selectedUser = [];


/**
 * function to put values of the task as a JSON in an array and save it in storage
 * 
 * @param {string} title - Value of the field title
 * @param {category} category - Value of the field category
 * @param {date} date - Value of the field date
 * @param {urgency} urgency - Value of the field urgency
 * @param {text} text - Value of the field description
 * */
async function createTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;
    let text = document.getElementById('description').value;
    generateTask(title, date, category, urgency, text);
    backend.setItem('tasks', JSON.stringify(tasks));
    confirmTask();
}


/**
 * @param {task} task - creates new JSON with data from function createTask
 * JSON task gets pushed into array tasks
 * */
function generateTask(title, date, category, urgency, text) {
    let task = {
        'title': title,
        'date': date,
        'category': category,
        'urgency': urgency,
        'description': text,
        'menu': false,
    }
    tasks.push(task);
}


/**
 * @param {tasks} tasks - JSON from backend-server loaded and added to array tasks when loading addtasks.html
 * @param {users} users - JSON from backend-server loaded and added to array tasks when loading addtasks.html
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    users = JSON.parse(backend.getItem('user')) || [];
}


function confirmTask() {
    document.getElementById('confirmMessage').style.display = "block";

    setTimeout(function () {
        document.getElementById('confirmMessage').style.display = "none";
    }, 2000);
}


function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}


function chooseUser() {
    document.getElementById("chooseUserContainer").innerHTML = "";
    document.getElementById("chooseUserContainer").classList.remove("d-none");
    document.body.classList.add('overflow-hidden');
    document.getElementById("chooseUserContainer").innerHTML += /*html*/ `
        <a id="closeBtn" href="#" onclick="closeUserContainer()"><img src="img/close.png" class="close-btn"></a>
        `;
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]["name"];
        let userImg = users[i]["img"];

        //add data to ChooseUserContainer
        document.getElementById("chooseUserContainer").innerHTML += /*html*/ `
        <div class="choose-person" onclick="addUser(${i}, '${userName}')">
            <img src="img/${userImg}">
            <p>${userName}</p>
            <!-- div for check symbol -->
            <div id="checked_${i}"></div>
        </div>`;
    }
    showCheckUp();
}

/**
 * @param {i} i - VAR from function chooseUser()
 * @param {userName} userName - VAR userName from function chooseUser()
 * 
 * This function adds user to selectedUser Array. In Case, the user allready added, the function removes the user.
 * return ist used in case for removing user that the function finishes
 * */
function addUser(i, userName) {
    let userInfo = users[i];
    for (let j = 0; j < selectedUser.length; j++) {
        let selection = selectedUser[j];
        if (userName == selection.name) {
            selectedUser.splice(j, 1);
            loadSelectedUsers();
            return;
        }
    }
    selectedUser.push(userInfo);
    loadSelectedUsers();
}


function removeUser(i) {
    selectedUser.splice(i, 1);
    loadSelectedUsers();
}


function loadSelectedUsers() {
    document.getElementById("selectedUserContainer").innerHTML = "";
    for (let i = 0; i < selectedUser.length; i++) {
        let userName = selectedUser[i].name;
        let userImg = selectedUser[i].img;
        document.getElementById("selectedUserContainer").innerHTML += `                                    
                <div id="User${i}" class="assigned-person" onclick="removeUser(${i})">
                    <p>${userName}</p>
                    <img src="img/${userImg}">
                </div>`;
    }
    document.getElementById("selectedUserContainer").innerHTML += `                                    
        <a href="#" onclick="chooseUser()"><img src="img/icon plus.png"></a>`
}


function closeUserContainer() {
    document.getElementById("chooseUserContainer").classList.add("d-none");
    document.body.classList.remove('overflow-hidden');
}