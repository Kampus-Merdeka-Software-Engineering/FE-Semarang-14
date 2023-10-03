// Ajax Handling
const BASE_URL = "http://localhost:3000/api";

// Show Courses on Page Load
// Create number formatter.
const NumFormatter = new Intl.NumberFormat('en-US', {
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
            // console.log(data);
            let courses = data.data;
            console.log(courses);

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
                            <h4>Rp ${NumFormatter.format(course.harga)}</h4>
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

            // console.log(template);
            courseList.innerHTML = template.join("");
        });
    }).catch((error) => {
        console.log(error);
    });
};

// Modal Handling
var modal = document.getElementById("myModal");

function showModal() {
    modal.style.display = "block";
}

// show modal by id
function showModal(id) {
    modal.style.display = "block";
    console.log(id);

    fetch(`${BASE_URL}/courses/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        response.json().then((data) => {
            let course = data;
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
                                <label for="name">Name <span>:</span></label>
                                <input type="text" id="name" name="name" required>
                            </div>

                            <div class="form-label">
                                <label for="email">Email <span>:</span></label>
                                <input type="email" id="email" name="email" required>
                            </div>

                            <div class="form-label">
                                <label for="phone">Phone Number <span>:</span></label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>

                            <button type="submit">Send <i class="fa-solid fa-arrow-right"></i></button>
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

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "block";
    }
};