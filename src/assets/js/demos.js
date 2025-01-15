document.addEventListener('DOMContentLoaded', function() {
    // Sample data for demos
    const demoMatches = [
        {
            team1: 'Fnatic',
            team2: 'G2 Esports',
            pov: 'broky',
            level: 'pro',
            date: '2025-01-14',
            demoUrl: '#demo1'
        },
        {
            team1: 'Team Liquid',
            team2: 'Cloud9',
            pov: 'NAF',
            level: 'pro',
            date: '2025-01-13',
            demoUrl: '#demo2'
        },
        {
            team1: 'NaVi',
            team2: 'Astralis',
            pov: 's1mple',
            level: 'pro',
            date: '2025-01-12',
            demoUrl: '#demo3'
        },
        {
            team1: 'Vitality',
            team2: 'FaZe Clan',
            pov: 'ZywOo',
            level: 'pro',
            date: '2025-01-11',
            demoUrl: '#demo4'
        },
        {
            team1: 'ENCE',
            team2: 'BIG',
            pov: 'dycha',
            level: 'high',
            date: '2025-01-10',
            demoUrl: '#demo5'
        },
        {
            team1: 'OG',
            team2: 'Complexity',
            pov: 'flameZ',
            level: 'high',
            date: '2025-01-09',
            demoUrl: '#demo6'
        },
        {
            team1: 'Mouz',
            team2: 'Spirit',
            pov: 'frozen',
            level: 'high',
            date: '2025-01-08',
            demoUrl: '#demo7'
        },
        {
            team1: 'Heroic',
            team2: 'FURIA',
            pov: 'cadiaN',
            level: 'high',
            date: '2025-01-07',
            demoUrl: '#demo8'
        },
        {
            team1: 'Virtus.pro',
            team2: 'Gambit',
            pov: 'Jame',
            level: 'high',
            date: '2025-01-06',
            demoUrl: '#demo9'
        },
        {
            team1: 'Evil Geniuses',
            team2: 'Team One',
            pov: 'autimatic',
            level: 'medium',
            date: '2025-01-05',
            demoUrl: '#demo10'
        },
        {
            team1: 'MIBR',
            team2: 'paiN',
            pov: 'exit',
            level: 'medium',
            date: '2025-01-04',
            demoUrl: '#demo11'
        },
        {
            team1: '9z',
            team2: 'Imperial',
            pov: 'max',
            level: 'medium',
            date: '2025-01-03',
            demoUrl: '#demo12'
        },
        {
            team1: 'Endpoint',
            team2: 'ECSTATIC',
            pov: 'CRUC1AL',
            level: 'medium',
            date: '2025-01-02',
            demoUrl: '#demo13'
        },
        {
            team1: 'Sprout',
            team2: 'Sangal',
            pov: 'slaxz',
            level: 'medium',
            date: '2025-01-01',
            demoUrl: '#demo14'
        },
        {
            team1: 'AGO',
            team2: 'SKADE',
            pov: 'F1KU',
            level: 'medium',
            date: '2024-12-31',
            demoUrl: '#demo15'
        },
        {
            team1: 'Fnatic',
            team2: 'NaVi',
            pov: 'rain',
            level: 'pro',
            date: '2024-12-30',
            demoUrl: '#demo16'
        },
        {
            team1: 'G2 Esports',
            team2: 'Vitality',
            pov: 'NiKo',
            level: 'pro',
            date: '2024-12-29',
            demoUrl: '#demo17'
        },
        {
            team1: 'Cloud9',
            team2: 'ENCE',
            pov: 'sh1ro',
            level: 'pro',
            date: '2024-12-28',
            demoUrl: '#demo18'
        },
        {
            team1: 'FaZe Clan',
            team2: 'Astralis',
            pov: 'karrigan',
            level: 'pro',
            date: '2024-12-27',
            demoUrl: '#demo19'
        },
        {
            team1: 'Team Liquid',
            team2: 'BIG',
            pov: 'EliGE',
            level: 'pro',
            date: '2024-12-26',
            demoUrl: '#demo20'
        }
    ];

    const tableBody = document.getElementById('demosTableBody');
    const searchInput = document.getElementById('searchInput');
    const levelFilter = document.getElementById('levelFilter');
    const dateFilter = document.getElementById('dateFilter');

    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Create table row for a demo match
    function createDemoRow(demo) {
        return `
            <tr>
                <td>
                    <div class="team-names">
                        <span>${demo.team1}</span>
                        <span class="team-vs">vs</span>
                        <span>${demo.team2}</span>
                    </div>
                </td>
                <td>
                    <span class="pov-player">${demo.pov}</span>
                </td>
                <td>
                    <span class="level-badge level-${demo.level.toLowerCase()}">${demo.level}</span>
                </td>
                <td>${formatDate(demo.date)}</td>
                <td>
                    <a href="${demo.demoUrl}" class="download-button">
                        <i class="fas fa-download"></i>
                        Download
                    </a>
                </td>
            </tr>
        `;
    }

    // Filter demos based on search and filters
    function filterDemos() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLevel = levelFilter.value.toLowerCase();
        const selectedDate = dateFilter.value;

        const filteredDemos = demoMatches.filter(demo => {
            const matchesSearch = 
                demo.team1.toLowerCase().includes(searchTerm) ||
                demo.team2.toLowerCase().includes(searchTerm) ||
                demo.pov.toLowerCase().includes(searchTerm);
            
            const matchesLevel = !selectedLevel || demo.level === selectedLevel;
            const matchesDate = !selectedDate || demo.date === selectedDate;

            return matchesSearch && matchesLevel && matchesDate;
        });

        // Update table with filtered demos
        tableBody.innerHTML = filteredDemos.map(demo => createDemoRow(demo)).join('');
    }

    // Add event listeners for filters
    searchInput.addEventListener('input', filterDemos);
    levelFilter.addEventListener('change', filterDemos);
    dateFilter.addEventListener('change', filterDemos);

    // Initial table population
    filterDemos();
});
