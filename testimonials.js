/**
 * Testimonials Carousel System
 * Displays customer reviews with auto-rotation and manual controls
 */

class TestimonialsCarousel {
    constructor() {
        this.testimonials = [
            {
                name: "Sarah Chen",
                role: "Tech Entrepreneur",
                destination: "Moon",
                rating: 5,
                text: "Absolutely life-changing! The view of Earth from the Moon was beyond words. The crew was professional, and the entire journey exceeded my expectations. Worth every penny!",
                image: "👩‍🚀"
            },
            {
                name: "Marcus Rodriguez",
                role: "Photographer",
                destination: "Mars",
                rating: 5,
                text: "As a photographer, I've traveled the world, but nothing compares to capturing the Martian landscape. The 9-month journey was comfortable, and the experience unforgettable.",
                image: "👨‍🚀"
            },
            {
                name: "Dr. Yuki Tanaka",
                role: "Marine Biologist",
                destination: "Europa",
                rating: 5,
                text: "Europa's icy surface was mesmerizing! The scientific team was knowledgeable, and the facilities on board were state-of-the-art. An experience I'll treasure forever.",
                image: "👩‍🔬"
            },
            {
                name: "James Patterson",
                role: "Retired Pilot",
                destination: "Moon",
                rating: 5,
                text: "I've flown aircraft for 40 years, but nothing prepared me for the thrill of a lunar landing. Stellar Voyages made my lifelong dream come true. Highly recommend!",
                image: "👨‍✈️"
            },
            {
                name: "Aisha Mohammed",
                role: "Artist",
                destination: "Titan",
                rating: 5,
                text: "The rings of Saturn viewed from Titan inspired my greatest art collection. The journey was long but absolutely worth it. The crew made us feel safe and cared for throughout.",
                image: "👩‍🎨"
            }
        ];
        
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.autoRotateDelay = 5000;
        
        this.init();
    }

    init() {
        this.createTestimonialsSection();
        this.attachEventListeners();
        this.startAutoRotate();
    }

    createTestimonialsSection() {
        const section = document.createElement('section');
        section.className = 'testimonials-section';
        section.id = 'testimonials';
        
        section.innerHTML = `
            <div class="testimonials-container">
                <h2 class="numbered-title">
                    <span aria-hidden="true">05</span> What Our Travelers Say
                </h2>
                
                <div class="testimonials-carousel">
                    <button class="carousel-control prev" aria-label="Previous testimonial">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    
                    <div class="testimonials-track">
                        ${this.testimonials.map((testimonial, index) => this.createTestimonialCard(testimonial, index)).join('')}
                    </div>
                    
                    <button class="carousel-control next" aria-label="Next testimonial">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                
                <div class="carousel-indicators">
                    ${this.testimonials.map((_, index) => `
                        <button class="indicator ${index === 0 ? 'active' : ''}" 
                                data-index="${index}" 
                                aria-label="Go to testimonial ${index + 1}">
                        </button>
                    `).join('')}
                </div>
                
                <div class="testimonials-stats">
                    <div class="stat">
                        <div class="stat-value fs-700 ff-serif">2,847</div>
                        <div class="stat-label ff-sans-cond uppercase">Happy Travelers</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value fs-700 ff-serif">4.9/5</div>
                        <div class="stat-label ff-sans-cond uppercase">Average Rating</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value fs-700 ff-serif">98%</div>
                        <div class="stat-label ff-sans-cond uppercase">Would Recommend</div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before FAQ section or footer
        const faq = document.getElementById('faq');
        const footer = document.querySelector('.site-footer');
        
        if (faq) {
            faq.before(section);
        } else if (footer) {
            footer.before(section);
        } else {
            document.body.appendChild(section);
        }
    }

    createTestimonialCard(testimonial, index) {
        const stars = '⭐'.repeat(testimonial.rating);
        
        return `
            <div class="testimonial-card ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="testimonial-content">
                    <div class="stars">${stars}</div>
                    <blockquote class="testimonial-text">
                        "${testimonial.text}"
                    </blockquote>
                    <div class="testimonial-author">
                        <div class="author-avatar">${testimonial.image}</div>
                        <div class="author-info">
                            <div class="author-name ff-serif fs-500">${testimonial.name}</div>
                            <div class="author-role fs-200">${testimonial.role}</div>
                            <div class="author-destination ff-sans-cond uppercase letter-spacing-2 text-accent">
                                ${testimonial.destination} Traveler
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        const indicators = document.querySelectorAll('.carousel-indicators .indicator');
        
        prevBtn?.addEventListener('click', () => {
            this.stopAutoRotate();
            this.prev();
            this.startAutoRotate();
        });
        
        nextBtn?.addEventListener('click', () => {
            this.stopAutoRotate();
            this.next();
            this.startAutoRotate();
        });
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                this.stopAutoRotate();
                const index = parseInt(e.currentTarget.dataset.index);
                this.goToSlide(index);
                this.startAutoRotate();
            });
        });

        // Pause on hover
        const carousel = document.querySelector('.testimonials-carousel');
        carousel?.addEventListener('mouseenter', () => this.stopAutoRotate());
        carousel?.addEventListener('mouseleave', () => this.startAutoRotate());

        // Swipe support for mobile
        this.addSwipeSupport();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const cards = document.querySelectorAll('.testimonial-card');
        const indicators = document.querySelectorAll('.carousel-indicators .indicator');
        
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            this.next();
        }, this.autoRotateDelay);
    }

    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    }

    addSwipeSupport() {
        const track = document.querySelector('.testimonials-track');
        if (!track) return;

        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        
        if (endX < startX - swipeThreshold) {
            // Swipe left - next
            this.stopAutoRotate();
            this.next();
            this.startAutoRotate();
        }
        
        if (endX > startX + swipeThreshold) {
            // Swipe right - prev
            this.stopAutoRotate();
            this.prev();
            this.startAutoRotate();
        }
    }

    destroy() {
        this.stopAutoRotate();
        const section = document.getElementById('testimonials');
        section?.remove();
    }
}

// Initialize testimonials
document.addEventListener('DOMContentLoaded', () => {
    window.testimonialsCarousel = new TestimonialsCarousel();
    console.log('💬 Testimonials carousel initialized');
});
