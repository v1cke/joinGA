
  function generateBacklogHTML() {
    return `  <div class="backlog-container">
    <div class="color-stripe" style="background-color: --c-${priority}"></div>
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