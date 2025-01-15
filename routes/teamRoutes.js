const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAllTeams);
router.get('/games', teamController.getAllGames);
router.get('/:id', teamController.getTeam);

// Protected routes
router.post('/', auth, teamController.createTeam);
router.put('/:id', auth, teamController.updateTeam);
router.delete('/:id', auth, teamController.deleteTeam);
router.post('/:id/join', auth, teamController.requestToJoin);
router.delete('/:teamId/members/:userId', auth, teamController.removeMember);
router.post('/:id/achievements', auth, teamController.addAchievement);

module.exports = router;
