const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

router.get("/posts", postCtrl.getAllPosts);
router.post("/add", auth, multer, postCtrl.createPost);

module.exports = router;
