const Spacemarine = require("../models/spacemarine");

class Platoon {
  static async get(req, res) {
    const platoonList = await Spacemarine.find();

    res.render("platoon", {
      isPlatoon: true,
      inquisitorId: req.inquisitor._id,
      platoonList,
    });
  }

  static async getById(req, res) {
    const spacemarine = await Spacemarine.findById(req.params.id);
    res.render("spacemarine", {
      title: spacemarine.name,
      isPlatoon: true,
      spacemarine,
    });
  }

  static async worcout(req, res) {
    if (!req.query.allow ) {
      return res.redirect("/");
    }

    const spacemarine = await Spacemarine.findById(req.params.id);

    if (!isOwner(spacemarine.inquisitorId, req.req.inquisitor._id)) {
      return res.redirect("/");
    }

    res.render("spacemarine-workout", {
      title: `Trening ${spacemarine.name}`,
      isPlatoon: true,
      spacemarine,
    });
  }

  static async save(req, res) {
    const { name, photo, id, platoonId, cost } = req.body;

    try {
      await Spacemarine.findByIdAndUpdate(id, { name, photo, platoonId, cost });
      res.redirect("/");
    } catch (e) {
      console.warn(e);
    }
  }

  static async remove(req, res) {
    try {
        await Spacemarine.deleteOne({ _id: req.body.id });
        res.redirect("/");
      } catch (e) {
        console.warn(e);
      }
  }
}

function isOwner(inquisitorId, currentInquisitorId) {
  console.log(inquisitorId, currentInquisitorId);
  return inquisitorId === currentInquisitorId.toString();
}

module.exports = Platoon;
