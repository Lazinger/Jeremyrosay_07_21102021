const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts);

module.exports = router;
