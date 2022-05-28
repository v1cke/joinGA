function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  
  }

  function generateBacklogHTML() {
    return `  <div class="backlog-container">
    <div class="color-stripe" style="background-color: --c-${category}"></div>
    <div class="identification">
        <img id="profile-picture" src="./img/man3.jpg" alt="">
        <div>
            <span id="name">Thomas Mauer</span><br>
            <a href="" id="mail">thomas@mail.com</a>
        </div>
    </div>
    <div class="category">
        <div id="category" style="color: --c-${category}">Marketing</div>
    </div>
    <div class="details">
        <span id="details"> Lt consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Culpa unde odit deleniti quaerat, ipsam sit aut accusamus excepturi rem quae voluptatem
            itaque cum ex non accusantium sequi fugiat eaque illo?</span>
    </div>
</div>
    `
  } 