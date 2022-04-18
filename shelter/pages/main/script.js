// Burger menu

  const refsBurger = {
    openMenu: document.querySelector(".menu-icon"),
    menu: document.querySelector(".menu-body"),
    menuItems: document.querySelectorAll(".menu-body li"),
    body: document.querySelector('body'),
  };

  function toggleBurger() {
    refsBurger.openMenu.classList.toggle("active");
    refsBurger.menu.classList.toggle("active");
    refsBurger.body.classList.toggle('lock');
  }

refsBurger.openMenu.addEventListener("click", toggleBurger);

refsBurger.menu.addEventListener("click", toggleBurger);

refsBurger.menuItems.forEach(el => {
    el.addEventListener('click', toggleBurger)
  })


//Slider
fetch("./shelter/data/pets.json")
  .then(response => {
    return response.json();
  })
  .then(renderPets);

const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');

//shuffle array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function renderPets(pets) {
  const html = document.querySelector('#list-item').innerHTML.trim();
  const template = Handlebars.compile(html);

  let cardNumber = 0;

  if (window.screen.width >= 1280) {
    cardNumber = 3;
  } else if (window.screen.width < 1280 || window.screen.width <= 768) {
    cardNumber = 2;
  } else if (window.screen.width < 768) {
    cardNumber = 1;
  }

  for (let i = 0; i < cardNumber; i++) {
    const markup = template({
      name: pets[i].name,
      img: pets[i].img,
    })

    const whereToAdd = document.querySelector('.placeToAdd');
    whereToAdd.insertAdjacentHTML('afterend', markup);
  }

  previousButton.addEventListener('click', renderedPageByClick);

  nextButton.addEventListener('click', renderedPageByClick);

  function renderedPageByClick(event, card = cardNumber) {

    shuffleArray(pets);

    function filteredArray() {
      let renderedLi = document.querySelectorAll(".menu__item");
      let liNames = [...renderedLi].map(element => {
        return element.dataset.id;
      })

      liNames = new Set(liNames);

      return pets.filter(function (pet) {
        return !liNames.has(pet.name)
      });
    }

    //find li elements and filter
    const filterPets = filteredArray();
    //clear li from DOM
    function removedRenderedLi() {
      let renderLi = document.querySelectorAll('.menu__item');
      renderLi.forEach(element => {
        element.remove();
      })
    }
    removedRenderedLi();
    //render next li page
    for (let i = 0; i < card; i++) {
      const markup = template({
        name: filterPets[i].name,
        img: filterPets[i].img,
      })
      const whereToAdd = document.querySelector('.placeToAdd');
      whereToAdd.insertAdjacentHTML('afterend', markup);
    }
  }
}



//Modal window

  const refsPopup = {
    openPopup: document.querySelector("[data-modal-open]"),
    closePopup: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

document.addEventListener("DOMContentLoaded", function () {
  let openPopup = document.querySelector("[data-modal-open]")

  openPopup.addEventListener("click", togglePopup);
})


// refsPopup.closePopup.addEventListener("click", togglePopup);

  function togglePopup() {
    refsPopup.modal.classList.toggle("is-hidden");
  }




