const Spacemarine = require("../models/spacemarine");

class AddController {
  static async add(req, res) {
    try {
      const { name, platoonId, photo, cost } = req.body;
      const spacemarine = new Spacemarine({
        name,
        platoonId,
        photo,
        cost,
        inquisitorId: req.inquisitor,
      });
      await spacemarine.save();
      res.redirect("/");
    } catch (e) {
      console.warn(e);
    }
  }
}
module.exports = AddController;
