const exppress = require('express');
const session = require('express-session');

const Handlebars = require('handlebars');
const expressHbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);

const varMiddlevare = require('./middleware/var');
const inquisitorMiddlevare = require('./middleware/inquisitor');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const platoonRoutes = require('./routes/platoon');
const recruitRoutes = require('./routes/recruit');
const crusadeRoutes = require('./routes/crusade');
const loginRoutes = require('./routes/login');

const PORT = process.env.PORT || 3000;
const DB_URL = 'mongodb+srv://sibiya666:ckFRrZV33Dck1G2u@cluster0.bg7mz.mongodb.net/spacemarine?retryWrites=true&w=majority';

const hbs = expressHbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const mongoSessionStore = new MongoStore({
    uri: DB_URL,
    collection: 'session',
})

const app = exppress();

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
app.use(csrf());
app.use(flash());
app.use(varMiddlevare);
app.use(inquisitorMiddlevare)

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/platoon', platoonRoutes);
app.use('/recruit', recruitRoutes);
app.use('/crusade', crusadeRoutes);
app.use('/login', loginRoutes);

start();

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