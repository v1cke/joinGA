function underlineMenu() {

    var a = document.querySelectorAll(".menu a");
    for (var i = 0, length = a.length; i < length; i++) {
      a[i].onclick = function() {
        var b = document.querySelector(".menu a.active");
        if (b) b.classList.remove("active");
        this.parentNode.classList.add('active');
      };
    }
}


/*

function underlineMenu() {
    let menu = document.getElementById('menu')
    let links = menu.getElementsByClassName('nav-link');
    ;
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function(){
          let current = document.getElementsByClassName('active');
          current[0].className = current[0].className.replace('active');
          this.className += "active"
      })
    }
} */