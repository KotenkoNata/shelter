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


fetch("./shelter/data/pets.json")
  .then(response => {
    return response.json();
  })
  .then(renderPets);


function renderPets(pets) {
  const html = document.querySelector('#list-item').innerHTML.trim();
  const template = Handlebars.compile(html);

  pets.forEach(pet => {
    const markup = template({
      name: pet.name,
      img: pet.img,
    })

    const whereToAdd = document.querySelector('.placeToAdd')

    whereToAdd.insertAdjacentHTML('afterend', markup)
  })



}
