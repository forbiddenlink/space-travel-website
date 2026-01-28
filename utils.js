// Back to Top functionality
const createBackToTopButton = () => {
    try {
        const button = document.createElement('a');
        button.className = 'back-to-top';
        button.href = '#';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
        `;
        document.body.appendChild(button);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight / 2) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } catch (error) {
        console.error("Error creating back to top button:", error);
    }
};

// Add parallax effect to background
const initParallax = () => {
    try {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    } catch (error) {
        console.error("Error initializing parallax:", error);
    }
};

// Enhance images with lazy loading
const enhanceImages = () => {
    try {
        const images = document.querySelectorAll('img:not([loading]):not(.logo)');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            
            // Add fade-in animation
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
            
            const loadHandler = () => {
                img.style.opacity = '1';
            };
            
            img.addEventListener('load', loadHandler);
            
            // If image is already loaded
            if (img.complete) {
                loadHandler();
            }
        });
    } catch (error) {
        console.error("Error enhancing images:", error);
    }
};

// Add tooltip functionality
const initTooltips = () => {
    try {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltipText = element.dataset.tooltip;
            if (!tooltipText) return;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            element.addEventListener('mouseenter', () => {
                try {
                    document.body.appendChild(tooltip);
                    const rect = element.getBoundingClientRect();
                    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
                    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
                    tooltip.style.opacity = '1';
                } catch (err) {
                    console.error("Error showing tooltip:", err);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                try {
                    tooltip.remove();
                } catch (err) {
                    console.error("Error removing tooltip:", err);
                }
            });
        });
    } catch (error) {
        console.error("Error initializing tooltips:", error);
    }
};

// Add progress indicator
const initProgressIndicator = () => {
    try {
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'progress-indicator';
        progressIndicator.setAttribute('aria-hidden', 'true');
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressIndicator.appendChild(progressBar);
        document.body.appendChild(progressIndicator);

        window.addEventListener('scroll', () => {
            try {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
                progressBar.style.width = `${scrolled}%`;
            } catch (err) {
                console.error("Error updating progress:", err);
            }
        });
    } catch (error) {
        console.error("Error creating progress indicator:", error);
    }
};

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    try {
        createBackToTopButton();
        initParallax();
        enhanceImages();
        initTooltips();
        initProgressIndicator();
    } catch (error) {
        console.error("Error initializing enhancements:", error);
    }
}); 