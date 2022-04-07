//Burger menu

const iconMenu = document.querySelector(".menu-icon");
const menuBody = document.querySelector(".menu-body");

if(iconMenu){
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('lock')
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
  })
}