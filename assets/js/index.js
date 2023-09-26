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