let loggedUser = [];

function showLoggedUserImg() {
    loggedUser = JSON.parse(backend.getItem('loggedUser')) || [];
    if (!loggedUser.length == 0) {
        userImg = loggedUser['img'];
        document.getElementById('loggedUserImg').src = "${userImg}";
    } else {
        document.getElementById('loggedUserImg').src = "img/guest-48.png";
    }
}
function logOutUser(){
    loggedUser.splice(0, 1);
    backend.setItem('loggedUser', JSON.stringify(loggedUser));
    window.location.href ="index.html";
}