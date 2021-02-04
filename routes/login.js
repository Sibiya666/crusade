const { Router } =  require('express');
const Inqvisitor = require('../models/inqvisitor');

const router = Router();

router.get('/', (req, res) => {
    res.render('login', {
        isLogin: true,
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login#auth');
    });
});

router.post('/auth', async (req, res) => {
    req.session.inqvisitor = await Inqvisitor.findById('5fccae0e256d4523e0cb0eaf')
    req.session.isAuth = true;

    req.session.save((err) => {
        if (err) {
            throw Error()
        }

        if(req.session.isAuth) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
});

router.post('/registration', async (req, res) => {
    const { login, name, password, repeatPassword, email } = req.body;
    
    if (await Inqvisitor.findOne({email})) {
        res.redirect('/login#registration')
    } else {
        const inqvisitor = new Inqvisitor({login, name, email, password, recruit:  { items: [] }});
        await inqvisitor.save();
        res.redirect('/login#auth')
    }
    // new 
});

module.exports = router;