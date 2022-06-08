let loggedUser = [];


// async function init() {
//     await downloadFromServer();
//     tasks = JSON.parse(backend.getItem('tasks')) || [];
//     users = JSON.parse(backend.getItem('users')) || [];

//     console.log(tasks);
//     console.log(users);

//     await includeHTML();
//     updateActivePage();
// }

async function includeHTML(linkId) {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
    hightlightHeader(linkId);
    showLoggedUserImg();
}


function hightlightHeader(linkId) {
    if (linkId == 'bordLink') {
        document.getElementById('bordLink').classList.add('selectet');
    }
    if (linkId == 'backlogLink') {
        document.getElementById('backlogLink').classList.add('selectet');
    }
    if (linkId == 'addTaskLink') {
        document.getElementById('addTaskLink').classList.add('selectet');
    }
    if (linkId == 'helpLink') {
        document.getElementById('helpLink').classList.add('selectet');
    }
}


function showLoggedUserImg() {
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
        let imgUser = loggedUser.img;
        document.getElementById('loggedUserImg').src = imgUser;
    } else {
        document.getElementById('loggedUserImg').src = 'img/guest-48.png';
    }
}


function logOutUser() {
    // loggedUser.splice(0, 1);
    // localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    localStorage.removeItem('loggedUser');
    // localStorage.clear();
    window.location.href = "index.html";
}


function openCookies() {
    document.getElementById('cookieTemplate').classList.remove('d-none');
}

function closeCookies() {
    document.getElementById('cookieTemplate').classList.add('d-none');
}