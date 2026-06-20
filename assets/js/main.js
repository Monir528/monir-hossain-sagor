document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const mobileOverlay = document.querySelector(".mobile-nav-overlay");
    const closeMenu = document.querySelector(".close-mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-overlay a");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // Toggle Navigation Drawer Open
    if (hamburger && mobileOverlay) {
        hamburger.addEventListener("click", () => {
            mobileOverlay.classList.add("active");
        });
    }

    // Toggle Navigation Drawer Close
    if (closeMenu && mobileOverlay) {
        closeMenu.addEventListener("click", () => {
            mobileOverlay.classList.remove("active");
        });
    }

    // Clean Close Trigger on Action selection
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileOverlay.classList.remove("active");
        });
    });

    // Realtime Viewport Tracking Link Updates
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 220)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
});