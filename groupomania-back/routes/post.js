const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

router.get("/posts", postCtrl.getAllPosts);
router.post("/addPost", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, multer, postCtrl.deletePost);

module.exports = router;
