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


function addUser(i) {
    let userInfo = users[i];
    let userName = users[i].name;
    for (let j = 0; j < selectedUser.length; j++) {
        let selection = selectedUser[j];
        showCheckUp();
        // if statement compares the user in array all users "users" with user in the selected users array "selectedUser" if 
        // user exists warning is logged --- with return we get out of the function.
        if (userName == selection.name) {
            selectedUser.splice(j, 1);
            console.log('removed', selectedUser);
            document.getElementById(`checked_${i}`).innerHTML = '';
            showCheckUp();
            loadSelectedUsers();
          //  return;
        }
    }
    //pushes details (JSON) for the selected user to array "selectedUser" --- 
    //this will be the user array to be added to the task in function "loadSelectedUser"
    selectedUser.push(userInfo);
    loadSelectedUsers();
    showCheckUp();
}


function showCheckUp() {
    for (let i = 0; i < users.length; i++) {
        const userName = users[i].name;
        for (let j = 0; j < selectedUser.length; j++) {
            const selectedUserName = selectedUser[j].name;
            if (userName == selectedUserName) {
                document.getElementById(`checked_${i}`).innerHTML = /*html*/ `<img src="img/checkmark.png" class="checkmark">`;
            } else if (userName !== selectedUserName) {
                document.getElementById(`checked_${i}`).innerHTML = ''
            }
        }
    }
}

/**
 * function loadSelectedUsers() {
  // if the delected user array is not empty ---
  if (selectUser != []) {
    document.getElementById("user-img").innerHTML = "";
    for (let i = 0; i < selectUser.length; i++) {
      let userName = selectUser[i].name;
      let userPic = selectUser[i].img;
      document.getElementById("user-img").innerHTML += `                                    
      <div class="added-user">
      <img class="avatar" src=${userPic}>
      <span>${userName}</span>
      </div>`;
    }
  }
}



function removeCheckUp() {
  for (let i = 0; i < users.length; i++) {
    const userName = users[i].name;
    for (let j = 0; j < selectUser.length; j++) {
      const selectedUserName = selectUser[j].name;
      if (userName !== selectedUserName) {
        document.getElementById(
          `checked_${i}`
        ).innerHTML = '';
      }
    }
  }
}


 */

function closeUserContainer() {
    document.getElementById("chooseUserContainer").classList.add("d-none");
    document.body.classList.remove('overflow-hidden');
}