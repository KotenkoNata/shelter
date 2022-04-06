window.onscroll = function() {myFunction()};

let header = document.getElementById("petsHeader");
let sticky = header.offsetTop;

function myFunction() {
  if (window.scrollY >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}