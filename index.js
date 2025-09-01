document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const menuIcon = document.querySelector(".menu-icon");
    const navList = document.querySelector(".nav-list");

    if (menuIcon && navList) {
        menuIcon.addEventListener("click", () => {
            navList.classList.toggle("active");

            // toggle between bars and close icon
            menuIcon.classList.toggle("fa-bars");
            menuIcon.classList.toggle("fa-xmark");
        });
    }

    // Scroll animations
    const animatedEls = document.querySelectorAll(".scroll-animate");

    if (animatedEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-animate-active");
                    // observer.unobserve(entry.target); // run once
                }
            });
        }, { threshold: 0.2 });

        animatedEls.forEach(el => observer.observe(el));
    }
});
