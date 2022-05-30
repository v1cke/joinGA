let backlogTask = [];




/**
 * load the json and render the backlog
 */
function renderBacklog() {
    loadTasks();
    setTimeout(() => {
        renderBord();
    }, 200);
}

/**
 * load the json
 */
async function loadTasks() {
    let respons = await fetch('./backlog-tasks.json');
    backlogTask = await respons.json();
}

/**
 * rendering of each category and order of urgency
 */
function renderBord() {
    document.getElementById('idBacklogContainer').innerHTML = '';
    for (let i = 0; i < backlogTask.length; i++) {
        const element = backlogTask[i];

        document.getElementById('idBacklogContainer').innerHTML += generateBacklogHTML(element);
    }

}

function generateBacklogHTML(element) {
    return `  <div class="backlog-container">
    <div class="color-stripe" style="background-color: --c-${element['urgency']}"></div>
    <div class="identification">
        <img id="profile-picture" src="./img/man3.jpg" alt="">
        <div>
            <span id="name">${element['name']}</span><br>
            <a href="" id="mail">thomas@mail.com</a>
        </div>
    </div>
    <div class="category">
        <div id="category" style="color: --c-${element['department']}">${element['department']}</div>
    </div>
    <div class="details">
        <span id="details">${element['text']}</span>
    </div>
</div>
    `
}