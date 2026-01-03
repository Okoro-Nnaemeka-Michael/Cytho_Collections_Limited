document.addEventListener("DOMContentLoaded", function () {
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    updateNavbar();
    
    // Update on scroll
    window.addEventListener('scroll', updateNavbar);
    
    // ===== MOBILE MENU TOGGLE =====
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarNav.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.scroll-animate');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                // Add delay for staggered animations
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 50);
            } else {
                element.classList.remove('active');
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                animateOnScroll();
            }, 100);
        }
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
                backToTop.style.transform = 'translateY(10px)';
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const originalClass = submitBtn.className;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.remove('btn-warning');
            submitBtn.classList.add('btn-secondary');
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
                submitBtn.classList.remove('btn-secondary');
                submitBtn.classList.add('btn-success');
                
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.className = originalClass;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // ===== PRODUCT CARD HOVER EFFECTS =====
    const productCards = document.querySelectorAll('.product-card, .conditioner-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== FEATURE ITEM HOVER EFFECTS =====
    const featureItems = document.querySelectorAll('.feature-item, .tip-item, .reason-card');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== IMAGE LAZY LOADING =====
    const lazyImages = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => {
            if (!img.classList.contains('loaded')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // ===== FAQ ACCORDION ANIMATION =====
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (!icon) {
                // Add icon if not present
                const icon = document.createElement('i');
                icon.className = 'fas fa-chevron-down ms-auto';
                this.appendChild(icon);
            }
            
            // Rotate icon
            const iconElement = this.querySelector('i');
            if (this.classList.contains('collapsed')) {
                iconElement.style.transform = 'rotate(0deg)';
            } else {
                iconElement.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // ===== NOTIFICATION FUNCTION =====
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification alert alert-${type} alert-dismissible fade show`;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.minWidth = '300px';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // ===== SEARCH FUNCTIONALITY =====
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create search modal
            const searchModal = document.createElement('div');
            searchModal.className = 'search-modal';
            searchModal.innerHTML = `
                <div class="search-modal-content">
                    <div class="search-header">
                        <h5>Search Products</h5>
                        <button class="close-search">&times;</button>
                    </div>
                    <div class="search-body">
                        <input type="text" class="form-control" placeholder="Search for hair types, conditioners...">
                        <button class="btn btn-warning w-100 mt-3">Search</button>
                    </div>
                </div>
            `;
            
            // Style search modal
            searchModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 9, 39, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(searchModal);
            
            // Animate in
            setTimeout(() => {
                searchModal.style.opacity = '1';
            }, 10);
            
            // Close functionality
            const closeBtn = searchModal.querySelector('.close-search');
            closeBtn.addEventListener('click', () => {
                searchModal.style.opacity = '0';
                setTimeout(() => {
                    searchModal.remove();
                }, 300);
            });
            
            // Close on escape key
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    searchModal.style.opacity = '0';
                    setTimeout(() => {
                        searchModal.remove();
                        document.removeEventListener('keydown', closeOnEscape);
                    }, 300);
                }
            });
            
            // Close on background click
            searchModal.addEventListener('click', function(e) {
                if (e.target === searchModal) {
                    searchModal.style.opacity = '0';
                    setTimeout(() => {
                        searchModal.remove();
                    }, 300);
                }
            });
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        // Recalculate animations on resize
        animateOnScroll();
    }, 250));
    
    // ===== INITIALIZE CAROUSELS =====
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        // Add hover pause functionality
        carousel.addEventListener('mouseenter', () => {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });
        
        carousel.addEventListener('mouseleave', () => {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.cycle();
            }
        });
    });
    
    // ===== ADD ACTIVE CLASS TO CURRENT SECTION IN NAVBAR =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            } else if (currentSection === '' && link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
    updateActiveNavLink(); // Initial call
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    // Remove preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Initialize tooltips if needed
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});