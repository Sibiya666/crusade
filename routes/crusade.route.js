const { Router } = require("express");
const CrusadeController = require("../controllers/crusade.controller");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, CrusadeController.getCrusadeList);

router.post("/", auth, CrusadeController.createCrusade);

module.exports = router;
