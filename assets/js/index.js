// Subscriptions handling
var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var submit = document.querySelector(".submit-email");
var input = document.querySelector(".add-email");
var subscription = document.querySelector(".subscription");

submit.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (!email.test(input.value)) {
        subscription.classList.add("error");
    } else {
        subscription.classList.add("done");
        subscription.classList.remove("error");
    }
});

// Modal handling
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
