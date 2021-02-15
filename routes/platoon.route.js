const { Router } = require("express");
const Platoon = require("../controllers/platoon.controller");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", Platoon.get);
router.get("/:id", Platoon.getById);
router.get("/:id/workout", auth, Platoon.worcout);

router.post("/save", auth, Platoon.save);
router.post("/remove", auth, Platoon.remove);

module.exports = router;
