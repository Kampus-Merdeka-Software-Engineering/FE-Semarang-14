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
                            <img src="./assets/images/course-image5.png" alt="" />
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
                        <a class="myBtn">Join Course</a>
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