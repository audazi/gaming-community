document.addEventListener('DOMContentLoaded', () => {
    // Load teams and populate games filter
    loadTeams();
    loadGamesFilter();

    // Search and filter functionality
    const searchInput = document.getElementById('team-search');
    const gameFilter = document.getElementById('game-filter');

    searchInput.addEventListener('input', filterTeams);
    gameFilter.addEventListener('change', filterTeams);

    // Modal functionality
    const modal = document.getElementById('team-modal');
    const closeBtn = modal.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Join team functionality
    document.getElementById('join-team-btn').addEventListener('click', async () => {
        const teamId = modal.getAttribute('data-team-id');
        await requestToJoinTeam(teamId);
    });
});

// Example teams data
const exampleTeams = [
    {
        _id: '1',
        name: 'ILM',
        logo: 'https://i.imgur.com/8cMXmKS.png',
        description: 'European professional esports organization. Known for their competitive playstyle.',
        games: ['Quake 3 Arena'],
        members: [
            { user: { _id: '1', username: 'Blaze' }, role: 'Captain' },
            { user: { _id: '2', username: 'Fus1on' }, role: 'Member' },
            { user: { _id: '3', username: 'Orgi' }, role: 'Member' },
            { user: { _id: '4', username: 'XPOW' }, role: 'Member' },
            { user: { _id: '5', username: 'AUDAZ' }, role: 'Member' }
        ],
        achievements: [
            {
                title: 'Unfreeze League 2021',
                description: 'Champions',
                date: '2021-11-07'
            },
        ]
    },
    {
        _id: '2',
        name: 'Double Trouble',
        logo: 'https://i.imgur.com/RbHMX3o.png',
        description: 'European esports organization based in the Germany. Known for their competitive playstyle.',
        games: ['Quake 3 Arena'],
        members: [
            { user: { _id: '6', username: 'Miroslav' }, role: 'Captain' },
            { user: { _id: '7', username: 'Kfresser' }, role: 'Member' },
            { user: { _id: '8', username: 'Tubylec' }, role: 'Member' },
            { user: { _id: '9', username: 'Shantu' }, role: 'Member' },
            { user: { _id: '10', username: 'Redrum' }, role: 'Member' }
        ],
        achievements: [
            {
                title: 'Unfreeze League 2024',
                description: 'Champions',
                date: '2024-07-21'
            }
        ]
    },
    {
        _id: '3',
        name: 'oKo',
        logo: 'https://i.imgur.com/Ko5VU3G.png',
        description: 'European esports organization. Known for having WhoAmi?! as their mascot.',
        games: ['Quake 3 Arena'],
        members: [
            { user: { _id: '11', username: 'cTh' }, role: 'Captain' },
            { user: { _id: '12', username: 'Magister' }, role: 'Member' },
            { user: { _id: '13', username: 'WhoAmi?!' }, role: 'Member' },
            { user: { _id: '14', username: 'cacahuete' }, role: 'Member' },
            { user: { _id: '15', username: 'Mango' }, role: 'Member' }
        ],
        achievements: [
            {
                title: 'Unfreeze League Winter 2022',
                description: 'Champions',
                date: '2022-04-02'
            }
        ]
    },
    {
        _id: '4',
        name: 'Agressive Shotting Squad',
        logo: 'https://i.imgur.com/1FyeVSn.png',
        description: 'European esports organization based in Poland. Known for their aggressive and entertaining playstyle.',
        games: ['Quake 3 Arena'],
        members: [
            { user: { _id: '16', username: 'RICKY!!' }, role: 'Captain' },
            { user: { _id: '17', username: 'W4LNUT' }, role: 'Member' },
            { user: { _id: '18', username: 'Ang3lfish' }, role: 'Member' },
            { user: { _id: '19', username: 'CLIFF' }, role: 'Member' },
            { user: { _id: '20', username: 'Ric0' }, role: 'Member' }
        ],
        achievements: [
            {
                title: 'Unfreeze League Spring 2024',
                description: 'Champions',
                date: '2024-02-12'
            }
        ]
    }
];

async function loadTeams() {
    try {
        // For demonstration, we'll use the example teams instead of making an API call
        const teams = exampleTeams;
        
        const teamsGrid = document.querySelector('.teams-grid');
        teamsGrid.innerHTML = teams.map(team => createTeamCard(team)).join('');

        // Add click event listeners to team cards
        document.querySelectorAll('.team-card').forEach(card => {
            card.addEventListener('click', () => showTeamDetails(card.getAttribute('data-team-id')));
        });
    } catch (error) {
        console.error('Error loading teams:', error);
        showNotification('Failed to load teams', 'error');
    }
}

async function loadGamesFilter() {
    try {
        const response = await fetch('http://localhost:5000/api/teams/games');
        const games = await response.json();
        
        const gameFilter = document.getElementById('game-filter');
        gameFilter.innerHTML = `
            <option value="">All Games</option>
            ${games.map(game => `<option value="${game}">${game}</option>`).join('')}
        `;
    } catch (error) {
        console.error('Error loading games filter:', error);
    }
}

function createTeamCard(team) {
    return `
        <div class="team-card" data-team-id="${team._id}">
            <div class="team-banner">
                <img src="${team.logo}" alt="${team.name}" class="team-logo-small">
            </div>
            <div class="team-content">
                <div class="team-header">
                    <h3 class="team-name">${team.name}</h3>
                </div>
                <div class="team-games">
                    ${team.games.map(game => `
                        <span class="game-tag">${game}</span>
                    `).join('')}
                </div>
                <p class="team-description">${team.description}</p>
                <div class="team-members">
                    ${team.members.slice(0, 5).map(member => `
                        <span class="member">${member.user.username}</span>
                    `).join(', ')}
                    ${team.members.length > 5 ? `<span>+${team.members.length - 5} more</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

async function showTeamDetails(teamId) {
    try {
        const team = exampleTeams.find(t => t._id === teamId);
        if (!team) {
            throw new Error('Team not found');
        }

        const modal = document.getElementById('team-modal');
        modal.setAttribute('data-team-id', teamId);

        // Update modal content
        modal.querySelector('.team-logo').src = team.logo;
        modal.querySelector('.team-name').textContent = team.name;
        modal.querySelector('.team-games').innerHTML = team.games.map(game => `
            <span class="game-tag">${game}</span>
        `).join('');
        modal.querySelector('.team-description').textContent = team.description;

        // Update achievements
        const achievementsList = modal.querySelector('.achievements-list');
        achievementsList.innerHTML = team.achievements.length ? team.achievements.map(achievement => `
            <div class="achievement-card">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
                <small>${new Date(achievement.date).toLocaleDateString()}</small>
            </div>
        `).join('') : '<p>No achievements yet</p>';

        // Update roster
        const rosterList = modal.querySelector('.roster-list');
        rosterList.innerHTML = team.members.map(member => `
            <div class="roster-member">
                <i class="fas ${member.role === 'Captain' ? 'fa-crown' : 'fa-user'}"></i>
                <span>${member.user.username}</span>
            </div>
        `).join('');

        // Update join button state
        const joinBtn = document.getElementById('join-team-btn');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            const userId = getUserIdFromToken(token);
            const isMember = team.members.some(member => member.user._id === userId);
            joinBtn.style.display = isMember ? 'none' : 'block';
        } else {
            joinBtn.style.display = 'none';
        }

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading team details:', error);
        showNotification('Failed to load team details', 'error');
    }
}

async function requestToJoinTeam(teamId) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        showNotification('Please log in to join a team', 'error');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/teams/${teamId}/join`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            showNotification('Join request sent successfully', 'success');
            document.getElementById('team-modal').style.display = 'none';
        } else {
            const data = await response.json();
            showNotification(data.message || 'Failed to send join request', 'error');
        }
    } catch (error) {
        console.error('Error requesting to join team:', error);
        showNotification('Failed to send join request', 'error');
    }
}

function filterTeams() {
    const searchTerm = document.getElementById('team-search').value.toLowerCase();
    const selectedGame = document.getElementById('game-filter').value.toLowerCase();
    
    document.querySelectorAll('.team-card').forEach(card => {
        const teamName = card.querySelector('.team-name').textContent.toLowerCase();
        const teamGames = Array.from(card.querySelectorAll('.game-tag'))
            .map(tag => tag.textContent.toLowerCase());
        
        const matchesSearch = teamName.includes(searchTerm);
        const matchesGame = !selectedGame || teamGames.includes(selectedGame);
        
        card.style.display = matchesSearch && matchesGame ? 'block' : 'none';
    });
}

function getUserIdFromToken(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
    } catch (error) {
        return null;
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
