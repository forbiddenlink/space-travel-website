/**
 * FAQ Accordion System
 * Interactive FAQ section with smooth animations
 */

class FAQAccordion {
    constructor() {
        this.faqs = [
            {
                question: "How much training is required before spaceflight?",
                answer: "All passengers undergo a comprehensive 2-week training program covering zero-gravity adaptation, emergency procedures, spacecraft systems, and physical conditioning. Our expert instructors ensure you're fully prepared for your journey."
            },
            {
                question: "What's included in the ticket price?",
                answer: "Your ticket includes pre-flight training, the complete space journey, all meals and accommodations aboard the spacecraft, space suit rental, commemorative flight certificate, and post-flight medical check-up. Optional add-ons include spacewalk experiences and professional photography packages."
            },
            {
                question: "Is space travel safe?",
                answer: "Safety is our top priority. Our spacecraft undergo rigorous testing and maintenance. We use proven technology with multiple redundant systems. Our safety record exceeds industry standards, and all crew members are experienced space professionals."
            },
            {
                question: "What are the physical requirements?",
                answer: "Passengers must pass a basic medical screening. While you don't need to be an athlete, you should be in reasonably good health. Age requirements: 18-70 years old. We accommodate various physical abilities - contact us to discuss specific needs."
            },
            {
                question: "Can I bring personal items?",
                answer: "You're allowed 5kg of personal items. Popular choices include cameras, journals, small mementos, and comfort items. All items must pass security screening. We provide a detailed packing list upon booking confirmation."
            },
            {
                question: "What's the cancellation policy?",
                answer: "Full refund if cancelled 90+ days before departure. 50% refund for 60-89 days notice. Within 60 days, cancellations are non-refundable but can be transferred to a future flight. Travel insurance is highly recommended."
            },
            {
                question: "Will I experience motion sickness?",
                answer: "Some passengers experience temporary space adaptation syndrome in the first 24-48 hours. We provide preventative medication and our crew is trained to help you adjust comfortably. Most passengers adapt quickly and enjoy the experience."
            },
            {
                question: "Can I see Earth from space?",
                answer: "Absolutely! Viewing Earth from space is often described as life-changing. You'll have multiple opportunities to observe our planet through large observation windows. Professional cameras are available to capture this unforgettable moment."
            }
        ];
        
        this.init();
    }

    init() {
        this.createFAQSection();
        this.attachEventListeners();
    }

    createFAQSection() {
        const faqSection = document.createElement('section');
        faqSection.className = 'faq-section';
        faqSection.id = 'faq';
        
        let faqHTML = `
            <div class="faq-container">
                <h2 class="numbered-title">
                    <span aria-hidden="true">04</span> Frequently Asked Questions
                </h2>
                <div class="faq-grid">
                    <div class="faq-intro">
                        <h3 class="fs-600 ff-serif">Got Questions?</h3>
                        <p>We've compiled answers to the most common questions about space tourism. Can't find what you're looking for?</p>
                        <a href="mailto:info@stellarvoyages.space" class="faq-contact-link">
                            Contact our space travel specialists →
                        </a>
                    </div>
                    <div class="faq-list">
        `;

        this.faqs.forEach((faq, index) => {
            faqHTML += `
                <div class="faq-item" data-faq-index="${index}">
                    <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                        <span class="faq-question-text ff-sans-cond uppercase letter-spacing-2">${faq.question}</span>
                        <svg class="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <div class="faq-answer" id="faq-answer-${index}" hidden>
                        <p>${faq.answer}</p>
                    </div>
                </div>
            `;
        });

        faqHTML += `
                    </div>
                </div>
            </div>
        `;

        faqSection.innerHTML = faqHTML;
        
        // Insert before footer
        const footer = document.querySelector('.site-footer');
        if (footer) {
            footer.before(faqSection);
        } else {
            document.body.appendChild(faqSection);
        }
    }

    attachEventListeners() {
        const faqButtons = document.querySelectorAll('.faq-question');
        
        faqButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.toggleFAQ(e.currentTarget);
            });
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllFAQs();
            }
        });
    }

    toggleFAQ(button) {
        const faqItem = button.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Close other FAQs (optional - remove if you want multiple open)
        // this.closeAllFAQs();

        if (isExpanded) {
            this.closeFAQ(button, answer);
        } else {
            this.openFAQ(button, answer);
        }
    }

    openFAQ(button, answer) {
        button.setAttribute('aria-expanded', 'true');
        button.classList.add('active');
        answer.hidden = false;
        
        // Animate height
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    closeFAQ(button, answer) {
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('active');
        answer.style.maxHeight = '0';
        
        setTimeout(() => {
            answer.hidden = true;
        }, 300);
    }

    closeAllFAQs() {
        const faqButtons = document.querySelectorAll('.faq-question');
        faqButtons.forEach(button => {
            const answer = button.closest('.faq-item').querySelector('.faq-answer');
            this.closeFAQ(button, answer);
        });
    }
}

// Initialize FAQ on all pages
document.addEventListener('DOMContentLoaded', () => {
    window.faqAccordion = new FAQAccordion();
    console.log('❓ FAQ system initialized');
});
