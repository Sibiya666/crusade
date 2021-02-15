const Crusade = require("../models/crusade");

class CrusadeController {
  static async getCrusadeList(req, res) {
    try {
      const crusadeList = await Crusade.find({
        "inquisitor.inquisitorId": req.inquisitor._id,
      }).populate("inquisitor.inquisitorId");

      res.render("crusade", {
        isCrusade: true,
        title: "Crusade",
        crusadeList,
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async createCrusade(req, res) {
    try {
      const inquisitor = await req.inquisitor
        .populate("recruit.items.spacemarineId")
        .execPopulate();

      const recruit = inquisitor.recruit.items.map((item) => ({
        count: item.count,
        spacemarine: { ...item.spacemarineId._doc },
      }));

      const crusade = new Crusade({
        recruit,
        inquisitor: {
          name: req.inquisitor.name,
          inquisitorId: req.inquisitor,
        },
      });

      await crusade.save();
      await req.inquisitor.clearRecruit();

      res.redirect("crusade");
    } catch (e) {
      console.warn(e);
    }
  }
}

module.exports = CrusadeController;
