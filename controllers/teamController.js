const Team = require('../models/Team');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure multer for team logo uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/teams');
    },
    filename: function(req, file, cb) {
        cb(null, `team-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}).single('logo');

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find()
            .populate('captain', 'username')
            .populate('members.user', 'username');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single team
exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
            .populate('captain', 'username')
            .populate('members.user', 'username');
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create team
exports.createTeam = async (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { name, description, games } = req.body;
            const logo = req.file ? `/uploads/teams/${req.file.filename}` : null;

            const team = new Team({
                name,
                description,
                games: games.split(',').map(game => game.trim()),
                logo,
                captain: req.user._id,
                members: [{
                    user: req.user._id,
                    role: 'Captain'
                }]
            });

            await team.save();

            // Update user's teams
            await User.findByIdAndUpdate(req.user._id, {
                $push: { teams: { team: team._id, role: 'Captain' } }
            });

            res.status(201).json(team);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// Update team
exports.updateTeam = async (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const team = await Team.findById(req.params.id);
            
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }

            // Check if user is captain
            if (team.captain.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Only team captain can update team' });
            }

            const updates = req.body;
            if (req.file) {
                updates.logo = `/uploads/teams/${req.file.filename}`;
            }
            if (updates.games) {
                updates.games = updates.games.split(',').map(game => game.trim());
            }

            const updatedTeam = await Team.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true }
            ).populate('captain members.user', 'username');

            res.json(updatedTeam);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// Delete team
exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Check if user is captain
        if (team.captain.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only team captain can delete team' });
        }

        // Remove team from all members' teams array
        await User.updateMany(
            { 'teams.team': team._id },
            { $pull: { teams: { team: team._id } } }
        );

        await team.remove();
        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Request to join team
exports.requestToJoin = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Check if user is already a member
        if (team.members.some(member => member.user.toString() === req.user._id.toString())) {
            return res.status(400).json({ message: 'Already a member of this team' });
        }

        // Add user to team members
        team.members.push({
            user: req.user._id,
            role: 'Member'
        });

        await team.save();

        // Add team to user's teams
        await User.findByIdAndUpdate(req.user._id, {
            $push: { teams: { team: team._id, role: 'Member' } }
        });

        res.json({ message: 'Successfully joined team' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove member from team
exports.removeMember = async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId);
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Check if user is captain or the member being removed
        if (team.captain.toString() !== req.user._id.toString() && 
            req.params.userId !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to remove member' });
        }

        // Remove member from team
        await Team.findByIdAndUpdate(req.params.teamId, {
            $pull: { members: { user: req.params.userId } }
        });

        // Remove team from user's teams
        await User.findByIdAndUpdate(req.params.userId, {
            $pull: { teams: { team: req.params.teamId } }
        });

        res.json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Team.distinct('games');
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add achievement
exports.addAchievement = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Check if user is captain
        if (team.captain.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only team captain can add achievements' });
        }

        team.achievements.push(req.body);
        await team.save();

        res.json(team.achievements);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
