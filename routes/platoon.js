const { Router } = require('express');
const Spacemarine = require('../models/spacemarine');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', async (req, res) => {
    const platoonList = await Spacemarine.find();

    res.render('platoon', {
        isPlatoon: true,
        platoonList
    })
});

router.get('/:id', async (req, res) => {
    const spacemarine = await Spacemarine.findById(req.params.id);
    res.render('spacemarine', {
        title: spacemarine.name,
        isPlatoon: true,
        spacemarine
    })
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const spacemarine = await Spacemarine.findById(req.params.id);
    res.render('spacemarine-workout', {
        title: `Trening ${spacemarine.name}`,
        isPlatoon: true,
        spacemarine
    })
})

router.post('/edit', auth, async (req, res) => {
    const { name, photo, id, platoonId, cost } = req.body;

    try {
        await Spacemarine.findByIdAndUpdate(id, { name, photo, platoonId, cost });
        res.redirect('/');
    } catch (e) {
        console.log(e)
    }
})

router.post('/remove', auth, async (req, res) => {
    try {
        await Spacemarine.deleteOne({ _id: req.body.id });
        res.redirect('platoon');
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;