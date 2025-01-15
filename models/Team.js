const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        default: 'default-team-logo.png'
    },
    description: {
        type: String,
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['Captain', 'Member'],
            default: 'Member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    games: [{
        type: String
    }],
    achievements: [{
        title: String,
        date: Date,
        description: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', teamSchema);
