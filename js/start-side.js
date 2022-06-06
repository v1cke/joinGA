let accountData = [];

async function loadTasks() {
    await downloadFromServer();
    accountData = JSON.parse(backend.getItem('accountData')) || [];
    console.log(accountData);
}