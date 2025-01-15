const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Topic = require('../models/Topic');
const Reply = require('../models/Reply');
const auth = require('../middleware/auth');

// Get all topics with pagination
router.get('/topics', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;

        const query = category ? { category } : {};

        const topics = await Topic.find(query)
            .populate('author', 'username avatar')
            .populate('lastPost.user', 'username')
            .sort({ isSticky: -1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const total = await Topic.countDocuments(query);

        res.json({
            topics,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalTopics: total
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new topic
router.post('/topics', [auth, [
    body('title').trim().isLength({ min: 3, max: 100 }).escape(),
    body('content').trim().isLength({ min: 10 }).escape(),
    body('category').isIn(['general', 'tournaments', 'technical'])
]], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, category, tags } = req.body;

        const topic = new Topic({
            title,
            content,
            category,
            author: req.user.userId,
            tags,
            lastPost: {
                user: req.user.userId,
                date: Date.now()
            }
        });

        await topic.save();

        const populatedTopic = await Topic.findById(topic._id)
            .populate('author', 'username avatar')
            .populate('lastPost.user', 'username');

        res.json(populatedTopic);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single topic with replies
router.get('/topics/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)
            .populate('author', 'username avatar')
            .populate('lastPost.user', 'username');

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Increment view count
        topic.views += 1;
        await topic.save();

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const replies = await Reply.find({ topic: req.params.id })
            .populate('author', 'username avatar')
            .populate('quotedReply')
            .sort({ createdAt: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalReplies = await Reply.countDocuments({ topic: req.params.id });

        res.json({
            topic,
            replies,
            currentPage: page,
            totalPages: Math.ceil(totalReplies / limit),
            totalReplies
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create reply
router.post('/topics/:id/replies', [auth, [
    body('content').trim().isLength({ min: 1 }).escape()
]], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const topic = await Topic.findById(req.params.id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        if (topic.isLocked) {
            return res.status(403).json({ message: 'Topic is locked' });
        }

        const { content, quotedReplyId } = req.body;

        const reply = new Reply({
            topic: req.params.id,
            author: req.user.userId,
            content,
            quotedReply: quotedReplyId
        });

        await reply.save();

        const populatedReply = await Reply.findById(reply._id)
            .populate('author', 'username avatar')
            .populate('quotedReply');

        res.json(populatedReply);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Like/Unlike reply
router.post('/replies/:id/like', auth, async (req, res) => {
    try {
        const reply = await Reply.findById(req.params.id);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        const likeIndex = reply.likes.indexOf(req.user.userId);
        if (likeIndex > -1) {
            reply.likes.splice(likeIndex, 1);
        } else {
            reply.likes.push(req.user.userId);
        }

        await reply.save();
        res.json(reply);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
