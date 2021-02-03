const { Router } = require("express");
const Crusade = require("../models/crusade");
const auth = require('../middleware/auth');

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const crusadeList = await Crusade.find({
      "inqvisitor.inqvisitorId": req.inqvisitor._id,
    })
      .populate("inqvisitor.inqvisitorId");

    res.render("crusade", {
      isCrusade: true,
      title: "Crusade",
      crusadeList,
    });
  } catch (e) {
    console.error(e);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const inqvisitor = await req.inqvisitor
      .populate("recruit.items.spacemarineId")
      .execPopulate();

    const recruit = inqvisitor.recruit.items.map((item) => ({
      count: item.count,
      spacemarine: { ...item.spacemarineId._doc },
    }));

    const crusade = new Crusade({
      recruit,
      inqvisitor: {
        name: req.inqvisitor.name,
        inqvisitorId: req.inqvisitor,
      },
    });

    await crusade.save();
    await req.inqvisitor.clearRecruit();

    res.redirect("crusade");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
