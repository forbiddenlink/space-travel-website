/**
 * Launch Countdown Timer
 * Displays countdown to next space launch with flip animation
 */

class LaunchCountdown {
    constructor(targetDate, elementId = 'countdown-timer') {
        this.targetDate = new Date(targetDate);
        this.elementId = elementId;
        this.interval = null;
        this.init();
    }

    init() {
        this.createCountdownElement();
        this.startCountdown();
    }

    createCountdownElement() {
        const existing = document.getElementById(this.elementId);
        if (existing) return;

        const container = document.createElement('div');
        container.id = this.elementId;
        container.className = 'countdown-container';
        container.innerHTML = `
            <div class="countdown-header">
                <h3 class="ff-sans-cond uppercase letter-spacing-2 text-accent">Next Launch</h3>
                <p class="countdown-label">Mission to Mars • SpaceX Endeavor</p>
            </div>
            <div class="countdown-display">
                <div class="countdown-unit">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <span class="countdown-value" data-unit="days">00</span>
                            </div>
                        </div>
                    </div>
                    <span class="countdown-unit-label">Days</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-unit">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <span class="countdown-value" data-unit="hours">00</span>
                            </div>
                        </div>
                    </div>
                    <span class="countdown-unit-label">Hours</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-unit">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <span class="countdown-value" data-unit="minutes">00</span>
                            </div>
                        </div>
                    </div>
                    <span class="countdown-unit-label">Minutes</span>
                </div>
                <div class="countdown-separator">:</div>
                <div class="countdown-unit">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <span class="countdown-value" data-unit="seconds">00</span>
                            </div>
                        </div>
                    </div>
                    <span class="countdown-unit-label">Seconds</span>
                </div>
            </div>
            <div class="countdown-footer">
                <button class="countdown-notify-btn" data-booking-trigger>
                    Get Launch Notifications
                </button>
            </div>
        `;

        // Insert after main content or in a specific location
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentElement('afterend', container);
        } else {
            document.body.appendChild(container);
        }
    }

    startCountdown() {
        this.updateCountdown();
        this.interval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date();
        const diff = this.targetDate - now;

        if (diff <= 0) {
            this.handleLaunchComplete();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.animateFlip('days', days);
        this.animateFlip('hours', hours);
        this.animateFlip('minutes', minutes);
        this.animateFlip('seconds', seconds);
    }

    animateFlip(unit, value) {
        const element = document.querySelector(`[data-unit="${unit}"]`);
        if (!element) return;

        const formattedValue = String(value).padStart(2, '0');
        
        if (element.textContent !== formattedValue) {
            const card = element.closest('.flip-card');
            card.classList.add('flipping');
            
            setTimeout(() => {
                element.textContent = formattedValue;
                card.classList.remove('flipping');
            }, 300);
        } else {
            element.textContent = formattedValue;
        }
    }

    handleLaunchComplete() {
        clearInterval(this.interval);
        const container = document.getElementById(this.elementId);
        const display = container.querySelector('.countdown-display');
        
        display.innerHTML = `
            <div class="launch-complete">
                <div class="rocket-icon">🚀</div>
                <h3 class="fs-600 ff-serif">Launch Successful!</h3>
                <p>Mission to Mars is en route</p>
            </div>
        `;
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        const element = document.getElementById(this.elementId);
        if (element) {
            element.remove();
        }
    }
}

// Initialize countdown on home page only
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home')) {
        // Set launch date to 45 days from now
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 45);
        launchDate.setHours(12, 0, 0, 0);
        
        window.launchCountdown = new LaunchCountdown(launchDate);
        console.log('⏱️ Launch countdown initialized');
    }
});
