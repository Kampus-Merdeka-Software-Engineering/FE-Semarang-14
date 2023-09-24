var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("myBtn")) {
    modal.style.display = "block";
    }
});

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
    modal.style.display = "block";
    }
};

let navLinks = document.getElementById("navLinks");
function showMenu() {
    navLinks.style.top = "0";
}
function hideMenu() {
    navLinks.style.top = "-1000px";
}

document.querySelector(".submit-email").addEventListener("mousedown", (e) => {
    e.preventDefault();
    document.querySelector(".subscription").classList.add("done");
});
