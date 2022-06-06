let accountData = [];
let loggedUser = [];

async function loadTasks() {
    await downloadFromServer();
    accountData = JSON.parse(backend.getItem('user')) || [];
    console.log(accountData);
}


async function loginUser(){
    let userName = document.getElementById('userNameField').value;
    let password = document.getElementById('passwordField').value;
    for (let i = 0; i < accountData.length; i++) {
        const user = accountData[i];
        if (userName == user.name && password == user.passwort){
            loggedUser.push('user');
            await backend.setItem('loggedUser', JSON.stringify(loggedUser));
            window.location.href ="addtask.html";
        } 
    }
}