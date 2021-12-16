const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

router.get("/posts", postCtrl.getAllPosts);
router.post("/newPost", auth, multer, postCtrl.createPost);
router.delete("/posts/:id", auth, multer, postCtrl.deletePost);

module.exports = router;
