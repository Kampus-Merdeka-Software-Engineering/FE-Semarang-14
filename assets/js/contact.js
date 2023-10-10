// Ajax Handling
// const BASE_URL = "http://localhost:3000/api"; // Localhost
const BASE_URL = "https://be-semarang-14-production.up.railway.app/api"; // Production

//AnimasiTransparanscroll
window.addEventListener('scroll', function() {
const navbar = document.querySelector('nav');
if (window.scrollY > 50) { 
    navbar.classList.add('nav-transparent');
} else {
    navbar.classList.remove('nav-transparent');
}
});

// Form Handling
const submitPesan = document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // validate form with regex
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nama || !email || !subject || !message) {
        alert("Please fill the form!");
        return;
    } else if (!nameRegex.test(nama)) {
        alert("Please enter a valid name!");
        return;
    } else if (!emailRegex.test(email)) {
        alert("Please enter a valid email!");
        return;
    }

    const data = {
        nama,
        email,
        subject,
        message,
    };

    fetch(`${BASE_URL}/pesan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        response.json().then((data) => {
            alert("Success!");
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
        });
    }).catch((error) => {
        console.log(error);
    });
});