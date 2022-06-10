let accountData = [];
let loggedUser = [];
let internUsers = [];
let searchCreateUser = [];
let searchUser = [];



/**
 * load the user
 */
async function loadUsers() {
    let respons = await fetch('./users-backup.json');
    accountData = await respons.json();
    internUsers = JSON.parse(localStorage.getItem('accountData'));
    loadUserFromLocalStorage(internUsers);
}


/**
 * load the saved user
 * 
 * @param {json} internUsers json for the users in local storage
 */
function loadUserFromLocalStorage(internUsers) {
    if (internUsers) {
        accountData = [];
        for (let index = 0; index < internUsers.length; index++) {
            const element = internUsers[index];
            accountData.push(element);
        }
    }
}


/**
 * login current user
 */
function loginUser() {
    let userName = document.getElementById('userNameField').value;
    let password = document.getElementById('passwordField').value;
    checkLoginMatch(userName, password);
    loginOrNot();
}


/**
 * check if name and password match
 * 
 * @param {string} userName - value of the field username
 * @param {string} password - value of the field password
 */
function checkLoginMatch(userName, password) {
    for (let i = 0; i < accountData.length; i++) {
        const user = accountData[i];
        if (userName == user.name && password == user.passwort) {
            loggedUser = user;
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            localStorage.setItem('accountData', JSON.stringify(accountData));
            return searchUser[i] = true;
        }
    }
}


/**
 * if name and password are correct, log in otherwise not
 */
function loginOrNot() {
    if (!searchUser.includes(true)) {
        document.getElementById('createContainer').classList.remove('d-none');
        document.getElementById('createContainer').innerHTML = `<h2>Username or Password are incorrect</h2>`;
        setTimeout(() => {
            document.getElementById('createContainer').classList.add('d-none');
        }, 2000);
    } else { window.location.href = "bord.html"; }
}


/**
 * open the container to create a new user
 */
function openCreateUser() {
    document.getElementById('createContainer').classList.remove('d-none');
    document.getElementById('createContainer').innerHTML = /* html */ `
                <div onclick="closeCreateUser()"><img src="img/icon plus.png" class="close-btn"></div>
                <form onsubmit="event.preventDefault(), createUser()">
                    <div class="txt_field">
                        <input id="createuserNameField" type="text" required>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div class="txt_field">
                        <input id="createpasswordField" type="password" required>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <button type="submit" class="input-button">create Account</button>
                </form>
    `;
}


/**
 * create a new user account
 */
async function createUser() {
    let userName = document.getElementById('createuserNameField').value;
    let password = document.getElementById('createpasswordField').value;
    checkNameAlreadyExists(userName);
    createNewUserOrNot(userName, password);
}


/**
 * check if the user name already exists
 * 
 * @param {string} userName - value of the field create user name
 */
function checkNameAlreadyExists(userName) {
    for (let i = 0; i < accountData.length; i++) {
        const user = accountData[i];
        if (userName == user.name) {
            return searchCreateUser[i] = true;
        }
    }
}


/**
 * show if the user name already exists or create a new user
 * 
 * @param {string} userName - value of the field create user name
 * @param {string} password - value of the field create password
 */
function createNewUserOrNot(userName, password) {
    if (searchCreateUser.includes(true)) {
        displayUserExists();
    } else {
        createNewUser(userName, password);
    }
}


/**
 * show if the user name already exists
 */
function displayUserExists() {
    document.getElementById('createContainer').classList.remove('d-none');
    document.getElementById('createContainer').innerHTML = `
        <h2>username already exists</h2>
        `;
    setTimeout(() => {
        openCreateUser();
    }, 2000);
}


/**
 * create a new user and save in local storage
 * 
 * @param {string} userName - value of the field create user name
 * @param {string} password - value of the field create password
 */
function createNewUser(userName, password) {
    let newUser = {
        'name': userName,
        'passwort': password,
        'img': "img/guest-48.png"
    };
    accountData.push(newUser);
    localStorage.setItem('accountData', JSON.stringify(accountData));
    console.log(accountData);
    document.getElementById('createContainer').innerHTML = `<h2>Account created</h2>`;
    autoCloseContainer();
}


/**
 * close the createContainer after 2 seconds
 */
function autoCloseContainer() {
    setTimeout(() => {
        document.getElementById('createContainer').classList.add('d-none');
    }, 2000);
}


/**
 * close the container to create a new user
 */
function closeCreateUser() {
    document.getElementById('createContainer').classList.add('d-none');
}


/**
 * log in as a guest and save in localStoraage
 */
function loginAsGuest() {
    let userName = 'Guest';
    let password = 'Guest';
    let newUser = {
        'name': userName,
        'passwort': password,
        'img': "img/guest-48.png"
    };
    loggedUser = newUser;
    localStorage.setItem('accountData', JSON.stringify(accountData));
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    console.log(loggedUser);
    window.location.href = "bord.html";
}