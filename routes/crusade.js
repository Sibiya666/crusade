const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  res.render("crusade", {
    isCrusade: true,
    title: "Crusade",
  });
});

router.post("/", async (req, res) => {
    res.redirect('crusade');
})

module.exports = router;
