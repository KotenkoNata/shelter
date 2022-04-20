//sticky header

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

  refs.menu.addEventListener("click", toggleModal);
  refs.openMenu.addEventListener("click", toggleModal);
  refs.menuItems.forEach(el => {
    el.addEventListener('click', toggleModal)
  })


//Render pets cards
fetch("./shelter/data/pets.json")
  .then(response => {
    return response.json();
  })
  .then(renderPets);

function renderPets(pets) {
  const html = document.querySelector('#list-item').innerHTML.trim();
  console.log(html)
  const template = Handlebars.compile(html);

  console.log(template)

  let cardNumber = 0;

  if (window.screen.width >= 1280) {
    cardNumber = 8;
  } else if (window.screen.width < 1280 || window.screen.width <= 768) {
    cardNumber = 6;
  } else if (window.screen.width < 768) {
    cardNumber = 3;
  }

  for (let i = 0; i < cardNumber; i++) {
    const markup = template({
      name: pets[i].name,
      img: pets[i].img,
    })

    const whereToAdd = document.querySelector('.pets-friends-list');
    whereToAdd.insertAdjacentHTML('afterbegin', markup);
  }
}


