// function includeHTML() {
//     var z, i, elmnt, file, xhttp;
//     /* Loop through a collection of all HTML elements: */
//     z = document.getElementsByTagName("*");
//     for (i = 0; i < z.length; i++) {
//         elmnt = z[i];
//         /*search for elements with a certain atrribute:*/
//         file = elmnt.getAttribute("w3-include-html");
//         if (file) {
//             /* Make an HTTP request using the attribute value as the file name: */
//             xhttp = new XMLHttpRequest();
//             xhttp.onreadystatechange = function() {
//                 if (this.readyState == 4) {
//                     if (this.status == 200) { elmnt.innerHTML = this.responseText; }
//                     if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
//                     /* Remove the attribute, and call this function once more: */
//                     elmnt.removeAttribute("w3-include-html");
//                     includeHTML();
//                 }
//             }
//             xhttp.open("GET", file, true);
//             xhttp.send();
//             /* Exit the function: */
//             return;
//         }
//     }
// }


async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    users = JSON.parse(backend.getItem('users')) || [];

    console.log(tasks);
    console.log(users);

    await includeHTML();
}

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