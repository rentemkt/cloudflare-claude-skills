document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle (if applicable, based on original React site)
    const mobileMenuButton = document.querySelector("[aria-controls=\"mobile-menu\"]");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Form submission handling (example - needs backend for actual submission)
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Formulário enviado! (Esta é uma simulação, nenhum dado foi realmente enviado.)");
            contactForm.reset();
        });
    }
});


