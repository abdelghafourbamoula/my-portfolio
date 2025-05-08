/**
 * Skill Progress Visualization
 * Adds animated progress bars to skills section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create skill progress visualization
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        // Add progress visualization to skill categories
        const skillCategories = skillsSection.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const categoryTitle = category.querySelector('h3').textContent;
            const skillItems = category.querySelector('.skill-items');
            const skillTags = skillItems.querySelectorAll('.skill-tag');
            
            // Create a container for the featured skills with progress bars
            const progressContainer = document.createElement('div');
            progressContainer.className = 'skill-progress-container';
            
            // Select top skills to show with progress bars (max 3)
            const topSkills = Array.from(skillTags).slice(0, 3);
            
            topSkills.forEach(skill => {
                // Generate a random progress value between 75 and 95
                const progressValue = Math.floor(Math.random() * 21) + 75;
                
                const progressBar = document.createElement('div');
                progressBar.className = 'skill-progress';
                progressBar.innerHTML = `
                    <div class="skill-progress-label">
                        <span>${skill.textContent}</span>
                        <span class="skill-percent">${progressValue}%</span>
                    </div>
                    <div class="skill-progress-bar">
                        <div class="skill-progress-fill" style="width: 0%" data-width="${progressValue}%"></div>
                    </div>
                `;
                
                progressContainer.appendChild(progressBar);
            });
            
            // Insert the progress container after the skill items
            category.appendChild(progressContainer);
        });
        
        // Animate progress bars when they come into view
        const progressBars = document.querySelectorAll('.skill-progress-fill');
        
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
                
                if (isInView && !bar.classList.contains('animated')) {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                    bar.classList.add('animated');
                }
            });
        };
        
        // Initial check and add scroll listener
        animateProgressBars();
        window.addEventListener('scroll', animateProgressBars);
    }
});