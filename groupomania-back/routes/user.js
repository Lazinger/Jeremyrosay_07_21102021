const router = require("express").Router();
const userCtrl = require("../controllers/user");
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.get("/accounts/:id", auth, userCtrl.getUser);
router.put("/accounts/:id", auth, multer, userCtrl.updateAccount);
router.get("/accounts", auth, userCtrl.getAllUsers);

module.exports = router;
