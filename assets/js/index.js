// Ajax Handling
// const BASE_URL = "http://localhost:3000/api"; // Localhost
const BASE_URL = "https://be-semarang-14-production.up.railway.app/api"; // Production

// Create number formatter.
const NumFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});

window.onload = async () => {
    // Best Courses handling
    var bestCourse = document.getElementById("best-course");
    fetch(`${BASE_URL}/best_courses`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        response.json().then((data) => {
            let best_courses = data.data;
            console.log(best_courses);

            var template = best_courses.map((course) => {
                return `
                <div class="course-col">
                    <h3>${course.nama}</h3>
                        <p>
                            ${course.deskripsi_singkat}
                        </p>
                    <div class="section-btn">
                        <a class="myBtn" onclick="showModal('${course.id}')">Join Course</a>
                    </div>
                </div>
                `;
            });

            // console.log(template);
            bestCourse.innerHTML = template.join("");
        });
    }).catch((error) => {
        console.log(error);
    });

    // Testimonials handling
    var Testimonials = document.getElementById("testimonial-list");
    fetch(`${BASE_URL}/testimonial`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        response.json().then((data) => {
            let testimonials = data.data;
            // console.log(testimonials);

            for (let i = 0; i < testimonials.length; i++) {
                let testimonial = testimonials[i];
                // console.log(testimonial);

                fetch(`${BASE_URL}/peserta/${testimonial.id_peserta}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    response.json().then((data) => {
                        let peserta = data.data;
                        console.log(peserta);

                        var template = `
                        <div class="testimonial-col">
                            <div class="testimonial-text">
                                <p>
                                    ${testimonial.testimoni}
                                </p>
                            </div>
                            <div class="profile-section">
                                <div class="profile">
                                    <img src="./assets/images/${peserta.photo}" alt="" />
                                    <h3>${peserta.nama}</h3>
                                </div>
                                <div class="testimonial-star">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>s
                            </div>
                        </div>
                        `;

                        // console.log(template);
                        Testimonials.innerHTML += template;
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }).catch((error) => {
        console.log(error);
    });
};


// Modal handling
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
            // console.log(course);

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

                            <button type="submit" id="submitForm">Send <i class="fa-solid fa-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            `;

            // console.log(modalTemplate);
            modal.innerHTML = modalTemplate;
        });
    }).catch((error) => {
        console.log(error);
    });
}

// Form Handling
const contactForm = document.getElementById("contactForm");

const submitForm = document.addEventListener("submit", async (e) => {
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

    console.log(data);

    fetch(`${BASE_URL}/peserta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        response.json().then((data) => {
            // console.log(data);
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
    if (contactForm){
        contactForm.reset();
    }

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

const Subscribe = document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("add-email").value;

    // validate form with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ( !email  ) {
        alert("Please fill the form!");
        return;
    }  else if (!emailRegex.test(email)) {
        alert("Please enter a valid email!");
        return;
    } 
    
    const data = {
        email,
    };

    console.log(data);

    fetch(`${BASE_URL}/subcription`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        response.json().then((data) => {
            // console.log(data);
            alert("Success!");
        });
    }).catch((error) => {
        console.log(error);
    });
});