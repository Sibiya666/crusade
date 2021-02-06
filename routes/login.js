const { Router } = require("express");
const bcrypt = require("bcrypt");
const Inquisitor = require("../models/inquisitor");

const router = Router();
const SALT_LENGTH = 10;

router.get("/", (req, res) => {
  res.render("login", {
    isLogin: true,
    errorAuth: req.flash("errorAuth"),
    errorReg: req.flash("errorReg"),
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login#auth");
  });
});

router.post("/auth", async (req, res) => {
  await userConect(req, res);
});

router.post("/registration", async (req, res) => {
  const { login, name, password, repeatPassword, email } = req.body;

  if (await Inquisitor.findOne({ email })) {
    req.flash("errorReg", "This inquisitor exist");
    res.redirect("/login#registration");
  } else if (password !== repeatPassword) {
    req.flash("errorReg", "Password do not match");
    res.redirect("/login#registration");
  } else {
    const inquisitor = new Inquisitor({
      login,
      name,
      email,
      password: await bcrypt.hash(password, SALT_LENGTH),
      recruit: { items: [] },
    });
    await inquisitor.save();
    res.redirect("/login#registration");
  }
});

async function userConect(req, res) {
  try {
    const { login, password } = req.body;
    const candidate = await Inquisitor.findOne({ login });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      checkAreSame(areSame, req, res);
    } else {
      req.flash("errorAuth", "User is not found");
      res.redirect("/login#auth");
    }
  } catch (e) {
    console.log(e);
  }
}

function checkAreSame(areSame, req, res) {
  if (areSame) {
    req.session.inquisitor = candidate;
    req.session.isAuth = true;
    req.session.save((err) => {
      if (err) {
        throw Error();
      }
      res.redirect("/");
    });
  } else {
    req.flash("errorAuth", "Passowrd do not match");
    res.redirect("/login#auth");
  }
}

module.exports = router;
