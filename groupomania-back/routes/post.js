const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

router.get("", postCtrl.getAllPosts);
router.post("/newPost", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, multer, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.updatePost);

module.exports = router;
