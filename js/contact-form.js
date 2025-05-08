/**
 * Contact Form with EmailJS Integration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up at https://www.emailjs.com/ (they have a free tier)
 * 2. Create a new Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with these variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 * 4. Replace the placeholders below with your actual EmailJS credentials:
 *    - YOUR_PUBLIC_KEY: Find in Account > API Keys
 *    - YOUR_SERVICE_ID: Find in Email Services tab
 *    - YOUR_TEMPLATE_ID: Find in Email Templates tab
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("PUBLIC_KEY");

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Create a status message element if it doesn't exist
    let statusMessage = contactForm.querySelector('.status-message');
    if (!statusMessage) {
        statusMessage = document.createElement('div');
        statusMessage.className = 'status-message';
        contactForm.appendChild(statusMessage);
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Change button text and disable it during submission
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('form-submitting');
        
        // Clear any previous status messages
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
        
        // Get form data
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Validate form elements exist
        if (!nameInput || !emailInput || !subjectInput || !messageInput) {
            console.error('One or more form elements are missing');
            statusMessage.textContent = 'Form error: Please try again or contact me directly at abdelghafourbamoula@gmail.com';
            statusMessage.classList.add('error');
            return;
        }

        const name = nameInput.value;
        const email = emailInput.value;
        const subject = subjectInput.value;
        const message = messageInput.value;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'abdelghafourbamoula@gmail.com' // Your email address
        };
        
        // Send email using EmailJS
        emailjs.send('service_xj0zyy4', 'template_49v9o2h', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                statusMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                statusMessage.classList.add('success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                statusMessage.textContent = 'Failed to send message. Please try again or contact me directly at abdelghafourbamoula@gmail.com';
                statusMessage.classList.add('error');
            })
            .finally(function() {
                // Restore button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                submitButton.classList.remove('form-submitting');
                
                // Clear status message after 8 seconds
                setTimeout(function() {
                    // Fade out effect
                    statusMessage.style.opacity = '0';
                    setTimeout(function() {
                        statusMessage.textContent = '';
                        statusMessage.className = 'status-message';
                        statusMessage.style.opacity = '1';
                    }, 500);
                }, 8000);
            });
    });
});