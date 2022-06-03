let tasks = [{
    "title": "add Task erstellen",
    "category": "todo",
    "department": "management",
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla perspiciatis, itaque atque et ut quasi. Deleniti ipsum facilis similique at.",
    "date": "06.06.2022",
    "urgency": "low",
}, ];

function createTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let urgency = document.getElementById('urgency').value;
    let text = document.getElementById('description').value;

    let task = {
        title: title,
        date: date,
        category: category,
        urgency: urgency,
        text: text
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



setTimeout(function() {
    document.getElementById('confirmMessage').style.display = "none";
}, 2000);



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
    //showCheckUp();
}


function closeUserContainer() {
    document.getElementById("chooseUserContainer").classList.add("d-none");
    document.body.classList.remove('overflow-hidden');
}