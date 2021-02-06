const { Router } = require('express');
const Spacemarine = require('../models/spacemarine');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'ADD',
        isAdd: true
    });
});

router.post('/', auth, async (req, res) => {
    const { name, platoonId, photo, cost } = req.body
    const spacemarine = new Spacemarine({ name, platoonId, photo, cost, inquisitorId: req.inquisitor });

    try {
        await spacemarine.save();
        res.redirect('/');

    } catch (e) {
        console.log(e)
    }
});

module.exports = router;