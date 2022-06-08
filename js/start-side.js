let accountData = [];
let loggedUser = [];
let internUsers = [];

async function loadUsers() {
    let respons = await fetch('./users-backup.json');
    accountData = await respons.json();
    internUsers = JSON.parse(localStorage.getItem('accountData'));
    if (internUsers) {
        accountData = [];
        for (let index = 0; index < internUsers.length; index++) {
            const element = internUsers[index];
            accountData.push(element);
        }
    }
}


function loginUser() {
    let searchUser = [];
    let userName = document.getElementById('userNameField').value;
    let password = document.getElementById('passwordField').value;
    for (let i = 0; i < accountData.length; i++) {
        const user = accountData[i];

        if (userName == user.name && password == user.passwort) {

            searchUser[i] = true;
            loggedUser = user;
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            localStorage.setItem('accountData', JSON.stringify(accountData));
        }
    }
    if (!searchUser.includes(true)) {
        document.getElementById('createContainer').classList.remove('d-none');
        document.getElementById('createContainer').innerHTML = `
    <h2>no User could be found</h2>
    `;
        setTimeout(() => {
            document.getElementById('createContainer').classList.add('d-none');
        }, 2000);

    } else {
        window.location.href = "bord.html";
    }
}


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


async function createUser() {
    let searchUser = [];
    let userName = document.getElementById('createuserNameField').value;
    let password = document.getElementById('createpasswordField').value;
    for (let i = 0; i < accountData.length; i++) {
        const user = accountData[i];
        if (userName == user.name) {
            searchUser[i] = true;
        }
    }

    if (searchUser.includes(true)) {
        document.getElementById('createContainer').classList.remove('d-none');
        document.getElementById('createContainer').innerHTML = `
        <h2>username already exists</h2>
        `;
        setTimeout(() => {
            openCreateUser();
        }, 2000);

    } else {


        let newUser = {
            'name': userName,
            'passwort': password,
            'img': "img/guest-48.png"
        };

        accountData.push(newUser);

        // await backend.setItem('accountData', JSON.stringify(loggedUser));

        localStorage.setItem('accountData', JSON.stringify(accountData));
        console.log(accountData);
        document.getElementById('createContainer').innerHTML = `
        <h2>Account created</h2>
        `;
        setTimeout(() => {
            document.getElementById('createContainer').classList.add('d-none');
        }, 2000);

    }
}


function closeCreateUser() {
    document.getElementById('createContainer').classList.add('d-none');
}


function loginAsGuest() {
    let userName = 'Guest';
    let password = 'Guest';
    let newUser = {
        'name': userName,
        'passwort': password,
        'img': "img/guest-48.png"
    };
    loggedUser = newUser;

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    console.log(loggedUser);
    window.location.href = "bord.html";
}