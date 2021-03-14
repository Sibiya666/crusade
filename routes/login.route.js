const { Router } = require("express");

const LoginController = require("../controllers/login.controller");
const { registrationValidators, authValidators } = require("../utils/validators");

const router = Router();

/**
 * GET REQUEST
 */
router.get("/", (req, res) => {
  res.render("auth/login", {
    isLogin: true,
    isAuth: true,
    errorAuth: req.flash("errorAuth"),
    errorReg: req.flash("errorReg"),
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login#auth");
  });
});

router.get("/reset", (req, res) => {
  res.render("auth/reset", {
    isLogin: true,
    error: req.flash("error"),
  });
});

router.get("/password", LoginController.recoveryPassword);
router.get("/reset/:token", LoginController.recoveryPassword);

/**
 * POST REQUEST
 */
router.post("/auth", authValidators, LoginController.auth);
router.post(
  "/registration",
  registrationValidators,
  LoginController.registration
);
router.post("/reset", LoginController.resetPassword);
router.post("/password", LoginController.setPassword);

module.exports = router;
