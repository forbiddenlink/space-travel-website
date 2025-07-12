// Create transition element
const transitionElement = document.createElement('div');
transitionElement.className = 'page-transition';
document.body.appendChild(transitionElement);

// Handle page transitions
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href]:not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const isInternalLink = link.href.startsWith(window.location.origin) || link.href.startsWith('/');
            
            if (isInternalLink) {
                e.preventDefault();
                transitionElement.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300); // Half of the transition duration
            }
        });
    });
});

// Add loading indicator
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading-indicator';
loadingIndicator.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Preparing for launch...</p>
`;
document.body.appendChild(loadingIndicator);

// Show loading indicator when navigation starts
window.addEventListener('beforeunload', () => {
    loadingIndicator.classList.add('active');
});

// Hide loading indicator when page loads
window.addEventListener('load', () => {
    loadingIndicator.classList.remove('active');
    
    // Add entrance animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            mainContent.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        });
    }
}); 