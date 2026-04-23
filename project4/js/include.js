const header = document.getElementById("header");
if (header) {
    fetch("./components/header.html")
        .then(res => res.text())
        .then(data => header.innerHTML = data);
}

const footer = document.getElementById("footer");
if (footer) {
    fetch("./components/footer.html")
        .then(res => res.text())
        .then(data => footer.innerHTML = data);
}
