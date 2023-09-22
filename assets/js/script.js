// nav bar
let navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.top = "0";
}
function hideMenu() {
  navLinks.style.top = "-1500px";
}

document.querySelector(".submit-email").addEventListener("mousedown", (e) => {
  e.preventDefault();
  document.querySelector(".subscription").classList.add("done");
});

// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
