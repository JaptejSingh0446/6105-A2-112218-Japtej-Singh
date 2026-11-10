/* ==========================================================================
   Urban Bloom Florist - Interactive Script
   Includes: Category Filtering, Counter, Mobile Menu, Form Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- FEATURE 1: Category Filtering & Result Counter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const countDisplay = document.getElementById('result-count');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                let count = 0;

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category.includes(filter)) {
                        card.style.display = 'flex';
                        count++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (countDisplay) {
                    countDisplay.textContent = `Showing ${count} arrangement${count === 1 ? '' : 's'}`;
                }
            });
        });
    }

    // --- FEATURE 2: Contact Form Validation & Mailto Draft Generator ---
    const form = document.getElementById('enquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            const feedback = document.getElementById('form-feedback');

            if (!fullName || !email || !service || !message) {
                showFeedback('Please fill out all required fields (*).', 'error');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                showFeedback('Please enter a valid email address.', 'error');
                return;
            }

            showFeedback('Preparing your enquiry email draft...', 'success');

            const subject = encodeURIComponent(`Urban Bloom Enquiry: ${service} - ${fullName}`);
            const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${email}\nService: ${service}\n\nDetails:\n${message}`);

            setTimeout(() => {
                window.location.href = `mailto:hello@urbanbloom.kiwi?subject=${subject}&body=${body}`;
            }, 800);
        });
    }

    function showFeedback(msg, type) {
        let el = document.getElementById('form-feedback');
        if (!el) {
            el = document.createElement('div');
            el.id = 'form-feedback';
            form.prepend(el);
        }
        el.textContent = msg;
        el.className = `feedback-${type}`;
        el.style.padding = '12px';
        el.style.marginBottom = '16px';
        el.style.borderRadius = '4px';
        el.style.fontWeight = 'bold';
        el.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda';
        el.style.color = type === 'error' ? '#721c24' : '#155724';
    }

    // --- FEATURE 3: Mobile Hamburger Navigation Menu ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    }

    // --- FEATURE 4: FAQ Accordion Toggle ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            answer.style.display = isVisible ? 'none' : 'block';
        });
    });
});