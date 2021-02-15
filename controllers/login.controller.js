const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendGridTransporter = require("nodemailer-sendgrid-transport");

const Inquisitor = require("../models/inquisitor");
const KEYS = require("../keys");

const emailTemplate = require("../email/registration");
const emailResetPasswordTemplate = require("../email/reset-password");

const SALT_LENGTH = 10;
const TOKEN_LIENGTH = 32;
const ONE_HORSE = 60 * 60 * 1000;

const mailer = nodemailer.createTransport(
  sendGridTransporter({
    auth: {
      api_key: KEYS.SEND_GRID_API,
    },
  })
);

class LoginController {
  static async registration(req, res) {
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

      mailer.sendMail(emailTemplate(email), (err, res) => {
        if (err) {
          console.warn(err);
        }
        console.warn(res);
      });

      res.redirect("/login#auth");
    }
  }

  static async auth(req, res) {
    try {
      const { login, password } = req.body;
      const candidate = await Inquisitor.findOne({ login });

      if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password);
        checkAreSame(areSame, req, res, candidate);
      } else {
        req.flash("errorAuth", "User is not found");
        res.redirect("/login#auth");
      }
    } catch (e) {
      console.warn(e);
    }
  }

  static resetPassword(req, res) {
    try {
      crypto.randomBytes(TOKEN_LIENGTH, async (err, buffer) => {
        if (err) {
          req.flash("error", "Something went wrong. Try later");
          return req.redirect("/reset");
        }

        const email = req.body.email;
        const candidate = await Inquisitor.findOne({ email });
        const token = buffer.toString("hex");

        if (candidate) {
          candidate.resetPasswordToken = token;
          candidate.resetPasswordTokenExparation = new Date() + ONE_HORSE;
          await candidate.save();

          mailer.sendMail(
            emailResetPasswordTemplate(email, token),
            (err, res) => {
              console.log(err ? err : res);
            }
          );

          res.redirect("/login#auth");
        } else {
          req.flash("error", "Inquisitor with this passord dont find.");
          res.redirect("/login/reset");
        }
      });
    } catch (e) {
      console.warn(e);
    }
  }

  static async recoveryPassword(req, res) {
    const token = req.params.token;

    if (!token) {
      return redirect("/login#auth");
    }

    try {
      const candidate = await Inquisitor.findOne({
        resetPasswordToken: token,
      });

      if (candidate) {
        res.render("auth/password", {
          isLogin: true,
          error: req.flash("error"),
          inqusitorId: candidate._id.toString(),
          token,
        });
      } else {
        return res.redirect("/login#auth");
      }
    } catch (e) {
      console.warn(e);
    }
  }

  static async setPassword(req, res) {
    try {
      const { token, password } = req.body;
      const candidate = await Inquisitor.findOne({
        resetPasswordToken: token,
      });

      if (candidate) {
        candidate.resetPasswordToken = undefined;
        candidate.resetPasswordTokenExparation = undefined;
        candidate.password = await bcrypt.hash(password, SALT_LENGTH);
        await candidate.save();

        res.redirect("/login#auth");
      } else {
        req.flash("authError", "Token expired");
        res.redirect("/login#auth");
      }
    } catch (e) {
      console.warn(e);
    }
  }
}

function checkAreSame(areSame, req, res, candidate) {
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

module.exports = LoginController;
