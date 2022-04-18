//Burger menu
// (() => {
//   const refs = {
//     openMenu: document.querySelector(".menu-icon"),
//     menu: document.querySelector(".menu-body"),
//     menuItems: document.querySelectorAll(".menu-body li"),
//     body: document.querySelector('body'),
//   };
//
//   function toggleModal() {
//     refs.openMenu.classList.toggle("active");
//     refs.menu.classList.toggle("active");
//     refs.body.classList.toggle('lock');
//   }
//
//   refs.openMenu.addEventListener("click", toggleModal);
//
//   refs.menu.addEventListener("click", toggleModal);
//
//   refs.menuItems.forEach(el => {
//     el.addEventListener('click', toggleModal)
//   })
//
// })();

//Render cards
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



  nextButton.addEventListener('click', function (event, card = cardNumber) {

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
  })
}

//Slider






