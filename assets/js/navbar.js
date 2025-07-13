document.addEventListener("DOMContentLoaded", function () {
  const navbarDiv = document.getElementById("navbar-include");
  if (navbarDiv) {
    fetch("assets/components/navbar.html")
      .then((res) => res.text())
      .then((html) => {
        navbarDiv.innerHTML = html;
      });
  }
});
