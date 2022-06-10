let tasks = [];
let users = [];
let selectedUser = [];


/**
 * loads array from backend server
 */
async function loadTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    users = JSON.parse(localStorage.getItem('accountData'));
    await checkUsersLength();
}

/**
 * checks whether the variable users is filled
 */
async function checkUsersLength() {
    if (users.length == 0) {
        let respons = await fetch('./users-backup.json');
        users = await respons.json();
    }
}


/**
 * put values of the task as a JSON in an array and save it in storage
 */
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
    } else { chooseUser(); }
}


/**
 * JSON task gets pushed into array tasks
 * 
 * @param {string} title - value of the field title
 * @param {string} date - value of the field category
 * @param {string} category  - value of the field date
 * @param {string} urgency - value of the field urgency
 * @param {string} text - value of the field description
 */
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
 * cleaning all fields for restarting task
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


/**
 * displays container with registrated users to choose for assignement
 */
function chooseUser(event) {
    event.stopPropagation();
    openChooseUser();
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]["name"];
        let userImg = users[i]["img"];
        document.getElementById("chooseUserContainer").innerHTML += displayThePicturesOfTheUsers(userName, userImg, i);
        dispalyTheHack(userName);
    }
}


/**
 * displays the chooseUser container
 */
function openChooseUser() {
    document.getElementById("hideContainer").classList.remove("d-none");

    document.getElementById("chooseUserContainer").innerHTML = "";
    document.getElementById("chooseUserContainer").classList.remove("d-none");
    document.body.classList.add('overflow-hidden');
    document.getElementById("chooseUserContainer").innerHTML += /*html*/ `
        <div id="closeBtn" onclick="closeUserContainer()"><img src="img/icon plus.png" class="close-btn"></div>
        `;
}


/**
 * show the pictures of the users
 * 
 * @param {string} userName - current user name 
 * @param {string} userImg - current user image
 * @param {number} i - current index of users json 
 * @returns - html for chooseUserContainer
 */
function displayThePicturesOfTheUsers(userName, userImg, i) {
    return /*html*/ `
        <div class="choose-person">
            <div class="d-flex a-center">
                <img onclick="addUser(${i}, '${userName}')" src="${userImg}">
                <p onclick="addUser(${i}, '${userName}')">${userName}</p>
            </div>
            <div class="checkimg opacity0" id="checked_${i}"><img src="img/checkimg.png"></div>
        </div>`;
}


/**
 * show the hoes for selected users
 * 
 * @param {string} userName - current user name
 */
function dispalyTheHack(userName) {
    for (let index = 0; index < selectedUser.length; index++) {
        let selectedUserName = selectedUser[index].name;
        if (userName == selectedUserName) {
            document.getElementById(`checked_${i}`).classList.remove('opacity0');
        }
    }
}


/**
 * adds user to selectedUser Array. In Case, the user allready added, the function removes the user.
 * 
 * @param {number} i - current index of users array
 * @param {string} userName - current user name
 */
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
 * adds assigned user to container slectedUserContainer
 */
function loadSelectedUsers() {
    document.getElementById("selectedUserContainer").innerHTML = "";
    for (let i = 0; i < selectedUser.length; i++) {
        let userName = selectedUser[i].name;
        let userImg = selectedUser[i].img;
        document.getElementById("selectedUserContainer").innerHTML += displayTheSelectetUsers(userName, userImg, i)
    }
}


/**
 * html for selectedUserContainer
 * 
 * @param {string} userName - current user name
 * @param {string} userImg  current user image
 * @param {number} i - current index of selectedUser json
 * @returns html for selectedUserContainer
 */
function displayTheSelectetUsers(userName, userImg, i) {
    return /* html */ `                                    
                <div id="User${i}" class="assigned-person" onclick="removeUser(${i})">
                    <img src="${userImg}">
                    <p>${userName}</p>
                </div>`;
}


/**
 * deletes selected user from selectedUser Array
 * 
 * @param {number} i - current index of selectedUser json
 */
function removeUser(i) {
    selectedUser.splice(i, 1);
    loadSelectedUsers();
}


/**
 * close the chooseUser container
 */
function closeUserContainer() {
    document.getElementById("hideContainer").classList.add("d-none");

    document.getElementById("chooseUserContainer").classList.add("d-none");
    document.body.classList.remove('overflow-hidden');
}