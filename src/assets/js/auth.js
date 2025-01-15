document.addEventListener('DOMContentLoaded', () => {
    const userTrigger = document.querySelector('.user-trigger');
    const loginCard = document.querySelector('.login-card');
    const loginForm = document.querySelector('.login-form');
    const registerLink = document.querySelector('.register-link a');
    let isLoginVisible = false;

    // Toggle login card
    userTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        isLoginVisible = !isLoginVisible;
        loginCard.style.display = isLoginVisible ? 'block' : 'none';
    });

    // Close login card when clicking outside
    document.addEventListener('click', (e) => {
        if (isLoginVisible && !loginCard.contains(e.target) && e.target !== userTrigger) {
            isLoginVisible = false;
            loginCard.style.display = 'none';
        }
    });

    // Handle login form submission
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const rememberMe = document.querySelector('#remember-me').checked;

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                handleLoginSuccess({ token: data.token, rememberMe });
            } else {
                showNotification(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showNotification('An error occurred during login', 'error');
        }
    });

    // Handle registration link
    registerLink?.addEventListener('click', (e) => {
        e.preventDefault();
        // Show registration form (you can implement this based on your needs)
        showRegistrationForm();
    });
});

function handleLoginSuccess(data) {
    const { token, rememberMe } = data;
    if (rememberMe) {
        localStorage.setItem('token', token);
    } else {
        sessionStorage.setItem('token', token);
    }
    
    // Update UI
    updateUserInterface(true);
    closeLoginCard();
    showNotification('Login successful!', 'success');
    
    // Redirect to dashboard
    window.location.href = './src/dashboard.html';
}

function updateUserInterface(isLoggedIn) {
    const userTrigger = document.querySelector('.user-trigger');
    const loginCard = document.querySelector('.login-card');
    
    if (isLoggedIn) {
        userTrigger.innerHTML = `
            <i class="fas fa-user"></i>
            <a href="./src/dashboard.html" style="color: inherit; text-decoration: none;">
                <span>Dashboard</span>
            </a>
        `;
        if (loginCard) loginCard.style.display = 'none';
    } else {
        userTrigger.innerHTML = `
            <i class="fas fa-user"></i>
            <span>Login</span>
        `;
    }
}

function closeLoginCard() {
    const loginCard = document.querySelector('.login-card');
    loginCard.style.display = 'none';
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showRegistrationForm() {
    const loginForm = document.querySelector('.login-form');
    const loginCard = document.querySelector('.login-card');
    
    loginForm.innerHTML = `
        <h3>Create Account</h3>
        <div class="form-group">
            <label><i class="fas fa-user"></i> Username</label>
            <input type="text" id="reg-username" required>
        </div>
        <div class="form-group">
            <label><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="reg-email" required>
        </div>
        <div class="form-group">
            <label><i class="fas fa-lock"></i> Password</label>
            <input type="password" id="reg-password" required>
        </div>
        <button type="submit" class="login-button">
            <i class="fas fa-user-plus"></i> Register
        </button>
        <div class="login-options">
            <a href="#" class="back-to-login">Back to Login</a>
        </div>
    `;
    
    // Update form submission handler
    loginForm.onsubmit = handleRegistration;
    
    // Add back to login handler
    document.querySelector('.back-to-login').onclick = (e) => {
        e.preventDefault();
        showLoginForm();
    };
}

function showLoginForm() {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.innerHTML = `
        <div class="form-group">
            <label><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="email" required>
        </div>
        <div class="form-group">
            <label><i class="fas fa-lock"></i> Password</label>
            <input type="password" id="password" required>
        </div>
        <button type="submit" class="login-button">
            <i class="fas fa-sign-in-alt"></i> Login
        </button>
        <div class="login-options">
            <div class="remember-me">
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Remember me</label>
            </div>
            <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
        <div class="social-login">
            <p>Or login with</p>
            <div class="social-buttons">
                <button class="social-btn google"><i class="fab fa-google"></i></button>
                <button class="social-btn facebook"><i class="fab fa-facebook-f"></i></button>
                <button class="social-btn twitter"><i class="fab fa-twitter"></i></button>
            </div>
        </div>
        <div class="register-link">
            <p>Don't have an account? <a href="#">Register now</a></p>
        </div>
    `;
    
    // Update form submission handler
    loginForm.onsubmit = handleLogin;
}

async function handleRegistration(e) {
    e.preventDefault();
    
    const username = document.querySelector('#reg-username').value;
    const email = document.querySelector('#reg-email').value;
    const password = document.querySelector('#reg-password').value;

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showNotification('Registration successful! Please login.', 'success');
            showLoginForm();
        } else {
            showNotification(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('An error occurred during registration', 'error');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const rememberMe = document.querySelector('#remember-me').checked;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            handleLoginSuccess({ token: data.token, rememberMe });
        } else {
            showNotification(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('An error occurred during login', 'error');
    }
}
