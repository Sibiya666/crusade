const exppress = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const platoonRoutes = require('./routes/platoon');
const recruitRoutes = require('./routes/recruit');

const PORT = process.env.PORT || 3000;

const app = exppress();
const hbs = expressHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(exppress.static(path.join(__dirname, 'public')));
app.use(exppress.urlencoded({ extended: false }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/platoon', platoonRoutes);
app.use('/recruit', recruitRoutes)

app.listen(PORT, () => {
    console.log(`Server is runnig on ${PORT} port`)
});


