/**
 * Interactive Project Cards
 * Adds hover effects, animations, and interactive elements to project cards
 */

document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.getElementById('projects');
    
    if (projectsSection) {
        const projectCards = projectsSection.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Add hover effect class
            card.classList.add('project-card-interactive');
            
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Add view details button if it doesn't exist
            if (!card.querySelector('.project-view-details')) {
                const projectLinks = card.querySelector('.project-links');
                
                if (projectLinks) {
                    const viewDetailsBtn = document.createElement('button');
                    viewDetailsBtn.className = 'project-view-details';
                    viewDetailsBtn.innerHTML = '<i class="fas fa-info-circle"></i> Details';
                    
                    // Insert before other links
                    projectLinks.prepend(viewDetailsBtn);
                    
                    // Add click event to show more details
                    viewDetailsBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Toggle expanded state
                        card.classList.toggle('project-expanded');
                        
                        // Change button text based on state
                        if (card.classList.contains('project-expanded')) {
                            viewDetailsBtn.innerHTML = '<i class="fas fa-times-circle"></i> Close';
                        } else {
                            viewDetailsBtn.innerHTML = '<i class="fas fa-info-circle"></i> Details';
                        }
                    });
                }
            }
            
            // Add tilt effect on mouse move
            card.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 768) { // Only on desktop
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left; // x position within the element
                    const y = e.clientY - rect.top; // y position within the element
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const deltaX = (x - centerX) / centerX * 5; // Max 5 degrees
                    const deltaY = (y - centerY) / centerY * 5; // Max 5 degrees
                    
                    card.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.02, 1.02, 1.02)`;
                }
            });
            
            // Reset transform on mouse leave
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
            
            // Add tech tag highlighting
            const techTags = card.querySelectorAll('.project-tech span');
            techTags.forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.classList.add('tech-tag-highlight');
                });
                tag.addEventListener('mouseleave', function() {
                    this.classList.remove('tech-tag-highlight');
                });
            });
        });
        
        // Add CSS for project card styles if not already in stylesheet
        if (!document.getElementById('project-cards-style')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'project-cards-style';
            styleSheet.innerHTML = `
                .project-card-interactive {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .project-card-interactive:hover {
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                }
                
                .project-view-details {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background-color 0.3s ease;
                    margin-right: 10px;
                }
                
                .project-view-details:hover {
                    background-color: var(--secondary-color);
                }
                
                .project-expanded .project-description {
                    max-height: 500px;
                    opacity: 1;
                }
                
                .tech-tag-highlight {
                    background-color: var(--accent-color);
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                }
            `;
            document.head.appendChild(styleSheet);
        }
        
        // Add filter functionality for projects
        const projectContainer = projectsSection.querySelector('.projects-grid') || projectsSection.querySelector('.container');
        
        if (projectContainer) {
            // Create filter buttons container
            const filterContainer = document.createElement('div');
            filterContainer.className = 'project-filters';
            filterContainer.innerHTML = `
                <button class="filter-btn active" data-filter="all">All Projects</button>
                <button class="filter-btn" data-filter="data-science">Data Science</button>
                <button class="filter-btn" data-filter="web">Web Development</button>
                <button class="filter-btn" data-filter="ai">AI/ML</button>
            `;
            
            // Insert filter before project grid
            projectContainer.parentNode.insertBefore(filterContainer, projectContainer);
            
            // Add filter functionality
            const filterButtons = filterContainer.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Filter projects
                    projectCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else {
                            // Check if card has the category
                            // This assumes projects have a data-category attribute
                            // If not, you can check class names or inner text
                            const category = card.getAttribute('data-category') || '';
                            
                            if (category.includes(filter)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                });
            });
            
            // Add CSS for filters
            const filterStyle = document.createElement('style');
            filterStyle.innerHTML = `
                .project-filters {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                }
                
                .filter-btn {
                    background: none;
                    border: 2px solid var(--primary-color);
                    color: var(--primary-color);
                    padding: 8px 15px;
                    margin: 0 5px 10px;
                    border-radius: 30px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                
                .filter-btn:hover, .filter-btn.active {
                    background-color: var(--primary-color);
                    color: white;
                }
                
                @media (max-width: 768px) {
                    .project-filters {
                        justify-content: flex-start;
                        overflow-x: auto;
                        padding-bottom: 10px;
                    }
                    
                    .filter-btn {
                        flex: 0 0 auto;
                    }
                }
            `;
            document.head.appendChild(filterStyle);
        }
    }
});