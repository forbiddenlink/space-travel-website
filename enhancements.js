/**
 * Portfolio Enhancements for Space Tourism Website
 * Advanced animations and interactions to showcase technical skills
 */

// ===================================
// 1. SCROLL REVEAL ANIMATIONS
// ===================================

const initScrollReveal = () => {
    try {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optionally unobserve after reveal for performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with reveal class
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

    } catch (error) {
        console.error('Error initializing scroll reveal:', error);
    }
};

// ===================================
// 2. ANIMATED STATISTICS COUNTER
// ===================================

const animateCounter = (element, target, duration = 2000) => {
    try {
        const start = 0;
        const startTime = performance.now();
        
        // Parse target value (handle formats like "384,400 km" or "3 days")
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        const suffix = target.replace(/[0-9,.\s]/g, '');
        const hasComma = target.includes(',');
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out quad)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (numericValue - start) * easeOut;
            
            // Format number with commas if original had them
            let displayValue = Math.floor(current).toString();
            if (hasComma && displayValue.length > 3) {
                displayValue = displayValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            
            element.textContent = displayValue + (suffix ? ' ' + suffix : '');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target; // Ensure final value is exact
            }
        };
        
        requestAnimationFrame(animate);
    } catch (error) {
        console.error('Error animating counter:', error);
        element.textContent = target; // Fallback to static value
    }
};

const initCounterAnimations = () => {
    try {
        const counters = document.querySelectorAll('[data-counter]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    const target = entry.target.textContent.trim();
                    animateCounter(entry.target, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    } catch (error) {
        console.error('Error initializing counter animations:', error);
    }
};

// ===================================
// 3. IMAGE HOVER EFFECTS
// ===================================

const initImageHoverEffects = () => {
    try {
        const images = document.querySelectorAll('.grid-container picture');
        
        images.forEach(img => {
            img.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05) translateY(-5px)';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1) translateY(0)';
            });
        });
    } catch (error) {
        console.error('Error initializing image hover effects:', error);
    }
};

// ===================================
// 4. ENHANCED BUTTON RIPPLE EFFECT
// ===================================

const createRipple = (event) => {
    try {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    } catch (error) {
        console.error('Error creating ripple effect:', error);
    }
};

const initRippleEffects = () => {
    try {
        const buttons = document.querySelectorAll('.large-button, [role="tab"], .number-indicators > *');
        buttons.forEach(button => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.addEventListener('click', createRipple);
        });
    } catch (error) {
        console.error('Error initializing ripple effects:', error);
    }
};

// ===================================
// 5. SMOOTH PROGRESS INDICATOR
// ===================================

const enhanceProgressIndicator = () => {
    try {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        // Add gradient effect
        progressBar.style.background = 'linear-gradient(90deg, hsl(var(--clr-light)), hsl(var(--clr-white)))';
        progressBar.style.boxShadow = '0 0 10px hsl(var(--clr-white) / 0.5)';
        progressBar.style.transition = 'width 0.1s ease-out';
    } catch (error) {
        console.error('Error enhancing progress indicator:', error);
    }
};

// ===================================
// 6. LOADING SKELETON SCREENS
// ===================================

const addImageSkeletons = () => {
    try {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        images.forEach(img => {
            // Create skeleton wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'image-skeleton';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            
            // Show skeleton until image loads
            wrapper.classList.add('loading');
            
            const handleLoad = () => {
                wrapper.classList.remove('loading');
                wrapper.classList.add('loaded');
            };
            
            if (img.complete) {
                handleLoad();
            } else {
                img.addEventListener('load', handleLoad);
                img.addEventListener('error', () => {
                    wrapper.classList.remove('loading');
                    wrapper.classList.add('error');
                });
            }
        });
    } catch (error) {
        console.error('Error adding image skeletons:', error);
    }
};

// ===================================
// 7. STAGGERED LIST ANIMATIONS
// ===================================

const initStaggeredAnimations = () => {
    try {
        const lists = document.querySelectorAll('.destination-meta, .dot-indicators, .number-indicators');
        
        lists.forEach(list => {
            const items = list.children;
            Array.from(items).forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(item);
            });
        });
    } catch (error) {
        console.error('Error initializing staggered animations:', error);
    }
};

// ===================================
// 8. ENHANCED TAB TRANSITIONS
// ===================================

const enhanceTabTransitions = () => {
    try {
        const originalChangeTabPanel = window.changeTabPanel;
        if (typeof originalChangeTabPanel !== 'function') return;
        
        // Add fade transition to tab content
        const style = document.createElement('style');
        style.textContent = `
            [role="tabpanel"] {
                animation: fadeIn 0.4s ease-in-out;
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error('Error enhancing tab transitions:', error);
    }
};

// ===================================
// 9. CUSTOM CURSOR (SUBTLE)
// ===================================

const initCustomCursor = () => {
    try {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        // Add cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="tab"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    } catch (error) {
        console.error('Error initializing custom cursor:', error);
    }
};

// ===================================
// 10. PERFORMANCE MONITORING
// ===================================

const logPerformanceMetrics = () => {
    try {
        if ('performance' in window && 'PerformanceObserver' in window) {
            // Log Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.value !== undefined) {
                        console.log(`📊 ${entry.name}:`, entry.value.toFixed(2));
                    }
                });
            });
            
            // Observe paint timing
            observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
            
            // Log on load
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('⚡ Performance Metrics:');
                console.log(`   DOM Content Loaded: ${(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart).toFixed(2)}ms`);
                console.log(`   Load Complete: ${(perfData.loadEventEnd - perfData.loadEventStart).toFixed(2)}ms`);
            });
        }
    } catch (error) {
        console.error('Error logging performance metrics:', error);
    }
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing portfolio enhancements...');
    
    // Initialize all enhancements
    initScrollReveal();
    initCounterAnimations();
    initImageHoverEffects();
    initRippleEffects();
    enhanceProgressIndicator();
    addImageSkeletons();
    initStaggeredAnimations();
    enhanceTabTransitions();
    
    // Optional: Custom cursor (can be disabled if too distracting)
    // initCustomCursor();
    
    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        logPerformanceMetrics();
    }
    
    console.log('✨ Portfolio enhancements loaded successfully!');
});

// Add reveal class to elements on load
window.addEventListener('load', () => {
    try {
        const elementsToReveal = document.querySelectorAll('main > *, .grid-container > *:not(.stars-container)');
        elementsToReveal.forEach((el, index) => {
            // Don't add reveal to elements that are already visible or are containers
            if (!el.classList.contains('stars-container') && !el.classList.contains('parallax')) {
                el.classList.add('reveal');
                el.style.setProperty('--reveal-delay', `${index * 0.1}s`);
            }
        });
        
        // Trigger reveal immediately after adding classes
        setTimeout(() => {
            elementsToReveal.forEach(el => {
                if (el.classList.contains('reveal')) {
                    el.classList.add('revealed');
                }
            });
        }, 100);
    } catch (error) {
        console.error('Error adding reveal classes:', error);
    }
});
