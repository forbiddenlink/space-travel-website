/**
 * Multi-Step Booking Form System
 * Handles destination booking with validation and smooth transitions
 */

class BookingSystem {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.formData = {
      destination: "",
      passengers: 1,
      departureDate: "",
      returnDate: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    };

    this.init();
  }

  init() {
    this.createBookingModal();
    this.attachEventListeners();
  }

  createBookingModal() {
    const modal = document.createElement("div");
    modal.className = "booking-modal";
    modal.id = "booking-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "booking-title");
    modal.setAttribute("aria-modal", "true");

    modal.innerHTML = `
            <div class="booking-modal-overlay"></div>
            <div class="booking-modal-content">
                <button class="booking-close" aria-label="Close booking form">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="booking-header">
                    <h2 id="booking-title" class="fs-700 ff-serif uppercase">Book Your Journey</h2>
                    <div class="booking-progress">
                        <div class="progress-step active" data-step="1">
                            <div class="step-number">1</div>
                            <div class="step-label">Destination</div>
                        </div>
                        <div class="progress-step" data-step="2">
                            <div class="step-number">2</div>
                            <div class="step-label">Dates</div>
                        </div>
                        <div class="progress-step" data-step="3">
                            <div class="step-number">3</div>
                            <div class="step-label">Details</div>
                        </div>
                        <div class="progress-step" data-step="4">
                            <div class="step-number">4</div>
                            <div class="step-label">Confirm</div>
                        </div>
                    </div>
                </div>

                <form id="booking-form" class="booking-form">
                    <!-- Step 1: Destination -->
                    <div class="booking-step active" data-step="1">
                        <h3 class="fs-600 ff-serif">Select Your Destination</h3>
                        <div class="destination-grid">
                            <label class="destination-card">
                                <input type="radio" name="destination" value="moon" required>
                                <div class="card-content">
                                    <div class="destination-icon">🌙</div>
                                    <h4 class="ff-serif fs-500">Moon</h4>
                                    <p class="fs-200">3 days journey</p>
                                    <p class="price">$250,000</p>
                                </div>
                            </label>
                            <label class="destination-card">
                                <input type="radio" name="destination" value="mars">
                                <div class="card-content">
                                    <div class="destination-icon">🔴</div>
                                    <h4 class="ff-serif fs-500">Mars</h4>
                                    <p class="fs-200">9 months journey</p>
                                    <p class="price">$500,000</p>
                                </div>
                            </label>
                            <label class="destination-card">
                                <input type="radio" name="destination" value="europa">
                                <div class="card-content">
                                    <div class="destination-icon">🧊</div>
                                    <h4 class="ff-serif fs-500">Europa</h4>
                                    <p class="fs-200">3 years journey</p>
                                    <p class="price">$1,200,000</p>
                                </div>
                            </label>
                            <label class="destination-card">
                                <input type="radio" name="destination" value="titan">
                                <div class="card-content">
                                    <div class="destination-icon">🪐</div>
                                    <h4 class="ff-serif fs-500">Titan</h4>
                                    <p class="fs-200">7 years journey</p>
                                    <p class="price">$2,000,000</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Step 2: Dates & Passengers -->
                    <div class="booking-step" data-step="2">
                        <h3 class="fs-600 ff-serif">Choose Your Dates</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="departure-date" class="ff-sans-cond uppercase letter-spacing-2">Departure Date</label>
                                <input type="date" id="departure-date" name="departureDate" required min="${this.getMinDate()}">
                            </div>
                            <div class="form-group">
                                <label for="return-date" class="ff-sans-cond uppercase letter-spacing-2">Return Date</label>
                                <input type="date" id="return-date" name="returnDate" required min="${this.getMinDate()}">
                            </div>
                            <div class="form-group">
                                <label for="passengers" class="ff-sans-cond uppercase letter-spacing-2">Number of Passengers</label>
                                <select id="passengers" name="passengers" required>
                                    <option value="1">1 Passenger</option>
                                    <option value="2">2 Passengers</option>
                                    <option value="3">3 Passengers</option>
                                    <option value="4">4 Passengers</option>
                                    <option value="5">5+ Passengers (Group)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Personal Details -->
                    <div class="booking-step" data-step="3">
                        <h3 class="fs-600 ff-serif">Your Information</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="first-name" class="ff-sans-cond uppercase letter-spacing-2">First Name</label>
                                <input type="text" id="first-name" name="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="last-name" class="ff-sans-cond uppercase letter-spacing-2">Last Name</label>
                                <input type="text" id="last-name" name="lastName" required>
                            </div>
                            <div class="form-group">
                                <label for="email" class="ff-sans-cond uppercase letter-spacing-2">Email Address</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="ff-sans-cond uppercase letter-spacing-2">Phone Number</label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>
                            <div class="form-group full-width">
                                <label for="special-requests" class="ff-sans-cond uppercase letter-spacing-2">Special Requests (Optional)</label>
                                <textarea id="special-requests" name="specialRequests" rows="4" placeholder="Any dietary requirements, accessibility needs, or special occasions?"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Confirmation -->
                    <div class="booking-step" data-step="4">
                        <h3 class="fs-600 ff-serif">Review Your Booking</h3>
                        <div class="booking-summary">
                            <div class="summary-section">
                                <h4 class="ff-sans-cond uppercase letter-spacing-2 text-accent">Destination</h4>
                                <p class="fs-500 ff-serif" id="summary-destination">-</p>
                            </div>
                            <div class="summary-section">
                                <h4 class="ff-sans-cond uppercase letter-spacing-2 text-accent">Travel Dates</h4>
                                <p id="summary-dates">-</p>
                            </div>
                            <div class="summary-section">
                                <h4 class="ff-sans-cond uppercase letter-spacing-2 text-accent">Passengers</h4>
                                <p id="summary-passengers">-</p>
                            </div>
                            <div class="summary-section">
                                <h4 class="ff-sans-cond uppercase letter-spacing-2 text-accent">Contact</h4>
                                <p id="summary-contact">-</p>
                            </div>
                            <div class="summary-total">
                                <h4 class="ff-serif fs-600">Estimated Total</h4>
                                <p class="fs-700 ff-serif" id="summary-total">$0</p>
                            </div>
                        </div>
                    </div>

                    <div class="booking-actions">
                        <button type="button" class="btn-secondary" id="btn-prev">
                            <span>← Previous</span>
                        </button>
                        <button type="button" class="btn-primary" id="btn-next">
                            <span>Next →</span>
                        </button>
                        <button type="submit" class="btn-submit" id="btn-submit" style="display: none;">
                            <span>Confirm Booking</span>
                        </button>
                    </div>
                </form>
            </div>
        `;

    document.body.appendChild(modal);
  }

  attachEventListeners() {
    // Open booking modal
    const bookButtons = document.querySelectorAll("[data-booking-trigger]");
    bookButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Close modal
    const closeBtn = document.querySelector(".booking-close");
    const overlay = document.querySelector(".booking-modal-overlay");

    closeBtn?.addEventListener("click", () => this.closeModal());
    overlay?.addEventListener("click", () => this.closeModal());

    // Form navigation
    document
      .getElementById("btn-next")
      ?.addEventListener("click", () => this.nextStep());
    document
      .getElementById("btn-prev")
      ?.addEventListener("click", () => this.prevStep());
    document
      .getElementById("booking-form")
      ?.addEventListener("submit", (e) => this.handleSubmit(e));

    // Update pricing when destination changes
    const destinationInputs = document.querySelectorAll(
      'input[name="destination"]',
    );
    destinationInputs.forEach((input) => {
      input.addEventListener("change", () => this.updatePricing());
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
    });
  }

  openModal() {
    const modal = document.getElementById("booking-modal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus first input
    setTimeout(() => {
      const firstInput = modal.querySelector("input");
      firstInput?.focus();
    }, 100);
  }

  closeModal() {
    const modal = document.getElementById("booking-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
    this.currentStep = 1;
    this.updateStepDisplay();
  }

  nextStep() {
    if (!this.validateCurrentStep()) return;

    this.saveCurrentStepData();

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateStepDisplay();

      if (this.currentStep === 4) {
        this.updateSummary();
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepDisplay();
    }
  }

  validateCurrentStep() {
    const currentStepEl = document.querySelector(
      `.booking-step[data-step="${this.currentStep}"]`,
    );
    const inputs = currentStepEl.querySelectorAll(
      "input[required], select[required], textarea[required]",
    );

    let isValid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.reportValidity();
        isValid = false;
      }
    });

    return isValid;
  }

  saveCurrentStepData() {
    const currentStepEl = document.querySelector(
      `.booking-step[data-step="${this.currentStep}"]`,
    );
    const inputs = currentStepEl.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      if (input.name) {
        this.formData[input.name] = input.value;
      }
    });
  }

  updateStepDisplay() {
    // Update steps
    document.querySelectorAll(".booking-step").forEach((step) => {
      step.classList.remove("active");
    });
    document
      .querySelector(`.booking-step[data-step="${this.currentStep}"]`)
      ?.classList.add("active");

    // Update progress indicators
    document.querySelectorAll(".progress-step").forEach((step, index) => {
      if (index < this.currentStep) {
        step.classList.add("active", "completed");
      } else if (index === this.currentStep - 1) {
        step.classList.add("active");
        step.classList.remove("completed");
      } else {
        step.classList.remove("active", "completed");
      }
    });

    // Update buttons
    const prevBtn = document.getElementById("btn-prev");
    const nextBtn = document.getElementById("btn-next");
    const submitBtn = document.getElementById("btn-submit");

    prevBtn.style.display = this.currentStep === 1 ? "none" : "block";
    nextBtn.style.display =
      this.currentStep === this.totalSteps ? "none" : "block";
    submitBtn.style.display =
      this.currentStep === this.totalSteps ? "block" : "none";
  }

  updateSummary() {
    const destinationNames = {
      moon: "Moon",
      mars: "Mars",
      europa: "Europa",
      titan: "Titan",
    };

    document.getElementById("summary-destination").textContent =
      destinationNames[this.formData.destination] || "-";

    document.getElementById("summary-dates").textContent =
      `${this.formatDate(this.formData.departureDate)} - ${this.formatDate(this.formData.returnDate)}`;

    document.getElementById("summary-passengers").textContent =
      `${this.formData.passengers} ${this.formData.passengers === "1" ? "Passenger" : "Passengers"}`;

    document.getElementById("summary-contact").textContent =
      `${this.formData.firstName} ${this.formData.lastName}\n${this.formData.email}`;

    this.updatePricing();
  }

  updatePricing() {
    const prices = {
      moon: 250000,
      mars: 500000,
      europa: 1200000,
      titan: 2000000,
    };

    const basePrice = prices[this.formData.destination] || 0;
    const passengers = parseInt(this.formData.passengers) || 1;
    const total = basePrice * passengers;

    document.getElementById("summary-total").textContent =
      `$${total.toLocaleString()}`;
  }

  handleSubmit(e) {
    e.preventDefault();

    // Save all data
    this.saveCurrentStepData();

    // Show success message
    this.showSuccessMessage();
  }

  showSuccessMessage() {
    const modal = document.querySelector(".booking-modal-content");
    modal.innerHTML = `
            <div class="booking-success">
                <div class="success-icon">🚀</div>
                <h2 class="fs-700 ff-serif">Booking Submitted!</h2>
                <p class="fs-500">Thank you for choosing Stellar Voyages!</p>
                <p>A confirmation email has been sent to <strong>${this.formData.email}</strong></p>
                <p class="text-accent">Our space travel specialists will contact you within 24 hours.</p>
                <button class="large-button uppercase ff-serif" onclick="window.bookingSystem.closeModal()">
                    Close
                </button>
            </div>
        `;
  }

  getMinDate() {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Minimum 7 days in advance
    return today.toISOString().split("T")[0];
  }

  formatDate(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// Initialize booking system on page load
document.addEventListener("DOMContentLoaded", () => {
  window.bookingSystem = new BookingSystem();
  console.log("🎫 Booking system initialized");
});
