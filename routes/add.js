const { Router } = require('express');
const Spacemarine = require('../models/spacemarine');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'ADD',
        isAdd: true
    });
});

router.post('/', (req, res) => {
    const { name, platoonId, photo, cost } = req.body
    const spacemarine = new Spacemarine(name, platoonId, photo, cost);
    
    spacemarine.save();
    res.redirect('/');
});

module.exports = router;