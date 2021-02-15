const { Router } = require("express");

const auth = require("../middleware/auth");
const AddController = require("../controllers/add.controller");

const router = Router();

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "ADD",
    isAdd: true,
  });
});

router.post("/", auth, AddController.add);

module.exports = router;
