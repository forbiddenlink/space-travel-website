// Initialize transition element and loading indicator
let transitionElement = null;
let loadingIndicator = null;

const initializeTransitionElements = () => {
    if (!transitionElement) {
        transitionElement = document.createElement('div');
        transitionElement.className = 'page-transition';
        document.body.appendChild(transitionElement);
    }
    
    if (!loadingIndicator) {
        loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Preparing for launch...</p>
        `;
        document.body.appendChild(loadingIndicator);
    }
};

// Handle page transitions
const attachLinkListeners = () => {
    const links = document.querySelectorAll('a[href]:not([target="_blank"])');
    
    links.forEach(link => {
        // Remove previous listener if it exists by cloning
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', (e) => {
            const isInternalLink = newLink.href.startsWith(window.location.origin) || newLink.href.startsWith('/');
            const isSamePage = newLink.href === window.location.href || newLink.href === window.location.pathname;
            
            if (isInternalLink && !isSamePage) {
                e.preventDefault();
                
                if (transitionElement) {
                    transitionElement.classList.add('active');
                }
                
                setTimeout(() => {
                    window.location.href = newLink.href;
                }, 300); // Half of the transition duration
            } else if (isSamePage) {
                e.preventDefault(); // Prevent page reload when clicking current page link
            }
        });
    });
};

// Initialize when DOM is ready
const initializeOnDOMReady = () => {
    initializeTransitionElements();
    attachLinkListeners();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeOnDOMReady);
} else {
    // DOM is already loaded
    initializeOnDOMReady();
}

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