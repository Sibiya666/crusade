const { Router } = require('express');
const fs = require('fs').f
const router = Router();
const Spacemarine = require('../models/spacemarine');

router.get('/', async (req, res) => {
    const platoonList = await Spacemarine.getAll();

    res.render('platoon', {
        isPlatoon: true,
        platoonList
    })
});

router.get('/:id', async (req, res) => {
    const spacemarine = await Spacemarine.getById(req.params.id);
    res.render('spacemarine', {
        title: spacemarine.name,
        isPlatoon: true,
        spacemarine
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const spacemarine = await Spacemarine.getById(req.params.id);
    res.render('spacemarine-workout', {
        title: `Trening ${spacemarine.name}`,
        isPlatoon: true,
        spacemarine
    })
})

router.post('/edit', async (req, res) => {
    const { name, photo, id, platoon } = req.body;

    await Spacemarine.update(name, photo, id, platoon);
    
    res.render('/', {
        isPlatoon: true,
        platoonList
    })
})

module.exports = router;