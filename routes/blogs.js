const express = require("express");
const router = express.Router();
const multer = require("multer");
const Blogs = require("../models/Blogs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/postBlog", upload.single("img"), async (req, res) => {
  try {
    const { title, description, color, points, image } = req.body;
    await Blogs.create({
      title,
      description,
      // image: req.file.filename,
      image,
      color,
      points,
    });
    res.status(200).json({ success: true, msg: "Blog added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
router.get("/fetchBlog", async (req, res) => {
  try {
    let blog = await Blogs.find();
    if (!blog) {
      res.status(404).json({ success: false, msg: "Blogs not found" });
    } else {
      res.status(200).json({ success: true, total: blog.length, blog });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
router.get("/fetchBlog/:id", async (req, res) => {
  try {
    let blog = await Blogs.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ success: false, msg: "Blogs not found" });
    } else {
      res.status(200).json({ success: true, blog });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
router.get("/fetchBlogs/search", async (req, res) => {
  try {
    const query = req.query.q;
    console.log(query);
    const results = await Blogs.find({ $text: { $search: query } });
    if (!results) {
      res.status(404).json({ success: false, msg: "Blogs not found" });
    } else {
      const query = req.query.q;
      res
        .status(200)
        .json({ success: true, total: results.length, query: query, results });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
module.exports = router;
