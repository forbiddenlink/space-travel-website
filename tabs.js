// Get all tab lists (both regular tabs and number indicators)
const tabLists = document.querySelectorAll('[role="tablist"]');

// Set up event listeners for each tab list
tabLists.forEach(tabList => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    
    tabList.addEventListener('keydown', e => changeTabFocus(e, tabs));
    
    tabs.forEach(tab => {
        tab.addEventListener('click', e => changeTabPanel(e, tab));
    });
});

let tabFocus = 0;
function changeTabFocus(e, tabs) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
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
}

function changeTabPanel(e, targetTab) {
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    
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
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach(item => item.setAttribute("hidden", true));
}

function showContent(parent, selector) {
    parent.querySelector(selector).removeAttribute('hidden');
}