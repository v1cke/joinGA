let accountData = [];

async function loadTasks() {
    await downloadFromServer();
    accountData = JSON.parse(backend.getItem('user')) || [];
    console.log(accountData);
}