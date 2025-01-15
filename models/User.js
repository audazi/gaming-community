const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    teams: [{
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        role: {
            type: String,
            enum: ['Captain', 'Member'],
            default: 'Member'
        }
    }],
    bio: {
        type: String,
        default: ''
    },
    socialLinks: {
        twitter: String,
        discord: String,
        twitch: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', userSchema);
