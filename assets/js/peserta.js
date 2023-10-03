function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // Validasi nama (tidak boleh kosong)
    if (name === "") {
        alert("Nama tidak boleh kosong");
        return false;
    }

    // Validasi email (gunakan pola regex sederhana untuk memeriksa format email)
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Email tidak valid");
        return false;
    }

    // Validasi nomor telepon (hanya boleh berisi angka)
    var phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
        alert("Nomor Telepon hanya boleh berisi angka");
        return false;
    }

    return true;
}
