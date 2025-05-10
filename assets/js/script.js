// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navLinks.classList.add('active');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('active');
        menuOpen = false;
    }
});

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if(menuOpen) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            menuOpen = false;
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real implementation, you would send this data to a server
        // For this static site, we'll just show a success message
        alert(`Thank you for your message, ${name}! This is a static portfolio, so no actual message was sent. In a real implementation, your message would be sent to Abdelghafour Bamoula.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.expertise-card, .timeline-item, .cert-card, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add current year to footer copyright
const yearSpan = document.querySelector('.footer-content p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; ${currentYear} Abdelghafour Bamoula. All Rights Reserved.`;
}

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle i');

// Check for saved theme preference or use default
const getCurrentTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

// Apply the current theme to the document
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update icon based on current theme
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
};

// Initialize theme
const setTheme = () => {
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
};

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
    
    // Apply the new theme
    applyTheme(newTheme);
});

// Set theme on page load
setTheme();

// Typing animation for hero title
function typeWriter() {
    const titleElement = document.querySelector('.hero-content h2');
    if (!titleElement) return;
    
    // Set the title text to "Data Scientist & Data Engineer"
    const text = "Data Scientist & Data Engineer";
    titleElement.textContent = '';
    titleElement.style.borderRight = '3px solid var(--accent-color)';
    
    let i = 0;
    const speed = 100; // typing speed in milliseconds
    
    function type() {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            titleElement.style.borderRight = 'none';
        }
    }
    
    setTimeout(() => {
        type();
    }, 500);
}

// Run typing animation when page loads
window.addEventListener('load', typeWriter);


// Animate progress bars when they come into view
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Once animation is triggered, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bar animations
    animateProgressBars();
});