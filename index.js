const exppress = require('express');
const Handlebars = require('handlebars')
const expressHbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require('path');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const platoonRoutes = require('./routes/platoon');
const recruitRoutes = require('./routes/recruit');

const Incvisitor = require('./models/incvisitor');


const PORT = process.env.PORT || 3000;
const DB_URL = 'mongodb+srv://sibiya666:ckFRrZV33Dck1G2u@cluster0.bg7mz.mongodb.net/spacemarine?retryWrites=true&w=majority';

const app = exppress();
const hbs = expressHbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})


async function start() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        userConect();

        app.listen(PORT, () => {
            console.log(`Server is runnig on ${PORT} port`)
        });
    } catch (e) {
        console.log(e)
    }
};

app.engine('hbs', hbs);
app.set('view engine', 'hbs');

app.use(addIncvisitorToReq);

app.use(exppress.static(path.join(__dirname, 'public')));
app.use(exppress.urlencoded({ extended: false }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/platoon', platoonRoutes);
app.use('/recruit', recruitRoutes)

start();


async function userConect() {
    try {
        const candidate = await Incvisitor.findOne();

        if (candidate) {
            return;
        }

        const incvisitor = new Incvisitor({
            email: 'pipin@mail.ru',
            name: 'Pipin',
            recruit: { items: [] }
        });

        incvisitor.save();

    } catch (e) {
        console.log(e)
    }

}

async function addIncvisitorToReq(req, res, next) {
    try {
        const incvisitor = await Incvisitor.findById('5fc92d65c40b9503846eccd5');
        req.incvisitor = incvisitor;
        next();
    } catch (e) {
        console.log(e)
    }
}