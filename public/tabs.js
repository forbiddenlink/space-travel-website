// Announce content changes to screen readers
function announceToScreenReader(message) {
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
        // Clear first to ensure announcement even if same text
        announcer.textContent = '';
        // Use setTimeout to ensure the clear is processed
        setTimeout(() => {
            announcer.textContent = message;
        }, 50);
    }
}

// Initialize tabs functionality
const initializeTabs = () => {
    // Get all tab lists (both regular tabs and number indicators)
    const tabLists = document.querySelectorAll('[role="tablist"]');

    // Set up event listeners for each tab list
    tabLists.forEach(tabList => {
        try {
            const tabs = tabList.querySelectorAll('[role="tab"]');
            
            if (tabs.length > 0) {
                tabList.addEventListener('keydown', e => changeTabFocus(e, tabs));
                
                tabs.forEach(tab => {
                    tab.addEventListener('click', e => changeTabPanel(e, tab));
                });
            }
        } catch (error) {
            console.error("Error setting up tab list:", error);
        }
    });
};

let tabFocus = 0;
function changeTabFocus(e, tabs) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    try {
        if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
            tabs[tabFocus].setAttribute("tabindex", -1);
            
            if (e.keyCode === keydownRight) {
                tabFocus++;
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
            } else {
                tabFocus--;
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }
            
            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].focus();
        }
    } catch (error) {
        console.error("Error changing tab focus:", error);
    }
}

function changeTabPanel(e, targetTab) {
    try {
        const targetPanel = targetTab.getAttribute("aria-controls");
        const targetImage = targetTab.getAttribute("data-image");
        
        if (!targetPanel) {
            console.warn("No target panel found for tab");
            return;
        }
        
        const tabContainer = targetTab.parentNode;
        const mainContainer = tabContainer.parentNode;
        
        // Update selected state
        tabContainer
            .querySelectorAll('[role="tab"]')
            .forEach(tab => {
                tab.setAttribute("aria-selected", false);
                tab.setAttribute("tabindex", -1);
            });
            
        targetTab.setAttribute("aria-selected", true);
        targetTab.setAttribute("tabindex", 0);

        // Announce tab change to screen readers
        const tabName = targetTab.textContent.trim() || targetTab.querySelector('.sr-only')?.textContent || 'Selected';
        announceToScreenReader(`Now showing ${tabName}`);

        // Hide all panels and show the selected one
        hideContent(mainContainer, '[role="tabpanel"]');
        showContent(mainContainer, `#${targetPanel}`);
        
        // Hide all images and show the selected one
        if (targetImage) {
            hideContent(mainContainer, 'picture');
            showContent(mainContainer, `#${targetImage}`);
        }
    } catch (error) {
        console.error("Error changing tab panel:", error);
    }
}

function hideContent(parent, content) {
    try {
        parent
            .querySelectorAll(content)
            .forEach(item => item.setAttribute("hidden", true));
    } catch (error) {
        console.error("Error hiding content:", error);
    }
}

function showContent(parent, selector) {
    try {
        const element = parent.querySelector(selector);
        if (element) {
            element.removeAttribute('hidden');
        } else {
            console.warn(`Element not found: ${selector}`);
        }
    } catch (error) {
        console.error("Error showing content:", error);
    }
}

// Initialize swipe gesture support for tabs
function initializeSwipeGestures() {
    const tabLists = document.querySelectorAll('[role="tablist"]');

    tabLists.forEach((tabList, index) => {
        const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
        const mainContainer = tabList.parentNode;

        if (tabs.length < 2) return;

        let startX = 0;
        let startY = 0;
        let isDragging = false;

        // Get the swipeable area (the main content container)
        const swipeTarget = mainContainer;

        swipeTarget.addEventListener('pointerdown', (e) => {
            // Only track touch/pen, not mouse
            if (e.pointerType === 'mouse') return;
            startX = e.clientX;
            startY = e.clientY;
            isDragging = true;
        }, { passive: true });

        swipeTarget.addEventListener('pointerup', (e) => {
            if (!isDragging || e.pointerType === 'mouse') return;
            isDragging = false;

            const diffX = e.clientX - startX;
            const diffY = e.clientY - startY;

            // Require horizontal swipe > 50px and more horizontal than vertical
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                const currentTab = tabs.find(t => t.getAttribute('aria-selected') === 'true');
                const currentIndex = tabs.indexOf(currentTab);

                if (diffX > 0 && currentIndex > 0) {
                    // Swipe right - go to previous tab
                    tabs[currentIndex - 1].click();
                    tabs[currentIndex - 1].focus();
                } else if (diffX < 0 && currentIndex < tabs.length - 1) {
                    // Swipe left - go to next tab
                    tabs[currentIndex + 1].click();
                    tabs[currentIndex + 1].focus();
                }
            }
        }, { passive: true });

        swipeTarget.addEventListener('pointercancel', () => {
            isDragging = false;
        }, { passive: true });
    });
}

// Initialize tabs when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeTabs();
        initializeSwipeGestures();
    });
} else {
    // DOM is already loaded
    initializeTabs();
    initializeSwipeGestures();
}