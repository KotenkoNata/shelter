window.onscroll = function() {myFunction()};

let header = document.getElementById("petsHeader");
let sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//Burger menu

const iconMenu = document.querySelector(".menu-icon");
const menuBody = document.querySelector(".menu-body");
const logo = document.querySelector(".logo-container");

if(iconMenu){
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('lock')
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
    logo.classList.toggle('active');
  })
}