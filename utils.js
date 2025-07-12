// Back to Top functionality
const createBackToTopButton = () => {
    const button = document.createElement('a');
    button.className = 'back-to-top';
    button.href = '#';
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
};

// Add parallax effect to background
const initParallax = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

// Enhance images with lazy loading
const enhanceImages = () => {
    const images = document.querySelectorAll('img:not([loading]):not(.logo)');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Add fade-in animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
};

// Add tooltip functionality
const initTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.dataset.tooltip;
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        element.addEventListener('mouseenter', () => {
            document.body.appendChild(tooltip);
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
};

// Add progress indicator
const initProgressIndicator = () => {
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressIndicator.appendChild(progressBar);
    document.body.appendChild(progressIndicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    createBackToTopButton();
    initParallax();
    enhanceImages();
    initTooltips();
    initProgressIndicator();
}); 