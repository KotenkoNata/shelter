//Burger menu
(() => {
  const refs = {
    openMenu: document.querySelector(".menu-icon"),
    menu: document.querySelector(".menu-body"),
    menuItems: document.querySelectorAll(".menu-body li"),
    body: document.querySelector('body'),
  };

  function toggleModal() {
    refs.openMenu.classList.toggle("active");
    refs.menu.classList.toggle("active");
    refs.body.classList.toggle('lock');
  }

  refs.openMenu.addEventListener("click", toggleModal);
  refs.menuItems.forEach(el => {
    el.addEventListener('click', toggleModal)
  })

})();