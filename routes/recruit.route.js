const { Router } = require("express");
const Recruit = require("../controllers/recruit");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, Recruit.get);

router.post("/add", auth, Recruit.add);

router.delete("/remove/:id", auth, Recruit.delete);


module.exports = router;
