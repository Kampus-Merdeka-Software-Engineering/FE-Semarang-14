// Ajax Handling
// const BASE_URL = "http://localhost:3000/api"; // Localhost
const BASE_URL = "https://be-semarang-14-production.up.railway.app/api"; // Production

// Show Courses on Page Load
// Create number formatter.
const NumFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

const courseList = document.getElementById("course-list");
window.onload = async () => {
    fetch(`${BASE_URL}/courses`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        response.json().then((data) => {
            let courses = data.data;

            var template = courses.map((course) => {
                return `
                <div class="course-col">
                    <div>
                        <div class="course-image">
                            <img src="./assets/images/${course.photo}" alt="" />
                        </div>
                        <div class="course-tag">
                            <h4>${course.nama}</h4>
                        </div>
                        <div class="course-title-rating">
                            <div class="course-title">
                            <h3>${course.nama}</h3>
                            </div>
                            <h3>${course.rating}/10</h3>
                        </div>
                        <div class="course-price">
                            <h4>${NumFormatter.format(course.harga)}</h4>
                        </div>
                        <div class="course-text">
                            <p>${course.deskripsi_singkat}</p>
                        </div>
                        </div>
                    <div class="course-btn">
                        <a class="myBtn" onclick="showModal('${course.id}')">Join Course</a>
                    </div>
                </div>
                `;
            });

            courseList.innerHTML = template.join("");
        });
    }).catch((error) => {
        console.log(error);
    });
};

// Modal Handling
var modal = document.getElementById("myModal");

function showModal(id) {
    modal.style.display = "block";

    fetch(`${BASE_URL}/courses/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        response.json().then((data) => {
            let course = data.data;

            var modalTemplate = `
            <div class="modal-course">
                <div class="modal-course-col">
                    <div class="modal-close">
                        <span class="close" onclick="closeModal()">&times;</span>
                        <h3>Join Our Class</h3>
                    </div>

                    <div>
                        <div class="modal-course-image">
                            <img src="./assets/images/${course.photo}" alt="" />
                        </div>
                        <div class="modal-course-tag">
                            <h4>${course.nama}</h4>
                        </div>
                        <div class="modal-course-title-rating">
                            <h3>${course.nama}</h3>
                            <h3>${course.rating}/10</h3>
                        </div>
                        <div class="modal-course-price">
                            <h4>${NumFormatter.format(course.harga)}</h4>
                        </div>
                        <div class="modal-course-text">
                            <p>${course.deskripsi_panjang}</p>
                        </div>
                    </div>
                    <div class="modal-content">
                    <h2>Contact Form</h2>
                        <form id="contactForm">

                            <div class="form-label">
                                <label for="course">Course <span>:</span></label>
                                <input type="text" id="course" name="course" value="${course.nama}" readonly>
                                <input type="hidden" id="id_course" name="id_course" value="${course.id}" readonly>
                            </div>

                            <div class="form-label">
                                <label for="name">Name <span>:</span></label>
                                <input type="text" id="name" name="name" >
                            </div>

                            <div class="form-label">
                                <label for="email">Email <span>:</span></label>
                                <input type="email" id="email" name="email" >
                            </div>

                            <div class="form-label">
                                <label for="phone">Phone Number <span>:</span></label>
                                <input type="tel" id="phone" name="phone" >
                            </div>

                            <button type="submit" id="submit">Send <i class="fa-solid fa-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            `;

            modal.innerHTML = modalTemplate;
        });
    }).catch((error) => {
        console.log(error);
    });
}

// Form Handling
const submit = document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id_course = document.getElementById("id_course").value;
    const nama = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const no_hp = document.getElementById("phone").value;

    // validate form with regex
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,12}$/;

    if (!nama || !email || !no_hp) {
        alert("Please fill the form!");
        return;
    } else if (!nameRegex.test(nama)) {
        alert("Please enter a valid name!");
        return;
    } else if (!emailRegex.test(email)) {
        alert("Please enter a valid email!");
        return;
    } else if (!phoneRegex.test(no_hp)) {
        alert("Please enter a valid phone number!");
        return;
    }

    const data = {
        id_course,
        nama,
        email,
        no_hp,
    };

    fetch(`${BASE_URL}/peserta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        response.json().then((data) => {
            alert("Success!");
            closeModal();
        });
    }).catch((error) => {
        console.log(error);
    });
});

// Close Modal
function closeModal() {
    modal.style.display = "none";

    // clear form
    contactForm.reset();

    // clear modal
    modal.innerHTML = "";

    // refresh page
    window.location.reload();
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "block";
    }
};