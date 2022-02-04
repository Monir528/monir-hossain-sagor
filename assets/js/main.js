const menuButton = document.getElementById("hamburger");
const popupMenu = document.querySelector(".pop-mainmenu");

menuButton.addEventListener("click", function(e) {
    popupMenu.classList.toggle("active");
});

popupMenu.addEventListener("click", function(e) {
    popupMenu.classList.toggle("active");
});

window.addEventListener("scroll", function(e) {
    popupMenu.classList.remove("active");
});