// Initialize mobile navigation
const initializeNavigation = () => {
    const nav = document.querySelector(".primary-navigation");
    const navToggle = document.querySelector(".mobile-nav-toggle");

    if (nav && navToggle) {
        navToggle.addEventListener("click", () => {
            try {
                const visibility = nav.getAttribute("data-visible");
                if (visibility === "false") {
                    nav.setAttribute("data-visible", true);
                    navToggle.setAttribute("aria-expanded", true);
                } else {
                    nav.setAttribute("data-visible", false);
                    navToggle.setAttribute("aria-expanded", false);
                }
            } catch (error) {
                console.error("Error toggling navigation:", error);
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.setAttribute("data-visible", false);
                navToggle.setAttribute("aria-expanded", false);
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && nav.getAttribute("data-visible") === "true") {
                nav.setAttribute("data-visible", false);
                navToggle.setAttribute("aria-expanded", false);
                navToggle.focus();
            }
        });
    } else {
        console.warn("Navigation elements not found");
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    // DOM is already loaded
    initializeNavigation();
}

