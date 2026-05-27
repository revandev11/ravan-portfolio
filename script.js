// ========== FORM NAVIGATION FUNCTIONALITY ==========

class MultiStepForm {
    constructor() {
        this.form = document.querySelector('.multi-step-form');
        this.steps = Array.from(document.querySelectorAll('.form-step'));
        this.progressSteps = Array.from(document.querySelectorAll('.progress-step'));
        this.currentStep = 0;
        
        this.prevBtn = document.querySelector('.btn-nav.prev');
        this.nextBtn = document.querySelector('.btn-nav.next');
        this.submitBtn = document.querySelector('.btn-nav.submit');
        
        this.init();
    }

    init() {
        this.showStep(this.currentStep);
        
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.previousStep();
        });

        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.validateStep()) {
                this.nextStep();
            }
        });

        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitForm();
            });
        }

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    showStep(stepIndex) {
        // Hide all steps
        this.steps.forEach(step => step.classList.remove('active'));
        this.progressSteps.forEach(step => step.classList.remove('active'));

        // Show current step
        this.steps[stepIndex].classList.add('active');
        this.progressSteps[stepIndex].classList.add('active');

        // Update button states
        this.prevBtn.disabled = stepIndex === 0;
        
        if (stepIndex === this.steps.length - 1) {
            this.nextBtn.style.display = 'none';
            this.submitBtn.style.display = 'block';
        } else {
            this.nextBtn.style.display = 'block';
            this.submitBtn.style.display = 'none';
        }
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.scrollToForm();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.scrollToForm();
        }
    }

    validateStep() {
        const currentFieldset = this.steps[this.currentStep];
        const inputs = currentFieldset.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });

        return isValid;
    }

    submitForm() {
        if (!this.validateStep()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Collect form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        console.log('Form submitted with data:', data);
        alert('Form submitted successfully! Check console for data.');
        
        // Reset form
        this.form.reset();
        this.currentStep = 0;
        this.showStep(this.currentStep);
    }

    scrollToForm() {
        const formContainer = document.querySelector('.form-container');
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MultiStepForm();
});

// ========== SMOOTH SCROLLING FOR NAVIGATION ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
