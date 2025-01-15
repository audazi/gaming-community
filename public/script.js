// User menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const userTrigger = document.querySelector('.user-trigger');
    const loginCard = document.querySelector('.login-card');

    if (userTrigger && loginCard) {
        userTrigger.addEventListener('click', function() {
            loginCard.classList.toggle('active');
        });

        // Close login card when clicking outside
        document.addEventListener('click', function(event) {
            if (!loginCard.contains(event.target) && !userTrigger.contains(event.target)) {
                loginCard.classList.remove('active');
            }
        });
    }

    // Form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log('Login attempt:', { email, password });
            // Add your authentication logic here
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList[1]; // google, facebook, or twitter
            console.log(`${provider} login clicked`);
            // Add your social login logic here
        });
    });
});

// Navigation dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown');

        if (link && dropdown) {
            item.addEventListener('mouseenter', function() {
                dropdown.style.display = 'block';
            });

            item.addEventListener('mouseleave', function() {
                dropdown.style.display = 'none';
            });
        }
    });
});

// Card interactions
document.addEventListener('DOMContentLoaded', function() {
    const interactionBtns = document.querySelectorAll('.interaction-btn');
    
    interactionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.querySelector('i').classList.contains('fa-heart') ? 'like' :
                        this.querySelector('i').classList.contains('fa-comment') ? 'comment' : 'share';
            const count = this.querySelector('span');
            
            if (count) {
                let currentCount = parseInt(count.textContent);
                count.textContent = currentCount + 1;
                
                // Add animation class
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            }
        });
    });
});
