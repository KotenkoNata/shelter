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

(() => {
  const refs = {
    openMenu: document.querySelector(".menu-icon"),
    menu: document.querySelector(".menu-body"),
    menuItems: document.querySelectorAll(".menu-body li"),
    body: document.querySelector('body'),
    logo: document.querySelector(".logo-container"),
  };

  function toggleModal() {
    refs.openMenu.classList.toggle("active");
    refs.menu.classList.toggle("active");
    refs.logo.classList.toggle("active")
    refs.body.classList.toggle('lock');
  }

  refs.openMenu.addEventListener("click", toggleModal);
  refs.menuItems.forEach(el => {
    el.addEventListener('click', toggleModal)
  })

})();
