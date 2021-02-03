const { Router } = require("express");
const Spacemarine = require("../models/spacemarine");
const auth = require('../middleware/auth');

const router = Router();

async function createOrder(req) {
  const inqvisitor = await req.inqvisitor
    .populate("recruit.items.spacemarineId")
    .execPopulate();

  const recruit = inqvisitor.recruit.items.map((item) => ({
    ...item.spacemarineId._doc,
    count: item.count,
    id: item.spacemarineId._id,
  }));

  const score = recruit.reduce((totalScore, item) => item.cost + totalScore, 0);
  return { recruit, score };
}

router.get("/", auth, async (req, res) => {
  res.render("recruit", {
    title: "Recruit",
    isRecruit: true,
    order: await createOrder(req),
  });
});

router.post("/add", auth, async (req, res) => {
  try {
    const spacemarine = await Spacemarine.findById(req.body.id);
    req.inqvisitor.addToCrusade(spacemarine);

    res.redirect("/recruit");
  } catch (e) {
    console.log(e);
  }
});

router.delete("/remove/:id", auth, async (req, res) => {
  req.inqvisitor.removeFromCrusade(req.params.id);
  res.status(200).json(await createOrder(req));
});

module.exports = router;
