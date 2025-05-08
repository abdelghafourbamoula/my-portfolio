/**
 * Animated Section Transitions
 * Adds smooth animations and transitions when scrolling between sections
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Add animation classes to sections
    sections.forEach(section => {
        section.classList.add('animated-section');
    });
    
    // Create intersection observer for animations
    const sectionObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    
                    // Animate children elements with staggered delay
                    const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
                    animatedElements.forEach((el, index) => {
                        el.style.transitionDelay = `${index * 0.1}s`;
                        el.classList.add('element-visible');
                    });
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15, // Trigger when 15% of the section is visible
            rootMargin: '0px'
        }
    );
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Add animate-on-scroll class to key elements
        const headings = section.querySelectorAll('h2, h3');
        const paragraphs = section.querySelectorAll('p');
        const cards = section.querySelectorAll('.card, .project-card, .certification-card, .timeline-item');
        const buttons = section.querySelectorAll('.btn');
        
        // Add animation classes to elements
        [...headings, ...paragraphs, ...cards, ...buttons].forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    });
    
    // Add CSS for animations if not already in stylesheet
    if (!document.getElementById('animated-sections-style')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'animated-sections-style';
        styleSheet.innerHTML = `
            .animated-section {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .section-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .element-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Different animations for different element types */
            h2.animate-on-scroll, h3.animate-on-scroll {
                transform: translateY(-20px);
            }
            
            .card.animate-on-scroll, .project-card.animate-on-scroll, .certification-card.animate-on-scroll {
                transform: scale(0.95);
            }
            
            .btn.animate-on-scroll {
                transform: translateY(10px);
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Add parallax effect to sections with background images
    const parallaxSections = document.querySelectorAll('.hero, section[style*="background-image"]');
    
    window.addEventListener('scroll', function() {
        parallaxSections.forEach(section => {
            const scrollPosition = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Calculate parallax offset
                const parallaxOffset = (scrollPosition - sectionTop) * 0.4;
                
                // Apply parallax effect
                section.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
            }
        });
    });
});