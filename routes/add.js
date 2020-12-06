const { Router } = require('express');
const Spacemarine = require('../models/spacemarine');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'ADD',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const { name, platoonId, photo, cost } = req.body
    const spacemarine = new Spacemarine({ name, platoonId, photo, cost, incvisitorId: req.incvisitor });

    try {
        await spacemarine.save();
        res.redirect('/');

    } catch (e) {
        console.log(e)
    }
});

module.exports = router;