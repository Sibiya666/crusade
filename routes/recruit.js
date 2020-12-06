const { Router } = require('express');
const Spacemarine = require('../models/spacemarine')
const router = Router();

router.get('/', async (req, res) => {
    const order = await Recruit.fetch();

    res.render('recruit', {
        title: 'Recruit',
        isRecruit: true,
        order
    })
});


router.post('/add', async (req, res) => {
    const spacemarine = await Spacemarine.findById(req.body.id);
    await Recruit.add(spacemarine);

    res.redirect('/recruit');
});

router.delete('/remove/:id', async (req, res) => {
    const order = await Recruit.remove(req.params.id);
    
    res.status(200).json(order);
})

module.exports = router;
