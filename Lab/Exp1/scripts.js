const form = document.getElementById("studentForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    alert(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nFavorite Subject: ${subject}`);
});
