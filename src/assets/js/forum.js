import config from './config.js';

// Forum functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const newTopicBtn = document.getElementById('newTopicBtn');
    const newTopicModal = document.getElementById('newTopicModal');
    const closeModalBtn = document.getElementById('closeModal');
    const newTopicForm = document.getElementById('newTopicForm');
    const topicsContainer = document.querySelector('.forum-categories');

    // Check if user is logged in
    function isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    // Get auth token
    function getToken() {
        return localStorage.getItem('token');
    }

    // Show/Hide modal
    function toggleModal(show = true) {
        newTopicModal.style.display = show ? 'flex' : 'none';
    }

    // Load topics from API
    async function loadTopics() {
        try {
            const response = await fetch(`${config.API_URL}/forum/topics`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message);
            }

            // Clear existing topics
            const topicsLists = document.querySelectorAll('.topics-list');
            topicsLists.forEach(list => {
                list.innerHTML = '';
            });

            // Add topics to their respective categories
            data.topics.forEach(topic => {
                addTopicToDOM(topic);
            });
        } catch (error) {
            console.error('Error loading topics:', error);
            showError('Failed to load topics. Please try again later.');
        }
    }

    // Create new topic
    async function createTopic(formData) {
        try {
            const response = await fetch(`${config.API_URL}/forum/topics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': getToken()
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create topic');
            }

            // Add new topic to DOM
            addTopicToDOM(data);
            
            // Clear form and close modal
            newTopicForm.reset();
            toggleModal(false);
            
            showSuccess('Topic created successfully!');
        } catch (error) {
            console.error('Error creating topic:', error);
            showError(error.message);
        }
    }

    // Add topic to DOM
    function addTopicToDOM(topicData) {
        const categorySection = document.querySelector(`[data-category="${topicData.category}"]`);
        if (!categorySection) return;

        const topicsList = categorySection.querySelector('.topics-list');
        const topicElement = document.createElement('div');
        topicElement.className = 'topic';
        
        const timeAgo = getTimeAgo(new Date(topicData.createdAt));

        topicElement.innerHTML = `
            <div class="topic-info">
                <div class="topic-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="topic-content">
                    <a href="/topic/${topicData._id}" class="topic-title">${topicData.title}</a>
                    <div class="topic-meta">
                        Started by <span class="author">${topicData.author.username}</span> • ${timeAgo}
                    </div>
                </div>
            </div>
            <div class="topic-stats">
                <span class="stats-number">${topicData.replyCount || 0}</span>
                <span class="stats-label">Replies</span>
            </div>
            <div class="last-post">
                <span class="last-post-user">${topicData.lastPost.user.username}</span>
                <span class="last-post-time">${getTimeAgo(new Date(topicData.lastPost.date))}</span>
            </div>
        `;

        topicsList.insertBefore(topicElement, topicsList.firstChild);
    }

    // Event Listeners
    newTopicBtn.addEventListener('click', () => {
        if (!isLoggedIn()) {
            showError('Please log in to create a new topic');
            return;
        }
        toggleModal(true);
    });

    closeModalBtn.addEventListener('click', () => {
        toggleModal(false);
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === newTopicModal) {
            toggleModal(false);
        }
    });

    // Handle new topic submission
    newTopicForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!isLoggedIn()) {
            showError('Please log in to create a new topic');
            return;
        }

        const formData = {
            category: document.getElementById('topicCategory').value,
            title: document.getElementById('topicTitle').value,
            content: document.getElementById('topicContent').value
        };

        await createTopic(formData);
    });

    // Helper function to format time ago
    function getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' years ago';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' months ago';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' days ago';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' hours ago';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutes ago';
        
        return Math.floor(seconds) + ' seconds ago';
    }

    // Show error message
    function showError(message) {
        // You can implement your preferred way of showing errors
        alert(message);
    }

    // Show success message
    function showSuccess(message) {
        // You can implement your preferred way of showing success messages
        alert(message);
    }

    // Initialize
    loadTopics();
});
