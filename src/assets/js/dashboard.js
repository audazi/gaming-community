document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    // Load user data
    loadUserData();
    
    // Navigation
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active states
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${targetId}-section`) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Avatar upload
    const avatarInput = document.createElement('input');
    avatarInput.type = 'file';
    avatarInput.accept = 'image/*';
    avatarInput.style.display = 'none';
    document.body.appendChild(avatarInput);

    document.querySelector('.change-avatar-btn').addEventListener('click', () => {
        avatarInput.click();
    });

    avatarInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                const response = await fetch('http://localhost:5000/api/user/avatar', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    document.getElementById('userAvatar').src = data.avatarUrl;
                    showNotification('Avatar updated successfully', 'success');
                }
            } catch (error) {
                console.error('Error uploading avatar:', error);
                showNotification('Failed to update avatar', 'error');
            }
        }
    });

    // Team creation
    const createTeamBtn = document.getElementById('create-team-btn');
    const createTeamModal = document.getElementById('create-team-modal');
    const closeModal = document.querySelector('.close');
    const createTeamForm = document.getElementById('create-team-form');

    createTeamBtn.addEventListener('click', () => {
        createTeamModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        createTeamModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === createTeamModal) {
            createTeamModal.style.display = 'none';
        }
    });

    createTeamForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', document.getElementById('team-name').value);
        formData.append('description', document.getElementById('team-description').value);
        formData.append('games', document.getElementById('team-games').value);
        
        const logoFile = document.getElementById('team-logo').files[0];
        if (logoFile) {
            formData.append('logo', logoFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/teams', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                showNotification('Team created successfully', 'success');
                createTeamModal.style.display = 'none';
                loadTeams();
            } else {
                const data = await response.json();
                showNotification(data.message || 'Failed to create team', 'error');
            }
        } catch (error) {
            console.error('Error creating team:', error);
            showNotification('Failed to create team', 'error');
        }
    });

    // Load teams
    loadTeams();
});

async function loadUserData() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('username').textContent = user.username;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('profile-username').value = user.username;
            document.getElementById('profile-bio').value = user.bio || '';
            document.getElementById('twitter-link').value = user.socialLinks?.twitter || '';
            document.getElementById('discord-link').value = user.socialLinks?.discord || '';
            document.getElementById('twitch-link').value = user.socialLinks?.twitch || '';
            
            if (user.avatar) {
                document.getElementById('userAvatar').src = user.avatar;
            }
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        showNotification('Failed to load user data', 'error');
    }
}

async function loadTeams() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/teams/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const teams = await response.json();
            const teamsGrid = document.querySelector('.teams-grid');
            teamsGrid.innerHTML = teams.map(team => `
                <div class="team-card">
                    <img src="${team.logo}" alt="${team.name}" class="team-logo">
                    <h3 class="team-name">${team.name}</h3>
                    <p>${team.description}</p>
                    <div class="team-members">
                        ${team.members.map(member => `
                            <span class="member-tag">${member.user.username}</span>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading teams:', error);
        showNotification('Failed to load teams', 'error');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
