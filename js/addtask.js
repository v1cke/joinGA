let tasks = [];
let users = [];
let selectedUser = [];


/**
 * @param {string} tasks - JSON from backend-server loaded and added to array tasks when loading addtasks.html
 * @param {string} users - JSON from backend-server loaded and added to array users when loading addtasks.html
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    // users = JSON.parse(backend.getItem('users')) || [];
    users = JSON.parse(localStorage.getItem('accountData'));

    if (users.length == 0) {
        let respons = await fetch('./users-backup.json');
        users = await respons.json();
    }
    console.log('die user', users);
}


/**
 * function to put values of the task as a JSON in an array and save it in storage
 * This functions generates a JSON (task) and pushes it in the Tasks-Array. The complete updated Array gets pushed on a backendServer.JSON
 * @param {string} title - Value of the field title
 * @param {string} category - Value of the field category
 * @param {string} date - Value of the field date
 * @param {string} urgency - Value of the field urgency
 * @param {string} text - Value of the field description
 * 
 * */
async function createTask() {
    if (!selectedUser.length == 0) {
        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        let date = document.getElementById('date').value;
        let urgency = document.getElementById('urgency').value;
        let text = document.getElementById('description').value;
        generateTask(title, date, category, urgency, text);
        backend.setItem('tasks', JSON.stringify(tasks));
        confirmTask();
    } else {
        chooseUser();
    }
}


/**
 * JSON task gets pushed into array tasks
 * 
 * @param {string} task - creates new JSON with data from function createTask and selectedUser
 * */
function generateTask(title, date, category, urgency, text) {
    let task = {
        'title': title,
        'date': date,
        'category': category,
        'urgency': urgency,
        'description': text,
        'OpenMenu': false,
        'assignedPerson': selectedUser,
        'id': 0,
        'process': 'todo'
    }
    tasks.push(task);
}


/**
 * Cleaning all fields for restarting task
 */
function cancelTask() {
    document.getElementById('title').innerHTML = "";
    document.getElementById('date').innerHTML = "";
    document.getElementById('description').innerHTML = "";
}


/**
 * displays confirmation-container when task finished and saved
 */
function confirmTask() {
    document.getElementById('confirmContainer').classList.add('d-flex');
}

function hideConfirmContainer() {
    document.getElementById('confirmContainer').style.display = "none";
}


/**
 * displays container with registrated users to choose for assignement
 * @param {string} userName - element name in task users
 * @param {string} userImg - element image in task users
 */
function chooseUser() {
    document.getElementById("chooseUserContainer").innerHTML = "";
    document.getElementById("chooseUserContainer").classList.remove("d-none");
    document.body.classList.add('overflow-hidden');
    document.getElementById("chooseUserContainer").innerHTML += /*html*/ `
        <div id="closeBtn" onclick="closeUserContainer()"><img src="img/icon plus.png" class="close-btn"></div>
        `;
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]["name"];
        let userImg = users[i]["img"];

        //fills ChooseUserContainer with data from Array "users"
        document.getElementById("chooseUserContainer").innerHTML += /*html*/ `
        <div class="choose-person">
            <div class="d-flex a-center">
                <img onclick="addUser(${i}, '${userName}')" src="${userImg}">
            <p onclick="addUser(${i}, '${userName}')">${userName}</p>
        </div>
        <!-- div for check symbol -->
        <div class="checkimg opacity0" id="checked_${i}"><img src="img/checkimg.png"></div>
    </div>`;
        for (let index = 0; index < selectedUser.length; index++) {
            let selectedUserName = selectedUser[index].name;
            if (userName == selectedUserName) {
                document.getElementById(`checked_${i}`).classList.remove('opacity0');
            }
        }
    }
}


/**
 * @param {string} selection - selectedUser from function chooseUser()
 * @param {string} userName - element name of VAR selection()
 * 
 * This function adds user to selectedUser Array. In Case, the user allready added, the function removes the user.
 * return is used in case for removing user, that function finishes
 * */
function addUser(i, userName) {
    let userInfo = users[i];
    for (let j = 0; j < selectedUser.length; j++) {
        let selection = selectedUser[j];
        if (userName == selection.name) {
            selectedUser.splice(j, 1);
            loadSelectedUsers();
            document.getElementById(`checked_${i}`).classList.add('opacity0');
            return;
        }
    }
    selectedUser.push(userInfo);
    document.getElementById(`checked_${i}`).classList.remove('opacity0');
    loadSelectedUsers();
}


/**
 * @param {string} userName - element name in task selectedUser
 * @param {string} userImg - element image in task slectedUser
 * adds assigned user to container slectedUserContainer
 */
function loadSelectedUsers() {
    document.getElementById("selectedUserContainer").innerHTML = "";
    for (let i = 0; i < selectedUser.length; i++) {
        let userName = selectedUser[i].name;
        let userImg = selectedUser[i].img;
        document.getElementById("selectedUserContainer").innerHTML += /* html */ `                                    
                <div id="User${i}" class="assigned-person" onclick="removeUser(${i})">
                    <img src="${userImg}">
                    <p>${userName}</p>
                </div>`;
    }
}


/**
 * 
 * @param {string} selectedUser - deletes selected user (element) from selectedUser Array
 */
function removeUser(i) {
    selectedUser.splice(i, 1);
    loadSelectedUsers();
}


function closeUserContainer() {
    document.getElementById("chooseUserContainer").classList.add("d-none");
    document.body.classList.remove('overflow-hidden');
}