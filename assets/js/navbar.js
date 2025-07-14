document.addEventListener("DOMContentLoaded", function () {
  const navbarDiv = document.getElementById("navbar-include");
  if (navbarDiv) {
    fetch("assets/components/navbar.html")
      .then((res) => res.text())
      .then((html) => {
        navbarDiv.innerHTML = html;

        // Wait for DOM to update before selecting and binding events
        setTimeout(() => {
          const mobileMenu = document.getElementById("mobile-menu");
          const openBtn = document.getElementById("mobile-menu-button");
          const closeBtn = document.getElementById("mobile-menu-close");

          function openMenu() {
            mobileMenu.classList.remove(
              "-translate-y-full",
              "invisible",
              "pointer-events-none"
            );
            mobileMenu.classList.add("translate-y-0");
            document.body.classList.add("overflow-hidden");
          }
          function closeMenu() {
            mobileMenu.classList.remove("translate-y-0");
            mobileMenu.classList.add(
              "-translate-y-full",
              "invisible",
              "pointer-events-none"
            );
            document.body.classList.remove("overflow-hidden");
          }

          if (openBtn && mobileMenu) {
            openBtn.addEventListener("click", openMenu);
          }
          if (closeBtn && mobileMenu) {
            closeBtn.addEventListener("click", closeMenu);
          }
          // Close menu when clicking a link
          mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
            link.addEventListener("click", closeMenu);
          });
          // Close menu when clicking outside
          mobileMenu.addEventListener("click", function (e) {
            if (e.target === mobileMenu) {
              closeMenu();
            }
          });
        }, 0); // Let the DOM update
      });
  }
});
