document.addEventListener('DOMContentLoaded', function() {
    const teams = [
        'Fnatic', 'G2 Esports', 'Team Liquid', 'Cloud9', 'NaVi',
        'Astralis', 'Vitality', 'FaZe Clan', 'ENCE', 'BIG'
    ];

    const maps = [
        'Dust II', 'Mirage', 'Inferno', 'Nuke', 'Overpass',
        'Ancient', 'Vertigo', 'Anubis'
    ];

    const servers = [
        '192.168.1.100', '192.168.1.101', '192.168.1.102',
        '192.168.1.103', '192.168.1.104'
    ];

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomScore() {
        const scores = [[16, Math.floor(Math.random() * 14)], [Math.floor(Math.random() * 14), 16]];
        return getRandomElement(scores);
    }

    function generateRandomMatch() {
        // Get two different random teams
        let team1 = getRandomElement(teams);
        let team2;
        do {
            team2 = getRandomElement(teams);
        } while (team1 === team2);

        // Generate random maps and scores
        const matchMaps = [];
        const usedMaps = new Set();
        let team1Wins = 0;
        let team2Wins = 0;
        
        // Generate 3 different random maps
        while (matchMaps.length < 3) {
            const map = getRandomElement(maps);
            if (!usedMaps.has(map)) {
                const score = getRandomScore();
                const winner = score[0] > score[1] ? 1 : 2;
                if (winner === 1) team1Wins++;
                else team2Wins++;
                
                matchMaps.push({
                    name: map,
                    score: score,
                    winner: winner
                });
                usedMaps.add(map);
            }
        }

        // Generate random date within last 5 days
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 5));
        const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');

        return {
            date: date,
            time: `${hours}:${minutes}`,
            server: getRandomElement(servers),
            team1: team1,
            team2: team2,
            team1Wins: team1Wins,
            team2Wins: team2Wins,
            maps: matchMaps
        };
    }

    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function createMatchCard(match) {
        return `
            <div class="match-card">
                <div class="match-header">
                    <div class="match-date">
                        ${formatDate(match.date)} - ${match.time}
                    </div>
                    <div class="server-info">
                        <i class="fas fa-server"></i> ${match.server}
                    </div>
                </div>
                <div class="match-content">
                    <div class="team">
                        <div class="team-logo"></div>
                        <div class="team-name ${match.team1Wins > match.team2Wins ? 'winner' : 'loser'}">
                            ${match.team1}
                        </div>
                    </div>
                    <div class="match-score">
                        ${match.team1Wins} - ${match.team2Wins}
                    </div>
                    <div class="team">
                        <div class="team-logo"></div>
                        <div class="team-name ${match.team2Wins > match.team1Wins ? 'winner' : 'loser'}">
                            ${match.team2}
                        </div>
                    </div>
                </div>
                <div class="maps-info">
                    ${match.maps.map(map => `
                        <div class="map-result">
                            <span class="map-name">${map.name}</span>
                            <span class="map-score">${map.score[0]} - ${map.score[1]}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Generate and display 5 random matches
    const resultsContainer = document.querySelector('.results-container');
    for (let i = 0; i < 5; i++) {
        const match = generateRandomMatch();
        resultsContainer.innerHTML += createMatchCard(match);
    }
});
