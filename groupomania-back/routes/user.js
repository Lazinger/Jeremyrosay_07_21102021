const router = require("express").Router();
const userCtrl = require("../controllers/user");
const multer = require("../middlewares/multer-config");

router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);

module.exports = router;
