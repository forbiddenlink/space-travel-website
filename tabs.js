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