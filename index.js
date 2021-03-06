const exppress = require("express");
const session = require("express-session");

const Handlebars = require("handlebars");
const expressHbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const hbsHelpers = require("./utils/hbs");

const path = require("path");
const csrf = require("csurf");
const compression = require("compression");
const flash = require("connect-flash");
const helmet = require("helmet");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongodb-session")(session);

const varMiddlevare = require("./middleware/var");
const inquisitorMiddlevare = require("./middleware/inquisitor");
const pageNotFoundMiddlevare = require("./middleware/404");
const multerMiddlevare = require("./middleware/file");

const homeRoutes = require("./routes/home.route");
const addRoutes = require("./routes/add.route");
const platoonRoutes = require("./routes/platoon.route");
const recruitRoutes = require("./routes/recruit.route");
const crusadeRoutes = require("./routes/crusade.route");
const loginRoutes = require("./routes/login.route");
const profileRoutes = require("./routes/profile.route");

const KEYS = require("./keys");

const PORT = process.env.PORT || 3000;

const hbs = expressHbs({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: hbsHelpers,
});

const mongoSessionStore = new MongoStore({
  uri: KEYS.DB_URI,
  collection: "session",
});

const app = exppress();

app.engine("hbs", hbs);
app.set("view engine", "hbs");

app.use(exppress.static(path.join(__dirname, "public")));
app.use(exppress.static(path.join(__dirname, "assets")));
app.use(exppress.urlencoded({ extended: false }));
app.use(
  session({
    secret: KEYS.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoSessionStore,
  })
);
app.use(multerMiddlevare.single("avatar"));
app.use(csrf());
app.use(flash());
app.use(helmet());
app.use(compression());
app.use(varMiddlevare);
app.use(inquisitorMiddlevare);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/crusade", crusadeRoutes);
app.use("/login", loginRoutes);
app.use("/platoon", platoonRoutes);
app.use("/profile", profileRoutes);
app.use("/recruit", recruitRoutes);

app.use(pageNotFoundMiddlevare);

start();

async function start() {
  try {
    await mongoose.connect(KEYS.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => {
      console.warn(`Server is runnig on ${PORT} port`);
    });
  } catch (e) {
    console.warn(e);
  }
}
