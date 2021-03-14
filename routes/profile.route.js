const { Router } = require('express');
const authMiddlevare = require('../middleware/auth');
const Profile = require('../controllers/profile.controller');

const router = Router();

router.get('/', authMiddlevare, Profile.get);
router.post('/', authMiddlevare, Profile.post)

module.exports = router;