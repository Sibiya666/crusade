const Spacemarine = require("../models/spacemarine");

class Recruit {
  static async get(req, res) {
    res.render("recruit", {
      title: "Recruit",
      isRecruit: true,
      order: await createOrder(req),
    });
  }

  static async add(req, res) {
    try {
      const spacemarine = await Spacemarine.findById(req.body.id);
      req.inquisitor.addToCrusade(spacemarine);

      res.redirect("/recruit");
    } catch (e) {
      console.warn(e);
    }
  }

  static async delete(req, res) {
    req.inquisitor.removeFromCrusade(req.params.id);
    res.status(200).json(await createOrder(req));
  }
}

async function createOrder(req) {
  const inquisitor = await req.inquisitor
    .populate("recruit.items.spacemarineId")
    .execPopulate();

  const recruit = inquisitor.recruit.items.map((item) => ({
    ...item.spacemarineId._doc,
    count: item.count,
    id: item.spacemarineId._id,
  }));

  const score = recruit.reduce((totalScore, item) => item.cost + totalScore, 0);
  return { recruit, score };
}

module.exports = Recruit;
