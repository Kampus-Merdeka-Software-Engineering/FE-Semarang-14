let navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.top = "0";
}
function hideMenu() {
  navLinks.style.top = "-1500px";
}

//AnimasiTransparanscroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  if (window.scrollY > 50) { 
    navbar.classList.add('nav-transparent');
  } else {
    navbar.classList.remove('nav-transparent');
  }
});
  