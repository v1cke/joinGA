let loggedUser = [];


/**
 * show the header and footer
 * 
 * @param {string} linkId - current page
 */
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


/**
 *Check the current page and highlight in the header
 *  
 * @param {string} linkId - current page
 */
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


/**
 * load and show the logged in user or the guest image
 */
function showLoggedUserImg() {
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
        let imgUser = loggedUser.img;
        document.getElementById('loggedUserImg').src = imgUser;
    } else {
        document.getElementById('loggedUserImg').src = 'img/guest-48.png';
    }
}


/**
 * remove the logged in user and return to the home page
 */
function logOutUser() {
    localStorage.removeItem('loggedUser');
    window.location.href = "index.html";
}


/**
 * opening the cookies
 */
function openCookies() {
    document.getElementById('cookieTemplate').classList.remove('d-none');
    document.getElementById('privacyTemplate').classList.add('d-none');
    document.getElementById('imprintTemplate').classList.add('d-none');
}


/**
 * opening the privacy
 */
function openPrivacy() {
    document.getElementById('privacyTemplate').classList.remove('d-none');
    document.getElementById('cookieTemplate').classList.add('d-none');
    document.getElementById('imprintTemplate').classList.add('d-none');
}


/**
 * opening the imprint
 */
function openImprint() {
    document.getElementById('imprintTemplate').classList.remove('d-none');
    document.getElementById('cookieTemplate').classList.add('d-none');
    document.getElementById('privacyTemplate').classList.add('d-none');
}


/**
 * close the cookies, privacy and imprint
 */
function closeFlashContainer() {
    document.getElementById('cookieTemplate').classList.add('d-none');
    document.getElementById('privacyTemplate').classList.add('d-none');
    document.getElementById('imprintTemplate').classList.add('d-none');
}