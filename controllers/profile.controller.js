const Inquisitor = require("../models/inquisitor");

class ProfileController {
  static get(req, res) {
    const { avatar, name } = req.inquisitor.toObject();

    res.render("profile", {
      isProfile: true,
      avatar,
      name,
    });
  }

  static async post(req, res) {
    try {
      const inquisitor = await Inquisitor.findById(req.inquisitor._id);
      const { name } = req.body;

      const toChange = { name };

      if (req.file) {
        toChange.avatar = req.file.filename;
      }

      Object.assign(inquisitor, toChange);
      await inquisitor.save();
      res.redirect("profile");
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ProfileController;
