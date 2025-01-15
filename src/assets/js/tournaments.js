document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.tournament-nav-button');
    const tournamentContent = document.querySelector('.tournament-content');

    // Content for each section
    const sections = {
        'Team Signup': `
            <h2>Team Signup</h2>
            <p>Register your team for upcoming tournaments.</p>
            <form id="team-signup-form" class="tournament-form">
                <div class="form-group">
                    <label for="team-name">Team Name</label>
                    <input type="text" id="team-name" required>
                </div>
                <div class="form-group">
                    <label for="team-captain">Team Captain</label>
                    <input type="text" id="team-captain" required>
                </div>
                <div class="form-group">
                    <label for="team-members">Team Members (comma-separated)</label>
                    <input type="text" id="team-members" required>
                </div>
                <button type="submit" class="submit-button">Register Team</button>
            </form>
        `,
        'Participants': `
            <h2>Participants</h2>
            <div class="participants-list">
                <p>List of registered teams will appear here.</p>
                <!-- Participant list will be dynamically populated -->
            </div>
        `,
        'Groups': `
            <h2>Tournament Groups</h2>
            <div class="groups-container">
                <p>Tournament groups and brackets will be displayed here.</p>
                <!-- Groups will be dynamically populated -->
            </div>
        `,
        'Schedule': `
            <h2>Tournament Schedule</h2>
            <div class="schedule-container">
                <p>Match schedule and timings will be displayed here.</p>
                <!-- Schedule will be dynamically populated -->
            </div>
        `,
        'Results': `
            <h2>Tournament Results</h2>
            <div class="results-container">
                <p>Tournament results and standings will be displayed here.</p>
                <!-- Results will be dynamically populated -->
            </div>
        `
    };

    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update content based on button text
            const sectionName = button.textContent.trim();
            tournamentContent.innerHTML = sections[sectionName] || 'Content not found';
        });
    });

    // Handle team signup form submission
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'team-signup-form') {
            e.preventDefault();
            
            // Get form data
            const teamName = document.getElementById('team-name').value;
            const teamCaptain = document.getElementById('team-captain').value;
            const teamMembers = document.getElementById('team-members').value.split(',').map(member => member.trim());

            // Here you would typically send this data to your backend
            console.log('Team Registration:', {
                teamName,
                teamCaptain,
                teamMembers
            });

            // Show success message
            alert('Team registration submitted successfully!');
            e.target.reset();
        }
    });
});
