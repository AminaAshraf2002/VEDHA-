// JavaScript for Veda Samhita Foundation website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialCards.length > 0) {
        let currentSlide = 0;

        function showSlide(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialCards[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= testimonialCards.length) next = 0;
            showSlide(next);
        }

        function prevSlide() {
            let prev = currentSlide - 1;
            if (prev < 0) prev = testimonialCards.length - 1;
            showSlide(prev);
        }

        // Event listeners for slider controls
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Gallery Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lightbox for Gallery
    const galleryImages = document.querySelectorAll('.gallery-image img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxPrev = document.querySelector('.prev');
    const lightboxNext = document.querySelector('.next');
    
    if (galleryImages.length > 0 && lightbox) {
        let currentImageIndex = 0;
        
        // Open lightbox
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentImageIndex = index;
                showLightboxImage(index);
                lightbox.classList.add('active');
            });
        });
        
        // Function to show image in lightbox
        function showLightboxImage(index) {
            lightboxImg.src = galleryImages[index].src;
            const caption = galleryImages[index].parentElement.querySelector('.overlay-content h3').textContent;
            lightboxCaption.textContent = caption;
        }
        
        // Close lightbox
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
        
        // Next image
        lightboxNext.addEventListener('click', function() {
            currentImageIndex++;
            if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
            showLightboxImage(currentImageIndex);
        });
        
        // Previous image
        lightboxPrev.addEventListener('click', function() {
            currentImageIndex--;
            if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
            showLightboxImage(currentImageIndex);
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const currentlyActive = document.querySelector('.faq-item.active');
                
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                }
                
                item.classList.toggle('active');
            });
        });
    }

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Reset previous error states
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                input.style.borderColor = '';
            });
            
            // Validate each field
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!subjectInput.value.trim()) {
                subjectInput.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = 'red';
                isValid = false;
            }
            
            if (isValid) {
                // In a real implementation, you would submit the form data to a server
                alert('സന്ദേശം വിജയകരമായി അയച്ചു! ഞങ്ങൾ ഉടൻ തന്നെ നിങ്ങളുമായി ബന്ധപ്പെടുന്നതാണ്.');
                contactForm.reset();
            } else {
                alert('ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക.');
            }
        });
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Video Play Button
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    if (videoThumbnails.length > 0) {
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // In a real implementation, you would open a video player
                alert('വീഡിയോ പ്ലേയർ ലോഡ് ചെയ്യുന്നു...');
            });
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile navigation if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
});