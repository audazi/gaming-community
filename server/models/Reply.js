const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isEdited: {
        type: Boolean,
        default: false
    },
    editedAt: {
        type: Date
    },
    quotedReply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }
}, {
    timestamps: true
});

// Update topic's lastPost when a reply is created
replySchema.post('save', async function(doc) {
    const Topic = mongoose.model('Topic');
    await Topic.findByIdAndUpdate(doc.topic, {
        lastPost: {
            user: doc.author,
            date: doc.createdAt
        }
    });
});

module.exports = mongoose.model('Reply', replySchema);
