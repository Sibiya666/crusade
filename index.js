const exppress = require('express');
const Handlebars = require('handlebars')
const expressHbs = require('express-handlebars');
const session = require('express-session')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);
const varMiddlevare = require('./middleware/var');
const inqvisitorMiddlevare = require('./middleware/inqvisitor');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const platoonRoutes = require('./routes/platoon');
const recruitRoutes = require('./routes/recruit');
const crusadeRoutes = require('./routes/crusade');
const loginRoutes = require('./routes/login');

const Inqvisitor = require('./models/inqvisitor');

const PORT = process.env.PORT || 3000;
const DB_URL = 'mongodb+srv://sibiya666:ckFRrZV33Dck1G2u@cluster0.bg7mz.mongodb.net/spacemarine?retryWrites=true&w=majority';

const app = exppress();
const hbs = expressHbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const mongoSessionStore = new MongoStore({
    uri: DB_URL,
    collection: 'session',
})

async function start() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        app.listen(PORT, () => {
            console.log(`Server is runnig on ${PORT} port`)
        });
    } catch (e) {
        console.log(e)
    }
};

app.engine('hbs', hbs);
app.set('view engine', 'hbs');

app.use(exppress.static(path.join(__dirname, 'public')));
app.use(exppress.urlencoded({ extended: false }));
app.use(session({
    secret: 'someSecret',
    resave: false,
    saveUninitialized: true,
    store: mongoSessionStore
}));
app.use(varMiddlevare);
app.use(inqvisitorMiddlevare)

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/platoon', platoonRoutes);
app.use('/recruit', recruitRoutes);
app.use('/crusade', crusadeRoutes);
app.use('/login', loginRoutes);

start();

async function userConect() {
    try {
        const candidate = await Inqvisitor.findOne();

        if (candidate) {
            return;
        }

        inqvisitor.save();

    } catch (e) {
        console.log(e)
    }
}
