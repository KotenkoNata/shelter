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


//shuffle array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

//Pagination

const openFirstPage = document.querySelector('.first');
const openLastPage = document.querySelector('.fifth');
const openNextPage = document.querySelector('.fourth');
const openPreviousPage = document.querySelector('.second');
const pageNumber = document.querySelector('.third');


//Render pets cards
fetch("./shelter/data/pets.json")
  .then(response => {
    return response.json();
  })
  .then(renderPets);

function renderPets(pets) {

  openFirstPage.disabled = true;
  openPreviousPage.disabled = true;

  const html = document.querySelector('#list-item').innerHTML.trim();
  const template = Handlebars.compile(html);

  let cardNumber = 0;

  const randomArray = shuffleArray(pets);


  if (window.screen.width >= 1280) {
    cardNumber = 8;
  } else if (window.screen.width < 1280 && window.screen.width >= 768) {
    cardNumber = 6;
  } else if (window.screen.width < 768) {
    cardNumber = 3;
  }

  for (let i = 0; i < cardNumber; i++) {
    const markup = template({
      name: randomArray[i].name,
      img: randomArray[i].img,
    })

    const whereToAdd = document.querySelector('.pets-friends-list');
    whereToAdd.insertAdjacentHTML('afterbegin', markup);
  }



  openNextPage.addEventListener('click', renderPageByClick);
  openLastPage.addEventListener('click', renderPageByClick);
  openPreviousPage.addEventListener('click', renderPageByClick);
  openFirstPage.addEventListener('click',renderPageByClick);


  function renderPageByClick(event, card = cardNumber) {

    let numberOfPage = parseInt(pageNumber.innerHTML);

    //clear li from DOM
    function removedRenderedLi() {
      let renderLi = document.querySelectorAll('.menu__item');
      renderLi.forEach(element => {
        element.remove();
      })
    }

    removedRenderedLi();

    if(event.target.dataset.page === 'next'){

      for (let i = numberOfPage * card; i < ((numberOfPage + 1) * card); i++) {

        const markup = template({
          name: randomArray[i].name,
          img: randomArray[i].img,
        })

        const whereToAdd = document.querySelector('.pets-friends-list');
        whereToAdd.insertAdjacentHTML('afterbegin', markup);
        openFirstPage.disabled = false;
        openPreviousPage.disabled = false;
        openLastPage.disabled = false;
        openNextPage.disabled = false;
        openFirstPage.classList.add('active');
        openPreviousPage.classList.add('active');
        openLastPage.classList.add('active');
        openNextPage.classList.add('active');
        changePageNumber(numberOfPage+1);
      }


    }
    if(event.target.dataset.page === 'last'){

      for (let i = randomArray.length - card; i < randomArray.length; i++) {
        const markup = template({
          name: randomArray[i].name,
          img: randomArray[i].img,
        })

        const whereToAdd = document.querySelector('.pets-friends-list');
        whereToAdd.insertAdjacentHTML('afterbegin', markup);

        changePageNumber(randomArray.length / card);
      }
    }

    if(event.target.dataset.page === 'first'){

      for (let i = 0; i < card; i++) {
        const markup = template({
          name: randomArray[i].name,
          img: randomArray[i].img,
        })

        const whereToAdd = document.querySelector('.pets-friends-list');
        whereToAdd.insertAdjacentHTML('afterbegin', markup);

        changePageNumber(1);

      }
    }

    if(event.target.dataset.page === 'previous'){

      for (let i = ((numberOfPage - 2) * card); i < ((numberOfPage - 1) * card); i++) {

        const markup = template({
          name: randomArray[i].name,
          img: randomArray[i].img,
        })

        const whereToAdd = document.querySelector('.pets-friends-list');
        whereToAdd.insertAdjacentHTML('afterbegin', markup);
        openFirstPage.disabled = false;
        openPreviousPage.disabled = false;
        openLastPage.disabled = false;
        openNextPage.disabled = false;
        openFirstPage.classList.add('active');
        openPreviousPage.classList.add('active');
        openLastPage.classList.add('active');
        openNextPage.classList.add('active');

        changePageNumber(numberOfPage-1);
      }
    }

  }
}

function changePageNumber(number) {
  pageNumber.innerHTML = `${number}`;

  if(number === 1){
    openFirstPage.disabled = true;
    openPreviousPage.disabled = true;
    openLastPage.disabled = false;
    openNextPage.disabled = false;
    openFirstPage.classList.remove('active');
    openPreviousPage.classList.remove('active');
    openLastPage.classList.add('active')
    openNextPage.classList.add('active')
  }
  if(number === 6 || number === 8 || number === 16){
    openLastPage.disabled = true;
    openNextPage.disabled = true;
    openFirstPage.disabled = false;
    openPreviousPage.disabled = false;
    openLastPage.classList.remove('active')
    openNextPage.classList.remove('active')
    openFirstPage.classList.add('active')
    openPreviousPage.classList.add('active')
  }
}

//Modal window
const refsPopup = {
  closePopup: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
};

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded() {

  const openPopups = document.querySelectorAll("li.menu__item");

  openPopups.forEach(openPopup => {
    openPopup.addEventListener("click", function openPopup(event) {
      event.preventDefault();

      const htmlScroll = document.querySelector('html');
      htmlScroll.classList.add('block-scroll');

      fetch("./shelter/data/pets.json")
        .then(response => {
          return response.json();
        })
        .then(renderedPopupPet);

      let idPet = event.target.dataset.id;

      function renderedPopupPet(pets) {

        function filteredPets() {
          return pets.filter(function (pet) {
            return pet.name === idPet;
          });
        }

        let renderPet = filteredPets();
        const html = document.querySelector('#popup-item').innerHTML.trim();
        const template = Handlebars.compile(html);

        const markup = template({
          name: renderPet[0].name,
          imgModal: renderPet[0].imgModal,
          type: renderPet[0].type,
          breed: renderPet[0].breed,
          description: renderPet[0].description,
          age: renderPet[0].age,
          inoculations: renderPet[0].inoculations,
          diseases: renderPet[0].diseases,
          parasites: renderPet[0].parasites,
        })

        const whereToAdd = document.querySelector('.pop-close-button');
        whereToAdd.insertAdjacentHTML('afterend', markup);
      }

      refsPopup.modal.classList.toggle("is-hidden");
    });
  })
}

// Close Popup

refsPopup.closePopup.addEventListener("click", closePopup);

window.onclick = function(event) {
  if (event.target === refsPopup.modal) {
    refsPopup.modal.classList.toggle("is-hidden");

    //remove class block-scroll for HTML element
    const htmlScroll = document.querySelector('html');
    htmlScroll.classList.remove('block-scroll');

    //clear popup container
    let html = document.querySelector('.popup__container');
    html.remove();
  }
}

function closePopup() {
  refsPopup.modal.classList.toggle("is-hidden");


  //remove class block-scroll for HTML element
  const htmlScroll = document.querySelector('html');
  htmlScroll.classList.remove('block-scroll');

  //clear popup container
  let html = document.querySelector('.popup__container');
  html.remove();
}







