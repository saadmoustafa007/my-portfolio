document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Language Switcher (AR / EN)
    // ==========================================================================
    const langToggle = document.getElementById('langToggle');
    const htmlElement = document.documentElement;
    const inputsWithPlaceholders = document.querySelectorAll('[data-placeholder-en]');

    // Function to set the website language
    function setLanguage(lang) {
        if (lang === 'en') {
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
            localStorage.setItem('portfolio-lang', 'en');
            
            // Update placeholders for inputs
            inputsWithPlaceholders.forEach(input => {
                const enPlaceholder = input.getAttribute('data-placeholder-en');
                if (enPlaceholder) {
                    input.setAttribute('placeholder', enPlaceholder);
                }
            });
        } else {
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
            localStorage.setItem('portfolio-lang', 'ar');
            
            // Restore default Arabic placeholders
            inputsWithPlaceholders.forEach(input => {
                if (input.id === 'name') {
                    input.setAttribute('placeholder', 'أدخل اسمك هنا');
                } else if (input.id === 'message') {
                    input.setAttribute('placeholder', 'اكتب تفاصيل مشروعك أو استفسارك هنا...');
                }
            });
        }
    }

    // Initialize language from localStorage or default to Arabic
    const savedLanguage = localStorage.getItem('portfolio-lang') || 'ar';
    setLanguage(savedLanguage);

    // Event listener for language toggle button
    langToggle.addEventListener('click', () => {
        const currentLang = htmlElement.getAttribute('lang');
        const nextLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(nextLang);
    });

    // ==========================================================================
    // Mobile Menu Navigation Toggle
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================================================
    // Skills Filter / Tabs Functionality
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Retrigger animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.3s ease';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================================================
    // Scroll Behavior & Header Effects & Active Link Highlighting
    // ==========================================================================
    const header = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // Contact Form Submission & Success Popup Simulation
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formSuccessPopup = document.getElementById('formSuccess');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        // Change button state to loading
        submitBtn.disabled = true;
        const currentLang = htmlElement.getAttribute('lang');
        if (currentLang === 'ar') {
            submitBtn.innerHTML = 'جاري الإرسال... <span class="spinner"></span>';
        } else {
            submitBtn.innerHTML = 'Sending... <span class="spinner"></span>';
        }

        // Simulate API network call (1.5 seconds)
        setTimeout(() => {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;

            // Reset form fields
            contactForm.reset();

            // Show Success Popup
            formSuccessPopup.classList.add('show');
        }, 1500);
    });

    // Function to close success popup
    window.closeSuccessPopup = function() {
        formSuccessPopup.classList.remove('show');
    };
    
    closeSuccessBtn.addEventListener('click', () => {
        closeSuccessPopup();
    });

    // ==========================================================================
    // Set dynamic current year in Footer
    // ==========================================================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // Page load fade-in animations
    // ==========================================================================
    setTimeout(() => {
        document.body.classList.remove('loading');
        // Initial scroll trigger check
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});
